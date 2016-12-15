/**
 * Created by INDUSA on 9/22/2016.
 */

require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var _ = require('lodash');
var retry = require('bluebird-retry');
//var req = require('./request.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var variables = require('./variables60.js');
var genericOperations = require('./genericOperations');
var requestBody = '';
var fs = require('fs');
var logfilename = 'userAuthentication',locallogger = '';

exports.login = function () {
    describe("/auth/login", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = 'userAuthentication.login';
        afterEach(function () {           
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should login with no error", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            requestBody = JSON.stringify({
                username: variables.username,
                password: variables.password
            });
            return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
                expect(response.expired).to.equals(false);
                if (response === "") {
                    console.log("=====> can't login");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};

exports.logout = function () {
    describe("/auth/logout", function () {
        it("User should be logged out with no error", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({});
            return genericOperations.callRequest('/auth/logout', requestBody, "logout").then(function (response) {
                expect(response.errorCode).to.equal(0);
            });
            resolve();
        });
    });
};

//This is for checking failed login functionality
exports.checkFailedLogin = function () {
    describe("/auth/login", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-failedLoginCase-"+this.title;
        afterEach(function () {          
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("Login Failed, due to incorrect credentials", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(variables.initialTimeout);
            requestBody = JSON.stringify({
                // username: variables.username,
                // password: variables.password
                username: variables.incorrectUserName,
                password: variables.incorrectPassword
            });

            var options = {
                method: 'POST',
                url:  variables.fullUrl +'/auth/login',
                rejectUnauthorized: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            };

            return rp(options).then(function (body) {
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                genericOperations.writeLocalLogs(caseName,'case failed .. as username and password are correct and makes login successfull !',retryCount,logfilename);
                var response = JSON.parse(body);
                return bluebird.resolve(response);
            }).catch(function (err) {
                if(err != null){
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                // throw  new Error("Login Failed..");
                // console.log("=====> Post Failed " + err);
                expect(err).to.not.equal(null); // We need to Pass this test if error is thrown
                if(err != null){
                    isPassed = true;
                }
            });
            resolve();
        });
    });

};

//This is for checking failed logout functionality
exports.checkFailedLogOut = function () {
    describe("/auth/logout", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, isUserLoggedOut = false;
        afterEach(function () {            
            retryCount += 1;
            timeout += variables.increaseTimeout;
            if(!isUserLoggedOut)
                genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("checking Logout", function () {
            this.timeout(variables.initialTimeout);
            requestBody = JSON.stringify({});
            return genericOperations.callRequest('/auth/logout', requestBody, "logout").then(function (response) {
                isUserLoggedOut = true;
            });
            resolve();
        });

        it("checking Failed Logout!!! making an api call after user logged out", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(variables.initialTimeout);
            requestBody = JSON.stringify({
                dfStatsReq: false,
                messageType: "listInterfacesSettingsRequest"
            });
            return genericOperations.callRequest('/api/admin/interfaces/settings/list', requestBody, "verifyLogout").then(function (response) {

            }).catch(function (err) {
                console.log('=======> User Logged Out : ' + err.message);
                var msg = Boolean(err.message);
                expect(msg).to.be.true;
                isPassed = true;
            });
            resolve();
        });
    });
};
