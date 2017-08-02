'use strict';

var express = require('express'),
    router = express.Router(),
    request = require('request'),
    expressValidator = require('express-validator'),
    chalk=require('chalk'),
    cors = require('cors');
console.log(chalk.white.bgGreen.bold(" User API  "));

router.use(cors());
/* validate incoming request */


var User = require('../schema/users');

/* ------------ module ---------- */
module.exports.server_signin= function (req, res) {

    console.log(" IN API signin : ",req)
      User.find({username:req.body.username,password:req.body.password},function (err, userDoc) {
            if (err){  res.send(err);}
            else{
                console.log(" username : ", userDoc);
                if(userDoc){
                    res.json({
                    status:true,
                    message:"Successful",
                    token:"uds@214125",
                    username:userDoc.username,
                    firstname:userDoc.firstname,
                    lastname:userDoc.lastname,
                    email:userDoc.email});
                }else{
                    res.json({
                        code:201,
                        status:false,
                        message:"User not found.",
                    });
                }

            }
        });
};



exports.server_register=function (req,res) {
console.log(" IN API register : ",req.body)
      var user=new User({
            username: req.body.username,
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            password:req.body.password,
            email:req.body.email,
            phone:req.body.phone
      });  
      user.save(function (err, docs) {
            if (err)res.send(err);
            res.json({status:true,message:"Successful"});
        });
     
};


module.exports.server_signout=function (req, res) {
    
};

module.exports.getTraineeList=function (req, res) {
    User.find(function (err, docs) {
            if (err){
                res.send(err);
            }else{
                res.json({code:200,status:true,message:"Trainee found.",data:docs});
            }                            
        });
};
