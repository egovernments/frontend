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

const businessServiceCode = get(state.screenConfiguration.preparedFinalObject,"businessServiceInfo.code")
const CommonPayMDMSData = get(state.screenConfiguration.preparedFinalObject,"businessServiceMdmsData.common-masters.uiCommonPay")
const businessServiceDataArray=CommonPayMDMSData&&CommonPayMDMSData.filter(item=>item.code===businessServiceCode);
const businessServiceData=businessServiceDataArray&&businessServiceDataArray[0];
console.log("okokok",businessServiceData)

    const redirectionURL = "/egov-common/pay";
    const path = `${redirectionURL}?consumerCode=${consumerCode}&tenantId=${tenant}`
    return getCommonApplyFooter({
        gotoHome: {
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
                    labelName: get(businessServiceData,"footer.label.labelName","GO TO HOME"),
                    labelKey: get(businessServiceData,"footer.label.labelKey","COMMON_BUTTON_HOME")
                })
            },
            onClickDefination: {
                action: "page_change",
                path: get(businessServiceData,"footer.link")
            },
        },
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