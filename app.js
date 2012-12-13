/*global require:true */

(function () {
    'use strict';
    var express = require('express');

    var app = express();

    app.APP = {};

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