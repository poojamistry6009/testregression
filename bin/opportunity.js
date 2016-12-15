/**
 * Created by INDUSA on 9/30/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');

var requestBody = '';
var hc1Object = 'opportunity';
var entityType = 'Opportunity';
var logfilename = hc1Object;

exports.save = function () {
    describe("/api/opportunity/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Save new Opportunity", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "opportunity": {
                        "id": variables.opportunityId,
                        "relatedItems": [],
                        "parentEntities": [{
                            "id": variables.extractOrgId,
                            "entityType": "Organization"
                        }],
                        "customRecordData": {
                            "customRecord": {

                            },
                            "fields": {

                            },
                            "data": {

                            },
                            "mappedFields": {

                            }
                        },
                        "entityType": entityType,
                        "name": variables.opportunityName,
                        "description": variables.opportunityDescription,
                        "organization": {
                            "id": variables.extractOrgId,
                            "name": variables.extractOrgName,
                            "active": true,
                            "entityType": "Organization"
                        },
                        "opportunityType": null,
                        "specialty": {
                            "id": variables.specialtyId,
                            "name": variables.specialtyName,
                            "active": true,
                            "entityType": "Specialty",
                            "relatedItems": [],
                            "sortOrder": null,
                            "averageRevenuePerOrder": 98
                        },
                        "stage": {
                            "id": variables.opportunityIds[0],
                            "name": variables.opportunityNames[0],
                            "properties": {
                                "defaultProbability": variables.opportunityProbability[0],
                                "probabilityReadOnly": "false"
                            }
                        },
                        "probabilityReadOnly": false,
                        "effectiveDate": variables.opportunityEffectiveDate,
                        "closeDate": variables.opportunityCloseDate,
                        "performingLab": null,
                        "competitiveLab": null,
                        "resultInterface": false,
                        "orderInterface": false,
                        "ccUsers": [],
                        "hostCodes": null,
                        "revenue": {
                            "revenueCalculatorType": "Order",
                            "probability": 20,
                            "averageRevenuePerOrder": 98
                        },
                        "salesTerritory": {
                            "id": variables.salesTerritoryId,
                            "name": variables.salesTerritoryName
                        },
                        "salesRep": {
                            "id": variables.salesRepId,
                            "name": variables.salesRepName
                        },
                        "electronicMedicalRecords": [],
                        "availableOrganizations": [],
                        "audit": true
                    },
                    "messageType": "saveOpportunityRequest"
                }
            );
            return genericOperations.callRequest('/api/opportunity/save', requestBody, "opportunitySave").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractOpportunityId = response.opportunity.id;
                variables.extractOpportunityName = response.opportunity.name;
                if (variables.extractOpportunityId !== "") {
                    console.log("=====> Opportunity created : " + variables.extractOpportunityName);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};

exports.retrieve = function () {
    describe("/api/opportunity/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve new Opportunity and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                id: variables.extractOpportunityId,
                messageType: "retrieveOpportunityRequest"
            });
            return genericOperations.callRequest('/api/opportunity/retrieve', requestBody, "opportunityRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractOpportunityId = response.opportunity.id;
                variables.extractOpportunityNumber =  response.opportunity.opportunityNumber;
                var recExtractOppName = response.opportunity.name;
                if (recExtractOppName != variables.extractOpportunityName) {
                    console.log("=====> Retrieved Opportunity DOES NOT match: " + recExtractOppName);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Retrieved Opportunity DOES NOT match: " + recExtractOppName,retryCount,logfilename);
                    throw new Error("fail");
                } else {
                    console.log("=====> Retrieved Opportunity Name matches: " + recExtractOppName);
                }
                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " Workflow template being called");

                genericOperations.validateOpportunityData(response.opportunity, hc1Object);//Opportunity  Data Validation

                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};


