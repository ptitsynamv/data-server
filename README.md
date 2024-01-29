# Data server

## Installation
1. Use nvm (Node Version Manager).
Install node v20.11.0 and npm 10.2.4.
2. Use `https://github.com/ptitsynamv/oauth2-server` project for authorization with Oauth2.
Credential: client id:swagger-id
3. Run `npm install`.
4. Set values in .env file.

## Develop
1. Run `npm start`.

## Build
Run `npm run build`. Project will be created in `/build` directory.

## Bugs
Error: `address already in use :::3000` can be solved with:
`lsof -wni tcp:3000`
`kill {id}`

## Docker
1. `yarn docker:build`
2. `yarn docker:run`

## Server deploy
1. `npm install`
2. `npm run build`
3. With pm2: `pm2 start build/index.js --name data-server`.

## Deploy
Open http://ptitsynamv.1gb.ua:3003
