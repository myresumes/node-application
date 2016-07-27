'use strict'
module.exports = (config) => {
    return function(svr, database, _) {
        svr.route('/api/user')
            .get(function(req, res, next) {

                res.send('hi am using user.js file to fetch Route', req.query);
            })
            .post((req, res, next) => {
                console.log(req);
                res.send('Post request !!!', req.body);
            });

        svr.route('/api/user/:id')
            .get(function(req, res, next) {
                res.send('hi am using user.js file to fetch Route', req.params.id);
            });

        svr.route('/api/login')
            .post(function(req, res, next) {
                var login = require('../svc/login.svc.js')(config, database, _)(req);
                login.then((response) => {
                    res.send('hi am using user.js file to fetch Route and login', response);
                    console.log('login response', response);
                }, (error) => {
                    res.send({ status: 400, error: error });
                })
            });
    }
};
