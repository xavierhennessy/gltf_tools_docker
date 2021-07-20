const rabbit = require("amqplib");
const { bakeLods, changePermissions } = require("./ConsumerFunctions.js");
const { downloadSelectedFiles } = require("./DownloadFiles.js");

const QUEUE_NAME = "bitreel-rmq";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

// const url = `amqp://${process.env.AMQP_HOST}` || "amqp://localhost";
const url = "amqp://bitreel:bitreel@23.23.238.129:5672";

const consumeFunction = () => {
  connection = rabbit.connect(url, "heartbeat=1000");
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.prefetch(1);
    channel.consume(QUEUE_NAME, async (m) => {
      const payload = JSON.parse(m.content);
      console.log("Next item up is ...", payload.name);
      await downloadSelectedFiles(payload);
      await changePermissions();
      await bakeLods(payload.name);
      console.log("payload ==> ", payload);
      //TODO: add uploadToWhereEver(does it need a param? dont think so)
      channel.ack(m);
      console.log(`${payload.name} has been ACKNOWLEDGED..`);
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
