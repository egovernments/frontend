import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar ,setPaymentDetails} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "../../../../../ui-utils/api";
import { convertDateToEpoch, validateFields } from "../../utils";
import { convertEpochToDate, getTranslatedLabel } from "../../utils";
import {downloadReceiptFromFilestoreID} from "../../../../../ui-utils/commons";
import { ifUserRoleExists } from "../../utils";
import "./index.css";
import { prepareFinalObject  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { paybuttonJsonpath } from "./constants";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";


export const callPGService = async (state, dispatch) => {
  const isAdvancePaymentAllowed =get(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
  const tenantId = getQueryArg(window.location.href, "tenantId");
  const consumerCode = getQueryArg(window.location.href, "consumerCode");
  const businessService = get(
    state,
    "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].businessService"
  );
  // const businessService = getQueryArg(window.location.href, "businessService"); businessService
  let callbackUrl = `${
    process.env.NODE_ENV === "production"
      ? `${window.origin}/citizen`
      : window.origin
  }/egov-common/paymentRedirectPage`;

  const { screenConfiguration = {} } = state;
  const { preparedFinalObject = {} } = screenConfiguration;
  const { ReceiptTemp = {} } = preparedFinalObject;
  const billPayload = ReceiptTemp[0];
  const taxAmount = Number(get(billPayload, "Bill[0].totalAmount"));
  let amtToPay =
    state.screenConfiguration.preparedFinalObject.AmountType ===
    "partial_amount"
      ? state.screenConfiguration.preparedFinalObject.AmountPaid
      : taxAmount;
  amtToPay = amtToPay ? Number(amtToPay) : taxAmount;

  if(amtToPay>taxAmount&&!isAdvancePaymentAllowed){
    alert("Advance Payment is not allowed");
    return;
  }

  const user = {
    name: get(billPayload, "Bill[0].payerName"),
    mobileNumber: get(billPayload, "Bill[0].mobileNumber"),
    tenantId
  };
  let taxAndPayments = [];
  taxAndPayments.push({
    taxAmount:taxAmount,
    businessService: businessService,
    billId: get(billPayload, "Bill[0].id"),
    amountPaid: amtToPay
  });
  const buttonJsonpath = paybuttonJsonpath + `${process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"}`;
  try {
    dispatch(handleField("pay", buttonJsonpath, "props.disabled", true));
    const requestBody = {
      Transaction: {
        tenantId,
        txnAmount: amtToPay,
        module: businessService,
        billId: get(billPayload, "Bill[0].id"),
        consumerCode: consumerCode,
        productInfo: "Common Payment",
        gateway: "AXIS",
        taxAndPayments,
        businessService:taxAndPayments[0].businessService,
        user,
        callbackUrl
      }
    };
    const goToPaymentGateway = await httpRequest(
      "post",
      "pg-service/transaction/v1/_create",
      "_create",
      [],
      requestBody
    );

    if (get(goToPaymentGateway, "Transaction.txnAmount") == 0) {
      const srcQuery = `?tenantId=${get(
        goToPaymentGateway,
        "Transaction.tenantId"
      )}&billIds=${get(goToPaymentGateway, "Transaction.billId")}`;

      let searchResponse = await httpRequest(
        "post",
        "collection-services/payments/_search" + srcQuery,
        "_search",
        [],
        {}
      );

      let transactionId = get(
        searchResponse,
        "Payments[0].paymentDetails[0].receiptNumber"
      );

      let  paymentDetails= get(
        response,
        "Payments[0]",
        null
      );
      
      dispatch(setPaymentDetails(paymentDetails))
      
      dispatch(
        setRoute(
          `/egov-common/acknowledgement?status=${"success"}&consumerCode=${consumerCode}&tenantId=${tenantId}&receiptNumber=${transactionId}&businessService=${businessService}`
        )
      );
    } else {
       const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl") || get(goToPaymentGateway, "Transaction.callbackUrl");
         if( get(goToPaymentGateway, "Transaction.tenantId")=="pb.amritsar")
         {
          displayRazorpay(goToPaymentGateway);
         }
         else{
          window.location = redirectionUrl;
         }
    }
  } catch (e) {
    dispatch(handleField("pay", buttonJsonpath, "props.disabled", false));
    console.log(e);
    if (e.message === "A transaction for this bill has been abruptly discarded, please retry after 15 mins"){
      dispatch(
        toggleSnackbar(
          true,
          { labelName: e.message, labelKey: e.message },
          "error"
        )
      );
    }else{
      moveToFailure(dispatch);
    }
  }
};

export const download = async (receiptQueryString, mode = "download" ,configKey , state) => {
  if(state && process.env.REACT_APP_NAME === "Citizen" && configKey === "consolidatedreceipt"){
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
    configKey = get(uiCommonPayConfig, "receiptKey")
  }
 


  const FETCHRECEIPT = {
    GET: {
      URL: "/collection-services/payments/_search",
      ACTION: "_get",
    },
  };

  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get",
    },
  };
  let consumerCode = getQueryArg(window.location.href, "consumerCode")?getQueryArg(window.location.href, "consumerCode"):receiptQueryString[0].value;
  let tenantId = getQueryArg(window.location.href, "tenantId")?getQueryArg(window.location.href, "tenantId"):receiptQueryString[1].value;
  let applicationNumber = getQueryArg(window.location.href, "applicationNumber");

  let queryObject = [
    { key: "tenantId", value:tenantId },
    { key: "applicationNumber", value: consumerCode?consumerCode:applicationNumber}
  ];

  let queryObjectForPT = [
    { key: "tenantId", value:tenantId },
    { key: "propertyIds", value: consumerCode?consumerCode:applicationNumber}
  ];
  const FETCHFIREDETAILS = {
    GET: {
      URL: "/firenoc-services/v1/_search",
      ACTION: "_get",
    },
  };

  const FETCHPROPERTYDETAILS = {
    GET: {
      URL: "/property-services/property/_search",
      ACTION: "_get",
    },
  };
  const FETCHTRADEDETAILS = {
    GET: {
      URL: "/tl-services/v1/_search",
      ACTION: "_get",
    },
  };
  const responseForTrade = await httpRequest("post", FETCHTRADEDETAILS.GET.URL, FETCHTRADEDETAILS.GET.ACTION,queryObject);
  const response =  await httpRequest("post", FETCHFIREDETAILS.GET.URL, FETCHFIREDETAILS.GET.ACTION,queryObject);
  const responseForPT =  await httpRequest("post", FETCHPROPERTYDETAILS.GET.URL, FETCHPROPERTYDETAILS.GET.ACTION,queryObjectForPT);

  let uuid=responseForPT && responseForPT.Properties[0]?responseForPT.Properties[0].auditDetails.lastModifiedBy:null;
  let data = {};
  let bodyObject = {
    uuid: [uuid]
  };
  let responseForUser = await getUserDataFromUuid(bodyObject);
  let lastmodifier=responseForUser && responseForUser.user[0]?responseForUser.user[0].name:null;

  try {
    httpRequest("post", FETCHRECEIPT.GET.URL, FETCHRECEIPT.GET.ACTION, receiptQueryString).then((payloadReceiptDetails) => {
     // loadUserNameData(payloadReceiptDetails.Payments[0].auditDetails.createdBy,tenantId);
      if (payloadReceiptDetails && payloadReceiptDetails.Payments && payloadReceiptDetails.Payments.length == 0) {
        console.log("Could not find any receipts");
        store.dispatch(toggleSnackbar(true, { labelName: "Receipt not Found", labelKey: "ERR_RECEIPT_NOT_FOUND" }
          , "error"));
        return;
      }
      if(payloadReceiptDetails.Payments[0].payerName!=null){
      payloadReceiptDetails.Payments[0].payerName=payloadReceiptDetails.Payments[0].payerName.trim();}
      else if(payloadReceiptDetails.Payments[0].payerName == null && payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="FIRENOC" && payloadReceiptDetails.Payments[0].paidBy !=null)
       { payloadReceiptDetails.Payments[0].payerName=payloadReceiptDetails.Payments[0].paidBy.trim();
      }
      if(payloadReceiptDetails.Payments[0].paidBy!=null)
      {
        payloadReceiptDetails.Payments[0].paidBy=payloadReceiptDetails.Payments[0].paidBy.trim();
      }


      if(payloadReceiptDetails.Payments[0].paymentDetails[0].receiptNumber.includes("MP")){
        let tax,field,cgst,sgst;
let billaccountarray=payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].billAccountDetails;

billaccountarray.map(element => {

if(element.taxHeadCode.includes("CGST")){  cgst=element.amount;}
else if(element.taxHeadCode.includes("SGST")){  sgst=element.amount;}
else if(element.taxHeadCode.includes("FIELD_FEE")){  field=element.amount;}
else  { tax=element.amount;}
});

let taxheads = {
  "tax": tax,
  "fieldfee":field,
  "cgst":cgst,
  "sgst":sgst
  }
payloadReceiptDetails.Payments[0].paymentDetails[0].additionalDetails=taxheads; 

      }

      let assessmentYear="";
      let count=0;
      if(payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="PT"){

      let reasonss = null;
      let adhocPenaltyReason=null,adhocRebateReason=null;
     if(state && get(state.screenConfiguration,"preparedFinalObject") && (get(state.screenConfiguration.preparedFinalObject,"adhocExemptionPenalty.adhocExemptionReason") || get(state.screenConfiguration.preparedFinalObject,"adhocExemptionPenalty.adhocPenaltyReason")))
        {
          adhocPenaltyReason = get(
          state.screenConfiguration.preparedFinalObject,"adhocExemptionPenalty.adhocPenaltyReason");
          adhocRebateReason = get(
          state.screenConfiguration.preparedFinalObject,"adhocExemptionPenalty.adhocExemptionReason");
          
        }
        reasonss = {
          "adhocPenaltyReason": adhocPenaltyReason,
          "adhocRebateReason":adhocRebateReason,
          "lastModifier":lastmodifier
          }
      payloadReceiptDetails.Payments[0].paymentDetails[0].bill.additionalDetails=reasonss; 

      
        payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails.map(element => {
        
        if(element.amount >0 || element.amountPaid>0)
        { count=count+1;
          let toDate=convertEpochToDate(element.toPeriod).split("/")[2];
          let fromDate=convertEpochToDate(element.fromPeriod).split("/")[2];
          assessmentYear=assessmentYear==""?fromDate+"-"+toDate+"(Rs."+element.amountPaid+")":assessmentYear+","+fromDate+"-"+toDate+"(Rs."+element.amountPaid+")";
       }});
      if(count==0){
        let index=payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails.length;
        let toDate=convertEpochToDate( payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].toPeriod).split("/")[2];
        let fromDate=convertEpochToDate( payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].fromPeriod).split("/")[2];
        assessmentYear=assessmentYear==""?fromDate+"-"+toDate:assessmentYear+","+fromDate+"-"+toDate; 
      }
        
        const details = {
          "assessmentYears": assessmentYear
          }
          payloadReceiptDetails.Payments[0].paymentDetails[0].additionalDetails=details; 

      }


      if(payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="TL"){

        configKey="tradelicense-receipt";
    
        const details = {
          "address": responseForTrade.Licenses[0].tradeLicenseDetail.address.locality.code
          }
    payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].additionalDetails=details; 


      }
    
      if(payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="FIRENOC"){

      let owners=""; let contacts="";
      response.FireNOCs[0].fireNOCDetails.applicantDetails.owners.map(ele=>{
        if(owners=="")
        {owners=ele.name; 
          contacts=ele.mobileNumber;}
        else{
          owners=owners+","+ele.name; 
          contacts=contacts+","+ele.mobileNumber;
        }

      });
      payloadReceiptDetails.Payments[0].payerName=owners;
      payloadReceiptDetails.Payments[0].mobileNumber=contacts;
      let receiptDate=convertEpochToDate(payloadReceiptDetails.Payments[0].paymentDetails[0].receiptDate);
      let year=receiptDate.split("/")[2];
      year++;
      var nextyear=year;
      year--;
      var lastyear=year-1;
      let month=receiptDate.split("/")[1];
      let from=null,to=null;
      if(month<=3){ from=convertDateToEpoch("04/01/"+lastyear);
      to=convertDateToEpoch("03/31/"+year);}
      else{from=convertDateToEpoch("04/01/"+year);
      to=convertDateToEpoch("03/31/"+nextyear);}
        const details = {
             "address": response.FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress
             }
       payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].additionalDetails=details; 
       payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].fromPeriod=from;
       payloadReceiptDetails.Payments[0].paymentDetails[0].bill.billDetails[0].toPeriod=to; 
 

    } 
    const queryStr = [
      { key: "key", value: configKey },
      { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
    ]
      // Setting the Payer and mobile from Bill to reflect it in PDF
      state = state ? state : {};
         if(payloadReceiptDetails.Payments[0].paymentMode=="CHEQUE" || payloadReceiptDetails.Payments[0].paymentMode=="DD" || payloadReceiptDetails.Payments[0].paymentMode=="OFFLINE_NEFT" || payloadReceiptDetails.Payments[0].paymentMode=="OFFLINE_RTGS" || payloadReceiptDetails.Payments[0].paymentMode=="ONLINE"){
        let ifsc = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.ifscCode", null);
        let branchName = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.branchName", null);
        let bank = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].instrument.bank.name", null);
        payloadReceiptDetails.Payments[0].ifscCode=ifsc; 
        const details = [{
           "branchName": branchName ,
          "bankName":bank }
        ]       
      payloadReceiptDetails.Payments[0].additionalDetails=details; 
    }
      let billDetails = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]", null);
      if ((billDetails && !billDetails.payerName) || !billDetails) {
        billDetails = {
          payerName: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].name", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].name", null),
          mobileNumber: get(state, "screenConfiguration.preparedFinalObject.applicationDataForReceipt.owners[0].mobile", null) || get(state, "screenConfiguration.preparedFinalObject.applicationDataForPdf.owners[0].mobile", null),
        };
      }
       if(payloadReceiptDetails.Payments[0].paymentMode=="CASH")
      {
        payloadReceiptDetails.Payments[0].instrumentDate=null;
        payloadReceiptDetails.Payments[0].instrumentNumber=null;
      }
      if (!payloadReceiptDetails.Payments[0].payerName && process.env.REACT_APP_NAME === "Citizen" && billDetails) {
        payloadReceiptDetails.Payments[0].payerName = billDetails.payerName;
        // payloadReceiptDetails.Payments[0].paidBy = billDetails.payer;
        payloadReceiptDetails.Payments[0].mobileNumber = billDetails.mobileNumber;
      }
      if((payloadReceiptDetails.Payments[0].payerName==null || payloadReceiptDetails.Payments[0].mobileNumber==null)  && payloadReceiptDetails.Payments[0].paymentDetails[0].businessService=="FIRENOC" && process.env.REACT_APP_NAME === "Citizen")
      {
        payloadReceiptDetails.Payments[0].payerName=response.FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name;
        payloadReceiptDetails.Payments[0].mobileNumber= response.FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber;
      }
      const oldFileStoreId = get(payloadReceiptDetails.Payments[0], "fileStoreId")
      if (oldFileStoreId) {
        downloadReceiptFromFilestoreID(oldFileStoreId, mode)
      }
      else {
        const propertiesById = get(state.properties , "propertiesById");
        const propertiesFound = propertiesById ? Object.values(propertiesById) : null;
        let queryData = { Payments: payloadReceiptDetails.Payments };
        if(propertiesFound) {
          queryData.properties = propertiesFound;
        }
        httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, queryData, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' });
          
      }
    })
  } catch (exception) {
    console.log('Some Error Occured while downloading Receipt!');
    store.dispatch(toggleSnackbar(true, { labelName: "Error in Receipt Generation", labelKey: "ERR_IN_GENERATION_RECEIPT" }
      , "error"));
  }
}

const moveToSuccess = (dispatch, receiptNumber,paymentDetails) => {
  const consumerCode = getQueryArg(window.location, "consumerCode");
  const tenantId = getQueryArg(window.location, "tenantId");
  const businessService = getQueryArg(window.location, "businessService");
  const status = "success";
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  dispatch(
    setRoute(
      `${appendUrl}/egov-common/acknowledgement?status=${status}&consumerCode=${consumerCode}&tenantId=${tenantId}&receiptNumber=${receiptNumber}&businessService=${businessService}`
    )
  );
};
const moveToFailure = dispatch => {
  const consumerCode = getQueryArg(window.location, "consumerCode");
  const tenantId = getQueryArg(window.location, "tenantId");
  const businessService = getQueryArg(window.location, "businessService");
  const status = "failure";
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  dispatch(
    setRoute(
      `${appendUrl}/egov-common/acknowledgement?status=${status}&consumerCode=${consumerCode}&tenantId=${tenantId}&businessService=${businessService}`
    )
  );
};
const getUserDataFromUuid = async bodyObject => {
  try {
    const response = await httpRequest(
      "post",
      "/user/_search",
      "",
      [],
      bodyObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};
const getSelectedTabIndex = paymentType => {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "CHEQUE":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};

const convertDateFieldToEpoch = (finalObj, jsonPath) => {
  const dateConvertedToEpoch = convertDateToEpoch(
    get(finalObj, jsonPath),
    "daystart"
  );
  set(finalObj, jsonPath, dateConvertedToEpoch);
};

const allDateToEpoch = (finalObj, jsonPaths) => {
  jsonPaths.forEach(jsonPath => {
    if (get(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

const updatePayAction = async (
  state,
  dispatch,
  consumerCode,
  tenantId,
  receiptNumber
) => {
  try {
    moveToSuccess(dispatch, receiptNumber);
  } catch (e) {
    moveToFailure(dispatch);
    dispatch(
      toggleSnackbar(
        true,
        { labelName: e.message, labelKey: e.message },
        "error"
      )
    );
    console.log(e);
  }
};

const callBackForPay = async (state, dispatch) => {
  let isFormValid = true;
  const isAdvancePaymentAllowed =get(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.isAdvanceAllowed");
  const roleExists = ifUserRoleExists("CITIZEN");
  if (roleExists) {
    alert("You are not Authorized!");
    return;
  }
 
  // --- Validation related -----//
  
  let selectedPaymentType = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0].instrument.instrumentType.name"
  );
  if(!selectedPaymentType){
    dispatch(prepareFinalObject("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));
    selectedPaymentType = "Cash";
  }

  const {
    selectedTabIndex,
    selectedPaymentMode,
    fieldsToValidate
  } = getSelectedTabIndex(selectedPaymentType);

  isFormValid =
    fieldsToValidate
      .map(curr => {
        return validateFields(
          `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[${selectedTabIndex}].tabContent.${selectedPaymentMode}.children.${curr}.children`,
          state,
          dispatch,
          "pay"
        );
      })
      .indexOf(false) === -1;
  if (
    get(
      state.screenConfiguration.preparedFinalObject,
      "Bill[0].billDetails[0].manualReceiptDate"
    )
  ) {
    isFormValid = validateFields(
      `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.g8Details.children.cardContent.children.receiptDetailsCardContainer.children`,
      state,
      dispatch,
      "pay"
    );
  }

  //------------ Validation End -------------//

  //------------- Form related ----------------//
  const ReceiptDataTemp = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0]"
  );
  let finalReceiptData = cloneDeep(ReceiptDataTemp);

  allDateToEpoch(finalReceiptData, [
    "Bill[0].billDetails[0].manualReceiptDate",
    "instrument.transactionDateInput"
  ]);

  // if (get(finalReceiptData, "Bill[0].billDetails[0].manualReceiptDate")) {
  //   convertDateFieldToEpoch(
  //     finalReceiptData,
  //     "Bill[0].billDetails[0].manualReceiptDate"
  //   );
  // }

  // if (get(finalReceiptData, "instrument.transactionDateInput")) {
  //   convertDateFieldToEpoch(
  //     finalReceiptData,
  //     "Bill[0].billDetails[0].manualReceiptDate"
  //   );
  // }
  if (get(finalReceiptData, "instrument.transactionDateInput")) {
    set(
      finalReceiptData,
      "instrument.instrumentDate",
      get(finalReceiptData, "instrument.transactionDateInput")
    );
  }

  if (get(finalReceiptData, "instrument.transactionNumber")) {
    set(
      finalReceiptData,
      "instrument.instrumentNumber",
      get(finalReceiptData, "instrument.transactionNumber")
    );
  }

  if (selectedPaymentType === "Card") {
    //Extra check - remove once clearing forms onTabChange is fixed
    if (
      get(finalReceiptData, "instrument.transactionNumber") !==
      get(finalReceiptData, "instrument.transactionNumberConfirm")
    ) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Transaction numbers don't match !",
            labelKey: "ERR_TRANSACTION_NO_DONT_MATCH"
          },
          "error"
        )
      );
      return;
    }
  }

  //------------- Form End ----------------//

  let ReceiptBody = {
    Receipt: []
  };
  let ReceiptBodyNew = {
    Payment: { paymentDetails: [] }
  };

  ReceiptBody.Receipt.push(finalReceiptData);
  const totalAmount = Number(finalReceiptData.Bill[0].totalAmount);

  ReceiptBodyNew.Payment["tenantId"] = finalReceiptData.tenantId;
  ReceiptBodyNew.Payment["totalDue"] = totalAmount;

  ReceiptBodyNew.Payment["paymentMode"] =
    finalReceiptData.instrument.instrumentType.name;
  ReceiptBodyNew.Payment["paidBy"] = finalReceiptData.Bill[0].paidBy;
  ReceiptBodyNew.Payment["mobileNumber"] =
    finalReceiptData.Bill[0].payerMobileNumber;
    if(finalReceiptData.Bill[0].consumerCode.includes("UC"))
    {    ReceiptBodyNew.Payment["payerName"] = finalReceiptData.Bill[0].payerName;
  }else{
    ReceiptBodyNew.Payment["payerName"] = finalReceiptData.Bill[0].paidBy?finalReceiptData.Bill[0].paidBy:(finalReceiptData.Bill[0].payerName||finalReceiptData.Bill[0].payer);}
    if(finalReceiptData.instrument.transactionNumber){
    ReceiptBodyNew.Payment["transactionNumber"] =
      finalReceiptData.instrument.transactionNumber;
  }
  if(finalReceiptData.instrument.instrumentNumber){
    ReceiptBodyNew.Payment["instrumentNumber"] =
      finalReceiptData.instrument.instrumentNumber;
  }
  if( finalReceiptData.instrument.instrumentDate){
    ReceiptBodyNew.Payment["instrumentDate"] =
        finalReceiptData.instrument.instrumentDate;
  }
  if( finalReceiptData.instrument.instrumentType.name != "Cash" && finalReceiptData.instrument.ifscCode){
    ReceiptBodyNew.Payment["ifscCode"] =
        finalReceiptData.instrument.ifscCode;

        const details = [{
          "branchName": finalReceiptData.instrument.branchName ,
         "bankName":finalReceiptData.instrument.bank.name }]
       
       ReceiptBodyNew.Payment["additionalDetails"] =details;
      
  }

  let amtPaid =
    state.screenConfiguration.preparedFinalObject.AmountType ===
    "partial_amount"
      ? state.screenConfiguration.preparedFinalObject.AmountPaid
      : finalReceiptData.Bill[0].totalAmount;
  amtPaid = amtPaid ? Number(amtPaid) : totalAmount;


  if(amtPaid>totalAmount&&!isAdvancePaymentAllowed){
    alert("Advance Payment is not allowed");
    return;
  }

  ReceiptBodyNew.Payment.paymentDetails.push({
    manualReceiptDate:
      finalReceiptData.Bill[0].billDetails[0].manualReceiptDate,
    manualReceiptNumber:
      finalReceiptData.Bill[0].billDetails[0].manualReceiptNumber,
    businessService: finalReceiptData.Bill[0].businessService,
    billId: finalReceiptData.Bill[0].id,
    totalDue: totalAmount,
    totalAmountPaid: amtPaid
  });
  ReceiptBodyNew.Payment["totalAmountPaid"] = amtPaid;

  //---------------- Create Receipt ------------------//
  if (isFormValid) {
    const buttonJsonpath = paybuttonJsonpath + `${process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"}`;
    dispatch(handleField("pay", buttonJsonpath, "props.disabled", true));
    try {
      let response = await httpRequest(
        "post",
        "collection-services/payments/_create",
        "_create",
        [],
        ReceiptBodyNew,
        [],
        {}
      );
      const receiptQueryString = [
        {
          key: "receiptNumbers",
          value: response.Payments[0].paymentDetails[0].receiptNumber
        },
        {
          key: "tenantId",
          value: response.Payments[0].tenantId
                  }
      ];
      const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
      const receiptKey = get(uiCommonPayConfig, "receiptKey");
      download(receiptQueryString,"download",receiptKey,state);
      let receiptNumber = get(
        response,
        "Payments[0].paymentDetails[0].receiptNumber",
        null
      );

      let  paymentDetails= get(
        response,
        "Payments[0]",
        null
      );
      
      dispatch(setPaymentDetails(paymentDetails))

      // Search NOC application and update action to PAY
      const consumerCode = getQueryArg(window.location, "consumerCode");
      const tenantId = getQueryArg(window.location, "tenantId");
      await updatePayAction(
        state,
        dispatch,
        consumerCode,
        tenantId,
        receiptNumber,
        paymentDetails
      );
    } catch (e) {
      dispatch(handleField("pay", buttonJsonpath, "props.disabled", false));
      dispatch(
        toggleSnackbar(
          true,
          { labelName: e.message, labelKey: e.message },
          "error"
        )
      );
      console.log(e);
    }
  } else {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill all the mandatory fields",
          labelKey: "ERR_FILL_ALL_FIELDS"
        },
        "warning"
      )
    );
  }
};

export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const footer = getCommonApplyFooter({
  generateReceipt: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className:"gen-receipt-com",
      // style: {
      //   width: "379px",
      //   height: "48px ",
      //   right: "19px ",
      //   position: "relative",
      //   borderRadius: "0px "
      // }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "GENERATE RECEIPT",
        labelKey: "COMMON_GENERATE_RECEIPT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   roles: ["NOC_CEMP"],
    //   action: "PAY"
    // },
    
    visible: JSON.parse(window.localStorage.getItem('isPOSmachine')) ? false : true,
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,

  },

  posButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "379px",
        height: "48px ",
        right: "19px ",
        position: "relative",
        borderRadius: "0px "
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "POS COLLECT",
        // labelKey: "UC_BUTTON_POS_COLLECT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        dispatch(toggleSpinner());
        window.posOnSuccess=(posResponse={})=>{
          // dispatch(toggleSpinner());
          callBackForPay(state,dispatch)
        }

        window.posOnFailure=(posResponse={})=>
        {
          dispatch(toggleSpinner());
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Payment failure",
                // labelKey: "ERR_FILL_POS_PAYMENT_FAILURE"
              },
              "danger"
            )
          );
        }
        const paymentData={
          instrumentType:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].instrument.instrumentType.name"
          ),
          paymentAmount:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].instrument.amount"
          ),
          customerName:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].paidBy"
          ),
          customerMobile:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].payerMobileNumber"
          ),
          message:"Pos payment",
          emailId:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].payerEmail"
          ),
          amountDetails:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].billDetails"
          ),
          billNumber:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].billDetails[0].billNumber"
          ),
          consumerCode:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].billDetails[0].consumerCode"
          ),
          businessService:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].Bill[0].billDetails[0].businessService"
          ),
          collectorName:"",
          collectorId:"",
          instrumentDate:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].instrument.instrumentDate"
          ),
          instrumentNumber:get(
            state.screenConfiguration.preparedFinalObject,
            "ReceiptTemp[0].instrument.instrumentNumber"
          )
        }
        try {
          window.mSewaApp && window.mSewaApp.sendPaymentData("paymentData",JSON.stringify(paymentData));
        } catch (e) {
          console.log(e);
        }
      }
    },
    visible: process.env.REACT_APP_NAME === "Citizen" || !JSON.parse(window.localStorage.getItem('isPOSmachine')) ? false : true
  },
  makePayment: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className:"make-payment-com",
      // style: {
      //   width: "363px",
      //   height: "48px ",
      //   right: "19px",
      //   position: "relative",
      //   borderRadius: "0px "
      // }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "MAKE PAYMENT",
        labelKey: "COMMON_MAKE_PAYMENT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right",
          className: ""
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callPGService
    },
    // roleDefination: {
    //   rolePath: "user-info.roles",
    //   roles: ["CITIZEN"],
    //   action: "PAY"
    // },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
  }
});
//--------RazorPay checkout function-------------//
function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

async function displayRazorpay(getOrderData) {
const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
);

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}

function getQueryVariable(variable)
{
  const query = get(getOrderData, "Transaction.redirectUrl");
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
         }
         return(false);
}
const options = {
    key: getQueryVariable('merchant_key'),
    amount: get(getOrderData, "Transaction.txnAmount")*100,
    //currency: getQueryVariable('currency'),
    name: "mSeva | Punjab",
    description: "Live Transaction",
    image: "https://mseva.lgpunjab.gov.in/citizen/browser-icon.png",
    order_id: getQueryVariable('orderId'),
    handler: async function (response) {
        const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };

      window.location = get(getOrderData, "Transaction.callbackUrl")+"&razorpayPaymentId="+data.razorpayPaymentId+"&razorpayOrderId="+data.razorpayOrderId+"&razorpaySignature="+data.razorpaySignature;
    },
    prefill: {
        name: get(getOrderData, "Transaction.user.userName"),
        email: get(getOrderData, "Transaction.user.emailId"),
        contact: get(getOrderData, "Transaction.user.mobileNumber"),
    },
    theme: {
        color: "#61dafb",
    },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
}
