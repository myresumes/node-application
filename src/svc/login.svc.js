'use strict'
module.exports = (config, database, _, request) => {
    return new config.Promise(function(resolve, reject) {
        validate(request).then((resp) => {
            return request;
        }).then((resp) => {
            return fetchValuesFromDb(resp.body);
        }).then((dbResp) => {
            if (dbResp) {
                console.log('test');
                resolve({ status: 200, msg: 'login success', data: request.body });
            }
            resolve(dbResp);
        }).catch((error) => {
            reject(error);
        });
    });

    function fetchValuesFromDb(req) {
        return database.user.find({
            where: {
                email: req.userName,
                password: req.password
            }
        }).then((usr) => {
            console.log('second ')
            if (usr) {
                return usr;
            }
            return { error: 'User not found !!!' };
        }).catch((error) => {
            throw error;
            return { error: error };
        });
    }


    function validate(requestEntity) {
        return new config.Promise((resolve, reject) => {
            if (_.has(requestEntity, 'body') && _.has(requestEntity.body, 'userName') && _.has(requestEntity.body, 'password')) {
                resolve(requestEntity.body);
            }
            reject({ isError: true, msg: 'Invalid Input' });
        });
    }
};
