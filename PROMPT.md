# Prompt Library

This file stores reusable prompts for asking an LLM to generate and maintain documentation for this repository. It is intended to help preserve the history of how doc artifacts are created, what the task scope is, and what boundaries should be enforced.

## How to use

- Copy one of the prompt templates below into a new chat with the LLM.
- Replace the placeholder text with the specific file name or repo context if needed.
- Keep the prompt grounded in the repository by pointing the model to existing files, README copy, and current app behavior.

## Prompt style

- Start with the project name and purpose.
- Mention the files that already exist and should be used as the source of truth.
- Be explicit about the output format, structure, and sections required.
- Mention boundaries: do not invent features, keep the output aligned with the repo, and keep the tone concise.

---

## Prompt: Generate README.md

```
You are writing `README.md` for the `Tonic 7th` repo.
This is a Next.js + TypeScript app with a music theory roadmap, sheet music rendering, and recorded audio playback.
Use the existing repo files as the source of truth, especially `src/app/layout.tsx`, `src/app/globals.css`, `src/lib/musicXmlLoader.ts`, `src/components/MusicXmlRenderer.tsx`, `src/components/ExerciseAudioFooter.tsx`, and `package.json`.

Create a structured README with these sections:
- Project title and summary
- Getting started (install, dev server)
- Testing commands
- Build command
- What the app does
- Links to architecture and design docs if present

Keep the content factual, not speculative.
```

## Prompt: Generate AGENTS.md

```
You are writing `AGENTS.md` for the `Tonic 7th` repo.
This file should tell an AI assistant how to reason about the repo, what conventions to follow, and where the important architecture lives.
Reference existing files and conventions, including `app/`, `components/`, `lib/`, `mocks/`, `README.md`, `DIAGRAM.md`, and `DESIGN.md`.

Include:
- purpose of `AGENTS.md`
- build and code guidance
- preferred file locations for new features
- what to avoid (e.g. inventing unrelated UI patterns, changing app structure without reason)
- how to handle browser-only libraries like `opensheetmusicdisplay`

Write the result as a markdown doc with sections and short, actionable rules.
```

## Prompt: Generate DIAGRAM.md

```
You are writing `DIAGRAM.md` for the `Tonic 7th` repo.
It should provide a compact architecture overview and runtime flow based on the current code.
Use the project structure from the repo and emphasize core pages and features.

Include:
- a short purpose statement
- main layers (app router, components, lib, mocks, content)
- key runtime flow for `/exercise` and audio playback
- dependency map of runtime and dev packages
- an ASCII folder structure for the key files
- a note on how to use the file with an LLM

Avoid guessing about features that are not present in the code.
```

## Prompt: Generate HELICOPTER_SCRIPT.md

```
You are writing `HELICOPTER_SCRIPT.md` for the `Tonic 7th` repo.
This file should explain how to generate a repository snapshot with a tracked-files script.
Reference the existing `HELICOPTER_SCRIPT.py` script style and describe how `HELICOPTER_VIEW.md` is produced.

Include:
- purpose of the script
- what files it scans (`git ls-files` / tracked files)
- where the output goes (`HELICOPTER_VIEW.md`)
- why the snapshot is useful for high-level review
- a short example command to run it

Keep it readable and actionable.
```

## Prompt: Generate DESIGN.md

```
You are writing `DESIGN.md` for the `Tonic 7th` repo.
This is a plain-text design system document that both humans and agents can read.
Use the existing style in `src/app/globals.css`, `src/app/layout.tsx`, and the current UI styling to define the system.

Include:
- YAML front matter with exact color, typography, spacing, and layout tokens
- a human section describing the visual philosophy
- component guidance for cards, navigation, and buttons
- do's and don'ts for the visual identity
- an agent note about respecting tokens and staying consistent

Do not invent tokens that are not grounded in the repo. Keep the palette and typography aligned with the actual code.
```

## Prompt: Generate Developer Docs History

```
You are writing a prompt-history doc for the `Tonic 7th` repo.
This file should capture the evolution of prompts used to generate documentation artifacts like `README.md`, `AGENTS.md`, `DIAGRAM.md`, `DESIGN.md`, and `HELICOPTER_SCRIPT.md`.
Include:
- the goal of each prompt
- the repo files that were referenced
- the output format expectations
- any constraints or warnings used
- examples of successful prompt wording

Aim for a short, practical prompt library that can be extended over time.
```

---

## Best practices for prompts

- Always mention the current repo name, stack, and product purpose.
- Point the LLM to existing files and the actual code before adding new ideas.
- Ask for structure explicitly: headings, lists, code blocks, sections.
- Keep scope narrow: one document at a time.
- Flag what must not be invented: new features, colors, or unrelated architecture.
- Prefer `Use the repository as the source of truth` over vague generalities.

## Notes

- This file is a living prompt library. Add new prompt templates when you create new docs.
- If you change repo structure, update this file so future prompt sessions are aligned.
- Use `PROMPT.md` when starting a new agent session that needs to generate docs or design artifacts.
