const express = require("express");
const {UserModel} = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

const userRoute=express.Router();

userRoute.get("/",async(req,res)=>{
    try {
        const data = await UserModel.find();
        res.send(data);
    } catch (error) {
        res.send("Eroor while getting users");
        console.log({err:error})
    }
})

userRoute.post("/register",async(req,res)=>{
    let {name,email,pass,age}=req.body;
    try {
        saltRoute = +process.env.saltRoute;
        // Hashing - encrypting using bcrypt
        bcrypt.hash(pass, saltRoute, async function(err, secure_pass) {
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({name,email,pass:secure_pass,age});
                await user.save();
                res.send({Message:`${name} is registerd in db`});
            }
        });
    } catch (error) {
        res.send("Eroor while registering user")
        console.log({err:error})
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {email,pass} = req.body;
        let user = await UserModel.find({email});
        if(user.length>0){
            // Hashing - decrypting using bcrypt
            bcrypt.compare(pass, user[0].pass, (err,result)=> {
                if(result){
                    // const token = jwt.sign({ user_id: user[0]["_id"]}, process.env.secretKey);
                    const token = jwt.sign({ user_id: user[0]["_id"] , loggedUser:user[0]["name"] }, process.env.secretKey);
                    res.send({"msg":`${user[0].name}'s Login Successful`,"token":token});  
                }else{
                    res.send("Wrong Credentials");
                }           
            })
        }else{
            res.send("Wrong Credentials");
        }
    } catch (error) {
        console.log({err:error})
        res.send("Eroor while login")
    }
})


module.exports={userRoute};