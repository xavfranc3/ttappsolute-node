FROM node:14.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

COPY .env.docker .env

CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]