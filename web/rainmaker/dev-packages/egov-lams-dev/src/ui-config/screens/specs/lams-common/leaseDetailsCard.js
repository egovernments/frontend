import {
  getCommonCard,
  getTextField,
  getBreak,
  getCommonContainer,
  getPattern,
  getDivider,
  getCommonTitle,
  getSelectField,
  getCommonParagraph,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getCommonValue,
  getCommonCaption
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDate, checkValueForNA } from "egov-ui-framework/ui-config/screens/specs/utils";


const addSpace = data => {
  return ""+checkValueForNA(data);;
};

const addMoneySuffix = data => {
  data = checkValueForNA(data);
  return data==="NA"? data: data+" /-";
};

export const getLeaseDetailsCard = (inJsonPath) => {
  return getCommonGrayCard({

    header: getCommonSubHeader(
      {
        labelName: "Lease Details ",
        labelKey: "LAMS_DETAILS_HEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      },

    ),
    leaseDetailsContainer: getCommonContainer(
      {
        surveyNo: getLabelWithValue(
          {
            labelName: "Survey No",
            labelKey: "LAMS_SURVEYNO"
          },
          {
            jsonPath: inJsonPath + ".surveyNo",
            callBack: checkValueForNA
          }
        ),
        mutationId: getLabelWithValue(
          {
            labelName: "Mutation Id ",
            labelKey: "LAMS_MUTATIONID"
          },
          {
            jsonPath: inJsonPath + ".mutationId",
            callBack: checkValueForNA
          }
        ),
        volume: getLabelWithValue(
          {
            labelName: "Volume",
            labelKey: "LAMS_VOLUME"
          },
          {
            jsonPath: inJsonPath + ".volume",
            callBack: checkValueForNA
          }
        ),
        pageOfRegister: getLabelWithValue(
          {
            labelName: "Page No",
            labelKey: "LAMS_PAGEOFREGISTER"
          },
          {
            jsonPath: inJsonPath + ".pageOfRegister",
            callBack: checkValueForNA
          }
        )
      }),
    //divider1: getDivider(),
    leaseDetailsContainer2: getCommonContainer(
      {
        landLord: getLabelWithValue(
          {
            labelName: "Land lord",
            labelKey: "LAMS_LANDLORD"
          },
          {
            jsonPath: inJsonPath + ".landLord",
            callBack: checkValueForNA
          }
        ),
        area: getLabelWithValue(
          {
            labelName: "Area",
            labelKey: "LAMS_AREA"
          },
          {
            jsonPath: inJsonPath + ".area",
            callBack: checkValueForNA
          }
        ),
        class: getLabelWithValue(
          {
            labelName: "Description",
            labelKey: "LAMS_CLASS"
          },
          {
            jsonPath: inJsonPath + ".classSurvey",
            callBack: checkValueForNA
          }
        ),
        managedBy: getLabelWithValue(
          {
            labelName: "Managed by",
            labelKey: "LAMS_MANAGEDBY"
          },
          {
            jsonPath: inJsonPath + ".managedBy",
            callBack: checkValueForNA
          }
        ),
      }),
    //divider2: getDivider(),
    leaseDetailsContainer3: getCommonContainer(
      {

        rentTowardCentGovt: getLabelWithValue(
          {
            labelName: "Rent towards Central Govt",
            labelKey: "LAMS_RENT_CENTGOVT"
          },
          {
            jsonPath: inJsonPath + ".rentTowardsCentGovt",
            callBack: addMoneySuffix
          }
        ),
        rentTowardCB: getLabelWithValue(
          {
            labelName: "Rent towards CB",
            labelKey: "LAMS_RENT_CB"
          },
          {
            jsonPath: inJsonPath + ".rentTowardsCB",
            callBack: addMoneySuffix
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider2: getDivider(),
    caption2: getCommonCaption({
      labelName: "Details and Mutation Date",
      labelKey: "LAMS_DETAILSMUTDATE"
    }),
    value2: getCommonValue({
      jsonPath: inJsonPath + ".detailsAndMutDate",
      callBack: addSpace
    }),
    divider3: getDivider(),
    caption3: getCommonCaption({
      labelName: "Description",
      labelKey: "LAMS_DESCRIPTION"
    }),
    value3: getCommonValue({
      jsonPath: inJsonPath + ".description",
      callBack: addSpace
    }),
    // leaseDetailsContainer4: getCommonContainer(
    //   {
    //     caption: getCommonCaption({
    //       labelName: "Description",
    //       labelKey: "LAMS_DESCRIPTION"
    //     }),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".description",
    //       callBack: addSpace
    //     }),
    //     // description: getLabelWithValue(
    //     //   {
    //     //     labelName: "Description",
    //     //     labelKey: "LAMS_DESCRIPTION"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".description",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // )
    //   }),
    divider4: getDivider(),
    caption4: getCommonCaption({
      labelName: "Occupancy Rights Holder",
      labelKey: "LAMS_OCCUPANCYRIGHTSHOLDER"
    }),
    value4: getCommonValue({
      jsonPath: inJsonPath + ".holderOfOccupancyRights",
      callBack: addSpace
    }),
    // leaseDetailsContainer5: getCommonContainer(
    //   {
    //     caption: getCommonCaption({
    //       labelName: "Occupancy Rights Holder",
    //       labelKey: "LAMS_OCCUPANCYRIGHTSHOLDER"
    //     }),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".holderOfOccupancyRights",
    //       callBack: addSpace
    //     }),
    //     // holderOfOccupancyRights: getLabelWithValue(
    //     //   {
    //     //     labelName: "Occupancy Rights Holder",
    //     //     labelKey: "LAMS_OCCUPANCYRIGHTSHOLDER"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".holderOfOccupancyRights",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // )
    //   }),
    divider5: getDivider(),
    caption5: getCommonCaption({
      labelName: "Nature of Holder Rights",
      labelKey: "LAMS_NATUREOFHOLDERRIGHTS"
    }),
    value5: getCommonValue({
      jsonPath: inJsonPath + ".natureOfHolderRights",
      callBack: addSpace
    }),
    // leaseDetailsContainer6: getCommonContainer(
    //   {
    //     caption: getCommonCaption({
    //       labelName: "Nature of Holder Rights",
    //       labelKey: "LAMS_NATUREOFHOLDERRIGHTS"
    //     }),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".natureOfHolderRights",
    //       callBack: addSpace
    //     }),
    //     // natureOfHolderRights: getLabelWithValue(
    //     //   {
    //     //     labelName: "Nature of Holder Rights",
    //     //     labelKey: "LAMS_NATUREOFHOLDERRIGHTS"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".natureOfHolderRights",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // ),
    //   }),
    divider6: getDivider(),
    caption6: getCommonCaption({
      labelName: "Remarks",
      labelKey: "LAMS_REMARKS"
    }),
    value6: getCommonValue({
      jsonPath: inJsonPath + ".remarks",
      callBack: addSpace
    }),
    // leaseDetailsContainer7: getCommonContainer(
    //   {
    //     caption: getCommonCaption({
    //       labelName: "Remarks",
    //       labelKey: "LAMS_REMARKS"
    //     }),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".remarks",
    //       callBack: addSpace
    //     }),
    //     // remarks: getLabelWithValue(
    //     //   {
    //     //     labelName: "Remarks",
    //     //     labelKey: "LAMS_REMARKS"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".remarks",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // )
    //   }),
    divider7: getDivider(),
    caption7: getCommonCaption({
      labelName: "Lease as per GLR",
      labelKey: "LAMS_AS_PER_GLR",
      props:{
        style:{
          display:"block",
        },
      },
    }),
    //break: getBreak(),
    value7: getCommonValue({
      jsonPath: inJsonPath + ".lesseAsPerGLR",
      props:{
        style:{
          display:"block",
        }
      },
      callBack: addSpace
    }),
    // leaseDetailsContainer8: getCommonContainer(
    //   {
    //     props:{
    //       style:{
    //         display:"block",
    //       }
    //     },
    //     caption: getCommonCaption({
    //       labelName: "Lease as per GLR",
    //       labelKey: "LAMS_AS_PER_GLR",
    //       props:{
    //         style:{
    //           display:"block",
    //         },
    //       },
    //     }),
        
    //     break: getBreak(),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".lesseAsPerGLR",
    //       props:{
    //         style:{
    //           display:"block",
    //         }
    //       },
    //       callBack: addSpace
    //     }),
    //     // lesseDetails: getLabelWithValue(
    //     //   {
    //     //     labelName: "Lessee Details",
    //     //     labelKey: "LAMS_LESSEEDETAILS"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".lesseeDetails",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // ),
    //   },
    //   {
    //     style: {
    //       overflow: "visible"
    //     }
    //   }
    // ),
    // leaseDetailsContainer: getCommonContainer(
    //   {
    //     termNo: getLabelWithValue(
    //       {
    //         labelName: "Term Number",
    //         labelKey: "LAMS_TERMNO"
    //       },
    //       {
    //         jsonPath: inJsonPath+".termNo",
    //         //callBack: convertEpochToDate
    //       }
    //     ),
    //     area: getLabelWithValue(
    //       {
    //         labelName: "Area ",
    //         labelKey: "LAMS_AREA"
    //       },
    //       {
    //         jsonPath: inJsonPath+".area",
    //         //callBack: convertEpochToDate
    //       }
    //     ),
    //     termExpiryDate:getLabelWithValue(
    //       {
    //         labelName: "Term Number",
    //         labelKey: "LAMS_TERM_EXP_DATE"
    //       },
    //       {
    //         jsonPath: inJsonPath+".termExpiryDate",
    //         callBack: convertEpochToDate
    //       }
    //     ),
    //     annualRent:getLabelWithValue(
    //       {
    //         labelName: "Annual Rent",
    //         labelKey: "LAMS_ANN_RENT"
    //       },
    //       {
    //         jsonPath: inJsonPath+".annualRent",
    //         //callBack: convertEpochToDate
    //       }
    //     ),
    //   },
    //   {
    //     style: {
    //       overflow: "visible"
    //     }
    //   }
    // ),
    divider9: getDivider(),


    // leaseDetailsContainer9: getCommonContainer(
    //   {
    //     caption: getCommonCaption({
    //       labelName: "Lease as per GLR",
    //       labelKey: "LAMS_AS_PER_GLR"
    //     }),
    //     break: getBreak(),
    //     value: getCommonValue({
    //       jsonPath: inJsonPath + ".lesseAsPerGLR",
    //       callBack: addSpace
    //     }),
    //     // lesseAsPerGLR: getLabelWithValue(
    //     //   {
    //     //     labelName: "Lease as per GLR",
    //     //     labelKey: "LAMS_AS_PER_GLR"
    //     //   },
    //     //   {
    //     //     jsonPath: inJsonPath + ".lesseAsPerGLR",
    //     //     //callBack: convertEpochToDate
    //     //   }
    //     // )
    //   },
    //   {
    //     style: {
    //       overflow: "visible"
    //     }
    //   }
    // ),
  });
}