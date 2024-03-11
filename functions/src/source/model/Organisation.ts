import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Schema.
const organisationSchema = new Schema(
    {
        organisationId : {type : String, default : null},
        organisationName : {type : String, default : null},
        organisationDescription : {type : String, default : null},
        organisationType : {type : String, default : null},
        organisationUpdatedBy : {type : String, default : null},
        organisationUpdatedAt : {type : String, default : null},
        organisationCreatedBy : {type : String, default : null},
        organisationCreatedAt : {type : String, default : null}
    }
)

module.exports = mongoose.model('organisation', organisationSchema);