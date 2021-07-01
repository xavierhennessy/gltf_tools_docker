const exec = require("child_process").exec;
// const shellScript = exec("sh startConsumer.sh .");

let resolveContainerFunctions = null;

const promisifyStream = (stream) =>
  new Promise((resolve, reject) => {
    console.log("promisify start");
    stream.on("data", (d) => {
      let string = d.toString();
      console.log(string);
      //TODO: change this to detecting "item_bake_completed" & resolve promise
      if (string.includes("no")) {
        resolveContainerFunctions();
        console.log("BAKING LODS!");
        //TODO: once this is done pass it to the upload to whereever func
      }
    });
    stream.on("end", resolve);
    stream.on("error", reject);
  });

const containerFunctions = (object, name) => {
  return new Promise((res, rej) => {
    const shellScript = exec("sh ../startBake.sh");
    // resolveContainerFunctions = res;
    // process.env.GDRIVE_OBJECT = object;
    // process.env.GDRIVE_OBJECT_NAME = name;
    console.log("container functions .. ", name);
    // console.log(process.env.GDRIVE_OBJECT, process.env.GDRIVE_OBJECT_NAME);

    shellScript.stdout.on("data", (d) => {
      let string = d.toString();
      console.log(string);
      if (string.includes("you got me")) {
        res();
        console.log(name, " is done");
      }
    });
    shellScript.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
};

// const { execSync } = require("child_process");
// // stderr is sent to stdout of parent process
// // you can set options.stdio if you want it to go elsewhere
// const stdout = execSync("ls");
// const { spawnSync } = require("child_process");
// const child = spawnSync("ls");
// console.error("error", child.error);
// console.log("stdout ", child.stdout);
// console.error("stderr ", child.stderr);

exports.containerFunctions = containerFunctions;
