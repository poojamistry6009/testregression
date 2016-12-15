/**
 * Created by INDUSA on 11/22/2016.
 */
require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');
var variables = require('./variables60.js');
var genericOperations = require('./genericOperations.js');

exports.customListResults = function(requesttype) {
    var requestViewId, responses;
    var criteriaFields = [];

    describe("/api/customlist/results - Org Activities CustomList", function () {
        if (requesttype === 'organization') {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'+requesttype);
            requestViewId = variables.viewIds['OrganizationActivities']
            criteriaFields = [{
                fieldId: "org.id",
                operator: "EQ",
                values: [variables.extractOrgId]
            }];
        }
        it("should retrieve Organization Activities customlist", function () {
            this.timeout(5000);
            //var activityObj = '';
            requestBody = JSON.stringify({
                type: "OrganizationActivities",
                index: 0,
                size: 10,
                viewId: requestViewId,
                sortFields: [],
                displayFields: [{
                    fieldId: "org.id",
                    displayName: "Organization"
                }, {
                    fieldId: "className",
                    displayName: "Type"
                }, {
                    fieldId: "subject",
                    displayName: "Subject"
                }, {
                    fieldId: "fillInDate",
                    displayName: "Order Date"
                }, {
                    fieldId: "dueDate",
                    displayName: "Due Date"
                }, {
                    fieldId: "status",
                    displayName: "Status"
                }, {
                    fieldId: "priority",
                    displayName: "Priority"
                }],
                criteriaFields: criteriaFields,
                messageType: "customListResultRequest"
            });
            return genericOperations.callRequest('/api/customlist/results', requestBody, "customlistOrganizationActivities").then(function (response) {
                expect(response.errorCode).to.equal(0);
                responses = response;
                resolve();
            });
        });
    });
    return responses;
}

