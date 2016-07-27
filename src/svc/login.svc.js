'use strict'
module.exports = (config, database, _) => {

    return (req) => {
        if (_.has(req, 'body')) {
            if (_.has(req.body, 'userName') && _.has(req.body, 'password')) {
                fetchUserInfo(req.body, database).then((success) => {
                    console.log(success);
                });
            } else {
                return config.Promise.reject({ status: 400, error: { msg: 'Invalid request' } });
            }
        } else {
            return config.Promise.reject({ status: 400, error: { msg: 'Invalid request' } });
        }
        return config.Promise.resolve({ status: 200, data: req.body });
    };
    //req.body.secretString = config.secret;
    //return config.Promise.reject({ status: 200, data: config.secret });

    function fetchUserInfo(request, database) {
        return database.user.find({
            where: {
                email: request.userName,
                password: request.password
            }
        }).then((usr) => {
            console.log('usr', usr);
            return usr;
        })
    }
};
