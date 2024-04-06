const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
    userId: {type : String, default : null},
    userName: {type : String, default : null},
    firstName: {type : String, default : null},
    lastName: {type : String, default : null},
    email: {type : String, default : null},
    password: {type : String, default : null},
    userTeamRef: {type: mongoose.Schema.Types.ObjectId, ref: "teams", default : null},
    userOrganisationRef: {type: mongoose.Schema.Types.ObjectId, ref: "organisations", default : null},
    userCreatedBy: {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
    userCreatedAt: {type : Number, default : Date.now()},
    userUpdatedBy: {type: mongoose.Schema.Types.ObjectId , ref: 'users' , default: null},
    userUpdatedAt: {type : String, default : null},
    // Add more properties as needed
});

// Create the model
// const User = mongoose.model('user', userSchema);

// Export the model
module.exports = mongoose.model('user', userSchema);
