FROM node:21.7 AS builder

WORKDIR /usr/src/front

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn

COPY ./frontend .

RUN yarn build

WORKDIR /usr/src/back

COPY backend/package.json backend/webpack.config.js ./

RUN yarn

COPY ./backend .

RUN yarn build

FROM node:21.7-alpine AS finally

COPY --from=builder /usr/src/front/build ./public/
COPY --from=builder /usr/src/back/dist/* .

CMD ["node", "bundle.js"]