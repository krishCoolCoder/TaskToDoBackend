import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for Project;
const projectSchema = new Schema(
    {
        projectId : {type: String, default: null},
        projectName : {type: String, defult: null},
        projectDescription: {type: String, default : null },
        projectUpdatedBy : {type: mongoose.Schema.Types.ObjectId, ref : 'users', default : null},
        projectUpdatedAt : {type : String, default : null },
        projectCreatedBy : {type: mongoose.Schema.Types.ObjectId, ref : 'users', default : null},
        projectCreatedAt : {type: Number, default : Date.now()}
    }
);

module.exports = mongoose.model('project', projectSchema);