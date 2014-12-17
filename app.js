var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

require("./app/routes/quotes-route")(app);

var database = require("./config/database");
var mongoose = require("mongoose");

mongoose.connect(database.url[process.env.NODE_ENV || "development"], function(err) {
    if (err) {
        console.error(err);
        process.exit();
    }
});

module.exports = app;
