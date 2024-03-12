import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Query model schema.
const query = new Schema(
    {
        queryCode: {type : String, default: ""},
        queryTitle: {type : String, default: ""},
        queryDescription: {type : String, default : ""},
        queryStatus : {type : String, default : ""},
        queryType : {type : String, default  : ""},
        taskQueryRef : {type: mongoose.Schema.Types.ObjectId , ref: 'tasktodos' ,required : true, default: null},
        queryUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        queryUpdatedAt : {type : String , default : ""},
        queryCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        queryCreatedAt : {type : String, default : ""}
    }
);

module.exports = mongoose.model('query', query);