const { exec } = require("child_process");

const bakeLods = (itemName) => {
  return new Promise((res, rej) => {
    let lodBake = exec(
      `/bin/bash -c 'source /root/sourceHoudini.sh' &&  /opt/hfs18.0.597/bin/hython /root/bitstream_baker/bitstream_bake.py -i 2 -s /root/files/${itemName}/ -t /root/output/${itemName}/ /root/bitstream_baker/bitstream_item_bake_pipeline.hiplc`
    );
    // /opt/hfs18.0.597/bin/hserver && /opt/hfs18.0.597/bin/hserver -S 23.23.238.129:1715 &&
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
      if (code === 1 ) {
        res();
      }
    });
  });
};

exports.bakeLods = bakeLods;

