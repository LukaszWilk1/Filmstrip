FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY *.config.js ./

RUN npm install

CMD ["npm", "start"]