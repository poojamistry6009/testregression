/**
 * Created by INDUSA on 10/10/2016.
 */
require('mocha');
var fs = require('fs');
var moment = require('moment');
var retry = require('bluebird-retry');
var userAuth = require('../userAuthentication.js');
var session = require('../sessionInitialize.js');
var hrmEntityOperations = require('../hrmEntity.js');
var caseOperations = require('../case.js');
var taskOperations = require('../task.js');
var searchOperations = require('../search.js');
var variables = require('../variables60.js');
var genericOperations = require('../genericOperations.js');
var contactOperations = require('../contact.js');
var orgOperations = require('../organization.js');
var accessControlOperations = require('../accessControl.js');
var memoOperations = require('../memo.js');
var notificationOperations = require('../notification.js');
var calendarOperations = require('../calender.js');
var interfaceOperations = require('../interfaces.js');
var campaignOperations = require('../campaign.js');
var patientOperations = require('../patient.js');
var opportunityOperations =  require('../opportunity.js');
var messageOperations = require('../message.js');
var templateOperations = require('../workflowtemplate.js');
var request = require('request').defaults({
    jar: true
});
var rp = require('request-promise').defaults({
    jar: true
});
var me = require('./show.js');



/*exports.retryCompleteCycle = function () {
    var retriedCount = 0, timeout = 5000;
    describe("HC1 retry tests", function () {

        //test function to retry failed test cases for the complete cycle
        afterEach(function () {
            if (variables.retryOn && variables.executedAll && retriedCount <= variables.retryNoOfTimes) {
                console.log('\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RETRY FAILED CASES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                var len = variables.failedCases.length;
                if(len === 0){
                    console.log('No Failed cases exists in the array !');
                }
                for(var i = 0;i < variables.retryNoOfTimes;i++) {
                    for (var index = 0; index < len; index++) {
                            (variables.failedCases[index])(timeout);
                    }
                    timeout = timeout + 1000;
                }
                retriedCount = retriedCount + 1;
            }
        });

        userAuth.login();

        session.init();

        hrmEntityOperations.fillAllVariables();

        searchOperations.retrieveViewIdFromCustomList('All');

        taskOperations.save(timeout);
    });
}*/


exports.login = function () {
    var username = "abc", pwd = "abc", retriedCount = 0 ,timeout = 3000;
    var retryCounter = 0;
    describe("/auth/login", function () {
        afterEach(function () {
            retryCounter += 1;
            timeout = timeout + 1000;
            if(retryCounter === 1){
                username = variables.username;
                pwd = variables.password;
            }
            if(retryCounter <= variables.retryNoOfTimes)
                console.log('CASE FAILED ... RETRYING ... '+retryCounter+' time with timeout : '+timeout);

        });
        var requestBody = JSON.stringify({
            username: username,
            password: pwd
        });
        it('sample test', function (done) {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            //expect(3).to.equal(0);
            /*   return new Promi
             // throw new Error("Failed");

             return true;*/
            return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
                if (response === undefined || response === "") {
                    //caseFailed = true;
                    console.log("=====> can't login");
                    return new Error('Invalid credentials. Can\'t login !');
                }
            });
            resolve();
        });
        /*it("should login with no error", function () {
         this.retries(5);
         this.timeout(5000);
         console.log('TRYING TO LOGIN WITH USERNAME : '+username+' AND PASSWORD :'+pwd);
         return genericOperations.callRequest('/auth/login', requestBody, "login").then(function (response) {
         if (response === undefined || response === "") {
         //caseFailed = true;
         console.log("=====> can't login");
         return new Error('Invalid credentials. Can\'t login !');
         }
         });
         resolve();
         });*/
    });
}
exports.checkContactOperations = function () {
    describe("",function () {
            userAuth.login();
            session.init();
            hrmEntityOperations.fillAllVariables(); //For getting all the static variables of the system
            searchOperations.retrieveViewIdFromCustomList('All');
            contactOperations.save('Contact');
            contactOperations.retrieve('Contact');
            contactOperations.save('Provider');
            contactOperations.retrieve('Provider');
    });
}


exports.example = function () {
    describe("",function () {
        //userAuth.login();
        /*session.init();
        hrmEntityOperations.fillAllVariables();  //not yet implemented
        searchOperations.retrieveViewIdFromCustomList('All');    //not yet implemented
        accessControlOperations.accessControllTreeResults();
        accessControlOperations.uacTreeRetrieve();
        orgOperations.save();

        //this case will fail as case cannot be retrieved before its creation
        caseOperations.caseRetrieve();*/

        /*hrmEntityOperations.fillAllVariables();  //not yet implemented
        searchOperations.retrieveViewIdFromCustomList('All');    //not yet implemented*/
        //accessControlOperations.save();
        userAuth.checkFailedLogOut();

    });
}
var logging = require('log4js');
/*logging.configure({
    appenders: [
        {
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
        }*!/
 {
 "type" : "logLevelFilter", // This is a recursive appender,
 // filters log messages and
 // sends them to its own appender.

 "level" : "ERROR", // Include only error logs.

 "appender" : { // the filter's appender, smtp
 "type" : "smtp",
 "recipients" : "you@example.com",
 "sender" : "sender@serverhost.com",
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
});*/
exports.loggerExample = function (){
    describe("",function () {
        it("",function () {
                //logging.addAppender(logging.consoleAppender());
                logging.loadAppender('file');
                logging.addAppender(logging.appenders.file(variables.logFilePath+'testlogger.log'), 'testcat');
                var log = logging.getLogger("testcat");
                log.error("ERROR : THESE ARE TEST MESSAGES");
                log.debug("DEBUG : THIS IS DEBUG MESSAGE");
                log.trace("TRACE : THIS IS TRACE MESSAGE");
        });
    });
}

describe('MAIN',function(){
    //me.retryCompleteCycle();    //retry the failed cases after complete cycle for define no of times
    //me.login();               //retry single case immediately after it fails for define no of times
    //me.checkContactOperations();    //check contact operations
   //me.example();
    me.loggerExample();
});