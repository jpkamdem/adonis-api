# Environment variables

- .env

```bash
# dev
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=mok_QxLm94iTcKUOROy4XgRk0Ub4_Qph
NODE_ENV=development
SESSION_DRIVER=cookie
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public

# prod
# TZ=UTC
# PORT=3333
# HOST=0.0.0.0
# LOG_LEVEL=info
# APP_KEY=mok_QxLm94iTcKUOROy4XgRk0Ub4_Qph
# NODE_ENV=production
# SESSION_DRIVER=cookie
# DB_HOST=db
# DB_PORT=5432
# DB_USER=root
# DB_PASSWORD=root
# DB_DATABASE=app
# DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public

```
