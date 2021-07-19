# Install

- clone this repo

## Build & Run Queue Container

- This container is responsible for recieving a message from the publisher (react app) and queueing them with rabbitmq

- Run the following in terminal:

```
cd server
docker build -t queue .
docker run -p 4444:4444 --name queue-server -d  queue
```

## Build & Run Consumer Container

- Run the following in terminal:

```
cd houdini-gdrive-container
docker build -t houdini-consumer .
docker run -d --name houdini-consumer  houdini-consumer
```

- You can have up to 2 consumers running at once as long as someone else isn't running one elsewhere

## Start React App

```
cd /react-app
npm start
```

- You need to enbale CORS to send messages from react app to queue container running locally

- I've been using:
  https://addons.mozilla.org/en-CA/firefox/addon/cors-everywhere/

# Other stuff

- I've been using https://github.com/jesseduffield/lazydocker to keep track of container logs. Makes life a little easier
