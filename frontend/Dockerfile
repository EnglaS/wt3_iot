# 1. Byggsteg – skapa produktionbuild
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# 2. Serversteg – serva med Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html