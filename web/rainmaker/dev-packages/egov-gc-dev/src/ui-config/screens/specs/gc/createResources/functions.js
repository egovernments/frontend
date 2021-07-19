import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar ,prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";

import get from "lodash/get";
import { fetchBill, findAndReplace, getSearchResults, getSearchResultsForSewerage, getWorkFlowData, serviceConst } from "../../../../../ui-utils/commons";
import { validateFields } from "../../utils";
import { convertDateToEpoch, convertEpochToDate, resetFieldsForGenerateBills, resetFieldsForSearchBills } from "../../utils/index";
import { httpRequest } from "../../../../../ui-utils";

export const generateBillApiCall = async (state, dispatch) => {
  let getCurrentTab = get(state.screenConfiguration.preparedFinalObject, "currentTab");
 let currentSearchTab =  "CREATE_CONNECTION";
 if (currentSearchTab === "CREATE_CONNECTION") {
  
  let generateBillScreenObject = get(state.screenConfiguration.preparedFinalObject, "generateBillScreen", {});
    Object.keys(generateBillScreenObject).forEach((key) => (generateBillScreenObject[key] == "") && delete generateBillScreenObject[key]);
    if (Object.values(generateBillScreenObject).length <= 1) {
      dispatch(toggleSnackbar(true, {labelName:"Please provide the connection type and mohalla code for generate bill", label: "Please provide the connection type and mohalla code for generate bill" }, "warning"));
    }
    else if ((generateBillScreenObject["mohallaData"] === undefined || generateBillScreenObject["mohallaData"].length === 0) &&
    generateBillScreenObject["transactionType"] !== undefined && generateBillScreenObject["transactionType"].length !== 0) 
    {
      dispatch(toggleSnackbar(true, { labelName: "Please select the details", label: "choose the Value" }, "warning"));
    }
  else{
    var mohallaDataCode = generateBillScreenObject["mohallaData"].substring(
      generateBillScreenObject["mohallaData"].lastIndexOf("(") + 1, 
      generateBillScreenObject["mohallaData"].lastIndexOf(")")).trim();
var transactionType;  
if(generateBillScreenObject["transactionType"]=="WS_CONNECTION_TYPE_SEWERAGE")
{
  transactionType = "SW";
}
else if(generateBillScreenObject["transactionType"]=="WS_CONNECTION_TYPE_WATER")
{
  transactionType = "WS";
}
try {
let billSchedulerObject = {
  "transactionType": transactionType,
  "status":"INITIATED",
  "locality":mohallaDataCode,
  "billingcycleStartdate": 0,
  "billingcycleEnddate":0,
  "tenantId":getTenantIdCommon(),
 }
  

 const response = await httpRequest(
  "post",
  "/ws-calculator/watercharges/scheduler/_create",
  "_create",
  [],
  {BillScheduler:billSchedulerObject}
  );


let createBillArray = [];
    let billRow=null;
    let transactionType,locality,billingcycleStartdate,billingcycleEnddate,status ,tenantId;

response.billScheduler.map((element,index) => {
  transactionType = element.transactionType;
  locality = element.locality;
  billingcycleStartdate = convertEpochToDate(element.billingcycleStartdate);
  billingcycleEnddate = convertEpochToDate(element.billingcycleEnddate);
  status = element.status;
  tenantId = element.tenantId;

  billRow={
    "transactionType":transactionType,
    "locality":locality,
    "billingcycleStartdate":billingcycleStartdate,
    "billingcycleEnddate":billingcycleEnddate,
    "status":status,
    "tenantId":tenantId,
  };
  createBillArray.push(billRow);
});

dispatch(prepareFinalObject("createBillResponse", createBillArray));

}
catch (err) {
  dispatch(toggleSnackbar(true, {labelName:""+err, label: "Please provide the connection type and mohalla code for generate bill" }, "warning"));
  console.log(err) 
  }





  }
  
  
  } 
  else {
    resetFieldsForSearchBills(state, dispatch);
    await renderSearchApplicationTable(state, dispatch);
  }
  
}



export const searchBillApiCall = async (state, dispatch) => {
  // showHideApplicationTable(false, dispatch);
  // showHideConnectionTable(false, dispatch);
   let getCurrentTab = get(state.screenConfiguration.preparedFinalObject, "currentTab");
   let currentSearchTab =  "SEARCH_CONNECTION";
   if (currentSearchTab === "SEARCH_CONNECTION") {
   //  resetFieldsForGenerateBills(state, dispatch);
   //  await renderGenerateBillTable(state, dispatch);
   
   let searchBillScreenObject = get(state.screenConfiguration.preparedFinalObject, "generateBillScreen", {});
     Object.keys(searchBillScreenObject).forEach((key) => (searchBillScreenObject[key] == "") && delete searchBillScreenObject[key]);
     if (Object.values(searchBillScreenObject).length <= 1) {
     
       dispatch(toggleSnackbar(true, {labelName:"Please provide the connection type and mohalla code for search bill", label: "Please provide the connection type and mohalla code for search bill" }, "warning"));
     }
     else if ((searchBillScreenObject["mohallaData"] === undefined || searchBillScreenObject["mohallaData"].length === 0) &&
     searchBillScreenObject["transactionType"] !== undefined && searchBillScreenObject["transactionType"].length !== 0) 
     {
     
       dispatch(toggleSnackbar(true, { labelName: "Please select the details", label: "choose the Value" }, "warning"));
     }
   else{
       var mohallaDataCode = searchBillScreenObject["mohallaData"].substring(
        searchBillScreenObject["mohallaData"].lastIndexOf("(") + 1, 
        searchBillScreenObject["mohallaData"].lastIndexOf(")")).trim();
 var transactionType;  
 if(searchBillScreenObject["transactionType"]=="WS_CONNECTION_TYPE_SEWERAGE")
 {
   transactionType = "SW";
 }
 else if(searchBillScreenObject["transactionType"]=="WS_CONNECTION_TYPE_WATER")
 {
   transactionType = "WS";
 }
 
 
 
 try {
  let tenant_Id = getTenantIdCommon();
  const response = await httpRequest(
   "post",
   `ws-calculator/watercharges/scheduler/_search?tenantId=${tenant_Id}&locality=${mohallaDataCode}`,
   "_search",
   [],
   {}
   );
 
 

 let searchBillArray = [];
 let billRow=null;
 let transactionType,locality,billingcycleStartdate,billingcycleEnddate,status ,tenantId;

response.billScheduler.map((element,index) => {
transactionType = element.transactionType;
locality = element.locality;
billingcycleStartdate = convertEpochToDate(element.billingcycleStartdate);
billingcycleEnddate = convertEpochToDate(element.billingcycleEnddate);
status = element.status;
tenantId = element.tenantId;
billRow={
 "transactionType":transactionType,
 "locality":locality,
 "billingcycleStartdate":billingcycleStartdate,
 "billingcycleEnddate":billingcycleEnddate,
 "status":status,
 "tenantId":tenantId,
};
searchBillArray.push(billRow);
});
//dispatch(prepareFinalObject("searchBillResponse", searchBillArray));
dispatch(prepareFinalObject("createBillResponse", searchBillArray));
if(searchBillArray.length==0)
{
  
  dispatch(toggleSnackbar(true, {labelName:"No Data Found", label: "" }, "warning"));
 
}
}




 catch (err) {
   dispatch(toggleSnackbar(true, {labelName:""+err, label: "Please" }, "warning"));
   console.log(err) 
   }
 
 
 
 
 
   }
   
   
   } 
   else {
     resetFieldsForSearchBills(state, dispatch);
     await renderSearchApplicationTable(state, dispatch);
   }
   
 }