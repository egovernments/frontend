import {
  getCommonHeader,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { processChallan, showHideConfirmationPopup } from "./newCollectionResource/newCollectionFooter";

export const confirmationDialog = getCommonContainer({
  header: getCommonHeader({
    labelName: "Do u really want to cancel challan",
    labelKey: "Do u really want to cancel challan?"
  }),
  confirmationContents: getCommonContainer({

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
              processChallan(state, dispatch, "CANCELLED");
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
