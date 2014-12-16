var express = require("express");
var app = express();

app.set('port', process.env.PORT || 3000);

require("./app/routes/quotes-route")(app);

var database = require("./config/database");
var mongoose = require("mongoose");

mongoose.connect(database.url);

module.exports = app;
