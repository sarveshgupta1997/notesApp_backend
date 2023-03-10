const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req,res,next)=>{

    const token = req.headers.token;
    if(token){
        const decode = jwt.verify(token,process.env.secretKey,(err,decode)=>{
            if(decode){
                //for getting username
                if(req.path=="/username"){
                    res.send({"user":`${decode.loggedUser}`});
                }
                // we have sent user id while login in jwt payload so that we can use to do operations on notes with only particular user
                req.body.user_id=decode.user_id;

                next();
            }else{
                res.send({"err":"Please Login First"})
            }
        })
        
    }else{
        res.send({"err":"Please Login First"})
    }
}

module.exports={authenticator};