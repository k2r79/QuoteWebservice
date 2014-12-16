module.exports = function(app) {
    var express = require("express"),
        router = express.Router(),
        quoteController = require("./../controllers/quotes-controller");;

    router.get("/", quoteController.displayAll);
    router.post("/new", quoteController.create);

    app.use("/quotes/", router);
};