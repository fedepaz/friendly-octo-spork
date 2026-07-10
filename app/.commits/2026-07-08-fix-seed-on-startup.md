fix(backend): seed entities on container startup via entrypoint.sh

- Add prisma db seed to entrypoint.sh so entities exist in all environments
- Prevents empty entities table causing 403 on registration
