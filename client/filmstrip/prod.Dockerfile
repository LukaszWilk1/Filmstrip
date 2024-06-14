# client/filmstrip/Dockerfile
FROM node:lts as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY ./default.conf /etc/nginx/templates/default.conf
COPY --from=build /app/build /usr/share/nginx/html

# Uruchomienie Nginxa
CMD ["nginx", "-g", "daemon off;"]