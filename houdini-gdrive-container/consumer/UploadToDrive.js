require("dotenv").config();
const NodeGoogleDrive = require("google-drive-connect");
const fs = require("fs-extra");
const { app } = require("electron");
const path = require("path");
const { Docker } = require("node-docker-api");
const { uploadFileToS3 } = require("../backend/ChildProcesses");
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// const ROOT_FOLDER = "1DfsqkCUlkXaF8LTaS8sL0mJIEogiR4XI";
// const ROOT_FOLDER = "1ZqqITD7kceY_uXXRV7tJ8gJysTr2z76p"; //HC PRODUCTS
const ROOT_FOLDER = "1vbVxi0vq7vsfOE7E5fc-RgT1Lbj8Wgwe"; //EA PRODUCTS

process.on("message", (lod) => {
  uploadLodToDrive(lod);
  // console.log("from inside upload to drive " + lod);
});

async function uploadLodToDrive(lod) {
  return new Promise((res, rej) => {
    console.log("we got the lod" + JSON.stringify(lod));
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

  let bitstream = await googleDriveInstance.create({
    name: "07_BITSTREAM_TEST",
    parentFolder: lod.id,
    mimeType: "application/vnd.google-apps.folder",
  });

  let lodLevels = [0, 1, 2, 3];
  lodLevels.forEach(async (level) => {
    let lodFodler = await googleDriveInstance.create({
      name: `lod_${level}`,
      parentFolder: bitstream.id,
      mimeType: "application/vnd.google-apps.folder",
    });

    let lodFiles = fs.readdirSync(
      path.join(
        __dirname,
        `./bake/output/${lod.name}/lod_${level}/` //01_216_208111_38327 here will be lod.name
      )
    );
    lodFiles.forEach(async (file) => {
      let extension = path.extname(file);
      let mimeType = extension.replace(".", "");
      let fileSource = path.join(
        __dirname,
        `./bake/drive/output/${lod.name}/lod_${level}/${file}`
      );
      await googleDriveInstance.create({
        source: fs.createReadStream(fileSource),
        name: file,
        parentFolder: lodFodler.id,
        mimeType: `application/${mimeType}`,
      });
    });
  });

  // let fileName = path.join(__dirname, `./output/01_216_208111_38327/lod_0/mesh.gltf`
  // );

  console.log(`${lod.name} uploaded to Gdrive`);
  res();
  })
}


exports.uploadLodToDrive = uploadLodToDrive