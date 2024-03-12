import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Schema for userOrganisationMapping Model.
const userOrganisationMappingSchema = new Schema(
    {
        userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default : null},
        organisationId : {type : mongoose.Schema.Types.ObjectId, ref: "organisations", default : null},
        userOrganisationMappingUpdatedBy: {type: mongoose.Schema.Types.ObjectId, ref: "users", default : null},
        userOrganisationMappingUpdatedAt : {type : String, defualt : null },
        userOrganisationMappingCreatedBy : {type : mongoose.Schema.Types.ObjectId, ref: "users", default : null },
        userOrganisationMappingCreatedAt : {type : String, defualt : null }
    }
);

module.exports = mongoose.model("userOrganisationMapping", userOrganisationMappingSchema)