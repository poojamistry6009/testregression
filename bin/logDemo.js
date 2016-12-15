/**
 * Created by poojam on 12/7/2016.
 */

require('mocha');
var fs = require('fs');
var moment = require('moment');
var retry = require('bluebird-retry');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});

var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var userAuth = require('./userAuthentication.js');
var session = require('./sessionInitialize.js');
var interfaceOperations = require('./interfaces.js');
var notificationOperations = require('./notification.js');
var accessControlOperations = require('./accessControl.js');
var hrmEntityOperations = require('./hrmEntity.js');
var orgOperations = require('./organization.js');
var caseOperations = require('./case.js');
var taskOperations = require('./task.js');
var memoOperations = require('./memo.js');
var campaignOperations = require('./campaign.js');
var contactOperations = require('./contact.js');
var opportunityOperations = require('./opportunity.js');
var searchOperations = require('./search.js');
var patientOperations = require('./patient.js');
var calendarOperations = require('./calendar.js');
var providerOperations = require('./provider.js');
var messageOperations = require('./message.js');
var templateOperations = require('./workflowtemplate.js');
var genericOperations = require('./genericOperations.js');
var me = require('./logDemo.js');
var logging = require('log4js');
logging.configure({
    appenders: [
        /*{
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: "[%r] [%[%5.5p%]] - %m%n"
            }
        }
        /!* ,
        {
            type: "file",
            filename: "cheese.log",
            category: [ 'cheese','console' ]
        }*!/*/
        {
            "type" : "logLevelFilter", // This is a recursive appender,
            // filters log messages and
            // sends them to its own appender.
            "level" : "ERROR", // Include only error logs.

            "appender" : { // the filter's appender, smtp
                "type" : "smtp",
                "recipients" : "pooja.mistry@indusa.com",
                "sender" : "pooja.mistry@indusa.com",
                "sendInterval" : 60, // Batch log messages, and send via
                // this interval in seconds (0 sends
                // immediately, unbatched).
                "transport" : "SMTP",
                "SMTP" : {
                    "host" : "localhost", // Other SMTP options here.
                    "port" : 25
                }
            }
        }
    ],
    replaceConsole: false
});

exports.loggerExample = function (){
    describe("",function () {
        it("",function () {
            //logging.addAppender(logging.consoleAppender());
            logging.loadAppender('file');
            logging.addAppender(logging.appenders.file(variables.logFilePath+'testlogger.log'), 'testcat');
            var log = logging.getLogger("testcat");
            log.error("ERROR : THESE ARE TEST ERROR MESSAGES");
            log.debug("DEBUG : THIS IS DEBUG MESSAGE");
            log.trace("TRACE : THIS IS TRACE MESSAGE");
        });
    });
}





describe("",function () {
    //me.loggerExample();
    //genericOperations.initializeGlobalLogger();   //for initializing variables.logger

    /*userAuth.login(); //For Login Call
    session.init();
    orgOperations.save();
    orgOperations.retrieve();*/
    genericOperations.initializeGlobalLogger();
    userAuth.login();
    session.init();
    //hrmEntityOperations.fillAllVariables();
    //searchOperations.retrieveViewIdFromCustomList('All');// For Retrieving All ViewIds form custom lists
    //interfaceOperations.interfaceSettingsList(); //For retrieving interface settings and get the hc1Test interface info
    //notificationOperations.customListResultResults(); //For retrieving notification custom list
    //accessControlOperations.accessControllTreeResults(); //For retrieving HRM AccessControl  custom list
    //accessControlOperations.uacTreeRetrieve(); //For retrieving UACTreeRetrieve
    //orgOperations.save(); //For Saving Organization
    //orgOperations.retrieve(); //For Retrieving Organization Data and Check Name
    //orgOperations.orgActivitiesCustomList(); //For Retrieving Custom List Of Organization Activities
    //caseOperations.caseRetrieve(); //For Retrieving New Case and Match Name
    //taskOperations.taskRetrieve(); //For Retrieving New Task and Match Name
    //memoOperations.memoRetrieve(); //For Retrieving New Memo and Match Name
    //orgOperations.retrieveAndValidateMailingAddressCity(); //For Retrieving Organization Data and validate Mailing Address City
    //campaignOperations.campaignCustomList(); //For Retrieving Custom List Of Campaign
    //contactOperations.save(variables.contactTypes[0]); //For Saving Contact
    //contactOperations.save(variables.contactTypes[1]); //For Saving Contact
    //contactOperations.retrieve(variables.contactTypes[0]); //For Retrieving Contact and Check Name
    //contactOperations.retrieve(variables.contactTypes[1]); //For Retrieving Contact and Check Name
    //campaignOperations.save(); //For creating a Campaign
    //campaignOperations.saveCampaignMsgTemplate(); //For creating a message template to send to audiences
    //campaignOperations.retrieve(); //For retrieving campaign
    //campaignOperations.campaignAudienceAssociate(); //For Associating Contact to Campaign
    //campaignOperations.sendMsgToAudiences(); //For sending message to campaign audiences
    //orgOperations.orgUpdate(); //For Updating Organization

    //caseOperations.save(); //For Creating Case
    //notificationOperations.findObjectInNotificationList(variables.objectToFindFromNotification[0]); //For retrieving the saved 'Case' object in the notifications list
    //taskOperations.save(); //For Creating Task
    //memoOperations.save(); //For Creating Memo
    //opportunityOperations.save(); //For Creating Opportunity
    //opportunityOperations.retrieve(); //For Retrieving Opportunity Data and Check Name
    //patientOperations.save(); //For Creating Patient
    //patientOperations.retrieve(); //For Retrieving Patient and Check Name
    //templateOperations.save();  //For creating a Workflow Template
    //messageOperations.sendMessage(); //For sending a message from one user to another (currently we are having same sender and same receiver user)
    //messageOperations.checkMessageReceiveList(); //For verifying the message that we have sent exists in the received messages list page
    //messageOperations.checkMessageSentList(); //For verifying the message that we have sent exists in the sent messages list page
    //userAuth.checkFailedLogin(); // For Checking incorrect login functionality
    //accessControlOperations.save(); //For saving a new Access Control Tree
    //accessControlOperations.retrieveRootNodeFromTree(); //For retrieving tree root node id and name
    //accessControlOperations.saveChildNode(); //For saving a child to the access control tree
    //accessControlOperations.addUserToNode(); //For adding a user to the access control tree node
    //accessControlOperations.addOrganizationToNode(); //For adding an organization to the access control tree node
    //calendarOperations.readAndValidateCalendarData(); //For Retrieving Calendar Entries to match with stored objects
    //searchOperations.searchAll(); //For searching all the objects "contact", "provider", "organization", "caze", "task", "memo", "opportunity" and "campaign"

    genericOperations.clearAllData();   //For clearing all entity records from the system
    userAuth.checkFailedLogOut(); // For Checking logout functionality is working correctly
    userAuth.logout(); //For LogOut Call
});


