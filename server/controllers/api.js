const express = require('express')
const bcrypt = require('bcrypt')
const apiRouter = express.Router()
const User = require('../models/UserSchema.js')
const Job = require('../models/JobSchema.js')
const Comment = require('../models/CommentSchema.js')
const Photo = require('../models/PhotoSchema')
const Review = require('../models/UserReviewSchema.js')
const JobPhoto = require('../models/JobPhotoSchema')
//const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const fs = require('fs')
const IMAGE_FOLDER = `${__dirname}/../images/`
const scrub = ({ password, ...user }) => user
const scrubAuthentic = ({ password, ...user }) => user
var ImagesDir = './server/images'
if(!fs.existsSync(ImagesDir)) {
  fs.mkdirSync(ImagesDir)
}

var AvatarDir = './server/images/avatars'
if(!fs.existsSync(AvatarDir)) {
  fs.mkdirSync(AvatarDir)
}
var JobImageDir = './server/images/jobPhotos'
if(!fs.existsSync(JobImageDir)) {
  fs.mkdirSync(JobImageDir)
}
//Picture upload import
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function(request, file, cb) {
    cb(null,'./server/images/avatars');

  },
  filename: function(request, file, cb) {
    cb(null, uuidv4() + - + Date.now() + path.extname(file.originalname))
  }
});
const fileFilter = (request, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
let upload = multer({ storage, fileFilter})

const photoStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'./server/images/jobPhotos');

  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + - + Date.now() + path.extname(file.originalname))
  }
});

let jobPhotoUpload = multer({ photoStorage, fileFilter})

const url = process.env.MONGURL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

apiRouter.post('/api/users/photo', upload.single('photo'), (request, response) => {
  const userID = request.body.userID;
  const photo = request.file.filename;

  const newPhotoData = {
    userID,
    photo: {
      data: fs.readFileSync(path.join(__dirname,'../images/avatars/' + photo)), 
      contentType: 'image/png'
    }
  }
  const newPhoto = new Photo(newPhotoData)
  newPhoto.save()
  .then(photoData => {
    return response.status(200).json({photo: scrubAuthentic(photoData.toJSON()) })
  })
})
apiRouter.post('/api/jobs/photos', upload.single('photo'), (req, res) => {
  const jobID = req.body.jobID;
  const photo = req.file.filename;
  console.log(photo)
  const newPhotoData = {
    jobID,
    photo: {
      data: fs.readFileSync(path.join(__dirname,'../images/avatars/' + photo)), 
      contentType: 'image/png'
    }
  }
  const newPhoto = new JobPhoto(newPhotoData)
  newPhoto.save()
  .then(photoData => {
    return res.status(200).json({photo: scrubAuthentic(photoData.toJSON()) })
  })
})


///USER API ENDPOINTS
apiRouter.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
    })
})

apiRouter.get('/api/users/:id', (request, response) => {
  const id = request.params.id
  User.findOne({_id: id}).then(user => {
    return response.status(200).json(scrub(user.toJSON()))
  })
})

apiRouter.delete('/api/users/:id', (request, response) => {
  const id = request.params.id
  User.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err)
    }
    User.find({}).then(users => {
      response.json(users)
      console.log(users)
    })
  });
})

apiRouter.put('/api/users/:id', async (request, response) => {
  const id = request.params.id
  let user = await User.findOne({_id: id})
  if (!user) {
    return response.status(401).json({ error: 'user does not exist' })
  }
  
  const body = request.body
  const pWord = request.body.password
  const encryptedPass = pWord ? bcrypt.hashSync(pWord, 10) : null
  user.name = body.name ? body.name : (user.name ? user.name : "")
  user.email = body.email ? body.email : (user.email ? user.email : "")
  user.password = encryptedPass ? encryptedPass : (user.password ? user.password : "")
  user.address = body.address ? body.address : (user.address ? user.address : {x: 100000, y: 100000, label: ''})
  user.about = body.about ? body.about : ""
  user.coins = body.coins ? body.coins : (user.coins ? user.coins : 0)
  user.photo = body.photo ? body.photo : ""

  user.save().then(user => {
    return response.status(200).json({ user: scrub(user.toJSON()) })
  })
})

apiRouter.post('/api/login', async (request, response) => {
  console.log("post request initialised")
  const UEmail = request.body.email
  const PWord = request.body.password
  

  const user = await User.findOne({ email: UEmail })

  if (!user) {
    return response.status(401).json({ error: 'invalid user or password' })
  }
  console.log('Got User', user)
  if(bcrypt.compareSync(PWord, user.password)) {
    console.log("password is good")
    
    return response.status(200).json({ user: scrub(user.toJSON())})

  } else if (user.password === PWord) {
    console.log('Got User', user)
    return response.status(200).json({ user: scrubAuthentic(user.toJSON()) })
  }
  return response.status(401).json({ error: 'invalid user or password' })
})

apiRouter.post('/api/register', async (request, response) => {
  const emailSearch = request.body.email
  const password = request.body.password
  const body = request.body
  const existingEmail = await User.findOne({ email: emailSearch })
  const userPhoto = request.body.photo
  if(existingEmail) {
    return response.status(400).json({ error: 'Existing user with this username or email.' })
  }

  const encryptedPass = bcrypt.hashSync(password, 10)
  /*if (!body.email || !body.password || !body.address || !body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }*/

  const user = await new User({
    name: body.name,
    email: body.email,
    password: encryptedPass,
    address: body.address,
    about: body.about || "",
    coins: 20,
    photo: body.photo
  })

  user.save().then(user => {
    return response.status(200).json({user: scrubAuthentic(user.toJSON()) })
  })
})


//JOB API ENDPOINTS
apiRouter.get('/api/jobs', (request, response) => {
  Job.find({}).then(jobs => {
    return response.status(200).json(jobs)
  })
})

apiRouter.get('/api/jobs/:id', (request, response) => {
  const id = request.params.id
  Job.findOne({_id: id}).then(job => {
    return response.status(200).json(job)
  })
})

apiRouter.get('/api/userjobs/:id', async (request, response) => {
  const id = request.params.id
  let user = await User.findOne({_id: id})
  Job.find({$or: [{providerUserId : user._id}, {clientUserId: user._id}, {swapReqUserId: user._id}]}).then(jobs => {
    response.json(jobs)
    console.log(jobs)
  })
})

apiRouter.put('/api/jobs/:id', async (request, response) => {
  const id = request.params.id
  let job = await Job.findOne({_id: id})
  if (!job) {
    return response.status(401).json({ error: 'job does not exist' })
  }
  const body = request.body

  job.providerUserId = body.providerUserId ? body.providerUserId : ""
  job.clientUserId = body.clientUserId ? body.clientUserId : ""
  job.title = body.title ? body.title : job.title
  job.description = body.description ? body.description : job.description
  job.skill = body.skill ? body.skill : job.skill
  job.price = body.price ? body.price : 0
  job.location = body.location ? body.location : job.location
  job.status = body.status ? body.status : 0
  job.swapReqUserId = body.swapReqUserId ? body.swapReqUserId : undefined

  job.save().then(job => {
    return response.status(200).json(job)
  })
})

apiRouter.post('/api/jobs', async (request, response) => {
  const body = request.body

  if ((!body.providerUserId && !body.clientUserId) || !body.title || !body.description || !body.price) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const job = new Job({
    providerUserId: body.providerUserId || "",
    title: body.title,
    description: body.description,
    location: body.location || {x: 100000, y: 100000, label: ''},
    price: body.price || "",
    skill: body.skill || [],
    clientUserId: body.clientUserId || "",
    status: body.status || 0
  })

  job.save().then(job => {
    return response.status(200).json(job)
  })
})

apiRouter.delete('/api/jobs/:id', (request, response) => {
  const id = request.params.id
  Job.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err)
    }
    Job.find({}).then(jobs => {
      return response.json(jobs)
    })
  })
})

//UserReviewApi 
apiRouter.post('/api/reviews', async (request, response) => {
 
  const review = new Review({
    clientUserId: body.clientUserId,
    providerUserId: body.providerUserId,
    review: body.review
  })

  review.save().then(review => {
    return response.status(200).json(review)
  })
})

apiRouter.get('/api/review/', (request, response) => {
  Review.find({}).then(review => {
    response.json(review)
    console.log(review)
  })
})

apiRouter.get('/api/userReview/:id', (request, response) => {
  const id = request.params.id
  Review.find({providerUserId: id}).then(review => {
    response.json(review)
    console.log(review)
  })
})

/*apiRouter.put('api/review/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const update = request.body;
    const query = { _id: id };

    await Review.findOneAndUpdate(query, update, {
      new: true
    })

    response.status(200).json({
      success: true,
      message: 'review has been updated successfully!'
    })
  } catch (error) {
    response.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    })
  }
})
*/ 


apiRouter.delete('/api/review/:id', (request, response) => {
  const id = request.params.id
  Review.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err)
    }
    Review.find({}).then(review => {
      response.json(review)
      console.log(review)
    })
  })
})


//comments API endpoints
apiRouter.get('/api/comments/', (request, response) => {
  Review.find({}).then(comment => {
    response.json(comment)
    console.log(comment)
  })
})

apiRouter.get('/api/usercomments/:id', (request, response) => {
  const id = request.params.id
  Review.find({providerUserId: id}).then(comment => {
    response.json(comment)
    console.log(comment)
  })
})

apiRouter.post('/api/comments/:id', async (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.providerUserId || !body.clientUserId || !body.review) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const comment = new Review({
    clientUserId: body.clientUserId,
    providerUserId: body.providerUserId,
    review: body.review,
    rating: body.rating
  })

  comment.save().then(comment => {
    return response.status(200).json(comment)
  })
})

apiRouter.delete('/api/comments/:id', (request, response) => {
  const id = request.params.id
  Review.deleteOne({ _id: id }, function (err) {
    if (err) {
      return response.status(403).json({ error: err })
    }
    return response.status(200)
  });
})

apiRouter.delete('/api/comments/', (request, response) => {
  Review.deleteMany({}, function (err) {
    if (err) {
      console.log(err)
    }
    Review.find({}).then(comment => {
      response.json(comment)
      console.log(comment)
    })
  });
})

apiRouter.post('/api/users/photo/:id', async (request, response) => {
  console.log("you made it this far")
  const id = request.params.id
  let user = await User.findOne({_id: id})
  if (!user) {
    return response.status(401).json({ error: 'user does not exist' })
  }
  avatarUpload(request, response, async function (err) {
    if(err) {
      return response.status(401).json({ error: 'Image Upload Error' })
    }
  
    await user.save()
    return response.status(200).json({ user: scrubAuthentic(user.toJSON()) })
  })
} 
)

apiRouter.get('/api/userphotos/:id', async (request, response) => {
  const id = request.params.id
  Photo.find({userID: id}).sort({_id: -1}).then(photos => {
    response.json(photos)
    console.log(photos)
  })
})

apiRouter.delete('/api/userphotos/:id', async (request, response) => {
  const id = request.params.id
  Photo.deleteMany({userID: id}).then(photos => {
    response.status(200).send("done")
    console.log("done")
  })
})

apiRouter.delete('/api/photos/:id', async (request, response) => {
  const id = request.params.id
  Photo.deleteOne({_id: id}).then(photos => {
    response.status(200).send("done")
    console.log("done")
  })
})

apiRouter.get('/api/photos/', async (request, response) => {
  
  Photo.find({}).then(photos => {
    response.json(photos)
    console.log(photos)
  })
})

apiRouter.delete('/api/photos/', async (request, response) => {
  
  Photo.deleteMany({}).then(photos => {
    response.status(200).send("done")
    response.json("done")
  })
})

apiRouter.get('/api/jobsphotos/', async (request, response) => {
  JobPhoto.find({}).then(photos => {
    response.json(photos)
    console.log(photos)
  })
})

apiRouter.get('/api/jobphotos/:id', async (req, res) => {
  const id = req.params.id
  JobPhoto.find({jobID: id})
  .then(photos => {
    res.json(photos)
    console.log(photos)
  })
})

apiRouter.delete('/api/jobphotos/:id', async (req, res) => {
  const id = req.params.id
  JobPhoto.deleteMany({jobID: id})
  .then(photos => {
    res.status(200).send("done")
    console.log("done")
  })
})

apiRouter.get('/api/jobs/photos/:id', async (req, res) => {
  const id = req.params.id
  JobPhoto.find({_id: id})
  .then(photos => {
    res.json(photos)
    console.log(photos)
  })
})

apiRouter.delete('/api/jobs/photos/:id', async (req, res) => {
  const id = req.params.id
  JobPhoto.deleteOne({_id: id})
  .then(photos => {
    res.status(200).send("done")
    console.log("done")
  })
})

apiRouter.get('/*', function (request, response) {
  response.sendFile('index.html', { root: 'build' });
});

module.exports = apiRouter