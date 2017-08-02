var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema = new Schema({
 username: {type:String,default:'',unique:"Already exist."},
 firstname: {type:String,default:''},
 lastname: {type:String,default:''},
 password: {type:String,default:''},
 email:{type:String,default:''},
 phone:{type:Number,default:''},
  status:{type:Number,default:''},
created_at:{type:Date,default:new Date()},
 updated_at:{type:Date,default:''}
});
//export our module to use in server.js
module.exports = mongoose.model('users', UserSchema);
