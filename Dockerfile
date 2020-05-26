FROM node:current-slim

WORKDIR /home/maria/Projects/antropogenez-server

COPY src src
COPY package.json .
COPY tsconfig.json .
COPY tslint.json .
COPY yarn.lock .

RUN yarn install
RUN yarn build

EXPOSE 3000
COPY ./build ./build

CMD [ "node", "./build/index.js" ]

