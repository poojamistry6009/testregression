/**
 * Created by poojam on 10/7/2016.
 */

require('mocha');

var fs = require('fs');
var variables = require('../variables60.js');
var userAuth = require('../userAuthentication.js');
var session = require('../sessionInitialize.js');
var interfaceOperations = require('../interfaces.js');
var notificationOperations = require('../notification.js');
var accessControlOperations = require('../accessControl.js');
var hrmEntityOperations = require('../hrmEntity.js');
var orgOperations = require('../organization.js');
var caseOperations = require('../case.js');
var taskOperations = require('../task.js');
var memoOperations = require('../memo.js');
var campaignOperations = require('../campaign.js');
var contactOperations = require('../contact.js');
var searchOperations = require('../search');

var tosearch = "Test";
var orgidsearched;
describe("TEST FLOW FOR HC1.COM",function (){
    userAuth.login();               //login to the system
    variables.extractOrgId = "27176349121602746715765136482";
    variables.extractOrgName = "Test Organization";
    orgOperations.retrieve();
});


