'use strict'
var Promise = require('bluebird');
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var loadDbObject = require('./load-db-object.js');
var allRoutes = require('./generate-routes.js');
var _ = require('lodash');
module.exports = function(config) {
    console.log(config);
    var server,
        database, sequelize;
    config.Promise = Promise;
    let env = process.env;
    let port = config.port || process.env.PORT || 8080;
    let ip = env.OPENSHIFT_NODE4_IP || '127.0.0.1';
    return function() {
        return new Promise.try(function() {
            server = express();
            server.set('port', config.port || process.env.app_port || 8080);
            server.listen(port, ip, function() {
                console.log('listing the server at port ', port);
            });
            return server;
        }).then(function(svr) {
            return configureServer(svr);
            //return new Promise.resolve(server);
        }).then((svr) => {
            return loadDbStructure(svr);
        }).then(function(svr) {
            return createRoutes(svr);
        }).then(function(svr) {
            return config.Promise.resolve(svr);
        });
    };

    function syncSequelizeDbStructure(svr) {
        return svr;
    }

    function loadDbStructure(svr) {
        database = loadDbObject();
        database.then((dataBase) => {
            // console.log(dataBase.db)
            sequelize = dataBase.db;
            config.entities = dataBase.entities;
        });
        return svr;
    }

    function createAndLoadServer() {

    }

    function createRoutes(svr) {
        // console.log('generating routes');
        allRoutes(config, _)(sequelize, svr).then(() => {
            //console.log('routes generated');
        });
        return svr;
    }

    function configureServer(svr) {
        svr.use(bodyParser.urlencoded({ extended: true }));
        svr.use(bodyParser.json());
        svr.use(cors());
        svr.use(express.static('public'));
        var router = express.Router();
        svr.use('/api', router);
        //console.log('options set');
        return svr
    }
};
