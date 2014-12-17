#!/usr/bin/env node
var debug = require('debug')('QuoteWebservice');
var app = require('./app');
var database = require("./config/database");

app.use(function(req, res, next) {
    if (!process.env.NODE_ENV
            || process.env.NODE_ENV == "development"
            || process.env.NODE_ENV == "production") {
        console.log(req.method + " - " + req.url);
    }

    next();
});

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
