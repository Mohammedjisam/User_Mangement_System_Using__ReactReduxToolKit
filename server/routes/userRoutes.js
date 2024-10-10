const express = require("express");
const userRoute = express.Router();
const {signUp,login,updateUser,getUserData,logoutUser} = require('../controller/userController')
const userAuth=require('../middleware/userAuth')

const { upload } = require("../multer/multer");  // Import multer setup

userRoute.post('/create',upload,signUp)
userRoute.post('/login',login)
userRoute.put('/update',userAuth.verifyUser,upload,updateUser)
userRoute.get('/:id',getUserData)
userRoute.post("/logout",userAuth.verifyUser,logoutUser)


module.exports=userRoute;
