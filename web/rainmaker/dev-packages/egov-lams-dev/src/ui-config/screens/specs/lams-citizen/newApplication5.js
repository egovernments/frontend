import {
  getCommonCardWithHeader,
  getLabel,
  getCommonContainer, 
  getSelectField,
  getCommonHeader, 
  getCommonCard, 
  getCommonTitle ,
  getLabelWithValue ,
  getTextField,
  getPattern,
  getDivider,
  getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import {getMdmsData, loadMdmsData,
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";

import {download} from "egov-common/ui-utils/commons"
import React from "react";
import acknowledgementCard from "./acknowledgementUtils";


const getData = async (action, state, dispatch, tenantId) => {
  await getMdmsData(action, state, dispatch);
  dispatch(
    prepareFinalObject(
      "Test",
      tenantId+"test"
    )
  );
  dispatch(
    prepareFinalObject(
      "Lease",
      [{}]
    )
  );

  dispatch(
    prepareFinalObject(
      "Licenses[0].tradeLicenseDetail.address.tenantId",
      tenantId
    )
  );
  dispatch(
    prepareFinalObject("Licenses[0].tradeLicenseDetail.address.city", tenantId)
  );

  
};

const getClasses = () =>{
  return PropTypes.object.isRequired;
}
const handleFileUpload = () =>{
}
const onButtonClick = () =>{
}
const tradeCategoryChange = () =>{
}
const tradeTypeChange = () =>{
}
const tradeSubTypeChange = () =>{
}
const cbChanged = () => {
}
const locationChanged = () =>{
}

const tab1Click = () =>{
}
const tab2Click = () =>{
}
const onRowClick = rowData => {
  const receiptQueryString = [
    { key: "receiptNumbers", value:  rowData[0]},
    { key: "tenantId", value: rowData[6] }
  ]
  download(receiptQueryString);
};

const applicationNumber = "1234556";

const sampleData = [{
	"LAMS_APPLICATION_NUMBER":1234,
	"LAMS_APPLICANT_NAME":"Srikanth V",
	"LAMS_MOBILE_NO": 9603823911,
	"LAMS_SURVEY_NO": 133-23,
	"LAMS_LEASE_NAME": "Asdf asdf abcd",
	"LAMS_APPLICATION_DATE": "21/03/2012",
	"TENANT_ID":"pb.agra"
}];

const tabContent = getCommonContainer({
  header: getCommonHeader({
    labelName: `LAMS_RENEWAL_APPLICATION NUMBER`,
    labelKey: "LAMS_RENEWAL_APPLICATION_NUMBER",
    dynamicArray: ["1213"]
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-lams",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "lamsApplicationDetails[0].applicationNumber"
    }
  }
});

const payeeDetails = getCommonContainer({
  paidBy: getSelectField({
    label: {
      labelName: "Paid By",
      labelKey: "TL_PAYMENT_PAID_BY_LABEL"
    },
    placeholder: {
      labelName: "Paid By",
      labelKey: "TL_PAYMENT_PAID_BY_LABEL"
    },
    data: [
      {
        code: "Owner",
        label: "TL_PAYMENT_BY_OWNER"
      },
      {
        code: "Others",
        label: "TL_PAYMENT_BY_OTHERS"
      }
    ],
    jsonPath: "ReceiptTemp[0].Bill[0].payer",
    required: true
  }),
  payerName: getTextField({
    label: {
      labelName: "Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].paidBy",
    required: true,
    pattern: getPattern("Name")
  }),
  payerMobileNo: getTextField({
    label: {
      labelName: "Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    jsonPath: "ReceiptTemp[0].Bill[0].payerMobileNumber",
    pattern: getPattern("MobileNo"),
    iconObj: {
      position: "start",
      label: "+91 |"
    },
    required: true
  })
});

const cash = getCommonContainer({
  payeeDetails
});

const applicationDetails = {
  uiFramework: "material-ui",
  name: "mihyLoginScreen",
  beforeInitScreen:(action, state, dispatch) => {
    //const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    getData(action, state, dispatch, tenantId);
    loadMdmsData(action, state, dispatch);
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    dispatch(prepareFinalObject("allTenants", [{code:"Agra", name:"Agra", active: true, id:"pb.agra"},{code: "Pune",name: "Pune", active: true, id:"pb.pune"}, {name: "Lucknow", code:"Lucknow", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsLocation", [{code:"withinCB", name:"Within CB ", active: true, id:"pb.agra"},{code: "outside CB",name: "Outside CB", active: true, id:"pb.pune"}]));
    dispatch(prepareFinalObject("lamsSurveyNumber", [{code:"131-212-A", name:"131-212-A", active: true, id:"pb.agra"},{code: "131-16",name: "131-16", active: true, id:"pb.pune"},{code: "131-145",name: "131-145", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsTemp", [{applicationDocuments:[{"code":"OWNERPHOTO","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.png,.jpeg"},"description":"COMMON_OWNERPHOTO_DESCRIPTION","statement":"COMMON_OWNERPHOTO_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[0]"},{"code":"AADHAARCARD","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.pdf,.png,.jpeg"},"description":"COMMON_AADHAARCARD_DESCRIPTION","statement":"COMMON_AADHAARCARD_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[1]"},{"code":"ELECTBILL","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.pdf,.png,.jpeg"},"description":"COMMON_ELECTBILL_DESCRIPTION","statement":"COMMON_ELECTBILL_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[2]"}]}]));
    dispatch(prepareFinalObject("lamsApplicationDetails", [{applicationNumber:"123455",tenant:"Agra",name:"Srikanth V", location:"Agra Cant Board", surveyNumber: "157-21", area:"1234", applicationDate:"21/11/2012", status:"Pending"}]));
    dispatch(prepareFinalObject("lamsDocs",
      [{
        title:"TL_ELECTBILL",
        link:"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=84765824-c875-48b2-86f2-bf6c7f23fdf4&tenantId=pb",
        linkText:"View",
        name:"Document - 3"
      },
      {
        title:"TL_OWNERPHOTO",
        link:"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=f9c0c854-d398-4ed3-9b0c-f3aebf6b3ed8&tenantId=pb",
        linkText:"View",
        name:"Document - 2"
      }]
    ));

    const applicationNumber = "dummyApplicationNumber";
    return action;
  },
  afterInitForm:(action, state, dispatch) => {
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }
          }
        },
        applicationNumber:{
          uiFramework: "custom-atoms-local",
          moduleName: "egov-lams",
          componentPath: "ApplicationNoContainer",
          props: {
            number: "lamsApplicationDetails[0].applicationNumber"
          }
        },

        header: getCommonContainer({
          header: getCommonHeader({
            labelName: `LAMS_RENEWAL_APPLICATION NUMBER`,
            labelKey: "LAMS_RENEWAL_APPLICATION_NUMBER",
            dynamicArray: ["1213"]
          }),
          applicationNumber: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-lams",
            componentPath: "ApplicationNoContainer",
            props: {
              number: "lamsApplicationDetails[0].applicationNumber"
            }
          }
        }),
        details: getCommonCard(
          {
            header: getCommonTitle(
                {
                  labelName: "Lease Details",
                  labelKey: "LAMS_LEASE_DETAILS"
                },
                {
                  style: {
                    marginBottom: 18
                  }
                }
              ),
              cantBoardName: getLabelWithValue(
                {
                  labelName: "Accesory Type",
                  labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
                },
                {
                  jsonPath:
                    "lamsApplicationDetails[0].name",
                  localePrefix: {
                    moduleName: "TRADELICENSE",
                    masterName: "ACCESSORIESCATEGORY"
                  },
                }
              ),
              singleApplication:{
                uiFramework:"custom-molecules",
                componentPath:"SingleApplication",
                visible:true,
                "props":{
                  applicationName:{
                      "label":"TL_COMMON_TABLE_COL_TRD_NAME",
                      jsonPath:"tradeName"
                  },
                  applicationNumber:{
                      "label":"TL_COMMON_TABLE_COL_APP_NO",
                      jsonPath:"applicationNumber"
                  }
                }
              },
              applicationSuccessCard: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                props: {
                  // style: {
                  //   position: "absolute",
                  //   width: "95%"
                  // }
                },
                children: {
                  card: acknowledgementCard({
                    icon: "done",
                    backgroundColor: "#39CB74",
                    header: {
                      labelName: "Application Submitted Successfully",
                      labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_MAIN"
                    },
                    body: {
                      labelName:
                        "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
                      labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_SUB"
                    },
                    tailText: {
                      labelName: "Application No.",
                      labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
                    },
                    number: applicationNumber
                  })
                }
              }
          },
          {
            style: {
              overflow: "visible"
            }
          }
      ),
      },
      
      
    },
  }
};
export default applicationDetails;