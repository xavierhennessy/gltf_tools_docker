const rabbit = require("amqplib");
// const { downloadSelectedFiles } = require("./DownloadFiles.js");
const { runContainer, runLOD, containerFunctions } = require("./container.js");

const QUEUE_NAME = "test";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

const url = `amqp://${process.env.AMQP_HOST}` || "amqp://localhost";
// const url = "amqp://localhost";

const consumeFunction = () => {
  connection = rabbit.connect(url, "heartbeat=1000");
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.consume(QUEUE_NAME, async (m) => {
      const payload = JSON.parse(m.content);
      // only handles one ID at time 
      // multiple consumers watch q and pick item when avail
      console.log(payload);
      // await containerFunctions 
      containerFunctions(m.content, payload.name);
      channel.ack(m);
    });
  });
};

consumeFunction();

// consumer is called here
// docker container is kicked off
// that docker containers CMD is to dl files and start sesinetd
// once the sesiserver has started a promise is resolved and the exec can start
// the exec is the same as before
// but once the promise is done is acks the comsumer in queue
