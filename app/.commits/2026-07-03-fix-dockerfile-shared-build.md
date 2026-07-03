fix: build @repo/shared before app builds in Dockerfiles

Both Dockerfiles were missing the shared package build step,
causing TS2307 "Cannot find module '@repo/shared'" errors during
Docker builds. Locally this was masked by existing node_modules.
