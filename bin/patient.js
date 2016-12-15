/**
 * Created by INDUSA on 10/4/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');

var activityId, requestBody = '',hc1Object = "patient", logfilename = hc1Object;

exports.save = function () {

    //This Test Case Creates New Patient
    describe("/api/patient/create", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Create new Patient", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            activityId = null;
            console.log('=====> Creating Patient Under ' + variables.extractOrgName + ' ' + variables.extractOrgId);
            requestBody = JSON.stringify({
                "patient": {
                    "customRecordData": {
                        "entityType": "CustomRecordData",
                        "data": {}
                    },
                    "id": variables.patientId,
                    "entityType": "Patient",
                    "name": "",
                    "salutation": {
                        "id": variables.patientSalutation,
                        "name": variables.patientSalutation + '.'
                    },
                    "firstName": variables.patientFirstName,
                    "middleName": variables.patientMiddleName,
                    "lastName": variables.patientLastName,
                    "suffix": variables.patientSuffix,
                    "organization": {
                        "customRecordData": {
                            "customRecord": {},
                            "fields": {},
                            "data": {},
                            "mappedFields": {}
                        },
                        "id": variables.organizationId
                    },
                    "email": variables.patientEmail,
                    "phone": variables.patientPhone,
                    "mobile": variables.patientMobile,
                    "otherPhone": variables.patientOtherPhone,
                    "fax": variables.patientFax,
                    "title": variables.patientJobTitle,
                    "department": variables.patientDepartment,
                    "credentials": variables.patientCredentials,
                    "mailing": {
                        "street": variables.patientMailingstreet,
                        "street2": variables.patientMailingstreet2,
                        "city": variables.patientMailingcity,
                        "state": variables.patientMailingstate,
                        "postal": variables.patientMailingpostal,
                        "country": variables.patientMailingcountry
                    },
                    "otherAddr": {
                        "street": variables.patientOtherAddrstreet,
                        "street2": variables.patientOtherAddrstreet2,
                        "city": variables.patientOtherAddrcity,
                        "state": variables.patientOtherAddrstate,
                        "postal": variables.patientOtherAddrpostal,
                        "country": variables.patientOtherAddrcountry
                    },
                    "emailOptOut": variables.patientEmailOptOut,
                    "textOptOut": variables.patientTextOptOut,
                    "campaignEmailOptOut": variables.patientCampaignEmailOptOut,
                    "campaignTextOptOut": variables.patientCampaignTextOptOut,
                    "preferEmails": variables.patientPreferEmails,
                    "preferTexts": variables.patientPreferTexts,
                    "doNotCall": variables.patientDoNotCall,
                    "isLead": variables.patientLead,
                    "isCustomer": variables.patientCustomer,
                    "npi": null,
                    "specialties": [],
                    "settings": {
                        "hostCodes": [
                            {
                                "intfc": {
                                    "id": "27039811265696800698678751833",
                                    "name": "hc1Test",
                                    "active": true,
                                    "entityType": null,
                                    "relatedItems": [],
                                    "connId": "hc1Test"
                                },
                                "codes": []
                            }
                        ],
                        "accessioningLocation": false,
                        "collectionLocation": false,
                        "orderingLocation": false,
                        "accessControlNodes": []
                    },
                    "mailingOtherEquals": true,
                    "contactType": "",
                    "createdDate": null,
                    "createdUser": null,
                    "updatedDate": null,
                    "updatedUser": null,
                    "hostCodes": "",
                    "patientId": variables.patientPatientId,
                    "mrn": variables.patientMrn,
                    "ssn": variables.patientSsn,
                    "birthdate": null,
                    "sex": {
                        "id": variables.patientSex,
                        "name": variables.patientSex,
                        "active": true,
                        "entityType": null,
                        "relatedItems": []
                    },
                    "availableOrganizations": [],
                    "audit": true,
                    "availableUserProfiles": [],
                    "active": variables.patientActive,
                    "relatedItems": [],
                    "dob": variables.patientDob
                },
                "options": {
                    "organization": {
                        "customRecordData": {
                            "customRecord": {},
                            "fields": {},
                            "data": {},
                            "mappedFields": {}
                        },
                        "id": variables.extractOrgId
                    }
                },
                "messageType": "savePatientCustomRequest"
            })
            return genericOperations.callRequest('/api/patient/create', requestBody, "createPatient").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);

                variables.extractPatientId = response.patient.id;
                variables.extractPatientName = response.patient.name;
                variables.extractPatientSalutation = response.patient.salutation.name;

                if (variables.extractPatientId !== "") {
                    console.log("=====> Patient Created : " + variables.extractPatientSalutation + '' + variables.extractPatientName);
                } else {
                    console.log("=====> Some Error(s) While Creating Patient ......");
                    if(response.errorCode != 0){
                        genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                        genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating Patient ......",retryCount,logfilename);
                    }
                }

                console.log('==============================================================================');
                console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " being called");

                genericOperations.validatePatientData(response.patient, hc1Object); // For Validating Patient Records
                console.log('==============================================================================');
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();

        });


    });

};


exports.retrieve = function () {
    describe("/api/patient/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Patient  and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            console.log('=====> Retrieving Patient From Id : ' + variables.extractPatientId);
            requestBody = JSON.stringify({
                id: variables.extractPatientId,
                messageType: "retrievePatientRequest"
            });
            return genericOperations.callRequest('/api/patient/retrieve', requestBody, "patientRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractPatientId = response.patient.id;
                var recExtractPatientName = response.patient.name;

                if (recExtractPatientName != variables.extractPatientName) {
                    console.log("=====> Retrieved Patient Name DOES NOT match: " + recExtractPatientName);
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Retrieved Patient Name DOES NOT match: " + recExtractPatientName,retryCount,logfilename);
                    throw new Error("fail");

                } else {
                    console.log("=====> Retrieved Patient Name matches: " + recExtractPatientName);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};