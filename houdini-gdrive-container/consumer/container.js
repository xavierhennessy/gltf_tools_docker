const tar = require("tar-fs");
const { Docker } = require("node-docker-api");
const path = require("path");
var platform = require("platform-detect");
// const { default: container } = require("node-docker-api/lib/container");
// const { shell } = require("electron");

const docker = new Docker({
  socketPath: platform.windows
    ? "//./pipe/docker_engine"
    : "/var/run/docker.sock",
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

//run container after the image is built, resolves when done or reject when fail
function runContainer(gDriveObject, containerName) {
  return new Promise((resolve, reject) => {
    resolveContainerStarted = resolve;
    console.log("called run container...");
    console.log(`containerName ===> ${containerName}`);
    docker.container
      .create({
        Image: "xavierhennessy/houdini-gdrive",
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
      .catch((error) => console.log(error))
      .then((container) => container.stop())
      .then((container) => container.delete());
  });
}

async function containerFunctions(gDriveObject, containerName) {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      res();
      container = await runContainer(gDriveObject, containerName);
      console.log("container started, running lod...");
      // runLOD(gDriveObject);
    }, 4000);
  });
}
exports.runContainer = runContainer;
// exports.runLOD = runLOD;
exports.containerFunctions = containerFunctions;
