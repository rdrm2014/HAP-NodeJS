/**
 * Created by ricardomendes on 27/06/16.
 */

var nconf = require('nconf');
var src = process.cwd() + '/';

nconf.argv()
    .env()
    .file({
        file: src + 'config/config.json'
    });

module.exports = nconf;