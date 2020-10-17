import {
    getCommonHeader,
    getCommonCard,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabelWithValue,
    getCommonContainer,
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
  import { getLocale,getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import get from "lodash/get";
  import set from "lodash/set";
  import { getFeesEstimateCard,
           convertEpochToDate, 
           getCommonApplyFooter,
           } from "../utils";

  import { httpRequest } from "../../../../ui-utils";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField,
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import orderBy from "lodash/orderBy";
  import { getCommonPayUrl } from "egov-ui-framework/ui-utils/commons";
  import { download } from "egov-common/ui-utils/commons";
  import { getChallanSearchResult } from "../../../../ui-utils/commons";
  import { confirmationDialog } from "./confirmationDialog";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import './index.css';
  import {  downloadChallan } from "egov-common/ui-utils/commons";

  let applicationNumber = getQueryArg(window.location.href, "applicationNumber");
  let tenantId = getQueryArg(window.location.href, "tenantId");
  let businessService = getQueryArg(window.location.href, "businessService");
  const searchResults = async (action, state, dispatch) => {

    let tenantId = getQueryArg(window.location.href, "tenantId");
    let businessService = getQueryArg(window.location.href, "businessService");
    let challanNo = getQueryArg(window.location.href, "applicationNumber");
    let queryObject = [];
    queryObject = [
     {
       key: "tenantId",
       value: tenantId
     },
     {
       key: "challanNo",
       value: challanNo
     },
     {
    key: "businessService", 
     value: businessService
   }
   
   ];


   const challanresponse = await getChallanSearchResult(queryObject);
   dispatch(prepareFinalObject("Challan", challanresponse.challans[0]));
   const isActive = get(state.screenConfiguration.preparedFinalObject , "Challan.applicationStatus"); 
   if(isActive==="ACTIVE"){
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.preview.children.cardContent.children.footer.children.cancelButton",
          "visible",
          true
        )
      );
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.preview.children.cardContent.children.footer.children.editButton",
          "visible",
          true
        )
      );
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment",
          "visible",
          false
        )
      );
    }
    
    else if(isActive==="CANCELLED"){
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment",
          "visible",
          true
        )
      );
    }
    else{
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment",
          "visible",
          false
        )
      ); 
    }
    
    fetchBill(
      action,
      state,
      dispatch,
      challanNo,
      tenantId,
      businessService
    );
  }
  const beforeInitFn = async (action, state, dispatch, applicationNumber) => {
    let tenantId = getQueryArg(window.location.href, "tenantId");
    let businessService = getQueryArg(window.location.href, "businessService");
    let challanNo = getQueryArg(window.location.href, "applicationNumber");
    searchResults(action, state, dispatch, applicationNumber)
    const headerrow = getCommonContainer({
      header: getCommonHeader({
        labelName: "Challan Details:",
        labelKey: "CHALLAN_DETAILS",
      }),
      //challanNumberContainer: getCommonContainer({
        challanNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-uc",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber,
            label: {
              labelKey:   "PAYMENT_UC_CONSUMER_CODE",
          },
          },
        },
        helpSection: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            color: "primary",
            style: { justifyContent: "flex-end" }
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            align: "right"
          }
        }
      //}),
    });
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.headertop",
      headerrow
    );

    
    
  };
  const estimate = getCommonGrayCard({
    estimateSection: getFeesEstimateCard({
      sourceJsonPath: "Demands[0].estimateCardData",
    }),
  });
  
  const userDetails = getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" },
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10,
          },
          ...getCommonSubHeader({
            labelName: "Consumer Details",
            labelKey: "CONSUMERDETAILS",
          }),
        },
      },
    },
    viewTwo: getCommonContainer({
      consumerName: getLabelWithValue(
        {
          labelName: "Consumer Name",
          labelKey: "UC_CONS_NAME_LABEL",
        },
  
        { jsonPath: "Challan.citizen.name" }
      ),
      consumerMobileNo: getLabelWithValue(
        {
          labelName: "Mobile No",
          labelKey: "UC_MOBILE_NO_LABEL",
        },
  
        { jsonPath: "Challan.citizen.mobileNumber" }
      ),
      ConsumerHouseNo:getLabelWithValue(
         {
          labelName: "Door/House No.",
          labelKey: "UC_DOOR_NO_LABEL"
        },
        { jsonPath: "Challan.address.doorNo" }
      ),
      ConsumerBuilidingName:getLabelWithValue(
        {
         labelName: "Building/Colony Name",
         labelKey: "UC_BLDG_NAME_LABEL"
       },
       { jsonPath: "Challan.address.buildingName" }
     ),
     ConsumerStreetName:getLabelWithValue(
      {
       labelName: "Street Name",
       labelKey: "UC_SRT_NAME_LABEL"
     },
     { jsonPath: "Challan.address.street" }
   ),
   ConsumerLocMohalla:getLabelWithValue(
     {
    
      labelName: "Mohalla",
      labelKey: "UC_MOHALLA_LABEL"
    },
    {
    jsonPath: "Challan.address.locality.code" ,
    localePrefix: {
      moduleName: getQueryArg(window.location.href, "tenantId") ? getQueryArg(window.location.href, "tenantId").replace('.', '_').toUpperCase() : getTenantId().replace('.', '_').toUpperCase(),
      masterName: "REVENUE"
    },callBack: checkValueForNA
    }
   )


    }),
  });

  export const checkChallanStatus = value => {
    console.info("value==",value);
    return value==="CANCELLED" ? value : "NA";
  };

  export const checkValueForNA = value => {
    return value ? value : "NA";
  };
  const headerrow = getCommonContainer({});
  
  
  
  
  const serviceDetails = getCommonGrayCard({
   
    headerDiv1: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" },
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10,
          },
          ...getCommonSubHeader({
            labelName: "Service Details",
            labelKey: "SERVICEDETAILS",
          }),
        },
      },
    },
    viewOne: getCommonContainer({
      serviceName: getLabelWithValue(
        {
          labelName: "Service Name",
          labelKey: "UC_SERVICE_CATEGORY_LABEL",
        },
  
        {
          jsonPath: "Challan.businessService",
          localePrefix: {
            moduleName: "BillingService",
            masterName: "BusinessService",
          },
        }
      ),
    
      fromDate: getLabelWithValue(
        {
          labelName: "From Date",
          labelKey: "UC_FROM_DATE_LABEL",
        },
  
        { jsonPath: "Challan.taxPeriodFrom", callBack: convertEpochToDate }
      ),
      toDate: getLabelWithValue(
        {
          labelName: "Tp Date",
          labelKey: "UC_TO_DATE_LABEL",
        },
  
        { jsonPath: "Challan.taxPeriodTo", callBack: convertEpochToDate }
      ),
      
       applicationStatus: getLabelWithValue(
        {
          labelName: "Application Status",
          labelKey: "CS_INBOX_STATUS_FILTER",
        },
  
        {
          jsonPath: "Challan.applicationStatus",
         
        }
      ),
      cancellComment:getLabelWithValue(
        
        {
          labelName: "Reason for Cancellation",
          labelKey: "UC_CANCELL_COMMENT",
        },
  
        {
          jsonPath: "Challan.additionalDetail.cancellComment",
          callBack: checkValueForNA
        }
       
      ),

    }),
  });
  
 

  export const callBackForPay = (state, dispatch) => {
    getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
  };

  export const showHideConfirmationPopup = (state, dispatch) => {
    let toggle = get(
      state.screenConfiguration.screenConfig["search-preview"],
     "components.div.children.preview.children.cardContent.children.footer.children.cancelConfirmationDialog.props.open",
     false
   );
   dispatch(
     handleField("search-preview", "components.div.children.preview.children.cardContent.children.footer.children.cancelConfirmationDialog", "props.open", !toggle)
   );
 };

 export const cancelChallan = async(state,dispatch,status) =>{
  var operation="cancel";
  let estimateData = get(state.screenConfiguration.preparedFinalObject , "Demands[0].estimateCardData");
  estimateData && estimateData.forEach((item, index) => {
    dispatch(
      prepareFinalObject(`Challan.amount[${index}].taxHeadCode`, item.info.labelName)
    );
    dispatch(
      prepareFinalObject(`Challan.amount[${index}].amount`, item.value)
    );
    });
  const challan = get(state.screenConfiguration.preparedFinalObject , "Challan");
  challan.applicationStatus = status;
 
  try{
    if(challan!=null){
      const payload = await httpRequest("post", "/echallan-services/eChallan/v1/_update", "", [], {
        Challan: challan
      });
      if (payload.challans.length > 0) {
        const consumerCode = get(payload, "challans[0].challanNo");
        const businessService = get(payload, "challans[0].businessService");
        dispatch(setRoute(`/uc/acknowledgement?purpose=${operation}&status=success&tenantId=${getTenantId()}&serviceCategory=${businessService}&challanNumber=${consumerCode}`));
      } else {
        console.info("some error  happened while cancelling challan");
        dispatch(setRoute(`/uc/acknowledgement?purpose=${operation}&status=failure`));
      }
    }
  }catch(e){
    console.error("error:::"+e);
    dispatch(setRoute(`/uc/acknowledgement?purpose=${operation}&status=failure`));
  }
}

 const openUpdateForm = (state, dispatch) => {
  let tenantId = getQueryArg(window.location.href, "tenantId");
  let businessService = getQueryArg(window.location.href, "businessService");
  let consumerCode = getQueryArg(window.location.href, "applicationNumber");
  window.location.href = `/uc/newCollection?consumerCode=${consumerCode}&tenantId=${tenantId}&businessService=${businessService}`;
};
  
  const formatTaxHeaders = (billDetail = {}) => {
    let formattedFees = [];
    const { billAccountDetails = [] } = billDetail;
    const billAccountDetailsSorted = orderBy(
      billAccountDetails,
      ["amount"],
      ["asce"]
    );
    
    formattedFees = billAccountDetailsSorted.map((taxHead) => {
      return {
        info: {
          labelKey: taxHead.taxHeadCode,
          labelName: taxHead.taxHeadCode,
        },
        name: {
          labelKey: taxHead.taxHeadCode,
          labelName: taxHead.taxHeadCode,
        },
        value: taxHead.amount,
      };
    });
    formattedFees.reverse();
    return formattedFees;
  };
  //const showDownloadMenu;
  const fetchBill = async (
    action,
    state,
    dispatch,
    consumerCode,
    tenantId,
    billBusinessService
  ) => {
    const getBillQueryObj = [
      { key: "tenantId", value: tenantId },
      {
        key: "consumerCode",
        value: consumerCode,
      },
      {
        key: "service",
        value: billBusinessService,
      },
    ];
    const queryObj = [
      { key: "tenantId", value: tenantId },
      {
        key: "consumerCodes",
        value: consumerCode
      },
      {
        key: "businessService",
        value: billBusinessService
      }
    ];
    const fetchBillResponse = await getBill(getBillQueryObj);
    let payload1 =
      fetchBillResponse && fetchBillResponse.Bill && fetchBillResponse.Bill[0];
     const isPAID = payload1.totalAmount == 0 ? true : false;
   
    let payload = isPAID? await getReceipt(queryObj.filter(item => item.key !== "businessService"))
                            : fetchBillResponse && fetchBillResponse.Bill && fetchBillResponse.Bill[0];
    let estimateData =isPAID? payload && payload.Payments && payload.Payments.length > 0 && formatTaxHeaders(payload.Payments[0].paymentDetails[0].bill.billDetails[0]): formatTaxHeaders(payload.billDetails[0]);
    const challanStatus = get(state.screenConfiguration.preparedFinalObject , "Challan.applicationStatus",null);
    //Set paystatus = true for PAID for active and cancelled as false. Used in search-preveiw to display paid/not paid
    set(estimateData, "payStatus", challanStatus==="PAID"?true:false);
    dispatch(prepareFinalObject("Bill[0]", payload));
    dispatch(prepareFinalObject("Demands[0].estimateCardData", estimateData));
    const showDownloadMenu = downloadprintMenu(state,consumerCode,tenantId);
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.headertop.children.helpSection.children",
      showDownloadMenu
    )
    
     

  };
  export const getBill = async (queryObject) => {
    try {
      const response = await httpRequest(
        "post",
        "/billing-service/bill/v2/_search",
        "",
        queryObject
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getReceipt = async queryObject => {
    try {
      const response = await httpRequest(
        "post",
        "/collection-services/payments/_search",
        "",
        queryObject
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const downloadprintMenu=(state,applicationNumber,tenantId)=>{
    let downloadMenu = [];
      let printMenu = [];
    const isPaid = get(state.screenConfiguration.preparedFinalObject , "Challan.applicationStatus",null);
    console.info("isPaid----",isPaid);
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
    const receiptKey = get(uiCommonPayConfig, "receiptKey")
    let receiptDownloadObject = {
      label: { labelName: "Receipt", labelKey: "UC_RECEIPT" },
      link: () => {
        const receiptQueryString = [
          { key: "billIds", value: get(state.screenConfiguration.preparedFinalObject , "Bill[0].id") },
          { key: "tenantId", value: tenantId }
        ]
        download(receiptQueryString , "download" ,receiptKey,state );
        
      },
      leftIcon: "receipt"
    };
  
    let receiptPrintObject = {
      label: { labelName: "PRINT RECEIPT", labelKey: "UC_RECEIPT" },
      link: () => {
          const receiptQueryString = [
              { key: "billIds", value:  get(state.screenConfiguration.preparedFinalObject , "Bill[0].id")  },
              { key: "tenantId", value: tenantId }
          ]
          download(receiptQueryString  ,"print" , receiptKey ,state);
      },
      leftIcon: "receipt"
    };
    let applicationDownloadObject = {
      label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
      link: () => {
        const receiptQueryString = [
          {
            key: 'challanNo',
            value: applicationNumber
          },
          { key: 'tenantId', value: tenantId }
      ]
        downloadChallan(receiptQueryString,"download");
      },
      leftIcon: "assignment"
    };
    let applicationPrintObject = {
      label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
      link: () => {
        const receiptQueryString = [
          {
            key: 'challanNo',
            value: applicationNumber
          },
          { key: 'tenantId', value: tenantId }
      ]
        downloadChallan(receiptQueryString,'print');
      },
      leftIcon: "assignment"
    };
  
    
    if(isPaid==="PAID"){
      downloadMenu=[applicationDownloadObject,receiptDownloadObject];
      printMenu = [applicationPrintObject,receiptPrintObject];
    }
    else{
      //Download challan option
      console.info("download challan");
      downloadMenu=[applicationDownloadObject];
      printMenu = [applicationPrintObject];
    }
    return{
      test1:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "downloadprint-commonmenu",
        style: { textAlign: "right", display: "flex",paddingTop: "10px" },
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: { height: "60px", color: "#FE7A51" ,
                marginRight: "5px" },
                className: "uc-download-button",
              },
              menu: downloadMenu,
            },
          },
        },
        printMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "TL_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: { height: "60px", color: "#FE7A51" },
                className: "uc-print-button",
              },
              menu: printMenu,
            },
          },
        },
      },
  
    }
    }
  
  
  
  }
  
  const screenConfig = {
    uiFramework: "material-ui",
    name: "search-preview",
    beforeInitScreen: (action, state, dispatch) => {
      applicationNumber = getQueryArg(window.location.href, "applicationNumber");
      const tenantId = getQueryArg(window.location.href, "tenantId");
      dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
      beforeInitFn(action, state, dispatch, applicationNumber);
  
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css search-preview",
        },
  
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header1: {
                gridDefination: {
                  xs: 12,
                  sm: 12,
                },
  
                ...headerrow,
              },
  
              
            
            },
          },
  
          preview: getCommonCard({
            estimate,
            serviceDetails,
            userDetails,
            footer: getCommonApplyFooter({
              cancelButton: {
                componentPath: "Button",
                props: {
                  variant: "outlined",
                  color: "primary",
                  className:"gen-challan-btn",
                  style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "16px",
                    borderRadius: "inherit",
                  },
                },
                children: {
                  cancelButtonLabel: getLabel({
                    labelName: "Cancel Challan",
                    labelKey: "UC_CANCEL_CHALLAN",
                  }),
                },
                onClickDefination: {
                  action: "condition",
                  callBack: (state, dispatch) => {
                    showHideConfirmationPopup(state, dispatch);
                  }
                
                },
                visible: false,
              },
              editButton: {
                componentPath: "Button",
                props: {
                  variant: "contained",
                  color: "primary",
                  className:"gen-challan-btn",
                  style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "16px",
                    borderRadius: "inherit",
                  },
                },
                children: {
                  editButtonLabel: getLabel({
                    labelName: "Edit Challan",
                    labelKey: "UC_UPDATE_CHALLAN",
                  }),
                },
                onClickDefination: {
                  action: "condition",
                  //callBack: callBackForPay,
                },
                 visible: false,
                 onClickDefination: {
                  action: "condition",
                  callBack: (state, dispatch) => {
                    openUpdateForm(state, dispatch);
                  }
                
                },
              },
              cancelConfirmationDialog: {
                componentPath: "Dialog",
                props: {
                  open: false,
                  maxWidth: "sm"
                },
                children: {
                  dialogContent: {
                    componentPath: "DialogContent",
                    props: {
                      classes: {
                        root: "city-picker-dialog-style"
                      }
                      // style: { minHeight: "180px", minWidth: "365px" }
                    },
                    children: {
                      popup: confirmationDialog
                    }
                  }
                }
              },
            }),
          }),
        },
      },
    },
  };
  
  export default screenConfig;
  