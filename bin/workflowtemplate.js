/**
 * Created by INDUSA on 10/13/2016.
 */
/**
 * Created by INDUSA on 10/4/2016.
 */

require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');

var activityId, requestBody = '';
var logfilename = 'workflowtemplate';

exports.save = function () {

    //This Test Case Creates New Workflow template
    describe("/api/admin/rulesengine/templates/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should Create a New Workflow Template", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify(
                {
                    "workflowTemplate": {
                        "id": null,
                        "groupId": null,
                        "objectType": "Case",
                        "name": variables.templateName,
                        "description": variables.templateDescription,
                        "template": "[{\"fieldName\":\"assignedToUser\",\"value\":[\""+variables.userId+"\"]},{\"fieldName\":\"beginDate\",\"value\":[7,\""+variables.templateCaseBeginDate+"\"]},{\"fieldName\":\"activityCategory\",\"value\":[\""+variables.activityCategoriesIds[0]+"\"]},{\"fieldName\":\"date\",\"value\":[7,\""+variables.templateCaseDate+"\"]},{\"fieldName\":\"description\",\"value\":[\""+variables.templateCaseDescription+"\"]},{\"fieldName\":\"organization\",\"value\":[\""+variables.extractOrgId+"\"]},{\"fieldName\":\"priority\",\"value\":[\""+variables.templateCasePriority+"\"]},{\"fieldName\":\"resolvedBy\",\"value\":[\""+variables.templateCaseResolvedBy+"\"]},{\"fieldName\":\"activityStatus\",\"value\":[\""+variables.activityStatusIds[0]+"\"]},{\"fieldName\":\"activitySubCategory\",\"value\":[\""+variables.activitySubCategoriesIds[0]+"\"]},{\"fieldName\":\"subject\",\"value\":[\" "+variables.templateCaseSubject+" \"]},{\"fieldName\":\"resolvedOn\",\"value\":[7,\""+variables.templateCaseResolvedOn+"\"]},{\"fieldName\":\"resolution\",\"value\":[\""+variables.templateCaseResolvedOn+"\"]}]",
                        "active": true,
                        "version": null,
                        "createdStamp": null,
                        "modifiedStamp": null,
                        "createdBy": null,
                        "modifiedBy": null
                    },
                    "messageType": "workflowTemplateSaveRequest"
                }
            )
            return genericOperations.callRequest('/api/admin/rulesengine/templates/save', requestBody, "createWorkflowTemplate").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractTemplateId = response.workflowTemplate.id;
                variables.extractTemplateName = response.workflowTemplate.name;
                if (variables.extractTemplateId !== "") {
                    console.log("=====> Workflow Template Created : " + variables.extractTemplateId +' , name : '+variables.extractTemplateName);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                } else {
                    console.log("=====> Some Error(s) While Creating a new Template ......");
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,"Some Error(s) While Creating a new Template ......",retryCount,logfilename);
                }
            });
            resolve();

        });


    });

};