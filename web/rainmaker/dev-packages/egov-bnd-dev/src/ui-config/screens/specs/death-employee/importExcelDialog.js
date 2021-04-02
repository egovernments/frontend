import {
  getCommonHeader,
  getCommonContainer,
  getLabel,
  getCommonCaption,
  getCommonValue,
  getDivider,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {showHideImportExcelDialog } from "./newRegistration";
import {prepareFinalObject,handleScreenConfigurationFieldChange as handleField 
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {handleFileUpload,postXlsxFile} from "../../../../ui-utils/commons";
import store from "ui-redux/store";

let setVisibilityResult = (visible) => {
 store.dispatch(
   handleField("newRegistration", "components.importExcelDialog.children.dialogContent.children.popup.children.confirmationContents.children.div.children.resultContainer", "visible", visible)
 );
}

let clearCache = () =>{
  store.dispatch(prepareFinalObject("bnd.death.importFile", ""));
}

let handleDocument  = async (file) => {
  
  store.dispatch(prepareFinalObject("bnd.death.importFile", file));

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
              handleFileUpload(e, handleDocument, {moduleName:"BnD", formatProps:{accept:"xlsx"},maxFileSize:20}, "death")
            },
            buttonLabel : "Upload file"
          }
        },
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
              jsonPath: "bnd.death.importFileResult.summary",
            }),
            resultHeader2: getCommonCaption({
              labelName: "",
              labelKey: "Error Details:"
            }),
            resultValue2: getCommonValue({
              jsonPath: "bnd.death.importFileResult.errors",
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
              let file = get(state.screenConfiguration.preparedFinalObject,`bnd.death.importFile`);
              if(!file)
              {
                toggleSnackbar(true,{
                    labelName: "",
                    labelKey: "Select a file to proceed"
                  },"error"
                );
                return;
              }
              let tic = performance.now();
              setVisibilityResult(false);
              postXlsxFile(state,dispatch, "death", file).then((response)=>{
                let toc = performance.now();
                console.log("Total time taken: ",toc-tic);
                if(response && response.data)
                {
                  setVisibilityResult(true);
                  store.dispatch(prepareFinalObject("bnd.death.importFileResult.summary", JSON.stringify(response.data.statsMap,null,2)));
                  store.dispatch(prepareFinalObject("bnd.death.importFileResult.errors", JSON.stringify(response.data.errorRowMap,null,2)));
                }
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
              showHideImportExcelDialog(state, dispatch);
              clearCache();
            }
          }
        }
      }
    }
  })
});
