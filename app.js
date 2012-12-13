/*global require:true */

(function () {
    'use strict';
    var express = require('express');

    var app = express();

    app.configure(function () {
        app.use(express.static(__dirname + '/public'));
    });

    app.get('/user/:name', function (req, res) {
        res.send({
            name: req.params.name,
            secret: req.query.secret
        });
    });

    app.listen(3000);
})();