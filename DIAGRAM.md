# DIAGRAM

## System Overview

This file provides a high-level architecture diagram and dependency map for the `tonic7th` project. It is intended as a compact, human-friendly snapshot of the repository structure and runtime flows.

## High-Level Architecture

The application is a Next.js project with the following main layers:

- `src/app/` — App Router pages and server-rendered route handlers
- `src/components/` — UI components and browser-only features
- `src/lib/` — server-side helper logic and content loading
- `src/mocks/` — MSW test handlers and test server setup
- `content/` — canonical lesson assets and media files
- `public/` — static public assets

## Key Runtime Flow

1. `GET /exercise`
   - `src/app/exercise/page.tsx` loads MusicXML from `content/lessons/testing`
   - it resolves the audio source path via `src/lib/musicXmlLoader.ts`
   - page renders `MusicXmlRenderer` and `ExerciseAudioFooter`

2. Browser renders `MusicXmlRenderer`
   - client-only component loads `opensheetmusicdisplay` dynamically
   - renders sheet music as SVG

3. Browser renders `ExerciseAudioFooter`
   - initializes `Audio` with `/api/audio/<filename>`
   - user controls playback and volume

4. Audio request hits API route
   - `src/app/api/audio/[filename]/route.ts` streams audio from `content/lessons/testing`

5. Tests run with MSW
   - `src/setupTests.ts` starts MSW server
   - `src/mocks/handlers.ts` intercepts `/api/audio/:filename`

## Dependency Map

Runtime dependencies:
- `next@16.2.7`
- `react@19.2.4`
- `react-dom@19.2.4`
- `opensheetmusicdisplay@^1.2.0`
- `fflate@^0.8.1`

Dev/test dependencies:
- `vitest@^1.5.5`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `msw@^2.14.6`
- `typescript@^5`
- `eslint@^9`
- `tailwindcss@^4`

## ASCII Repository Structure

```
.
├── ARCHITECTURE.md
├── DIAGRAM.md
├── HELICOPTER_VIEW.md
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── src
│   ├── app
│   │   ├── exercise
│   │   │   └── page.tsx
│   │   ├── home
│   │   │   └── page.tsx
│   │   ├── lessons
│   │   │   └── page.tsx
│   │   ├── composition-fluency
│   │   │   └── page.tsx
│   │   ├── ear-fluency
│   │   │   └── page.tsx
│   │   ├── translator-fluency
│   │   │   └── page.tsx
│   │   ├── shared-philosophy
│   │   │   └── page.tsx
│   │   ├── contact
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components
│   │   ├── MusicXmlRenderer.tsx
│   │   ├── ExerciseAudioFooter.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StaticRoadmap.tsx
│   │   └── UnderConstruction.tsx
│   ├── lib
│   │   ├── musicXmlLoader.ts
│   │   └── lessons.ts
│   ├── mocks
│   │   ├── handlers.ts
│   │   └── server.ts
│   └── setupTests.ts
└── content
    └── lessons
        └── testing
            ├── pianoFourBarExample.mxl
            ├── pianoFourBarExample.xml
            └── pianoFourBarExample.mp3
```

## How to Use This File

Paste `DIAGRAM.md` into a new chat with Claude to discuss the architecture, dependency boundaries, and refactor opportunities for the full project. Use it as the compact representation of the system, not as the live source of truth.
