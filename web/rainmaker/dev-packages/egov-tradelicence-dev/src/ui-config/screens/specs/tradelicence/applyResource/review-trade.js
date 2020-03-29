import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./footer";

const tradeTypeCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-trade-search-preview",
    scheama: getCommonGrayCard({
      tradeTypeCardContainer: getCommonContainer({
        reviewTradeCategory: getLabelWithValue(
          {
            labelName: "Trade Category",
            labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
          },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
            localePrefix: {
              moduleName: "TRADELICENSE",
              masterName: "TRADETYPE"
            },
            callBack: value => {
              return value ? value.split(".")[0] : "NA";
            }
          }
        ),
        reviewPurpose: getLabelWithValue(
          { labelName: "Purpose", labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE" },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purpose"
          }
        )
        // ,
        // reviewTradeSubtype: getLabelWithValue(
        //   {
        //     labelName: "Trade Sub-Type",
        //     labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
        //   },
        //   {
        //     jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
        //     localePrefix: {
        //       moduleName: "TRADELICENSE",
        //       masterName: "TRADETYPE"
        //     },
        //     callBack: checkValueForNA
        //   }
        // ),
        //
        // reviewTradeUOM: getLabelWithValue(
        //   {
        //     labelName: "UOM (Unit of Measurement)",
        //     labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
        //   },
        //   { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom", callBack: checkValueForNA }
        // ),
        // reviewTradeUOMValue: getLabelWithValue(
        //   {
        //     labelName: "UOM Value",
        //     labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        //   },
        //   { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue", callBack: checkValueForNA }
        // )
      })
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeTypeCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};
export const getReviewTrade = (isEditable = true) => {
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
            labelName: "Trade Details",
            labelKey: "TL_COMMON_TR_DETAILS"
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
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: tradeTypeCard,
    div1: getDivider(),
    viewTwo: getCommonContainer({
      fromState: getLabelWithValue(
        { labelName: "From State", labelKey: "TL_FROM_STATE_LABEL" },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.fromState",
          localePrefix: {
            moduleName: "TRADELICENSE",
            masterName: "STATE"
          },
          callBack: value => {
            return  value ? value : "NA";
          }
        }
      ),
      fromDistrict: getLabelWithValue(
        { labelName: "From District", labelKey: "TL_FROM_DISTRICT_LABEL" },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.fromDistrict",
          localePrefix: {
            moduleName: "TRADELICENSE",
            masterName: "District"
          },
        },
      ),
      toDistrict: getLabelWithValue(
        { labelName: "To District", labelKey: "TL_TO_DISTRICT_LABEL" },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.toDistrict",
          localePrefix: {
            moduleName: "TRADELICENSE",
            masterName: "District"
          },
        }
      ),
      // reviewStructureType: getLabelWithValue(
      //   { labelName: "Structure Type" ,labelKey : "TL_STRUCTURE_TYPE"},
      //   {
      //     jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
      //     localePrefix: {
      //       moduleName: "common-masters",
      //       masterName: "STRUCTURETYPE"
      //     },
      //     callBack: value => {
      //       return  value ? value.split(".")[0] : "NA";
      //     }
      //   }
      // ),
      // reviewSubStructureType: getLabelWithValue(
      //   { labelName: "Structure Sub Type", labelKey : "TL_STRUCTURE_SUB_TYPE" },
      //   {
      //     jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
      //     localePrefix: {
      //       moduleName: "common-masters",
      //       masterName: "STRUCTURETYPE"
      //     },
      //   }
      // ),
      // reviewCommencementDate: getLabelWithValue(
      //   {
      //     labelName: "Commencement Date",
      //     labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
      //   },
      //   {
      //     jsonPath: "Licenses[0].commencementDate",
      //     callBack: convertEpochToDate
      //   }
      // ),
      // reviewGSTNo: getLabelWithValue(
      //   {
      //     labelName: "GST No.",
      //     labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
      //   },
      //   {
      //     jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo",
      //     callBack: checkValueForNA
      //   }
      // ),
      // reviewOperationalArea: getLabelWithValue(
      //   {
      //     labelName: "Operational Area",
      //     labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
      //   },
      //   {
      //     jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea",
      //     callBack: checkValueForNA
      //   }
      // ),
      // reviewNoOfEmployee: getLabelWithValue(
      //   {
      //     labelName: "No of Employees",
      //     labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
      //   },
      //   {
      //     jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees",
      //     callBack: checkValueForNA
      //   }
      // )
    }),
  });
};



export const getDeclarationCard = () => {
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
            labelName: "Declaration",
            labelKey: "EPASS_DECLARATION_HEADER"
          })
        },
      }
    },
    declaration : getCommonContainer({
      checkbox:{
        uiFramework: "custom-containers-local",
        moduleName: "egov-tradelicence",
        componentPath: "PassCheckboxContainer",
       props: {
         fontSize : "16px",
         content:'EPASS_DECLARATION',
         jsonPath:
             "Licenses[0].tradeLicenseDetail.additionalDetail.declared"
       },
       visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
     }
     })
  });
};
