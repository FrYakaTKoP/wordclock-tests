'use strict';

let clockApi = (ctx, http) => {
    if(!http.data.action || !ctx.clock[http.data.action]) http.reply({ error: 'action not found'});
    http.reply({
        'action': http.data.action,
        'payload': ctx.clock[http.data.action](http.data)
    });
};

module.exports = {
    resource: '/api',
    GET: clockApi.bind(this),
    POST: clockApi.bind(this)
};