'use strict';

/**
 * API function for direct clock access via HTTP 
 */
module.exports = (ctx, http) => {
    // check action
    if (!http.data.action || !ctx.clock[http.data.action])
        throw { status: 500, message: 'action not found' };
    // execute action on clock and send response
    http.reply({
        'action': http.data.action,
        'payload': ctx.clock[http.data.action](http.data)
    });
};