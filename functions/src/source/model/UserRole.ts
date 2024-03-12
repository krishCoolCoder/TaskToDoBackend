import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining the Schema for UserRole model.
const userRoleSchema = new Schema(
    {
        roleId : {type : String, default : null},
        roleName : {type : String, default : null},
        roleDescription : {type : String, default : null},
        roleUpdatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        roleUpdatedAt : {type : String, default : null},
        roleCreatedBy : {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
        roleCreatedAt : {type : String, default : null}
    }
)

module.exports = mongoose.model("userRole", userRoleSchema);