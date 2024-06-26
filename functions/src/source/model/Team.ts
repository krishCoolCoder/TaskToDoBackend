import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the team schema.
const teamSchema = new Schema(
    {
        teamId : {type : String, default : null},
        teamName : {type : String, default : null},
        teamDescription : {type : String, default : null},
        teamStatus : {type : String , default : null},
        teamOrganisationRef : {type: mongoose.Schema.Types.ObjectId , default: null},
        teamUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        teamUpdatedAt : {type : String, default : null},
        teamCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        teamCreatedAt : {type : String, default : null}
    }
)
module.exports = mongoose.model('team', teamSchema);