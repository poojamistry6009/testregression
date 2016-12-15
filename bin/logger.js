/**
 * Created by INDUSA on 11/28/2016.
 */
require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');
var fs = require('fs');
var variables = require('./variables60.js');
exports.startLogger = function () {
    describe("Global Logger",function () {
        it("should initialize a global logger",function () {
            var stats = 'RETRIED TEST CASES\t:\t'+variables.retriedCases+'\nFAILED TEST CASES\t:\t'+variables.failedCases+'\nPASSED TEST CASES\t:\t'+variables.failedCases+'\nTESTED CASES\t:\t'+variables.testedCases;
            //console.log('LOG FILE PATH : '+variables.logFilePath+variables.globalFileName);
            console.log(stats);
            fs.writeFile(variables.logFilePath+variables.globalFileName,stats,function (err) {
                if (err) throw err;
                console.log(err);
            });
        });
    });
}
