import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar ,prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo, getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";

import get from "lodash/get";
import { fetchBill, findAndReplace, getSearchResults, getSearchResultsForSewerage, getWorkFlowData, serviceConst } from "../../../../../ui-utils/commons";
import { convertDateToEpoch, convertEpochToDate } from "../../utils/index";
import { httpRequest } from "../../../../../ui-utils";


export const getWaterData = async (state, dispatch) => {
  let NodScreenObject = get(state.screenConfiguration.preparedFinalObject, "NODScreen", {});
  var WaterId = NodScreenObject["WaterId"]
  //var SewageId = NodScreenObject["SewageId"]
  var mobileNumber = NodScreenObject["mobileNumber"]
  let tenantId = localStorage.getItem('tenant-id');
//alert("WaterId = "+WaterId);
//alert("SewageId = "+SewageId);
//alert("mobileNumber = "+mobileNumber);

//ws-services/wc/_search?searchType=CONNECTION&tenantId=pb.fazilka&mobileNumber=9781444604

if(WaterId==undefined || WaterId =="")
{
  if(mobileNumber==undefined || mobileNumber=="")
  {
    alert("Please Provide the Registered Mobile Number or Water Connection Number");
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

      WaterId=water_connection.WaterConnection[0].connectionNo;
    }
    catch (e) {
      console.log(e);
    }
  }
}

else{
     try {
      let queryObject = [
        {key: "searchType",value: "CONNECTION"},
        {key: "tenantId",value: tenantId},
        {key: "connectionNumber",value: WaterId}
      ];
      let water_connection = null;
      water_connection = await httpRequest(
        "post",
        "/ws-services/wc/_search",
        "_search",
        queryObject,
      ); 
    }
    catch (e) {
      console.log(e);
    }
  }
try {
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
    "OwnerName_w":OwnerName_w?OwnerName_w:"NA"+"  "+Address_w?Address_w:" ",
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



export const getSewerageData = async (state, dispatch) => {
  let NodScreenObject = get(state.screenConfiguration.preparedFinalObject, "NODScreen", {});
  var SewerageId = NodScreenObject["SewerageId"]
  var mobileNumber = NodScreenObject["mobileNumber"]
  let tenantId = localStorage.getItem('tenant-id');
//alert("WaterId = "+WaterId);
//alert("SewageId = "+SewageId);
//alert("mobileNumber = "+mobileNumber);

//ws-services/wc/_search?searchType=CONNECTION&tenantId=pb.fazilka&mobileNumber=9781444604

if(SewerageId == undefined || SewerageId=="")
{
  if(mobileNumber==undefined || mobileNumber=="")
  {
    alert("Please Provide the Registered Mobile Number or Sewerage Number");
  }
  else{
    try {
      let queryObject = [
        {key: "searchType",value: "CONNECTION"},
        {key: "tenantId",value: tenantId},
        {key: "mobileNumber",value: mobileNumber}
      ];
      
       let sewerage_connection = null;
      sewerage_connection = await httpRequest(
        "post",
        "/sw-services/swc/_search",
        "_search",
        queryObject,
    
      );
    
      SewerageId=sewerage_connection.SewerageConnections[0].connectionNo;
    //  alert("Sewrage Connection = "+sewerage_connection.SewerageConnections[0].connectionNo);
    
    
    
    }
    catch (e) {
      console.log(e);
    }




  }
}

else{
  try {
    let queryObject = [
      {key: "searchType",value: "CONNECTION"},
      {key: "tenantId",value: tenantId},
      {key: "connectionNumber",value:SewerageId }
    ];
    
     let sewerage_connection = null;
    sewerage_connection = await httpRequest(
      "post",
      "/sw-services/swc/_search",
      "_search",
      queryObject,
  
    );
  
    SewerageId=sewerage_connection.SewerageConnection[0].connectionNo;
  //  alert("Sewrage Connection = "+sewerage_connection.SewerageConnections[0].connectionNo);
  
  
  
  }
  catch (e) {
    console.log(e);
  }
}

try {
  let queryObjectSewrage = [
    {key: "consumerCode",value: SewerageId},
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
    "OwnerName":OwnerName?OwnerName:""+"  "+Address?Address:"",
    "ConnectionStatus":ConnectionStatus,
    "Due":Due,
   
  };
  SewrageDetailsArray.push(sewageRow);


dispatch(prepareFinalObject("sewrageResponse", SewrageDetailsArray));
}
catch (e) {
  console.log(e);
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
if(payload && payload.Properties && payload.Properties.length ==0)
{
  alert("No Property found with this property Id. Please try again with another ID!!");
}
else{
   // alert(JSON.stringify(payload.Properties[0]));
    
    let createOwnerDetailsArray = [];
    let ownerRow=null;
    let name,mobileNumber,emailId,permanentAddress,fatherOrHusbandName;


    payload.Properties[0].owners.map((element,index) => {
      //alert("Name = "+element.name + " Mobile =  "+element.mobileNumber + " emailId = "+element.emailId +" permanentAddress ="+element.permanentAddress);
   
      name = element.name;
      fatherOrHusbandName=element.fatherOrHusbandName;
      mobileNumber = element.mobileNumber;
      permanentAddress = element.permanentAddress;
   
      ownerRow={
        "name":name,
        "fatherOrHusbandName":fatherOrHusbandName?fatherOrHusbandName:"NA",
        "mobileNumber":mobileNumber,
        "permanentAddress":permanentAddress?permanentAddress:"NA",
       
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
let billNumber,totalAmount , fromPeriod , toPeriod , billPeriod,status;

bill_payload.Bill.map((element,index) => {
 // alert("billNumber = "+element.billNumber + " totalAmount =  "+element.totalAmount + " fromPeriod = "+element.billDetails[0].fromPeriod +" toPeriod ="+element.billDetails[0].toPeriod);

  billNumber = element.billNumber;
  totalAmount = element.totalAmount;
  fromPeriod = element.billDetails[0].fromPeriod;
  toPeriod = element.billDetails[0].toPeriod;
  billPeriod = convertEpochToDate(element.billDetails[0].toPeriod)+" - "+convertEpochToDate(element.billDetails[0].fromPeriod);
status=element.status;
  billRow={
    "billNumber":billNumber,
    "totalAmount":totalAmount,
    "billPeriod":billPeriod,
    "status":status,
   
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
}
  } catch (e) {
    console.log(e);
  }




}


