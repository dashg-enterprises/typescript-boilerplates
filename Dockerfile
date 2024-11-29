# Version 4
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder ./app/out ./out
COPY package.json .
COPY package-lock.json .
RUN npm install --omit-dev
CMD [ "npm", "start" ]