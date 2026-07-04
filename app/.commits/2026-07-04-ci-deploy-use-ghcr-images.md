ci(deploy): use pre-built GHCR images in docker-compose.deploy.yml

Replace build directives with image references to pull pre-built
Docker images from GitHub Container Registry. This decouples the
build step (CI) from the deploy step (server), following the
"build once, deploy anywhere" pattern.

The NEXT_PUBLIC_API_URL is configured as a GitHub Actions variable
and baked into the frontend image at build time.
