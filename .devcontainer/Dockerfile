# build stage
FROM node:18.20.0-alpine3.18 as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build