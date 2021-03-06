var mongoose = require("mongoose");
var request = require("request");

describe("Quotes ", function() {
    var quoteLocation;
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

            expect(res.headers.location).to.not.be.undefined;

            quoteLocation = res.headers.location;

            done(err);
        });
    });

    it("can be fetched", function(done) {
        request({
            url: rootUrl + quoteLocation,
            method: "GET",
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(200);

            for (var fieldIndex in body.quote) {
                expect(body.quote[fieldIndex]).to.not.be.null;
            }

            quote = body.quote;

            done(err);
        });
    });

    it("can all be fetched", function(done) {
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

    it("can be deleted", function(done) {
        request({
            url: rootUrl + quoteLocation,
            method: "DELETE",
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(204);

            done(err);
        });
    });

    it("can be fetched but empty", function(done) {
        request({
            url: rootUrl + quoteLocation,
            method: "GET",
            json: true
        }, function (err, res, body) {
            expect(res.statusCode).to.equal(410);

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