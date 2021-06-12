FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 4040

CMD [ "npm", "start"]