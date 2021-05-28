const { exec } = require("child_process");
const express = require("express");
// const bodyParser = require("body-parser");

const app = express();
const port = 4444;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send(req.body);
  console.log(req.body);
  shellCommand(req.body);
});

app.listen(port, () => {
  console.log("We're live on " + port);
  //   console.log(data);
});

function shellCommand(gDriveObject) {
  exec(
    `bin/sh source /root/sourceHoudini.sh && hython /root/drive/bitstream_baker/bitstream_bake.py -i 69 -s /root/drive/files/${gDriveObject.name} -t /root/drive/output/${gDriveObject.name} /root/drive/bitstream_baker/bitstream_item_bake_pipeline.hiplc`,
    { cwd: "/root/" },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    }
  );
}

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
