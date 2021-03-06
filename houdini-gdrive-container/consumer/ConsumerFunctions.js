const { exec, execSync } = require("child_process");

const changePermissions = () => {
  return new Promise(async (res, rej) => {
    await exec("chmod -R 777 /root/bake");
    console.log("permissions changed...");
    res();
  });
};

const bakeLods = (itemName) => {
  return new Promise((res, rej) => {
    let lodBake = exec(
      `/bin/bash -c 'source /root/sourceHoudini.sh' &&  /opt/hfs18.0.597/bin/hython2.7 /root/bake/bitstream_baker/bitstream_bake.py -i 2 -s /root/bake/input/${itemName}/ -t /root/bake/output/${itemName}/ /root/bake/bitstream_baker/bitstream_item_bake_pipeline.hiplc`
      // "bash bakeLod.sh"
    );
    console.log("container functions .. ", itemName);
    lodBake.stdout.on("data", (d) => {
      let string = d.toString();
      console.log(string);
      if (string.includes("item_bake_completed")) {
        res();
        console.log(` ${itemName} is done ...`);
      }
    });
    lodBake.stderr.on("data", (e) => {
      let errString = e.toString();
      if (errString.includes("No licenses")) {
        res();
      }
      console.log(`stderr: ${e}`);
    });
    lodBake.on("close", (code) => {
      console.log(`bake exit, code => ${code}`);
      if (code === 1) {
        res();
      }
    });
  });
};

exports.bakeLods = bakeLods;
exports.changePermissions = changePermissions;
