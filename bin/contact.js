/**
 * Created by INDUSA on 9/27/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');

var genericOperations = require('./genericOperations.js');

var requestBody='', entityType = 'Contact', hc1Object = "contact", logfilename = hc1Object;

exports.save = function (type) {
    var contactType = '',firstName = '', middleName = '', lastName = '', email = '';
    if(type === 'Contact' || type === 'contact') {
        contactType = { id: "Contact",
            name: "Contact"};
        firstName = variables.contactFirstName;
        middleName = variables.contactMiddleName;
        lastName = variables.contactLastName;
        email = variables.contactEmail;
    }
    if(type === 'Provider' || type === 'provider') {
        contactType = { id: "Provider",
            name: "Provider"};
        firstName = variables.providerFirstName;
        middleName = variables.providerMiddleName;
        lastName = variables.providerLastName;
    }
    describe("/api/contact/save", function () {
        var timeout = variables.initialTimeout + 10000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title+"-"+type;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should save the contact", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "contact" : {
                        "customRecordData" : {
                            "entityType" : "CustomRecordData",
                            "data" : {}
                        },
                        "id" : "",
                        "isNew" : false,
                        "entityType" : "Contact",
                        "name" : "",
                        "salutation" : {
                            "id" : null,
                            "name" : null
                        },
                        "fullName" : "",
                        "firstName" : firstName,
                        "middleName" : middleName,
                        "lastName" : lastName,
                        "suffix" : null,
                        "email" : email,
                        "phone" : "",
                        "mobile" : "",
                        "otherPhone" : "",
                        "fax" : "",
                        "title" : "",
                        "department" : "",
                        "credentials" : "",
                        "mailing" : {
                            "street" : "",
                            "street2" : "",
                            "city" : "",
                            "state" : "",
                            "postal" : "",
                            "country" : ""
                        },
                        "otherAddr" : {
                            "street" : "",
                            "street2" : "",
                            "city" : "",
                            "state" : "",
                            "postal" : "",
                            "country" : ""
                        },
                        "emailOptOut" : false,
                        "textOptOut" : false,
                        "campaignEmailOptOut" : false,
                        "campaignTextOptOut" : false,
                        "preferEmails" : true,
                        "preferTexts" : true,
                        "doNotCall" : false,
                        "isLead" : false,
                        "isCustomer" : false,
                        "npi" : "",
                        "specialties" : [],
                        "availableAssociationContactTypes" : [{
                            "id" : variables.contactTypeIds[0],
                            "name" : variables.contactTypeNames[0],
                            "active" : true,
                            "entityType" : "ContactType",
                            "relatedItems" : []
                        }, {
                            "id" : variables.contactTypeIds[1],
                            "name" : variables.contactTypeNames[1],
                            "active" : true,
                            "entityType" : "ContactType",
                            "relatedItems" : []
                        }, {
                            "id" : variables.contactTypeIds[2],
                            "name" : variables.contactTypeNames[2],
                            "active" : true,
                            "entityType" : "ContactType",
                            "relatedItems" : []
                        }
                        ],
                        "contactTypeNames" : [],
                        "associatedContactTypes" : [],
                        "countAssociatedContactTypeNames" : null,
                        "availableSpecialties" : [],
                        "availableSalutations" : [],
                        "settings" : {
                            hostCodes: [{
                                intfc: {
                                    id: variables.hostCodeId,
                                    name: variables.hostCodeName,
                                    active: true,
                                    entityType: null,
                                    relatedItems: [],
                                    connId: variables.hostCodeConnId
                                },
                                codes: []
                            }]
                        },
                        "mailingOtherEquals" : true,
                        "contactType" : contactType,
                        "createdDate" : null,
                        "createdUser" : null,
                        "updatedDate" : null,
                        "updatedUser" : null,
                        "organization" : {
                            "customRecordData" : {
                                "customRecord" : {},
                                "fields" : {},
                                "data" : {},
                                "mappedFields" : {}
                            },
                            "id" : null,
                            "isNew" : false,
                            "entityType" : "Organization",
                            "name" : variables.extractOrgName,
                            "orgNumber" : "",
                            "description" : "",
                            "mailing" : {},
                            "billing" : {},
                            "mailingBillingEquals" : false,
                            "phone" : "",
                            "fax" : "",
                            "website" : "",
                            "specialties" : [],
                            "updatedDate" : null,
                            "updatedUser" : {},
                            "relationshipManager" : null,
                            "importantContacts" : [],
                            "contactId" : "",
                            "parentOrgs" : [],
                            "settings" : {},
                            "organizationType" : null,
                            "availableAssociationContactTypes" : [],
                            "competitiveLabs" : [],
                            "accessControlNodes" : [],
                            "feeSchedules" : [],
                            "panelFees" : [],
                            "hours" : [],
                            "salesReps" : [],
                            "salesTerritories" : [],
                            "salesRepPresentWithNoSalesTerr" : false,
                            "audit" : true,
                            "realOrg" : true
                        },
                        "availableOrganizations" : [],
                        "availableUserProfiles" : [],
                        "subUsers" : [],
                        "audit" : true,
                        "fetched" : true,
                        "active" : true,
                        "relatedItems" : [],
                        "hostCodes" : ""
                    },
                    "options" : {
                        "organization" : {
                            "customRecordData" : {
                                "customRecord" : {},
                                "fields" : {},
                                "data" : {},
                                "mappedFields" : {}
                            },
                            "id" : null,
                            "isNew" : false,
                            "entityType" : "Organization",
                            "name" : variables.extractOrgName,
                            "orgNumber" : "",
                            "description" : "",
                            "mailing" : {},
                            "billing" : {},
                            "mailingBillingEquals" : false,
                            "phone" : "",
                            "fax" : "",
                            "website" : "",
                            "specialties" : [],
                            "updatedDate" : null,
                            "updatedUser" : {},
                            "relationshipManager" : null,
                            "importantContacts" : [],
                            "contactId" : "",
                            "parentOrgs" : [],
                            "settings" : {},
                            "organizationType" : null,
                            "availableAssociationContactTypes" : [],
                            "competitiveLabs" : [],
                            "accessControlNodes" : [],
                            "feeSchedules" : [],
                            "panelFees" : [],
                            "hours" : [],
                            "salesReps" : [],
                            "salesTerritories" : [],
                            "salesRepPresentWithNoSalesTerr" : false,
                            "audit" : true,
                            "realOrg" : true
                        },
                        "primaryContact" : false,
                        "copyAddress" : false,
                        "contactType" : {
                            "id" : variables.contactTypeIds[0]
                        }
                    },
                    "messageType" : "saveContactRequest"
                }
            );
            return genericOperations.callRequest('/api/contact/save', requestBody, "contactSave").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,type);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                if(type === 'Contact' || type === 'contact'){
                    variables.extractContactId = response.contact.id;
                    variables.extractContactName = response.contact.name;
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,type);
                }
                if(type === 'Provider' || type === 'provider'){
                    variables.providerId =  response.contact.id;
                    variables.providerName = response.contact.name;
                    variables.extractProviderName = response.contact.firstName;
                    variables.extractProviderId = response.contact.id;
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,type);
                }
            });
            resolve();
        });
    });
};

exports.retrieve = function(type) {
    describe("/api/contact/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title+"-"+type;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve Contact  and check name", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            console.log('=====> Retrieving Contact From Id : '+variables.extractContactId);
            var contactType = '', requestContactId = '';
            if(type === 'Provider' || type === 'provider'){
                contactType = 'Provider';
                requestContactId = variables.extractProviderId;
            }
            if(type === 'Contact' || type === 'contact'){
                contactType = 'Contact';
                requestContactId = variables.extractContactId;
            }
            requestBody = JSON.stringify({
                id: requestContactId,
                messageType: "retrieveContactRequest"
            });
            return genericOperations.callRequest('/api/contact/retrieve', requestBody, "contactRetrieve").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,type);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var recExtractContactId = response.contact.id;
                var recExtractContactName = response.contact.name;
                variables.contactCreatedDate = response.contact.createdDate;
                variables.contactUpdatedDate = response.contact.updatedDate;
                if(contactType === 'Contact' || contactType === 'contact'){
                    if (recExtractContactName != variables.extractContactName) {
                        console.log("=====> Retrieved Contact Name DOES NOT match: " + recExtractContactName);
                        throw new Error("fail");
                    } else {
                        console.log("=====> Retrieved Contact Name matches: " + recExtractContactName);
                    }
                    console.log('==============================================================================');
                    console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " being called");

                    genericOperations.validateContactData(response.contact,hc1Object); // For Validating Contact Records

                    console.log('==============================================================================');
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,type);
                }
                if(contactType === 'Provider' || contactType === 'provider'){
                     if(recExtractContactId != variables.extractProviderId){
                        console.log("=====> Contact Not Found ...");
                     }else{
                         console.log("=====> found contact ID : "+recExtractContactId+', name : '+response.contact.name);
                     }
                    console.log('==============================================================================');
                    console.log("=====> Validate " + hc1Object + " Data to troubleshoot reconcile the data in " + hc1Object + " being called");

                    genericOperations.validateProviderData(response.contact,hc1Object); //For Validating Provider Records

                    console.log('==============================================================================');
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,type);
                }
            });
            resolve();
        });
    });
};
