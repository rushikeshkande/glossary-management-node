import * as aws from 'aws-sdk';

const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

export const getExtension = data => {
  return data.substring(data.lastIndexOf('.') + 1);
};
export const awsupload = (file:any) => {
  const { originalname } = file;
  const params = {
    Body: file.buffer,
    Bucket: bucketS3,
    Key: String(originalname),
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err.message);
      }
      resolve(data);
    });
  });
};
