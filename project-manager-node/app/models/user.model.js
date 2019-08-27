const mongoose = require('mongoose');
const UserSchema =  mongoose.Schema({
 First_Name: String,
 Last_Name: String,
 Employee_ID: String
});
module.exports = mongoose.model('User', UserSchema);