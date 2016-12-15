/**
 * Created by INDUSA on 9/26/2016.
 */

require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var _ = require('lodash');
var retry = require('bluebird-retry');
var genericOperations = require('./genericOperations.js');
var variables = require("./variables60.js");
var me = require('./notification.js');
var viewId, requestBody;
var notificationList;
var logfilename = 'notification', locallogger = '';

/*
exports.notificationCustomListMetadata = function () {
    describe("/api/customlist/metadata - Notifications ViewId", function () {
        it("should retrieve notification customlist viewId for use in /api/customlist/results ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                messageType: "customListTypeMetadataRequest",
                type: "Notification"
            });
            return genericOperations.callRequest('/api/customlist/metadata', requestBody, "customlistMetadataNotification").then(function (response) {
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.views;
                var viewIdArray = _.find(jsonPath, {
                    'name': 'All',
                });
                viewId = viewIdArray.id;
            });
            resolve();
        });
    });
};
*/

exports.customListResultResults = function () {
    describe("/api/customlist/results Notifications CustomList", function () {
        var timeout = variables.initialTimeout + 10000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        var failedWriteCount = 0;
        it("should retrieve notification customlist in Collaboration Center", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            requestBody = JSON.stringify({
                type: "Notification",
                index: 0,
                size: 100,
                viewId: variables.viewIds['Notification'],
                // viewId: viewId,
                sortFields: [],
                displayFields: [],
                criteriaFields: [],
                messageType: "customListResultRequest"
            });
            return genericOperations.callRequest('/api/customlist/results', requestBody, "customlistResultsNotification").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};
// This is for checking added object in notifications list page
exports.findObjectInNotificationList = function (objectType) {
    describe("/api/customlist/results", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should find object in the notifications list", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
 	        //@FIXME: PROBLEM getting the notification on this because the user with whom it is assigned is the same user as the case was created.
            //@FIXME: also undid the retry above.
            requestBody = JSON.stringify({
                "type": "Notification",
                "index": 0,
                "size": 100,
                "viewId": variables.viewIds['Notification'],
                "sortFields": [],
                "displayFields": [{
                    "fieldId": "status",
                    "displayName": "Unread/Read"
                }, {
                    "fieldId": "type",
                    "displayName": "Type"
                }, {
                    "fieldId": "subject",
                    "displayName": "Subject"
                }, {
                    "fieldId": "received",
                    "displayName": "Received"
                }, {
                    "fieldId": "from.contact",
                    "displayName": "Sender"
                }, {
                    "fieldId": "connectionType",
                    "displayName": "Relationship"
                }, {
                    "fieldId": "updateType",
                    "displayName": "Update Type"
                }],
                "criteriaFields": [{
                    "fieldId": "to.contact",
                    "operator": "EQ",
                    "values": [variables.userId]
                }],
                "messageType": "customListResultRequest"
            });
            return genericOperations.callRequest('/api/customlist/results', requestBody, "findObjectinNotification").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                notificationList = response;
                var foundObj;
                var searchArrayValue = _.filter(notificationList.results, function (searchObj) {
                    if(searchObj.resultData.type === 'Case' && searchObj.resultData.subject === variables.caseSubject){
                        foundObj = searchObj;
                    }
                });
                if(foundObj != undefined && foundObj != ""){
                    if(foundObj.resultData.type === 'Case' &&  foundObj.resultData.subject === variables.caseSubject){
                        console.log("=====> Found object in notifications list : "+foundObj.resultData.subject);
                        isPassed = true;
                        genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                    }
                }else{
                    throw new Error("Failed to find the object in the notifications list");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Failed to find the object in the notifications list",retryCount,logfilename);
                }
            });
            resolve();

        });
    });
};

