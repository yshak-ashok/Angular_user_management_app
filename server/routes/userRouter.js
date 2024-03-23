const express=require('express')
const userRouter=express()
const userController=require("../controllers/userController")
const multer = require('multer');
const authToken=require('../middleware/auth')


// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'Images/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname); // Use the original file name for the uploaded file
  },
});
const upload = multer({ storage: storage });

userRouter.post('/userSignUp',userController.userRegistration)
userRouter.post('/userSignIn',userController.userLogin)
userRouter.post('/uploadImage',authToken,upload.single('img'),userController.uploadImage);
userRouter.get('/duplicateEmail',userController.duplicateEmail);

module.exports=userRouter