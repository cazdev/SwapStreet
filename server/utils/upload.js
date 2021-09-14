const aws = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")
const path = require('path')

const s3 = new aws.S3()

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: 'ap-southeast-2',
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file type')
    error.code = 'INCORRECT_FILETYPE'
    return cb(error, false)
  }
  cb(null, true)
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'comp3120-group-e',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${file.fieldname + '/' + Date.now() + path.extname(file.originalname)}`);
    }
  }),
  limits: {
    fileSize: 5000000
  }
})

module.exports = upload