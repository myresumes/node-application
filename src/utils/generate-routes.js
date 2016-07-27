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

/*Future code 

 // if (fs.existsASync('/etc/file')) {
            //     console.log('Found file');
            // }
            // fs.statsSync(path).isFile().then((error, success) => {
            //     if (success) {
            //         console.log(success);
            //     }
            // })

 // fs.statsAsync(path).isFile().then((resp) => {
        //     console.log(resp);
        // });

        // try {
        //     return fs.statSync(path).isFile();
        // } catch (e) {

        //     if (e.code == 'ENOENT') { // no such file or directory. File really does not exist
        //         console.log("File does not exist.");
        //         return false;
        //     }

        //     console.log("Exception fs.statSync (" + path + "): " + e);
        //     throw e; // something else went wrong, we don't have rights, ...
        // }

// fs.lstatAsync('routes')
        //     .then((isDirectoryExits) => {
        //         console.log('director  found!!!! vola');


        //         // _.forEach(config.entities, (entity) => {
        //         //     var path = '../routes/' + entity + '.js';
        //         //     console.log(path);
        //         //     fileExists(path).then((isFileExits) => {
        //         //         console.log(entity, isFileExits);
        //         //         // if (isFileExits)
        //         //         // require('../routes/' + entity)(config, database);
        //         //     });

        //         // });
        //         //fetchsvcAndGenerate();
        //     }).catch((error) => {
        //         //do something...
        //         console.log('director not found!!!!');
        //         config.Promise.reject({ error: 'director not found' });
        //     });


        // console.log('test test test !!!!');
        // console.log(config);
        // console.log('started generating routes!!!!!');
        // console.log('models', database.models);
        // var entity = 'user'
        // fileExists('../routes/' + test + '.js');
        //var fun = require('../routes/' + entity)()(config, database);

        // _.forEach(config.entities, (entity) => {
        //     var fun = require('../routes/' + entity)(config, database);

        // });
        // svr.get('/api/test', (req, res) => {
        //     database.user.findAll().then((usr) => {
        //         res.send(usr);
        //     });
        // })
        // console.log('entitys');
        // userapis(svr, database, _);

*/
