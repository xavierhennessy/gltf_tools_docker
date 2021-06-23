require("dotenv").config();
// const { rename } = require("fs-extra");
const NodeGoogleDrive = require("google-drive-connect");
// const { Children } = require("react");

// const ROOT_FOLDER = "1ZqqITD7kceY_uXXRV7tJ8gJysTr2z76p"; //HC PRODUCTS
// const ROOT_FOLDER = "1LX61EUadWur0thPJxY5GGGEct0NuF9zV"; // da otha tes folder
// const ROOT_FOLDER = "1vbVxi0vq7vsfOE7E5fc-RgT1Lbj8Wgwe"; //EA PRODUCTS

// process.on("message", (m) => {
//   console.log("gimme the files");
//   GDriveFiles();
// });

export default async function GetDriveFiles(ROOT_FOLDER) {
  return new Promise(async (resolve, reject) => {
    const googleDriveInstance = new NodeGoogleDrive({
      ROOT_FOLDER: ROOT_FOLDER,
    });

    await googleDriveInstance.useServiceAccountAuth({
      type: "service_account",
      project_id: "bitreel-gltf-tools",
      private_key_id: "29ae30ab7a01b574aad6e547c2f85037ff99e122",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC196Ie1Dbte7C2\noDyzBHdkX8/BIo4d6AzD14YXLAFn882mT9EhI79Ty+KP+WBmvU1h5yFesHO3buPl\nYHNaPR5ClWfhh+pBLLDIYuA4saPY4Mt2Gke/XTOqyhgaA1vnJ/s8JcK1vwMQXaRj\nNsx3gdF/rPv7aDm06e/KyQ67xOIhF30K1SrK3COwl4AUfHsgEbSoCPhXmZYCp3Ys\nuOcLa0jdIqiKG2kqwyTTHTsSsVGybyxDN8LOoBPJa33oUBf7Z1NTb8ow8QMm+WXB\nq8xWcVuo19KWhPORe9C8jTZARoKO1r+xbahvpOf8F0NKk2ojooP6td+OyXS9yl00\nQ6WJJ6AlAgMBAAECggEANpo3rhuM3eczSCG+BRPOhbKQY0psrcGvbubRyEs+osRQ\nTdr+jHyvEUSJWB2DFWExgrK52zGEj6L5RJ+UDZxwY5d0hALmQqdX5tFwqeJ4IYCW\n3PoW1G/xrIqW/9tJLQxcwZgtHJ9UGomW5eSQJz4vsKmmNTL5ufVGrKl3P9Xc6wOg\n7EZJHTD3EuJkAwYsAk0Uxyt+KzdXguOY9Mzp7BOEFfEWtAwHHMkLUnX8J/bOXPbZ\nypO74wt68IOaMk6sboMdCUdvb2LYXax3OFozFGX3X2efDuflDsV8p5w3/jhm53+C\nLoPvg4iX+HCTOdcjhOmOeoXiZvK6lTO6X/7lRu5CUwKBgQDo7OoYLnAx1Hv23eUb\nWBv9HTHmAMCEWnn1X0mmaQ2Bz0jn6nmeMw3Npq8UVsn36bw7ATN6wjVt1WqypJ1a\njJgM46riqPZBi4BnTL4LSmgADMaZytvmBp6QcMm2iUodcfZ8BR3gTxBVdN6iRQ59\nhnD5hWD5csVwDliKXlhIxaDLKwKBgQDH/mZOcNZZIZ9mfVVutM2WvALTiFQBYBI4\nUjXkvFtkqQNXmEYjtjvTQHyRIOVL0acDzXSp9SmDqHRHKWrICjVICFz+goB9lT1F\nIeBwFqo4h0+DG1r/xickBSuTAFeWyIC368jW9HE/rS4ncZMYjFWnR02BemYjk8jQ\nQVTjEDhZ7wKBgFBedsOTOmknLQLYO5Y8x6OFcFMxTTwdz9kHYO1HcD6rHDfRYtdg\nPFIKQnzdGWEuSCF/35hq7G6SZfdv709wFYLVB4Cf1iB1lv+NrkFNEid6QQiNw2RS\nQmIKWL9gDa+tQ+Q1C8L65OLnqW4KL97GBbNC/1vy6wcoHAraVNH/RuTzAoGBAJZD\nvein/VVg3txpxTv12xarUtBO+RdDcM0ib93Z7C1Yk+tHvUNt08tpA28jsUTjVEKW\nJ1bfnn6Onjctlk6Q5PGnXv/XW+V/sVZ1GqX9UY5BlGtkrV3KK3Rz8gZ0VlszcQs/\nvFpNtZ1raGc4fZYPMvgJqeFj7sRCcLqQq9AjSsO/AoGBALD4nCiy/9ZjZYGSf+K1\nt2W+ooy+6ksgLiM1cleDHGhgvb8SmJ0zF0mqTRY11xyyMbpeee2jARZfxNVcFUe1\nvRhrdoarx45z4/OvxBw5N1cLVRhPKfxHZN2ZnFPgEss+qrZL2MrrDt5B/FIfvVGk\n3MbaANbeIvr/FMXY35CSuX1Z\n-----END PRIVATE KEY-----\n",
      client_email:
        "gltf-tools-drive-api@bitreel-gltf-tools.iam.gserviceaccount.com",
      client_id: "107780005496948788278",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/gltf-tools-drive-api%40bitreel-gltf-tools.iam.gserviceaccount.com",
    });

    let final = [];
    // let getRootFolder = await googleDriveInstance.listFiles(
    //   ROOT_FOLDER,
    //   null,
    //   true
    // );

    let rootFolder = {
      id: ROOT_FOLDER,
      name: "PODS",
    };
    rootFolder.icon = "CarryOutOutlinedd";
    rootFolder.title = rootFolder.name;
    rootFolder.key = "0-0";

    rootFolder.children = [];

    //getting item category as root chlildren
    let getRootChildren = await googleDriveInstance.listFolders(
      ROOT_FOLDER,
      null,
      false
    );
    getRootChildren.folders.forEach((folder) => {
      if (!folder.name.startsWith("XXX")) {
        rootFolder.children.push(folder);
      }
    });

    let x = rootFolder.children.length;
    // console.log("x = " + x);
    rootFolder.children.forEach(async (child, index) => {
      child.icon = "carryoutlined";
      child.title = child.name;
      child.key = child.id;
      let getItemList = await googleDriveInstance.listFolders(
        child.id,
        null,
        false
      );
      rootFolder.children[index].children = getItemList.folders;

      let p = rootFolder.children[index].children.length;
      // console.log("p = " + p);
      rootFolder.children[index].children.forEach(async (c, i) => {
        // console.log("i = " + i);
        c.icon = "carryoutlined";
        c.title = c.name;
        c.key = c.id;

        setTimeout(async () => {
          let getItem = await googleDriveInstance.listFolders(
            c.id,
            null,
            false
          );
          let output = getItem.folders.filter(
            (folder) => folder.name === "01_Output"
          );
          setTimeout(async () => {
            let varient = await googleDriveInstance.listFolders(
              output[0].id,
              null,
              false
            );
            p--;
            varient.folders.forEach((v, i) => {
              v.icon = "carryoutlined";
              v.title = v.name;
              v.key = v.id;
            });

            rootFolder.children[index].children[i].children = varient.folders;
            if (!p) {
              console.log("finished section");
              x--;

              if (!x) {
                console.log("files are ready");
                setTimeout(() => {
                  final.push(rootFolder);
                }, 0);
                resolve(final);
                // console.log(final);
              }
            }
          }, 100 * i);
        }, 100 * i);
      });
    });
  });
}
