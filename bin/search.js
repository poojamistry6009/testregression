/**
 * Created by INDUSA on 9/22/2016.
 */

require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var util = require('util');
//var req = require('./request.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var bluebird = require('bluebird');
var _ = require('lodash');
var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');
var requestBody = '';
var searchString = '';
var me = require('./search.js');
var logfilename = 'search';
var locallogger = '';

/*exports.orgDataSearch = function () {

 describe("/api/search", function () {

 it("should look up the organization and verify it is in cloud search", function () {
 searchString = variables.extractOrgName;
 this.timeout(5000);
 requestBody = JSON.stringify({
 recordTypes: ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 params: {},
 searchString: searchString,
 sortField: "name",
 size: 25,
 index: 0,
 messageType: "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchOrganization").then(function (response) {
 if (response.responses === null) {
 console.log("null search results came back");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchOrganization").then(function (response) {
 console.log(response);
 });
 }
 //@FUTURE: need to check for result = the org name
 var jsonPath = response.responses;
 var recExtractOrgName = '';

 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 if (searchObj.entity.name == variables.orgName) {
 recExtractOrgName = searchObj.entity.name;
 } else {
 console.log("=====> Could not retrieve Cloud Search response or didn't match " + recExtractOrgName + " " + variables.orgName);
 }
 });
 if (recExtractOrgName != variables.extractOrgName) {
 console.log("=====> Retrieved Organization DID NOT match: " + recExtractOrgName + " " + variables.orgName);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved Organization Name matches: " + recExtractOrgName + " " + variables.orgName);
 }
 });
 resolve();
 });
 });
 };

 //For Searching Case Information On Cloud
 exports.caseDataSearch = function () {
 describe("/api/search", function () {
 it("should look up the Case Information and verify it is in cloud search", function () {
 console.log("=====> Searching On Cloud With Case Name : " + variables.extractCaseName);
 searchString = variables.extractCaseName;
 this.timeout(7000);
 requestBody = JSON.stringify({
 recordTypes: ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 params: {},
 searchString: searchString,
 sortField: "name",
 size: 25,
 index: 0,
 messageType: "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchCase").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchCase").then(function (response) {
 console.log(response);
 });
 }
 var jsonPath = response.responses;
 var recExtractCaseName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 // console.log('searchObj ===> '+JSON.stringify(searchObj));
 if (searchObj.entity.name == variables.caseName) {
 recExtractCaseName = searchObj.entity.name;
 } else {
 console.log("=====> Could not retrieve Cloud Search response or didn't match " + recExtractCaseName + " " + variables.caseName);
 }
 });
 if (recExtractCaseName != variables.extractCaseName) {
 console.log("=====> Retrieved Case Information DID NOT Match: " + recExtractCaseName + " With " + variables.caseName);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved Case Information Name Matches: (" + recExtractCaseName + ") With  (" + variables.caseName + ')');
 }
 });
 resolve();
 });
 });

 };

 //For Searching Task Information On Cloud
 exports.taskDataSearch = function () {
 describe("/api/search", function () {
 it("should look up the Task Information and verify it is in cloud search", function () {
 console.log("=====> Searching On Cloud With Task Name : " + variables.extractTaskName);
 searchString = variables.extractTaskName;
 this.timeout(7000);
 requestBody = JSON.stringify({
 recordTypes: ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 params: {},
 searchString: searchString,
 sortField: "name",
 size: 25,
 index: 0,
 messageType: "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchTask").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchTask").then(function (response) {
 console.log(response);
 });
 }

 var jsonPath = response.responses;
 var recExtractTaskName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 if (searchObj.entity.name == variables.taskName) {
 recExtractTaskName = searchObj.entity.name;
 } else {
 console.log("=====> Could not retrieve Cloud Search response or didn't match " + recExtractTaskName + " " + variables.taskName);
 }
 });
 if (recExtractTaskName != variables.extractTaskName) {
 console.log("=====> Retrieved Task Information DID NOT Match: " + recExtractTaskName + " With " + variables.taskName);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved Task Information Name Matches: (" + recExtractTaskName + ") With  (" + variables.taskName + ')');
 }
 });
 resolve();
 });
 });
 };

 //For Searching Memo Information On Cloud
 exports.memoDataSearch = function () {
 describe("/api/search", function () {
 it("should look up the Memo Information and verify it is in cloud search", function () {
 console.log("=====> Searching On Cloud With Memo Name : " + variables.extractMemoName);
 searchString = variables.extractMemoName;
 this.timeout(7000);
 requestBody = JSON.stringify({
 recordTypes: ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 params: {},
 searchString: searchString,
 sortField: "name",
 size: 25,
 index: 0,
 messageType: "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchMemo").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchMemo").then(function (response) {
 console.log(response);
 });
 }

 var jsonPath = response.responses;
 var recExtractMemoName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 if (searchObj.entity.name == variables.memoName) {
 recExtractMemoName = searchObj.entity.name;
 } else {
 console.log("=====> Could not retrieve Cloud Search response or didn't match " + recExtractMemoName + " " + variables.memoName);
 }
 });
 if (recExtractMemoName != variables.extractMemoName) {
 console.log("=====> Retrieved Memo Information DID NOT Match: " + recExtractMemoName + " With " + variables.memoName);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved Memo Information Name Matches: (" + recExtractMemoName + ") With  (" + variables.memoName + ')');
 }
 });
 resolve();
 });
 });

 }

 //For Searching Contact/Provider Information On Cloud
 exports.contactDataSearch = function (contactType) {
 describe("/api/search", function () {
 it("should look up the "+contactType+" Information and verify it is in cloud search", function () {
 searchString = variables.providerFirstName;
 console.log("=====> Searching On Cloud With "+contactType+" Name : "+searchString);
 this.timeout(10000);
 requestBody = JSON.stringify({
 "recordTypes": ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 "params": {},
 "searchString": searchString,
 "sortField": "name",
 "size": 25,
 "index": 0,
 "messageType": "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchProvider").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchMemo").then(function (response) {
 console.log(response);
 });
 }
 var jsonPath = response.responses;
 var recExtractProviderName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 if (searchObj.fullName === variables.providerFullname && searchObj.type === contactType) {
 recExtractProviderName = searchObj.fullName;
 }
 });
 if (recExtractProviderName != variables.providerFullname) {
 console.log("=====> Retrieved "+contactType+" Information DID NOT Match: " + recExtractProviderName + " With " + variables.providerFullname);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved "+contactType+" Information Name Matches: (" + recExtractProviderName + ") With  (" + variables.providerFullname+ ')');
 }
 });
 resolve();
 });
 });

 }

 //For Searching Opportunity Information On Cloud
 exports.opportunityDataSearch = function () {
 describe("/api/search", function () {
 it("should look up the opportunity Information and verify it is in cloud search", function () {
 searchString = variables.extractOpportunityName;
 console.log("=====> Searching On Cloud With opportunity Name : "+searchString);
 this.timeout(5000);
 requestBody = JSON.stringify({
 "recordTypes": ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"],
 "params": {},
 "searchString": searchString,
 "sortField": "name",
 "size": 25,
 "index": 0,
 "messageType": "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "searchProvider").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchMemo").then(function (response) {
 console.log(response);
 });
 }
 var jsonPath = response.responses;
 var opportunityName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 if (searchObj.entity.name === variables.extractOpportunityName) {
 opportunityName = searchObj.entity.name;
 }
 });
 if (opportunityName != variables.extractOpportunityName) {
 console.log("=====> Retrieved Information DID NOT Match: " + opportunityName + " With " + variables.extractOpportunityName);
 throw new Error("fail");
 } else {
 console.log("=====> Retrieved Information Name Matches: (" + opportunityName + ") With  (" + variables.extractOpportunityName+ ')');
 }
 });
 resolve();
 });
 });

 }
 //a common search for campaign, contact, organization and opportunity
 exports.searchRecord = function (recordType,search) {
 describe("/api/search", function () {
 it("should look up the record Information and verify it is in cloud search", function () {
 var searchString = search;
 console.log("=====> Searching On Cloud, Record name : "+searchString);
 this.timeout(5000);
 requestBody = JSON.stringify({
 "recordTypes": ["contact", "provider", "organization", "case", "task", "memo", "opportunity", "campaign"],
 "params": {},
 "searchString": searchString,
 "sortField": "name",
 "size": 25,
 "index": 0,
 "messageType": "searchRequest"
 });
 return genericOperations.callRequest('/api/search', requestBody, "cloudSearch").then(function (response) {
 if (response.responses === null) {
 console.log("=====> Search results came back NULL");
 setTimeout(console.log("Wait 4 seconds"), 4000);
 return genericOperations.callRequest('/api/search', requestBody, "searchMemo").then(function (response) {
 console.log(response);
 });
 }
 var jsonPath = response.responses;
 var recExtractProviderName = '';
 var searchArrayValue = _.filter(jsonPath, function (searchObj) {
 //for campaign search
 if(recordType === 'campaign' && searchObj.type === recordType){
 if(searchObj.entity.id === variables.campaignId && searchObj.entity.name === variables.campaignAddName){
 console.log("=====> Retrieved "+recordType+" Information Name Matches: (" + searchObj.entity.name + ") With (" + variables.campaignAddName+ ')');
 }else{
 console.log("=====> Retrieved "+recordType+" Information DID NOT Match: " + searchObj.entity.name + " With " + variables.campaignAddName);
 throw new Error("fail");
 }
 }
 //for contact search
 if(recordType === 'contact' && searchObj.type === recordType){
 if (searchObj.fullName === variables.contactFullname) {
 console.log("=====> Retrieved "+recordType+" Information Name Matches: (" + searchObj.entity.name + ") With (" + variables.extractContactName+ ')');
 }else{
 console.log("=====> Retrieved "+recordType+" Information DID NOT Match: " + searchObj.entity.name + " With " + variables.extractContactName);
 throw new Error("fail");
 }
 }

 //for organization search
 if(recordType === 'organization' && searchObj.type === recordType){
 if(searchObj.entity.id === variables.extractOrgId && searchObj.entity.name === variables.extractOrgName){
 console.log("=====> Retrieved "+recordType+" Information Name Matches: (" + searchObj.entity.name + ") With (" + variables.extractOrgName+ ')');
 }else{
 console.log("=====> Retrieved "+recordType+" Information DID NOT Match: " + searchObj.entity.name + " With " + variables.extractOrgName);
 throw new Error("fail");
 }
 }

 //for opportunity search
 if(recordType === 'opportunity' && searchObj.type === recordType){
 if(searchObj.entity.name === variables.extractOpportunityName){
 console.log("=====> Retrieved "+recordType+" Information Name Matches: (" + searchObj.entity.name + ") With (" + variables.extractOpportunityName+ ')');
 }else{
 console.log("=====> Retrieved "+recordType+" Information DID NOT Match: " + searchObj.entity.name + " With " + variables.extractOpportunityName);
 throw new Error("fail");
 }
 }
 });
 });
 resolve();
 });
 });

 }*/

exports.searchObject = function (parameter) {
    describe("OBJECT SEARCH FUNCTION", function () {
        var timeout = variables.initialTimeout + 10000, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should look up the object --> "+parameter+",  and verify it is in cloud search", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            var recordTypes = ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"];
            if (parameter === 'organization') {
                searchString = variables.extractOrgName.trim();
                recordTypes = ['organization'];
            } else if (parameter === 'contact') {
                var contactNames = variables.extractContactName.split(",");
                searchString = contactNames[0].trim(); //get the first name of contact
                recordTypes = ['contact'];
            } else if (parameter === 'provider') {
                searchString = variables.extractProviderName;
                recordTypes = ['provider'];
            } else if (parameter === 'case') {
                searchString = variables.extractCaseName.trim();
                recordTypes = ['case'];
            } else if (parameter === 'task') {
                searchString = variables.extractTaskName.trim();
                recordTypes = ['task'];
            } else if (parameter === 'memo') {
                searchString = variables.extractMemoName.trim();
                recordTypes = ['memo'];
            } else if (parameter === 'opportunity') {
                searchString = variables.extractOpportunityName.trim();
                recordTypes = ['opportunity'];
            } else if (parameter === 'campaign') {
                searchString = variables.campaignAddName.trim();
                recordTypes = ['campaign'];
            }
            requestBody = JSON.stringify({
                recordTypes: recordTypes,
                params: {},
                sortField: "name",
                size: 25,
                index: 0,
                searchString: searchString.trim(),
                messageType: "searchRequest"
            });
            return genericOperations.callRequest('/api/search', requestBody, "searchObject").then(function (response) {

                //Commenetd by INDUSA on 30/11/2016 as this is a retry call logic which is already applied using this.retries - START
                /*if (response.responses === null || response.responses === undefined) {
                    console.log("null search results came back");
                    setTimeout(console.log("Wait for 25 seconds"), 25000);
                    return genericOperations.callRequest('/api/search', requestBody, "searchObject").then(function (response) {
                        me.checkResponseData(response, parameter);
                    });
                }*/
                //Commenetd by INDUSA on 30/11/2016 as this is a retry call logic which is already applied using this.retries - END
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                isPassed = me.checkResponseData(response, parameter, caseName, retryCount, logfilename);
                if(isPassed){
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,parameter);
                }
            });
            resolve();
        });
    });
};

exports.checkResponseData = function (response, parameter, caseName, retryCount, logfilename) {
    var searchedFullName = {}, searchedEntityName = {};
    var jsonPath = response.responses;
    var key = '';
    var isPassed = false;
    var searchArrayValue = _.filter(jsonPath, function (searchObj) {
        key = searchObj.entity.entityType;

        if (parameter === 'provider' || parameter === 'contact') {
            searchedFullName[key] = searchObj.fullName;
        } else {
            searchedEntityName[key] = searchObj.entity.name;
        }
    });
    //check searched objects names
    switch (parameter) {
        case 'contact': {
            var contactFullName = variables.contactFirstName + " " + variables.contactMiddleName + " " + variables.contactLastName;
            if (searchedFullName[key] === contactFullName) {
                console.log("=====> Retrieved Contact Information Name Matches: (" + searchedFullName[key] + ") With  (" + contactFullName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved Contact Information DID NOT Match: (" + searchedFullName[key] + ") With (" + contactFullName + ")");
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Contact Information DID NOT Match: (" + searchedFullName[key] + ") With (" + contactFullName + ")",retryCount,logfilename);
                throw new Error("Fail Contact search");
            }
            break;
        }
        case 'provider': {
            if (searchedFullName[key] === variables.providerFullname) {
                console.log("=====> Retrieved Provider Information Name Matches: (" + searchedFullName[key] + ") With  (" + variables.providerFullname + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved Provider Information Name DID NOT Match: (" + searchedFullName[key] + ") With  (" + variables.providerFullname + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Provider Information Name DID NOT Match: (" + searchedFullName[key] + ") With  (" + variables.providerFullname + ")",retryCount,logfilename);
                throw new Error("Fail Provider search");
            }
            break;
        }
        case 'organization': {
            if (searchedEntityName[key] === variables.extractOrgName) {
                console.log("=====> Retrieved Organization Name matches: (" + searchedEntityName[key] + ") With (" + variables.extractOrgName + ")");
                isPassed = true;
            } else {
                console.log("=====> Retrieved Organization Information DID NOT Match: " + searchedEntityName[key] + " With " + variables.extractOrgName);
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Organization Information DID NOT Match: " + searchedEntityName[key] + " With " + variables.extractOrgName,retryCount,logfilename);
                throw new Error("Fail Organization search");
            }
            break;
        }
        case 'case': {
            if (searchedEntityName[key] === variables.extractCaseName) {
                console.log("=====> Retrieved Case Information Name Matches: (" + searchedEntityName[key] + ") With  (" + variables.extractCaseName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved Case Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractCaseName + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Case Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractCaseName + ")",retryCount,logfilename);
                throw new Error("Fail Case search");
            }
            break;
        }
        case 'task': {
            if (searchedEntityName[key] === variables.extractTaskName) {
                console.log("=====> Retrieved Task Information Name Matches: (" + searchedEntityName[key] + ") With  (" + variables.extractTaskName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved Task Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractTaskName + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Task Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractTaskName + ")",retryCount,logfilename);
                throw new Error("Fail Task search");
            }
            break;
        }
        case 'memo': {
            if (searchedEntityName[key] === variables.extractMemoName) {
                console.log("=====> Retrieved Memo Information Name Matches: (" + searchedEntityName[key] + ") With  (" + variables.extractMemoName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved Memo Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractMemoName + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved Memo Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractMemoName + ")",retryCount,logfilename);
                throw new Error("Fail Memo search");
            }
            break;
        }
        case 'opportunity': {
            if (searchedEntityName[key] === variables.extractOpportunityName) {
                console.log("=====> Retrieved opportunity Information Name Matches: (" + searchedEntityName[key] + ") With  (" + variables.extractOpportunityName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved opportunity Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractOpportunityName + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved opportunity Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.extractOpportunityName + ")",retryCount,logfilename);
                throw new Error("Fail Opportunity search");
            }
            break;
        }
        case 'campaign': {
            if (searchedEntityName[key] === variables.campaignAddName) {
                console.log("=====> Retrieved campaign Information Name Matches: (" + searchedEntityName[key] + ") With (" + variables.campaignAddName + ')');
                isPassed = true;
            } else {
                console.log("=====> Retrieved campaign Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.campaignAddName + ')');
                genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,parameter);
                genericOperations.writeLocalLogs(caseName,"Retrieved campaign Information Name DID NOT Match: (" + searchedEntityName[key] + ") With  (" + variables.campaignAddName + ")",retryCount,logfilename);
                throw new Error("Fail Campaign search");
            }
            break;
        }
    }
    return isPassed;
}

exports.searchAll = function () {
    for (var i = 0; i < variables.recordTypes.length; i++) {
        me.searchObject(variables.recordTypes[i]);
    }
}

exports.retrieveViewIdFromCustomList = function (requestor) {
    describe("/api/customlist/metadata", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        if (requestor === 'All') {
            for (var i = 0; i < variables.customListRequesters.length; i++) {
                me.retrieveViewIdFromCustomList(variables.customListRequesters[i]);
                console.log('Requester : ' + variables.customListRequesters[i]);
            }
        } else {
            afterEach(function () {
                retryCount += 1;
                timeout += variables.increaseTimeout;
                genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
            });
            it("should retrieve View ids for all objects", function () {
                this.retries(variables.retryNoOfTimes);
                this.timeout(timeout);
                requestBody = JSON.stringify({
                    messageType: "customListTypeMetadataRequest",
                    type: requestor
                });
                return genericOperations.callRequest('/api/customlist/metadata', requestBody, "retrieveCustomListMetadata_" + requestor).then(function (response) {
                    if(response.errorCode != 0){
                        genericOperations.writeLogs(variables.failedCasesCons,'search.retrieveViewId',retryCount,logfilename,requestor);
                        genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                    }
                    expect(response.errorCode).to.equal(0);
                    var jsonPath = response.views;
                    var viewIdArray = _.find(jsonPath, {
                        'name': 'All',
                    });
                    variables.viewIds[requestor] = viewIdArray.id;
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,'search.retrieveViewId',retryCount,logfilename,requestor);
                });
                resolve();
            });
        }
    });
};

