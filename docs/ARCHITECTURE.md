# Tonic7th Architecture

**Overview**
- **Purpose:** a music-theory learning site (similar to musictheory.net) with a NeetCode-style roadmap, lesson pages authored in MuseScore and exported as MusicXML/MIDI, synchronous playback, and a small backend for metadata and artifact orchestration.
- **High-level goals:** fast developer iteration (Docker Compose), CI/CD-driven deployments using GitHub Actions and GHCR for image publishing, low client CPU by rendering notation from exported MusicXML in the browser, and reliable artifact storage + metadata in Postgres.

**Core Components**
- **Frontend (Next.js + TypeScript):** App Router, SSR/SSG where useful, static homepage with `StaticRoadmap` to minimize client JS, lesson pages render MDX/Markdown via `react-markdown`.
- **OSMD Player (client):** `OsmdLessonPlayer` lazy-loads `opensheetmusicdisplay`, `osmd-audio-player`, and `tone` inside a client-only wrapper (`dynamic(..., { ssr: false })`). Uses requestIdleCallback and dynamic imports to avoid blocking hydration. The player consumes MuseScore-exported MusicXML for sheet rendering and may optionally use MIDI for audio playback. For browser replay, MusicXML is the natural choice when you need notation display; MIDI is more efficient for audio-only playback.
- **Prerender Worker (optional):** Node-based asset generation is only needed if you want automated thumbnails or derived assets from MusicXML in CI. Since score data comes from MuseScore exports, prerendering is optional and can be removed if you export thumbnails directly from MuseScore.
- **Backend (Go):** REST API for lessons, artifact metadata, and job orchestration. Small single-binary services for ease of containerization and deployment. Connects to Postgres for metadata and to object storage for blobs.
- **Database (Postgres):** stores lesson metadata, artifact records, and job status. Local dev uses a Postgres container; production uses managed Postgres (Railway, RDS, or managed provider).
- **Object Storage (S3-compatible):** stores exported MusicXML/MIDI, optional generated thumbnails, and other large blobs. Could use Railway's storage plugin, S3, or DigitalOcean Spaces.
- **CI/CD & Registry:** GitHub Actions builds images and pushes to GHCR. Railway (or other platform) deploys images; self-hosted manifests are optional if you later operate your own cluster.

Architecture Diagram (text)

Frontend (Next) <-- HTTPS --> Ingress/Proxy (Railway / platform ingress)
     |                                         |
     v                                         v
  Browser  -- requests --> Backend (Go API) --> Postgres
     |                                         |
     v                                         v
  OSMD client (lazy)                            Object Storage (S3)
     ^
     |
  Prerender worker (Playwright) -> writes SVG/MIDI to Object Storage and inserts metadata to Postgres

Design Decisions
- Use Go for the backend: single static binary, easy containerization, good concurrency model, and minimal runtime dependencies — fits your goal of learning Docker and CI-driven deployments while keeping infrastructure simple.
- Keep Node for optional asset generation only: OSMD is Node-friendly, but Playwright is optional and only needed if you decide to generate thumbnails from MusicXML in CI rather than exporting them directly from MuseScore.
- Use `react-markdown` instead of MDX compile-time plugins to avoid Next/Turbopack loader complexity and to keep SSR stable.
- Replace React Flow with `StaticRoadmap` for the homepage to reduce client bundle size and CPU spikes.

API Surface (example endpoints)
- `GET /health` — readiness
- `GET /api/lessons` — list lessons (slug, title, thumbnail URL)
- `GET /api/lessons/:slug` — lesson metadata
- `POST /api/artifacts` — register artifact (MusicXML/MIDI/thumbnail), backend stores metadata and returns signed upload URL or storage key
- `POST /api/prerender` — optional endpoint to enqueue CI/workflow generation for thumbnails or derived assets; only needed if you do not export them directly from MuseScore

Data Model (outline)
- lessons: id, slug, title, description, musicxml_path, created_at
- lesson_artifacts: id, lesson_id, type (thumbnail|svg|midi), storage_key, width, height, created_at
- prerender_jobs: id, lesson_id, status (queued|running|failed|done), logs, started_at, finished_at

Deployment Options
- Local dev (Docker Compose): compose file for `backend`, `db`, and optional `prerender` task; volumes map code for rapid iteration.
- Managed platform (Railway / similar): push images to GHCR via GitHub Actions and deploy using Railway CLI/API or the platform's UI. Use the platform's managed Postgres plugin or an external managed DB.
- Self-hosted (optional): if you later operate your own cluster, you can add Kubernetes manifests for `Deployment`/`Service`, `StatefulSet`/PVC for Postgres, and `Job`/`CronJob` for prerendering. Use Secrets/ConfigMaps for `DATABASE_URL` and object storage credentials.

C I/CD
- GitHub Actions builds Docker images for the Next UI, backend, and prerender worker; pushes to GHCR.
- Deploy step should call Railway CLI/API (or your chosen platform) to trigger deployments using the newly built images. For self-hosted clusters only, you can optionally apply Kubernetes manifests via GitHub Actions.

Security & Operations
- TLS/ingress: Railway handles TLS; on self-hosted clusters use an ingress controller (nginx / contour / istio) with cert-manager.
- Auth: pick a managed provider (Clerk/Auth0/Supabase) for faster onboarding or implement JWT/session in Go using secure password hashing (argon2) and `jsonwebtoken`-compatible libs.
- Rate limiting / DoS protection: add middleware (Go middleware or external API gateway) and caching for hot assets.
- CORS: backend must restrict origins to the UI domain.
- Secrets: use platform secrets (Railway env, Kubernetes Secrets, GitHub Secrets) — never commit creds.

Operational Notes
- Prerender at build/CI time only if you need automated thumbnail generation from MusicXML. If MuseScore exports the assets you need, skip Playwright and use the exported files directly.
- For heavy generation, consider running a dedicated pool of worker nodes and a queue (Redis/RabbitMQ) to scale, but this is optional for MuseScore-driven content.
- Monitor with basic metrics: request latency, DB connections, job queue depth, prerender failure rate.

Incremental Roadmap
1. Decide whether to export thumbnails and audio directly from MuseScore or generate them in CI from MusicXML.
2. Docker Compose for local dev (done: `docker-compose.yml`).
3. Add GitHub Actions deploy step to Railway (or your chosen platform) to perform automated deployments from pushed images.
4. Backend endpoints + DB migrations and artifact upload flow.
5. Optional Python microservice for music analysis when needed.

Appendix: Why Go now?
- Aligns with your stated desire to practice Docker/K8s and produce simple deployables.
- Rust remains a strong option; choose Rust if you value maximum safety and already have Rust pipelines. Go provides faster iteration for this phase.

Contact
- Repo root: `backend/` contains the Go service; `docker-compose.yml` at repo root starts the local stack.
