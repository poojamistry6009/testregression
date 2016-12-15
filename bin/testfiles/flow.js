/**
 * Created by INDUSA on 10/10/2016.
 */
require('mocha');
var fs = require('fs');
var Promise = require('bluebird');
var retry = require('retry-bluebird');
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
var opportunityOperations = require('../opportunity.js');
var searchOperations = require('../search.js');
var patientOperations = require('../patient.js');
var calendarOperations = require('../calendar.js');
var providerOperations = require('../provider.js');
var messageOperations = require('../message.js');
var templateOperations = require('../workflowtemplate.js');
var variables = require('../variables60.js');
var logger = require('../logger.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});

/*describe("CALL TEST",function () {
 it("", function () {
 auth.login();
 session.init();
 hrmentity.fillAllVariables();
 accessControl.accessControllTreeMetadata();
 accessControl.accessControllTreeResults();
 accessControl.uacTreeRetrieve();
 organization.save();
 task.save();

 //hrmentity.getSpecialty('Lab');

 /!*accessControl.accessControllTreeMetadata();
 accessControl.accessControllTreeResults();
 accessControl.uacTreeRetrieve();
 hrmentity.hrmEntityRetrieve();
 organization.save();
 patient.save();
 patient.retrieve();*!/

 /!*var cfg = {
 timeout: 10,
 // WARNING: -i 2 may not work in other platform like window
 extra: ["-i 2"],
 };
 var ping = require('ping');
 var host = 'http://google.com';
 ping.promise.probe(host)
 .then(function (res) {
 console.log(res);
 });*!/





 /!*var hosts = ['google.com', 'yahoo.com'];
 hosts.forEach(function(host){
 ping.sys.probe(host, function(isAlive){
 var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> '+msg);
 });
 });*!/

 /!*  var sys = require('sys')
 var exec = require('child_process').exec;
 function puts(error, stdout, stderr) { sys.puts(stdout) }
 exec("ping -c 3 localhost", puts);*!/

 /!*var url = require("url");
 var result = url.parse('https://test.in');
 console.log(result);
 var validator = require('validator');
 console.log('>>>>>>>>>>>>>> IS URL VALID >>>>>>>>>>>>>>>>> '+validator.isURL('https://test.in'));
 var urll = 'https://test.in';*!/
 /!*var options = {
 method: 'POST',
 url: urll,
 rejectUnauthorized: false,
 headers: {
 'Content-Type': 'application/json'
 },
 body: ''
 };
 return rp(options).then(function (body) {
 console.log('>>>>>>>>>>>> inside ...function call..'+body);
 }).catch(function (err) {
 console.log('>>>>>>>>>>>> inside ...catch.function..'+err);
 });*!/

 });
 });*/

describe("HC1", function () {

    logger.initializeGlobalLogger();
    userAuth.login();
    session.init();

    //userAuth.checkFailedLogin();
    /*hrmEntityOperations.fillAllVariables(); //For getting all the static variables of the system
    searchOperations.retrieveViewIdFromCustomList('All');

    contactOperations.save('Contact');
    contactOperations.retrieve('Contact');

    contactOperations.save('Provider');
    contactOperations.retrieve('Provider');*/

    //original calls
    //contactOperations.save();
    //providerOperations.save();






    /*accessControlOperations.save(); //For saving a new Access Control Tree
    accessControlOperations.retrieveRootNodeFromTree(); //For retrieving tree root node id and name
    accessControlOperations.saveChildNode(); //For saving a child to the access control tree
    accessControlOperations.addObjectToNode('organization');
    accessControlOperations.addObjectToNode('user');*/
    //accessControlOperations.addUserToNode(); //For adding a user to the access control tree node
    //accessControlOperations.addOrganizationToNode(); //For adding an organization to the access control tree node



    /*searchOperations.retrieveViewIdFromCustomList('All');
    accessControlOperations.accessControllTreeResults();
    accessControlOperations.uacTreeRetrieve();
    orgOperations.save();
    orgOperations.orgActivitiesCustomList();
    caseOperations.save();
    caseOperations.caseRetrieve();
    searchOperations.searchAll();*/
    //notificationOperations.findObjectInNotificationList(variables.objectToFindInNotificationList); //For retrieving the saved 'Case' object in the notifications list


    //it("", function () {

    /*userAuth.login(); //For Login Call

    session.init(); //For Initializing User Session

    hrmEntityOperations.fillAllVariables(); //For getting all the static variables of the system

    orgOperations.orgActivitiesCustomListMetadata();

    orgOperations.orgActivitiesCustomList();

    accessControlOperations.accessControllTreeMetadata();

    accessControlOperations.accessControllTreeResults();

    accessControlOperations.uacTreeRetrieve();

    orgOperations.save();

    caseOperations.save();

    caseOperations.caseRetrieve();

    userAuth.logout();*/


    /* interfaceOperations.interfaceSettingsList(); //For retrieving interface settings and get the hc1Test interface info

     notificationOperations.notificationCustomListMetadata(); //For Retrieving ViewId for notification custom list

     notificationOperations.customListResultResults(); //For retrieving notification custom list

     //accessControlOperations.accessControllTreeMetadata(); //For retrieving ViewId for HRM AccessControl  custom list
     */
//accessControlOperations.accessControllTreeResults(); //For retrieving HRM AccessControl  custom list

    /*hrmEntityOperations.fillAllVariables(); //For getting all the static variables of the system

     contactOperations.save();

     providerOperations.save();*/

    /*     interfaceOperations.interfaceSettingsList(); //For retrieving interface settings and get the hc1Test interface info

     notificationOperations.notificationCustomListMetadata(); //For Retrieving ViewId for notification custom list

     notificationOperations.customListResultResults(); //For retrieving notification custom list*/

    /*  accessControlOperations.accessControllTreeMetadata(); //For retrieving ViewId for HRM AccessControl  custom list

     accessControlOperations.accessControllTreeResults(); //For retrieving HRM AccessControl  custom list

     accessControlOperations.uacTreeRetrieve(); //For retrieving UACTreeRetrieve*/

//hrmEntityOperations.hrmEntityRetrieve(); //For retrieving specific HRM Entity

    /*   hrmEntityOperations.getSpecialty('Lab'); //For retrieving specific HRM Entity

     orgOperations.save(); //For Saving Organization

     caseOperations.save();

     taskOperations.save();

     memoOperations.save();

     opportunityOperations.save();

     campaignOperations.save();*/


    /*     orgOperations.retrieve(); //For Retrieving Organization Data and Check Name

     orgOperations.orgActivitiesCustomListMetadata(); //For Retrieving ViewId For Custom List Of Organization Activities

     orgOperations.orgActivitiesCustomList(); //For Retrieving Custom List Of Organization Activities


     searchOperations.searchObject(variables.recordTypes[0]);   //search call for contact

     searchOperations.searchObject(variables.recordTypes[1]);   //search call for provider

     searchOperations.searchObject(variables.recordTypes[2]);   //search call for organization

     searchOperations.searchObject(variables.recordTypes[3]);   //search call for case

     searchOperations.searchObject(variables.recordTypes[4]);   //search call for task

     searchOperations.searchObject(variables.recordTypes[5]);   //search call for memo

     searchOperations.searchObject(variables.recordTypes[6]);   //search call for opportunity

     searchOperations.searchObject(variables.recordTypes[7]);   //search call for campaign*/


    /* searchOperations.searchObject(variables.recordTypes[0]);   //search call for contact         //contact firstname as search string doesn't searches the contact even on UI

     searchOperations.searchObject(variables.recordTypes[1]);   //search call for provider          //searches on UI, but not here empty responses

     searchOperations.searchObject(variables.recordTypes[2]);   //search call for organization      //searches perfect

     searchOperations.searchObject(variables.recordTypes[3]);   //search call for case              //searches on UI, but not here empty responses

     searchOperations.searchObject(variables.recordTypes[4]);   //search call for task              //searches on UI, but not here empty responses

     searchOperations.searchObject(variables.recordTypes[5]);   //search call for memo              //searches on UI, but not here empty responses

     searchOperations.searchObject(variables.recordTypes[6]);   //search call for opportunity

     searchOperations.searchObject(variables.recordTypes[7]);   //search call for campaign*/


//exports.recordTypes = ["contact", "provider", "organization", "caze", "task", "memo", "opportunity", "campaign"];

    /*accessControl.accessControllTreeMetadata();
     accessControl.accessControllTreeResults();
     accessControl.uacTreeRetrieve();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     campaign.save();
     campaign.retrieve();*/


    /*campaign.save();
     campaign.retrieve();*/

    /*accessControl.accessControllTreeMetadata();
     accessControl.accessControllTreeResults();
     accessControl.uacTreeRetrieve();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     opportunity.save();*/


    /*organization.save();
     opportunity.save();*/
    /*organization.save();
     campaign.save();
     campaign.retrieve();
     contact.save();
     campaign.saveCampaignMsgTemplate();
     campaign.campaignAudienceAssociate();*/


//template.save();

    /*!//access control tree operations
     auth.login();
     session.init();
     organization.save();
     organization.retrieve();
     accessControl.accessControllTreeMetadata();
     accessControl.accessControllTreeResults();
     accessControl.save();
     accessControl.retrieveRootNodeFromTree();
     accessControl.saveChildNode();
     accessControl.addUserToNode();
     accessControl.addOrganizationToNode();*/

//for savign a tree and adding a child node to it
    /* accessControl.accessControllTreeMetadata();
     accessControl.accessControllTreeResults();
     accessControl.uacTreeRetrieve();
     accessControl.save();
     accessControl.retrieveSpecificTree();
     accessControl.saveChildNode();*/


    /*accessControl.saveChild();
     accessControl.retrieveTreeChild();*/


    /* auth.login();
     session.init();
     campaign.save();
     search.searchRecord('campaign',variables.campaignaddname); //For searching Campaign on cloud*/

    /*        auth.login();
     session.init();
     organization.save();
     casee.save();
     notification.notificationCustomListMetadata();
     notification.findObjectInNotificationList('Case');*/

    /* //sent messages test case
     auth.login();
     session.init();
     msg.messageCustomListMetadata();
     msg.sendMessage();
     msg.checkMessageReceiveList();
     msg.checkMessageSentList();*/

//notifications list page test case
    /*auth.login();
     session.init();
     organization.save();
     casee.save();
     notification.notificationCustomListMetadata();
     notification.customListResultResults();
     notification.findObjectInNotificationList('Case',variables.extractCaseName);*/

    /*!//send a message test case
     auth.login();
     session.init();
     msg.messageCustomListMetadata();
     msg.sendMessage();
     msg.checkMessageList();*/


    /*organization.save();
     notification.notificationCustomListMetadata();
     notification.customListResultResults();
     notification.findObjectInNotificationList('Case',variables.extractCaseName);*/


    /*!//send a message to campaigna audiences
     auth.login();
     session.init();
     organization.orgActivitiesCustomListMetadata();
     campaign.save();
     campaign.saveCampaignMsgTemplate();
     campaign.sendMsgToAudiences();
     auth.logout();*/

//opportunity save ,retrive and search
    /*auth.login();
     session.init();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     organization.retrieve();
     opportunity.save();
     opportunity.retrieve();
     search.opportunityDataSearch();*/

//Provider test flow
    /* auth.login();
     session.init();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     organization.retrieve();
     provider.save();
     provider.retrieve();
     search.contactDataSearch('provider');*/


    /* /!*!//Patient test flow
     auth.login();
     session.init();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     organization.retrieve();
     patient.save();
     patient.retrieve();*/

    /*!//tempalte create test flow
     auth.login();
     session.init();
     hrmentity.hrmEntityRetrieve();
     organization.save();
     organization.retrieve();
     template.save();*/


//campaigns test flow
    /*auth.login();                           //login to the system
     session.init();                         //initialize session variables
     campaign.save();                        //create campaign
     campaign.retrieve();                    //retrieve and validate campaign info
     search.searchRecord('campaign',variables.campaignName);*/


    /*!//calender test
     auth.login();
     session.init();
     calender.retrieveAndcheckObject('',true);
     hrmentity.hrmEntityRetrieve();
     organization.save();
     organization.retrieve();
     organization.orgActivitiesCustomListMetadata();
     organization.orgActivitiesCustomList();
     task.save();
     task.taskRetrieve();
     calender.retrieveAndcheckObject('task');
     calender.retrieveAndcheckObject('',false);
     calender.compareOldAndNewEvents();*!/

     auth.login();
     session.init();
     //  interface.interfaceSettingsList();          error

     variables.extractCampaignId = '27235317865276891406298092605';
     variables.extractContactId = '27243293757799037983257791120';
     campaign.campaignAudienceAssociate();*/
//});
});
