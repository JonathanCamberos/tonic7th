# ARCHITECTURE

## Purpose
This file is the human-owned architecture map for the `tonic7th` project.
It is the single source of truth for:
- folder structure and major layers
- component responsibilities
- data flows and runtime behavior
- testing and mock architecture
- deployment and integration boundaries

> AI can help summarize and suggest refactors, but this document must be updated manually whenever the project changes.

## High-Level Architecture
`tonic7th` is a Next.js application using the App Router with a minimal music theory exercise experience.

Key characteristics:
- server-rendered pages via `src/app`
- browser-only music rendering in client components
- file-system-backed content in `content/lessons/testing`
- `GET` API endpoint for audio delivery
- unit and integration-friendly test setup using Vitest, Testing Library, and MSW

## Folder Structure

Root:

- `AGENTS.md` — local AI/agent guidance metadata
- `CLAUDE.md` — additional architecture/agent notes
- `Dockerfile` — frontend container definition
- `docker-compose.yml` — service orchestration for local/dev environment
- `README.md` — onboarding and runtime instructions
- `ARCHITECTURE.md` — this file
- `package.json` — dependencies, scripts, test commands
- `tsconfig.json` — TypeScript config
- `next.config.ts` — Next.js configuration
- `vitest.config.ts` — Vitest configuration
- `eslint.config.mjs` — linting config

Application code:

- `src/app/` — App Router pages and API route
  - `exercise/page.tsx` — exercise page composition
  - `api/audio/[filename]/route.ts` — audio streaming endpoint
- `src/components/` — reusable UI components
  - `MusicXmlRenderer.tsx` — browser-only MusicXML renderer
  - `ExerciseAudioFooter.tsx` — audio playback controls
- `src/lib/` — server-side business logic and helpers
  - `musicXmlLoader.ts` — MusicXML/MXL loading and audio source lookup
- `src/mocks/` — MSW test handlers and server setup
- `src/setupTests.ts` — Vitest global test initialization
- `src/types/` — application type definitions

Content assets:

- `content/lessons/testing/` — source MusicXML, MXL, and MP3 files used by the exercise

Public static assets and build output:

- `public/` — static assets served at runtime
- `.next/` — Next.js build output (ignored in source control)

Additional infrastructure:

- `backend/` — backend service container sources (if present)
- `scripts/` — helper scripts for build or content generation
- `docs/` — documentation beyond this architecture map

## System Components

### `src/app/exercise/page.tsx`
Responsibility:
- composes the exercise page layout
- loads MusicXML content at server runtime via `loadMusicXml()`
- resolves the audio source via `getExerciseAudioSrc()`
- renders `MusicXmlRenderer` and `ExerciseAudioFooter`

Pattern:
- server-first page that passes data into client components

### `src/components/MusicXmlRenderer.tsx`
Responsibility:
- renders the MusicXML score inside the browser using `opensheetmusicdisplay`
- lazy-loads the library at runtime via dynamic `import()`
- handles loading and render errors

Pattern:
- client-only component (`"use client"`)
- encapsulates side effects inside `useEffect`
- keeps browser-only dependency out of server build

### `src/components/ExerciseAudioFooter.tsx`
Responsibility:
- manages playback state for the exercise audio file
- creates and controls a browser `Audio` instance
- exposes play/stop controls and volume state

Pattern:
- stateful UI component with client-only audio behavior
- uses controlled component state for user feedback

### `src/lib/musicXmlLoader.ts`
Responsibility:
- server-side file loading for `*.xml` and compressed `*.mxl`
- extracts textual MusicXML from `.mxl` archives via `fflate`
- resolves the public-facing audio endpoint path

Pattern:
- single responsibility for file I/O and content extraction
- clearly separated from UI logic

### `src/app/api/audio/[filename]/route.ts`
Responsibility:
- serves local MP3 files from `content/lessons/testing`
- returns 400 for invalid extensions and 404 for missing files
- enables playback via `/api/audio/<filename>`

Pattern:
- server-side API route exposing local content safely
- used by client components without exposing raw file paths

## Data Flow

1. `GET /exercise`
   - `src/app/exercise/page.tsx` runs on the server
   - `loadMusicXml()` reads `content/lessons/testing/pianoFourBarExample.xml` or `.mxl`
   - `getExerciseAudioSrc()` checks the same folder for `pianoFourBarExample.mp3`
   - page renders markup and serializes `xmlPreview` and `audioSrc`

2. Browser renders page
   - `MusicXmlRenderer` mounts and loads `opensheetmusicdisplay`
   - score is drawn in SVG inside the page
   - `ExerciseAudioFooter` initializes `Audio(audioSrc)` if available

3. User clicks play
   - browser requests `/api/audio/pianoFourBarExample.mp3`
   - API route streams the file from `content/lessons/testing`
   - audio plays in the browser

4. Test mode
   - Vitest loads `src/setupTests.ts`
   - MSW intercepts `/api/audio/:filename`
   - UI and lib tests can run without a real server file

## Design Patterns and Constraints

- `App Router` serves page composition and API routes from `src/app`
- `Client components` are strictly used for browser-only behavior
- `lib/` is the server-side domain layer for content extraction
- `mocks/` and `setupTests.ts` provide isolated test wiring
- `content/` is the canonical source of lesson assets
- audio playback is exposed through an API route, not direct file paths

## Recommended Refactor Opportunities

Use this section as a living checklist for architecture reviews.

- Consider adding an explicit `src/services/` layer if the project grows beyond one exercise
- Move content path logic into a single config object if more exercises are added
- Introduce a shared `PageShell` or `Layout` component for consistent exercise structure
- Add explicit `error boundary` handling for `MusicXmlRenderer` and API route failures
- Standardize asset references with a typed `ExerciseResource` contract

## How to Use This Document

- Update this file whenever you add or remove a top-level folder
- Add a new section when a new page, API route, or major data flow appears
- Keep the folder tree and component responsibilities current
- Use this file to orient future refactors and code review conversations

## Notes for the Team

- This file is owned by the developer, not by AI.
- AI can assist with analysis and diagrams, but the final architecture decisions are manual.
- Treat `ARCHITECTURE.md` as the helicopter view for the project.
