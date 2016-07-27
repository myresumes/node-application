'use strict'
var md5 = require('MD5');
var passport = require('passport');
var jwt = require('jsonwebtoken');
//var fs = require('fs');
module.exports = (config, _) => {
    var fs = config.Promise.promisifyAll(require("fs"));
    config.md5 = md5;
    config.passport = passport;
    config.jwt = jwt;
    return (database, svr) => {

        // svr.use('/api', router);
        _.forEach(config.entities, (entity) => {
            var fn = require('../routes/' + entity)(config)(svr, database, _);
        });
        return config.Promise.resolve({});
    }
}
