import {
    getCommonCard,
    getCommonCardWithHeader,
    getCommonContainer,
    getCommonGrayCard,
    getLabel,
    getCommonTitle,
    getDialogButton,
    getCommonLabelValue,
    getDivider
} from "egov-ui-framework/ui-config/screens/specs/utils";
const headerrow = getCommonContainer({
});
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
const screenConfig = {
    uiFramework: "material-ui",
    name: "search-preview",
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
                className: "common-div-css search-preview"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header1: {
                            gridDefination: {
                                xs: 12,
                                sm: 8
                            },
                            ...headerrow
                        },
                        helpSection: {
                            uiFramework: "custom-atoms",
                            componentPath: "Container",
                            props: {
                                color: "primary",
                                style: { justifyContent: "flex-end" }
                            },
                            gridDefination: {
                                xs: 12,
                                sm: 4,
                                align: "right"
                            }
                        },

                    }
                },
                bodyDiv: getCommonCard({
                    grayDiv: getCommonGrayCard({
                        title: getCommonTitle({ labelName: "Amount Details" }),
                        divider: getDivider(),
                        feeContainer:getFeesEstimateCard({})
                        // adjustmentAmountContainer: getCommonContainer({
                        //     title: getCommonTitle({ labelName: "Adjustment Amount Details", style: { fontSize: "0.8375rem"} }),
                        //     // estimate : get
                        //     feeContianer:getFeesEstimateCard({}),
                        // })


                    })
                }),
                // feeContianer:getFeesEstimateCard({}),



            }
        },
        breakUpDialog: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-tradelicence",
            componentPath: "ViewBreakupContainer",
            props: {
                open: false,
                maxWidth: "md",
                screenKey: "search-preview"
            }
        }
    }
};

export default screenConfig;
