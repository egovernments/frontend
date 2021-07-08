import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabelWithValueForModifiedLabel,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { convertEpochToDateAndHandleNA, handleNA,handleRoadType,handleMeterReading } from "../../utils";
import { serviceConst } from "../../../../../ui-utils/commons";
const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const connectionDetailsHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

const connectionChargeDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PLUMBER_DETAILS"
});

const roadCuttingChargesHeader = getHeader({
 // labelKey: "WS_ROAD_CUTTING__DETAILS"
   labelKey:"WS_ROAD_CUTTING_CHARGE_DETAILS"
});

const activationDetailsHeader = getHeader({
  labelKey: "WS_ACTIVATION_DETAILS"
});

export const getReviewOwner = (isEditable = true) => {
  
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Additional Details ( To be filled by Municipal Employee)",
            labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSixWS: renderServiceForWater(),
    viewSixVS: renderServiceForSW(),
    // viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    viewNine: roadCuttingChargesHeader,
    //viewTen: getRoadCharges(),
    viewTen: getRoadCharges(),
    viewThirteen: getRoadCuttingChargesNA(),
    viewEleven: activationDetailsHeader,
    viewTwelve: activationDetails,
   
  })
};

export const getRoadCuttingChargesNA = () => {
  return getCommonContainer(reviewRoadType);
}



export const reviewRoadType = {
  roadCuttingInfoNA:getLabelWithValueForModifiedLabel(
  {
    labelName: "Road Type",
    labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
  },
  {
    jsonPath: "WaterConnection[0].roadType",
    callBack: handleNA
  }
 )
}

export const plumberDetails={
  reviewPlumberProvidedBy : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber provided by",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
    },
    {
      jsonPath: "WaterConnection[0].additionalDetails.detailsProvidedBy",
      callBack: handleNA
    },
    //  {
    //   labelKey: "WS_OLD_LABEL_NAME"
    // },
    // {
    //   jsonPath: "WaterConnectionOld[0].additionalDetails.detailsProvidedBy",
    //   callBack: handleNA
    // }
  ),
  reviewPlumberLicenseNo : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber licence No",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].plumberInfo[0].licenseNo",
      callBack: handleNA
    },
    //  {
    //   labelKey: "WS_OLD_LABEL_NAME"
    // },
    // {
    //   jsonPath: "WaterConnectionOld[0].plumberInfo[0].licenseNo",
    //   callBack: handleNA
    // }
  ),
  reviewPlumberName : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber Name",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
    },
    { jsonPath: "WaterConnection[0].plumberInfo[0].name",
      callBack: handleNA 
    }, 
    //   {
    //     labelKey: "WS_OLD_LABEL_NAME"
    //   },
    //   { jsonPath: "WaterConnectionOld[0].plumberInfo[0].name",
    //   callBack: handleNA 
    // }
  ),
  reviewPlumberMobileNo : getLabelWithValueForModifiedLabel(
    {
      labelName: "Plumber mobile No.",
      labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
    },
    { jsonPath: "WaterConnection[0].plumberInfo[0].mobileNumber",
      callBack: handleNA 
    },
      //  {
      //   labelKey: "WS_OLD_LABEL_NAME"
      // },
      // { jsonPath: "WaterConnectionOld[0].plumberInfo[0].mobileNumber",
      // callBack: handleNA }
  )


}
const connectionChargeDetails = getCommonContainer(plumberDetails);

export const roadDetails={
  getCommonContainerreviewRoadType : getLabelWithValue(
    {
      labelName: "Road Type",
      labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].tempRoadType[0].roadType",
      callBack: handleRoadType
    },
    

  ),
 
  reviewlength : getLabelWithValue(
    {
      labelName: "Length (in meter)",
      labelKey: "WS_ADDN_DETAILS_LENGTH_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].tempRoadType[0].length",
      callBack: handleNA
    }
  ),
 
  reviewBreadth : getLabelWithValue(
    {
      labelName: "Breadth (in meter)",
      labelKey: "WS_ADDN_DETAILS_BREADTH_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].tempRoadType[0].breadth",
      callBack: handleNA
    }
  ),
  reviewDepth : getLabelWithValue(
    {
      labelName: "Depth (in meter)",
      labelKey: "WS_ADDN_DETAILS_DEPTH_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].tempRoadType[0].depth",
      callBack: handleNA
    }
  ),
  
  reviewRate : getLabelWithValue(
    {
      labelName: "Rate (in meter)",
      labelKey: "WS_ADDN_DETAILS_RATE_LABEL"
    },
    {
      jsonPath: "WaterConnection[0].tempRoadType[0].rate",
      callBack: handleNA
    }
  )
}

// This code was used earlier using multi-item
// Issues:- 1)Sometimes data not getting populated
//          2)Rate is displayed on next line.
//Can be removed once fine turning of pdf is done
const getRoadCharges1 = ()=>{
  return({
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "common-div-css search-preview",
    scheama: getCommonGrayCard({
      roadDetailContainer: getCommonContainer(roadDetails)

    }),
    items: [],
    hasAddItem: false,
    //visible:false,
    //isReviewPage: true,
    sourceJsonPath: "WaterConnection[0].tempRoadType",
    prefixSourceJsonPath: "children.cardContent.children.roadDetailContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
   },
  //visible:false,
  type: "array"
  })
}


const getRoadCharges = () =>{ 
  return  getCommonContainer({  })     
}
export const activateDetailsMeter={
  reviewConnectionExecutionDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ),
  reviewMeterId : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter ID",
      labelKey: "WS_SERV_DETAIL_METER_ID"
    },
    { jsonPath: "WaterConnection[0].meterId",
      callBack: handleNA }, {
        labelKey: "WS_OLD_LABEL_NAME"
      },
      { jsonPath: "WaterConnectionOld[0].meterId",
      callBack: handleNA }
  ),
  reviewMeterInstallationDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Meter Installation Date",
      labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
    },
    {
      jsonPath: "WaterConnection[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].meterInstallationDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ),
  reviewInitialMeterReading : getLabelWithValue(
    {
      labelName: "Initial Meter Reading",
      labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
    },
    {
       jsonPath: "WaterConnection[0].additionalDetails.initialMeterReading",
      callBack: handleMeterReading 
    }
    // , 
    //   {
    //     labelKey: "WS_OLD_LABEL_NAME"
    //   },
    //   { jsonPath: "WaterConnectionOld[0].additionalDetails.initialMeterReading",
    //   callBack: handleMeterReading
    //  }
  )

}
export const activateDetailsNonMeter={
  reviewConnectionExecutionDate : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Execution Date",
      labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
    },
    {
      jsonPath: "WaterConnection[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionExecutionDate",
      callBack: convertEpochToDateAndHandleNA
    }
  ) 
}
const activationDetails = getCommonContainer(activateDetailsMeter);



export const connectionWater={
  reviewConnectionType : getLabelWithValueForModifiedLabel(
    {
      labelName: "Connection Type",
      labelKey: "WS_SERV_DETAIL_CONN_TYPE"
    },
    {
      jsonPath: "WaterConnection[0].connectionType",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].connectionType",
      callBack: handleNA
    }
  ),
  reviewNumberOfTaps : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Taps",
      labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
    },
    {
      jsonPath: "WaterConnection[0].noOfTaps",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].noOfTaps",
      callBack: handleNA
    }
  ),
  reviewWaterSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Source",
      labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSource",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSource",
      callBack: handleNA
    }
  ),
  reviewWaterSubSource : getLabelWithValueForModifiedLabel(
    {
      labelName: "Water Sub Source",
      labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
    },
    {
      jsonPath: "WaterConnection[0].waterSubSource",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].waterSubSource",
      callBack: handleNA
    }
  ),
  // reviewSourceInfo : getLabelWithValueForModifiedLabel(
  //   {
  //     labelName: "Water Source Info",
  //     labelKey: "WS_SERV_DETAIL_WATER_SOURCE_INFO"
  //   },
  //   {
  //     jsonPath: "WaterConnection[0].sourceInfo",
  //     callBack: handleNA
  //   }, {
  //     labelKey: "WS_OLD_LABEL_NAME"
  //   },
  //   {
  //     jsonPath: "WaterConnectionOld[0].sourceInfo",
  //     callBack: handleNA
  //   }
  // ),
   reviewPipeSize : getLabelWithValueForModifiedLabel(
    {
      labelName: "Pipe Size (in inches)",
      labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
    },
    {
      jsonPath: "WaterConnection[0].pipeSize",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].pipeSize",
      callBack: handleNA
    }
  ),
  reviewMotorInfo : getLabelWithValueForModifiedLabel(
   {
     labelName: "Motor Info",
     labelKey: "WS_SERV_DETAIL_MOTOR_INFO"
   },
   {
     jsonPath: "WaterConnection[0].motorInfo",
     callBack: handleNA
   }, {
     labelKey: "WS_OLD_LABEL_NAME"
   },
   {
     jsonPath: "WaterConnectionOld[0].motorInfo",
     callBack: handleNA
   }
 ),
 reviewAuthorizedConnection : getLabelWithValueForModifiedLabel(
  {
    labelName: "Authorized Connection",
    labelKey: "WS_SERV_DETAIL_AUTHORIZED_CONN"
  },
  {
    jsonPath: "WaterConnection[0].authorizedConnection",
    callBack: handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].authorizedConnection",
    callBack: handleNA
  }
),
reviewUsageType : getLabelWithValueForModifiedLabel(
  {
    labelName: "Usage Type",
    labelKey: "WS_COMMON_USAGE_TYPE"
  },
  {
    localePrefix: {
      moduleName: "WS",
      masterName: "WSUSGTYPE"
    },
    jsonPath: "WaterConnection[0].usageCategory",
    callBack: handleNA
  },
   {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    localePrefix: {
      moduleName: "WS",
      masterName: "WSUSGTYPE"
    },
    jsonPath: "WaterConnectionOld[0].usageCategory",
    callBack: handleNA
  },

),
reviewSubUsageType: getLabelWithValueForModifiedLabel(
  {
    labelName: "Sub Usage Type",
    labelKey: "WS_SUB_USAGE_TYPE"
  },
  {
    localePrefix: {
      moduleName: "WS",
      masterName: "WSSUBUSGTYPE"
    },
    jsonPath: "WaterConnection[0].subUsageCategory",
    callBack: handleNA
  },
   {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    localePrefix: {
      moduleName: "WS",
      masterName: "WSSUBUSGTYPE"
    },
    jsonPath: "WaterConnectionOld[0].subUsageCategory",
    callBack: handleNA
  },
  // {
  //   jsonPath: "WaterConnectionOld[0].usageCategory",
  //   callBack: handleNA
  // }
),


}

export const connectionSewerage={
  // reviewConnectionType : getLabelWithValueForModifiedLabel(
  //   {
  //     labelName: "Connection Type",
  //     labelKey: "WS_SERV_DETAIL_CONN_TYPE"
  //   },
  //   {
  //     jsonPath: "WaterConnection[0].connectionType",
  //     callBack: handleNA
  //   }, {
  //     labelKey: "WS_OLD_LABEL_NAME"
  //   }, {
  //     jsonPath: "WaterConnectionOld[0].connectionType",
  //     callBack: handleNA
  //   }
  // ),
   reviewWaterClosets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Water Closets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfWaterClosets",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfWaterClosets",
      callBack: handleNA
    }
  ),
   reviewNoOfToilets : getLabelWithValueForModifiedLabel(
    {
      labelName: "No. of Toilets",
      labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
    },
    {
      jsonPath: "WaterConnection[0].noOfToilets",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    }, {
      jsonPath: "WaterConnectionOld[0].noOfToilets",
      callBack: handleNA
    }
  ),
  reviewDrainageSize : getLabelWithValueForModifiedLabel(
    {
      labelName: "Drainage Size (in inches)",
      labelKey: "WS_SERV_DETAIL_DRAINAGE_SIZE"
    },
    {
      jsonPath: "WaterConnection[0].drainageSize",
      callBack: handleNA
    }, {
      labelKey: "WS_OLD_LABEL_NAME"
    },
    {
      jsonPath: "WaterConnectionOld[0].drainageSize",
      callBack: handleNA
    }
  )
}

export const additionDetailsWater=connectionWater;

export const additionDetailsSewerage=connectionSewerage;

export const renderService = () => {
  let isService = getQueryArg(window.location.href, "service");
  if (isService === serviceConst.WATER) {
    return getCommonContainer(connectionWater);
  } else if (isService === serviceConst.SEWERAGE) {
    return getCommonContainer(connectionSewerage)
  }
}

export const renderServiceForWater = () => {
  return getCommonContainer(connectionWater);
}

export const renderServiceForSW = () => {
  return getCommonContainer(connectionSewerage)
}