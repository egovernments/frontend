import {
    getCommonCard,
    getCommonTitle,
    getSelectField,
    getCommonContainer,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {generateBillApiCall ,searchBillApiCall} from "../generateBillResource/functions"
  import "./index.css";
 
  export const createBill = getCommonCard({
 
  subHeader: getCommonTitle({
      label: "Generate Bill"
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
applicationtype:{
  uiFramework: "custom-containers-local",
  moduleName: "egov-wns",
  componentPath: "AutosuggestContainer",
  jsonPath: "generateBillScreen.transactionType",
  props: {
    label: {
      labelName: "Connection Type",
      labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_LABEL"
    },
    labelPrefix: {
      moduleName: "TENANT",
      masterName: "TENANTS"
    },
    optionLabel: "name",
    placeholder: {
      labelName: "Connection Type",
      labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_PLACEHOLDER"
    },
    required: true,
    labelsFromLocalisation: true,
    data: [
      {
        code: "Water",
        value:"WS",
      },
      {
        code: "Sewerage",
        value:"SW",
      }
     
    ],
    // isClearable: true,
    className: "autocomplete-dropdown",
    jsonPath: "generateBillScreen.transactionType",
    //sourceJsonPath: "searchScreenMdmsData.tenant.tenants",
   // jsonPath: "searchScreen.tenantId",
    disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
  },
  required: false,
  
  gridDefination: {
    xs: 12,
    sm: 4
  }
},
//---------------------------------
// applicationtype: getSelectField({

//         label: {
//           labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_LABEL"
//         },
//         placeholder: {
//           labelKey: "WS_GENERATE_BILL_CONNECTION_TYPE_PLACEHOLDER"
//         },
//         data: [
//           {
//             code: "WS_CONNECTION_TYPE_WATER",
//             value:"WS",
//           },
//           {
//             code: "WS_CONNECTION_TYPE_SEWERAGE",
//             value:"SW",
//           }
         
//         ],
//         className: "autocomplete-dropdown",
//         gridDefination: {xs: 12, sm: 4},
//         required: false,
//         jsonPath: "generateBillScreen.transactionType",
//         labelsFromLocalisation: true,
//         fullwidth: true,
//         isClearable: true,
//         inputLabelProps: {
//         shrink: true
//         }
//       }),
//-----------------------------------------

  //---------------------------------------------------------------------------------------
//             locality drop down
//-----------------------------------------------------------------------------------------
locality: {
  uiFramework: "custom-containers-local",
  moduleName: "egov-wns",
  componentPath: "AutosuggestContainer",
  jsonPath: "generateBillScreen.mohallaData",
  props: {
    label: { labelName: "Locality", labelKey:"Locality"},
    placeholder: { labelName: "Select maholla", labelKey: "WS_GENERATE_BILL_LOCALITY_PLACEHOLDER" },
    optionLabel: "name",
    required: false,
    labelsFromLocalisation: true,
    
    // isClearable: true,
    className: "autocomplete-dropdown",
    sourceJsonPath: "mohallaData",
    jsonPath: "generateBillScreen.mohallaData",
  //  jsonPath: "searchScreen.tenantId",
    disabled: process.env.REACT_APP_NAME === "Citizen" ? false : true,
  },
   required: false,
   gridDefination: {
    xs: 12,
    sm: 4
  }
},
//-----------------------------------------------------------
// locality: getSelectField({
//   jsonPath: "mohallaData.name",
//     label: { labelName: "Locality", labelKey: "WS_GENERATE_BILL_LOCALITY_LABELdddhdh" },
//     placeholder: { labelName: "Select maholla", labelKey: "WS_GENERATE_BILL_LOCALITY_PLACEHOLDER" },
//     sourceJsonPath: "mohallaData",
//     jsonPath: "generateBillScreen.mohallaData",
//     required: false,
//     isClearable: true,
//     labelsFromLocalisation: true,
//     suggestions: [],
//     labelsFromLocalisation: true,
//     gridDefination: {xs: 12, sm: 4},
// }),
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
          children: { buttonLabel: getLabel({ labelKey: "WS_SEARCH_CONNECTION_SEARCH_BUTTON" }) },
          onClickDefination: {
            action: "condition",
            callBack: searchBillApiCall
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
  


