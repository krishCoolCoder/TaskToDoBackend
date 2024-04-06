import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Request model schema.
const request = new Schema(
    {
        requestCode : {type : String, default : ""},
        requestTitle : {type : String, default : ""},
        requestDescription : {type : String, default : ""},
        requestType : {type : String, default : ""},
        requestStatus : {type : String, default : ""},
        requestProjectRef : {type : mongoose.Schema.Types.ObjectId , default : null},
        requestTeamRef : {type: mongoose.Schema.Types.ObjectId , default: null},
        requestOrganisationRef : {type: mongoose.Schema.Types.ObjectId , default: null},
        requestUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        requestUpdatedAt : {type : String, default : ""},
        requestCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        requestCreatedAt : {type : String, default : "" }
    }
)
module.exports = mongoose.model('request', request);