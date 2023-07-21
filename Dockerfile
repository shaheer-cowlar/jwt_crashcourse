FROM node:19-alpine

COPY ./package.json /app/
COPY ./src /app/src

WORKDIR /app

RUN npm install

CMD ["node","src/index.js"]