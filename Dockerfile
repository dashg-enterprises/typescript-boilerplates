# Version 4
ARG NPM_DDD_PLATFORM_ACCESS_TOKEN

FROM node:lts-alpine3.21 AS builder
ARG NPM_DDD_PLATFORM_ACCESS_TOKEN
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN rm -rf node_modules
RUN npm install --omit-dev

FROM node:lts-alpine3.21 AS final
WORKDIR /app
COPY --from=builder ./app/out ./out
COPY --from=builder ./app/node_modules ./node_modules
COPY package.json .
COPY package-lock.json .
CMD [ "npm", "start" ]