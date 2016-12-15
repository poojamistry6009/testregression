/**
 * Created by INDUSA on 9/28/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');

var genericOperations = require('./genericOperations.js');

var viewId, requestBody = '', entityType = 'Campaign',hc1Object = "campaign", logfilename = hc1Object;

/*exports.campaignCustomListMetadata = function () {
    describe("/api/customlist/metadata", function () {
        it("should retrieve Campaign customlist viewId for use in /api/customlist/results ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                messageType: "customListTypeMetadataRequest",
                type: "Campaign"
            });
            return genericOperations.callRequest('/api/customlist/metadata', requestBody, "customlistMetadataCampaign").then(function (response) {
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
};*/

exports.campaignCustomList = function () {
    describe("/api/customlist/results", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve customlist for Campaign", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                type: "Campaign",
                index: 0,
                size: 10,
                viewId: variables.viewIds['Campaign'],
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
                var jsonPath = response.results;
                var campaignArrayValue = _.filter(jsonPath, function (campaignObj) {
                    if (campaignObj.resultData.name == variables.campaignAddName) {
                        variables.extractCampaignId = campaignObj.id;
                    }
                });
                if(variables.extractCampaignId != '' || variables.extractCampaignId != undefined){
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};

exports.campaignAudienceAssociate = function () {
    describe("/api/campaign/audience/associate", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should associate contact to campaign", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                campaign: {
                    id: variables.extractCampaignId
                },
                audience: {
                    id: variables.extractContactId
                },
                targetType: variables.contactTargetType,
                campaignStage: "",
                messageType: ""
            });
            return genericOperations.callRequest('/api/campaign/audience/associate', requestBody, "campaignAudienceAssociate").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);

            });
            resolve();
        });
    });
}

exports.save = function () {

    //This Test Case Creates New Campaign
    describe("/api/campaign/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Create new Campaign", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "campaign": {
                        "customRecordData": {
                            "entityType": "CustomRecordData",
                            "data": {}
                        },
                        "id": "",
                        "isNew": false,
                        "entityType": "Campaign",
                        "name": variables.campaignAddName,
                        "createdDate": null,
                        "createdUser": null,
                        "updatedDate": null,
                        "updatedUser": null,
                        "organization": null,
                        "campaignNo": null,
                        "campaignType": {
                            "id": variables.campaignTypeIds[0],
                            "name": "\n                \t\n                "+variables.campaignTypeNames[0]
                        },
                        "active": true,
                        "targetType": "Contact",
                        "templates": null,
                        "audience": [],
                        "settings": {
                            "hostCodes": [],
                            "accessioningLocation": false,
                            "collectionLocation": false,
                            "orderingLocation": false,
                            "accessControlNodes": []
                        },
                        "audit": true,
                        "availableAssociationCampaignStages": null,
                        "defaultCampaignStage": null,
                        "relatedItems": [],
                        "availableTargetTypes": ["Contact", "Patient"]
                    },
                    "messageType": ""
                }
            )
            return genericOperations.callRequest('/api/campaign/save', requestBody, "createCampaign").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.campaignId = response.campaign.id;
                variables.extractCampaignId = variables.campaignId;
                variables.extractCampaignName = response.campaign.name;
                if(variables.campaignId !== ""){
                    console.log("=====> Campaign created with Id : "+variables.campaignId);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }else{
                    console.log("=====> Some Error(s) While Creating Campaign ......");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating Campaign ......",retryCount,logfilename);
                }
            });
            resolve();

        });


    });
};

exports.retrieve = function () {
    describe("/api/campaign/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Campaign and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            console.log('=====> Retrieving campaign From Id : '+variables.campaignId);
            requestBody = JSON.stringify({
                "id": variables.campaignId,
                "messageType": ""
            });
            return genericOperations.callRequest('/api/campaign/retrieve', requestBody, "campaignRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractCampaignId = response.campaign.id;
                var recExtractCampaignName = response.campaign.name;
                variables.campaignNo = response.campaign.campaignNo;
                variables.extractCampaignId = recExtractCampaignId
                if (recExtractCampaignName != variables.campaignAddName) {
                    console.log("=====> Retrieved Campaign Name DOES NOT match! found in search :" + recExtractCampaignName+", saved campaign name: "+variables.campaignAddName);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Retrieved Campaign Name DOES NOT match! found in search :" + recExtractCampaignName+", saved campaign name: "+variables.campaignAddName,
                        retryCount,logfilename);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Campaign Name matches: " + recExtractCampaignName);
                }
                genericOperations.validateCampaignData(response.campaign,hc1Object); // For Validating Patient Records*/
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.saveCampaignMsgTemplate = function () {

    //This Test Case Creates New Campaign Message Template
    describe("/api/campaign/template/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Create new Campaign message template", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "template": {
                        "id": "",
                        "campaign": {
                            "id": variables.campaignId,
                            "name": variables.campaignAddName,
                            "active": true,
                            "entityType": "Campaign",
                            "relatedItems": []
                        },
                        "entityType": "MessageTemplate",
                        "name": variables.campaignMsgTemplateName,
                        "subject": variables.campaignMsgTemplate_default1Subject,
                        "body": variables.campaignMsgTemplate_default1body,
                        "textBody": "",
                        "targetType": null,
                        "templateType": null,
                        "attachments": [],
                        "createdDate": null,
                        "createdUser": null,
                        "updatedDate": null,
                        "updatedUser": null,
                        "copyMessageTemplates": [{
                            "id": "1",
                            "name": "Default Template -1",
                            "active": true,
                            "entityType": "MessageTemplate",
                            "relatedItems": []
                        }, {
                            "id": "2",
                            "name": "Default Template -2",
                            "active": true,
                            "entityType": "MessageTemplate",
                            "relatedItems": []
                        }, {
                            "id": "3",
                            "name": "Default Template -3",
                            "active": true,
                            "entityType": "MessageTemplate",
                            "relatedItems": []
                        }],
                        "audit": true,
                        "selectedTab": "email",
                        "copyTemplateId": null,
                        "active": true
                    },
                    "campaign": {
                        "id": variables.campaignId
                    },
                    "messageType": ""
                }
            )
            return genericOperations.callRequest('/api/campaign/template/save', requestBody, "createCampaign").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.campaignMsgTemplateId = response.messageTemplate.id;
                if(variables.campaignMsgTemplateId != undefined || variables.campaignMsgTemplateId != ''){
                    isPassed = true;
                    console.log('=====> Campaign Message template created with id : '+variables.campaignMsgTemplateId);
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();

        });


    });
};

exports.sendMsgToAudiences = function () {

    //This Test Case Send msgs to campaign audiences
    describe("/api/campaign/message/send", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should send a message to campaign audiences", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "campaignMessage": {
                        "id": null,
                        "entityType": "CampaignMessage",
                        "campaignId": variables.extractCampaignId,
                        "subject": variables.campaignMsgTemplate_default1Subject,
                        "body": variables.campaignMsgTemplate_default1body,
                        "textBody": "",
                        "received": null,
                        "recipients": [],
                        "source": {
                            "type": "FROM",
                            "user": {
                                "type": "FROM",
                                "id": variables.userId,
                                "entityType": "User",
                                "email": variables.userEmail
                            }
                        },
                        "attachments": [],
                        "templateId": "5",
                        "campaign": {
                            "id": variables.extractCampaignId,
                            "customRecordData": {
                                "entityType": "CustomRecordData",
                                "data": {}
                            },
                            "isNew": false,
                            "entityType": entityType,
                            "name": variables.extractCampaignName,
                            "createdDate": variables.campaignCreatedDate,
                            "createdUser": {
                                "id": variables.userId,
                                "name": variables.username,
                                "active": true,
                                "entityType": "User",
                                "relatedItems": [],
                                "firstName": variables.userFirstName,
                                "lastName": variables.userLastName,
                                "email": variables.userEmail,
                                "smsNumber": null,
                                "outOfOfficeStartDate": null,
                                "outOfOfficeEndDate": null,
                                "outOfOffice": false,
                                "academyLinkCode": "",
                                "createDate": null,
                                "salesRep": false,
                                "locked": false,
                                "roles": [],
                                "properties": {},
                                "availableRoles": [],
                                "biRole": null,
                                "availableBIRoles": [],
                                "accessControlNodes": [],
                                "globalAccessControlNodes": [],
                                "calendarExportUrl": null,
                                "adminAssignedProfile": {
                                    "id": "",
                                    "name": "",
                                    "active": true,
                                    "entityType": null,
                                    "relatedItems": [],
                                    "userType": null,
                                    "directLoginDisabled": false,
                                    "roles": []
                                },
                                "availableProfiles": [],
                                "availableNotificationSettings": [],
                                "userTypeId": null,
                                "availableUserTypes": [],
                                "relatedContact": null,
                                "relatedPatient": null,
                                "relatedContactId": null,
                                "relatedProviderId": null,
                                "relatedPatientId": null,
                                "relatedProviders": [],
                                "relatedOrganizations": [],
                                "twoFactorAuthType": null,
                                "availableTwoFactorTypes": []
                            },
                            "updatedDate": variables.campaignCreatedDate,
                            "updatedUser": {
                                "id": variables.userId,
                                "name": variables.username,
                                "active": true,
                                "entityType": "User",
                                "relatedItems": [],
                                "firstName": variables.userFirstName,
                                "lastName": variables.userLastName,
                                "email": variables.userEmail,
                                "smsNumber": null,
                                "outOfOfficeStartDate": null,
                                "outOfOfficeEndDate": null,
                                "outOfOffice": false,
                                "academyLinkCode": "",
                                "createDate": null,
                                "salesRep": false,
                                "locked": false,
                                "roles": [],
                                "properties": {},
                                "availableRoles": [],
                                "biRole": null,
                                "availableBIRoles": [],
                                "accessControlNodes": [],
                                "globalAccessControlNodes": [],
                                "calendarExportUrl": null,
                                "adminAssignedProfile": {
                                    "id": "",
                                    "name": "",
                                    "active": true,
                                    "entityType": null,
                                    "relatedItems": [],
                                    "userType": null,
                                    "directLoginDisabled": false,
                                    "roles": []
                                },
                                "availableProfiles": [],
                                "availableNotificationSettings": [],
                                "userTypeId": null,
                                "availableUserTypes": [],
                                "relatedContact": null,
                                "relatedPatient": null,
                                "relatedContactId": null,
                                "relatedProviderId": null,
                                "relatedPatientId": null,
                                "relatedProviders": [],
                                "relatedOrganizations": [],
                                "twoFactorAuthType": null,
                                "availableTwoFactorTypes": []
                            },
                            "organization": {
                                "id": variables.extractOrgId,
                                "name": "test campaign new _"+variables.campaignNo,
                                "active": true,
                                "entityType": "Organization",
                                "relatedItems": []
                            },
                            "campaignNo": variables.campaignNo,
                            "campaignType": {
                                "id": variables.campaignTypeIds[0],
                                "name": variables.campaignName,
                                "active": true,
                                "entityType": "CampaignType",
                                "relatedItems": []
                            },
                            "active": true,
                            "targetType": "Contact",
                            "templates": [{
                                "id": variables.campaignMsgTemplateId,
                                "name": variables.campaignMsgTemplateName,
                                "active": true,
                                "entityType": "MessageTemplate",
                                "subject": variables.campaignMsgTemplate_default1Subject,
                                "body": variables.campaignMsgTemplate_default1body,
                                "textBody": "",
                                "targetType": "Contact",
                                "templateType": "CAMPAIGN",
                                "copyMessageTemplates": [{
                                    "id": "1",
                                    "name": variables.campaignMsgTemplate_default1name,
                                    "active": true,
                                    "entityType": "MessageTemplate",
                                    "relatedItems": []
                                }, {
                                    "id": "2",
                                    "name": variables.campaignMsgTemplate_default2name,
                                    "active": true,
                                    "entityType": "MessageTemplate",
                                    "relatedItems": []
                                }, {
                                    "id": "3",
                                    "name": variables.campaignMsgTemplate_default3name,
                                    "active": true,
                                    "entityType": "MessageTemplate",
                                    "relatedItems": []
                                }],
                                "attachments": [],
                                "createdDate": variables.campaignMsgTemplateCreatedDate ,
                                "createdUser": {
                                    "id": variables.userId,
                                    "name": variables.username,
                                    "active": true,
                                    "entityType": "User",
                                    "relatedItems": [],
                                    "firstName": variables.userFirstName,
                                    "lastName": variables.userLastName,
                                    "email": variables.userEmail,
                                    "smsNumber": null,
                                    "outOfOfficeStartDate": null,
                                    "outOfOfficeEndDate": null,
                                    "outOfOffice": false,
                                    "academyLinkCode": "",
                                    "createDate": null,
                                    "salesRep": false,
                                    "locked": false,
                                    "roles": [],
                                    "properties": {},
                                    "availableRoles": [],
                                    "biRole": null,
                                    "availableBIRoles": [],
                                    "accessControlNodes": [],
                                    "globalAccessControlNodes": [],
                                    "calendarExportUrl": null,
                                    "adminAssignedProfile": {
                                        "id": "",
                                        "name": "",
                                        "active": true,
                                        "entityType": null,
                                        "relatedItems": [],
                                        "userType": null,
                                        "directLoginDisabled": false,
                                        "roles": []
                                    },
                                    "availableProfiles": [],
                                    "availableNotificationSettings": [],
                                    "userTypeId": null,
                                    "availableUserTypes": [],
                                    "relatedContact": null,
                                    "relatedPatient": null,
                                    "relatedContactId": null,
                                    "relatedProviderId": null,
                                    "relatedPatientId": null,
                                    "relatedProviders": [],
                                    "relatedOrganizations": [],
                                    "twoFactorAuthType": null,
                                    "availableTwoFactorTypes": []
                                },
                                "updatedDate": variables.campaignMsgTemplateCreatedDate,
                                "updatedUser": {
                                    "id": variables.userId,
                                    "name": variables.username,
                                    "active": true,
                                    "entityType": "User",
                                    "relatedItems": [],
                                    "firstName": variables.userFirstName,
                                    "lastName": variables.userLastName,
                                    "email": variables.userEmail,
                                    "smsNumber": null,
                                    "outOfOfficeStartDate": null,
                                    "outOfOfficeEndDate": null,
                                    "outOfOffice": false,
                                    "academyLinkCode": "",
                                    "createDate": null,
                                    "salesRep": false,
                                    "locked": false,
                                    "roles": [],
                                    "properties": {},
                                    "availableRoles": [],
                                    "biRole": null,
                                    "availableBIRoles": [],
                                    "accessControlNodes": [],
                                    "globalAccessControlNodes": [],
                                    "calendarExportUrl": null,
                                    "adminAssignedProfile": {
                                        "id": "",
                                        "name": "",
                                        "active": true,
                                        "entityType": null,
                                        "relatedItems": [],
                                        "userType": null,
                                        "directLoginDisabled": false,
                                        "roles": []
                                    },
                                    "availableProfiles": [],
                                    "availableNotificationSettings": [],
                                    "userTypeId": null,
                                    "availableUserTypes": [],
                                    "relatedContact": null,
                                    "relatedPatient": null,
                                    "relatedContactId": null,
                                    "relatedProviderId": null,
                                    "relatedPatientId": null,
                                    "relatedProviders": [],
                                    "relatedOrganizations": [],
                                    "twoFactorAuthType": null,
                                    "availableTwoFactorTypes": []
                                },
                                "campaign": {
                                    "id": variables.extractCampaignId,
                                    "name": "",
                                    "active": true,
                                    "entityType": "Campaign",
                                    "relatedItems": []
                                }
                            }],
                            "audience": [],
                            "settings": {
                                "hostCodes": [],
                                "accessioningLocation": false,
                                "collectionLocation": false,
                                "orderingLocation": false,
                                "accessControlNodes": []
                            },
                            "audit": true,
                            "availableAssociationCampaignStages": [],
                            "defaultCampaignStage": null,
                            "relatedItems": [],
                            "availableTargetTypes": ["Contact", "Patient"]
                        },
                        "receivedLocalDate": variables.campaignMsgTemplateCreatedDate,
                        "campaignStage": ""
                    },
                    "messageType": ""
                }
            )
            return genericOperations.callRequest('/api/campaign/message/send', requestBody, "sendMessageToCampaignAudience").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
            });
            resolve();

        });


    });
};