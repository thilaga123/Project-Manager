const mongoose = require('mongoose');
const ParentSchema =  mongoose.Schema({
 Project_ID:String,
 Parent_Task: String,
});
module.exports = mongoose.model('Parent', ParentSchema);
