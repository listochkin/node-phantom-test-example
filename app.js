/*global require:true */

(function () {
    'use strict';
    var express = require('express');

    var app = express();

    app.APP = {}; // we'll use it to check the state of the server in our tests

    app.configure(function () {
        app.use(express.static(__dirname + '/public'));
    });

    app.get('/user/:name', function (req, res) {
        var data = app.APP.data = {
            name: req.params.name,
            secret: req.query.secret
        };
        res.send(data);
    });

    module.exports = app;
})();