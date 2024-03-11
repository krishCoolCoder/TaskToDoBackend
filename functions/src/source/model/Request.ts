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
        requestTeamRef : {type : String, default : ""},
        requestOrganisationRef : {type : String, default : ""},
        requestUpdatedBy : {type : String, default : ""},
        requestUpdatedAt : {type : String, default : ""},
        requestCreatedBy : {type : String, default : ""},
        requestCreatedAt : {type : String, default : "" }
    }
)
module.exports = mongoose.model('request', request);