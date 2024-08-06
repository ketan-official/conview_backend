const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const https = require('https');
const awsConfig = {
  accessKeyId: "DO00WMCYH3RNJ2LUMWNZ",
  secretAccessKey: "AcdO0Pf+S70L46hUchfJTBrDOr7vEVJIvHUbGooaPos",
  endpoint: new AWS.Endpoint("https://ezypg.blr1.digitaloceanspaces.com"),
  s3ForcePathStyle: true, // Required for DigitalOcean Spaces compatibility
  signatureVersion: 'v4',
  httpOptions: {
    agent: new https.Agent({
      rejectUnauthorized: false, // Disable SSL certificate validation
    })
  }
};
// const awsConfig = {
//   accessKeyId: "DO00UXEMBFNJFR78CGVQ",
//   secretAccessKey: "TZuMCESNdx6iRrI8cWOyQNYRDV8j795VHeb9O6kjsxc",
// };
// awsConfig.endpoint = new AWS.Endpoint("https://nyc3.digitaloceanspaces.com");

const S3Bucket = new AWS.S3(awsConfig);

//for single file upload
exports.uploadsingleToS3 = (fileData, fileType) => {
  const spaceName = "ezypg";
  return new Promise((resolve, reject) => {
    const uniqueKey = `test-${Date.now().toString()}.${fileType}`;
    const params = {
      Bucket: spaceName,
      Key: uniqueKey,
      Body: fileData,
      ACL: "public-read",
    };

    S3Bucket.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

//Multiple File Upload
exports.uploadToS3 = (fileData, fileType) => {
  const spaceName = "ezypg"; // Replace with your Space name
  const uploadPromises = [];
  for (const file of fileData) {
    const fileName = `cd-${Date.now().toString()}.${fileType}`; // You can adjust the file naming logic
    const fileContent = file.fileData; // Assuming fileData contains the file content
    const params = {
      Bucket: spaceName,
      Key: fileName,
      Body: fileContent,
      ACL: "public-read",
    };
    const uploadPromise = new Promise((resolve, reject) => {
      S3Bucket.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    uploadPromises.push(uploadPromise);
  }
  return Promise.all(uploadPromises);
};
