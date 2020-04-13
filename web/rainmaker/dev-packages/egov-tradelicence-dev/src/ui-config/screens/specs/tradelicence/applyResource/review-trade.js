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
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purpose",
            localePrefix: {
              moduleName: "TRADELICENSE",
              masterName: "PURPOSE"
            },
            callBack: value => {
              return value ? value.split(".")[0] : "NA";
            }
          }
        ),
        reviewPurposeSubDetails: getLabelWithValue(
          {
            labelName: "Purpose Sub-Details",
            labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE_SUB_DETAILS"
          },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purposeSubDetails",
            localePrefix: {
              moduleName: "TRADELICENSE",
              masterName: "PURPOSE"
            },
            callBack: value => {
              return value ? value : "NA";
            }
          }
        ),
        reviewPurposeDetails: getLabelWithValue(
          { labelName: "Purpose Details", labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE_DETAILS" },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purposeDetail"
          }
        ),
        departureAddress: getLabelWithValue(
          {  labelName: "Departure Address",
             labelKey: "TL_NEW_TRADE_DETAILS_DEPARTURE_ADDRESS" 
          },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.departureAddress"
          }
        ),
        destinationAddress: getLabelWithValue(
          { labelName: "Destination Address",
            labelKey: "TL_NEW_TRADE_DETAILS_DESTINATION_ADDRESS"
          },
          {
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.destinationAddress"
          }
        )
        
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
      toState: getLabelWithValue(
        { labelName: "To State", labelKey: "TL_TO_STATE_LABEL" },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.toState",
          localePrefix: {
            moduleName: "TRADELICENSE",
            masterName: "STATE"
          },
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
