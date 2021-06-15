const { exec } = require("child_process");
const express = require("express");
const rabbit = require("amqplib");

const app = express();
const port = 4444;

const QUEUE_NAME = "test";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";
const numbers = ["one", "two", "three", "four", "five"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test page is working");
  console.log(process.env.AMQP_HOST);
});

app.get("/q", (req, res) => {
  res.send("message queued");
  queueFunction(req.body);
  console.log(req.body + "queued");
});

app.listen(port, () => {
  console.log("We're live on " + port);
  //   console.log(data);
});

const url = `amqp://${process.env.AMQP_HOST}`;
// const url = "amqp://localhost";

const queueFunction = async (objects) => {
  connection = rabbit.connect(url);
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    objects.forEach((object) => {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(object)));
      // console.log(object + " has been queued");
    });
  });
};

const consumeFunction = () => {
  connection = rabbit.connect(url);
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    channel.consume(QUEUE_NAME, (m) => {
      const paylaod = JSON.parse(m.content);
      //const square = number * number;
      //kick off container using payload
      console.log(paylaod);
      channel.ack(m);
    });
  });
};

// `cd /root/ && /root && /root/startHoudiniLicenseServer.sh && /bin/bash -c source /root/sourceHoudini.sh && hython /root/drive/bitstream_baker/bitstream_bake.py -i 69 -s /root/drive/files/${gDriveObject.name} -t /root/drive/output/${gDriveObject.name} /root/drive/bitstream_baker/bitstream_item_bake_pipeline.hiplc`;
//how it will work

//express server with endpoints for tasks in AWS
//the (probably) GET? will have item "id" for GDrive to download
//then houdini will do it s thing
//but will all this be inside one container?
//Will it be one for experss server, one for node Gdrive files, one for houdinin?

//notes from Andrew
//make existing dockerfile run express 1989 coudl research sthat shit
//

//docker run -p 4444:4444 --add-host=host.docker.internal:host-gateway -e AMQP_HOST='host.docker.internal' server
// --add-host=host.docker.internal:host-gateway -e AMQP_HOST='host.docker.internal'

//docker run --rm --name rabbitmq -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management

//////////////////////////////////////////////////////////////////////////////////////
//express container waiting for a POST request with Gdrive {} as body
//once it gets the POST it will kick off another container with
//Houdini & Node with google-drive-connect
//said container will download 01_FBX from gdrive
//then houdini will start, bake lods, uplaod to drive, stop & delete
//for each POST req there will be a child container
//there will be a que for something

//inside container
//gdrive will dl some shit
const testData = [
  {
    id: "1FMS4H4ovw8Pdb2_ffqqg9OfYCRC4WUOu",
    name: "01_195_432015",
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1DujD5UdujAyI1HMfH-NNC-Cg76bSsxfI"],
    modifiedTime: "2021-05-05T05:30:46.295Z",
    icon: "carryoutlined",
    title: "01_195_432015",
    key: "1FMS4H4ovw8Pdb2_ffqqg9OfYCRC4WUOu",
  },
  {
    id: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
    name: "02_196_432016",
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1DujD5UdujAyI1HMfH-NNC-Cg76bSsxfI"],
    modifiedTime: "2021-05-05T05:30:57.160Z",
    icon: "carryoutlined",
    title: "02_196_432016",
    key: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
  },
];
