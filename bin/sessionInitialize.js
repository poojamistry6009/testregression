/**
 * Created by INDUSA on 9/22/2016.
 */

require('mocha');
var expect = require('chai').expect;
var bluebird = require('bluebird');

var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');
var requestBody, userId, userEmail;
var logfilename = 'sessionInitialize',locallogger = '';

exports.init = function () {
    describe("/api/session/initialize", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = 'sessionInitialize.init';
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should do the session init", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                messageType: "sessionInitializeRequest"
            });
            return genericOperations.callRequest('/api/session/initialize', requestBody, "initialize").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                userId = response.user.id;
                variables.userTypeId = response.user.userTypeId;
                variables.userLastName = response.user.lastName;
                variables.userFirstName = response.user.firstName;
                variables.userCreatedDate = response.user.createDates;
                userEmail = response.user.email;
                variables.userRoles = response.user.roles;
                variables.userProperties = response.user.properties;
                variables.availRoles = response.user.availableRoles;
                variables.userbiRole = response.user.biRole;
                variables.isUserSalesRep = response.user.salesRep;
                variables.isUserLocked = response.user.locked;
                variables.isUserOutOfOffice = response.user.outOfOffice;
                variables.availableBIRoles = response.user.availableBIRoles;
                variables.availableUserTypes = response.user.availableUserTypes;
                variables.accessControlNodes = response.user.accessControlNodes;
                variables.globalAccessControlNodes = response.user.globalAccessControlNodes;
                variables.adminAssignedProfile = response.user.adminAssignedProfile;
                variables.availableNotificationSettings = response.user.availableNotificationSettings;
                variables.availableTwoFactorTypes = response.user.availableTwoFactorTypes;
                variables.availableProfiles = response.user.availableProfiles;
                variables. relatedProviders = response.user.relatedProviders;
                variables.relatedOrganizations = response.user.relatedOrganizations;
                variables.userRelatedItems = response.user.relatedItems;
                variables.calendarExportUrl = response.user.calendarExportUrl;
                variables.userId = userId;
                variables.relName = variables.userLastName + ", " + variables.userFirstName + " " + userEmail;
                variables.username = variables.userFirstName+" "+variables.userLastName;
                variables.userLastName = variables.userLastName;
                variables.userFirstName = variables.userFirstName;
                variables.userEmail = userEmail;
                variables.salesRepId = userId;
                variables.salesRepName = variables.userFirstName+' '+variables.userLastName;
                variables.salesRepOrigName = variables.relName;
                //console.log('=====> userId & Name : '+ variables.userId+' , '+variables.relName);
                //TODO : Eric, Please go through this below function
                genericOperations.validateSessionData(response);// For Validating Session Data
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });

}
