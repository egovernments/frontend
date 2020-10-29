import {
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonTitle,
    getBreak,
    getLabelWithValue,
    getCommonHeader,
    getLabel,
    getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getReviewDocuments } from "../document-review"


export const getFeesEstimateCard = props => {
    const { sourceJsonPath, ...rest } = props;
    return {
        uiFramework: "custom-containers-local",
        moduleName: "egov-billamend",
        componentPath: "EstimateCardContainer",
        props: {
            sourceJsonPath: "LicensesTemp[0].estimateCardData"
            // ...rest
        }
    };
};
const getHeader = label => {
    return {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-billamend",
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

const headerrow = getCommonContainer({
    header: getCommonHeader({
        labelName: "Generate Note",
        labelKey: "BILL_GENERATE_NOTE"
    }), 
    applicationNumber: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-billamend",
        componentPath: "ConsumerNo",
        props: {
            number: "WS-2018-PB-246464",
            label: { labelValue: "Consumer No.", labelKey: "BILL_CONSUMER_NO" }
        }
    },
});

const summary = getCommonCard({
    title: getCommonTitle({ labelName: "Summary",labelKey:"BILL_SUMMARY" }),
    grayDiv: getCommonGrayCard({
        headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 10
                },
                ...getCommonSubHeader({
                  labelName: "Amount Details",
                  labelKey: "BILL_AMOUNT_DETAILS"
                })
              },
              editSection: {
                componentPath: "Button",
                props: {
                  color: "primary"
                },
                gridDefination: {
                  xs: 12,
                  sm: 2,
                  align: "right"
                },
                visible: true,
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
                    labelKey: "BILL_SUMMARY_EDIT"
                  })
                },
                // onClickDefination: {
                //   action: "condition",
                //   callBack: (state, dispatch) => {
                //     changeStep(state, dispatch, "", 2);
                //   }
                // }
              },
           
          }
        },
        subtitle: getHeader({
            labelName: "Adjustment Amount Details",
            labelKey: "BILL_ADJUSTMENT_AMOUNT_DETAILS"
        }),
        estimate:
            getFeesEstimateCard({
                sourceJsonPath: "LicensesTemp[0].estimateCardData"
            }),
        bpaBasicDetailsContainer: getHeader({
            labelName: "Demand Revision Basis Details",
            labelKey: "BILL_DEMAND_REVISION_BASIS_DETAILS"
        }),
        break1: getBreak(),
        basicDetailsContainer: getCommonContainer({
            scrutinynumber: getLabelWithValue(
                {
                    labelName: "Demand Revision Basis",
                    labelKey: "BILL_DEMAND_REVISION_BASIS"
                },
                {
                    jsonPath: "BPA.edcrNumber",
                    // callBack: checkValueForNA
                }
            ),
            occupancy: getLabelWithValue(
                {
                    labelName: "Court Order No.",
                    labelKey: "BILL_COURT_ORDER_NO"
                },
                {
                    jsonPath:
                        "scrutinyDetails.planDetail.planInformation.occupancy",
                    // callBack: checkValueForNA
                }
            ),
            applicationtype: getLabelWithValue(
                {
                    labelName: "Date Effective From",
                    labelKey: "BILL_DATE_EFFECTIVE_FROM"
                },
                {
                    jsonPath:
                        "BPA.applicationType",
                    // callBack: checkValueForNA
                }
            ),

        }),

    }),

    documents: getReviewDocuments(true, false)

    // demand:getReviewOwner()

})
export default summary;
