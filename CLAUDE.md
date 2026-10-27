# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Small Express + TypeScript REST API backed by MongoDB (Mongoose 5). Every `/api/*` endpoint is protected by OAuth2 bearer tokens validated against a separate project, [oauth2-server](https://github.com/ptitsynamv/oauth2-server) (Swagger UI client id: `swagger-id`). This is a Node backend; the Angular rules in the global user config don't apply here.

## Commands

- `npm install`: Node v20.11.0 / npm 10.2.4 (via nvm).
- `npm start`: dev server with reload (`ts-node-dev src/index.ts`).
- `npm run build`: runs `tsc` into `build/`, then copies `.env` and `src/public` into it. It uses `cp`, so it needs a POSIX shell, and it fails if `.env` is missing.
- `npm run start-prod`: runs `node build/index.js`.

There are no tests and no lint script. `tslint.json` exists, but tslint is not installed. To type-check, run `npx tsc --noEmit`.

Copy `.env.example` to `.env` and fill it in: `MONGO_URL`, `OAUTH_SERVER_URL` (with a trailing slash), `USER_INFO_URL`, `PORT`, `DEPLOY_URL`. Swagger UI is served at `/api-docs/`.

## Architecture

Requests go through this chain: `src/index.ts` → `src/routes/*` → `src/controllers/*` → `src/models/*`.

- **Resources**: there are three, all mounted in `src/index.ts`:
  - `/api/article` (antropogenez-article)
  - `/api/f-article`
  - `/api/public-service-water`
- **Adding a resource** means touching all of these files:
  - model, route and controller files
  - the barrel exports in `src/routes/index.ts` and `src/models/index.ts`
  - request/response interfaces in `src/controllers/interfaces.ts`
  - the mount in `src/index.ts`
  - the hand-written OpenAPI spec in `src/swagger.config.ts`. It is a large literal object, not generated from code, so update it whenever routes change.
- **Auth**: every route passes `passport.authenticate('bearer', {session: false})`. The strategy in `src/middleware/passport.ts` sends the token to `OAUTH_SERVER_URL + USER_INFO_URL` and accepts whatever JSON comes back. Note that it calls `done(null, json)` even for an error body.
- **Models** are exported with CommonJS `module.exports = mongoose.model(...)` and re-exported through `require`, so they are untyped (`any`) in controllers. `noImplicitAny` is off.
- **Controller conventions**:
  - Handlers use callback-style `query.exec((err, doc) => ...)` inside `async` functions.
  - They map Mongo `_id` → `id` in responses.
  - Errors are returned as `ErrorResponse {success: false, message}` with status 500.
  - List endpoints take `limit` (default 5) and `offset`. `offset` is a **page index**: the query uses `skip(limit * offset)`.
  - Article lists return `{count, list}`. Water lists return a bare array.
  - The server sets `date` on create as an `MM/DD/YYYY` string.
- **Route order matters**: `GET /api/public-service-water/last` must be registered before `/:id`.
- **Code style**: single quotes, semicolons, 4-space indent, trailing commas in multiline literals.

## Deployment

Every push to `master` triggers `.github/workflows/deploy.yml`. It SFTPs the repo to `/var/projects/data-server`, runs `npm install && npm run build` on the server, and restarts the app under pm2 as `data-server`. The deploy excludes `.env`, so the server keeps its own copy. The `Dockerfile` and the README's `yarn docker:*` steps are stale: there are no such scripts and no `yarn.lock`.
