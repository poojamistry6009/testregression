/**
 * Created by INDUSA on 9/28/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');

var genericOperations = require('./genericOperations.js');

var requestBody = '', activeOrg, hc1Object = "memo", entityType = 'Memo', logfilename = hc1Object;

exports.save = function () {
    //This Test Case Creates New Memo Activity
    describe("/api/memo/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false , caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Memo Activity", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activityId = null;
            console.log('=====> Creating Memo Under ' + variables.extractOrgName + ' ' + variables.extractOrgId);
            requestBody = JSON.stringify({
                "activity": {
                    "id": variables.memoId,
                    "relatedItems": [],
                    "parentEntities": [
                        {
                            "id": variables.organizationId,
                            "entityType": "Organization"
                        }
                    ],
                    "customRecordData": {
                        "customRecord": {},
                        "fields": {},
                        "data": {},
                        "mappedFields": {}
                    },
                    "entityType": entityType,
                    "number": variables.memoNumber,
                    "category": {
                        "id": variables.memoActivityCategory[0],
                        "name": variables.memoActivityCategory[1],
                        "properties": null
                    },
                    "subCategory": {
                        "id": variables.memoActivitySubCategory[0],
                        "name": variables.memoActivitySubCategory[1],
                        "properties": null
                    },
                    "ccUsers": [
                        {
                            "id": variables.memoCcUsers
                        }
                    ],
                    "date": variables.memoDate,
                    "beginDate": variables.memoBeginDate,
                    "description": variables.memoDescription,
                    "hostCodes": null,
                    "organization": {
                        "id": variables.extractOrgId
                    },
                    "parentActivity": null,
                    "parentActivityType": null,
                    "createdUser": null,
                    "createdDate": null,
                    "updatedDate": null,
                    "updatedUser": null,
                    "canEdit": true,
                    "audit": true,
                    "active": variables.memoActive,
                    "subject": variables.memoSubject
                },
                "initialSave": true,
                "messageType": "saveMemoRequest"
            });
            return genericOperations.callRequest('/api/memo/save', requestBody, "saveMemo").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);

                variables.extractMemoId = response.memo.id;
                variables.extractMemoName = response.memo.name;

                //Added By INDUSA : Used For Memo Activity Validation - START
                variables.memoCaseNumber = response.memo.number;
                // variables.memoAssignedToUser = response.memo.assignedTo;
                variables.memoCreatedDate = response.memo.createdDate;
                variables.memoUpdatedDate = response.memo.updatedDate;
                //Added By INDUSA : Used For Memo Activity Validation - END

                if (variables.extractCaseId !== "") {
                    console.log("=====> Memo Created : " + variables.extractMemoName);
                } else {
                    console.log("=====> Some Error(s) While Creating Memo Activity......");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating Memo Activity......",retryCount,logfilename);
                }
                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " Workflow template being called");

                genericOperations.validateMemoData(response.memo, hc1Object);//Memo Activity Data Validation

                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};
exports.memoRetrieve = function () {
    describe("/api/memo/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve new memo and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            requestBody = JSON.stringify({
                id: variables.extractMemoActivityId,
                messageType: "retrieveMemoRequest"
            });
            return genericOperations.callRequest('/api/memo/retrieve', requestBody, "memoRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractMemoSubject = response.memo.subject;
                if (recExtractMemoSubject != variables.extractMemoActivitySubject) {
                    console.log("=====> Retrieved Memo Name DOES NOT match: " + recExtractMemoSubject);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,'Retrieved Memo Name DOES NOT match : '+recExtractMemoSubject,retryCount,logfilename);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Memo Name matches: " + recExtractMemoSubject);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};
