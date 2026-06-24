docs(deployment): add docker healthchecks for api and nextjs services

- Add healthcheck to api using the existing /health endpoint
- Add healthcheck to nextjs to verify port 3000 is responding
- Chain depends_on with service_healthy conditions across all services
- Update pre-launch checklist with specific health check commands
