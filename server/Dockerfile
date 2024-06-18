FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

CMD ["npm", "run", "dev"]