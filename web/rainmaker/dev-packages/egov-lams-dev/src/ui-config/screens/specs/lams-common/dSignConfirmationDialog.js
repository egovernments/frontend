import {
  getCommonHeader,
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
import {showHideConfirmationPopup } from "./newApplicationDetailsCard";
import {downloadLeaseApplication2} from "../../../../ui-utils/commons"

const dSignAgreePath =  "lamsStore.dSign.iAgree"
export const dSignConfirmationDialog = getCommonContainer({
  
  confirmationContents: getCommonContainer({
    header: getCommonHeader({
      labelName: "Confirm E Sign",
      labelKey: "LAMS_CONFIRM_DSIGN"
    },
    {
      style: {
        fontSize: "20px"
      }
    }),
    
    termsContainer: getCommonGrayCard({
      // info1: getCommonCaption({
      //   labelName: "*Note",
      //   labelKey: "LAMS_DSIGN_NOTE"
      // }),
      info1: getCommonCaption({
        labelName: "E Sign Terms",
        labelKey: "LAMS_DSIGN_TERMS"
      }),
      divider1: getDivider(),
      value0: getCommonParagraph({
        labelName:
          "Important : The application form is to be signed by the original lessee or his/her successors/heir. Otherwise considered invalid.",
        labelKey: "LAMS_DSIGN_IMP_NOTE"
      }),
      value1: getCommonParagraph({
        labelName:
          "You can digitally sign if you have your aadhar number linked with your mobile number. ",
        labelKey: "LAMS_DSIGN_TERMS_DESC1"
      }),
      value2: getCommonParagraph({
        labelName:
          "When you proceed, you will be asked to enter Aadhar Virtual ID. This is different from your Aadhar number."+
          " If you have not created virtual ID yet, click on 'Get Virtual ID' or visit https://resident.uidai.gov.in/vid-generation and follow the steps acordingly",
        labelKey: "LAMS_DSIGN_TERMS_DESC4"
      }),
      // info2: getCommonCaption({
      //   labelName: "E Sign Terms",
      //   labelKey: "LAMS_DSIGN_TERMS"
      // }),
      //divider2: getDivider(),
      value3: getCommonParagraph({
        labelName:
          "You can digitally sign if you have your aadhar number linked with your mobile number. ",
        labelKey: "LAMS_DSIGN_TERMS_DESC2"
      }),
      //divider3: getDivider(),
      value4: getCommonParagraph({
        labelName:
          "I hereby give my consent for usage of the mentioned details for the purpose of digitally signing and storing the application.",
        labelKey: "LAMS_DSIGN_TERMS_DESC3"
      }),

    }),
    // checkBox: {
    //   uiFrameWork: "custom-atoms-local",
    //   componentPath: "CheckBox",
    //   moduleName: "egov-lams",
    //   props: {
    //     content: "Test"
    //   }
    // },
    checkBox:{
      required: true,
      uiFramework: "custom-atoms-local",
      moduleName: "egov-lams",
      componentPath: "Checkbox",
      props: {
        label:{
          labelKey:"LAMS_DSIGN_IAGREE",
          labelName: "I agree and wish to continue"
        },
        jsonPath: dSignAgreePath,
      },
    },

    // termsContainer1: getCommonGrayCard({
      
    // }),
    
    
    // commentsField: getTextField({
    //   label: {
    //     labelName: "Enter Comments",
    //     labelKey: "CANCEL_COMMENT_LABEL"
    //   },
    //   placeholder: {
    //     labelName: "Enter Comments",
    //     labelKey: "CANCEL_COMMENT_LABEL"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 12
    //   },
    //   props: {
    //     style: {
    //       width: "90%"
    //     }
    //   },
    //   pattern: getPattern("cancelChallan"),
    //   required: true,
    //   visible: true,
    //   jsonPath: "Challan.additionalDetail.cancellComment"
    // }),
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
              labelKey: "LAMS_PROCEED_DSIGN"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              let iAgree = get(state.screenConfiguration.preparedFinalObject , dSignAgreePath);
              if(iAgree)
              {
                downloadLeaseApplication2(state, dispatch, true);
                //prepareForDSign(state,dispatch)
              }
              else
              {
                dispatch(toggleSnackbar(true,{labelName: "You have to agree to terms and conditions before you proceed.",
                labelKey: "ERR_LAMS_DSIGN_IAGREE"}, "error"));
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
              showHideConfirmationPopup(state, dispatch, "newCollection")
            }
          }
        }
      }
    }
  })
});
