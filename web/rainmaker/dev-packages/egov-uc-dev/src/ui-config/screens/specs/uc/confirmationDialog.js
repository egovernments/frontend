import {
  getCommonHeader,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { processChallan } from "./newCollectionResource/newCollectionFooter";
import {cancelChallan, showHideConfirmationPopup } from "./search-preview";
export const confirmationDialog = getCommonContainer({
  
  confirmationContents: getCommonContainer({
    header: getCommonHeader({
      labelName: "Do you really want to cancel challan",
      labelKey: "Do you really want to cancel challan?"
    }),
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        yesButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              width: "40px",
              height: "20px",
              marginRight: "20px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "YES",
              labelKey: "YES"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              cancelChallan(state, dispatch, "CANCELLED");
            }
          }
        },
        cancelButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            style: {
              width: "40px",
              height: "20px",
              marginRight: "4px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: getLabel({
              labelName: "NO",
              labelKey: "NO"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              showHideConfirmationPopup(state, dispatch, "newCollection")
            }
          }
        }
      }
    }
  })
});
