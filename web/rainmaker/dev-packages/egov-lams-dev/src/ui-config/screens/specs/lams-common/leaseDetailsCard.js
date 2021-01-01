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
import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";


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
            //callBack: convertEpochToDate
          }
        ),
        mutationId: getLabelWithValue(
          {
            labelName: "Mutation Id ",
            labelKey: "LAMS_MUTATIONID"
          },
          {
            jsonPath: inJsonPath + ".mutationId",
            //callBack: convertEpochToDate
          }
        ),
        volume: getLabelWithValue(
          {
            labelName: "Volume",
            labelKey: "LAMS_VOLUME"
          },
          {
            jsonPath: inJsonPath + ".volume",
            //callBack: convertEpochToDate
          }
        ),
        pageOfRegister: getLabelWithValue(
          {
            labelName: "Page No",
            labelKey: "LAMS_PAGEOFREGISTER"
          },
          {
            jsonPath: inJsonPath + ".pageOfRegister",
            //callBack: convertEpochToDate
          }
        )
      }),
    //divider1: getDivider(),
    leaseDetailsContainer2: getCommonContainer(
      {
        detailsAndMutDate: getLabelWithValue(
          {
            labelName: "Details and Mutation Date",
            labelKey: "LAMS_DETAILSMUTDATE"
          },
          {
            jsonPath: inJsonPath + ".detailsAndMutDate",
            //callBack: convertEpochToDate
          }
        ),
        area: getLabelWithValue(
          {
            labelName: "Area",
            labelKey: "LAMS_AREA"
          },
          {
            jsonPath: inJsonPath + ".area",
            //callBack: convertEpochToDate
          }
        ),
        class: getLabelWithValue(
          {
            labelName: "Description",
            labelKey: "LAMS_CLASS"
          },
          {
            jsonPath: inJsonPath + ".class",
            //callBack: convertEpochToDate
          }
        ),
        managedBy: getLabelWithValue(
          {
            labelName: "Managed by",
            labelKey: "LAMS_MANAGEDBY"
          },
          {
            jsonPath: inJsonPath + ".managedBy",
            //callBack: convertEpochToDate
          }
        ),
      }),
    //divider2: getDivider(),
    leaseDetailsContainer3: getCommonContainer(
      {
        landLord: getLabelWithValue(
          {
            labelName: "Land lord",
            labelKey: "LAMS_LANDLORD"
          },
          {
            jsonPath: inJsonPath + ".landLord",
            //callBack: convertEpochToDate
          }
        ),
        rentTowardCentGovt: getLabelWithValue(
          {
            labelName: "Rent towards Central Govt",
            labelKey: "LAMS_RENT_CENTGOVT"
          },
          {
            jsonPath: inJsonPath + ".rentTowardsCentGovt",
            //callBack: convertEpochToDate
          }
        ),
        rentTowardCB: getLabelWithValue(
          {
            labelName: "Rent towards CB",
            labelKey: "LAMS_RENT_CB"
          },
          {
            jsonPath: inJsonPath + ".rentTowardsCB",
            //callBack: convertEpochToDate
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider3: getDivider(),
    leaseDetailsContainer4: getCommonContainer(
      {
        caption: getCommonCaption({
          labelName: "Description",
          labelKey: "LAMS_DESCRIPTION"
        }),
        value: getCommonValue({
          jsonPath: inJsonPath + ".description",
          //callBack: convertEpochToDate
        }),
        // description: getLabelWithValue(
        //   {
        //     labelName: "Description",
        //     labelKey: "LAMS_DESCRIPTION"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".description",
        //     //callBack: convertEpochToDate
        //   }
        // )
      }),
    divider4: getDivider(),
    leaseDetailsContainer5: getCommonContainer(
      {
        caption: getCommonCaption({
          labelName: "Occupancy Rights Holder",
          labelKey: "LAMS_OCCUPANCYRIGHTSHOLDER"
        }),
        value: getCommonValue({
          jsonPath: inJsonPath + ".holderOfOccupancyRights",
          //callBack: convertEpochToDate
        }),
        // holderOfOccupancyRights: getLabelWithValue(
        //   {
        //     labelName: "Occupancy Rights Holder",
        //     labelKey: "LAMS_OCCUPANCYRIGHTSHOLDER"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".holderOfOccupancyRights",
        //     //callBack: convertEpochToDate
        //   }
        // )
      }),
    divider5: getDivider(),
    leaseDetailsContainer6: getCommonContainer(
      {
        caption: getCommonCaption({
          labelName: "Nature of Holder Rights",
          labelKey: "LAMS_NATUREOFHOLDERRIGHTS"
        }),
        value: getCommonValue({
          jsonPath: inJsonPath + ".natureOfHolderRights",
          //callBack: convertEpochToDate
        }),
        // natureOfHolderRights: getLabelWithValue(
        //   {
        //     labelName: "Nature of Holder Rights",
        //     labelKey: "LAMS_NATUREOFHOLDERRIGHTS"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".natureOfHolderRights",
        //     //callBack: convertEpochToDate
        //   }
        // ),
      }),
    divider6: getDivider(),
    leaseDetailsContainer7: getCommonContainer(
      {
        caption: getCommonCaption({
          labelName: "Remarks",
          labelKey: "LAMS_REMARKS"
        }),
        value: getCommonValue({
          jsonPath: inJsonPath + ".remarks",
          //callBack: convertEpochToDate
        }),
        // remarks: getLabelWithValue(
        //   {
        //     labelName: "Remarks",
        //     labelKey: "LAMS_REMARKS"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".remarks",
        //     //callBack: convertEpochToDate
        //   }
        // )
      }),
    divider7: getDivider(),
    leaseDetailsContainer8: getCommonContainer(
      {
        props:{
          style:{
            display:"block",
          }
        },
        caption: getCommonCaption({
          labelName: "Lease as per GLR",
          labelKey: "LAMS_AS_PER_GLR",
          props:{
            style:{
              display:"block",
            }
          },
        }),
        break: getBreak(),
        value: getCommonValue({
          jsonPath: inJsonPath + ".lesseAsPerGLR",
          props:{
            style:{
              display:"block",
            }
          },
          //callBack: convertEpochToDate
        }),
        // lesseDetails: getLabelWithValue(
        //   {
        //     labelName: "Lessee Details",
        //     labelKey: "LAMS_LESSEEDETAILS"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".lesseeDetails",
        //     //callBack: convertEpochToDate
        //   }
        // ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
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
    divider8: getDivider(),


    leaseDetailsContainer9: getCommonContainer(
      {
        caption: getCommonCaption({
          labelName: "Lease as per GLR",
          labelKey: "LAMS_AS_PER_GLR"
        }),
        break: getBreak(),
        value: getCommonValue({
          jsonPath: inJsonPath + ".lesseAsPerGLR",
          //callBack: convertEpochToDate
        }),
        // lesseAsPerGLR: getLabelWithValue(
        //   {
        //     labelName: "Lease as per GLR",
        //     labelKey: "LAMS_AS_PER_GLR"
        //   },
        //   {
        //     jsonPath: inJsonPath + ".lesseAsPerGLR",
        //     //callBack: convertEpochToDate
        //   }
        // )
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
  });
}