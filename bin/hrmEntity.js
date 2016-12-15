/**
 * Created by INDUSA on 9/27/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var me = require('./hrmEntity.js');
var requestBody, specialtyId, specialtyName;
var logfilename = 'hrmEntity';
var locallogger = '';
/*exports.hrmEntityRetrieve = function () {
    describe("/api/hrmentity/list/retrieve", function () {
        it("should retrieve specialtyId and specialtyName for Organization Save ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                type: "Specialty",
                messageType: "retrieveHrmEntityListRequest"
            });
            return genericOperations.callRequest('/api/hrmentity/list/retrieve', requestBody, "hrmentityListRetrieveSpecialty").then(function (response) {
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.entities;
                var specialtyIdArray = _.find(jsonPath, {
                    'name': 'Lab',
                });
                variables.specialtyId = specialtyIdArray.id;
                variables.specialtyName = specialtyIdArray.name;
            });
            resolve();
        });
    });
};*/

exports.getSpecialty = function (specialtyName) {
    describe("/api/hrmentity/list/retrieve", function () {
        it("should retrieve (Lab) specialtyId and specialtyName for Organization Save ", function () {
            for (var i = 0; i < variables.specialtyNames.length; i++) {
                if (variables.specialtyNames[i] === specialtyName) {
                    variables.specialtyId = variables.specialtyIds[i];
                    variables.specialtyName = variables.specialtyNames[i];
                }
            }
            console.log("=====> Found specialty 'Lab' under specialties with Id : " + variables.specialtyId);
        });
    });
};

//Common search for retrieving default objects from the system
exports.retrieveAllStaticObjects = function (requestType) {
        describe("/api/hrmentity/list/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        if (requestType === 'All') {  //call All the hrmentities
            for (var i = 0; i < variables.hrmEntityTypes.length; i++) {
                me.retrieveAllStaticObjects(variables.hrmEntityTypes[i]);
            }
        } else {
            afterEach(function () {
                retryCount += 1;
                timeout += variables.increaseTimeout;
                genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
            });
            it("retrieving "+requestType+" data from hrmentity list", function () {
                this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
                this.timeout(timeout);
                requestBody = JSON.stringify({
                    "type": requestType,
                    "messageType": "retrieveHrmEntityListRequest"
                });
                return genericOperations.callRequest('/api/hrmentity/list/retrieve', requestBody, "Retrieve_" + requestType + "_Data").then(function (response) {
                    if(response.errorCode != 0){
                        genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,requestType);
                        genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                    }
                    expect(response.errorCode).to.equals(0);
                    if (requestType === 'ActivityCategory') {
                        variables.activityCategoriesIds = [];
                        variables.activityCategoriesNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.activityCategoriesIds.push(searchObj.id);
                            variables.activityCategoriesNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'ActivitySubCategory') {
                        variables.activitySubCategoriesIds = [];
                        variables.activitySubCategoriesNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.activitySubCategoriesIds.push(searchObj.id);
                            variables.activitySubCategoriesNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'CampaignType') {
                        variables.campaignTypeIds = [];
                        variables.campaignTypeNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.campaignTypeIds.push(searchObj.id);
                            variables.campaignTypeNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'OpportunityStage') {
                        variables.opportunityIds = [];
                        variables.opportunityNames = [];
                        variables.opportunityStateTypes = [];
                        variables.opportunityProbability = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.opportunityIds.push(searchObj.id);
                            variables.opportunityNames.push(searchObj.name);
                            variables.opportunityStateTypes.push(searchObj.stateType);
                            variables.opportunityProbability.push(searchObj.defaultProbability);
                        });
                    }
                    else if (requestType === 'ContactType') {
                        variables.contactTypeIds = [];
                        variables.contactTypeNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.contactTypeIds.push(searchObj.id);
                            variables.contactTypeNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'Specialty') {
                        variables.specialtyIds = [];
                        variables.specialtyNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.specialtyIds.push(searchObj.id);
                            variables.specialtyNames.push(searchObj.name);
                            if (searchObj.name === variables.requiredSpecialty) {
                                variables.specialtyId = searchObj.id;
                                variables.specialtyName = searchObj.name;
                            }
                        });

                    }
                    else if (requestType === 'CompetitiveLab') {
                        variables.competitiveLabIds = [];
                        variables.competitiveLabNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.competitiveLabIds.push(searchObj.id);
                            variables.competitiveLabNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'CorrectiveAction') {
                        variables.correctiveActionIds = [];
                        variables.correctiveActionNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.correctiveActionIds.push(searchObj.id);
                            variables.correctiveActionNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'ElectronicMedicalRecord') {
                        variables.emrIds = [];
                        variables.emrNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.emrIds.push(searchObj.id);
                            variables.emrNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'OpportunityType') {
                        variables.opportunityTypeIds = [];
                        variables.opportunityTypeNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.opportunityTypeIds.push(searchObj.id);
                            variables.opportunityTypeNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'OrganizationType') {
                        variables.organizationTypeIds = [];
                        variables.organizationTypeNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.organizationTypeIds.push(searchObj.id);
                            variables.organizationTypeNames.push(searchObj.name);
                        });
                    }
                    else if (requestType === 'RootCause') {
                        variables.rootCauseIds = [];
                        variables.rootCauseNames = [];
                        var searchArrayValue = _.filter(response.entities, function (searchObj) {
                            variables.rootCauseIds.push(searchObj.id);
                            variables.rootCauseNames.push(searchObj.name);
                        });
                    }
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,requestType);
                });
                resolve();
            });
        }
    });

}

//This function is for retrieving activity status from the system
exports.retrieveActivityStatusObjects = function () {
    describe("/api/hrmentity/activitystatus/list/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrive Activity status data", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            requestBody = JSON.stringify({
                "type": "ActivityStatus",
                "messageType": "retrieveHrmEntityListRequest"
            });
            return genericOperations.callRequest('/api/hrmentity/activitystatus/list/retrieve', requestBody, "commonRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equals(0);
                variables.activityStatusIds = [];
                variables.activityStatusNames = [];
                variables.activityStatusStates = [];
                var searchArrayValue = _.filter(response.entities, function (searchObj) {
                    variables.activityStatusIds.push(searchObj.id);
                    variables.activityStatusNames.push(searchObj.name);
                    variables.activityStatusStates.push(searchObj.state);
                });
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
}

//This function is for retrieving activity priority from the system
exports.retrieveActivityPriorityObjects = function () {
    describe("/api/activity/priority/list", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Activity Priority data", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(5000);
            requestBody = JSON.stringify({"messageType": ""});
            return genericOperations.callRequest('/api/activity/priority/list', requestBody, "activityPriorityRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equals(0);
                variables.activityPriorityIds = [];
                variables.activityPriorityNames = [];
                var searchArrayValue = _.filter(response.priorities, function (searchObj) {
                    variables.activityPriorityIds.push(searchObj.id);
                    variables.activityPriorityNames.push(searchObj.name);
                });
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
}


//This method calls generic retrieve method to fill up all the static variables
exports.fillAllVariables = function () {
    this.retrieveAllStaticObjects('All');
    this.retrieveActivityStatusObjects();
    this.retrieveActivityPriorityObjects();
}

