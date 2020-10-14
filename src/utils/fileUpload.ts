import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION // region of your bucket
});
const s3 = new aws.S3();
export const getExtension = (data) => {
    return data.substring(data.lastIndexOf(".") + 1)
}
export const awsupload = (data) => multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileExtension = getExtension(file.originalname)
            cb(null, `${data._id}.${fileExtension}`);
        }
    })
});