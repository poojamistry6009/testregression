/**
 * Created by INDUSA on 9/28/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');

var hc1Object = "case", activeOrg, requestBody = '', logfilename = hc1Object;


exports.save = function () {
    //Added By Indusa 09/20/2016 - START

    //This Test Case Creates New Case Activity
    describe("/api/case/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Case Activity", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            console.log('=====> Creating Case Under ' + variables.extractOrgName + ' ' + variables.extractOrgId);
            requestBody = JSON.stringify(
                {
                    "activity": {
                        "id": variables.caseId,
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
                        "name": null,
                        "entityType": "Case",
                        "number": variables.caseCaseNumber,
                        "isOpen": true,
                        "assignedTo": {
                            "id": variables.userId,
                            "name": variables.relName,
                            "active": true,
                            "entityType": "User",
                            "relatedItems": []
                        },
                        "category": {
                            "id": variables.caseActivityCategory[0],
                            "name": variables.caseActivityCategory[1]
                        },
                        "subCategory": {
                            "id": variables.caseActivitySubCategory[0],
                            "name": variables.caseActivitySubCategory[1]
                        },
                        "ccUsers": [
                            {
                                "id": variables.caseCcUsers
                            }
                        ],
                        "correctiveAction": {
                            "id": variables.caseCorrectiveAction
                        },
                        "date": variables.caseDate,
                        "beginDate": variables.caseBeginDate,
                        "description": variables.caseDescription,
                        "hostCodes": null,
                        "organization": {
                            "id": variables.extractOrgId //Just To Refer with created Organization
                        },
                        "priority": {
                            "id": variables.casePriority,
                            "name": variables.casePriorityName,
                            "properties": null
                        },
                        "resolvedBy": {
                            "id": variables.caseResolvedBy
                        },
                        "resolvedDate": variables.caseResolvedOn,
                        "resolutionDescription": variables.caseResolution,
                        "rootCause": {
                            "id": variables.caseRootCause
                        },
                        "status": {
                            "id": variables.caseActivityStatus
                        },
                        "createdUser": null,
                        "createdDate": null,
                        "updatedDate": null,
                        "updatedUser": null,
                        "canEdit": true,
                        "resolutionEdit": false,
                        "loadingCase": false,
                        "audit": true,
                        "active": variables.caseActive,
                        "subject": variables.caseSubject
                    },
                    "messageType": "saveCaseRequest"

            });
            return genericOperations.callRequest('/api/case/save', requestBody, "saveCase").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }

                expect(response.errorCode).to.equal(0);

                variables.extractCaseId = response.case.id;
                variables.extractCaseName = response.case.name;

                //Added By INDUSA : Used For Case Activity Validation - START
                variables.caseCaseNumber = response.case.number;
                variables.casePriorityName =  response.case.priority.name;
                //variables.caseAssignedToUser = response.case.assignedTo;
                variables.caseCreatedDate = response.case.createdDate;
                variables.caseUpdatedDate = response.case.updatedDate;
                //Added By INDUSA : Used For Case Activity Validation - END

                if (variables.extractCaseId !== "") {
                    console.log("=====> Case Created : " + variables.extractCaseName);
                } else {
                    console.log("=====> Some Error(s) While Creating Case Activity......");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating Case Activity......",retryCount,logfilename);
                }
                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " Workflow template being called");

                genericOperations.validateCaseData(response.case, hc1Object);//Case Activity Data Validation

                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });

            resolve();
        });
    });
};

exports.caseRetrieve = function () {
    describe("/api/case/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve new case and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            requestBody = JSON.stringify({
                id: variables.extractCaseActivityId,
                messageType: "retrieveCaseRequest"
            });
            return genericOperations.callRequest('/api/case/retrieve', requestBody, "caseRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractCaseSubject = response.case.subject;
                if (recExtractCaseSubject != variables.extractCaseActivitySubject) {
                    console.log("=====> Retrieved Case Name DOES NOT match: " + recExtractCaseSubject);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Retrieved Case Name DOES NOT match: " + recExtractCaseSubject,retryCount,logfilename);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Case Name matches: " + recExtractCaseSubject);
                }
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};
