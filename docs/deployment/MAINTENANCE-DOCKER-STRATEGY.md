# Maintenance & Operations

Essential commands and checklists for keeping the platform running smoothly.

> **TODO — Updating the App (Production)**: document the full update flow
> (push to `main` → Deploy workflow builds/pushes to GHCR → server
> `docker compose pull && up -d` → verify). The auto-deploy step in
> `.github/workflows/deploy.yml` is still a placeholder; updates are manual
> until then.

## Compose Files

| File | Purpose |
|---|---|
| `docker/docker-compose.dev.yml` | Local dev DB only (PostgreSQL + Adminer) |
| `docker/docker-compose.deploy.yml` | Production stack — pulls images from GHCR (`:latest`) |
| `docs/deployment/examples/docker-compose.yml` | Example full stack with **local builds** (reference only) |

> **Compose context:** commands below target the **deploy stack**
> (`docker-compose.deploy.yml` + `.env`). Run them from the `docker/`
> directory (or your server's deploy directory). If the file keeps its
> original name on the server, add `-f docker-compose.deploy.yml`.

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

# Update one service to the latest published image (no downtime for others)
docker compose pull nextjs
docker compose up -d nextjs

# Remove unused images to save disk space
docker image prune -f

# Check container health
docker ps --filter "health=healthy"
```

### Docker Cleanup & Disk Space

#### Safe Cleanup Commands (Recommended)
```bash
# Remove only dangling (untagged) images — safe, no impact on running containers
docker image prune

# Remove stopped containers
docker container prune

# Free build cache (can reclaim 10-30GB)
docker builder prune --all

# Combined safe cleanup
docker image prune && docker container prune && docker builder prune --all
```

#### Dangerous Commands (Avoid on Production)
```bash
# ⚠️ DELETES everything unused — images, networks, volumes
docker system prune -a --volumes

# Why it's dangerous:
# - Removes ALL images not tied to running containers
# - Removes anonymous volumes (could lose data)
# - Removes unused networks (breaks inter-container communication)
# - On server: removes stopped containers that should auto-restart
```

#### Named Volumes Protection
PostgreSQL uses a **named volume** (`postgres_data`), which is safe from `prune --volumes`:

```yaml
# docker-compose.deploy.yml
volumes:
  postgres_data:/var/lib/postgresql/data  # ← Named volume (safe)

volumes:
  postgres_data:  # ← Declared at root level
```

| Volume Type | Removed by `prune -a` | Removed by `prune --volumes` |
|------------|----------------------|------------------------------|
| Named (`postgres_data:/...`) | No | No |
| Anonymous (`/var/lib/...` only) | No | **Yes** |

#### Server Cleanup Routine
```bash
# Weekly cleanup (safe)
docker image prune -f
docker container prune -f
docker builder prune --all -f

# Check disk usage
docker system df
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
