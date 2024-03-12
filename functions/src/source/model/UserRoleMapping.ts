import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Schema for UserRoleMapping Model.
const userRoleMappingSchema = new Schema(
    {
        userId : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        roleId : {type: mongoose.Schema.Types.ObjectId , ref: 'userroles' , default: null},
        roleMappingUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        roleMappingUpdatedAt : {type : String, default : null},
        roleMappingCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        roleMappingCreatedAt : {type : String, default : null}
    }
);

module.exports = mongoose.model("userRoleMapping", userRoleMappingSchema)