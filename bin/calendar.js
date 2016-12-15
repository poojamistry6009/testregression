/**
 * Created by INDUSA on 10/13/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');
var fs = require('fs');
var request = require('request');
var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');
var logfilename = 'calendar';
exports.readAndValidateCalendarData = function () {
    describe("/api/commcenter/calendar/list", function () {
        var timeout = variables.initialTimeout + 2000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve calendar data and match details", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            var requestBody = JSON.stringify({
                startDate: variables.calenderStartDate,
                endDate: variables.calenderEndDate,
                appointmentFilter: null,
                outOfOfficeFilter: null,
                opportunityFilter: null,
                caseFilter: null,
                taskFilter: null,
                memoFilter: null,
                campaignFilter: null,
                actionType: "",
                messageType: ""
            });
            return genericOperations.callRequest('/api/commcenter/calendar/list', requestBody, "calendarRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var taskObjectFound = false;
                console.log('=====> Calendar StartDate  : ' + variables.calenderStartDate);
                console.log('=====> Calendar EndDate    : ' + variables.calenderEndDate);
                var objectData = _.find(response.events, function (event) {
                        var recExtractId = event.detailUrl.split("/");
                        var recExtractEventDetails = event.name.split(" | ");
                        var objectType = event.primaryRelatedItemType;

                        var recExtractObjectId = recExtractId[recExtractId.length - 1];
                        var recExtractObjectSubject = recExtractEventDetails[0];
                        var recExtractObjectOrg = recExtractEventDetails[recExtractEventDetails.length - 1]

                        //TODO : @Eric, Currently we are just searching Task Object from calendar response let us know if any other objects need to be added
                 
                            if (objectType === 'Task') {
                                if (recExtractObjectSubject != undefined && recExtractObjectId != undefined) {
                                    if (recExtractObjectId === variables.extractTaskId && recExtractObjectSubject === recExtractObjectSubject && recExtractObjectOrg === variables.extractOrgName) {
                                        console.log('=====> Task Object Found In Calendar With Below Details');
                                        console.log('=====> Task Id : ' + recExtractObjectId);
                                        console.log('=====> Task Subject : ' + recExtractObjectSubject);
                                        console.log('=====> Org Name : ' + recExtractObjectOrg);
                                console.log("=====> Task matched with calendar data task ID : " + recExtractObjectId + " , Subject : " + recExtractObjectSubject + " & OrgName :  " + recExtractObjectOrg);
                                taskObjectFound = true;
                                isPassed = true;
                                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                            }
                        }
                    }

                });

                if(!taskObjectFound){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Task object not found in calendar list !",retryCount,logfilename);
                    throw new Error("Fail");
                }

            });
            resolve();
        });
    });

};




