const NodeGoogleDrive = require("google-drive-connect");
const fs = require("fs-extra");

const path = require("path");

const pLimit = require("p-limit");

const downloadFileLimiter = pLimit(1);
const listFolderLimit = pLimit(1);
const listFilesLimit = pLimit(1);

// const ROOT_FOLDER = "1DfsqkCUlkXaF8LTaS8sL0mJIEogiR4XI"
// const ROOT_FOLDER = "1ZqqITD7kceY_uXXRV7tJ8gJysTr2z76p" //HC PRODUCTS
const ROOT_FOLDER = "1vbVxi0vq7vsfOE7E5fc-RgT1Lbj8Wgwe"; //EA PRODUCTS

let localDirectories = [];
let containerDirectories = [];

async function downloadSelectedFiles(gDriveObject) {
  console.log("message received, downloading =>" + gDriveObject.name);
  const googleDriveInstance = new NodeGoogleDrive({
    ROOT_FOLDER: ROOT_FOLDER,
  });

  let gdrive = await googleDriveInstance.useServiceAccountAuth({
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

  // let i = gDriveObject.length;
  // selectedFiles.forEach(async (file) => {
  listFolderLimit(
    () =>
      new Promise(async (folderResolve) => {
        let getFbx = await googleDriveInstance.listFolders(
          gDriveObject.id,
          null,
          false
        );
        let fbx = getFbx.folders.filter((folder) => folder.name === "01_FBX");

        setTimeout(() => {
          folderResolve();
        }, 200);

        listFilesLimit(
          () =>
            new Promise(async (fileListResolve) => {
              let fbxFiles = await googleDriveInstance.listFiles(
                fbx[0].id,
                null,
                false
              );

              var dir = path.join(__dirname, `./${gDriveObject.name}`);
              localDirectories.push(dir);

              var containerDir = `${gDriveObject.name}`;
              containerDirectories.push(containerDir);

              // var output = path.join(__dirname, `../../drive/output/${file.name}`)

              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }

              // if (!fs.existsSync(output)) {
              //   fs.mkdirSync(output, { recursive: true })
              // }

              let d = fbxFiles.files.length;
              fbxFiles.files.forEach(async (DLFile) => {
                downloadFileLimiter(
                  () =>
                    new Promise(async (resolve) => {
                      await googleDriveInstance.getFile(
                        DLFile,
                        path.join(__dirname, `./${gDriveObject.name}`)
                      );
                      console.log(
                        `${DLFile.name} of ${gDriveObject.name} downloaded`
                      );
                      d--;
                      if (!d) {
                        // i--;
                        console.log("###" + gDriveObject.name + "downloaded");
                      }
                      // if (!i) {
                      //   console.log("all files finished");
                      //   // process.send(selectedFiles);
                      // }

                      setTimeout(() => {
                        resolve(true);
                      }, 200);
                    })
                );
              });
              setTimeout(() => {
                fileListResolve();
              }, 200);
            })
        );
      })
  );
  // });
}

let gDriveObject = JSON.parse(process.env.GDRIVE_OBJECT);
// let gDriveObject = {
//   id: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
//   name: "02_196_432016",
//   mimeType: "application/vnd.google-apps.folder",
//   parents: ["1DujD5UdujAyI1HMfH-NNC-Cg76bSsxfI"],
//   modifiedTime: "2021-05-05T05:30:57.160Z",
//   icon: "carryoutlined",
//   title: "02_196_432016",
//   key: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
// };
console.log(gDriveObject);
downloadSelectedFiles(gDriveObject);

// process.on("message", async (selectedFiles) => {
//   downloadSelectedFiles(selectedFiles)
// })
// const testData = [
//   {
//     id: "1FMS4H4ovw8Pdb2_ffqqg9OfYCRC4WUOu",
//     name: "01_195_432015",
//     mimeType: "application/vnd.google-apps.folder",
//     parents: ["1DujD5UdujAyI1HMfH-NNC-Cg76bSsxfI"],
//     modifiedTime: "2021-05-05T05:30:46.295Z",
//     icon: "carryoutlined",
//     title: "01_195_432015",
//     key: "1FMS4H4ovw8Pdb2_ffqqg9OfYCRC4WUOu",
//   },
//   {
//     id: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
//     name: "02_196_432016",
//     mimeType: "application/vnd.google-apps.folder",
//     parents: ["1DujD5UdujAyI1HMfH-NNC-Cg76bSsxfI"],
//     modifiedTime: "2021-05-05T05:30:57.160Z",
//     icon: "carryoutlined",
//     title: "02_196_432016",
//     key: "1HsGWbXA4VVE1iTw7XmW5lLDZJSAYtU0v",
//   },
// ];

// downloadSelectedFiles(testData);
// exports.downloadSelectedFiles = downloadSelectedFiles;
