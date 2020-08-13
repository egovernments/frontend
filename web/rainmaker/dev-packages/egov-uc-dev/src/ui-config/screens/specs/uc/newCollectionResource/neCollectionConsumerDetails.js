import {
    getCommonCard,
    getTextField,
    
    getCommonContainer,
    getPattern,
   
    getCommonTitle,
  } from "egov-ui-framework/ui-config/screens/specs/utils";

 

  export const newCollectionConsumerDetailsCard = getCommonCard(
      {
        header: getCommonTitle(
            {
              labelName: "Consumer Details",
              labelKey: "CONSUMERDETAILS"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
        ucConsumerContainer : getCommonContainer({
            ConsumerName: getTextField({
                label: {
                  labelName: "Consumer Name",
                  labelKey: "UC_CONS_NAME_LABEL"
                },
                placeholder: {
                  labelName: "Enter Consumer Name",
                  labelKey: "UC _CONS_NAME_LABEL_PLACEHOLDER"
                },
      
                required: true,
                visible: true,
                pattern: getPattern("Name"),
                errorMessage: "Invalid Name.",
                jsonPath: "Demands[0].consumerName"
              }),
              ConsumerMobileNo: getTextField({
                label: {
                  labelName: "Mobile No",
                  labelKey: "UC_MOBILE_NO_LABEL"
                },
                placeholder: {
                  labelName: "Enter Mobile No",
                  labelKey: "UC_MOBILE_NO_PLACEHOLDER"
                },
                iconObj: {
                  label: "+91 |",
                  position: "start"
                },
                required: true,
                visible: true,
                pattern: getPattern("MobileNo"),
                errorMessage: "Invalid Mobile No.",
                jsonPath: "Demands[0].mobileNumber"
              }),
              ConsumerHouseNo: getTextField({
                label: {
                  labelName: "Door/House No.",
                  labelKey: "UC_DOOR_NO_LABEL"
                },
                placeholder: {
                  labelName: "Enter Door/House No.",
                  labelKey: "UC_DOOR_NO_PLACEHOLDER"
                },
                pattern: getPattern("DoorHouseNo"),
                jsonPath: "Demands[0].address.doorNo"
              }),
              ConsumerBuilidingName: getTextField({
                label: {
                  labelName: "Building/Colony Name",
                  labelKey: "UC_BLDG_NAME_LABEL"
                },
                placeholder: {
                  labelName: "Enter Building/Colony Name",
                  labelKey: "UC_BLDG_NAME_PLACEHOLDER"
                },
                pattern: getPattern("BuildingStreet"),
                jsonPath: "Demands[0].address.buildingName"
              }),
              ConsumerStreetName: getTextField({
                label: {
                  labelName: "Street Name",
                  labelKey: "UC_SRT_NAME_LABEL"
                },
                placeholder: {
                  labelName: "Enter Street Name",
                  labelKey: "UC_SRT_NAME_PLACEHOLDER"
                },
                pattern: getPattern("BuildingStreet"),
                jsonPath: "Demands[0].address.street"
              }),         

              ConsumerLocMohalla: {
                uiFramework: "custom-containers",
                componentPath: "AutosuggestContainer",
                jsonPath: "Demands[0].address.locality.code",
                required: true,
                props: {
                  style: {
                    width: "100%",
                    cursor: "pointer"
                  },
                  hasZindex:true,
                  label: {
                    labelName: "Mohalla",
                    labelKey: "UC_MOHALLA_LABEL"
                  },
                  placeholder: {
                    labelName: "Select Mohalla",
                    labelKey: "UC_MOHALLA_PLACEHOLDER"
                  },
                  jsonPath: "Demands[0].address.locality.code",
                  sourceJsonPath: "applyScreenMdmsData.tenant.localities",
                  labelsFromLocalisation: true,
                  suggestions: [],
                  fullwidth: true,
                  required: true,
                  inputLabelProps: {
                    shrink: true
                  }                 
                },              
                gridDefination: {
                  xs: 12,
                  sm: 6
                }
              },              
        },        
        ) 
      },
      {
        style: {
          overflow: "visible"
        }
      }
  )