/**
 * Created by ricardomendes on 27/06/16.
 */

var src = process.cwd() + '/';
var config = require(src + 'config/config');

console.log("Location2: " + src);

function AuthMosca() {
}

AuthMosca.prototype.authenticate = function () {
    return function (client, username, password, callback) {
        callback(null, true);
    }
};

AuthMosca.prototype.authorizePublish = function () {
    return function (client, topic, payload, callback) {
        callback(null, true);
    }
};

AuthMosca.prototype.authorizeSubscribe = function () {
    return function (client, topic, callback) {
        callback(null, true);
    }
};

module.exports = AuthMosca;
