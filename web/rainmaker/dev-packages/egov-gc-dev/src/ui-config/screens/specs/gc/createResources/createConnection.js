import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  //import {generateBillApiCall ,searchBillApiCall} from "../generateBillResource/functions"
  import "./index.css";

  export const createConnection = getCommonCard({
 
  
    wnsGenerateBill: getCommonContainer({

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


isPrimaryHolder: getSelectField({
    label: { labelName: "isPrimaryHolder", label: "isPrimary Holder" },
    placeholder: { labelName: "Select PrimaryHolder Type", label: "Select PrimaryHolder Type" },
    data: [
     
      {
        code: "NO",
        value:"No",
      },
      {
        code: "YES",
        value:"Yes",
      },
     
    ],
    required: false,
    isClearable: true,
    labelsFromLocalisation: true,
    suggestions: [],
    required: false,
    labelsFromLocalisation: true,
    gridDefination: {xs: 12, sm: 4},
}),


Relationship: getSelectField({
    label: { labelName: "Relationship", label: "Relationship" },
    placeholder: { labelName: "Select Relationship", label: "Select Relationship" },
    jsonPath: "generateBillScreen.mohallaData",
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
    required: false,
    isClearable: true,
    labelsFromLocalisation: true,
    suggestions: [],
    required: false,
    labelsFromLocalisation: true,
    gridDefination: {xs: 12, sm: 4},
}),


connectionHolderType: getSelectField({
    label: { labelName: "Connection Holder Type", label: "Connection Holder Type" },
    placeholder: { labelName: "Connection Holder Type", label: "Select Connection Holder Type" },
    required: false,
    isClearable: true,
    labelsFromLocalisation: true,
    suggestions: [],
    required: false,
    labelsFromLocalisation: true,
    gridDefination: {xs: 12, sm: 4},
}),
OwnershipCategory: getSelectField({
    label: { labelName: "Ownership Category", label: "OwnershipCategory" },
    placeholder: { labelName: "Select Ownership Category", label: "Select Ownership Category" },
    required: false,
    isClearable: true,
    labelsFromLocalisation: true,
    suggestions: [],
    required: false,
    labelsFromLocalisation: true,
    gridDefination: {xs: 12, sm: 4},
}),

CorrespondingAddress: getTextField({
  label: { labelName: "Corresponding Address", label: "Corresponding Address" },
  placeholder: {
    labelName: "Corresponding Address",
    label: "CorrespondingAddress"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  jsonPath: "Demands[0].mobileNumber"
}),

      PlotSize: getTextField({
        label: { labelName: "Plot Size", label: "PlotSize" },
     
        placeholder: {
          labelName: "Enter Mobile No",
          labelKey: "Plot Size"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        visible: true,
        errorMessage: "Invalid Mobile No.",
        jsonPath: "Demands[0].mobileNumber"
      }),



      Street: getTextField({
        label: { labelName: "Street", label: "Street" },
        placeholder: {
          labelName: "Enter Mobile No",
          labelKey: "Street"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        visible: true,
        errorMessage: "Invalid Mobile No.",
        jsonPath: "Demands[0].mobileNumber"
      }),



      Pincode: getTextField({
        label: { labelName: "Pincode", label: "Pincode" },
        placeholder: {
          labelName: "Enter Mobile No",
          labelKey: "Pincode"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        visible: true,
        errorMessage: "Invalid Mobile No.",
        jsonPath: "Demands[0].mobileNumber"
      }),


      Building: getTextField({
        label: { labelName: "Building", label: "Building" },
        placeholder: {
          labelName: "Enter Mobile No",
          labelKey: "Building"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        visible: true,
        errorMessage: "Invalid Mobile No.",
        jsonPath: "Demands[0].mobileNumber"
      }),



      Door: getTextField({
        label: { labelName: "Door", label: "Door" },
        placeholder: {
          labelName: "Enter Mobile No",
          labelKey: "Door"
        },
        gridDefination: {
          xs: 12,
          sm: 4
        },
        required: true,
        visible: true,
        errorMessage: "Invalid Mobile No.",
        jsonPath: "Demands[0].mobileNumber"
      }),



      PropertyType: getSelectField({

        label: { labelName: "Property Type", label: "Property Type" },
        placeholder: { labelName: "Select Property Type", label: "Select Property Type" },

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


//---------------------------------------
UsageType: getSelectField({

  label: { labelName: "Usage Type", label: "UsageType" },
  placeholder: { labelName: "Select User Type", label: "Select User Type" },

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


Occupancy: getTextField({
  label: { labelName: "Occupancy", label: "Occupancy" },

  placeholder: {
    labelName: "Enter Occupancy",
    labelKey: "Occupancy"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  jsonPath: "Demands[0].mobileNumber"
}),


ConnectionCategory: getSelectField({

  label: { labelName: "Connection Category", label: "ConnectionCategory" },
  placeholder: { labelName: "Select Connection Category", label: "Select Connection Category" },

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






//  ---------------------------------------------------------------------------------------
//             Connection Type drop down
//-----------------------------------------------------------------------------------------
      applicationtype: getSelectField({

        label: { labelName: "Application Type", label: "applicationtype" },
        placeholder: { labelName: "Select Application Type", label: "Select Application Type" },

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

  

isLegacy: getTextField({
  label: { labelName: "isLegacy", label: "isLegacy" },
  placeholder: {
    labelName: "ConnectionCategory",
    labelKey: "isLegacy"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  jsonPath: "Demands[0].mobileNumber"
}),

FamilyMember: getTextField({
  label: { labelName: "Family Member", label: "Family Member" },
  placeholder: {
    labelName: "FamilyMember",
    labelKey: "FamilyMember"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  jsonPath: "Demands[0].mobileNumber"
}),


AdditionalDetails: getTextField({
  label: { labelName: "Additional Details", label: "AdditionalDetails" },
  placeholder: {
    labelName: "AdditionalDetails",
    labelKey: "AdditionalDetails"
  },
  gridDefination: {
    xs: 12,
    sm: 4
  },
  required: true,
  visible: true,
  errorMessage: "Invalid Mobile No.",
  jsonPath: "Demands[0].mobileNumber"
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
          children: { buttonLabel: getLabel({ label: "Create" }) },
          onClickDefination: {
         
            action: "condition",
           // callBack: generateBillApiCall
          }
        },
      })


    }),
    
    
});
  


