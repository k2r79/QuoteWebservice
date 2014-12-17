var mongoose = require("mongoose");
var request = require("request");

describe("Quotes ", function() {
    var quote = {
        quoteText: "Test quote text"
    };

    before(function(done) {
        clearDatabase();

        done();
    });

    after(function(done) {
        clearDatabase();

        done();
    });

    it("can't be created if the quote text is empty", function(done) {
        request({
            uri: rootUrl + "/quotes/new",
            method: "POST",
            form: {
                quoteText: null
            },
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(400);
            expect(body.message).to.equal("The quote's text is not specified !");

            done(err);
        });
    });

    it("can be created", function(done) {
        request({
            url: rootUrl + "/quotes/new",
            method: "POST",
            form: {
                quoteText: quote.quoteText
            },
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(201);
            expect(body.message).to.equal("The quote has been created successfully");

            expect(body.newQuote.quoteText).to.equal(quote.quoteText);
            expect(body.newQuote.date).to.not.be.null;

            quote = body.newQuote;

            done(err);
        });
    });

    it("can all be returned", function(done) {
        request({
            url: rootUrl + "/quotes",
            method: "GET",
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(200);

            expect(body.quotes.length).to.equal(1);
            for (var fieldIndex in body.quotes[0]) {
                expect(body.quotes[0][fieldIndex]).to.equal(quote[fieldIndex]);
            }

            done(err);
        });
    });
});

function clearDatabase() {
    for (var collectionIndex in mongoose.connection.collections) {
        mongoose.connection.collections[collectionIndex].remove(function () {
        });
    }
}