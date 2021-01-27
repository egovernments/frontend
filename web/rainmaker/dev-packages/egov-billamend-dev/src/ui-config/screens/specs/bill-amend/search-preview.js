import {
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonTitle,
    getBreak,
    getLabelWithValue,
    getCommonHeader,
    convertEpochToDate
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getReviewDocuments } from "./document-review";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {
    getQueryArg,
    getFileUrlFromAPI,
    getTransformedLocale,
    getFileUrl
} from "egov-ui-framework/ui-utils/commons";
import { getBillAmdSearchResult } from "../../../../ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
import jp from "jsonpath";


export const getFeesEstimateCard = props => {
    const { sourceJsonPath, ...rest } = props;
    return {
        uiFramework: "custom-containers-local",
        moduleName: "egov-billamend",
        componentPath: "EstimateCardContainer",
        props: {
            sourceJsonPath: "AmendmentTemp[0].estimateCardData"
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

export const adjustmentAmountDetails = async (state, dispatch, amendment) => {
    let amountType = amendment && amendment.demandDetails &&
        amendment.demandDetails.length > 0 && amendment.demandDetails.filter(details => details.taxAmount < 0);
    if (amountType && amountType.length > 0) {
        amountType = "reducedAmount"
    } else {
        amountType = "additionalAmount"
    }
    let billDetails = [];
    amendment.demandDetails.map(bill => {
        billDetails.push({
            taxHeadMasterCode: bill.taxHeadMasterCode,
            taxAmount: parseFloat(bill.taxAmount),
            amountType: amountType
        });
    });
    dispatch(prepareFinalObject("AmendmentTemp[0].estimateCardData", billDetails, []));
}

const documentMaping = async (documentsPreview) => {
    let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
    let fileUrls =
        fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
    let documentsPreviews = documentsPreview.map((doc, index) => {
        doc["link"] =
            (fileUrls &&
                fileUrls[doc.fileStoreId] &&
                getFileUrl(fileUrls[doc.fileStoreId])) ||
            "";
        doc["name"] =
            (fileUrls[doc.fileStoreId] &&
                decodeURIComponent(
                    getFileUrl(fileUrls[doc.fileStoreId])
                        .split("?")[0]
                        .split("/")
                        .pop()
                        .slice(13)
                )) ||
            `Document - ${index + 1}`;
        return doc;
    });
    return documentsPreviews;
}

export const documentDetailsPreview = async (state, dispatch, amendment) => {
    let documentsPreview = [];
    amendment.documents.forEach(doc => {
        documentsPreview.push({
            title: getTransformedLocale(doc.documentType),
            fileStoreId: doc.fileStore,
            linkText: "View"
        });
    });
    let appDocuments = await documentMaping(documentsPreview);
    dispatch(prepareFinalObject("bill-amend-review-document-data", appDocuments));
}

export const onDemandRevisionBasisHidendShowFields = async (state, dispatch, action, amendment) => {
    let demandRevisionBasis = get(amendment, "amendmentReason", "");
    switch (demandRevisionBasis) {
        case "COURT_CASE_SETTLEMENT":
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible",
                false
            );
            break;
        case "ARREAR_WRITE_OFF":
        case "ONE_TIME_SETTLEMENT":
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible",
                true
            );
            break;
        case "DCB_CORRECTION":
        case "REMISSION_FOR_PROPERTY_TAX":
        case "OTHERS":
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.courtOrderNo.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom.visible",
                false
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber.visible",
                false
            );

            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.documentNo.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.fromDate.visible",
                true
            );
            set(
                action,
                "screenConfig.components.div.children.bodyDiv.children.cardContent.children.grayDiv.children.cardContent.children.demandRevisionContainer.children.toDate.visible",
                true
            );


            break;
        default:

            break;
    }
}

export const setSearchResponse = async (state, dispatch, action) => {
    const tenantId = getTenantId() || getQueryArg(window.location.href, "tenantId");
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
    let billAMDSearch = await getBillAmdSearchResult([
        {
            key: "tenantId",
            value: tenantId
        },
        {
            key: "amendmentId",
            value: applicationNumber
        }
    ], dispatch);
    let amendments = get(billAMDSearch, "Amendments", []);
    if (amendments && amendments.length > 0) {
        dispatch(prepareFinalObject("Amendment", amendments[0]));
        adjustmentAmountDetails(state, dispatch, amendments[0]);
        documentDetailsPreview(state, dispatch, amendments[0]);
        onDemandRevisionBasisHidendShowFields(state, dispatch, action, amendments[0]);
    }
}



export const getData = async (action, state, dispatch) => {
    await setSearchResponse(state, dispatch, action);
}

const screenConfig = {
    uiFramework: "material-ui",
    name: "search-preview",
    beforeInitScreen: (action, state, dispatch) => {
        getData(action, state, dispatch).then(responseAction => { });
        return action;
    },
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
                    title: getCommonTitle({ labelName: "Summary", labelKey: "BILL_SUMMARY" }),
                    grayDiv: getCommonGrayCard({
                        title: getCommonTitle({
                            labelName: "Amount Details",
                            labelKey: "BILL_AMOUNT_DETAILS"
                        }),
                        subtitle: getHeader({
                            labelName: "Adjustment Amount Details",
                            labelKey: "BILL_ADJUSTMENT_AMOUNT_DETAILS"
                        }),
                        estimate:
                            getFeesEstimateCard({
                                sourceJsonPath: "LicensesTemp[0].estimateCardData"
                            }),
                        demandRevisionHeader: getHeader({
                            labelName: "Demand Revision Basis Details",
                            labelKey: "BILL_DEMAND_REVISION_BASIS_DETAILS"
                        }),
                        break1: getBreak(),
                        demandRevisionContainer: getCommonContainer({
                            demandRevisionBasis: getLabelWithValue(
                                {
                                    labelName: "Demand Revison Basis",
                                    labelKey: "BILL_DEMAND_REVISON_BASIS_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.amendmentReason"
                                }
                            ),
                            courtOrderNo: getLabelWithValue(
                                {
                                    labelName: "Court Order No",
                                    labelKey: "BILL_COURT_ORDER_NO_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.reasonDocumentNumber"
                                }
                            ),
                            dateEffectiveFrom: getLabelWithValue(
                                {
                                    labelName: "Date Effective From",
                                    labelKey: "BILL_DATE_EFFECTIVE_FROM_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.effectiveFrom",
                                    callBack: value => {
                                        return convertEpochToDate(value);
                                    }
                                }
                            ),
                            govtNotificationNumber: getLabelWithValue(
                                {
                                    labelName: "Govt Notification No",
                                    labelKey: "BILL_GOVT_NOTIFICATION_NO_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.reasonDocumentNumber"
                                }
                            ),
                            documentNo: getLabelWithValue(
                                {
                                    labelName: "Document No",
                                    labelKey: "BILL_DOCUMNET_NO_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.reasonDocumentNumber"
                                }
                            ),
                            fromDate: getLabelWithValue(
                                {
                                    labelName: "From Date",
                                    labelKey: "BILL_COMMON_FROM_DATE_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.effectiveFrom",
                                    callBack: value => {
                                        return convertEpochToDate(value);
                                    }
                                }
                            ),
                            toDate: getLabelWithValue(
                                {
                                    labelName: "To Date",
                                    labelKey: "BILL_COMMON_TO_DATE_LABEL"
                                },
                                {
                                    jsonPath: "Amendment.effectiveTill",
                                    callBack: value => {
                                        return convertEpochToDate(value);
                                    }
                                }
                            )
                        }),

                    }),
                    documents: getReviewDocuments(false, false)
                }),


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
