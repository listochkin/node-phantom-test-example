/*global require:true, describe:true, before:true, it:true, window:true, setTimeout:true*/

var phantom = require('phantom'), chai = require('chai'), expect = chai.expect;
chai.Assertion.includeStack = true;

describe('Simple user lookup', function () {
    'use strict';

    var browser, server;

    before(function (done) {
        // get our browser and server up and running
        phantom.create(function (ph) {
            ph.createPage(function (tab) {
                browser = tab;
                server = require('../app');
                server.listen(3000, function () {
                    done();
                });
            });
        });
    });

    it('should return data back', function (done) {
        browser.open('http://localhost:3000/app.html', function (status) {

            setTimeout(function () {
                browser.evaluate(function inBrowser() {
                    // this will be executed on a client-side
                    return window.APP.result;
                }, function fromBrowser(result) {
                    // server-side asserts
                    expect(server.APP.data.name).to.equal('Alex');
                    expect(server.APP.data.secret).to.equal('Secret');
                    // client-side asserts
                    expect(result.name).to.equal('Alex');
                    expect(result.secret).to.equal('Secret');
                    done();
                });
            }, 1000); // give time for xhr to run

        });
    });
});

