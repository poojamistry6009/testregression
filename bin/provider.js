/**
 * Created by INDUSA on 10/12/2016.
 */
/*require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var _ = require('lodash');

var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var requestBody='';

var hc1Object = 'contact';
var entityType = 'Contact';
var contactTypeId = 'Provider';
var contactTypeName = 'Provider';

exports.save = function () {

    //This Test Case Creates New Contact type provider
    describe("/api/contact/save", function () {
        it("Should create a new contact of type provider", function () {
            this.timeout(5000);
            requestBody = JSON.stringify(
                {
                    "contact": {
                        "customRecordData": {
                            "entityType": "CustomRecordData",
                            "data": {}
                        },
                        "id": "",
                        "isNew": false,
                        "entityType": entityType,
                        "name": "",
                        "salutation": {
                            "id": variables.providerSalutationId,
                            "name": variables.providerSalutationName
                        },
                        "fullName": "  ",
                        "firstName": variables.providerFirstName,
                        "middleName": variables.providerMiddleName,
                        "lastName": variables.providerLastName,
                        "suffix": variables.providerSuffix,
                        "email": variables.providerEmail,
                        "phone": variables.providerPhone,
                        "mobile": variables.providerMobile,
                        "otherPhone": "",
                        "fax": "",
                        "title": "",
                        "department": "",
                        "credentials": "",
                        "mailing": {
                            "street": "",
                            "street2": "",
                            "city": "",
                            "state": "",
                            "postal": "",
                            "country": ""
                        },
                        "otherAddr": {
                            "street": "",
                            "street2": "",
                            "city": "",
                            "state": "",
                            "postal": "",
                            "country": ""
                        },
                        "emailOptOut": false,
                        "textOptOut": false,
                        "campaignEmailOptOut": false,
                        "campaignTextOptOut": false,
                        "preferEmails": true,
                        "preferTexts": true,
                        "doNotCall": false,
                        "isLead": false,
                        "isCustomer": false,
                        "npi": "test",
                        "specialties": [],
                        "availableAssociationContactTypes": [{
                            "id": variables.contactTypeIds[0],
                            "name": variables.contactTypeNames[0],
                            "active": true,
                            "entityType": "ContactType",
                            "relatedItems": []
                        }, {
                            "id": variables.contactTypeIds[1],
                            "name": variables.contactTypeNames[1],
                            "active": true,
                            "entityType": "ContactType",
                            "relatedItems": []
                        }, {
                            "id": variables.contactTypeIds[2],
                            "name": variables.contactTypeNames[2],
                            "active": true,
                            "entityType": "ContactType",
                            "relatedItems": []
                        }],
                        "contactTypeNames": [],
                        "associatedContactTypes": [],
                        "countAssociatedContactTypeNames": null,
                        "availableSpecialties": [],
                        "availableSalutations": [{
                            "id": "Empty",
                            "name": "",
                            "active": true,
                            "entityType": null,
                            "relatedItems": []
                        }, {
                            "id": "Mr",
                            "name": "Mr.",
                            "active": true,
                            "entityType": null,
                            "relatedItems": []
                        }, {
                            "id": "Mrs",
                            "name": "Mrs.",
                            "active": true,
                            "entityType": null,
                            "relatedItems": []
                        }, {
                            "id": "Ms",
                            "name": "Ms.",
                            "active": true,
                            "entityType": null,
                            "relatedItems": []
                        }, {
                            "id": "Dr",
                            "name": "Dr.",
                            "active": true,
                            "entityType": null,
                            "relatedItems": []
                        }],
                        "settings": {
                            "hostCodes": [],
                            "accessioningLocation": false,
                            "collectionLocation": false,
                            "orderingLocation": false,
                            "accessControlNodes": []
                        },
                        "mailingOtherEquals": true,
                        "contactType": {
                            "id": contactTypeId,
                            "name": contactTypeName
                        },
                        "createdDate": null,
                        "createdUser": null,
                        "updatedDate": null,
                        "updatedUser": null,
                        "organization": {
                            "customRecordData": {
                                "customRecord": {},
                                "fields": {},
                                "data": {},
                                "mappedFields": {}
                            },
                            "id": variables.extractOrgId,
                            "isNew": false,
                            "entityType": "Organization",
                            "name": variables.extractOrgName,
                            "orgNumber": "",
                            "description": "",
                            "mailing": {},
                            "billing": {},
                            "mailingBillingEquals": false,
                            "phone": "",
                            "fax": "",
                            "website": "",
                            "specialties": [],
                            "updatedDate": null,
                            "updatedUser": {},
                            "relationshipManager": null,
                            "importantContacts": [],
                            "contactId": "",
                            "parentOrgs": [],
                            "settings": {},
                            "organizationType": null,
                            "availableAssociationContactTypes": [],
                            "competitiveLabs": [],
                            "accessControlNodes": [],
                            "feeSchedules": [],
                            "panelFees": [],
                            "hours": [],
                            "salesReps": [],
                            "salesTerritories": [],
                            "salesRepPresentWithNoSalesTerr": false,
                            "audit": true,
                            "realOrg": true,
                            "active": true,
                            "relatedItems": []
                        },
                        "availableOrganizations": [],
                        "availableUserProfiles": [],
                        "subUsers": [],
                        "audit": true,
                        "fetched": true,
                        "active": true,
                        "relatedItems": [],
                        "hostCodes": ""
                    },
                    "options": {
                        "organization": {
                            "customRecordData": {
                                "customRecord": {},
                                "fields": {},
                                "data": {},
                                "mappedFields": {}
                            },
                            "id": variables.extractOrgId,
                            "isNew": false,
                            "entityType": "Organization",
                            "name": variables.extractOrgName,
                            "orgNumber": "",
                            "description": "",
                            "mailing": {},
                            "billing": {},
                            "mailingBillingEquals": false,
                            "phone": "",
                            "fax": "",
                            "website": "",
                            "specialties": [],
                            "updatedDate": null,
                            "updatedUser": {},
                            "relationshipManager": null,
                            "importantContacts": [],
                            "contactId": "",
                            "parentOrgs": [],
                            "settings": {},
                            "organizationType": null,
                            "availableAssociationContactTypes": [],
                            "competitiveLabs": [],
                            "accessControlNodes": [],
                            "feeSchedules": [],
                            "panelFees": [],
                            "hours": [],
                            "salesReps": [],
                            "salesTerritories": [],
                            "salesRepPresentWithNoSalesTerr": false,
                            "audit": true,
                            "realOrg": true,
                            "active": true,
                            "relatedItems": []
                        },
                        "primaryContact": true,
                        "copyAddress": true,
                        "contactType": {
                            "id": variables.contactTypeIds[0]
                        }
                    },
                    "messageType": "saveContactRequest"
                }
            );
            return genericOperations.callRequest('/api/contact/save', requestBody, "saveContactProvider").then(function (response) {
                expect(response.errorCode).to.equal(0);
                variables.providerId =  response.contact.id;
                variables.providerName = response.contact.name;
                variables.extractProviderName = response.contact.firstName;
            });
            resolve();
        });
    });
}

exports.retrieve = function () {
    describe("/api/contact/retrieve", function () {
        it("should retrieve new contact and check name", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                id: variables.providerId,
                messageType: "retrieveContactRequest"
            });
            return genericOperations.callRequest('/api/contact/retrieve', requestBody, "contactRetrieve").then(function (response) {
                expect(response.errorCode).to.equal(0);
                if(response.contact.id != variables.providerId){
                    console.log("=====> Contact Not Found ...");
                }else{
                    console.log("=====> found contact ID : "+response.contact.id+', name : '+response.contact.name);
                    genericOperations.validateProviderData(response.contact,hc1Object);
                }
            });
            resolve();
        });
    });

}*/

