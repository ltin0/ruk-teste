FROM node:18-bullseye AS builder

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:18-bullseye

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
RUN npm install --omit=dev --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]