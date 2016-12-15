/**
 * Created by INDUSA on 9/26/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');
var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var requestBody;
var logfilename = 'interfaces', locallogger = '';
exports.interfaceSettingsList = function () {
    describe("/api/admin/interfaces/settings/list", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve interface settings and get the hc1Test interface info", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            requestBody = JSON.stringify({
                dfStatsReq: false,
                messageType: "listInterfacesSettingsRequest"
            });
            return genericOperations.callRequest('/api/admin/interfaces/settings/list', requestBody, "interfacesSettingsList").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.settings;
                var interfaceIdArray = _.find(jsonPath, {
                    'name': 'hc1Test',
                });
                var interfaceId = interfaceIdArray.id;
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};
