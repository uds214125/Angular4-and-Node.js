'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var TasksSchema = new Schema({
 taskname: {type:String,default:''},
 description: {type:String,default:''},
 tasktype: {type:Number},
 assignto:{type:String,default:''},
 status:{type:Number,default:''},
 created_at:{type:Date,default:new Date()},
 updated_at:{type:Date,default:''}
});
//export our module to use in server.js
module.exports = mongoose.model('tasks', TasksSchema);

 