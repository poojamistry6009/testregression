/**
 * variables.js
 * @desc: setting information for JSON calls
 * @options: none
 * @returns: user defined variables
 */
var moment = require('moment');
var environment = 'test';
var url;
var exports;
switch (environment) {
    case "test":
        exports.url = 'engr.hc1test.com';
        exports.apiToken = 'a1fcbb8a-17ef-43fe-94a0-7ef5b11c999f';
        exports.hcAppsURL = 'test.hc1apps.com/healthcheck';
        exports.hcwebApiURL = 'wa.' + url + '/healthcheck';
        //exports.tenantId = 'erictest1';//Commented By INDUSA 09/15/2016
        exports.tenantId = 'indusa';////Added By INDUSA 09/15/2016
        exports.campaignName = 'Add a person to a campaign';
        break;
    case "wtaza":
        exports.url = 'wtaza.hc1test.com';
        exports.apiToken = '5b773eef-b2b8-4107-a44a-3fca57298310';
        exports.healthcheckURL = 'wtaza.hc1apps.com/healthcheck';
        exports.hcwebApiURL = 'wa.' + url + '/healthcheck';
        break;
    default: //test
        exports.url = 'engr.hc1test.com';
        exports.apiToken = 'a1fcbb8a-17ef-43fe-94a0-7ef5b11c999f';
        exports.healthcheckURL = 'test.hc1apps.com/healthcheck';
        exports.hcwebApiURL = 'wa.' + url + '/healthcheck';
        exports.campaignName = 'QACheckout - Campaign';
        exports.tenantId = 'qacheckout';
};

//Commented By INDUSA 09/15/2016 - START
//exports.username = 'echreist@hc1.com';
//exports.password = 'Testing123$';
//Commented By INDUSA 09/15/2016 - END

//Added By INDUSA 09/15/2016 - START
exports.username = 'manthan.buch@indusa.com';
//exports.username = 'xyz';
exports.password = 'Indusa@4';
/*exports.username ='ahesanali.vijapura@indusa.com';
exports.password = 'Test@1234';*/
//Added By INDUSA 09/15/2016 - END

exports.base = 'https://';
exports.fullUrl = this.base + this.tenantId + '.' + this.url;

//Added By INDUSA 10/20/2016 - START
exports.biBaseUrl = this.base + this.tenantId +".bi."+this.url;
//Added By INDUSA 10/20/2016 - END

exports.contentType = 'application/json; charset=utf-8';
exports.accept = 'application/json, text/javascript, */*; q=0.01';
exports.apiTokenHead = '"X-HC1-API-TOKEN"';
exports.sessionIdHead = '"X-HC1-SESSIONID"';

exports.fieldTypes = {}; //key-value map for datatypes of fields
var date = moment(new Date());
var startDateCalendar =  moment(new Date()).subtract(7, 'days');
var endDateCalendar =  moment(new Date()).add(2, 'days');

exports.orgName = date.format("YYYYMMMDHHmmss");
exports.orgNumber = '';
exports.orgDescription = "QACheckout Happy Path Test";
exports.userId = '';
exports.userTypeId = '';
exports.userLastName = '';
exports.userFirstName = '';
exports.userEmail = '';
exports.userCreatedDate = '';
exports.userbiRole = '';
exports.userRoles = [];
exports.isUserSalesRep = '';
exports.isUserLocked = '';
exports.isUserOutOfOffice = '';
exports.calendarExportUrl = '';
exports.availRoles = [];
exports.availableBIRoles = [];
exports.availableUserTypes = [];
exports.accessControlNodes = [];
exports.availableTwoFactorTypes = [];
exports.availableProfiles = [];
exports.relatedProviders = [];
exports.relatedOrganizations = [];
exports.userRelatedItems = [];
exports.globalAccessControlNodes = [];
exports.availableNotificationSettings = [];
exports.adminAssignedProfile = '';
exports.userProperties = '';

exports.sessionId = '';
exports.interfaceId = '';
exports.viewId = '';
exports.extractUACTreeId = '';
exports.extractUACTreeName = '';
exports.hostCodeId = '';
exports.hostCodeName = '';
exports.hostCodeConnId = '';
exports.specialtyId = '';
exports.specialtyName = '';
exports.extractNodeId = '';
exports.extractNodeName = '';
exports.extractOrgId = '';
exports.extractOrgName = '';
exports.contactFirstName = 'QAFirst' + date.format("YYYYMMMDHHmmss");
exports.contactMiddleName = 'middle';
exports.contactLastName = 'QALast' + date.format("YYYYMMMDHHmmss");
exports.contactEmail = 'echreist+qacheckout@hc1.com';
exports.contactPhone = '5555555555';
exports.contactMobile = '3178477335';

exports.contactMailingStreet1 = '';
exports.contactMailingStreet2 = '';
exports.contactMailingStreet1 = '';
exports.contactMailingCity = '';
exports.contactMailingState = '';
exports.contactMailingPostal = '';
exports.contactMailingCountry = '';

exports.contactOtherStreet1 = '';
exports.contactOtherStreet2 = '';
exports.contactOtherStreet1 = '';
exports.contactOtherCity = '';
exports.contactOtherState = '';
exports.contactOtherPostal = '';
exports.contactOtherCountry = '';

//Added By INDUSA 10/12/2016 - START
exports.contactActive = true;
exports.contactCreatedDate = '';
exports.contactUpdatedDate = '';
//Added By INDUSA 10/12/2016 - END
exports.fax = '5555555555';
exports.emailOptOut = false;
exports.textOptOut = false;
exports.campaignEmailOptOut = false;
exports.campaignTextOptOut = false;
exports.preferEmails = true;
exports.preferTexts = false;
exports.doNotCall = false;
exports.isLead = false;
exports.isCustomer = true;
exports.primaryContact = false;
exports.copyAddress = false;
exports.contactTargetType = "Contact";
exports.contactCampaignStage = null;

exports.mailingAddressCity = "changedMailingCity"; //Added By INDUSA 09/15/2016


//Case Activity Information Variables

//Added By INDUSA 09/20/2016
exports.caseId = '';
exports.caseName = "TestCaseName_"+date.format("YYYYMMMDHHmmss");
exports.caseSubject = "TestCaseSubject_"+date.format("YYYYMMMDHHmmss");
exports.caseCaseNumber = '';
exports.caseDescription = 'Test case description';
exports.caseActive = true;
exports.caseAssignedToUser = '';//sign in user
exports.caseActivityCategory = ['',''];//unassigned
exports.caseActivitySubCategory = ['',''];//missing signature
/*exports.caseActivityCategory = ['','Unassigned'];//unassigned
exports.caseActivitySubCategory = ['','Missing Signature'];//missing signature*/
exports.caseCcUsers = '';
exports.caseCorrectiveAction = '';//Education/inservice
exports.caseDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.caseBeginDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.casePriority = '2';//Low
exports.casePriorityName = 'Medium';//Used For Validation
exports.caseCreatedDate = '';//Used For Validation
exports.caseUpdatedDate = '';//Used For Validation
exports.caseResolvedBy = '';//sign in user
// exports.caseResolvedOn = '2016-09-09T12:00:00+0000';
exports.caseResolvedOn = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.caseResolution = 'Test Resolution';
exports.caseRootCause = '';//accessioning error
exports.caseActivityStatus = '';//open
exports.caseOrganizationId = '';

//Added By INDUSA 09/29/2016 - START

//Task Activity Information Variables

exports.taskId = '';
exports.taskName = 'Testtask_name_'+date.format("YYYYMMMDHHmmss");
exports.taskSubject = 'Testtask_subject_'+date.format("YYYYMMMDHHmmss");
exports.taskNumber = '';
exports.taskDescription = 'Test task description';
exports.taskActive = true;
exports.taskActivityCategory = ['', 'Unassigned'];//unassigned
exports.taskActivitySubCategory = ['', 'Missing Signature'];//missing sig
exports.taskCcUsers = '';
exports.taskDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.taskBeginDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.taskAssignedToUser = '';
exports.taskDueDate =  date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.taskPriority = '1';
exports.taskActivityStatus = '';
exports.taskCaseNumber='';//Used For Validation
exports.taskPriorityName = '';//Used For Validation
exports.taskCreatedDate = '';//Used For Validation
exports.taskUpdatedDate = '';//Used For Validation

//Memo Activity Information Variables

exports.memoId = '';
exports.memoName = 'MemoForRules_'+date.format("YYYYMMMDHHmmss");
exports.memoSubject = 'MemoForRules_'+date.format("YYYYMMMDHHmmss");
exports.memoDescription = 'Test memo description';
exports.memoActive = true;
exports.memoActivityCategory = ['', 'Unassigned'];//unassigned
exports.memoActivitySubCategory = ['', 'Missing Signature'];//Missing Signature
exports.memoCcUsers = '';
/*exports.memoDate = '2016-09-21T12:00:00+0000';
exports.memoBeginDate = '2016-09-25T12:00:00+0000';*/
exports.memoDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.memoBeginDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.memoNumber = '';
exports.memoCaseNumber='';//Used For Validation
exports.memoCreatedDate = '';//Used For Validation
exports.memoUpdatedDate = '';//Used For Validation
exports.memoAssignedToUser='';//Used For Validation

//Added By INDUSA 09/29/2016 - END

//Added By INDUSA 09/30/2016 - START
// Opportunity variables

exports.opportunityId = '';
exports.opportunityOpportunityType = '';
exports.opportunitySpecialty = '';
exports.opportunityName = 'TestOpportunity_'+date.format("YYYYMMMDHHmmss");;
exports.opportunityDescription = 'Test description';
exports.opportunityStage = '';
/*exports.opportunityEffectiveDate = '2016-09-30T20:00:00+0000';
exports.opportunityCloseDate = '2016-09-30T20:00:00+0000';*/
exports.opportunityEffectiveDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.opportunityCloseDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
exports.opportunityResultsInterface = false;
exports.opportunityOrdersInterface = false;
exports.opportunityRevenueCalculatorType = 'Order';
exports.opportunityProbability = 10;
exports.opportunityEstimatedOrders = 1;
exports.opportunityEstimatedOrdersPeriod = 'Day';
exports.opportunityDaysInWork = 1;
exports.opportunityDaysInWorkPeriod = 'Week';
exports.opportunityTotalLifecycle = 1;
exports.opportunityTotalLifecyclePeriod = 'Months';
exports.opportunityAverageRevenuePerOrder = 1;
exports.opportunityTotalEstimatedRevenue = 1; //Can't actually set Total revenue, estimated monthly, or total weighted directly
exports.opportunityEstimatedMonthlyRevenue = 1; //^
exports.opportunityTotalWeightedRevenue =.1; //^^
exports.opportunityFeeSchedule = null;
exports.opportunityVolumePeriod = 'Month';

//Commented By INDUSA 25/10/2016 - START
/*
exports.opportunitySalesTerritory = '27175465153626756111556019501';
exports.opportunitySalesTerritoryName = 'default';
exports.opportunitySalesRep = '27175465208966966775180339550';
exports.opportunitySalesRepName = 'Default, Default';
*/
//Commented By INDUSA 25/10/2016 - END
exports.opportunityEmr = '';
exports.opportunityCurrentLab = '';
exports.opportunityActive = true;
exports.opportunityOpportunityNumber = '1';
exports.opportunityCcUsers = '';
exports.opportunityCompetitiveLab = '';

//Added By INDUSA 09/30/2016 - END

//Added By INDUSA 10/04/2016 - START

// Patient variables

exports.patientId = '';
exports.patientSalutation='Mr';
exports.patientFirstName    ='First';
exports.patientMiddleName    ='Middle';
exports.patientLastName    ='Last';
exports.patientSuffix    ='';
exports.patientEmail    ='testp@hc1.com';
exports.patientPhone    ='';
exports.patientMobile    ='0123456789';
exports.patientOtherPhone    ='';
exports.patientFax    ='';
exports.patientJobTitle    ='';
exports.patientDepartment    ='';
exports.patientCredentials    ='';
exports.patientMailingstreet    ='Mailingstreet';
exports.patientMailingstreet2    ='';
exports.patientMailingcity    ='Mailingcity';
exports.patientMailingstate    ='';
exports.patientMailingpostal    ='';
exports.patientMailingcountry    ='Mailingcountry';
exports.patientOtherAddrstreet    ='';
exports.patientOtherAddrstreet2    ='';
exports.patientOtherAddrcity    ='';
exports.patientOtherAddrstate    ='';
exports.patientOtherAddrpostal    ='';
exports.patientOtherAddrcountry    ='';
exports.patientEmailOptOut = false;
exports.patientTextOptOut = false;
exports.patientCampaignEmailOptOut = false;
exports.patientCampaignTextOptOut = false;
exports.patientPreferEmails = true;
exports.patientPreferTexts = true;
exports.patientDoNotCall = false;
exports.patientLead = false;
exports.patientCustomer = false;
exports.patientPatientId='';
exports.patientMrn='';
exports.patientSsn='';
exports.patientSex='Unknown';
exports.patientDob='';
exports.patientActive = true;
exports.extractPatientId = '';
exports.extractPatientName = '';
exports.extractPatientSalutation = '';

//Added By INDUSA 10/04/2016 - END

//For Test
exports.organizationId = '';
exports.relName = '';
exports.mailingAddressState = "myState";
exports.extractCaseActivityId = '';
exports.extractCaseActivitySubject = '';
exports.extractTaskActivityId = '';
exports.extractTaskActivitySubject = '';
exports.extractMemoActivityId = '';
exports.extractMemoActivitySubject = '';
exports.extractContactId = '';
exports.extractContactName = '';
exports.extractCaseId = '';
exports.extractCaseName = '';
exports.extractTaskId = '';
exports.extractTaskName = '';
exports.extractTaskSubject = '';
exports.extractMemoId = '';
exports.extractMemoName = '';
exports.extractOpportunityId = '';
exports.extractOpportunityName = '';
exports.extractOpportunityNumber = '';


//Added By INDUSA 10/13/2016 - START
// Workflow template variables
exports.extractTemplateId = '';
exports.extractTemplateName = '';
exports.templateName = 'testworkflowtemplate_'+date.format('mm:ss');
exports.templateDescription = 'test work flow template';
/*
exports.templateCaseBeginDate = '16:42 +05:30';
exports.templateCaseDate = '17:43 +05:30';
*/
exports.templateCaseBeginDate = date.format('HH:mm Z');
exports.templateCaseDate = date.format('HH:mm Z');

exports.templateCaseDescription = 'test case';
exports.templateCasePriority = '2'; //medium
exports.templateCaseResolvedBy = '';

//Commented By INDUSA 25/10/2016 - START
/*
exports.templateCaseActivityCategory = '27175465172073478627761236304';
exports.templateCaseActivityStatus = '27175127153935098504549656255';
exports.templateCaseActivitySubCategory = '27175465172073478627761236305';
*/
//Commented By INDUSA 25/10/2016 - END

exports.templateCaseSubject = 'test case creation';
exports.templateCaseResolvedOn = date.format('HH:mm Z');
exports.templateCaseResolution = 'test';

//Added By INDUSA 10/13/2016 - END


//Added By INDUSA 10/14/2016 - START
// Campaigns variables
exports.campaignAddName = 'Test campaign_'+date.format('mm:ss');
//Commented By INDUSA 25/10/2016 - START
/*
exports.campaignTypeId = '27178233973018826772317199748';   //Id for 'campaignType1'
exports.campaignTypeName = 'campaignType1';
*/
//Commented By INDUSA 25/10/2016 - END
exports.campaignCreatedDate = date.format("YYYY-MM-D"+'T'+"HH:mm:ss"+"+0000");
exports.campaignTargetType = 'Contact';
exports.campaignId = '';
exports.campaignNo = '';
//exports.campaignNo = 'CM250';


//Added By INDUSA 10/14/2016 - END

//Added By INDUSA 10/12/2016 - START
exports.providerId = '';
exports.providerName = exports.providerFirstName+', '+exports.providerLastName+'  '+exports.providerMiddleName;
exports.providerFirstName= 'testFName_'+date.format('mm:ss');
exports.providerMiddleName = 'testMidname_'+date.format('mm:ss');
exports.providerLastName = 'testLname_'+date.format('mm:ss');
exports.providerFullname = this.providerFirstName+' '+this.providerMiddleName+' '+this.providerLastName;
exports.providerSalutationId = 'Ms';
exports.providerSalutationName = 'Ms.';
exports.providerSuffix = 'testsuffix';
exports.providerEmail = 'test@test.in';
exports.providerCreatedDate = '';
exports.providerPhone = '1234567899';
exports.providerMobile = '1234567899';
exports.extractProviderName = '';
exports.extractProviderId = '';
//Added By INDUSA 10/12/2016 - END

//Commented By INDUSA 25/10/2016 - START
/*
//Added By INDUSA 10/10/2016 - START
exports.opporEntityType = 'Opportunity';
exports.opporName = 'Test Opportunity';
exports.opporTypeName = 'New Business';
exports.averageRevenuePerOrder = '98';
exports.opporStageName = 'opportunityStage1';
exports.opporStagedefaultProbability = '0.2';
exports.opporStageprobabilityReadOnly = 'false';
exports.opporEffectiveDate = '2016-10-01T11:40:29+0550';
exports.opporCloseDate = '2016-10-29T11:40:27+0550';
exports.opporRevenueCalculatorType = 'Order';
exports.oppoRevenueProbability = '20';
exports.opporAverageRevenuePerOrder = '98';
exports.opporSalesTerritoryId = '27175465153626756111556019501';
exports.opporSalesTerritoryName = 'default';
exports.opporSalesRepId = '27175465208966966775180339550';
exports.opporSalesRepName = 'Default Default';
exports.opporActive = true;
exports.opporDescription = 'Test Opportunity description';
*/
//Commented By INDUSA 25/10/2016 - END

//Added By INDUSA 10/10/2016 - END

//Added By INDUSA 10/19/2016 - START
// Calender variables
exports.oldCalenderEvents = new Array();
exports.newCalenderEvents = new Array();
/*exports.calenderStartDate = '2016-10-01T00:00:00.000Z';
exports.calenderEndDate = '2016-11-01T00:00:00.000Z';*/
exports.calenderStartDate = startDateCalendar;
exports.calenderEndDate = endDateCalendar;
//Added By INDUSA 10/19/2016 - END

//Added By INDUSA 10/19/2016 - START
exports.campaignMsgTemplateId = '';
exports.campaignMsgTemplate_default1name = 'Default Template -1';
exports.campaignMsgTemplate_default1Subject = 'Default Template -1';
exports.campaignMsgTemplate_default1body = "<table class=\"mastheadTable\" style=\"border-collapse: collapse; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; background-color: #ffffff;\" valign=\"top\">\n<div style=\"width: 600px; height: 200px; text-align: center; font-size: 30px; font-weight: bold; border: solid 1px #555; line-height: 200px; margin-right: auto; margin-left: auto;\"><img src=\"https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=Your%20Banner%20Goes%20Here%20[600px%20x%20200px]&amp;w=600&amp;h=200&amp;bg=e3e3e3&amp;txtclr=4c4c4c\" alt=\"\" /></div>\n</td>\n</tr>\n</tbody>\n</table>\n<table class=\"contentTable\" style=\"border-collapse: collapse; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\" border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td class=\"responsiveCol\" style=\"border-collapse: collapse; font-size: 16px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<h1 style=\"font-size: 32px; font-weight: 200; line-height: 1em; margin: 0px; padding-top: 0px;\">&nbsp;</h1>\n<h1 style=\"font-size: 32px; font-weight: 200; line-height: 1em; margin: 0px; padding-top: 0px;\">Email Title</h1>\n<h2 style=\"font-size: 24px; font-weight: 200; line-height: 1.5em; margin: 0px 0px 1em; padding-top: 0px;\">Email Subtitle</h2>\n<p style=\"margin: 0px 0px 1em; line-height: 1.5em; padding-top: 0px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<ul style=\"line-height: 1.5em; margin: 0px 0px 1em; padding: 0px 0px 0px 1em;\">\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 1:</strong>&nbsp;Excepteur sint occaecat cupidatat non proident</li>\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 2:</strong>&nbsp;sunt in culpa qui officia deserunt mollit anim</li>\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 3:</strong>&nbsp;id est laborum.</li>\n</ul>\n<table style=\"border-collapse: collapse;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse;\">\n<table style=\"border-collapse: collapse;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; border-radius: 0.25em;\" align=\"center\" bgcolor=\"#666\"><a style=\"font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; padding: 12px 18px; display: inline-block; font-weight: bold;\" href=\"#\" target=\"_blank\">Call To Action</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"margin: 0px 0px 0.5em; font-size: 14px; line-height: 1.5em; padding-top: 0px; text-transform: uppercase;\">RELATED ITEMS</p>\n<table style=\"border-collapse: collapse; background-color: #f0f0f0;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr valign=\"top\">\n<td class=\"ri-thumb\" style=\"border-collapse: collapse; width: 80px;\"><a style=\"text-decoration: none;\" href=\"#\"> <img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Thumbnail&amp;w=80&amp;h=80&amp;bg=D3D3D3&amp;txtclr=999999\" alt=\"\" /></a></td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<p><a style=\"text-decoration: none;\" href=\"#\"><strong>Lorem Ipsum</strong></a></p>\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><a style=\"display: block; text-decoration: none; text-align: right;\" href=\"#\">Read more</a></p>\n</td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n</tr>\n<tr valign=\"top\">\n<td class=\"ri-thumb\" style=\"border-collapse: collapse; width: 80px;\"><a style=\"text-decoration: none;\" href=\"#\"><img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Thumbnail&amp;w=80&amp;h=80&amp;bg=D3D3D3&amp;txtclr=999999\" alt=\"\" /></a></td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<p><a style=\"text-decoration: none;\" href=\"#\"><strong>Lorem Ipsum</strong></a></p>\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><a style=\"display: block; text-decoration: none; text-align: right;\" href=\"#\">Read more</a></p>\n</td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<table style=\"border-collapse: collapse; height: 162px;\" border=\"0\" width=\"607\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; background-color: #777777;\" valign=\"top\">\n<table class=\"contentTable\" style=\"border-collapse: collapse;\" border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td class=\"spaceCol\" style=\"border-collapse: collapse;\" width=\"20\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; color: #ffffff;\">\n<p style=\"margin: 0px 0px 1em; font-size: 12px; line-height: 1.5em; padding: 0px;\">&nbsp;</p>\n<img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Your%20Logo&amp;w=100&amp;h=40&amp;bg=D3D3D3&amp;txtclr=4c4c4c\" alt=\"\" />\n<p style=\"margin: 0px 0px 1em; font-size: 12px; line-height: 1.5em; padding: 0px;\">&copy; Copyright [COPYRIGHT YEAR], [COMPANY NAME]; All Rights Reserved.</p>\n<p style=\"margin: 0px; font-size: 12px; line-height: 1.5em; padding: 0px;\">Company Name and Address</p>\n<br /><br /></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>";
exports.campaignMsgTemplate_default2name = 'Default Template -2';
exports.campaignMsgTemplate_default2Subject = 'Default Template -2';
exports.campaignMsgTemplate_default2body = "<table class=\"mastheadTable\" style=\"border-collapse: collapse; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; background-color: #ffffff;\" valign=\"top\">\n<div style=\"width: 600px; height: 200px; text-align: center; font-size: 30px; font-weight: bold; border: solid 1px #555; line-height: 200px; margin-right: auto; margin-left: auto;\"><img src=\"https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=Your%20Banner%20Goes%20Here%20[600px%20x%20200px]&amp;w=600&amp;h=200&amp;bg=e3e3e3&amp;txtclr=4c4c4c\" alt=\"\" /></div>\n</td>\n</tr>\n</tbody>\n</table>\n<table class=\"contentTable\" style=\"border-collapse: collapse; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\" border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td class=\"responsiveCol\" style=\"border-collapse: collapse; font-size: 16px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<h1 style=\"font-size: 32px; font-weight: 200; line-height: 1em; margin: 0px; padding-top: 0px;\">&nbsp;</h1>\n<h1 style=\"font-size: 32px; font-weight: 200; line-height: 1em; margin: 0px; padding-top: 0px;\">Email Title</h1>\n<h2 style=\"font-size: 24px; font-weight: 200; line-height: 1.5em; margin: 0px 0px 1em; padding-top: 0px;\">Email Subtitle</h2>\n<p style=\"margin: 0px 0px 1em; line-height: 1.5em; padding-top: 0px;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<ul style=\"line-height: 1.5em; margin: 0px 0px 1em; padding: 0px 0px 0px 1em;\">\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 1:</strong>&nbsp;Excepteur sint occaecat cupidatat non proident</li>\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 2:</strong>&nbsp;sunt in culpa qui officia deserunt mollit anim</li>\n<li style=\"list-style-type: disc; line-height: 1.5em; margin: 0px 0px 0.25em; padding-top: 0px;\"><strong>Bold Point 3:</strong>&nbsp;id est laborum.</li>\n</ul>\n<table style=\"border-collapse: collapse;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse;\">\n<table style=\"border-collapse: collapse;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; border-radius: 0.25em;\" align=\"center\" bgcolor=\"#666\"><a style=\"font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 3px; padding: 12px 18px; display: inline-block; font-weight: bold;\" href=\"#\" target=\"_blank\">Call To Action</a></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<p style=\"margin: 0px 0px 0.5em; font-size: 14px; line-height: 1.5em; padding-top: 0px; text-transform: uppercase;\">RELATED ITEMS</p>\n<table style=\"border-collapse: collapse; background-color: #f0f0f0;\" border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr valign=\"top\">\n<td class=\"ri-thumb\" style=\"border-collapse: collapse; width: 80px;\"><a style=\"text-decoration: none;\" href=\"#\"> <img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Thumbnail&amp;w=80&amp;h=80&amp;bg=D3D3D3&amp;txtclr=999999\" alt=\"\" /></a></td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<p><a style=\"text-decoration: none;\" href=\"#\"><strong>Lorem Ipsum</strong></a></p>\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><a style=\"display: block; text-decoration: none; text-align: right;\" href=\"#\">Read more</a></p>\n</td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n</tr>\n<tr valign=\"top\">\n<td class=\"ri-thumb\" style=\"border-collapse: collapse; width: 80px;\"><a style=\"text-decoration: none;\" href=\"#\"><img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Thumbnail&amp;w=80&amp;h=80&amp;bg=D3D3D3&amp;txtclr=999999\" alt=\"\" /></a></td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding-top: 0px;\">\n<p><a style=\"text-decoration: none;\" href=\"#\"><strong>Lorem Ipsum</strong></a></p>\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><a style=\"display: block; text-decoration: none; text-align: right;\" href=\"#\">Read more</a></p>\n</td>\n<td style=\"border-collapse: collapse; width: 10px;\">&nbsp;</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<table style=\"border-collapse: collapse; height: 162px;\" border=\"0\" width=\"607\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td style=\"border-collapse: collapse; background-color: #777777;\" valign=\"top\">\n<table class=\"contentTable\" style=\"border-collapse: collapse;\" border=\"0\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td class=\"spaceCol\" style=\"border-collapse: collapse;\" width=\"20\">&nbsp;</td>\n<td style=\"border-collapse: collapse; font-size: 12px; line-height: 1.5em; font-family: HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; color: #ffffff;\">\n<p style=\"margin: 0px 0px 1em; font-size: 12px; line-height: 1.5em; padding: 0px;\">&nbsp;</p>\n<img src=\"https://placeholdit.imgix.net/~text?txtsize=12&amp;txt=Your%20Logo&amp;w=100&amp;h=40&amp;bg=D3D3D3&amp;txtclr=4c4c4c\" alt=\"\" />\n<p style=\"margin: 0px 0px 1em; font-size: 12px; line-height: 1.5em; padding: 0px;\">&copy; Copyright [COPYRIGHT YEAR], [COMPANY NAME]; All Rights Reserved.</p>\n<p style=\"margin: 0px; font-size: 12px; line-height: 1.5em; padding: 0px;\">Company Name and Address</p>\n<br /><br /></td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>";
exports.campaignMsgTemplate_default3name = 'Default Template -3';
exports.campaignMsgTemplateName = 'Test Campaign Message template';
exports.campaignMsgTemplateCreatedDate = date.format("YYYY-MM-D"+'T'+"HH:mm:ss"+"+0000");
exports.extractCampaignId = '';
exports.extractCampaignName = '';
//Added By INDUSA 10/19/2016 - END

//Added By INDUSA 10/20/2016 - START
exports.incorrectUserName = 'user@wrong.address';// To use in  Failed User Login Functionality
exports.incorrectPassword = 'Incorrect Password';// To use in  Failed User Login Functionality
exports.hrmEntityTypes = ["ActivityCategoryy", "ActivitySubCategory", "CampaignType", "CompetitiveLab",
    "ContactType", "CorrectiveAction", "ElectronicMedicalRecord", "OpportunityStage","OpportunityType","OrganizationType","RootCause","Specialty"];// For Testing
exports.messageSubject = 'Testing Subject '+date.format("YYYYMMMDHHmmss");
exports.messageText = 'This Is Sample Message Body!!!!  '+date.format("YYYYMMMDHHmmss");
exports.messageReceivedLocalDate = date.format("YYYY-MM-DD"+'T'+"HH:mm:ss"+"+0000");
//Added By INDUSA 10/20/2016 - END

//Added By INDUSA 10/24/2016 - START

exports.treeName = 'My Tree_'+date.format('mm:ss');
exports.treeDescription = 'My Tree description';
exports.extractTreeID = '';
exports.extractTreeName = '';
exports.extractTreeDesc = '';
exports.treeChildNodeName = 'Child Node_'+date.format('mm:ss');
exports.treeChildNodeDescription = 'Child Node description';
exports.extracttreeChildNodeId = '';
exports.treeRootNodeId = '';
exports.treeRootNodeName = '';

//Added By INDUSA 10/24/2016 - END

//Added By INDUSA 10/25/2016 - START
//static variables declaration
exports.activityCategoriesIds = [''];
exports.activityCategoriesNames = [''];

exports.activityStatusIds = [''];
exports.activityStatusNames = [''];
exports.activityStatusStates = [''];

exports.activityPriorityIds = [''];
exports.activityPriorityNames = [''];

exports.activitySubCategoriesIds = [''];
exports.activitySubCategoriesNames = [''];

exports.campaignTypeIds = [''];
exports.campaignTypeNames = [''];

exports.opportunityIds = [''];
exports.opportunityNames = [''];
exports.opportunityStateTypes = [''];
exports.opportunityProbability = [''];

exports.contactTypeIds = [''];
exports.contactTypeNames = [''];

exports.specialtyIds = [''];
exports.specialtyNames = [''];

exports.competitiveLabIds = [''];
exports.competitiveLabNames = [''];

exports.correctiveActionIds = [''];
exports.correctiveActionNames = [''];

exports.emrIds = [''];
exports.emrNames = [''];

exports.opportunityTypeIds = [''];
exports.opportunityTypeNames = [''];

exports.organizationTypeIds = [''];
exports.organizationTypeNames = [''];

exports.rootCauseIds = [''];
exports.rootCauseNames = [''];

exports.salesTerritoryId = '';
exports.salesTerritoryName = '';
exports.salesRepId = '';
exports.salesRepName = '';
exports.salesRepOrigName = '';
//Added By INDUSA 10/25/2016 - END

//Added By INDUSA 11/08/2016 - START
exports.recordTypes = ["contact", "provider", "organization", "case", "task", "memo", "opportunity", "campaign"];
exports.contactTypes = ['Contact','Provider'];
//Added By INDUSA 11/08/2016 - END

//Added By INDUSA 11/14/2016 - START
exports.customListRequesters = ["AccessControlTreee", "Campaign", "Message", "Notification", "OrganizationActivities"];
exports.customListViewIds = [];
exports.viewIds = {};
//Added By INDUSA 11/14/2016 - END

//Added By INDUSA 11/15/2016 - START
exports.retryOn = true;
exports.retryNoOfTimes = 4;
exports.increaseTimeout = 500;
exports.initialTimeout = 5000;
//Added By INDUSA 11/15/2016 - END


//Added By INDUSA 11/16/2016 - START
exports.requiredSpecialty = 'Lab';
exports.objectToFindFromNotification = ['Case'];
//Added By INDUSA 11/16/2016 - END


//Added by INDUSA 11/30/2016 - START
exports.entitiesToClear = ["Organization", "Case", "Task", "Memo", "Campaign",'Contact','Provider','Opportunity','Message','AccessControlTree','Workflowtemplate'];
exports.extractMessageId = '';
//Added by INDUSA 11/30/2016 - END


//Added by INDUSA 12/07/2016 - START
exports.logFilePath = "./logs/";
exports.executionResultFileName = "results.txt";
exports.logger = '';
exports.passedCases = [];
exports.failedCases = [];
exports.failedCasesCons = 'Failed';
exports.passedCasesCons = 'Passed';
//Added by INDUSA 12/07/2016 - START