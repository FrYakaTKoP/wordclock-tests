'use strict';

let api = require(process.cwd() + '/api/http');

module.exports = {
    resource: '/api',
    GET: api.bind(this),
    POST: api.bind(this)
};