const express = require("express")
const adminRoute = express.Router()
const { adminLogin,getData,editUser,updateUser,createUser,deleteUser,logoutAdmin} = require( "../controller/adminController")
const { upload } = require("../multer/multer");
const {verifyAdmin}=require('../middleware/verifyAdmin')

adminRoute.post('/login',adminLogin)
adminRoute.get('/data',verifyAdmin,getData)
adminRoute.get('/editUser/:id',verifyAdmin,editUser)
adminRoute.put('/update',verifyAdmin,upload,updateUser)
adminRoute.post('/create',verifyAdmin,upload,createUser)
adminRoute.delete('/delete/:id',verifyAdmin,deleteUser)
adminRoute.post("/logout",verifyAdmin,logoutAdmin)


module.exports = adminRoute