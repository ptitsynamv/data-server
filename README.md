# Installation
1. Set your keys in `config/keys.ts`;
2. Use `https://github.com/ptitsynamv/oauth2-server` project for authorization with Oauth2. 
Creads:
    * client id:swagger-id
3. Run `yarn && yarn start`:
  * http://localhost:3000 - server
  * http://localhost:3000/api-docs/ - swagger documentation

## Build
Run `yarn build`. Project will be created in `/build` directory.

## Develop
Error: `address already in use :::3000` can be solved with:
`lsof -wni tcp:3000`
`kill {id}`

## DB
remotemysql

