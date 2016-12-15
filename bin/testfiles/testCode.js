/**
 * Created by manthanb on 11/8/2016.
 */
require('mocha');
var fs = require('fs');
var moment = require('moment');

var variables = require('../variables60.js');
var count = 0;

var Promise = require('bluebird');
var retry = require('bluebird-retry');
var expect = require('chai').expect;
var count = 0;
var me = require('./testCode.js');
var genericOperations = require('../genericOperations.js');
var variables = require('../variables60.js');
/*
function myfunc() {
    describe("happy path test for " + variables.fullUrl, function () {
    console.log('myfunc called ' + (++count) + ' times');
    if (count < 3) {
        return Promise.reject(new Error('fail the first two times'));
    } else {
        return Promise.resolve('succeed the third time');
    }
    });
}


retry(myfunc).done(function(result) {
    console.log(result);
});
*/

describe("happy path test for " + variables.fullUrl, function () {

    //if(true)
    exports.retrytest2 = function () {
        var retryCounter = 1;
        describe("/auth/login", function () {
            afterEach(function () {
                retryCounter += 1;
                console.log('INSIDEEEE ..after each ... '+retryCounter);
            });
            it('sample test', function (done) {
                this.retries(2);
                //expect(3).to.equal(0);
                /*   return new Promi
                 // throw new Error("Failed");

                   return true;*/
                return new Promise(function (resolve, reject) {
                    console.log('Hello : ' + count);
                    count++;
                    setTimeout(function () {
                        console.log(count);
                    }, 500);
                });
                resolve();
            });
        });
    }


    exports.login2 = function () {
        var requestBody = JSON.stringify({
            username: username,
            password: pwd
        });
        var username = "abc", pwd = "abc", retriedCount = 0 ,timeout = 3000;
        var retryCounter = 0;
        describe("/auth/login", function () {
            afterEach(function () {
                retryCounter += 1;
                timeout = timeout + 1000;
                console.log('CASE FAILED ... RETRYING ... '+retryCounter+' time with timeout : '+timeout);
            });
            it('sample test', function (done) {
                this.retries(variables.retryNoOfTimes);
                this.timeout(timeout);
                //expect(3).to.equal(0);
                /*   return new Promi
                 // throw new Error("Failed");

                 return true;*/
                return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
                    if (response === undefined || response === "") {
                        //caseFailed = true;
                        console.log("=====> can't login");
                        return new Error('Invalid credentials. Can\'t login !');
                    }
                });
                resolve();
            });
            /*it("should login with no error", function () {
                this.retries(5);
                this.timeout(5000);
                console.log('TRYING TO LOGIN WITH USERNAME : '+username+' AND PASSWORD :'+pwd);
                return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
                    if (response === undefined || response === "") {
                        //caseFailed = true;
                        console.log("=====> can't login");
                        return new Error('Invalid credentials. Can\'t login !');
                    }
                });
                resolve();
            });*/
        });
    }
    /*it("sample code", function () {
       /!* var date = moment(new Date());
        var startDateCalendar = date.subtract(7, 'days');*!/
        var startDateCalendar =  moment(new Date()).subtract(7, 'days');
        console.log(startDateCalendar.format("YYYY-MM-DD")+'T'+"00:00:00"+".000Z");
        console.log(startDateCalendar.format('HH:mm Z'));
    });*/

});


//test function to retry failed test until it succeeds
exports.login = function () {
    var username = "abc", pwd = "abc", retriedCount = 0;
    describe("/auth/login", function () {
        var caseFailed = false;
        requestBody = JSON.stringify({
            username: username,
            password: pwd
        });
        afterEach(function () {
            retriedCount = retriedCount + 1;
            // if (caseFailed === true && retriedCount <= variables.retryNoOfTimes) {
            console.log('CASE FAILED.. retrying ... ' + retriedCount + ' time.');
            //me.login();
            //}
        });
        it("should login with no error", function () {
            this.retries(5);
            this.timeout(5000);
            console.log('TRYING TO LOGIN WITH USERNAME : '+username+' AND PASSWORD :'+pwd);
            return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
                if (response === undefined || response === "") {
                    //caseFailed = true;
                    console.log("=====> can't login");
                    return new Error('Invalid credentials. Can\'t login !');
                }
            });
            resolve();
        });
    });
}

var called = 0;
exports.testmyself = function() {
    describe('', function () {
        var caseFailed = false;
        afterEach(function () {
            if(caseFailed === true){
                console.log('IN AFTER EACH ... CALLED  = '+called);
                me.testmyself();
            }
        });
        it('', function () {
            this.timeout(2000);
            called = called + 1;
            if(called === 4){
                console.log('CALLED VALUE IN ELSE : '+called);
            }else{
                console.log('CALLED VALUE IN IF : '+called);
                caseFailed = true;
                throw new Error("failed case.. with called = "+called);
            }
        });
    });
}


describe('MAIN',function(){
       me.login2();

    /*afterEach(function () {
        console.log(' ************* INSIDE AFTER EACH ************* ');
    });
    describe('',function () {
        it('',function () {

            console.log('inside first it of first describe ');
            describe('',function () {
               it('',function () {
                       console.log('inside it of decsribe of first it ..........');
               });
            });
        });
        it('',function () {
            console.log('inside second it of first describe ');
        });
        describe('',function () {
           it('',function () {
               console.log('inside first if of second describe');
           }) ;
        });
    });

    it('',function () {
       console.log('inside first it of global describe');
    });
    it('',function () {
        console.log('inside second it of global describe');
    });*/
});




