'use strict';
var express = require('express');
var router = express.Router();

var requireControllers = function (name) {
    return require('../controllers/' + name);
};

var app_obj = requireControllers('AppController');
var user_obj = requireControllers('UserController');


// a middleware function with no mount path. This will executed for every request to the router
router.get(function (req, res, next) {
    console.log('Time :' + Date.now());
    next();
});

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Home'});
});

/********************************************************
 core server related routes,  Angular2 routes
 ********************************************************/

router.post('/register',user_obj.server_register,function (req, res, next) {});

router.post('/signin', user_obj.server_signin,function (req, res, next) {});

router.get('/getTraineeList',user_obj.getTraineeList,function (req, res, next) {});

// Task related 
router.get('/getTask', app_obj.getTask,function (req, res, next) {});

router.post('/addTask',app_obj.addTask, function (req, res, next) {});

router.delete('/deleteTask/:id', app_obj.deleteTask,function (req, res, next) {});














































//Other than here : will match url from start to end ^\/(?!admin).*/
/* router.all('/*',function(req,res){
 res.sendFile(path.join(__dirname, '../app/client/', 'index1.html'));
 res.render('index',{title:'Home'});
 });
 */
router.all(/^\/(?!admin).*/, function (req, res) {
    //res.render('index', {title: 'Home'});
	//res.sendFile(path.join(__dirname, '../app/client/dist/', 'index.html'));
	  console.log('Time :' ,path.join(__dirname, '../app/client/dist/', 'index.html'));
	//res.sendFile(path.join(__dirname, '../app/client/dist/', 'index.html'));
	//res.send('oth');
});


module.exports = router;