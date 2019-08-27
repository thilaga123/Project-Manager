const mongoose = require('mongoose');
const ProjectSchema =  mongoose.Schema({
 Project_Name: String,
 Priority: Number,
 User_ID: String,
 Start_Date: String,
 End_Date: String,
 Status:String,
});
module.exports = mongoose.model('Project', ProjectSchema);