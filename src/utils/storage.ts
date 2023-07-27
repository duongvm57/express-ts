import multer = require('multer');
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 = require('multer-s3');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_SECRET_KEY as string,
};

const s3 = new S3Client({
  region: process.env.REGION as string,
  credentials: credentials,
  endpoint: 'http://minio:9000',
  forcePathStyle: true,
});

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const uploadImage = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: process.env.BUCKET as string,
    cacheControl: 'max-age=31536000',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, 'images' + '/'  + `${Date.now().toString()}.jpg`);
    }
  })
});

const uploadFile = multer({
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: process.env.BUCKET as string,
    cacheControl: 'max-age=31536000',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, 'files' + '/'  + `${Date.now().toString()}.jpg`);
    }
  })
});

export { uploadImage, uploadFile };
