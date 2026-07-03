fix(backend): disconnect PrismaClient on test app close

Override app.close() in createTestApp helper to explicitly disconnect
the NestJS app's PrismaClient before shutting down. This eliminates
the Jest "did not exit" warning caused by an open database connection
pool.
