import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getCommonGrayCard,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../../ui-utils";
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  



  export const resData =  () =>  {
    return( 
       getCommonContainer({
         
        applicantName: getLabelWithValue({labelName: "Name", labelKey: "NOC_APPLICANT_NAME_LABEL"},{jsonPath:"propertyOwnerResponse[0].name"}),
        applicantguardianName: getLabelWithValue({labelName: "Guardian Name", labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"},{jsonPath:"propertyOwnerResponse[0].fatherOrHusbandName"}),
        mobileNo: getLabelWithValue({labelName: "Mobile No.",labelKey: "NOC_APPLICANT_MOBILE_NO_LABEL"},{jsonPath:"propertyOwnerResponse[0].mobileNumber"}),
        //applicantEmail: getLabelWithValue({labelName: "Email",labelKey: "NOC_APPLICANT_EMAIL_LABEL"},{jsonPath:"propertyOwnerResponse[0].emailId"}),
        applicantAddress: getLabelWithValue({labelName: "Correspondence Address",labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"}, {jsonPath:"propertyOwnerResponse[0].permanentAddress"})
     })
     )
    }




  export const propertyOwner = getCommonCard({
    subHeader: getCommonTitle({
      label: "Owner Details"
    },
    {
      style: {
        marginBottom: 8
      }
    }
    ),
    propertyOwners: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: resData(),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "propertyOwnerResponse",
      prefixSourceJsonPath:"children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});
  


