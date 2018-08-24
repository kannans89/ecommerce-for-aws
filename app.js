var express = require('express');
var EcommerceController = require('./EcommerceController');
var app=express();
new EcommerceController(app);
app.use(express.static('public'));