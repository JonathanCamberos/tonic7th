This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Continuous Integration / Deployment

This repository builds Docker images for the backend and frontend and publishes them to GitHub Container Registry (GHCR) via GitHub Actions.

Required repository secrets:

- `GHCR_PAT` — a personal access token with `write:packages` scope for pushing images to `ghcr.io`.
- `RAILWAY_API_KEY` — optional; set if you want the workflow to trigger Railway deployments.

Workflow: `.github/workflows/ci.yml` builds and pushes these images:

- `ghcr.io/<owner>/tonic7th-backend`
- `ghcr.io/<owner>/tonic7th-frontend`

After pushing images you can deploy them to Railway (or any other platform). The workflow contains a placeholder Railway step — replace it with Railway CLI commands or your deploy script.

