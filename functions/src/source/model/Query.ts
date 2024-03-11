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
        taskQueryRef : {type : String, default : ""},
        queryUpdatedBy : {type : String, default : ""},
        queryUpdatedAt : {type : String , default : ""},
        queryCreatedBy : {type : String, default : ""},
        queryCreatedAt : {type : String, default : ""}
    }
);

module.exports = mongoose.model('query', query);