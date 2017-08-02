'use strict';

var express = require('express'),
    router = express.Router();
 
     

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Home'});
////    res.sendFile(path.join(__dirname, '../app/client', 'index1.html'));
});
 
module.exports = router