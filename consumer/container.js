const tar = require("tar-fs");
const { Docker } = require("node-docker-api");
const path = require("path");
// const { default: container } = require("node-docker-api/lib/container");
// const { shell } = require("electron");

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

let container = null;
let resolveLODRun = null;
let resolveContainerStarted = null;

const promisifyStream = (stream) =>
  new Promise((resolve, reject) => {
    stream.on("data", (d) => {
      let string = d.toString();
      //TODO: change this to detecting "item_bake_completed" & resolve promise
      if (string.includes("server start")) {
        resolveContainerStarted();
        console.log("BAKING LODS!");
        //TODO: once this is done pass it to the upload to whereever func
      }
    });
    stream.on("end", resolve);
    stream.on("error", reject);
  });

// async function runLOD(gDriveObject) {
//   console.log("running lod");
//   // return new Promise(async (resolve, reject) => {
//   //   resolveLODRun = resolve;
//   //   let exec2 = await container.exec.create({
//   //     AttachStdout: true,
//   //     AttachStderr: true,
//   //     privileged: true,
//   //     // Cmd: [
//   //     //   "/bin/bash",
//   //     //   "-c",
//   // `source /root/sourceHoudini.sh && hython /root/drive/bitstream_baker/bitstream_bake.py -i 69 -s /root/drive/files/${gDriveObject.name} -t /root/drive/output/${gDriveObject.name} /root/drive/bitstream_baker/bitstream_item_bake_pipeline.hiplc`,
//   //     // ],
//   //     Cmd: ["echo", `${gDriveObject}`],
//   //   });
//   //   let stream2 = await exec2.start();
//   //   await promisifyStream2(stream2);
//   // });
// }

//run container after the image is built, resolves when done or reject when fail
function runContainer(gDriveObject, containerName) {
  return new Promise((resolve, reject) => {
    resolveContainerStarted = resolve;
    console.log("called run container...");
    docker.container
      .create({
        Image: "houdini-gdrive",
        hostname: "DESKTOP-UM6IC4I",
        name: `${containerName}`,
        Env: [
          `GDRIVE_OBJECT=${gDriveObject}`,
          `GDRIVE_OBJECT_NAME=${containerName}`,
        ],
      })
      .then((container) => container.start())
      .then((container) =>
        container.logs({
          follow: true,
          stdout: true,
          stderr: true,
        })
      )
      .then((stream) => {
        promisifyStream(stream);
      })
      .catch((error) => console.log(error));
  });
}

async function containerFunctions(gDriveObject, containerName) {
  setTimeout(async () => {
    container = await runContainer(gDriveObject, containerName);
    console.log("container started, running lod...");
    // runLOD(gDriveObject);
  }, 2000);
}
exports.runContainer = runContainer;
// exports.runLOD = runLOD;
exports.containerFunctions = containerFunctions;
