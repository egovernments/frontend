import {
    getCommonCard,
    getCommonTitle,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCommonParagraph,
    getBreak,
    getTextField,
    getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, initScreen, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

let demandArray = [];
export const onDemandRevisionBasis = async (action, state, dispatch) => {
    let demandRevisionBasis = get(
        state.screenConfiguration.preparedFinalObject,
        "Bill.demandRevisionBasis", ""
    );
    let demandArray = [];
    switch (demandRevisionBasis) {
        case "COURTCASESETTLEMENT":
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate",
                    "visible",
                    false
                )
            );

            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate",
                    "props.value",
                    ""
                )
            );
            break;
        case "ARREARSWRITEOFF":
        case "ONETIMESETTLEMENT":
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate",
                    "props.value",
                    ""
                )
            );
            break;
        case "DCBCORRECTION":
        case "REMISSIONFORPT":
        case "OTHERS":
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber",
                    "visible",
                    false
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.documentNo",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.fromDate",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.toDate",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.courtOrderNo",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.dateEffectiveFrom",
                    "props.value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.AddDemandRevisionBasis.children.cardContent.children.demandRevisionContainer.children.govtNotificationNumber",
                    "props.value",
                    ""
                )
            );
            break;
        default:
            demandArray = [false, false, false, false, false, false];
            break;
    }
}

export const AddAdjustmentAmount = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Add Adjustment Amount",
            labelKey: "BILL_ADJUSTMENT_AMOUNT_TITLE"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    subText: getCommonParagraph({
        labelName: "Please mention the adjustment amount against from respective Tax Head for generation of Credit/Debit Note.",
        labelKey: "BILL_ADJUSTMENT_AMOUNT_SUBTEXT"
    }),
    break: getBreak(),
    AddAdjustmentAmountContainer: getCommonGrayCard({
        uploadedfile: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-billamend",
            componentPath: "AdjustmentAmountContainer",
            // gridDefination: {
            //   xs: 12,
            //   sm: 12,
            //   md: 12
            // },
            props: {
                label: {
                  labelName: "Uploaded Diagram",
                  labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM"
                },
                linkDetail: {
                  labelName: "uploadedDiagram.dxf",
                  labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM_DXF"
                },
                jsonPath: "scrutinyDetails.updatedDxfFile",
            },
            type: "array"
          },
    })
});

export const AddDemandRevisionBasis = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Add Demand Revision Basis",
            labelKey: "BILL_DEMAND_REVISION_BASIS_TITLE"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    subText: getCommonParagraph({
        labelName: "Please select the reason for demand revision",
        labelKey: "BILL_DEMAND_REVISION_SUBTEXT"
    }),
    break: getBreak(),
    demandRevisionContainer: getCommonContainer({
        demandRevisionBasis: getSelectField({
            label: {
                labelName: "Demand Revison Basis",
                labelKey: "BILL_DEMAND_REVISON_BASIS_LABEL"
            },
            placeholder: {
                labelName: "Select Demand Revison Basis",
                labelKey: "BILL_DEMAND_REVISON_BASIS_PLACEHOLDER"
            },
            jsonPath: "Bill.demandRevisionBasis",
            // sourceJsonPath: "applyScreenMdmsData.BPA.ApplicationType",
            optionValue: "code",
            optionLabel: "label",
            data: [
                {
                    code: "COURTCASESETTLEMENT",
                    label: "COURT_CASE_SETTLEMENT"
                },
                {
                    code: "ARREARSWRITEOFF",
                    label: "ARREARS_WRITE_OFF"
                },
                {
                    code: "DCBCORRECTION",
                    label: "DCB_CORRECTION"
                },
                {
                    code: "ONETIMESETTLEMENT",
                    label: "ONE_TIME_SETTLEMENT"
                },
                {
                    code: "REMISSIONFORPT",
                    label: "REMISSION_FORPT"
                },
                {
                    code: "OTHERS",
                    label: "OTHERS"
                }
            ],
            required: true,
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            afterFieldChange: (action, state, dispatch) => {
                onDemandRevisionBasis(action, state, dispatch)
            }
        }),
        courtOrderNo: getTextField({
            label: {
                labelName: "Court Order No",
                labelKey: "BILL_COURT_ORDER_NO_LABEL"
            },
            placeholder: {
                labelName: "Enter Court Order No",
                labelKey: "BILL_COURT_ORDER_NO_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.courtOderNo",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            }
        }),
        dateEffectiveFrom: getDateField({
            label: {
                labelName: "Date Effective From",
                labelKey: "BILL_DATE_EFFECTIVE_FROM_LABEL"
            },
            placeholder: {
                labelName: "Select Date Effective From",
                labelKey: "BILL_DATE_EFFECTIVE_FROM_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.dateEffectiveFrom",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            pattern: getPattern("Date"),
            errorMessage: "ERR_INVALID_DATE",
        }),
        govtNotificationNumber: getTextField({
            label: {
                labelName: "Govt Notification No",
                labelKey: "BILL_GOVT_NOTIFICATION_NO_LABEL"
            },
            placeholder: {
                labelName: "Enter Govt Notification No",
                labelKey: "BILL_GOVT_NOTIFICATION_NO_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.govtNotificationNumber",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            }
        }),
        documentNo: getTextField({
            label: {
                labelName: "Document No",
                labelKey: "BILL_DOCUMNET_NO_LABEL"
            },
            placeholder: {
                labelName: "Enter Document No",
                labelKey: "BILL_DOCUMENT_NO_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.documentNo",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            }
        }),
        fromDate: getDateField({
            label: {
                labelName: "From Date",
                labelKey: "BILL_COMMON_FROM_DATE_LABEL"
            },
            placeholder: {
                labelName: "Select From Date",
                labelKey: "BILL_FROM_DATE_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.fromDate",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            pattern: getPattern("Date"),
            errorMessage: "ERR_INVALID_DATE",
        }),
        toDate: getDateField({
            label: {
                labelName: "To Date",
                labelKey: "BILL_COMMON_TO_DATE_LABEL"
            },
            placeholder: {
                labelName: "Select to Date",
                labelKey: "BILL_COMMON_TO_DATE_PLACEHOLDER"
            },
            visible: false,
            required: true,
            jsonPath: "Bill.toDate",
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            pattern: getPattern("Date"),
            errorMessage: "ERR_INVALID_DATE",
        })
    })
});