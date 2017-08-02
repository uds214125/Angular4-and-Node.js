'use strict';

var chalk=require('chalk');   
console.log(chalk.white.bgGreen.bold(" Task API  "));
 
var Task = require('../schema/tasks');

// 
module.exports.getTask = function (req, res) {
      Task.find(function (err, tasks) {
            if (err)
                res.send(err);
            res.json(tasks);
        });
};

module.exports.addTask = function (req, res) {
     console.log(" IN API Add task : ",req.body)
      var task=new Task({
            taskname: req.body.taskname,
            description:req.body.description,
            tasktype: req.body.tasktype,
            assignto:req.body.trainee,
            status:1
      });  
      task.save(function (err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
};

module.exports.deleteTask = function (req, res) {
     console.log(" IN API Add task : ",req.params)
        
      Task.remove({_id:req.params.id},function (err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
};



  
