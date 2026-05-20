docs: update deployment strategy to self-hosted Docker Compose

Updates all project documentation, agent profiles, and setup guides to reflect the transition from Neon/Render to a self-hosted environment on Ubuntu.

Key changes:
- Infrastructure: Documented the use of Docker Compose to orchestrate PostgreSQL, the Bun app, and Nginx.
- Agent Profiles: Updated DevOps, Architect, Backend, and Security agents to focus on local server management, container security, and reverse proxy configuration.
- Guides: Revised `initial-setup.md` with step-by-step instructions for the Docker Compose workflow and Nginx setup.
- Roadmap: Marked infrastructure shift as completed and added Cloudflare Tunnel as a planned item.
- Variables: Updated `.env.example` to use the internal Docker network host (`postgres`).
- Cleaned up all legacy mentions of Neon and Render platforms.
