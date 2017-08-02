'use strict';
var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	path = require('path'),
	expressValidator = require('express-validator'),
	cors = require('cors');	

var app = express();
	app.use(cors());

 
app.use(bodyParser.json({limit:'150mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true,limit:'150mb'})); // for parsing application/x-www-form-urlencoded
  
 
// view engine setup
app.set('views', path.join(__dirname , 'views'));
app.set('view engine', 'ejs');  
app.engine('html', require("ejs").renderFile);  

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log('Middleware LOGGED Time :' + Date.now());
  next();
});

/*-------------ALL the routes----------------*/
var index = require('./routes/index'); // not using 
// routing all the request
app.use('/v1', require('./app/core/server/modules/user/routes/core-user-routes'));
 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs');//    res.render('error.html');    //res.status(code || 500).json({"error": message});
});





/********************************SOF db config*************/
var mongoose = require('mongoose');
var router = express.Router();


mongoose.Promise = global.Promise;
var dbUri= process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'+':27017') + '/uddb';
 
var dbURL = mongoose.connect(dbUri);
var mdb = mongoose.connection;

mdb.on('error', function (err) {
    console.error('There was a db connection error');
    return console.error(err.message);
});
mdb.once('connected', function () {
    return console.log('Successfully connected to ' + dbURL);
});
mdb.once('disconnected', function () {
    return console.error('Successfully disconnected from ' + dbURL);
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
/********************************EOF db config*************/



module.exports = app;