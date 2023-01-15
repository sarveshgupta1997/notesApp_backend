const express = require("express");
const {NoteModel} = require("../model/noteModel");

const noteRoute=express.Router();


noteRoute.get("/",async(req,res)=>{
    try {
        const data = await NoteModel.find();
        res.send(data);
    } catch (error) {
        res.send("Eroor while getting notes");
        console.log({err:error})
    }
})

noteRoute.post("/create",async(req,res)=>{
    let payload=req.body;
    try {
        const note = new NoteModel(payload);
        await note.save();
        res.send({Message:` Note-${payload.note} registerd`});
    } catch (error) {
        res.send({err:"Eroor while registering note"})
        console.log({err:error})
    }
})

noteRoute.patch("/update/:id",async(req,res)=>{
    let payload=req.body;
    ID=req.params.id;
    try {
        let note= await NoteModel.findByIdAndUpdate({_id:ID});
        let userID_in_note= note["user_id"];
        let userID_from_jwt= req.body["user_id"];
        if(userID_in_note==userID_from_jwt){
            await NoteModel.findByIdAndUpdate({_id:ID},payload);
            res.send({"message":`Note Updated with id:${ID}`});
        }else{
            res.send({err:"You are not allowed to perform editing in someone's else notes"});
        }
    } catch (error) {
        console.log({err:error})
        res.send("Error while updating note")
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    ID=req.params.id;
    try {
        let note= await NoteModel.findByIdAndUpdate({_id:ID});
        let userID_in_note= note["user_id"];
        let userID_from_jwt= req.body["user_id"];
        if(userID_in_note==userID_from_jwt){
            await NoteModel.findByIdAndDelete({_id:ID});
        res.send({"message":`Note Deleted with id:${ID}`});
        }else{
            res.send({err:"You are not allowed to perform editing in someone's else notes"});
        }
        
    } catch (error) {
        console.log({err:error})
        res.send("Error while Deleting note")
    }
})




module.exports={noteRoute};