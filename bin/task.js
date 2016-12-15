/**
 * Created by INDUSA on 9/28/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');

var genericOperations = require('./genericOperations.js');
var calendarOperations = require('./calendar.js');// For Storing Calendar Data in File To Validate After Creation Of New Task
var requestBody, activeOrg, activityId = '',hc1Object = "task", logfilename = hc1Object;
var me = require('./task.js');
var accessControll = require('./accessControl.js');
exports.save = function (timeout) {
    //This Test Case Creates New Task Activity
    describe("/api/task/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Task Activity", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activityId = null;
            console.log('=====> Creating Task Under ' + variables.extractOrgName + ' ' + variables.extractOrgId);
            requestBody = JSON.stringify({
                "activity": {
                    "id": variables.taskId,
                    "relatedItems": [],
                    "parentEntities": [
                        {
                            "id": variables.organizationId,
                            "entityType": "Organization"
                        }
                    ],
                    "entityType": "Task",
                    "number": variables.taskNumber,
                    "assignedTo": {
                        "id": variables.userId,
                        "name": variables.relName,
                        "active": true,
                        "entityType": "User",
                        "relatedItems": []
                    },
                    "category": {
                        "id": variables.taskActivityCategory[0],
                        "name": variables.taskActivityCategory[1]
                    },
                    "subCategory": {
                        "id": variables.taskActivitySubCategory[0],
                        "name": variables.taskActivitySubCategory[1]
                    },
                    "ccUsers": [
                        {
                            "id": variables.taskCcUsers
                        }
                    ],
                    "date": variables.taskDate,
                    "beginDate": variables.taskBeginDate,
                    "description": variables.taskDescription,
                    "dueDate": variables.taskDueDate,
                    "hostCodes": null,
                    "organization": {
                        "id": variables.extractOrgId //Just To Refer with created Organization
                    },
                    "priority": {
                        "id": variables.taskPriority
                    },
                    "status": {
                        "id": variables.taskActivityStatus
                    },
                    "parentActivity": null,
                    "parentActivityType": null,
                    "createdUser": null,
                    "createdDate": null,
                    "updatedDate": null,
                    "updatedUser": null,
                    "canEdit": true,
                    "audit": variables.taskActive,
                    "subject": variables.taskSubject
                },
                "messageType": "saveTaskRequest"
            });
            return genericOperations.callRequest('/api/task/save', requestBody, "saveTask").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);

                variables.extractTaskId = response.task.id;
                variables.extractTaskName = response.task.name;
                variables.extractTaskSubject = response.task.subject;

                //Added By INDUSA : Used For Task Activity Validation - START
                variables.taskCaseNumber = response.task.number;
                variables.taskPriorityName =  response.task.priority.name;
                variables.taskAssignedToUser = response.task.assignedTo.name;
                variables.taskCreatedDate = response.task.createdDate;
                variables.taskUpdatedDate = response.task.updatedDate;
                //Added By INDUSA : Used For Task Activity Validation - END

                if (variables.extractTaskId !== "") {
                    console.log("=====> Task Created : " + variables.extractTaskName);
                } else {
                    console.log("=====> Some Error(s) While Creating Task Activity......");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating Task Activity......",retryCount,logfilename);
                }
                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " Workflow template being called");

                genericOperations.validateTaskData(response.task, hc1Object);//Task Activity Data Validation

                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.taskRetrieve = function () {
    describe("/api/task/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve new task and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            requestBody = JSON.stringify({
                id: variables.extractTaskActivityId,
                messageType: "retrieveTaskRequest"
            });
            return genericOperations.callRequest('/api/task/retrieve', requestBody, "taskRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractTaskSubject = response.task.subject;
                if (recExtractTaskSubject != variables.extractTaskActivitySubject) {
                    console.log("=====> Retrieved Task Name DOES NOT match: " + recExtractTaskSubject);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Retrieved Task Name DOES NOT match: " + recExtractTaskSubject,retryCount,logfilename);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Task Name matches: " + recExtractTaskSubject);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};
