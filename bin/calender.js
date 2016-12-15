/**
 * Created by INDUSA on 10/17/2016.
 */
require('mocha');
var fs = require('fs');
var expect = require('chai').expect;
var _ = require('lodash');

var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var requestBody;

exports.retrieveAndcheckObject = function (type,fetchOld) {
    describe("/api/commcenter/calendar/list", function () {
        it("should check the object existence in calender events list", function () {
            this.timeout(5000);
            requestBody = JSON.stringify(
                {
                    "startDate": "2016-10-01T00:00:00.000Z",
                    "endDate": "2016-11-01T00:00:00.000Z",
                    "appointmentFilter": "",
                    "outOfOfficeFilter": null,
                    "opportunityFilter": "",
                    "caseFilter": null,
                    "taskFilter": "Self",
                    "memoFilter": null,
                    "campaignFilter": null,
                    "actionType": "apply",
                    "messageType": ""
                }
            );
            return genericOperations.callRequest('/api/commcenter/calendar/list', requestBody, "retrieveCalenderEvents").then(function (response) {
                var fetchedObjectId ;
                var fetchedObjectName ;
                var newCalenderEvents = new Array();
                var objectArr = _.find(response.events, function (eventObj) {
                    var idsplits = eventObj.detailUrl.split("/");
                    var namesplits = eventObj.name.split(" | ");
                    if(type === 'task'){
                        if(idsplits[idsplits.length-1] === variables.extractTaskId && namesplits[0] === variables.extractTaskName){
                            fetchedObjectId = idsplits[idsplits.length-1];
                            fetchedObjectName = namesplits[0];
                        }
                    }else if ( (type === '' || type === undefined) && fetchOld === true){
                        variables.oldCalenderEvents.push(eventObj);
                    }
                    else if ( (type === '' || type === undefined) && fetchOld === false){
                        variables.newCalenderEvents.push(eventObj);
                    }
                });
                if(fetchedObjectName != undefined && fetchedObjectId != undefined){
                    console.log("=====> Task matched with calender event task ID : "+fetchedObjectId+" , name : "+fetchedObjectName);
                }
            });
            resolve();
        });
    });

}