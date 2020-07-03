import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,    
    // getPattern,
    getLabelWithValue,
    // getBreak,
    // getSelectField,
    // getDateField,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
import { checkValueForNA } from "../../utils/index";

export const nocDetails = getCommonGrayCard({
        header: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            },
            children: {
                header: {
                    gridDefination: {
                        xs: 12
                    },
                    ...getCommonSubHeader({
                        labelName: "Fire NOC",
                        // labelKey: "BPA_SCRUNITY_SUMMARY"
                    })
                },
            }
        },
    // basicDetailsContainer: getCommonContainer({        
    // }),
    documentDetailsCard: {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-bpa",
        componentPath: "NocUploadCard",
        props: {
          jsonPath: "finalCardsforPreview1",                              
          sourceJsonPath: "documentDetailsPreview",
          className: "noc-review-documents",
          buttonLabel: {
            labelName: "UPLOAD FILE",
            labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
          },
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg",
            multiple: false
          },
          maxFileSize: 6000
        }
    }
})