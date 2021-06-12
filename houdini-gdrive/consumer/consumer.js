const rabbit = require("amqplib");
const { downloadSelectedFiles } = require("./DownloadFiles.js");

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
      console.log(payload);
      await downloadSelectedFiles(payload);
      channel.ack(m);
    });
  });
};

consumeFunction();
