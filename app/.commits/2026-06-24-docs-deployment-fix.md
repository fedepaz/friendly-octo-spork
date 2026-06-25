docs(deployment): fix deploy docs, align service names and parameterize docker-compose

- Rename cloudfare -> cloudflare in filename
- Update MAINTENANCE-DOCKER-STRATEGY.md with PostgreSQL commands and docker compose syntax
- Add db service to example docker-compose
- Parameterize nginx with env vars via envsubst template
- Align service names (nextjs/api) across nginx and docker-compose
- Add .env.example with production variables
