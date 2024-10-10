const express =require("express")
const User = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


const securePassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async(req,res)=>{
    try{
        const {name,password,email,phone} = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const isEmailExists = await User.findOne({email})
        if(isEmailExists){
            res.status(409).json({ message: "User already exists" });
        }else{
            const passwordhash =await securePassword(password)
            const user = await User.create({
                name:name,
                profileImage: image,
                password:passwordhash,
                email:email,
                phone:phone
            })
            return res.status(200).json({ message: "User is registered", user });
        }
    }catch(err){
        console.log(err);
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}= req.body
        const user = await User.findOne({email})

        if(user){
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})

                res.cookie("token",token,{
                    httpOnly:true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    secure: false,
                    sameSite: 'lax',
                });

                return res.status(200).json({
                    message: "Login successful",
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.profileImage
                  });
                }else{
                    res.status(401).json({message: "Invalid email or password"})
                }
            }else{
                return res.status(500).json({ message: "Invalid email or password" });
            }
        }catch(err){
            console.log(err);
        }
    }

    const updateUser = async(req,res)=>{
        try{
            const {id,email,name} = req.body
             const image = req.file ? `/uploads/${req.file.filename}` : null;
            console.log(image);
    
            let updatedData = {}
            const user = await User.findOne({ _id: id });
            if(!user){
                return res.status(404).json({message: "User not found" })
            }
            if(name){
                updatedData.name = name;
            }
            if(email){
                updatedData.email = email;
            }
            if(image){
                updatedData.profileImage = image;
            }
            const updatedUser = await User.findByIdAndUpdate(id,updatedData)
            res.json({message:"Updation succes", updatedUser})
        }catch(err){
            console.log(err); 
        }
    }

    const getUserData= async(req,res)=>{
        try{
            const id = req.params.id
            const user =await User.findById(id)
            res.json(user)
        }catch(err){
            console.log(err);
        }
        
    }

    const logoutUser= async(req,res)=>{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set to true in production (HTTPS)
            sameSite: 'Lax',
          });
          res.status(200).json({ message: 'Logged out successfully' });
    }


module.exports={signUp,login,updateUser,getUserData,logoutUser};
