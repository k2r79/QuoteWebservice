module.exports = function(app) {
    var express = require("express"),
        router = express.Router(),
        quoteController = require("./../controllers/quotes-controller");;

    router.get("/", quoteController.displayAll);
    router.post("/new", quoteController.create);
    router.get("/:id", quoteController.display);
    router.delete("/:id", quoteController.remove);

    app.use("/quotes/", router);
};