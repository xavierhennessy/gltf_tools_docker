const rabbit = require("amqplib");
// const { downloadSelectedFiles } = require("./DownloadFiles.js");
// const { containerFunctions } = require("./container.js");
const { containerFunctions } = require("./ConsumerFunctions.js");

const QUEUE_NAME = "test";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

// const url = `amqp://${process.env.AMQP_HOST}` || "amqp://localhost";
const url = "amqp://localhost";

const consumeFunction = () => {
  connection = rabbit.connect(url, "heartbeat=1000");
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.prefetch(1);
    channel.consume(QUEUE_NAME, async (m) => {
      const payload = JSON.parse(m.content);
      console.log("before container Functions ", payload.name);
      await containerFunctions(m.content, payload.name);
      //some func that will set the Gdrive ID to ENV
      //bash script that stats the DL, sesi server then BAKE
      // listen to output for "item_bake_complete" to ack each BAKE
      channel.ack(m);
      console.log("queue acked");
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

//houdini-gdrive-consumer container
// consumer listening to the queue
// when something is queued fire up gdriveDL
// once DLed get houdini onto the files
// then when it's been baked pass it to either
// nodeGdrive or s3 something or other \
// pros:
// dont need dind
// consumer and houdini in one
// cons:
// probably going to have to shell exec or something to do houdini
// still not sure
