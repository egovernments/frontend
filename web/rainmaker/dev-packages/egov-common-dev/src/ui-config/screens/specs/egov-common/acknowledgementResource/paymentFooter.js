import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
import get from "lodash/get";
import './acknowledgementUtils.css'
const getCommonApplyFooter = children => {
    return {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
            className: "apply-wizard-footer common-footer-mobile"
        },
        children
    };
};

export const paymentFooter = (state,consumerCode, tenant,status) => {

    const uiCommonPayConfig = get(state.screenConfiguration.preparedFinalObject , "commonPayInfo");
    const  buttons  = get(uiCommonPayConfig,"buttons");
    const redirectionURL = "/egov-common/pay";
    const path = `${redirectionURL}?consumerCode=${consumerCode}&tenantId=${tenant}`
    
    // gotoHome: {
    //     componentPath: "Button",
    //     props: {
    //         variant: "contained",
    //         color: "primary",
    //         className:"common-footer-mobile",
    //         style: {
    //             minWidth: "200px",
    //             height: "48px",
    //             marginRight: "16px",
    //             marginLeft: "40px"
    //         }
    //     },
    //     children: {
    //         downloadReceiptButtonLabel: getLabel({
    //             labelKey : label
    //         //    ...footer.label,
    //             //  labelName: get(footer,"label.labelName","GO TO HOME"),
    //             //  labelKey: get(footer,"label.labelKey","GO_TO_HOME")
    //         })
    //     },
    //     onClickDefination: {
    //         action: "page_change",
    //         path: get(footer,"link", `/inbox`)
    //     },
    // },



    const footer = buttons.map((item,index) => {
        return{
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className:"common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px"
                }
            },
            children: {
                downloadReceiptButtonLabel: getLabel({
                    labelKey : get(item , "label" , "GO_TO_HOME")
                })
            },
            onClickDefination: {
                action: "page_change",
                path: get(item,"link", `/inbox`)
            },
        }
    })
    return getCommonApplyFooter({
        ...footer,
        retryButton: {
            componentPath: "Button",
            props: {
                variant: "contained",
                color: "primary",
                className:"common-footer-mobile",
                style: {
                    minWidth: "200px",
                    height: "48px",
                    marginRight: "16px",
                    marginLeft: "40px",
                }
            },
            children: {
                downloadReceiptButtonLabel: getLabel({
                    labelName: "RETRY",
                    labelKey: "COMMON_RETRY"
                })
            },
            onClickDefination: {
                action: "page_change",
                path
            },
            visible: status === "failure" ? true : false
        }
    });
};