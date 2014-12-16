var mongooseMock = require('mongoose-mock'),
    proxyquire = require('proxyquire'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("Quote", function() {
    var quote;

    beforeEach(function () {
        quote = proxyquire('../../../model/quote', { 'mongoose': mongooseMock });
    });
});