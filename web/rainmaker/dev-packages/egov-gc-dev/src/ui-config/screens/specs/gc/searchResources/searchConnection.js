import {
  getCommonCard,
  getCommonTitle,
  getSelectField,
  getCommonContainer,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
//import {generateBillApiCall ,searchBillApiCall} from "../generateBillResource/functions"
import "./index.css";

export const searchConnection = getCommonCard({

subHeader: getCommonTitle({
    label: "Search Connection"
  },
  {
    style: {
      marginBottom: 8
    }
  }
  ),
  wnsGenerateBill: getCommonContainer({

   
//  ---------------------------------------------------------------------------------------
//             Connection Type drop down
//-----------------------------------------------------------------------------------------
    applicationtype: getSelectField({

      label: {
        labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_LABEL"
      },
      placeholder: {
        labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_PLACEHOLDER"
      },
      data: [
        {
          code: "WS_CONNECTION_TYPE_WATER",
          value:"WS",
        },
        {
          code: "WS_CONNECTION_TYPE_SEWERAGE",
          value:"SW",
        }
       
      ],
     
      gridDefination: {xs: 12, sm: 4},
      required: false,
      jsonPath: "generateBillScreen.transactionType",
      labelsFromLocalisation: true,
      fullwidth: true,
      isClearable: true,
      inputLabelProps: {
      shrink: true
      }
    }),

//---------------------------------------------------------------------------------------
//             locality drop down
//-----------------------------------------------------------------------------------------
locality: getSelectField({
jsonPath: "mohallaData.name",
  label: { labelName: "Locality", labelKey: "WS_GENERATE_BILL_LOCALITY_LABEL" },
  placeholder: { labelName: "Select maholla", labelKey: "WS_GENERATE_BILL_LOCALITY_PLACEHOLDER" },
  sourceJsonPath: "mohallaData",
  jsonPath: "generateBillScreen.mohallaData",
  required: false,
  isClearable: true,
  labelsFromLocalisation: true,
  suggestions: [],
  required: false,
  labelsFromLocalisation: true,
  gridDefination: {xs: 12, sm: 4},
}),
    }),
//---------------------------------------------------------------------------------------
//             Reset Button and Submit Button
//-----------------------------------------------------------------------------------------
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 4 },
        props: {
          variant: "outlined",
          style: {
            color: "rgba(0, 0, 0, 0.6000000238418579)",
            borderColor: "rgba(0, 0, 0, 0.6000000238418579)",
            width: "220px",
            height: "48px",
            margin: "28px",
            float: "right"
          }
        },
        children: { buttonLabel: getLabel({ label: "Reset" }) },
        onClickDefination: {
          action: "condition",
       //   callBack: searchBillApiCall
        }
      },

//---------------------------------------------------------------------------------------
//             Generate Bill  Button
//-----------------------------------------------------------------------------------------
      searchButton: {
        componentPath: "Button",
        gridDefination: { xs: 12, sm: 4 },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "28px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px",
            float: "left"
          }
        },
        children: { buttonLabel: getLabel({ label: "Search" }) },
        onClickDefination: {
       
          action: "condition",
         // callBack: generateBillApiCall
        }
      },
    })


  }),
  
  
});


