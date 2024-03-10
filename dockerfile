FROM node:21.7 AS interface

WORKDIR /usr/src/app

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn

COPY ./frontend .

RUN yarn build:prod

FROM node:21.7 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn update

COPY . .

FROM node:21.7 AS finally

COPY --from=interface /usr/src/app/build ./public/
