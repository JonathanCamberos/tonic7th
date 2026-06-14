# Development Lifecycle (DEV -> SIT)

This document describes the recommended developer workflow for making changes, writing tests, and promoting code from local development through SIT (System Integration Testing) and into production.

Goals:
- Keep changes small and reviewable
- Run fast unit tests locally
- Use CI to run full test matrix
- Deploy to SIT for integration and QA

## Branching & PRs

- Create a feature branch from `main`:

```bash
git checkout -b feat/<short-description>
```

- Commit frequently with small messages and push your branch:

```bash
git add .
git commit -m "feat: add <short-description>"
git push -u origin feat/<short-description>
```

- Open a Pull Request (PR) targeting `main` or the active release branch. Include a short description, testing steps, and any new environment variables.

## Developer workflow (step-by-step)

1. Add a new feature or bug fix.
   - Create a feature branch from `main`:

```bash
git checkout -b feat/<short-description>
```

2. Define the change and the expected behavior.
   - Write a short summary in the branch or PR description.
   - Identify the UI, server, or database parts affected.

3. Add a unit test or test case first.
   - Place tests under `src/**/*.{test,spec}.{ts,tsx}` using Vitest.
   - Use MSW mocks in `src/mocks/` for network routes.
   - For new UI, add a component test; for logic, add a lib/unit test.

4. Implement the minimal code to satisfy the test.
   - Keep the change small and focused.
   - Follow conventions: `src/components/` for client UI, `src/lib/` for server helpers, `src/app/` for pages.
   - Add a short `/** README: */` header to new files explaining their role.

5. Run the test and lint loop locally.

```bash
npm run test:run
npm run lint
npm run build
```

6. Fix any failures and improve the implementation.
   - Repeat until tests pass and lint is clean.
   - Keep the implementation simple and readable.

7. Add or update documentation.
   - Update `README.md`, `ARCHITECTURE.md`, or `DEV_LIFECYCLE.md` if the change introduces new behavior, workflows, or configuration.
   - Document any new content files, `.mxl` score assets, or audio files.

8. Commit the change with a descriptive message.

```bash
git add .
git commit -m "feat: add <short-description>"
```

9. Push your branch and open a PR.

```bash
git push -u origin feat/<short-description>
```

10. Use the PR checklist before merging.
   - Confirm tests pass locally and CI is green.
   - Add a clear summary, testing steps, and any relevant links.
   - Request review from one or two collaborators.

11. Merge after review and CI approval.
   - Merge into `main` or the target release branch.
   - Ensure the PR is up to date with the latest base branch before final merge.

12. Deploy to SIT and validate.
   - Run the SIT deployment flow in your CI/CD environment.
   - Perform smoke checks on the exercise page and audio endpoint.
   - Verify any data changes or new content behave correctly.

## Postgres update workflow

1. Define the database change.
   - Identify whether the update is schema-only, data-only, or schema + data.
   - Record the business need or bug that requires the database change.

2. Create a migration script.
   - If you use a migration tool, generate the migration and review the SQL.
   - If you manage raw SQL, add a versioned file in `db/migrations/` or the repo convention.
   - Keep the migration small and reversible when possible.

3. Update application code together with the migration.
   - Add schema-aware changes in the same branch as the migration.
   - For column renames or type changes, include code that can handle old and new states if needed.

4. Test the migration locally.
   - Apply the migration against your local Postgres database.
   - Run the app and the unit tests that cover the updated database logic.
   - Validate reads and writes for the affected tables.

5. Review the migration and database code.
   - Confirm the SQL is correct and does not drop critical data unintentionally.
   - Use peer review to catch issues in both migration and application code.

6. Commit the migration and code together.
   - Use a clear commit message that mentions the migration and the feature.

7. Apply the migration in SIT or staging.
   - Deploy the code branch to SIT.
   - Run the migration against the SIT database using the same process as production.

8. Validate the database change in SIT.
   - Perform smoke tests for any feature that depends on the schema change.
   - Confirm data integrity and application behavior.

9. Release to production.
   - Merge the PR once SIT validation is complete.
   - Run the production migration as part of deployment.
   - Monitor the application and database logs for errors.

10. Roll back safely if needed.
   - If the migration causes problems, follow the rollback process for both code and schema.
   - Revert the deployment and restore from backups if necessary.

## Local testing checklist

- Unit tests: `npm run test:run` (or `npm test` for development watch)
- Lint: `npm run lint`
- Build: `npm run build` (type-checks + production build)
- Manual smoke: run `npm run dev` and exercise the UI at `http://localhost:3000`

Notes:
- Tests use MSW (see `src/mocks/`) to stub network requests. For local integration development, you can disable MSW and point to real services in env.

## CI expectations

- CI should run the following on each PR:
  - `npm ci`
  - `npm run lint`
  - `npm run test:run`
  - `npm run build`

- If any step fails, the PR should be considered blocking until fixed.

## Deploying to SIT (System Integration Testing)

Purpose: validate the change in a staging environment integrated with downstream systems.

Typical SIT flow:
1. Merge the PR to the target branch that triggers the SIT deploy (often `develop` or `staging`).
2. CI/CD pipeline builds a Docker image and deploys it to the SIT environment.
3. Run automated integration or API tests against SIT.
4. Conduct manual QA / exploratory testing.

SIT testing strategies:
- Automated smoke tests: quick checks to ensure key routes render and audio endpoint returns 200.
- Full integration tests: run a suite of tests (e.g., Playwright, Cypress) that simulate user flows.
- Data validation: confirm content files exist and media endpoints serve correct MIME types.

Example smoke check (curl):

```bash
# health check the exercise page
curl -I https://sit.example.com/exercise

# verify audio endpoint
curl -I https://sit.example.com/api/audio/pianoFourBarExample.mp3
```

## How to test in SIT (practical steps for QA)

- Verify the MusicXML renders in the exercise page and the score displays.
- Press Play on audio controls and confirm the audio stream starts.
- Check the network tab for `/api/audio/<filename>` requests and response headers (Content-Type, Cache-Control).
- Run the automated test job (if provided) against the SIT URL.

If your change touches external integrations (auth, payments, APIs):
- Use test accounts and test endpoints where possible.
- Coordinate with the owners of those services before running destructive tests.

## Rollback and hotfix process

- If SIT reveals critical issues, revert the deployment by rolling back the image or revert the merge commit, then re-deploy.
- For urgent production fixes, create a small hotfix branch against `main`, test locally, open a PR, and follow expedited review + deployment.

## Release to production

- After SIT validation and stakeholder sign-off, merge to `main` (or follow release branch process)
- CI/CD will build and deploy the release to production per your pipeline configuration.

## Developer tips

- Keep PRs small and focused.
- Add tests before implementing behaviour where feasible.
- Use MSW for deterministic tests; enable real API calls in SIT only.
- Document new configuration or content file expectations (e.g., new `.mxl` or `.mp3` files) in `ARCHITECTURE.md` or a lesson README.

## Quick commands reference

```bash
# development
npm run dev

# run tests in watch mode
npm test

# run tests once
npm run test:run

# lint
npm run lint

# production build (type checks + build)
npm run build
```

## Signals of readiness for SIT

- All unit tests pass (`npm run test:run`)
- Lint is clean
- Production build succeeds (`npm run build`)
- Basic manual smoke tests pass locally (`npm run dev` + browser checks)

---

Keep this lifecycle document updated as your CI/CD and team workflow evolve.