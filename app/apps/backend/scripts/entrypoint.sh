#!/bin/sh
set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting server..."
exec node dist/src/main.js