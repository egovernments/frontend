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

const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS_HEADER"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

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

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};
export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
 alert("In the change step function ");
}

export const callBackForNext = async (state, dispatch) => {
  alert("Call back for next");
}
export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const callBackForAppFee = async (state, dispatch) => {
  alert("Call back for app fee");
};
export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "TL_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "TL_COMMON_BUTTON_NXT_STEP"
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
      callBack: callBackForNext
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
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
      callBack: callBackForNext
    },
    visible: false
  },
  appfeeButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "45px",
        borderRadius: "inherit"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Pay",
        labelKey: "TL_COMMON_BUTTON_SUBMIT_PAY"
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
      callBack: callBackForAppFee
    },
    visible: false
  }
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
    dispatch(prepareFinalObject("searchResults",[{comment:null,id:'620bcc64-789c-4add-b0e6-ea10af8d86c8',tenantId:'pb.secunderabad',businessService:'TL',licenseType:'PERMANENT',applicationType:'NEW',workflowCode:'LAMS_NewLR_V2',licenseNumber:'TL-CB-SECU-2020-001470',applicationNumber:'TL-APP-SECU-2020-10-14-004135',oldLicenseNumber:null,propertyId:null,oldPropertyId:null,accountId:null,tradeName:'Dhaba',applicationDate:1602665894343,commencementDate:1602700199000,issuedDate:1602668186092,financialYear:'2019-20',validFrom:1554076799000,validTo:1585679399000,action:'PAY',assignee:null,wfDocuments:null,status:'APPROVED'},{comment:null,id:'620bcc64-789c-4add-b0e6-ea10af8d86c8',tenantId:'pb.secunderabad',businessService:'TL',licenseType:'PERMANENT',applicationType:'NEW',workflowCode:'LAMS_NewLR_V2',licenseNumber:'TL-CB-SECU-2020-001470',applicationNumber:'TL-APP-SECU-2020-10-14-004135',oldLicenseNumber:null,propertyId:null,oldPropertyId:null,accountId:null,tradeName:'Dhaba',applicationDate:1602665894343,commencementDate:1602700199000,issuedDate:1602668186092,financialYear:'2019-20',validFrom:1554076799000,validTo:1585679399000,action:'PAY',assignee:null,wfDocuments:null,status:'APPROVED'}]));
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
        details: footer
      },
      
      
    },
  }
};
export default applicationDetails;