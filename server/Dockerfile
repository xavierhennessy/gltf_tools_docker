FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 4444
EXPOSE 5672

CMD [ "npm", "start"]