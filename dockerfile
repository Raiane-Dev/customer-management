FROM node:21.7 AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn update

COPY . .

FROM node:21.7 AS finally

