FROM node:21.7 AS interface

WORKDIR /usr/src/app

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn

COPY ./frontend .

RUN yarn build

FROM node:21.7 AS backend

WORKDIR /usr/src/app

COPY backend/package.json backend/webpack.config.js ./

RUN yarn

COPY ./backend .

RUN yarn build

FROM node:21.7-alpine AS finally

WORKDIR /usr/src/customer_management

COPY --from=interface /usr/src/app/build ./public/
COPY --from=backend /usr/src/app/dist .

CMD ["node", "dist/main.js"]