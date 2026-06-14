# Pull Request checklist

Please include the following in your PR description and ensure the checks pass before requesting review.

- **Summary**: Describe the change and why it is needed.
- **Related issue**: Link the issue or ticket this PR addresses (if any).
- **Type of change**: choose one — Bugfix, Feature, Docs, Chore.
- **Testing**: list steps to manually test the change (if applicable).

Checklist:

- [ ] I added or updated unit tests where applicable
- [ ] I ran `npm run lint` and fixed lint issues
- [ ] I ran `npm run test:run` and all tests pass locally
- [ ] I ran `npm run build` and the production build succeeds
- [ ] I updated relevant documentation (ARCHITECTURE.md, DEV_LIFECYCLE.md) if needed

Notes for reviewers:

- Include a brief description of the change in the PR body.
- Provide screenshots or recordings for UI changes when helpful.
- If the PR requires manual QA steps, add them under "Testing" above.

See [DEV_LIFECYCLE.md](DEV_LIFECYCLE.md) for the recommended developer workflow and CI expectations.
