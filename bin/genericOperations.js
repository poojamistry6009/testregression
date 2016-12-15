/**
 * Created by INDUSA on 9/22/2016.
 */

require('mocha');
var _ = require('lodash');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var bluebird = require('bluebird');

var variables = require('./variables60.js');
var chai = require('chai');
var should = chai.should();
var expect = require('chai').expect;
var fs = require('fs');
var isLoggedOut = false;
var me = require('./genericOperations.js');
var logging = require('log4js');
var logfilename = 'genericOperations';

/*logging.configure({
    appenders: [
        {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: "[%r] [%[%5.5p%]] - %m%n"
            }
        }
         ,
        {
            type: "file",
            filename: variables.logFilePath+"console.log",
            category: [ 'console','console']
        }
    ],
    replaceConsole: false
});*/

exports.callRequest = function callRequest(defPath, requestJson, call) {
    var path = defPath;
    var body = requestJson;
    var url = variables.fullUrl + path;
    var options = {
        method: 'POST',
        url: url,
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    //console.log(options); //@NOTE: For debugging to see the request JSON
    return rp(options).then(function (body) {
        var response = JSON.parse(body);
        if (call == "login" && response.expired === false) {
            console.log("Successful " + call);
        } else {
            console.log("Call: " + call);
        };
        //console.log(response); //@NOTE: For debugging to see the response JSON
        return bluebird.resolve(response);
        /*@NOTE JC: This seems redundant. I believe this is already inside of a promise, so no need to create and return another promise
         Response: I need this to get the response back out of the function*/
    }).catch(function (err) {

        //Added By INDUSA 11/03/2016 : For Using in User Failed Logged Out Test Case - START
        if (call === "verifyLogout") {
            console.log("User already logged out");
            isLoggedOut = true;
            throw new Error(isLoggedOut);
        }
        //Added By INDUSA 11/03/2016 : For Using in User Failed Logged Out Test Case - END
        console.log("Post Failed " + err);
        if (call === "login") {
            console.log("Login failed, shutting down test.");
            //throw new Error("fail"); //@NOTE: this just failed the test but did not stop the test.
            process.exit(1); //@NOTE: exit the call if login doesn't work
        }
    });
}

//This Function returns value for specific element to get validated
var checkData = function (dataOfElement, hc1Object, element) {
    //Added By INDUSA 09/19/2016 - START

    //Condition to see if dataOfElement is Object or not.
    if (typeof dataOfElement !== "object") { //@FIXME: Manthan, I can't figure this out. I am trying to see if this is an object if not get the value, if so, get the value of .name and show that.
        if (dataOfElement !== null) {
            //console.log("=====> " + hc1Object + " object's element " + element + " is found with value : " + dataOfElement);
            return dataOfElement;
        } else {
            return ("=====> " + element + " is NOT Correct OR NULL in  " + hc1Object + " object ");
        }
    } else {
        var jsonData = JSON.stringify(dataOfElement);
        var parsedJSON = JSON.parse(jsonData);
        var elementValue = '';

        //For Determining IF JSON Data is Null Or Undefined
        if (parsedJSON === null || parsedJSON === undefined) {
            console.log('=====> Null OR undefined JSON Object Found ');
        } else {
            var arrayConstructor = [].constructor;
            var objectConstructor = {}.constructor;
            var dataConstructor = parsedJSON.constructor;

            //For Determining JSON Array
            if (dataConstructor === arrayConstructor) {

                for (var i = 0; i < parsedJSON.length; i++) {
                    console.log("=====> JSONArray Found : " + element);
                    elementValue = parsedJSON[i].name;
                }
            // For Determining JSON Object
            } else if (dataConstructor === objectConstructor) {
                console.log("=====> JSONObject Found : " + element);
                elementValue = parsedJSON.name;
            }
        }
        return elementValue;
    };
    //Added By INDUSA 09/19/2016 - END
};
exports.checkData = checkData;


//This Function validates Case Object
var validateCaseData = function (dataOfElement,hc1Object) {

    var loggedInUser = variables.userFirstName + " "+variables.userLastName;
    console.log('=====> Validating CASE  : validateCaseData ');

    //should.equal(actual,expected,message)
    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.caseActive, "caseActive value didn't match");
    should.equal(checkData(dataOfElement.category, hc1Object, "category"),variables.caseActivityCategory[1], "caseActivityCategory value didn't match");
    should.equal(checkData(dataOfElement.subject, hc1Object, "subject"),variables.caseSubject, "caseSubject value didn't match");
    should.equal(checkData(dataOfElement.subCategory, hc1Object, "subCategory"),variables.caseActivitySubCategory[1],"caseActivitySubCategory value didn't match");
    should.equal(checkData(dataOfElement.organization, hc1Object, "organization.name"),variables.orgName,"caseOrganizationId value didn't match");
    should.equal(checkData(dataOfElement.description, hc1Object, "description"),variables.caseDescription,"caseDescription value didn't match");
    should.equal(checkData(dataOfElement.number, hc1Object, "number"),variables.caseCaseNumber, "caseCaseNumber value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),loggedInUser, "createdUser.name value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),loggedInUser, "updatedUser.name value didn't match");
    should.equal(checkData(dataOfElement.priority, hc1Object, "priority.name"),variables.casePriorityName, "priority value didn't match");
    should.equal(checkData(dataOfElement.assignedTo, hc1Object, "assignedTo.name"),variables.userLastName+", "+variables.userFirstName, "assignedTo value didn't match");
    should.equal(checkData(dataOfElement.status, hc1Object, "status.name"),variables.caseActivityStatus, "status value didn't match");
    should.equal(checkData(dataOfElement.resolvedBy, hc1Object, "resolvedBy.name"),variables.caseResolvedBy, "resolvedBy value didn't match");
    should.equal(checkData(dataOfElement.correctiveAction, hc1Object, "correctiveAction"),variables.caseCorrectiveAction, "caseCorrectiveAction value didn't match");
    should.equal(checkData(dataOfElement.resolutionDescription, hc1Object, "resolutionDescription"),variables.caseResolution, "caseResolution value didn't match");
    should.equal(checkData(dataOfElement.rootCause, hc1Object, "rootCause"),variables.caseRootCause,"caseRootCause value didn't match");
    should.equal(checkData(dataOfElement.createdDate, hc1Object, "createdDate"),variables.caseCreatedDate,"createdDate value didn't match");
    should.equal(checkData(dataOfElement.date, hc1Object, "date"),variables.caseDate,"caseDate value didn't match");
    should.equal(checkData(dataOfElement.updatedDate, hc1Object, "updatedDate"),variables.caseUpdatedDate,"updatedDate value didn't match");
    should.equal(checkData(dataOfElement.resolvedDate, hc1Object, "resolvedDate"),variables.caseResolvedOn,"resolvedDate value didn't match");

};
exports.validateCaseData = validateCaseData;

//This Function validates Task Object
var validateTaskData = function (dataOfElement,hc1Object) {

    var loggedInUser = variables.userFirstName + " "+variables.userLastName;
    console.log('=====> Validating TASK  : validateTaskData ');

    //should.equal(actual,expected,message)
    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.taskActive, "taskActive value didn't match");
    should.equal(checkData(dataOfElement.subject, hc1Object, "subject"),variables.taskSubject, "taskSubject value didn't match");
    should.equal(checkData(dataOfElement.category, hc1Object, "category"),variables.taskActivityCategory[0], "taskActivityCategory value didn't match");
    should.equal(checkData(dataOfElement.subCategory, hc1Object, "subCategory"),variables.taskActivitySubCategory[0], "taskActivitySubCategory value didn't match");
    should.equal(checkData(dataOfElement.description, hc1Object, "description"),variables.taskDescription, "taskDescription value didn't match");
    should.equal(checkData(dataOfElement.organization, hc1Object, "organization.name"),variables.orgName, "organization value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),loggedInUser, "createdUser value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),loggedInUser, "updatedUser value didn't match");
    should.equal(checkData(dataOfElement.number, hc1Object, "number"),variables.taskCaseNumber, "number value didn't match");
    should.equal(checkData(dataOfElement.priority, hc1Object, "priority.name"),variables.taskPriorityName, "priority value didn't match");
    should.equal(checkData(dataOfElement.assignedTo, hc1Object, "assignedTo.name"),variables.taskAssignedToUser, "assignedTo value didn't match");
    should.equal(checkData(dataOfElement.status, hc1Object, "status.name"),variables.taskActivityStatus, "status value didn't match");
    should.equal(checkData(dataOfElement.date, hc1Object, "date"),variables.taskDate, "taskDate value didn't match");
    should.equal(checkData(dataOfElement.beginDate, hc1Object, "beginDate"),variables.taskBeginDate, "beginDate value didn't match");
    should.equal(checkData(dataOfElement.createdDate, hc1Object, "createdDate"),variables.taskCreatedDate, "createdDate value didn't match");
    should.equal(checkData(dataOfElement.updatedDate, hc1Object, "updatedDate"),variables.taskUpdatedDate, "updatedDate value didn't match");
    should.equal(checkData(dataOfElement.dueDate, hc1Object, "dueDate"),variables.taskDueDate, "dueDate value didn't match");
};
exports.validateTaskData = validateTaskData;

//This Function validates Memo Object
var validateMemoData = function (dataOfElement,hc1Object) {

    var loggedInUser = variables.userFirstName + " "+variables.userLastName;
    console.log('=====> Validating MEMO  : validateMemoData ');

    //should.equal(actual,expected,message)
    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.memoActive, "memoActive value didn't match");
    should.equal(checkData(dataOfElement.subject, hc1Object, "subject"),variables.memoSubject, "subject value didn't match");
    should.equal(checkData(dataOfElement.category, hc1Object, "category"),variables.memoActivityCategory[0], "category value didn't match");
    should.equal(checkData(dataOfElement.subCategory, hc1Object, "subCategory"),variables.memoActivitySubCategory[0], "subCategory value didn't match");
    should.equal(checkData(dataOfElement.organization, hc1Object, "organization.name"),variables.orgName, "organization value didn't match");
    should.equal(checkData(dataOfElement.description, hc1Object, "description"),variables.memoDescription, "description value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),loggedInUser, "createdUser value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),loggedInUser, "updatedUser value didn't match");
    should.equal(checkData(dataOfElement.number, hc1Object, "number"),variables.memoCaseNumber, "number value didn't match");
    should.equal(checkData(dataOfElement.date, hc1Object, "date"),variables.memoDate, "date value didn't match");
    should.equal(checkData(dataOfElement.beginDate, hc1Object, "beginDate"),variables.memoBeginDate, "beginDate value didn't match");
    should.equal(checkData(dataOfElement.createdDate, hc1Object, "createdDate"),variables.memoCreatedDate, "createdDate value didn't match");
    should.equal(checkData(dataOfElement.updatedDate, hc1Object, "updatedDate"),variables.memoUpdatedDate, "updatedDate value didn't match");

};
exports.validateMemoData = validateMemoData;


//This Function validates Patient Object
var validatePatientData = function (dataOfElement,hc1Object) {

    var loggedInUser = variables.userFirstName + " "+variables.userLastName;
    var salutationName = variables.patientSalutation+'.';

    console.log('=====> Validating Patient  : validatePatientData ');

    //should.equal(actual,expected,message)

    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.patientActive, "patientActive value didn't match");
    should.equal(checkData(dataOfElement.firstName, hc1Object, "firstName"),variables.patientFirstName, "firstName value didn't match");
    should.equal(checkData(dataOfElement.middleName, hc1Object, "middleName"),variables.patientMiddleName, "middleName value didn't match");
    should.equal(checkData(dataOfElement.lastName, hc1Object, "lastName"),variables.patientLastName, "lastName value didn't match");
    should.equal(checkData(dataOfElement.email, hc1Object, "email"),variables.patientEmail, "email value didn't match");
    should.equal(checkData(dataOfElement.salutation, hc1Object, "salutation.name"),salutationName, "salutation value didn't match");
    should.equal(checkData(dataOfElement.availableOrganizations, hc1Object, "availableOrganizations.name"),variables.orgName, "availableOrganizations value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),loggedInUser, "createdUser value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),loggedInUser, "updatedUser value didn't match");

};
exports.validatePatientData = validatePatientData;


//This Function validates Contact Object
var validateContactData = function (dataOfElement,hc1Object) {

    var loggedInUser = variables.userFirstName + " "+variables.userLastName;
    console.log('=====> Validating Contact  : validateContactData ');

    //should.equal(actual,expected,message)
    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.contactActive, "patientActive value didn't match");
    should.equal(checkData(dataOfElement.firstName, hc1Object, "firstName"),variables.contactFirstName, "firstName value didn't match");
    should.equal(checkData(dataOfElement.middleName, hc1Object, "middleName"),variables.contactMiddleName, "middleName value didn't match");
    should.equal(checkData(dataOfElement.lastName, hc1Object, "lastName"),variables.contactLastName, "lastName value didn't match");
    should.equal(checkData(dataOfElement.email, hc1Object, "email"),variables.contactEmail, "email value didn't match");
    should.equal(checkData(dataOfElement.createdDate, hc1Object, "createdDate"),variables.contactCreatedDate, "createdDate value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),loggedInUser, "createdUser value didn't match");
    should.equal(checkData(dataOfElement.updatedDate, hc1Object, "updatedDate"),variables.contactUpdatedDate, "updatedDate value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),loggedInUser, "updatedUser value didn't match");
    // should.equal(checkData(dataOfElement.availableOrganizations, hc1Object, "availableOrganizations.name"),variables.orgName, "organization value didn't match");

};
exports.validateContactData = validateContactData;


//This Function validates Opportunity Object
var validateOpportunityData = function (dataOfElement,hc1Object) {

    var currentUser = variables.userLastName+", "+variables.userFirstName;
    console.log('=====> Validating Opportunity  : validateOpportunityData ');

    //should.equal(actual,expected,message)
    should.equal(checkData(dataOfElement.active, hc1Object, "active"),variables.opportunityActive, "opportunityActive value didn't match");
    should.equal(checkData(dataOfElement.description, hc1Object, "description"),variables.opportunityDescription, "opportunityDescription value didn't match");
    should.equal(checkData(dataOfElement.organization, hc1Object, "organization.name"),variables.orgName, "organization value didn't match");
    should.equal(checkData(dataOfElement.salesRep, hc1Object, "salesRep.name"),currentUser, "salesRep value didn't match");
    should.equal(checkData(dataOfElement.salesTerritory, hc1Object, "salesTerritory.name"),variables.salesTerritoryName, "salesTerritory value didn't match");
    should.equal(checkData(dataOfElement.opportunityNumber, hc1Object, "opportunityNumber"),variables.extractOpportunityNumber, "opportunityNumber value didn't match");
    should.equal(checkData(dataOfElement.effectiveDate, hc1Object, "effectiveDate"),variables.opportunityEffectiveDate, "effectiveDate value didn't match");
    should.equal(checkData(dataOfElement.closeDate, hc1Object, "opportunityCloseDate"),variables.opportunityCloseDate, "opportunityCloseDate value didn't match");
    should.equal(checkData(dataOfElement.createdUser, hc1Object, "createdUser.name"),currentUser, "createdUser value didn't match");
    should.equal(checkData(dataOfElement.updatedUser, hc1Object, "updatedUser.name"),currentUser, "updatedUser value didn't match");

};
exports.validateOpportunityData = validateOpportunityData;


//This function validates new provider contact
var validateProviderData = function (dataOfElement,hc1Object){
    var currentUser = variables.userFirstName+" "+variables.userLastName;
    console.log('=====> Validating Contact  : validateProviderData ');
    should.equal(checkData(dataOfElement.id, hc1Object, "contact.id"),variables.providerId, "contact Id value didn't match");
    should.equal(checkData(dataOfElement.name, hc1Object, "contact.name"),variables.providerName, "contact name value didn't match");
    should.equal(checkData(dataOfElement.createdUser.name, hc1Object, "contact.createdUser.name"),currentUser, "Created user name value didn't match");
    should.equal(checkData(dataOfElement.updatedUser.name, hc1Object, "contact.updatedUser.name"),currentUser, "Updated user name value didn't match");
    should.equal(checkData(dataOfElement.createdUser.email, hc1Object, "contact.createdUser.email"),variables.userEmail, "User email value didn't match");
    should.equal(checkData(dataOfElement.availableOrganizations, hc1Object, "availableOrganizations.name"),variables.extractOrgName, "Organization name value didn't match");
};
exports.validateProviderData = validateProviderData;


//This function validates new Patient info
var validateCampaignData = function (dataOfElement,hc1Object){
    var currentUser = variables.userFirstName+" "+variables.userLastName;
    console.log('=====> Validating Campaign Info  : validateCampaignData');
    should.equal(checkData(dataOfElement.name, hc1Object, "campaign.name"),variables.campaignAddName, "campaign name value didn't match");
    should.equal(checkData(dataOfElement.active, hc1Object, "campaign.active"),true, "Campaign active value didn't match");
    should.equal(checkData(dataOfElement.targetType, hc1Object, "campaign.targetType"),variables.campaignTargetType, "Campaign number didn't match");
    should.equal(checkData(dataOfElement.campaignNo, hc1Object, "campaign.campaignNo"),variables.campaignNo, "Campaign number didn't match");
    should.equal(checkData(dataOfElement.campaignType.name, hc1Object, "campaign.campaignType.name"),variables.campaignTypeNames[0], "Campaign number didn't match");
    should.equal(checkData(dataOfElement.campaignNo, hc1Object, "campaign.campaignNo"),variables.campaignNo, "Campaign number didn't match");
    should.equal(checkData(dataOfElement.createdUser.name, hc1Object, "campaign.createdUser.name"),variables.username, "Campaign created user didn't match with existing one");
    should.equal(checkData(dataOfElement.createdUser.email, hc1Object, "campaign.createdUser.email"),variables.userEmail, "Campaign created user mail id didn't match with existing one");
    should.equal(checkData(dataOfElement.updatedUser.name, hc1Object, "campaign.updatedUser.name"),variables.username, "Campaign updated user name value didn't match with existing user");
    should.equal(checkData(dataOfElement.updatedUser.email, hc1Object, "campaign.updatedUser.email"),variables.userEmail, "Campaign updatedUser user mail id didn't match with existing one");
};
exports.validateCampaignData = validateCampaignData;


//This Function validates Objects stored inside Calendar
var validateCalendarData = function (event) {
    console.log('=====> Validating Calendar Data  : validateCalendarData ');
    var recExtractId = event.detailUrl.split("/");
    var recExtractEventDetails = event.name.split(" | ");
    var objectType = event.primaryRelatedItemType;
    console.log('objectType : ' + objectType);
    var recExtractObjectId = recExtractId[recExtractId.length - 1];
    var recExtractObjectSubject = recExtractEventDetails[0];
    var recExtractObjectOrg = recExtractEventDetails[recExtractEventDetails.length - 1]
    console.log('------------------------------------------------------------------------------')
    //TODO : @Eric, Currently we are just searching Task Object from calendar response let us know if any other objects need to be added
    if (objectType === 'Task') {

        console.log('=====> Task Object Found In Calendar With Below Details');
        console.log('=====> Task Id : ' + recExtractObjectId);
        console.log('=====> Task Subject : ' + recExtractObjectSubject);
        console.log('=====> Org Name : ' + recExtractObjectOrg);

        if (recExtractObjectSubject != undefined && recExtractObjectId != undefined) {
            //should.equal(actual,expected,message)
            should.equal(recExtractObjectId, variables.extractTaskId, "Task Id didn't match in Calendar");
            should.equal(recExtractObjectId, variables.extractTaskSubject, "Task Subject didn't match in Calendar");
            should.equal(recExtractObjectId, variables.extractOrgName, "Task Organization didn't match in Calendar");
        }
    }
    console.log('------------------------------------------------------------------------------')
};
exports.validateCalendarData = validateCalendarData;


//This Function validates Data returned after  Initializing Session
//TODO : Eric, in below logic ill require your help for getting me the .json file for session data of user if possible for comparing our file with returned .json file (if we can have .json file for user this will make this very simple)
var validateSessionData = function (sessionData) {
    console.log('=====> Validating Session Data  : validateSessionData ');

    var jsonData = JSON.stringify(sessionData);
    fs.writeFileSync('sessionData.json',jsonData);//This Creates .json file for storing data returned from session call
    fs.writeFileSync('sessionDataToMatch.json',jsonData);// Currently above file and this refers to same data so if we can have this file already stored in our system this will help

    var data = require('./sessionData.json');
    var newData = require('./sessionDataToMatch.json');

    expect( data).to.deep.equal( newData ); // To compare data stored in both files

    /*
     //Below Code is a sample code which updates 1 file to compare the difference is fond and case is working
     var obj = require('./sessionNewData.json');
     obj.user.name = 'Changed Name';
     fs.writeFile('sessionNewData.json', JSON.stringify(obj), function (err) {
     console.log(err);
     });

     var data = require('./sessionData.json');
     var newData = require('./sessionNewData.json');
     */


    console.log('------------------------------------------------------------------------------')
};
exports.validateSessionData = validateSessionData;

//This function validates new Organization info
var validateOrganizationData = function (dataOfElement,hc1Object){
    var currentUser = variables.userFirstName+" "+variables.userLastName;
    console.log('=====> Validating Organization Info  : validateOrganizationData');
    should.equal(checkData(dataOfElement.name, hc1Object, "organization.name"),variables.extractOrgName, "organization name value didn't match");
    should.equal(checkData(dataOfElement.description, hc1Object, "organization.description"),variables.orgDescription, "organization description value didn't match");
    should.equal(checkData(dataOfElement.mailing.city, hc1Object, "organization.mailing.city"),variables.mailingAddressCity, "organization mailing city didn't match");
    should.equal(checkData(dataOfElement.mailing.state, hc1Object, "organization.mailing.state"),variables.mailingAddressState, "organization mailing state didn't match");
    should.equal(checkData(dataOfElement.createdUser.name, hc1Object, "organization.createdUser.name"),currentUser, "organization created user didn't match with existing one");
    should.equal(checkData(dataOfElement.createdUser.firstName, hc1Object, "organization.createdUser.firstName"),variables.userFirstName, "organization created user first name didn't match with existing one");
    should.equal(checkData(dataOfElement.createdUser.lastName, hc1Object, "organization.createdUser.lastName"),variables.userLastName, "organization created user last name didn't match with existing one");
    should.equal(checkData(dataOfElement.createdUser.email, hc1Object, "organization.createdUser.email"),variables.userEmail, "organization created user mail id didn't match with existing one");
    should.equal(checkData(dataOfElement.updatedUser.name, hc1Object, "organization.updatedUser.name"),variables.username, "organization updated user name value didn't match with existing user");
    should.equal(checkData(dataOfElement.updatedUser.email, hc1Object, "organization.updatedUser.email"),variables.userEmail, "organization updatedUser user mail id didn't match with existing one");
    should.equal(checkData(dataOfElement.updatedUser.firstName, hc1Object, "organization.updatedUser.firstName"),variables.userFirstName, "organization updated user first name didn't match with existing one");
    should.equal(checkData(dataOfElement.updatedUser.lastName, hc1Object, "organization.updatedUser.lastName"),variables.userLastName, "organization updated user last name didn't match with existing one");
};
exports.validateOrganizationData = validateOrganizationData;

//This function prints the retry logs for the test cases
exports.printRetryLog = function (retryCount, timeout, isPassed, currentCase) {
    if(retryCount <= variables.retryNoOfTimes && isPassed === false){
        console.info('\n\n\n------------------------------------------------------------------------------------------------');
        console.info('=====> RETRYING CASE '+currentCase.currentTest.fullTitle()+' ... '+retryCount+' time with timeout : '+timeout);
        console.info('------------------------------------------------------------------------------------------------\n\n\n');
    }
}


//This function clears the data that is generated by the test cases
exports.clearAllData = function () {
    var len = variables.entitiesToClear.length;
    for (var i = 0; i < variables.entitiesToClear.length; i++) {
        me.clearRecord(variables.entitiesToClear[i]);
    }
}

//This function is the implementation of the above functionality
var clearRecord = function (entityType) {
    describe("Clear record function", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            me.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should clear " + entityType + " record from system", function () {
                this.retries(variables.retryNoOfTimes);
                this.timeout(timeout);
                var entityId = '', executeClear = false, isdifferentRequest = false, newRequestBody = '', url = '/api/entity/activate';
                switch (entityType) {
                    case 'Organization': {
                        if(variables.extractOrgId != ''){
                            entityId = variables.extractOrgId;
                            entityType = "Organization";
                            executeClear = true;
                        }else{
                            console.log('=====> Organization Id not found ! Organization was not retrieved !');
                        }
                        break;
                    }
                    case 'Case': {
                        if(variables.extractCaseId != ''){
                            entityId = variables.extractCaseId;
                            entityType = "Activity";
                            executeClear = true;
                        }
                        else{
                            console.log('=====> Case Id not found ! Case was not retrieved !');
                        }
                        break;
                    }
                    case 'Task': {
                        if(variables.extractCaseId != ''){
                            entityId = variables.extractTaskId;
                            entityType = "Activity";
                            executeClear = true;
                        }else{
                            console.log('=====> Task Id not found ! Task was not retrieved !');
                        }
                        break;
                    }
                    case 'Memo': {
                        if(variables.extractMemoId != ''){
                            entityId = variables.extractMemoId;
                            entityType = "Activity";
                            executeClear = true;
                        }else{
                            console.log('=====> Memo Id not found ! Memo was not retrieved !');
                        }
                        break;
                    }
                    case 'Campaign': {
                        if(variables.extractCampaignId != ''){
                            entityId = variables.extractCampaignId;
                            entityType = "Campaign";
                            executeClear = true;
                        }else{
                            console.log('=====> Campaign Id not found ! Campaign was not retrieved !');
                        }
                        break;
                    }
                    case 'Contact': {
                        if(variables.extractContactId != ''){
                            entityId = variables.extractContactId;
                            entityType = "Contact";
                            executeClear = true;
                        }else{
                            console.log('=====> Contact Id not found ! Contact was not retrieved !');
                        }
                        break;
                    }
                    case 'Provider': {
                        if(variables.extractProviderId != ''){
                            entityId = variables.extractContactId;
                            entityType = "Contact";
                            executeClear = true;
                        }else{
                            console.log('=====> Provider Id not found ! Provider was not retrieved !');
                        }
                        break;
                    }
                    case 'Opportunity': {
                        if(variables.extractOpportunityId != ''){
                            entityId = variables.extractOpportunityId;
                            entityType = "Opportunity";
                            executeClear = true;
                        }else{
                            console.log('=====> Opportunity Id not found ! Opportunity was not retrieved !');
                        }
                        break;
                    }
                    case 'Message': {
                        if(variables.extractMessageId != ''){
                            entityId = variables.extractMessageId;
                            entityType = "Message";
                            executeClear = true;
                        }else{
                            console.log('=====> Message Id not found ! Message was not received !');
                        }
                        break;
                    }
                    case 'AccessControlTree' : {
                        if(variables.extractTreeID != ''){
                            entityId = variables.extractTreeID;
                            entityType = "AccessControlTree";
                            executeClear = true;
                        }else{
                            console.log('=====> AccessControlTree Id not found ! AccessControlTree was not received !');
                        }
                        break;
                    }
                    case 'Workflowtemplate' : {
                        if(variables.extractTemplateId != ''){
                            newRequestBody = JSON.stringify({
                                "groupId" : variables.extractTemplateId,
                                "messageType" : "workflowTemplateDeleteRequest"
                            });
                            url = '/api/admin/rulesengine/templates/delete';
                            isdifferentRequest = true;
                            executeClear = true;
                        }else{
                            console.log('=====> Workflowtemplate Id not found ! Workflowtemplate was not received !');
                        }
                        break;
                    }
                }
                var requestBody = '';
                if(executeClear){   // if created entity is found with extracted id, then delete it
                    if(isdifferentRequest){ //different delete request for workflowtemplate
                        requestBody = newRequestBody;
                    }else{
                        requestBody = JSON.stringify({
                            "entities": [{
                                "id": entityId,
                                "name": null,
                                "entityType": entityType
                            }],
                            "active": false,
                            "messageType": "entityActivateRequest"
                        });
                    }
                    return me.callRequest(url, requestBody, "clear "+entityType+" record").then(function (response) {
                        console.log(response);
                        if(response.errorCode != 0){
                            genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename,entityType);
                            genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                        }else{
                            isPassed = true;
                            console.log('=====> Successfully removed '+entityType+' from the system !');
                            genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename,entityType);
                        }
                        expect(response.errorCode).to.equal(0);
                    });
                }
                resolve();
            }
        );
    });
}
exports.clearRecord = clearRecord;

var initializeGlobalLogger = function () {
       /* if(fs.existsSync(variables.logFilePath+variables.executionResultFileName)){
            fs.writeFile(variables.logFilePath+variables.executionResultFileName, '', function (err,data) {
                if (err) {
                    return console.log(err);
                }
            });
        }*/
    logging.clearAppenders();
    logging.loadAppender('file');
    logging.addAppender(logging.appenders.file(variables.logFilePath+variables.executionResultFileName), 'results');
    var logger = logging.getLogger("results");
    variables.logger = logger;
}
exports.initializeGlobalLogger = initializeGlobalLogger;

var initializeSpecificLogger = function (testcase) {
    /*if(fs.existsSync(variables.logFilePath+testcase+'.txt')){
        fs.writeFile(variables.logFilePath+testcase+'.txt', '', function (err,data) {
            if (err) {
                return console.log(err);
            }
        });
    }*/
    logging.addAppender(logging.appenders.file(variables.logFilePath+testcase+'.txt'), testcase);
    var locallogger = logging.getLogger(testcase);
    return locallogger;
}
exports.initializeSpecificLogger = initializeSpecificLogger;


var writeLogs = function(result,functionName,retryCount,logFileName,extraParameter){
    if(result === variables.failedCasesCons){    //failed cases
        if(retryCount > 0){
            if(extraParameter != undefined){
                variables.logger.error('RETRIED CASE FAILED '+retryCount+' time : '+functionName+' -> '+extraParameter+'='+logFileName+'.txt');
            }else{
                variables.logger.error('RETRIED CASE FAILED '+retryCount+' time : '+functionName+' ='+logFileName+'.txt');
            }
        }else{
            if(extraParameter != undefined){
                variables.logger.error('CASE FAILED : '+functionName+' -> '+extraParameter+'='+logFileName+'.txt');
            }else{
                variables.logger.error('CASE FAILED : '+functionName+' = '+logFileName+'.txt');
            }
        }
    }else{  //passed cases
        if(extraParameter != undefined){
            variables.logger.info('CASE PASSED : '+functionName+' -> '+extraParameter);
        }else{
            variables.logger.info('CASE PASSED : '+functionName);
        }
    }

}
exports.writeLogs = writeLogs;

var writeLocalLogs = function (functionName,toWrite,retryCount,logFileName) {
    var localLogger = '';
    if(retryCount === variables.retryNoOfTimes){
        if(localLogger == '' || localLogger == undefined){
            localLogger = me.initializeSpecificLogger(logFileName);
        }
        localLogger.error(functionName+' : \t'+JSON.stringify(toWrite));
    }
}
exports.writeLocalLogs = writeLocalLogs;

var writeValidationLogs = function (oldValue,newValue,functionName,logFileName) {
    var localLogger = '';
    if(oldValue != newValue){
        if(localLogger == '' || localLogger == undefined){
            localLogger = me.initializeSpecificLogger(logFileName);
        }
        localLogger.error(oldValue+" doesn't match "+newValue);

    }
}
exports.writeValidationLogs = writeValidationLogs;


/*var writeLogs = function () {
    describe("",function () {
        /!*if(fs.existsSync(variables.logFilePath+variables.executionResultFileName)){
            fs.writeFile(variables.logFilePath+variables.executionResultFileName, '', function (err,data) {
                if (err) {
                    return console.log(err);
                }
            });
        }*!/
        it("should write passed cases logs",function () {
            var results = logging.getLogger("results");
            variables.passedCases = variables.passedCases.filter(function(elem, pos) {
                return variables.passedCases.indexOf(elem) == pos;
            });
            for(var i=0;i < variables.passedCases.length;i++){
                results.info('CASE PASSED =====> '+variables.passedCases[i]);
            }
        });

    });
}
exports.writeLogs = writeLogs;

var writeFailedLogs = function(){
    describe("",function () {
        it("should write failed cases logs",function () {
            var results = logging.getLogger("results");
            variables.failedCases = variables.failedCases.filter(function(elem, pos) {
                return variables.failedCases.indexOf(elem) == pos;
            });
            for(var j=0;j < variables.failedCases.length;j++){
                var temp = variables.failedCases[j].split("=");
                results.error('CASE FAILED =====> '+temp[0]+' : '+temp[1]);
            }
        });
    });
}
exports.writeFailedLogs = writeFailedLogs;*/

/*var writeCompleteLogs = function () {
    describe("",function () {
       it("write logs to a file",function () {
            var logger = logging.getLogger("results");
            for(var i=0;i<variables.passedCases.length;i++){
                console.log('>>>>>passed>>>> '+variables.passedCases[i]);
                logger.info('>>>>>passed>>>> '+variables.passedCases[i]);
            }
            for(var i=0;i<variables.failedCases.length;i++){
                console.log('>>>>failed>>>>> '+variables.failedCases[i]);
                logger.info('>>>>failed>>>>> '+variables.failedCases[i]);
            }
       });
    });
}
exports.writeCompleteLogs = writeCompleteLogs;*/
