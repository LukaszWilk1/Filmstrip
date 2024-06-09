FROM node:lts

WORKDIR /app

ENV CI=true
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

COPY package*.json ./
COPY *.config.js ./

RUN npm install

CMD ["npm", "start"]