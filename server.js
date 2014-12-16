#!/usr/bin/env node
var debug = require('debug')('QuoteWebservice');
var app = require('./app');
var database = require("./config/database")

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
