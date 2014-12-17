var mongoose = require('mongoose');

var QuoteSchema = new mongoose.Schema({
    quoteText: String,
    date: { type: Date, default: Date.now }
});

QuoteSchema.statics.getAll = function(callback) {
    this.find(function(error, quotes) {
        if (error) {
            console.log(error);
        }

        callback(quotes);
    });
};

module.exports = mongoose.model('Quote', QuoteSchema);