"use strict";

class WordClock {

    constructor(config) {

    }

    test(input) {
        let response = 'backend function "test" executed with params: ' + JSON.stringify(input.params);
        console.log(response);
        return response;
    }

}

module.exports = WordClock;