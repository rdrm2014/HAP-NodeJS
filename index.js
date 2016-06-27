var Accessory = require('./lib/Accessory.js').Accessory;
var Bridge = require('./lib/Bridge.js').Bridge;
var Service = require('./lib/Service.js').Service;
var Characteristic = require('./lib/Characteristic.js').Characteristic;
var uuid = require('./lib/util/uuid');
var AccessoryLoader = require('./lib/AccessoryLoader.js');
var storage = require('node-persist');

// ensure Characteristic subclasses are defined
var HomeKitTypes = require('./lib/gen/HomeKitTypes');

//MQTT (Mosca)
var src = process.cwd() + '/';
var config = require(src + '/config/config');
var mosca = require('mosca');
var AuthMosca = require(src + 'lib/mqtt/AuthMosca.js');

var authSystem = new AuthMosca();

var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: config.get('mongoose:uri'),
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var moscaSettings = {
    port: config.get('mongoose:port'),
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Mongo,
        url: config.get('mongoose:uri')
    },
    http: {
        port: 3000,
        bundle: true,
        static: './'
    }
};

var server = new mosca.Server(moscaSettings);

server.on('ready', setup);

function setup() {
    server.authenticate = authSystem.authenticate();
    //server.authorizeSubscribe = authSystem.authorizeSubscribe();
    //server.authorizePublish = authSystem.authorizePublish();
    console.log('Mosca server is up and running')
}

server.on('clientConnected', function (client) {
    //console.log('client connected', client.id);
});

server.on('published', function (packet) {
    //console.log('Published', packet.payload);
});

module.exports = {
    init: init,
    Accessory: Accessory,
    Bridge: Bridge,
    Service: Service,
    Characteristic: Characteristic,
    uuid: uuid,
    AccessoryLoader: AccessoryLoader
};

function init(storagePath) {
    // initialize our underlying storage system, passing on the directory if needed
    if (typeof storagePath !== 'undefined')
        storage.initSync({dir: storagePath});
    else
        storage.initSync(); // use whatever is default
}