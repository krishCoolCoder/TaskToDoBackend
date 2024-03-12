import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Schema for userTeamMapping model.
const userTeamMappingSchema = new Schema(
    {
        userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default : null},
        teamId : {type: mongoose.Schema.Types.ObjectId, ref: 'teams', default : null},
        userTeamMappingUpdatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default : null},
        userTeamMappingUpdatedAt : {type: String, default : null},
        userTeamMappingCreatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default : null},
        userTeamMappingCreatedAt : {type: String, default : null}
    }
);

module.exports = mongoose.model("userTeamMapping", userTeamMappingSchema);