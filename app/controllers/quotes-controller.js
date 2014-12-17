var mongoose = require("mongoose");
var Quote = require("./../models/Quote");
var QuoteModel = mongoose.model("Quote");

exports.displayAll = function(req, res) {
    QuoteModel.getAll(function(quotes) {
        res.json({
            quotes: quotes
        });
    });
};

exports.create = function(req, res) {
    var quote = new Quote();

    if (!req.body.quoteText) {
        res.status(400);
        res.json({
            message: "The quote's text is not specified !"
        });

        return false;
    }

    quote.quoteText = req.body.quoteText;

    quote.save(function(error) {
        if (error) {
            res.status(500);
            res.json(error);

            return false;
        }

        res.status(201);
        res.json({
            message: "The quote has been created successfully",
            newQuote: quote
        });

        return true;
    });
};