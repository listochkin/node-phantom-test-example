/*global require:true, describe:true, before:true, it:true, window:true, setTimeout:true*/

var phantom = require('phantom'), chai = require('chai'), expect = chai.expect;
chai.Assertion.includeStack = true;

describe('Simple user lookup', function () {
    'use strict';

    var browser;

    before(function (done) {
        phantom.create(function (ph) {
            ph.createPage(function (tab) {
                browser = tab;
                done();
            });
        });
    });

    it('should return data back', function (done) {
        browser.open('http://localhost:3000/app.html', function (status) {

            setTimeout(function () {
                browser.evaluate(function () {
                    return window.APP.result;
                }, function (result) {
                    expect(result.name).to.equal('Alex');
                    expect(result.secret).to.equal('Secret');
                    done();
                });
            }, 1000);


        });
    });
});

