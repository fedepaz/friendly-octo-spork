# Maintenance & Operations

Essential commands and checklists for keeping the platform running smoothly.

## Common Commands

### Logs & Monitoring
```bash
# View live logs for specific services
docker compose logs -f nextjs
docker compose logs -f api
docker compose logs -f nginx
docker compose logs -f db
```

### Management
```bash
# Restart a specific service
docker compose restart nextjs

# Rebuild and update one service (no downtime for others)
docker compose up -d --build nextjs

# Remove unused images to save disk space
docker image prune -f

# Check container health
docker ps --filter "health=healthy"
```

### Database
```bash
# Connect to PostgreSQL
docker compose exec db psql -U user -d finance-app

# Manual database dump (backup)
docker compose exec db pg_dump -U user finance-app > ./backups/backup-$(date +%F).sql

# Restore from backup
cat ./backups/backup-2026-06-24.sql | docker compose exec -T db psql -U user -d finance-app

# List all databases
docker compose exec db psql -U user -l
```

---

## Pre-Launch Checklist

### Server
- [ ] Minimal OS installed.
- [ ] Docker + Compose Plugin active.
- [ ] UFW Firewall configured (22, 80, 443).

### Application
- [ ] `docker-compose.yml` uses service names, not `localhost`.
- [ ] All services show "healthy" in `docker compose ps`.
- [ ] `curl http://localhost:${NGINX_HOST_PORT:-8081}/api/health` returns 200 OK.
- [ ] `curl http://localhost:${NGINX_HOST_PORT:-8081}` loads the login page.
- [ ] `.env` file populated with production secrets.
- [ ] Dockerfiles exist for both frontend and backend.

### Database
- [ ] PostgreSQL volume mounted for data persistence.
- [ ] Backup strategy in place (cron or manual).

### Network
- [ ] Cloudflare DNS A record exists.
- [ ] SSL Mode set to **Full**.
- [ ] Nginx config syntax verified (`nginx -t`).

### Verification
- [ ] `/login` page loads.
- [ ] `/api/health` returns 200 OK.
- [ ] Static assets have `Cache-Control: public, immutable`.
