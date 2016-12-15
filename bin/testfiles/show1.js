/**
 * Created by INDUSA on 10/10/2016.
 */
require('mocha');
var fs = require('fs');
var moment = require('moment');
var retry = require('bluebird-retry');
var userAuth = require('../userAuthentication.js');
var session = require('../sessionInitialize.js');
var hrmEntityOperations = require('../hrmEntity.js');
var caseOperations = require('../case.js');
var taskOperations = require('../task.js');
var searchOperations = require('../search.js');
var variables = require('../variables60.js');
var genericOperations = require('../genericOperations.js');
var orgOperations = require('../organization.js');
var accessControlOperations = require('../accessControl.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var me = require('./show.js');

exports.retryCompleteCycle = function () {
    var retriedCount = 0, timeout = 15000;
    describe("HC1 retry tests", function () {
        //test function to retry failed test cases for the complete cycle
        afterEach(function () {
            if (variables.retryOn && variables.executedAll && retriedCount <= variables.retryNoOfTimes) {
                console.log('\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETRY FAILED CASES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                var len = variables.failedCases.length;
                if(len === 0){
                    console.log('No Failed cases exists in the array !');
                }
                for(var i = 0;i < variables.retryNoOfTimes;i++) {
                    for (var index = 0; index < len; index++) {
                        (variables.failedCases[index])(variables.objectToFindFromNotification[0],timeout);
                    }
                    timeout = timeout + 1000;
                }
                retriedCount = retriedCount + 1;
            }
        });
        userAuth.login(); //For Login Call

        session.init(); //For Initializing User Session

        hrmEntityOperations.fillAllVariables(); //For getting all the static variables of the systems

        searchOperations.retrieveViewIdFromCustomList('All');

        /////////// commenting this will fail task save case //////////////

         accessControlOperations.accessControllTreeResults();
         accessControlOperations.uacTreeRetrieve();
         orgOperations.save();

        //////////// commenting this will fail task save case ////////////

        caseOperations.save();

        notificationOperations.findObjectInNotificationList(variables.objectToFindFromNotification[0],timeout); //For retrieving the saved 'Case' object in the notifications list

        userAuth.logout();
    });
}


/*//test function to retry failed test until it succeeds
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
 this.retries(10);
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
 }*/
exports.login = function () {

    var username = "abc", pwd = "abc", retriedCount = 0 ,timeout = 3000;
    var retryCounter = 0;
    describe("/auth/login", function () {
        afterEach(function () {
            retryCounter += 1;
            timeout = timeout + 1000;
            if(retryCounter === 1){
                username = variables.username;
                pwd = variables.password;
            }
            if(retryCounter <= variables.retryNoOfTimes)
                console.log('CASE FAILED ... RETRYING ... '+retryCounter+' time with timeout : '+timeout);

        });
        var requestBody = JSON.stringify({
            username: username,
            password: pwd
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

describe('MAIN',function(){
    me.retryCompleteCycle();    //retry the failed cases after complete cycle for define no of times
    //me.login();               //retry single case immediately after it fails for define no of times
});