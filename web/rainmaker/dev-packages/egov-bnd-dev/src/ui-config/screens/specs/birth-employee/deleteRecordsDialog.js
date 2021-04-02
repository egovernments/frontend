import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getDivider,
  getCommonValue,
  getCommonCaption
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {showHideDeleteRecordsDialog} from "./newRegistration";
import {deleteAllRecords} from "../../../../ui-utils/commons";
import store from "ui-redux/store";
import {prepareFinalObject,handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

let setVisibilityResult = (visible) => {
  store.dispatch(
    handleField("newRegistration", "components.deleteRecordsDialog.children.dialogContent.children.popup.children.confirmationContents.children.div.children.resultContainer", "visible", visible)
  );
 }
 
export const deleteRecordsDialog = getCommonContainer({
  header: getCommonHeader({
      labelName: "Delete Records",
      labelKey: "All the records will be deleted ! Proceed?"
    },
    {
      style: {
        fontSize: "20px"
      }
    }),
  confirmationContents: getCommonContainer({
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

        resultContainer:{
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
          },
          children: {
            divider: getDivider(),
            resultHeader: getCommonCaption({
              labelName: "",
              labelKey: "Summary:"
            }),
            resultValue: getCommonValue({
              jsonPath: "bnd.birth.deleteRecordsResult",
            }),
          },
          visible: false,
        },
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
              labelKey: "BND_DOWNLOAD_PROCEED"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              setVisibilityResult(false);
              deleteAllRecords(state,dispatch,"birth").then((response)=>{
                setVisibilityResult(true);
                store.dispatch(prepareFinalObject("bnd.birth.deleteRecordsResult", response));
              });
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
              labelKey: "CORE_COMMON_CANCEL"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              setVisibilityResult(false);
              showHideDeleteRecordsDialog(state, dispatch)
            }
          }
        }
      }
    }
  })
});
