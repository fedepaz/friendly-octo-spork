feat(chore): implement husky hooks and commitlint configuration

- Initialize Husky in app/.husky and configure git core.hooksPath.
- Add pre-commit hook to run 'turbo lint' (leveraging cache).
- Add commit-msg hook to enforce conventional commits using commitlint.
- Configure commitlint to allow detailed message bodies (disable max-line-length).
- Update backend ESLint configuration to ignore 'src/generated' and 'dist' directories.
- Fix backend linting issues by excluding auto-generated Prisma files.
