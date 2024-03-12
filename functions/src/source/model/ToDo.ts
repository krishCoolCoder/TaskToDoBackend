import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Todo schema.
const todo = new Schema(
    {
        todoCode : {type : String, default : ""},
        todoData : {type : String, default : ""},
        todoTeamRef : {type: Number , default: 1},
        todoOrganisationRef : {type: Number , default: 1},
        todoUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        todoUpdatedAt : {type : String, default : ""},
        todoCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        todoCreatedAt : {type : String, degault : ""}
    }
)
module.exports = mongoose.model('todo', todo);