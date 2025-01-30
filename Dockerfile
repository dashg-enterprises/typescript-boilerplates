# Version 4
FROM node:lts-alpine3.21 AS builder
ARG NPM_DDD_PLATFORM_ACCESS_TOKEN
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:lts-alpine3.21 AS final
WORKDIR /app
COPY --from=builder ./app/out ./out
COPY package.json .
COPY package-lock.json .
RUN npm install --omit-dev
CMD [ "npm", "start" ]