import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../../ui-utils";
import "./index.css";
import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSewerageData } from "./functions";

export const sewerageConnection = getCommonCard({

  header: getCommonTitle(
    { labelName: "Sewerage Dues", label: "Sewerage Dues" },
    { style: { marginBottom: 18 } }
  ),
  wnsGenerateBill: getCommonContainer({


sewerageId: getTextField({
label: { labelName: "Sewerage Connection Id", label: "Sewerage Connection Id" },
placeholder: {
  labelName: "Sewerage Connection Id",
  label: "Sewerage Connection Id"
},
gridDefination: {
  xs: 12,
  sm: 3
},
required: false,
visible: true,
errorMessage: "Invalid Sewerage Connection Number",
sourceJsonPath: "SewerageId",
jsonPath: "NODScreen.SewerageId"
}),
mobileNumber: getTextField({
label: { labelName: "Mobile", label: "Mobile" },
placeholder: {
  labelName: "Mobile",
  label: "Mobile"
},
gridDefination: {
  xs: 12,
  sm: 3
},
required: false,
visible: true,
errorMessage: "Invalid Mobile No.",
sourceJsonPath: "mobileNumber",
jsonPath: "NODScreen.mobileNumber"
}),

searchButton: {
componentPath: "Button",
gridDefination: { xs: 12, sm: 3 },
props: {
  variant: "contained",
  style: {
    color: "white",
    margin: "28px",
    backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
    borderRadius: "2px",
    width: "220px",
    height: "48px",
    float: "left"
  }
},
children: { buttonLabel: getLabel({ label: "Verify" }) },
onClickDefination: {

  action: "condition",
  callBack: getSewerageData,
            
}
},




    }),

  
  
});



