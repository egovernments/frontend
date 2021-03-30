import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getTextField ,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {showHideImportExcelDialog } from "./newRegistration";
import {prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {patterns} from "../utils/constants";
import {handleFileUpload,postXlsxFile} from "../../../../ui-utils/commons";
import store from "ui-redux/store";

let handleDocument  = async (file) => {
  
  store.dispatch(prepareFinalObject("bnd.birth.importFile", file));

};

export const importExcelDialog = getCommonContainer({
  header: getCommonHeader({
      labelName: "Confirm Add",
      labelKey: "Upload Excel"
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

        uploadSingleFile : 
        {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-bnd",
          componentPath: "UploadSingleFile",
          props:{
            uploaded:false,
            id : "bndImportFileUpload",
            classes: {input:"input"},
            handleFileUpload: (e) => {
              handleFileUpload(e, handleDocument, {moduleName:"BnD", formatProps:{accept:"xlsx"},maxFileSize:20}, "birth")
            },
            buttonLabel : "Upload file"
          }
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
              let file = get(state.screenConfiguration.preparedFinalObject,`bnd.birth.importFile`);
              postXlsxFile(state,dispatch, "birth", file);
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
              showHideImportExcelDialog(state, dispatch)
            }
          }
        }
      }
    }
  })
});
