var Quote = require("./../models/Quote");

exports.displayAll = function(req, res) {

};

exports.create = function(req, res) {
    console.log("POST - /quotes/new");

    var quote = new Quote();

    if (!req.body.quoteText) {
        res.send({
            message: "The quote's text is not specified !"
        });

        return false;
    }

    quote.quoteText = req.body.quoteText;

    quote.save(function(error) {
        if (error) {
            res.send(error);
        }

        res.json({
            message: "The quote has been created successfully",
            data: quote
        });
    });
};