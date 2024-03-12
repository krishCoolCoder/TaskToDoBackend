import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Schema.
const organisationSchema = new Schema(
    {
        organisationId : {type : String, default : null},
        organisationName : {type : String, default : null},
        organisationDescription : {type : String, default : null},
        organisationType : {type : String, default : null},
        organisationUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        organisationUpdatedAt : {type : String, default : null},
        organisationCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        organisationCreatedAt : {type : Number, default : Date.now()}
    }
)

module.exports = mongoose.model('organisation', organisationSchema);