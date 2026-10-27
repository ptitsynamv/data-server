# Data Server

[![Deploy](https://github.com/ptitsynamv/data-server/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/ptitsynamv/data-server/actions/workflows/deploy.yml)
![Node.js](https://img.shields.io/badge/Node.js-20.11-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.2-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.17-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_5-47A248?logo=mongodb&logoColor=white)
![OAuth2](https://img.shields.io/badge/Auth-OAuth2_Bearer-EB5424?logo=auth0&logoColor=white)
![Swagger](https://img.shields.io/badge/Docs-OpenAPI_3-85EA2D?logo=swagger&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

This is a REST API written in TypeScript that stores articles and water-meter readings in MongoDB. Every endpoint needs an OAuth2 bearer token. Tokens are issued and validated by a companion project, [oauth2-server](https://github.com/ptitsynamv/oauth2-server).

**Live instance:** http://ptitsynamv.1gb.ua:3003 (API docs at `/api-docs/`)

## Features

- **Three REST resources** with paginated lists:
  - **Articles** (`/api/article`): full CRUD, including `PUT` (replace) and `PATCH` (partial update). List responses include a total count.
  - **F-Articles** (`/api/f-article`): title and URL bookmarks with create, read, replace and delete.
  - **Public service water** (`/api/public-service-water`): hot and cold water-meter readings, plus a `/last` endpoint that returns the most recent reading.
- **OAuth2 bearer authentication:** the server sends each request's token to the OAuth2 server's user-info endpoint to validate it.
- **Interactive API docs:** Swagger UI at `/api-docs/`, with a built-in OAuth2 sign-in (implicit flow).
- **Continuous deployment:** every push to `master` deploys to the production server over SFTP and restarts the app with pm2.

## Tech stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20.11.0, npm 10.2.4 |
| Language | TypeScript 4.2 (compiled to ES6 / CommonJS) |
| Web framework | Express 4.17 with `body-parser`, `cors`, `morgan` |
| Database | MongoDB through Mongoose 5.11 |
| Auth | Passport with `passport-http-bearer` and `node-fetch` |
| API docs | `swagger-ui-express` (hand-written OpenAPI 3 spec) |
| Dev server | `ts-node-dev` (restarts on file changes) |
| Deployment | GitHub Actions, SFTP and pm2 |

## Prerequisites

- **Node.js 20.11.0 and npm 10.2.4.** These are the versions the project is tested with. The dependencies are from 2020–2021 (Mongoose 5, TypeScript 4.2, Passport 0.4), so use exactly this Node version rather than the latest. With [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows)):
  ```bash
  nvm install 20.11.0
  nvm use 20.11.0
  ```
- **MongoDB:** a local instance or a hosted cluster such as MongoDB Atlas. Mongoose 5.11 was released before MongoDB 5.0, so a 4.x server is the safest choice.
- **A running [oauth2-server](https://github.com/ptitsynamv/oauth2-server).** Every `/api/*` endpoint checks tokens against it. By default it listens on `http://localhost:3002/`. Swagger UI signs in with the client id **`swagger-id`**.
- **A POSIX shell for `npm run build`.** The build script uses `cp`. On Windows, use Git Bash or WSL.

## Getting started

1. **Clone the repo and install dependencies**
   ```bash
   git clone https://github.com/ptitsynamv/data-server.git
   cd data-server
   nvm use 20.11.0
   npm install
   ```

2. **Configure the environment.** Copy the example file and fill in the values:
   ```bash
   cp .env.example .env
   ```

   | Variable | Example | Description |
   |---|---|---|
   | `MONGO_URL` | `mongodb://localhost:27017/data-server` | MongoDB connection string |
   | `OAUTH_SERVER_URL` | `http://localhost:3002/` | Base URL of oauth2-server. **It must end with `/`.** |
   | `USER_INFO_URL` | `oauth2/userinfo` | Path appended to `OAUTH_SERVER_URL` to validate tokens |
   | `PORT` | `3003` | Port the API listens on |
   | `DEPLOY_URL` | `http://localhost` | Host Swagger UI sends requests to (combined with `PORT`) |

3. **Start oauth2-server**, following that project's README.

4. **Run the development server**
   ```bash
   npm start
   ```
   You should see output like this:
   ```
   server start: http://localhost:3003
   documentation: http://localhost:3003/api-docs/
   mongo db connected
   ```

5. **Try the API.** Open `http://localhost:3003/api-docs/`, click **Authorize**, sign in through oauth2-server with client id `swagger-id`, and send requests from the browser.

### Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the dev server from `src/` with `ts-node-dev` (restarts on changes) |
| `npm run build` | Compiles TypeScript into `build/` and copies `.env` and `src/public/` into it. Fails if `.env` is missing. |
| `npm run start-prod` | Runs the compiled server: `node build/index.js` |

The project has no tests or lint script. To type-check without building, run `npx tsc --noEmit`.

## API overview

All `/api/*` routes need an `Authorization: Bearer <token>` header. List endpoints accept `limit` (default `5`) and `offset`. **`offset` is a page number, not a record count:** `?limit=10&offset=2` returns records 21–30.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/article` | List articles. Returns `{ count, list }`. |
| `GET` | `/api/article/:id` | Get one article |
| `POST` | `/api/article` | Create an article. Body: `{ subject, text }`. `subject` must be unique. |
| `PUT` | `/api/article/:id` | Replace an article |
| `PATCH` | `/api/article/:id` | Update some fields of an article |
| `DELETE` | `/api/article/:id` | Delete an article |
| `GET` | `/api/f-article` | List f-articles. Returns `{ count, list }`. |
| `GET` | `/api/f-article/:id` | Get one f-article |
| `POST` | `/api/f-article` | Create an f-article. Body: `{ title, url }`. |
| `PUT` | `/api/f-article/:id` | Replace an f-article |
| `DELETE` | `/api/f-article/:id` | Delete an f-article |
| `GET` | `/api/public-service-water` | List water readings. Returns an array. |
| `GET` | `/api/public-service-water/last` | Get the most recent reading |
| `GET` | `/api/public-service-water/:id` | Get one reading |
| `POST` | `/api/public-service-water` | Create a reading. Body: `{ data: { hot1, hot1CounterName, hot2, hot2CounterName, cold1, cold1CounterName, cold2, cold2CounterName } }` |
| `DELETE` | `/api/public-service-water/:id` | Delete a reading |

The server sets each record's `date` as an `MM/DD/YYYY` string when the record is created. Responses use `id` in place of MongoDB's `_id`. The F-Article routes (`/api/f-article`) aren't documented in Swagger yet.

## Project structure

```
data-server/
├── .github/workflows/
│   └── deploy.yml          # CD: SFTP upload, then remote build, then pm2 restart
├── src/
│   ├── index.ts            # Entry point: env, Mongo connection, middleware, routes, Swagger UI
│   ├── swagger.config.ts   # Hand-written OpenAPI 3 spec (update it when routes change)
│   ├── routes/             # Express routers, one per resource, plus index.ts barrel
│   ├── controllers/        # Request handlers, plus interfaces.ts for request/response types
│   ├── models/             # Mongoose schemas, plus index.ts barrel
│   ├── middleware/
│   │   └── passport.ts     # Bearer strategy that validates tokens against oauth2-server
│   ├── interfaces/         # Shared types (ErrorResponse, ...)
│   ├── utilities/          # Shared helpers (error handler)
│   └── public/
│       └── index.html      # Landing page served at /
├── .env.example            # Environment variable template
├── tsconfig.json           # Compiles src/ to build/ (CommonJS, ES6)
└── package.json
```

A request passes through `routes/` (where Passport checks the bearer token), then `controllers/`, then `models/`. To add a resource, create a model, controller and router. Then export them from the `index.ts` barrels, add the types to `controllers/interfaces.ts`, mount the router in `src/index.ts`, and document it in `swagger.config.ts`.

## Deployment

Every push to `master` runs the [deploy workflow](.github/workflows/deploy.yml). It does three things:

1. Uploads the repository to `/var/projects/data-server` over SFTP. The upload skips `.env`, so the server keeps its own copy.
2. Runs `npm install && npm run build` on the server.
3. Restarts the app with pm2 as `data-server`.

It needs the repository secrets `SFTP_IP`, `SFTP_PORT`, `SFTP_USERNAME` and `SFTP_PASSWORD`.

To deploy by hand:

```bash
npm install
npm run build
pm2 start build/index.js --name data-server
```

> **Docker:** the `Dockerfile` in the repo is out of date and won't build. It expects a `yarn.lock` and `yarn docker:*` scripts that don't exist. Use the pm2 steps above instead.

## Troubleshooting

**`Error: listen EADDRINUSE: address already in use :::3003`.** Another process is using the port. Find it and stop it:

```bash
# macOS / Linux
lsof -wni tcp:3003
kill <PID>

# Windows (PowerShell)
netstat -ano | findstr :3003
taskkill /PID <PID> /F
```

**Every request returns 401.** Check that oauth2-server is running and reachable at `OAUTH_SERVER_URL`, and that the URL ends with `/`.

**`npm run build` fails with `cp: cannot stat '.env'`.** Create `.env` from `.env.example` before you build.

## License

MIT. The license is declared in `package.json`; the repository has no `LICENSE` file yet.
