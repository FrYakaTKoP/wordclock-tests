'use strict'

const server = require('slimple');
const WordClock = require('./lib/WordClock.js');

let serverConfig = {
    port: 8080,
    contentPath: '/content',
    servicePath: '/services',
};

let appContext = {
    clock: new WordClock()
};

server.run(serverConfig, appContext);