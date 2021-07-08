import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getPattern,
  getDateField,
  getLabel,
  getCommonHeader,
  getCommonGrayCard,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
//   import { searchApiCall } from "./functions";
import commonConfig from "config/common.js";
import { disableField,enableField } from "egov-ui-framework/ui-utils/commons";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getHeaderSideText } from "../../utils";
import get from 'lodash/get';
import { httpRequest } from '../../../../../ui-utils/index';
import set from 'lodash/set';
import { getTodaysDateInYMD, getQueryArg, getObjectKeys, getObjectValues } from 'egov-ui-framework/ui-utils/commons';
import { isModifyMode } from "../../../../../ui-utils/commons";

let isMode = isModifyMode();

const getPlumberRadioButton = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-wns",
  componentPath: "RadioGroupContainer",
  gridDefination: { xs: 12, sm: 12 },
  jsonPath: "applyScreen.additionalDetails.detailsProvidedBy",
  props: {
    label: { key: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY" },
    buttons: [
      { labelKey: "WS_PLUMBER_ULB", value: "ULB" },
      { labelKey: "WS_PLUMBER_SELF", value: "Self" },
    ],
    required: false
  },
  type: "array"
};


export const triggerUpdateByKey = (state, keyIndex, value, dispatch) => {
  if(dispatch == "set"){
    set(state, `screenConfiguration.preparedFinalObject.DynamicMdms.ws-services-masters.waterSource.selectedValues[${keyIndex}]`, value);
  } else {
    dispatch(prepareFinalObject( `DynamicMdms.ws-services-masters.waterSource.${keyIndex}`, value ));
  }
}
export const updateWaterSource = async ( state, dispatch ) => {  
  const waterSource = get( state, "screenConfiguration.preparedFinalObject.WaterConnection[0].waterSource", null);
  const waterSubSource = get( state, "screenConfiguration.preparedFinalObject.WaterConnection[0].waterSubSource", null);
  let modValue = waterSource + "." + waterSubSource;
  let i = 0;
  let formObj = {
    waterSourceType: waterSource, waterSubSource: modValue
  }
  triggerUpdateByKey(state, i, formObj, 'set');

  triggerUpdateByKey(state, `waterSubSourceTransformed.allDropdown[${i}]`, getObjectValues(get( state, `screenConfiguration.preparedFinalObject.DynamicMdms.ws-services-masters.waterSource.waterSourceTransformed.${waterSource}`, [])) , dispatch);

  triggerUpdateByKey(state, `selectedValues[${i}]`, formObj , dispatch);
} 
const waterSourceTypeChange = (reqObj) => {
  try {
      let { dispatch, value, state } = reqObj;
      
      dispatch(prepareFinalObject("WaterConnection[0].waterSource", value));
      dispatch(prepareFinalObject("WaterConnection[0].waterSubSource", ''));
      let mStep = (isModifyMode()) ? 'formwizardSecondStep' : 'formwizardThirdStep'; 
      console.log("mstep---",mStep);
      if(value!=="OTHERS")
      {
         dispatch(
           handleField(
             "apply",
             "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo",
             "props.value",
             "NA"
           )
         );
        disableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo', dispatch);
        //enableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSubSource', dispatch);
      }
      else
      {
        // dispatch(
        //   handleField(
        //     "apply",
        //     `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo`,
        //     "disabled",
        //     false
        //   )
        // );
        enableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.sourceInfo', dispatch);
        //disableField('apply', 'components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSubSource', dispatch);
      }
      let formObj = {
        waterSourceType: value, waterSubSource: ''
      }
      triggerUpdateByKey(state, `selectedValues[0]`, formObj , dispatch);
    
  } catch (e) {
    console.log(e);
  }
}
const waterSubSourceChange = (reqObj) => {
  try {
      let { dispatch, value } = reqObj;
      let rowValue = value.split(".");
      dispatch(prepareFinalObject("WaterConnection[0].waterSubSource", rowValue[1]));
  } catch (e) {
    console.log(e);
  }
}

const waterUsageTypeChange = (reqObj) => {
  try {
      let { dispatch, value, state } = reqObj;
      console.log("value---",value);
      dispatch(prepareFinalObject("WaterConnection[0].waterUsageType", value));
      dispatch(prepareFinalObject("WaterConnection[0].waterUsageSubType", ''));
      let mStep = (isModifyMode()) ? 'formwizardSecondStep' : 'formwizardThirdStep'; 
      console.log("mstep---",mStep);
    
      let formObj = {
        waterUsageType: value, waterUsageSubType: ''
      }
      triggerUpdateByKey(state, `selectedValues[0]`, formObj , dispatch);
    
  } catch (e) {
    console.log(e);
  }
}



export const additionDetails = getCommonCard({
  header: getCommonHeader({
    labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
  }),
  connectiondetailscontainer: getCommonGrayCard({
    subHeader: getCommonTitle({
      labelKey: "WS_COMMON_CONNECTION_DETAILS"
    }),

    connectionDetails: getCommonContainer({
      connectionType: {
        ...getSelectField({
          label: { labelKey: "WS_SERV_DETAIL_CONN_TYPE" },
          placeholder: { labelKey: "WS_ADDN_DETAILS_CONN_TYPE_PLACEHOLDER" },
          required: false,
          sourceJsonPath: "applyScreenMdmsData.ws-services-masters.connectionType",
          gridDefination: { xs: 12, sm: 6 },
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          jsonPath: "applyScreen.connectionType",
          required:false,        
        }),
        afterFieldChange: async (action, state, dispatch) => {
          let connType = await get(state, "screenConfiguration.preparedFinalObject.applyScreen.connectionType");
          if (connType === undefined || connType === "Non Metered" || connType === "Bulk-supply" || connType !== "Metered") {
            showHideFeilds(dispatch, false);
          }
          else {
            showHideFeilds(dispatch, true);
          }
        }
      },

      numberOfTaps: getTextField({
        label: { labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" },
        placeholder: { labelKey: "WS_SERV_DETAIL_NO_OF_TAPS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfTaps",
        pattern :/^[1-9][0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        
      }),
      pipeSize: getSelectField({
        label: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE" },
        placeholder: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        sourceJsonPath: "applyScreenMdmsData.ws-services-calculation.pipeSize",
        jsonPath: "applyScreen.pipeSize",
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      }),
      authorizedConnection: getSelectField({
        label: { labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN" },
        sourceJsonPath: "applyScreenMdmsData.ws-services-masters.authorizedConnection",
        placeholder: { labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN_PLACEHOLDER" },
        required: false,
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.authorizedConnection"
      }),
      motorInfo: getSelectField({
        label: { labelKey: "WS_SERV_DETAIL_MOTOR_INFO" },
        sourceJsonPath: "applyScreenMdmsData.ws-services-masters.motorInfo",
        placeholder: { labelKey: "WS_SERV_DETAIL_MOTOR_INFO_PLACEHOLDER" },
        required: false,
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.motorInfo"
      }),
      dynamicMdmsWaterSource : {
        uiFramework: "custom-containers",
        componentPath: "DynamicMdmsContainer",
        
        props: {
          dropdownFields: [
            {
              key : 'waterSourceType',
              isRequired: false,
              requiredValue : false,
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              callBack: waterSourceTypeChange 
            },
            {
              key : 'waterSubSource',
              isRequired: false,
              requiredValue : false,
              errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
              callBack: waterSubSourceChange 
            }
          ],
          moduleName: "ws-services-masters",
          masterName: "waterSource",
          rootBlockSub : 'waterSource',
          callBackEdit: updateWaterSource
        }
      },
      sourceInfo: getTextField({
        label: {
          labelKey: "WS_SERV_DETAIL_SOURCE_INFO"
        },
        placeholder: {
          labelKey: "WS_SERV_DETAIL_SOURCE_INFO_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        visible : false,
        pattern: getPattern("Name"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.sourceInfo"
      }),
      noOfWaterClosets: getTextField({
        label: { labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS" },
        placeholder: { labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfWaterClosets",
        pattern: /^[1-9][0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      }),
      noOfToilets: getTextField({
        label: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS" },
        placeholder: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfToilets",
        pattern: /^[1-9][0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      }),
      drainageSize: getSelectField({
        label: { labelKey: "WS_SERV_DETAIL_DRAINAGE_SIZE" },
        sourceJsonPath: "applyScreenMdmsData.sw-services-calculation.drainageSize",
        placeholder: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE_PLACEHOLDER" },
        
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.drainageSize"
      }),

    
      
      usageType: getSelectField({
              label: {
                labelName: "Usage Type",
                labelKey: "WS_COMMON_USAGE_TYPE"
              },
             
              //required: true,
              jsonPath: "applyScreen.usageCategory",
              sourceJsonPath: "applyScreenMdmsData.ws-services-masters.waterUsage",     
             
              gridDefination: { xs: 12, sm: 6 },
              localePrefix: {
                moduleName: "WS",
                masterName: "WSUSGTYPE"
              },
              beforeFieldChange: async (action, state, dispatch) => {
                   rendersubUsageType(action.value,  dispatch, state)
              }
         }),
        subUsageType:{
          uiFramework: "custom-containers-local",
          moduleName: "egov-pt",
          componentPath: "AutosuggestContainer",
          props: {
              style: {
                  width: "100%",
                  cursor: "pointer"
                },
              label: {
                  labelName: "Sub Usage Type",
                  labelKey: "WS_SUB_USAGE_TYPE"
              },
              placeholder: {
                labelName: "Select Sub usage",
                labelKey: "WS_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
            },
        
                        
              localePrefix: {
                  moduleName: "WS",
             			 masterName: "WSSUBUSGTYPE"
              },
              jsonPath: "applyScreen.subUsageCategory",
              sourceJsonPath:"propsubusagetypeForSelectedusageCategory",
              className: "autocomplete-dropdown pds-search",
              labelsFromLocalisation: true,
             required: false,        
              disabled: false,
              isClearable: true,      
              fullwidth: true,
           
          },
          required: false,
          visible: false,
          jsonPath: "applyScreen.subUsageCategory",
          gridDefination: { xs: 12, sm: 6 },
          
       },

    }),
 
    
  }),
  plumberDetailsContainer: getCommonGrayCard({
    subHeader: getCommonTitle({
      labelKey: "WS_COMMON_PLUMBER_DETAILS"
    }),
     plumberDetails: getCommonContainer({
      getPlumberRadioButton,
      plumberLicenceNo: getTextField({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern:  /^[a-zA-Z0-9/-]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].licenseNo"
      }),
      plumberName: getTextField({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: getPattern("Name"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].name"
      }),
      plumberMobNo: getTextField({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL_PLACEHOLDER"
        },
        gridDefination: { xs: 12, sm: 6 },
        iconObj: { label: "+91 |", position: "start" },
        required: false,
        pattern: getPattern("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].mobileNumber"
      }),
     // visible:false,
    })
  }),
  

  
  wsConnectionTaxHeadsContainer: getCommonGrayCard({
    subHeader: getCommonTitle({
      labelKey: "WF_ESTIMATION"
    }),
   
    wsConnectionTaxHeads:getCommonContainer({}),
    roadCuttingChargeContainer:getCommonContainer({
      subHeader: getCommonTitle({
        labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILS"
      }),
     
       roadDetails: getCommonContainer({
          
       }),
       break: getBreak(),
    })

  }),


  
  activationDetailsContainer: getCommonGrayCard({
    subHeader: getCommonTitle({
      labelKey: "WS_ACTIVATION_DETAILS"
    }),
    activeDetails: getCommonContainer({
      connectionExecutionDate: getDateField({
        label: { labelName: "connectionExecutionDate", labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" },
        // placeholder: {
        //   labelName: "Select From Date",
        //   labelKey: "WS_FROM_DATE_PLACEHOLDER"
        // },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: true,
        pattern: getPattern("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.connectionExecutionDate",
        props: {
          inputProps: {
            min: getTodaysDateInYMD()
          }
        }
      }),
      meterID: getTextField({
        label: {
          labelKey: "WS_SERV_DETAIL_METER_ID"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_METER_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern :/^[#.\\/0-9a-zA-Z\s,-]+$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.meterId"
      }),
      meterInstallationDate: getDateField({
        label: { labelName: "meterInstallationDate", labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE" },
        // placeholder: {
        //   labelName: "Select From Date",
        //   labelKey: "WS_FROM_DATE_PLACEHOLDER"
        // },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: getPattern("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.meterInstallationDate",
        props: {
          inputProps: {
            min: getTodaysDateInYMD()
          }
        }
      }),
      initialMeterReading: getTextField({
        label: {
          labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.additionalDetails.initialMeterReading"
      })
    })
  }),
  modificationsEffectiveFrom : getCommonGrayCard({
    subHeader: getCommonTitle({
      labelKey: "WS_MODIFICATIONS_EFFECTIVE_FROM"
    }),
    modificationEffectiveDate: getCommonContainer({
      connectionExecutionDate: getDateField({
        label: { labelName: "Modifications Effective Date", labelKey: "MODIFICATIONS_EFFECTIVE_DATE" },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: true,
        pattern: getPattern("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.dateEffectiveFrom",
        props: {
          inputProps: {
            min: getTodaysDateInYMD()
          }
        }
      }),
      
    })
  }),
 
});

export const rendersubUsageType = (usageType, dispatch, state) => {
 
  
    let subTypeValues = get(
      state.screenConfiguration.preparedFinalObject,
      "applyScreenMdmsData.ws-services-masters.waterSubUsage"
    );
 
    const additionalDetailsJson = "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.subUsageType"; 
  
    let subUsage;     
            
          if (usageType == "COMMERCIAL" || usageType == "RESIDENTIAL") {        
              dispatch(handleField("apply", additionalDetailsJson, "visible", true));
              dispatch(handleField("apply", additionalDetailsJson, "props.visible", true));
              subUsage = subTypeValues.filter(cur => {
                return (cur.code.startsWith(usageType))
            })
          
          } else {
              set(state.screenConfiguration.preparedFinalObject,"applyScreen.subUsageCategory", ""); 
              set(state.screenConfiguration.preparedFinalObject,"applyScreen.subUsageCategory", ""); 
              dispatch(handleField("apply", additionalDetailsJson, "visible", false));
              dispatch(handleField("apply", additionalDetailsJson, "props.visible", false));        
          } 
 
  

    dispatch(
      prepareFinalObject(
        "propsubusagetypeForSelectedusageCategory",
        subUsage
      )
    )
  
  }

const showHideFeilds = (dispatch, value) => {
  let mStep = (isModifyMode()) ? 'formwizardSecondStep' : 'formwizardThirdStep'; 
  dispatch(
    handleField(
      "apply",
      `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      `components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID`,
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate",
      "visible",
      value
    )
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId",
      "visible",
      value
    )
  );
}