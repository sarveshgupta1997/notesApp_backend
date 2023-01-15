const mongoose = require("mongoose");

const notesSchema =mongoose.Schema({
    title:String,
    note:String,
    category:String,
    user_id:String
});

const NoteModel = mongoose.model("note",notesSchema);

module.exports={NoteModel};