import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar ,prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";

import get from "lodash/get";
import { fetchBill, findAndReplace, getSearchResults, getSearchResultsForSewerage, getWorkFlowData, serviceConst } from "../../../../../ui-utils/commons";
import { convertDateToEpoch, convertEpochToDate } from "../../utils/index";
import { httpRequest } from "../../../../../ui-utils";


export const getWaterSewrageData = async (state, dispatch) => {
  let NodScreenObject = get(state.screenConfiguration.preparedFinalObject, "NODScreen", {});
  var WaterId = NodScreenObject["WaterId"]
  var SewageId = NodScreenObject["SewageId"]
  var mobileNumber = NodScreenObject["mobileNumber"]
  let tenantId = localStorage.getItem('tenant-id');
//alert("WaterId = "+WaterId);
//alert("SewageId = "+SewageId);
//alert("mobileNumber = "+mobileNumber);

//ws-services/wc/_search?searchType=CONNECTION&tenantId=pb.fazilka&mobileNumber=9781444604

if(WaterId==undefined || SewageId == undefined)
{
  if(mobileNumber==undefined)
  {
    alert("Please Provide the Registerde Mobile Number or Watee Connection Number and Sewrage Number");
  }
  else{
    try {
      let queryObject = [
        {key: "searchType",value: "CONNECTION"},
        {key: "tenantId",value: tenantId},
        {key: "mobileNumber",value: mobileNumber}
      ];
      let water_connection = null;
      water_connection = await httpRequest(
        "post",
        "/ws-services/wc/_search",
        "_search",
        queryObject,
    
      );
    
    
   //   alert("Water Connection = "+water_connection.WaterConnection[0].connectionNo);
     
      let sewerage_connection = null;
      sewerage_connection = await httpRequest(
        "post",
        "/sw-services/swc/_search",
        "_search",
        queryObject,
    
      );
    
    
    //  alert("Sewrage Connection = "+sewerage_connection.SewerageConnections[0].connectionNo);
    
    
    
    }
    catch (e) {
      console.log(e);
    }




  }
}

else{
 // alert("enter in else block");
 // billing-service/bill/v2/_fetchbill?tenantId=pb.fazilka&consumerCode=0603005184&businessService=SW
//  billing-service/bill/v2/_fetchbill?tenantId=pb.fazilka&consumerCode=0603002456&businessService=WS

try {
  let queryObjectSewrage = [
    {key: "consumerCode",value: SewageId},
    {key: "tenantId",value: tenantId},
    {key: "businessService",value: "SW"}
  ];
  let sewrage_connection = null;
  sewrage_connection = await httpRequest(
    "post",
    "/billing-service/bill/v2/_fetchbill",
    "",
    queryObjectSewrage,

  );


 // alert("Sewrage detais = "+JSON.stringify(sewrage_connection.Bill[0]));
 
  let SewrageDetailsArray = [];
  let sewageRow=null;
  let ConsumerNo,OwnerName,ConnectionStatus,Address,Due;

  ConsumerNo = sewrage_connection.Bill[0].consumerCode;
  OwnerName = sewrage_connection.Bill[0].payerName;
  ConnectionStatus = sewrage_connection.Bill[0].status;
  Address = sewrage_connection.Bill[0].payerAddress;
  Due = sewrage_connection.Bill[0].totalAmount;

  sewageRow={
    "ConsumerNo":ConsumerNo,
    "OwnerName":OwnerName+"  "+Address,
    "ConnectionStatus":ConnectionStatus,
    "Due":Due,
   
  };
  SewrageDetailsArray.push(sewageRow);


dispatch(prepareFinalObject("sewrageResponse", SewrageDetailsArray));


  let queryObjectWater = [
    {key: "consumerCode",value: WaterId},
    {key: "tenantId",value: tenantId},
    {key: "businessService",value: "WS"}
  ];

  let water_connection = null;
  water_connection = await httpRequest(
    "post",
    "/billing-service/bill/v2/_fetchbill",
    "",
    queryObjectWater,

  );


 // alert("Water detais = "+JSON.stringify(water_connection));
  let WaterDetailsArray = [];
  let waterRow=null;
  let ConsumerNo_w,OwnerName_w,ConnectionStatus_w,Address_w,Due_w;

  ConsumerNo_w = water_connection.Bill[0].consumerCode;
  OwnerName_w = water_connection.Bill[0].payerName;
  ConnectionStatus_w = water_connection.Bill[0].status;
  Address_w = water_connection.Bill[0].payerAddress;
  Due_w = water_connection.Bill[0].totalAmount;

  waterRow={
    "ConsumerNo_w":ConsumerNo_w,
    "OwnerName_w":OwnerName_w+"  "+Address_w,
    "ConnectionStatus_w":ConnectionStatus_w,
    "Due_w":Due_w,
   
  };
  WaterDetailsArray.push(waterRow);


dispatch(prepareFinalObject("waterResponse", WaterDetailsArray));


}
catch (e) {
  console.log(e);
}











}



}

export const getPropertyData = async (state, dispatch) => {
 //alert("Tenant ID = "+localStorage.getItem('tenant-id'));

  let tenantId = localStorage.getItem('tenant-id');

  let NodScreenObject = get(state.screenConfiguration.preparedFinalObject, "NODScreen", {});
  var propertyId = NodScreenObject["propertyId"]
//  alert("propertyId = "+propertyId);

 // let consumerCode = "PT-1012-1137521";   for Testing Property
 // let consumerCode = "PT-603-1066476";   for Fazilka Property

  let consumerCode = NodScreenObject["propertyId"];
  let businessService = "PT";

  try {
    let queryObject = [
      {
        key: "tenantId",
        value: tenantId
      },
      {
        key: "propertyIds",
        value: consumerCode
      }
    ];
    let payload = null;
    payload = await httpRequest(
      "post",
      "/property-services/property/_search",
      "_search",
      queryObject,

    );


   // alert(JSON.stringify(payload.Properties[0]));
    
    let createOwnerDetailsArray = [];
    let ownerRow=null;
    let name,mobileNumber,emailId,permanentAddress;


    payload.Properties[0].owners.map((element,index) => {
      //alert("Name = "+element.name + " Mobile =  "+element.mobileNumber + " emailId = "+element.emailId +" permanentAddress ="+element.permanentAddress);
   
      name = element.name;
      mobileNumber = element.mobileNumber;
      emailId = element.emailId;
      permanentAddress = element.permanentAddress;
   
      ownerRow={
        "name":name,
        "mobileNumber":mobileNumber,
        "emailId":emailId,
        "permanentAddress":permanentAddress,
       
      };
      createOwnerDetailsArray.push(ownerRow);
    });
    
    dispatch(prepareFinalObject("propertyOwnerResponse", createOwnerDetailsArray));
   

   


   

   




//--------------------------

let queryObjectforBill = [
{
  key: "tenantId",
  value: tenantId
},
{
  key: "consumerCode",
  value: consumerCode
},
{
  key: "businessService",
  value: businessService
}
];
let bill_payload = null;
bill_payload = await httpRequest(
"post",
"/billing-service/bill/v2/_fetchbill",
"",
queryObjectforBill,

);
//alert(JSON.stringify(bill_payload));
//console.log(JSON.stringify(bill_payload));
let createBillDetailsArray = [];
let billRow=null;
let billNumber,totalAmount , fromPeriod , toPeriod , billPeriod;

bill_payload.Bill.map((element,index) => {
 // alert("billNumber = "+element.billNumber + " totalAmount =  "+element.totalAmount + " fromPeriod = "+element.billDetails[0].fromPeriod +" toPeriod ="+element.billDetails[0].toPeriod);

  billNumber = element.billNumber;
  totalAmount = element.totalAmount;
  fromPeriod = element.billDetails[0].fromPeriod;
  toPeriod = element.billDetails[0].toPeriod;
  billPeriod = convertEpochToDate(element.billDetails[0].toPeriod)+" - "+convertEpochToDate(element.billDetails[0].fromPeriod);

  billRow={
    "billNumber":billNumber,
    "totalAmount":totalAmount,
    "billPeriod":billPeriod,
    "toPeriod":toPeriod,
   
  };
  createBillDetailsArray.push(billRow);
});

dispatch(prepareFinalObject("propertyBillResponse", createBillDetailsArray));



//--------------------------------

let queryObjectforAssesment = [
{
  key: "tenantId",
  value: tenantId
},
{
  key: "propertyIds",
  value: consumerCode
}

];
let assement_payload = null;
assement_payload = await httpRequest(
"post",
"/property-services/assessment/_search",
"_search",
queryObjectforAssesment,

);
//alert(JSON.stringify(assement_payload.Assessments[0]));
//console.log(JSON.stringify(assement_payload));


let createAssesmentArray = [];
let assesmentRow=null;
let assessmentNumber,financialYear,assessmentDate;


assement_payload.Assessments.map((element,index) => {
//alert("assessmentNumber = "+element.assessmentNumber+"  financialYear = "+element.financialYear +"  assessmentDate = "+element.assessmentDate);

assessmentNumber = element.assessmentNumber;
financialYear = element.financialYear;
assessmentDate = convertEpochToDate(element.assessmentDate);

assesmentRow={
  "assessmentNumber":assessmentNumber,
  "financialYear":financialYear,
  "assessmentDate":assessmentDate
  
 
};
createAssesmentArray.push(assesmentRow);

});  
dispatch(prepareFinalObject("propertyAssesmentResponse", createAssesmentArray));
   // setCardVisibility(state, action, dispatch);

  } catch (e) {
    console.log(e);
  }




}


