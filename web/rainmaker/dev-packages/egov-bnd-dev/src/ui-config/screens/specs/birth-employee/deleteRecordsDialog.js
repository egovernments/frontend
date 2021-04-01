import {
  getCommonHeader,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {showHideDeleteRecordsDialog} from "./newRegistration";
import {deleteAllRecords} from "../../../../ui-utils/commons";

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
              deleteAllRecords(state,dispatch,"birth");
              showHideDeleteRecordsDialog(state, dispatch)
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
              showHideDeleteRecordsDialog(state, dispatch)
            }
          }
        }
      }
    }
  })
});
