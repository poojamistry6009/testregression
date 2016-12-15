/**
 * Created by INDUSA on 10/20/2016.
 */
require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var genericOperations = require('./genericOperations.js');
var variables = require("./variables60.js");
var messageViewId = '',requestBody='';
var logfilename = 'message';
/*exports.messageCustomListMetadata = function () {
    describe("/api/customlist/metadata - Message ViewId", function () {
        it("should retrieve message customlist viewId for use in /api/customlist/results ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                messageType: "customListTypeMetadataRequest",
                type: "Message"
            });
            return genericOperations.callRequest('/api/customlist/metadata', requestBody, "customlistMetadataMessage").then(function (response) {
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.views;
                var viewIdArray = _.find(jsonPath, {
                    'name': 'All',
                });
                messageViewId = viewIdArray.id;
            });
            resolve();
        });
    });
};*/

exports.sendMessage = function () {
    describe("/api/commcenter/message/send", function () {
        var timeout = variables.initialTimeout + 2000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should send a message from one user to another", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "message": {
                        "id": "",
                        "name": "",
                        "subject": variables.messageSubject,
                        "message": variables.messageText,
                        "relatedItems": [],
                        "received": null,
                        "status": "NEW",
                        "threadId": "",
                        "messageId": "",
                        "parentId": "",
                        "recipients": [{
                            "type": "TO",
                            "email": variables.userEmail,
                            "isEntity": true,
                            "entityType": "User",
                            "user": {
                                "id": variables.userId,
                                "name": variables.relName,
                                "active": true,
                                "entityType": "User",
                                "relatedItems": []
                            },
                            "guid": "e61fe76b-0f90-492f-ef07-5f5b3e854353"
                        }, {
                            "type": "CC",
                            "email": variables.userEmail,
                            "isEntity": true,
                            "entityType": "User",
                            "user": {
                                "id": variables.userId,
                                "name": variables.relName,
                                "active": true,
                                "entityType": "User",
                                "relatedItems": []
                            },
                            "guid": "8bca6f4c-f445-4a20-fd43-913792be2d47"
                        }],
                        "source": {
                            "email": variables.userEmail,
                            "type": "FROM",
                            "user": {
                                "id": variables.userId,
                                "name": variables.userFirstName+" "+variables.userLastName,
                                "active": true,
                                "entityType": "User",
                                "relatedItems": variables.userRelatedItems,
                                "firstName": variables.userFirstName,
                                "lastName": variables.userLastName,
                                "email": variables.userEmail,
                                "smsNumber": null,
                                "outOfOfficeStartDate": null,
                                "outOfOfficeEndDate": null,
                                "outOfOffice": variables.isUserOutOfOffice,
                                "academyLinkCode": variables.userEmail,
                                "createDate": variables.userCreatedDate,
                                "salesRep": variables.isUserSalesRep,
                                "locked": variables.isUserLocked,
                                "roles": variables.userRoles,
                                "properties": variables.userProperties,
                                "availableRoles": variables.availRoles,
                                "biRole": variables.userbiRole,
                                "availableBIRoles": variables.availableBIRoles,
                                "accessControlNodes": variables.accessControlNodes,
                                "globalAccessControlNodes": variables.globalAccessControlNodes,
                                "calendarExportUrl": variables.calendarExportUrl,
                                "adminAssignedProfile": variables.adminAssignedProfile,
                                "availableProfiles": variables.availableProfiles,
                                "availableNotificationSettings": variables.availableNotificationSettings,
                                "userTypeId": variables.userTypeId,
                                "availableUserTypes": variables.availableUserTypes,
                                "relatedContact": null,
                                "relatedPatient": null,
                                "relatedContactId": null,
                                "relatedProviderId": null,
                                "relatedPatientId": null,
                                "relatedProviders": variables.relatedProviders,
                                "relatedOrganizations": variables.relatedOrganizations,
                                "twoFactorAuthType": null,
                                "availableTwoFactorTypes": variables.availableTwoFactorTypes,
                                "sfUsername": null,
                                "accessControlMode": null
                            }
                        },
                        "attachments": [],
                        "newRecipients": [],
                        "type": "INTERNAL",
                        "availableRecipients": [],
                        "requestedUserRecipients": {
                            "TO": [],
                            "CC": []
                        },
                        "requestedRelatedItems": {},
                        "bigtincanEnabled": false,
                        "bigtincanStoryUrls": {},
                        "receivedLocalDate": variables.messageReceivedLocalDate,
                        "active": true,
                        "entityType": "Message"
                    },
                    "recipients": [{
                        "type": "TO",
                        "email": variables.userEmail,
                        "isEntity": true,
                        "entityType": "User",
                        "user": {
                            "id": variables.userId,
                            "name": variables.relName,
                            "active": true,
                            "entityType": "User",
                            "relatedItems": []
                        },
                        "guid": "e61fe76b-0f90-492f-ef07-5f5b3e854353"
                    }, {
                        "type": "CC",
                        "email": variables.userEmail,
                        "isEntity": true,
                        "entityType": "User",
                        "user": {
                            "id": variables.userId,
                            "name": variables.relName,
                            "active": true,
                            "entityType": "User",
                            "relatedItems": []
                        },
                        "guid": "8bca6f4c-f445-4a20-fd43-913792be2d47"
                    }],
                    "messageType": "sendMessageRequest"
                }
            );
            return genericOperations.callRequest('/api/commcenter/message/send', requestBody, "sendMessage").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                }
                expect(response.errorCode).to.equal(0);
            });
            resolve();
        });
    });
};

exports.checkMessageReceiveList = function () {
    describe("/api/customlist/results", function () {
        var timeout = variables.initialTimeout + 2000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should check received message list in collaboration center", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "type": "Message",
                    "index": 0,
                    "size": 100,
                    "viewId": variables.viewIds['Message'],
                    "sortFields": [],
                    "displayFields": [{
                        "fieldId": "status",
                        "displayName": "Status"
                    }, {
                        "fieldId": "subject",
                        "displayName": "Subject"
                    }, {
                        "fieldId": "received",
                        "displayName": "Date"
                    }, {
                        "fieldId": "from.contact",
                        "displayName": "Sender"
                    }, {
                        "fieldId": "attachments",
                        "displayName": "Attachments"
                    }, {
                        "fieldId": "relatedItems",
                        "displayName": "Related Item Indicator"
                    }],
                    "criteriaFields": [{
                        "fieldId": "to.contact",
                        "operator": "EQ",
                        "values": [variables.userId]
                    }],
                    "messageType": "customListResultRequest"
                }
            );
            return genericOperations.callRequest('/api/customlist/results', requestBody, "checkReceivedMessagesList").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var messageId, messageSub;
                var searchArrayValue = _.filter(response.results, function (searchObj) {
                    if(searchObj.resultData.subject === variables.messageSubject){
                        messageId = searchObj.id;
                        messageSub = searchObj.resultData.subject;
                    }
                });
                if(messageId != undefined && messageSub != undefined){
                    if(messageSub === variables.messageSubject){
                        variables.extractMessageId = messageId;
                        console.log("=====> Message found in the messages list with id : "+messageId+" and subject : '"+messageSub+"'");
                        genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                        isPassed = true;
                    }else{
                        console.log("=====> Unable to find message("+messageSub+") in the messages list !");
                        genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                        genericOperations.writeLocalLogs(caseName,"Unable to find message("+messageSub+") in the messages list !",retryCount,logfilename);
                    }
                }
            });
            resolve();
        });
    });
};

exports.checkMessageSentList = function () {
    describe("/api/customlist/results", function () {
        var timeout = variables.initialTimeout + 2000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should check message list in collaboration center", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "type": "MessageSent",
                    "index": 0,
                    "size": 100,
                    "viewId": variables.viewIds['Message'],
                    "sortFields": [],
                    "displayFields": [],
                    "criteriaFields": [{
                        "fieldId": "from.contact",
                        "operator": "EQ",
                        "values": [variables.userId]
                    }],
                    "messageType": "customListResultRequest"
                }
            );
            return genericOperations.callRequest('/api/customlist/results', requestBody, "checkSentMessagesList").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var messageId, messageSub;
                var searchArrayValue = _.filter(response.results, function (searchObj) {
                    if(searchObj.resultData.subject === variables.messageSubject){
                        messageId = searchObj.id;
                        messageSub = searchObj.resultData.subject;
                    }
                });
                if(messageId != undefined && messageSub != undefined){
                    if(messageSub === variables.messageSubject){
                        console.log("=====> Message found in the Sent messages list with id : "+messageId+" and subject : '"+messageSub+"'");
                        genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                        isPassed = true;
                    }else{
                        console.log("=====> Unable to find message("+messageSub+") in Sent messages list !");
                        genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                        genericOperations.writeLocalLogs(caseName,"Unable to find message("+messageSub+") in Sent messages list !",retryCount,logfilename);
                    }
                }
            });
            resolve();
        });
    });
};
