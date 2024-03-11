import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Todo schema.
const todo = new Schema(
    {
        todoCode : {type : String, default : ""},
        todoData : {type : String, default : ""},
        todoTeamRef : {type : String, default : ""},
        todoOrganisationRef : {type : String, default : ""},
        todoUpdatedBy : {type : String, default : ""},
        todoUpdatedAt : {type : String, default : ""},
        todoCreatedBy : {type : String, default : ""},
        todoCreatedAt : {type : String, degault : ""}
    }
)
module.exports = mongoose.model('todo', todo);