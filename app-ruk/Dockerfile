FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install && npx expo install --fix

COPY . .

RUN yarn expo export:web

FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
