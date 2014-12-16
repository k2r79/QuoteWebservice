module.exports = function(app) {
    var express = require("express"),
        router = express.Router(),
        quoteController = require("./../controllers/quotes-controller");;

    router.get("/", quoteController.displayAll);

    app.use("/", router);
};