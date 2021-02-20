import {
  getCommonHeader,
  getCommonTitle,
  getCommonCard,
  getCommonContainer,
  getLabel,
  getTextField,
  getPattern,
  getCommonParagraph,
  getCommonGrayCard,
  getDivider,
  getCommonCaption 
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {showHideDownloadApplPopup,showHideConfirmationPopup } from "./newApplicationDetailsCard";
import {downloadLeaseApplication2, getCustomLabel} from "../../../../ui-utils/commons";
import {monthsPattern} from "../../../../ui-utils/constants";

export const downloadDialog = getCommonContainer(
  {

    header: getCommonHeader({
      labelName: "Fill Application Details",
      labelKey: "LAMS_FILL_APPL_DETAILS"
    },
    {
      disableValidation:true,
      style: {
        fontSize: "20px"
      }
    }),

    optionSelection: getCommonContainer({

      months: getTextField({
          label: {
            labelName: "For a period of (Months)",
            labelKey: "LAMS_FOR_A_PERIOD"
          },
          props:{
            className:"applicant-details-error",
            //hasDependant: true,
            //onChange:null,
          },
          placeholder: {
            labelName: "Enter period in months",
            labelKey: "LAMS_FOR_A_PERIOD_PLACEHOLDER"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          required: true,
          pattern: monthsPattern,
          jsonPath: "lamsStore.Lease[0].months",
          sourceJsonPath: "lamsStore.Lease[0].months",
          visible: true,
          afterFieldChange: (action, state, dispatch) => {
            //onMonthsChanged(action, state, dispatch);
          },
        }),
        fatherOrHusbandName: getTextField({
          label: {
            labelName: "Father/Spouse Name",
            labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
          },
          props:{
            className:"applicant-details-error",
            //hasDependant: true,
            //onChange:null,
            disabled: process.env.REACT_APP_NAME === "Citizen"? false:true,
          },
          placeholder: {
            labelName: "Enter Father/Spouse Name",
            labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
          },
          gridDefination: {
            xs: 12,
            sm: 12
          },
          required: true,
          pattern: getPattern("Name"),
          jsonPath: "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName",
          sourceJsonPath: "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName",
          visible: process.env.REACT_APP_NAME === "Citizen"? true:false,
          afterFieldChange: (action, state, dispatch) => {
            //onFathersNameChanged(action, state, dispatch);
          },
        }),
        importantNote: getCommonCaption({
          labelName: "Imp Note",
          labelKey: "LAMS_DSIGN_IMP_NOTE"},
          {
            disableValidation:true,
            style:{
              color:"red",
            }
          }
        ),
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: {
              width: "90%",
              textAlign: "center"
            }
          },
          children: {
            yesButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "100px",
                  height: "20px",
                  marginRight: "20px",
                  marginTop: "16px"
                }
              },
              children: {
                previousButtonLabel: getLabel({
                  labelName: "YES",
                  labelKey: "LAMS_COMMON_PROCEED"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  let months = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].months");
                  let fatherOrHusbandName = get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName");;
                  if(!monthsPattern.test(months) || !getPattern("Name").test(fatherOrHusbandName) || !fatherOrHusbandName)
                  {
                    dispatch(toggleSnackbar(true,{labelName: "Invalid Values entered",
                    labelKey: "ERR_LAMS_INVALID_VALUES"}, "error"));
                  }
                  else
                  {
                    let eSignClicked = get(state.screenConfiguration.preparedFinalObject , "lamsStore.eSignClicked");
                    if(eSignClicked)
                    {
                      showHideDownloadApplPopup(state, dispatch);
                      showHideConfirmationPopup(state,dispatch);
                    }
                    else
                    {
                      downloadLeaseApplication2(state, dispatch, false);
                      showHideDownloadApplPopup(state, dispatch)
                    }
                  }
                }
              }
            },
            cancelButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "100px",
                  height: "20px",
                  marginRight: "4px",
                  marginTop: "16px"
                }
              },
              children: {
                previousButtonLabel: getLabel({
                  labelName: "NO",
                  labelKey: "LAMS_CANCEL_ESIGN"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  showHideDownloadApplPopup(state, dispatch)
                }
              }
            }
          }
        }
    }),
  },
  {
    style: {
      overflow: "visible"
    }
  }
);