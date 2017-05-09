'use strict';

/**
 * API function for direct clock access via HTTP 
 */
module.exports = (ctx, http) => {
    // TODO: add request verification and user authentication
    //

    // get clock api
    let action = http.data.action;
    let clockApi = ctx.clock[action];

    // check api
    if (!clockApi)
        throw { status: 500, message: 'action not found' };

    // execute action on clock and send response
    http.reply({
        'action': action,
        'payload': clockApi(http.data)
    });
};