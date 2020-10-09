import {
    getCommonHeader,
    getCommonCard,
    getCommonGrayCard,
    getCommonTitle,
    getCommonSubHeader,
    getTextField,
    getLabelWithValue,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
  import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
  import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
  import get from "lodash/get";
  import set from "lodash/set";
  import { getFeesEstimateCard,
           convertEpochToDate, 
           getCommonApplyFooter } from "../utils";
  import { httpRequest } from "../../../../ui-utils";
  import {
    prepareFinalObject,
    handleScreenConfigurationFieldChange as handleField,
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import orderBy from "lodash/orderBy";
  import { getCommonPayUrl } from "egov-ui-framework/ui-utils/commons";
  import { download, downloadBill } from "egov-common/ui-utils/commons";
  import { getChallanSearchResult } from "../../../../ui-utils/commons";
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
   dispatch(prepareFinalObject("challan[0]", challanresponse.challans[0]));
   const isActive = get(state.screenConfiguration.preparedFinalObject , "challan[0].applicationStatus"); 
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
 }

  }
  const beforeInitFn = async (action, state, dispatch, applicationNumber) => {
    let tenantId = getQueryArg(window.location.href, "tenantId");
    let businessService = getQueryArg(window.location.href, "businessService");
    let challanNo = getQueryArg(window.location.href, "applicationNumber");
    searchResults(action, state, dispatch, applicationNumber)
    const headerrow = getCommonContainer({
      header: getCommonHeader({
        labelName: "Challan Number:",
        labelKey: "UC_CHALLAN_NUMBER",
      }),
      challanNumberContainer: getCommonContainer({
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
      }),
    });
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.header1.children.headertop",
      headerrow
    );
    fetchBill(
      action,
      state,
      dispatch,
      applicationNumber,
      tenantId,
      businessService
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
            labelKey: "TL_COMMON_OWN_DETAILS",
          }),
        },
      },
    },
    viewTwo: getCommonContainer({
      consumerName: getLabelWithValue(
        {
          labelName: "Consumer Name",
          labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL",
        },
  
        { jsonPath: "Demands[0].consumerName" }
      ),
      consumerAddress: getLabelWithValue(
        {
          labelName: "Consumer Address",
          labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL",
        },
  
        { jsonPath: "Demands[0].consumerAddress" }
      ),
      consumerMobileNo: getLabelWithValue(
        {
          labelName: "Mobile No",
          labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL",
        },
  
        { jsonPath: "Demands[0].mobileNumber" }
      ),
    }),
  });
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
            labelKey: "UC_COMMON_SERVICE_DETAILS",
          }),
        },
      },
    },
    viewOne: getCommonContainer({
      serviceName: getLabelWithValue(
        {
          labelName: "Service Name",
          labelKey: "UC_SERVICE_NAME_LABEL",
        },
  
        {
          jsonPath: "Demands[0].businessService",
          localePrefix: {
            moduleName: "BillingService",
            masterName: "BusinessService",
          },
        }
      ),
      categoryName: getLabelWithValue(
        {
          labelName: "Service Category",
          labelKey: "UC_SERVICE_CATEGORY_LABEL",
        },
  
        {
          jsonPath: "Demands[0].serviceType",
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
  
        { jsonPath: "Demands[0].taxPeriodFrom", callBack: convertEpochToDate }
      ),
      toDate: getLabelWithValue(
        {
          labelName: "Tp Date",
          labelKey: "UC_TO_DATE_LABEL",
        },
  
        { jsonPath: "Demands[0].taxPeriodTo", callBack: convertEpochToDate }
      ),
    }),
  });
  
  export const callBackForPay = (state, dispatch) => {
    getCommonPayUrl(dispatch, applicationNumber, tenantId, businessService);
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
        key: "businessService",
        value: billBusinessService,
      },
    ];
    const fetchBillResponse = await getBill(getBillQueryObj);
    let payload1 =
      fetchBillResponse && fetchBillResponse.Bill && fetchBillResponse.Bill[0];
     const isPAID = payload1.totalAmount == 0 ? true : false;
    // // let estimateData = payload;
   let payload = isPAID? await getReceipt(getBillQueryObj.filter(item => item.key !== "businessService"))
    : fetchBillResponse && fetchBillResponse.Bill && fetchBillResponse.Bill[0];
  
    let estimateData =isPAID? payload && payload.Payments && payload.Payments.length > 0 && formatTaxHeaders(payload.Payments[0].paymentDetails[0].bill.billDetails[0]): formatTaxHeaders(payload.billDetails[0]);
    //let estimateData = formatTaxHeaders(payload.billDetails[0]);
  
    set(estimateData, "payStatus", isPAID);
    dispatch(
      handleField(
        "search-preview",
        "components.div.children.preview.children.cardContent.children.footer.children.payButton",
        "visible",
        !isPAID
      )
    );
    dispatch(prepareFinalObject("Bill[0]", payload));
    dispatch(prepareFinalObject("Demands[0].estimateCardData", estimateData));
    const showDownloadMenu = downloadprintMenu(state,consumerCode,tenantId);
    set(
      action.screenConfig,
      "components.div.children.headerDiv.children.helpSection.children",
      showDownloadMenu
    )
  
  };
  export const getBill = async (queryObject) => {
    try {
      const response = await httpRequest(
        "post",
        "/billing-service/bill/v2/_fetchbill",
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
    const isPaid = get(state.screenConfiguration.preparedFinalObject , "Demands[0].estimateCardData.payStatus");
    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
    const receiptKey = get(uiCommonPayConfig, "receiptKey")
    let receiptDownloadObject = {
      label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
      link: () => {
        const receiptQueryString = [
          { key: "consumerCodes", value: applicationNumber },
          { key: "tenantId", value: tenantId }
        ]
        download(receiptQueryString , "download" ,receiptKey,state );
        // generateReceipt(state, dispatch, "receipt_download");
      },
      leftIcon: "receipt"
    };
  
    let receiptPrintObject = {
      label: { labelName: "PRINT RECEIPT", labelKey: "COMMON_PRINT_RECEIPT" },
      link: () => {
          const receiptQueryString = [
              { key: "consumerCodes", value: applicationNumber },
              { key: "tenantId", value: tenantId }
          ]
          download(receiptQueryString  ,"print" , receiptKey ,state);
      },
      leftIcon: "receipt"
    };
    let applicationDownloadObject = {
      label: { labelName: "Challan", labelKey: "COMMON_CHALLAN" },
      link: () => {
        const receiptQueryString = [
          {
            key: 'consumerCode',
            value: applicationNumber
          },
          { key: 'tenantId', value: tenantId },
          {
            key: "businessService", value: businessService
          }
      ]
        //downloadBill(applicationNumber,tenantId);
      },
      leftIcon: "assignment"
    };
    let applicationPrintObject = {
      label: { labelName: "Challan", labelKey: "TL_APPLICATION" },
      link: () => {
        const { Licenses,LicensesTemp } = state.screenConfiguration.preparedFinalObject;
        const documents = LicensesTemp[0].reviewDocData;
        set(Licenses[0],"additionalDetails.documents",documents)
        downloadAcknowledgementForm(Licenses,'print');
      },
      leftIcon: "assignment"
    };
  
  
    if(isPaid){
    downloadMenu=[receiptDownloadObject,applicationDownloadObject];
    printMenu = [receiptPrintObject];
    }
    else{
      //Download challan option
      downloadMenu=[applicationDownloadObject];
    }
    return{
      test1:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "downloadprint-commonmenu",
        style: { textAlign: "right", display: "flex" },
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
                style: { height: "60px", color: "#FE7A51" },
                className: "tl-download-button",
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
                className: "tl-print-button",
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
      const businessService = getQueryArg(
        window.location.href,
        "businessService"
      );
     
      dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
      //To set the application no. at the  top
      set(
        action.screenConfig,
        "components.div.children.headerDiv.children.header1.children.headertop.children.challanNumberContainer.children.challanNumber",
        applicationNumber
      );
      
      //downloadprintMenu(state,applicationNumber,tenantId),
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
                  sm: 8,
                },
  
                ...headerrow,
              },
  
              helpSection: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                props: {
                  color: "primary",
                  style: { justifyContent: "flex-end" }
                },
                gridDefination: {
                  xs: 12,
                  sm: 4,
                  align: "right"
                }
              }
            //  downloadSection,
              // helpSection: {
              //   uiFramework: "custom-atoms",
              //   componentPath: "Div",
              //   props: {
              //     className: "downloadprint-commonmenu",
              //     style: { textAlign: "right", display: "flex" },
              //   },
              //   children: {
              //     downloadMenu: {
              //       uiFramework: "custom-molecules",
              //       componentPath: "DownloadPrintButton",
              //       props: {
              //         data: {
              //           label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
              //           leftIcon: "cloud_download",
              //           rightIcon: "arrow_drop_down",
              //           props: {
              //             variant: "outlined",
              //             style: { height: "60px", color: "#FE7A51" },
              //             className: "tl-download-button",
              //           },
              //           menu: downloadMenu,
              //         },
              //       },
              //     },
              //     printMenu: {
              //       uiFramework: "custom-molecules",
              //       componentPath: "DownloadPrintButton",
              //       props: {
              //         data: {
              //           label: { labelName: "PRINT", labelKey: "TL_PRINT" },
              //           leftIcon: "print",
              //           rightIcon: "arrow_drop_down",
              //           props: {
              //             variant: "outlined",
              //             style: { height: "60px", color: "#FE7A51" },
              //             className: "tl-print-button",
              //           },
              //           menu: printMenu,
              //         },
              //       },
              //     },
              //   },
              // },
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
                  style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "16px",
                    borderRadius: "inherit",
                  },
                },
                children: {
                  cancelButtonIcon: {
                    uiFramework: "custom-atoms",
                    componentPath: "Icon",
                    props: {
                      iconName: "keyboard_arrow_left",
                    },
                  },
                  cancelButtonLabel: getLabel({
                    labelName: "Cancel Challan",
                    labelKey: "CHALLAN_CANCEL_BUTTON",
                  }),
                },
  
                visible: false,
              },
              editButton: {
                componentPath: "Button",
                props: {
                  variant: "contained",
                  color: "primary",
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
                    labelKey: "CHALLAN_EDIT_BUTTON",
                  }),
                },
                onClickDefination: {
                  action: "condition",
                  //callBack: callBackForPay,
                },
                 visible: false
              },
            }),
          }),
        },
      },
    },
  };
  
  export default screenConfig;
  