FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src /usr/src/app/src

EXPOSE 8000

CMD ["npm", "run", "start"]
