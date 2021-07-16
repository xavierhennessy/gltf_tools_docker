const { exec } = require("child_process");
const express = require("express");
const rabbit = require("amqplib");
const { ECONNREFUSED } = require("constants");

const app = express();
const port = 4444;

const QUEUE_NAME = "bitreel-rmq";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test page is working");
  // console.log(process.env.AMQP_HOST);
});

app.post("/q", (req, res) => {
  //TODO: send back item names for the progess modal
  let reply = req.body.data.map((obejct) => obejct.name);
  res.send(reply);
  queueFunction(req.body);
  console.log(req.body);
});

app.listen(port, () => {
  console.log("We're live on " + port);
  //   console.log(data);
});

// const url = `amqp://${process.env.AMQP_HOST}`;
const url = "amqp://bitreel:bitreel@23.23.238.129:5672";

const queueFunction = async (objects) => {
  connection = rabbit.connect(url);
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    objects.data.forEach((object) => {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(object)));
      // console.log(object + " has been queued");
    });
  });
};

// `cd /root/ && /root && /root/startHoudiniLicenseServer.sh && /bin/bash -c source /root/sourceHoudini.sh && hython /root/drive/bitstream_baker/bitstream_bake.py -i 69 -s /root/drive/files/${gDriveObject.name} -t /root/drive/output/${gDriveObject.name} /root/drive/bitstream_baker/bitstream_item_bake_pipeline.hiplc`;
//how it will work

//TODO:
// for rabbit
// consumer to only handle one thing each
// only handles one ID at time
// multiple consumers watch q and pick item when avail
// 2 consumers local
// 4 q

// run server
//docker run -p 4444:4444 --add-host=host.docker.internal:host-gateway -e AMQP_HOST='host.docker.internal' queue
// --add-host=host.docker.internal:host-gateway -e AMQP_HOST='host.docker.internal'
// docker run -p 4444:4444 --name queue -d  queue

//run consumer
// docker run --privileged --name consumer --add-host=host.docker.internal:host-gateway -e AMQP_HOST='host.docker.internal' -v /var/run/docker.sock:/var/run/docker.sock consumer
// docker run -d --name houdini-consumer  houdini-consumer

// run rabbit
//docker run --rm --name rabbitmq -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management

//ssh -i ~/.ssh/rabbitmq-ssh-key.pem ubuntu@23.23.238.129
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

const otherTestData = [
  {
    id: "1u9-Xm_E7WZD0an8YKEKM8E3_PWwZjR-Q",
    name: "01_167_403190_800",
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1sdDDctBa0l6sq-D6g-YzTGjnSD6RykaG"],
    modifiedTime: "2021-05-14T04:01:23.304Z",
    icon: "carryoutlined",
    title: "01_167_403190_800",
    key: "1u9-Xm_E7WZD0an8YKEKM8E3_PWwZjR-Q",
  },
  {
    id: "14mNr5QSvdZEMCCuQakJxBJwCXrzRMP-h",
    name: "02_168_403190 _804",
    mimeType: "application/vnd.google-apps.folder",
    parents: ["1sdDDctBa0l6sq-D6g-YzTGjnSD6RykaG"],
    modifiedTime: "2021-05-05T05:04:59.654Z",
    icon: "carryoutlined",
    title: "02_168_403190 _804",
    key: "14mNr5QSvdZEMCCuQakJxBJwCXrzRMP-h",
  },
];
