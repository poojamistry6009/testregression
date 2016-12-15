/**
 * Created by INDUSA on 9/22/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');

var genericOperations = require('./genericOperations.js');

var requestBody, orgId, viewId, userId = '';
var hostCodeId, hostCodeName, hostCodeConnId, extractNodeId, extractNodeName, extractUACTreeName, activeOrg, extractOrgId;
var hc1Object = 'organization', logfilename = hc1Object;

exports.save = function save() {
    describe("/api/organization/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Organization", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            orgId = null;
            hostCodeId, hostCodeName, hostCodeConnId, extractNodeId, extractNodeName, extractUACTreeName, extractNodeName = null;
            //relName = userLastName + ", " + userFirstName + " " + userEmail;
            requestBody = JSON.stringify({
                organization: {
                    id: orgId,
                    entityType: "Organization",
                    name: variables.orgName,
                    orgNumber: variables.orgNumber,
                    description: variables.orgDescription,
                    mailing: {
                        street: "",
                        street2: "",
                        city: variables.mailingAddressCity,
                        state: variables.mailingAddressState,
                        postal: "",
                        country: ""
                    },
                    billing: {
                        street: "",
                        street2: "",
                        city: "",
                        state: "",
                        postal: "",
                        country: ""
                    },
                    mailingBillingEquals: false,
                    phone: "",
                    fax: "",
                    website: "",
                    specialties: [{
                        id: variables.specialtyId,
                        name: variables.specialtyName,
                        active: true,
                        entityType: "Entity",
                        relatedItems: []
                    }],
                    relationshipManager: {
                        id: userId,
                        name: variables.relName,
                        active: true,
                        entityType: "User",
                        relatedItems: []
                    },
                    settings: {
                        hostCodes: [{
                            intfc: {
                                id: hostCodeId,
                                name: hostCodeName,
                                active: true,
                                entityType: null,
                                relatedItems: [],
                                connId: hostCodeConnId
                            },
                            codes: []
                        }],
                        accessioningLocation: false,
                        collectionLocation: false,
                        orderingLocation: true,
                        accessControlNodes: [{
                            searchResponseType: "accessControlNode",
                            type: null,
                            entity: {
                                id: extractNodeId,
                                name: extractNodeName,
                                active: true,
                                entityType: "AccessControlNode",
                                relatedItems: []
                            },
                            treeName: extractUACTreeName,
                            nodeName: extractNodeName,
                            deletable: true,
                            salesTerritory: true
                        }]
                    },
                    organizationType: null,
                    hours: [{
                        days: [{
                            dayType: "SUNDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "MONDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "TUESDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "WEDNESDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "THURSDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "FRIDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "SATURDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }],
                        type: "Default"
                    }],
                    salesReps : [{
                        id : variables.salesRepId,
                        name : variables.salesRepOrigName,
                        active : true,
                        entityType : "User",
                        relatedItems : []
                    }],
                    salesTerritories : [{
                        id : variables.salesTerritoryId,
                        name : variables.salesTerritoryName,
                        active : true,
                        entityType : "AccessControlNode",
                        relatedItems : []
                    }],
                    salesRepPresentWithNoSalesTerr: false,
                    audit: true,
                    realOrg: true,
                    active: activeOrg,
                    relatedItems: [],
                    type: null
                },
                messageType: "saveOrganizationRequest"
            });
            return genericOperations.callRequest('/api/organization/save', requestBody, "organizationSave").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractOrgId = response.organization.id;
                variables.extractOrgName = response.organization.name;
                if (extractOrgId !== "") {
                    console.log("=====> Organization created: " +  variables.extractOrgName);
                }
                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " Workflow template being called");

                genericOperations.validateOrganizationData(response.organization, hc1Object);//Organization Data Validation

                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.retrieve = function () {
    describe("/api/organization/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve new Organization and check name", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            activeOrg = true;
            requestBody = JSON.stringify({
                id: variables.extractOrgId,
                messageType: "retrieveOrganizationRequest"
            });
            return genericOperations.callRequest('/api/organization/retrieve', requestBody, "organizationRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractOrgId = response.organization.id;
                var recExtractOrgName = response.organization.name;
                if (recExtractOrgName != variables.extractOrgName) {
                    console.log("=====> Retrieved Organization DOES NOT match: " + recExtractOrgName);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Organization Name matches: " + recExtractOrgName);
                }
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

/*exports.orgActivitiesCustomListMetadata = function () {
    describe("/api/customlist/metadata - Org Activities ViewId", function () {
        it("should retrieve Organization Activities customlist viewId for use in /api/customlist/results ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                messageType: "customListTypeMetadataRequest",
                type: "OrganizationActivities"
            });
            return genericOperations.callRequest('/api/customlist/metadata', requestBody, "customlistMetadataOrganizationActivities").then(function (response) {
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.views;
                var viewIdArray = _.find(jsonPath, {
                    'name': 'All',
                });
                variables.viewId = viewIdArray.id;
            });
            resolve();
        });
    });
};*/

exports.orgActivitiesCustomList = function () {
    describe("/api/customlist/results - Org Activities CustomList", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Organization Activities customlist", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            //var activityObj = '';
            requestBody = JSON.stringify({
                type: "OrganizationActivities",
                index: 0,
                size: 10,
                viewId: variables.viewIds['OrganizationActivities'],
                // viewId:variables.viewId,
                sortFields: [],
                displayFields: [{
                    fieldId: "org.id",
                    displayName: "Organization"
                }, {
                    fieldId: "className",
                    displayName: "Type"
                }, {
                    fieldId: "subject",
                    displayName: "Subject"
                }, {
                    fieldId: "fillInDate",
                    displayName: "Order Date"
                }, {
                    fieldId: "dueDate",
                    displayName: "Due Date"
                }, {
                    fieldId: "status",
                    displayName: "Status"
                }, {
                    fieldId: "priority",
                    displayName: "Priority"
                }],
                criteriaFields: [{
                    fieldId: "org.id",
                    operator: "EQ",
                    values: [variables.extractOrgId]
                }],
                messageType: "customListResultRequest"
            });
            return genericOperations.callRequest('/api/customlist/results', requestBody, "customlistOrganizationActivities").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.results;
                if (jsonPath == "Undefined") { //@FIXME ec - this isn't right, it does not catch if the jasonPath is blank.
                    console.log("=====> did not get list of Org Activities");
                    throw new Error("fail");
                } else {
                    console.log("=====> Got a list of Org Activities");
                }
                var caseArrayValue = _.find(jsonPath, function (activityObj) {
                    return activityObj.resultData.className === 'Case';
                });

                variables.extractCaseActivityId = caseArrayValue.id;
                variables.extractCaseActivitySubject = caseArrayValue.resultData.subject;
                console.log("=====> Case:" + variables.extractCaseActivityId);
                var taskArrayValue = _.find(jsonPath, function (activityObj) {
                    return activityObj.resultData.className === 'Task';
                });

                variables.extractTaskActivityId = taskArrayValue.id;
                variables.extractTaskActivitySubject = taskArrayValue.resultData.subject;
                console.log("=====> Task:" + variables.extractTaskActivityId);
                var memoArrayValue = _.find(jsonPath, function (activityObj) {
                    return activityObj.resultData.className === 'Memo';
                });

                variables.extractMemoActivityId = memoArrayValue.id;
                variables.extractMemoActivitySubject = memoArrayValue.resultData.subject;
                console.log("=====> Memo:" + variables.extractMemoActivityId);
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.retrieveAndValidateMailingAddressCity = function () {
    describe("/api/organization/retrieve - data validation", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Organization and mailing address city", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            requestBody = JSON.stringify({
                id: variables.extractOrgId,
                messageType: "retrieveOrganizationRequest"
            });
            return genericOperations.callRequest('/api/organization/retrieve', requestBody, "organizationRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                extractOrgId = response.organization.id;
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.orgUpdate = function () {
    describe("/api/organization/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Organization", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activeOrg = true;
            orgId = null;
            var changeDescription = variables.orgDescription + 'changed to see if the rule runs again';
            //relName = userLastName + ", " + userFirstName + " " + userEmail;
            hostCodeId, hostCodeName, hostCodeConnId, extractNodeId, extractNodeName, extractUACTreeName, extractNodeName = null;
            requestBody = JSON.stringify({
                organization: {
                    id: extractOrgId,
                    entityType: "Organization",
                    name: variables.extractOrgName,
                    orgNumber: variables.orgNumber,
                    description: changeDescription,
                    mailing: {
                        street: "mStreet",
                        street2: "mStreet2",
                        city: "mCity",
                        state: "mState",
                        postal: "mPostal",
                        country: "mCountry"
                    },
                    billing: {
                        street: "oStreet",
                        street2: "oStreet2",
                        city: "oCity",
                        state: "oState",
                        postal: "oPostal",
                        country: "oCountry"
                    },
                    mailingBillingEquals: false,
                    phone: variables.contactMobile,
                    fax: variables.fax,
                    website: variables.website,
                    specialties: [{
                        id: variables.specialtyId,
                        name: variables.specialtyName,
                        active: true,
                        entityType: "Entity",
                        relatedItems: []
                    }],
                    relationshipManager: {
                        id: userId,
                        name: variables.relName,
                        active: true,
                        entityType: "User",
                        relatedItems: []
                    },
                    settings: {
                        hostCodes: [{
                            intfc: {
                                id: hostCodeId,
                                name: hostCodeName,
                                active: true,
                                entityType: null,
                                relatedItems: [],
                                connId: hostCodeConnId
                            },
                            codes: []
                        }],
                        accessioningLocation: false,
                        collectionLocation: false,
                        orderingLocation: true,
                        accessControlNodes: [{
                            searchResponseType: "accessControlNode",
                            type: null,
                            entity: {
                                id: extractNodeId,
                                name: extractNodeName,
                                active: true,
                                entityType: "AccessControlNode",
                                relatedItems: []
                            },
                            treeName: extractUACTreeName,
                            nodeName: extractNodeName,
                            deletable: true,
                            salesTerritory: true
                        }]
                    },
                    organizationType: null,
                    hours: [{
                        days: [{
                            dayType: "SUNDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "MONDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "TUESDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "WEDNESDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "THURSDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "FRIDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }, {
                            dayType: "SATURDAY",
                            status: "Closed",
                            open: "00:00:00",
                            closed: "00:00:00"
                        }],
                        type: "Default"
                    }],
                    salesReps : [{
                        id : variables.salesRepId,
                        name : variables.salesRepOrigName,
                        active : true,
                        entityType : "User",
                        relatedItems : []
                    }],
                    salesTerritories : [{
                        id : variables.salesTerritoryId,
                        name : variables.salesTerritoryName,
                        active : true,
                        entityType : "AccessControlNode",
                        relatedItems : []
                    }],
                    salesRepPresentWithNoSalesTerr: false,
                    audit: true,
                    realOrg: true,
                    active: activeOrg,
                    relatedItems: [],
                    type: null
                },
                messageType: "saveOrganizationRequest"
            });
            return genericOperations.callRequest('/api/organization/save', requestBody, "organizationSave").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractOrgId = response.organization.id;
                variables.extractOrgName = response.organization.name;
                if (extractOrgId !== "") {
                    console.log("=====> Organization updated: " + variables.extractOrgName);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                } else {
                    console.log("=====> Organization update did not work.");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Organization update did not work.",retryCount,logfilename);
                }
            });
            resolve();
        });
    });
}