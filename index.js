const express = require("express");
const {connection} = require("./config/db")
const {userRoute} = require("./routes/user_route");
const {noteRoute} = require("./routes/note_route");
const {authenticator} = require("./middlewares/authenticator_middleware");
require("dotenv").config();
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRoute);
// For all routes we need to authenticate the user first so creating a middle ware
app.use(authenticator);
app.use("/notes",noteRoute);

app.get("/username",(req,res)=>{
})



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log("Error while connection to database");
        console.log({err:error})
    }
    console.log("Server is running at port:"+process.env.port)
})