const mongoose = require('mongoose');
const TaskSchema =  mongoose.Schema({
 Project_ID:String,
 Parent_ID: String,
 Parent_Task: String,
 Task: String,
 Start_Date: String,
 End_Date: String,
 Priority: Number,
 Status:String,
 User_ID: String
});
module.exports = mongoose.model('Task', TaskSchema);
