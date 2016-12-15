/*
var assert = require('chai').assert;

function add() {
    return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
        return prev + curr;
    }, 0);
}

describe('add()', function() {
    var tests = [
        {args: [1, 2],       expected: 3},
        {args: [1, 2, 3],    expected: 6},
        {args: [1, 2, 3, 4], expected: 10}
    ];

    tests.forEach(function(test) {
        it('correctly adds ' + test.args.length + ' args', function() {
            var res = add.apply(null, test.args);
            assert.equal(res, test.expected);
        });
    });
});*/

/*
var expect = require('chai').expect;
var tries_threshold = 5;
it('sample test', function(done) {
    this.retries(3);
    var tries = 0;
    function actual_test() {
        expect(1).to.equal(2);
    }
    function test() {
        try {
            actual_test();
        } catch (err) {
            if (err && tries++ < tries_threshold)
                test();
            else done(err);
        }
    }
    test();N
});*/

/*require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var util = require('util');
//var req = require('./request.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var bluebird = require('bluebird');
var _ = require('lodash');
var variables = require('../variables60.js');
var genericOperations = require('../genericOperations.js');
var requestBody = '';
var searchString = '';
var me = require('../search.js');

var Promise = require('bluebird3');
var retry = require('bluebird-retry');

var count = 0;
function myfunc() {
    console.log('myfunc called ' + (++count) + ' times');
    if (count < 3) {
        console.log('INSIDEeee. if (count < 3)');

        return reject(new Error('fail the first two times'));
    } else {
        console.log('INSIDEeee. else of if (count < 3)');
        return resolve('succeed the third time');
    }
}

retry(myfunc).done(function(result) {
    console.log(result);
});*/


require('mocha');
var retry = require('bluebird-retry');
function logFail() {
    console.log(new Date().toISOString());
    throw new Error('bail');
}

retry(logFail, { max_tries: 4, interval: 500 });
