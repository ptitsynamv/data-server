FROM node:12

WORKDIR /home/maria/Projects/antropogenez-server/dist

COPY ./src ./src
COPY package*.json ./
COPY tsconfig*.json ./
COPY tslint.json ./
COPY yarn.lock ./
COPY src/index.ts ./

RUN yarn install
RUN yarn build
#
#EXPOSE 8080
#
#CMD [ "node", "./build/index.js" ]
