const mongoose = require("mongoose");

const usersSchema =mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
});

const UserModel = mongoose.model("user",usersSchema);

module.exports={UserModel};