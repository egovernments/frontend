import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../../ui-utils/api";
  import { resetFieldsForApplication } from '../../utils';
  import {generateBillApiCall} from "../searchResource/functions"
  import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import {handleScreenConfigurationFieldChange as handleField  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
  import "./index.css";
 




  export const generateBill = getCommonCard({
  subHeader: getCommonTitle({
      labelKey: "WS_GENERATE_BILL_SUB_HEADER"
    },
    {
      style: {
        marginBottom: 8
      }
    }
    ),
    beforeInitScreen: (action, state, dispatch) => {
      alert("PAge Load");
    },

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
            code: "WS_CONNECTION_TYPE_WATER"
          },
          {
            code: "WS_CONNECTION_TYPE_SEWERAGE"
          }
         
        ],
       
        gridDefination: {xs: 12, sm: 4},
        required: false,
        jsonPath: "transactionType",
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
  jsonPath: "mohallaData[0].name",
    label: { labelName: "Locality", labelKey: "WS_GENERATE_BILL_LOCALITY_LABEL" },
    placeholder: { labelName: "Select maholla", labelKey: "WS_GENERATE_BILL_LOCALITY_PLACEHOLDER" },
    sourceJsonPath: "mohallaData",
    jsonPath: "mohallaData[0].name",
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
          children: { buttonLabel: getLabel({ labelKey: "WS_GENERATE_BILL_RESET_BUTTON" }) },
          onClickDefination: {
            action: "condition",
            callBack: resetFieldsForApplication
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
          children: { buttonLabel: getLabel({ labelKey: "WS_GENERATE_BILL_GENERATE_BUTTON" }) },
          onClickDefination: {
         
            action: "condition",
            callBack: generateBillApiCall
      
            
          }
        },
      })


    }),
    
});
  