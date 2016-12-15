


require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');
var Promise = require('bluebird');
var retry = require('bluebird-retry');

var count = 0;
function myfunc() {
    console.log('myfunc called ' + (++count) + ' times');

    if (count < 3) {
        console.log('>>>>>>>>>>>> count >>>>>> inside if part >>>>>>>> '+count);
        return Promise.reject();
    } else {
        console.log('>>>>>>>>>>>> count >>>>>> inside else part >>>>>>>> '+count);
        return Promise.resolve('succeed the third time');
    }
}

retry(myfunc).done(function(result) {
    console.log(result);
});


/*
function logFail() {
    console.log(new Date().toISOString());
    throw new Error('bail');
}

retry(logFail, { max_tries: 4, interval: 500 });*/
