fix: use Pino logger instead of console.log in main.ts, use configService for port

- Replace console.log/error calls with the configured Pino logger
- Read port from configService.get('config.port') instead of raw process.env
- Add explicit `unknown` type to catch clause
