import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the TaskToDo schema.
const taskToDo = new Schema(
    {
        taskNo: {type : String, default : "" },
        taskTitle : {type : String, default : ""},
        taskDescription : {type : String, default : ""},
        taskStatus : {type : String, default : ""},
        taskProgress : {type : String, default : ""},
        teamRef : {type : String, default : ""},
        organisationRef : {type : String, default : "" },
        taskUpdatedBy : {type : String, default : ""},
        taskUpdatedAt : {type : String, default : ""},
        taskCreatedBy : {type : String, default : "" },
        taskCreatedAt : {type : String, default : ""}
    }
);

module.exports = mongoose.model('taskToDo', taskToDo);