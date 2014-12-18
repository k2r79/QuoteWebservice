var mongoose = require("mongoose");
var Quote = require("../models/Quote");
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

    quote.save(function(error, quote) {
        if (error) {
            console.error(error);

            res.status(500);
            res.json(error);

            return false;
        }

        res.status(201);
        res.location("/quotes/" + quote._id);
        res.send();

        return true;
    });
};

exports.display = function(req, res) {
    QuoteModel.findOne({ _id: req.param("id") }, function(error, quote) {
        if (error) {
            console.error(error);

            res.status(500);
            res.json(error);

            return false;
        }

        res.json({
            quote: quote
        });

        return true;
    });
};