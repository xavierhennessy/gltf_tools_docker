// const rabbit = require("amqplib");
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4444",
});

// const QUEUE_NAME = "test";
// const EXCHANGE_TYPE = "direct";
// const EXCHANGE_NAME = "main";
// const KEY = "myKey";

// // const url = `amqp://${process.env.AMQP_HOST}`;
// const url = "amqp://localhost";

// export default async function queueFunction(objects) {
//   const connection = rabbit.connect(url);
//   connection.then(async (conn) => {
//     const channel = await conn.createChannel();
//     await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
//     await channel.assertQueue(QUEUE_NAME);
//     channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
//     objects.forEach((object) => {
//       channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(object)));
//       // console.log(object + " has been queued");
//     });
//   });
// }
