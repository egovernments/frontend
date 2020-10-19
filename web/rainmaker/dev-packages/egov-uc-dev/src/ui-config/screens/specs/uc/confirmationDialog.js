import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {cancelChallan, showHideConfirmationPopup } from "./search-preview";
export const confirmationDialog = getCommonContainer({
  
  confirmationContents: getCommonContainer({
    header: getCommonHeader({
      labelName: "Do you really want to cancel challan",
      labelKey: "Cancel challan"
    },
    {
      style: {
        fontSize: "20px"
      }
    }
    ),
    commentsField: getTextField({
      label: {
        labelName: "Enter Comments",
        labelKey: "CANCEL_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comments",
        labelKey: "CANCEL_COMMENT_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        style: {
          width: "90%"
        }
      },
      jsonPath: "Challan.additionalDetail.cancellComment"
    }),
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
