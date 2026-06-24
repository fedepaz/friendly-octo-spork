docs(deployment): fix credentials, healthchecks and NEXT_PUBLIC_API_URL in docker-compose

- Replace hardcoded DB credentials with env var references
- Add POSTGRES_USER/POSTGRES_PASSWORD to .env.example
- Move NEXT_PUBLIC_API_URL to build args with public URL
- Fix healthcheck deadlock: replace wget with node -e
- Add restart: unless-stopped to app services
- Add env_file support for api service
- Fix nginx template volume mount path
- Parameterize pg_isready healthcheck user
