import {
    getCommonCard,
    getCommonContainer,
    getCommonHeader,
    getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import { getCurrentFinancialYear, generateBill, getBusinessServiceMdmsData } from "../utils";
import capturePaymentDetails from "./payResource/capture-payment-details";
import estimateDetails from "./payResource/estimate-details";
import { footer } from "./payResource/footer";
import g8Details from "./payResource/g8-details";
import AmountToBePaid from "./payResource/amount-to-be-paid";
import { isPublicSearch } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { ifUserRoleExists } from "../utils";
import set from "lodash/set";
import { componentJsonpath, radioButtonJsonPath, paybuttonJsonpath } from "./payResource/constants";
import "./pay.css";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import capturePayerDetails from "./payResource/capture-payer-details";


const header = getCommonContainer({
    header: getCommonHeader({
        labelName: `Payment (${getCurrentFinancialYear()})`, //later use getFinancialYearDates
        labelKey: "COMMON_PAY_SCREEN_HEADER"
    }),
    consumerCode: {
        uiFramework: "custom-atoms-local",
        moduleName: "egov-common",
        componentPath: "ApplicationNoContainer",
        props: {
            number: '',
            label: {
                labelValue: "Consumer Code.:",
                labelKey: "PAYMENT_COMMON_CONSUMER_CODE"
            }
        }
    }
});


const getPaymentCard = () => {

    const roleExists = ifUserRoleExists("CITIZEN");

    if (roleExists) {
        return {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
                paymentDetails: getCommonCard({
                    header: getCommonTitle({
                        labelName: "Payment Collection Details",
                        labelKey: "NOC_PAYMENT_HEAD"
                    }),
                    estimateDetails,
                    AmountToBePaid: {
                        ...AmountToBePaid,
                        visible: false
                    }
                })
            }
        }
    }  if (isPublicSearch()) {
        return {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
                paymentDetails: getCommonCard({
                    header: getCommonTitle({
                        labelName: "Payment Collection Details",
                        labelKey: "NOC_PAYMENT_HEAD"
                    }),
                    estimateDetails,
                    //capturePaymentDetails,
                    capturePayerDetails: process.env.REACT_APP_NAME === "Citizen" ? capturePayerDetails : {},
                    AmountToBePaid: {
                        ...AmountToBePaid,
                        visible: false
                    }
                })
            }
        }
    } else {
        return {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            children: {
                paymentDetails: getCommonCard({
                    header: getCommonTitle({
                        labelName: "Payment Collection Details",
                        labelKey: "NOC_PAYMENT_HEAD"
                    }),
                    estimateDetails,
                    AmountToBePaid: {
                        ...AmountToBePaid,
                        visible: false
                    },
                    capturePaymentDetails,
                    g8Details
                    // addPenaltyRebateButton: {
                    //   componentPath: "Button",
                    //   props: {
                    //     color: "primary",
                    //     style: {}
                    //   },
                    //   children: {
                    //     previousButtonLabel: getLabel({
                    //       labelName: "ADD REBATE/PENALTY",
                    //       labelKey: "NOC_PAYMENT_ADD_RBT_PEN"
                    //     })
                    //   },
                    //   onClickDefination: {
                    //     action: "condition",
                    //     callBack: (state, dispatch) => showHideAdhocPopup(state, dispatch, "pay")
                    //   }
                    // },
                    // viewBreakupButton: getDialogButton(
                    //   "VIEW BREAKUP",
                    //   "TL_PAYMENT_VIEW_BREAKUP",
                    //   "pay"
                    // ),
                })
            }
        }
    }
}



const fetchBill = async(state, dispatch, consumerCode, tenantId, billBusinessService) => {
        await getBusinessServiceMdmsData(dispatch, tenantId);
    
        await generateBill(dispatch, consumerCode, tenantId, billBusinessService);


    let payload = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0]");

    let totalAmount = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0]");

    //Collection Type Added in CS v1.1
    payload && dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));
    const businessService = get(
        state,
        "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].businessService"
    );

    const businessServiceArray = get(state, "screenConfiguration.preparedFinalObject.businessServiceMdmsData.BillingService.BusinessService");
    
    businessServiceArray && businessServiceArray.map(item => {
        if (item.code == businessService) {
            dispatch(prepareFinalObject("businessServiceInfo", item));
        }
    })

    const isPartialPaymentAllowed = get(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.partPaymentAllowed");
    if (isPartialPaymentAllowed) {
        dispatch(handleField("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid", "visible", true));
    }
    const hasOnlinePayment = get(state, "screenConfiguration.preparedFinalObject.businessServiceInfo.hasOnlinePayment");
    if (!hasOnlinePayment) {
    dispatch(handleField("pay", "components.div.children.footer.children.makePayment", "visible", false));
    }
    if (get(payload, "amount") != undefined) {
        //set amount paid as total amount from bill - destination changed in CS v1.1
        dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.amount));
        //set total amount in instrument
        dispatch(prepareFinalObject("ReceiptTemp[0].instrument.amount", payload.amount));
    }

    if (get(totalAmount, "totalAmount") != undefined) {
        const componentJsonpath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.displayAmount";
        dispatch(handleField("pay", componentJsonpath, "props.value", totalAmount.totalAmount));
        if (totalAmount.totalAmount === 0 || totalAmount.totalAmount <= 100) {
            dispatch(handleField("pay", radioButtonJsonPath, "props.buttons[1].disabled", true));
        }
    }

    if (get(totalAmount, "totalAmount") === undefined) {
        const buttonJsonpath = paybuttonJsonpath + `${process.env.REACT_APP_NAME === "Citizen" ? "makePayment" : "generateReceipt"}`;
        dispatch(handleField("pay", buttonJsonpath, "props.disabled", true));
        dispatch(handleField("pay", radioButtonJsonPath, "props.buttons[1].disabled", true));
    }

    const consumeCodeComponentPath = 'components.div.children.headerDiv.children.header.children.consumerCode';
    const consumerCodeFromResponse = get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].consumerCode");;
    dispatch(handleField("pay", consumeCodeComponentPath, "props.number", consumerCodeFromResponse));

    const raidButtonComponentPath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.AmountToBePaid.children.cardContent.children.amountDetailsCardContainer.children.AmountToPaidButton";
    dispatch(handleField("pay", raidButtonComponentPath, "props.value", "full_amount"));

    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payer", "COMMON_OWNER"));
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].paidBy", get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].payerName")));
    if(isPublicSearch())
    {
        //dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payerMobileNumber", get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber")));
    }
    else
    {      
        dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payerMobileNumber", get(state, "screenConfiguration.preparedFinalObject.ReceiptTemp[0].Bill[0].mobileNumber")));
    } 

    // dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payer", "Owner"));
    // const payerComponentPath="components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.card.children.payeeDetails.children.payer";
    // dispatch(handleField("pay", payerComponentPath, "props.value","" ));
    //
    // const paidByComponentPath="components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.card.children.payeeDetails.children.paidBy";
    // dispatch(handleField("pay", paidByComponentPath, "props.value","" ));
    //
    // const numberComponentPath="components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.card.children.payeeDetails.children.payerMobileNumber";
    // dispatch(handleField("pay", numberComponentPath, "props.value","" ));


    //Initially select instrument type as Cash
    dispatch(prepareFinalObject("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

    //set tenantId
    dispatch(prepareFinalObject("ReceiptTemp[0].tenantId", tenantId));

    //set tenantId in instrument
    dispatch(prepareFinalObject("ReceiptTemp[0].instrument.tenantId", tenantId));
};

const fetchBillingServiceData = async(state,tenantId) =>{
    let mdmsBody = {
        MdmsCriteria: {
          tenantId: tenantId,
          moduleDetails: [
            {
              moduleName: "BillingService",
              masterDetails: [
                {
                  name: "TaxHeadMaster"
                },
                {
                  name: "TaxPeriod"
                }
              ]
            }
          ]
        }
      };
      try {
        const payload1 = await httpRequest(
          "post",
          "/egov-mdms-service/v1/_search",
          "_search",
          [],
          mdmsBody
        )
          
        const MdmsData = payload1.MdmsRes;
        const yeardataInfo =
        (MdmsData && MdmsData.BillingService.TaxPeriod) || {};

        const taxDataInfo =
        (MdmsData && MdmsData.BillingService.TaxHeadMaster) || {};
        let yeardata = [];
        let taxData = [];
        const data = Object.keys(yeardataInfo).map((key, index) => {
        yeardata.push(yeardataInfo[key]);
        });
        const data2 = Object.keys(taxDataInfo).map((key, index) => {
        taxData.push(taxDataInfo[key]);
        });
        let yeardata1 = yeardata.filter(yearKey => yearKey.service === "PT");
        let taxdata1 =
        taxData.filter(tax => tax.service === "PT" && tax.legacy == true) || [];
        taxdata1.length > 0 &&
        taxdata1.sort(function(a, b) {
            return a.order - b.order;
        });
        const finalData = Object.keys(yeardata1).map((data, key) => {
        yeardata1[data]["taxHead"] = [...taxdata1];
        return yeardata[data];
        });
        {
        finalData && finalData.length
            ? localStorage.setItem("finalData", JSON.stringify(finalData))
            : "error";
        }

      } catch (e) {
        console.log(e);
      }
}

const screenConfig = {
    uiFramework: "material-ui",
    name: "pay",
    beforeInitScreen: (action, state, dispatch) => {

        // dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionNumber", ""));
        // dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionDateInput", ""));
        // // set(action, "screenConfiguration.screenConfig.pay.components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[2].tabContent.offline_rtgs.children.onlineDetails.children.transactionDate.componentJsonpath", "");
        // // dispatch(prepareFinalObject("ReceiptTemp[0]",""));
        let consumerCode = getQueryArg(window.location.href, "consumerCode");
        let tenantId = getQueryArg(window.location.href, "tenantId");
        let businessService = getQueryArg(window.location.href, "businessService");
        dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionNumber", ""));  
        dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionDateInput", ""));

        const transactionDatepath="components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[2].tabContent.offline_rtgs.children.onlineDetails.children.transactionDate";
        // const transactionDatevalue= get(transactionDatepath.props.value);
        // // console.log("shreya log1" ,transactionDatevalue);
        // if (transactionDatevalue)
        // {
         dispatch(handleField("pay", transactionDatepath, "props.value","" ));
         dispatch(handleField("pay", transactionDatepath, "props.error",false ));
         dispatch(handleField("pay", transactionDatepath, "isFieldValid",true ));
        // }
        const transactionnopath="components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[2].tabContent.offline_rtgs.children.onlineDetails.children.txnNo";
        // const transactionovalue= get(transactionnopath.props.value);
        // // console.log("shreya log2", transactionnovalue);
        // if (transactionnovalue)
        // {
         dispatch(handleField("pay", transactionnopath, "props.value","" )); 
         dispatch(handleField("pay", transactionnopath, "isFieldValid",true ));
         dispatch(handleField("pay", transactionnopath, "props.error",false ));
        // }
        fetchBillingServiceData(state,tenantId)
        fetchBill(state, dispatch, consumerCode, tenantId, businessService);
        // set(action, "screenConfiguration.screenConfig.pay.components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[2].tabContent.offline_rtgs.children.onlineDetails.children.transactionDate.componentJsonpath", "");

        const data = getPaymentCard();
        set(action, "screenConfig.components.div.children.formwizardFirstStep", data);
        // // dispatch(prepareFinalObject("ReceiptTemp[0]",""));
        // dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionNumber", ""));
        // dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionDateInput", ""));
       
        return action;
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "pay"
            },
            children: {
                headerDiv: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    children: {
                        header: {
                            gridDefination: {
                                xs: 12,
                                sm: 10
                            },
                            ...header
                        }
                    }
                },
                formwizardFirstStep: {},
                footer
            }
        },
        // adhocDialog: {
        //   uiFramework: "custom-containers-local",
        //   moduleName: "egov-noc",
        //   componentPath: "DialogContainer",
        //   props: {
        //     open: false,
        //     maxWidth: "sm",
        //     screenKey: "pay"
        //   },
        //   children: {
        //     popup: adhocPopup
        //   }
        // }
        // breakUpDialog: {
        //   uiFramework: "custom-containers-local",
        //   moduleName: "egov-tradelicence",
        //   componentPath: "ViewBreakupContainer",
        //   props: {
        //     open: false,
        //     maxWidth: "md",
        //     screenKey: "pay"
        //   }
        // }
    }
};

export default screenConfig;
