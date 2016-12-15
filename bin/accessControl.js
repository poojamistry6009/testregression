/**
 * Created by INDUSA on 9/27/2016.
 */


require('mocha');
var expect = require('chai').expect;
var _ = require('lodash');

var genericOperations = require('./genericOperations.js');
var variables = require('./variables60.js');
var viewId, requestBody, extractUACTreeId, extractUACTreeName, extractNodeId, extractNodeName, entityType = 'AccessControlTreee';
var logfilename = 'accessControl';
/*
exports.accessControllTreeMetadata = function () {
    describe("/api/customlist/metadata AccessControlTree ViewId", function () {
        it("should retrieve AccessControlTree customlist viewId for use in /api/customlist/results ", function () {
            this.timeout(5000);
            requestBody = JSON.stringify({
                messageType: "customListTypeMetadataRequest",
                type: "AccessControlTree"
            });
            return genericOperations.callRequest('/api/customlist/metadata', requestBody, "customlistMetadataAccessControlTree").then(function (response) {
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.views;
                var viewIdArray = _.find(jsonPath, {
                    'name': 'All',
                });
                viewId = viewIdArray.id;
            });
            resolve();
        });
    });
};
*/

exports.accessControllTreeResults = function () {
    describe("/api/customlist/results AccessControlTree CustomList", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+'-'+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve notification customlist for AccessControlTree", function () {
            this.retries(variables.retryNoOfTimes);     //this will retry the case defined times, if it fails
            this.timeout(timeout);
            requestBody = JSON.stringify({
                type: "AccessControlTree",
                index: 0,
                size: 10,
                viewId: variables.viewIds['AccessControlTree'],
                // viewId: viewId,
                sortFields: [],
                displayFields: [{
                    fieldId: "name",
                    displayName: "Name"
                }, {
                    fieldId: "description",
                    displayName: "Description"
                }, {
                    fieldId: "salesTerritory",
                    displayName: "Sales Territory"
                }, {
                    fieldId: "readOnly",
                    displayName: "Read Only"
                }, {
                    fieldId: "clone",
                    displayName: "Clone"
                }],
                criteriaFields: [],
                messageType: "customListResultRequest"
            });
            return genericOperations.callRequest('/api/customlist/results', requestBody, "customlistResultsAccessControlTree").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var jsonPath = response.results;
                var uACTreeArrayValue = _.find(jsonPath, function (uacTreeObj) {
                    //@NOTE: May need to narrow down the if statement on this to include Sales East or a specific Node that has the specific user
                    if (uacTreeObj.resultData.salesTerritory === true && uacTreeObj.resultData.active == 'true') {
                        extractUACTreeId = uacTreeObj.id;
                        extractUACTreeName = uacTreeObj.resultData.name;
                    }
                });
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

exports.uacTreeRetrieve = function () {
    describe("/api/admin/uac/tree/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve UACTreeRetrieve", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                id: extractUACTreeId,
                messageType: "retrieveAccessControlTreeRequest"
            });
            return genericOperations.callRequest('/api/admin/uac/tree/retrieve', requestBody, "retrieveAccessControlTreeRequest").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                extractNodeId = response.tree.rootNode.id;
                extractNodeName = response.tree.rootNode.name;
                variables.salesTerritoryId = extractNodeId;
                variables.salesTerritoryName = extractNodeName;
                isPassed = true;
                genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
            });
            resolve();
        });
    });
};

//For saving a access control tree
exports.save = function () {
    describe("/api/admin/uac/tree/save", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should create a new tree", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                "tree": {
                    "id": "",
                    "name": variables.treeName,
                    "description": variables.treeDescription,
                    "salesTerritory": false,
                    "readOnly": false,
                    "node": null,
                    "users": [],
                    "organizations": [],
                    "totalUserSize": 0,
                    "totalOrgSize": 0,
                    "active": true,
                    "entityType": entityType,
                    "relatedItems": [],
                    "rootNode": null
                },
                "messageType": "saveAccessControlTreeRequest"
            });
            return genericOperations.callRequest('/api/admin/uac/tree/save', requestBody, "createAccessControlTree").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.extractTreeID = response.tree.id;
                console.log('=====> Access control tree with id : '+variables.extractTreeID+', name : '+variables.treeName+' created successfully !');
            });
            resolve();
        });
    });
};

//For creating a child node under access control tree
exports.saveChildNode = function () {
    describe("/api/admin/uac/node/child/add", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should create a new child node for the tree", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                "tree": {
                    "id": variables.extractTreeID,
                    "name": variables.extractTreeName,
                    "description": variables.extractTreeDesc,
                    "salesTerritory": true,
                    "readOnly": false,
                    "node": {
                        "name": variables.treeChildNodeName,
                        "description": variables.treeChildNodeDescription,
                        "parentId": variables.treeRootNodeId,
                        "id": null,
                        "treeId": ""
                    },
                    "users": [],
                    "organizations": [],
                    "totalUserSize": 0,
                    "totalOrgSize": 0,
                    "active": true,
                    "entityType": entityType,
                    "relatedItems": [],
                    "rootNode": {
                        "id": variables.treeRootNodeId,
                        "name": variables.treeRootNodeName,
                        "active": true,
                        "entityType": "AccessControlNode",
                        "relatedItems": [],
                        "parentId": "",
                        "description": "",
                        "children": []
                    }
                },
                "node": {
                    "name": variables.treeChildNodeName,
                    "description": variables.treeChildNodeDescription,
                    "parentId": variables.treeRootNodeId,
                    "id": null,
                    "treeId": ""
                },
                "messageType": "addAccessControlNodeChildRequest"
            });
            return genericOperations.callRequest('/api/admin/uac/node/child/add', requestBody, "createAccessControlTreeChildNode").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                var parentTreeId = response.tree.id;
                var searchArrayValue = _.filter(response.tree.rootNode.children, function (searchObj) {
                    variables.extracttreeChildNodeId = searchObj.id;
                });
                if(variables.extracttreeChildNodeId != undefined || variables.extracttreeChildNodeId != ""){
                    console.log('=====> Child Node with id : '+variables.extracttreeChildNodeId+', name : '+variables.treeChildNodeName+' created successfully under tree with id : '+parentTreeId);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};

//For retrieving newly saved access control tree
exports.retrieveRootNodeFromTree = function () {
    describe("/api/admin/uac/tree/retrieve", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should retrieve access control tree information", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                "id":variables.extractTreeID,
                "messageType":"retrieveAccessControlTreeRequest"
            });
            return genericOperations.callRequest('/api/admin/uac/tree/retrieve', requestBody, "retrieveAccessControlTree").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }else{
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                variables.treeRootNodeId = response.tree.rootNode.id;
                variables.treeRootNodeName = response.tree.rootNode.name;
            });
            resolve();
        });
    });
};

//For adding a user to the node
exports.addUserToNode = function () {
    describe("/api/admin/uac/node/user/add", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should add a user to the tree node", function () {
                this.retries(variables.retryNoOfTimes);
                this.timeout(5000);
                requestBody = JSON.stringify({
                    "nodeId": variables.extracttreeChildNodeId,
                    "userId": variables.userId,
                    "pagingIndex": 0,
                    "pagingMax": 10,
                    "sort": [],
                    "isSalesRep": null,
                    "messageType": "addAccessControlNodeUserRequest"
                });
                return genericOperations.callRequest('/api/admin/uac/node/user/add', requestBody, "addUserToNode").then(function (response) {
                    if(response.errorCode != 0){
                        genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                        genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                    }
                    expect(response.errorCode).to.equal(0);
                    if(response.errorCode === 0) {
                        console.log('=====> Successfully added user, named : '+variables.username+' to the tree node with id : '+variables.extracttreeChildNodeId);
                        isPassed = true;
                        genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                    }
                });
                resolve();
            });
    });
};

//For adding an organization to the node
exports.addOrganizationToNode = function () {
    describe("/api/admin/uac/node/organization/add", function () {
        var timeout = variables.initialTimeout, retryCount = 0, isPassed = false, caseName = logfilename+"-"+this.title;
        afterEach(function () {
            retryCount += 1;
            timeout += variables.increaseTimeout;
            genericOperations.printRetryLog(retryCount,timeout,isPassed,this);
        });
        it("should add an organization to the tree node", function () {
            this.retries(variables.retryNoOfTimes);
            this.timeout(timeout);
            requestBody = JSON.stringify({
                "nodeId": variables.extracttreeChildNodeId,
                "organizationId": variables.extractOrgId,
                "pagingIndex": 0,
                "pagingMax": 10,
                "sort": [],
                "messageType": "addAccessControlNodeOrganizationRequest"
            });
            return genericOperations.callRequest('/api/admin/uac/node/organization/add', requestBody, "addOrganizationToNode").then(function (response) {
                if(response.errorCode != 0){
                    genericOperations.writeLogs(variables.failedCasesCons,caseName,retryCount,logfilename);
                    genericOperations.writeLocalLogs(caseName,response,retryCount,logfilename);
                }
                expect(response.errorCode).to.equal(0);
                if(response.errorCode === 0) {
                    console.log('=====> Successfully added organization, named : '+variables.extractOrgName+' to the tree node with id : '+variables.extracttreeChildNodeId);
                    isPassed = true;
                    genericOperations.writeLogs(variables.passedCasesCons,caseName,retryCount,logfilename);
                }
            });
            resolve();
        });
    });
};
