import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import {
  getButtonVisibility,
  getCommonApplyFooter,
  setMultiOwnerForApply,
  setValidToFromVisibilityForApply,
  getDocList,
  setOwnerShipDropDownFieldChange,
  createEstimateData,
  validateFields,
  ifUserRoleExists
} from "../../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  toggleSnackbar,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import generateReceipt from "../../utils/receiptPdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import get from "lodash/get";
import some from "lodash/some";

const moveToSuccess = (LicenseData, dispatch) => {
  const applicationNo = get(LicenseData, "applicationNumber");
  const tenantId = get(LicenseData, "tenantId");
  const financialYear = get(LicenseData, "financialYear");
  const purpose = "apply";
  const status = "success";
  dispatch(
    setRoute(
      `/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&FY=${financialYear}&tenantId=${tenantId}`
    )
  );
};

export const generatePdfFromDiv = (action, applicationNumber) => {
  let target = document.querySelector("#custom-atoms-div");
  html2canvas(target, {
    onclone: function(clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(canvas => {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    if (action === "download") {
      doc.save(`preview-${applicationNumber}.pdf`);
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  // console.log(activeStep);
  let isFormValid = true;
  let hasFieldToaster = true;
  if (activeStep === 0) {
    const data = get(state.screenConfiguration, "preparedFinalObject");
    setOwnerShipDropDownFieldChange(state, dispatch, data);

    const isTradeDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children",
      state,
      dispatch
    );
    const isTradeLocationValid = validateFields(
      "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children",
      state,
      dispatch
    );
    let accessoriesJsonPath =
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.accessoriesCard.props.items";
    let accessories = get(
      state.screenConfiguration.screenConfig.apply,
      accessoriesJsonPath,
      []
    );
    let isAccessoriesValid = true;
    for (var i = 0; i < accessories.length; i++) {
      if (
        (accessories[i].isDeleted === undefined ||
          accessories[i].isDeleted !== false) &&
        !validateFields(
          `${accessoriesJsonPath}[${i}].item${i}.children.cardContent.children.accessoriesCardContainer.children`,
          state,
          dispatch
        )
      )
        isAccessoriesValid = false;
    }

    let tradeUnitJsonPath =
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items";
    let tradeUnits = get(
      state.screenConfiguration.screenConfig.apply,
      tradeUnitJsonPath,
      []
    );
    let isTradeUnitValid = true;

    for (var j = 0; j < tradeUnits.length; j++) {
      if (
        (tradeUnits[j].isDeleted === undefined ||
          tradeUnits[j].isDeleted !== false) &&
        !validateFields(
          `${tradeUnitJsonPath}[${j}].item${j}.children.cardContent.children.tradeUnitCardContainer.children`,
          state,
          dispatch
        )
      )
        isTradeUnitValid = false;
    }
    if (
      !isTradeDetailsValid ||
      !isTradeLocationValid ||
      !isAccessoriesValid ||
      !isTradeUnitValid
    ) {
      isFormValid = false;
    }
  }

  if (activeStep === 1) {
    await getDocList(state, dispatch);

    let isOwnerShipValid = validateFields(
      "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownershipType.children",
      state,
      dispatch
    );
    let ownership = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory",
      "INDIVIDUAL"
    );
    if (ownership === "INDIVIDUAL") {
      let ownersJsonPath =
        "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
      let owners = get(
        state.screenConfiguration.screenConfig.apply,
        ownersJsonPath,
        []
      );
      for (var k = 0; k < owners.length; k++) {
        if (
          (owners[k].isDeleted === undefined ||
            owners[k].isDeleted !== false) &&
          !validateFields(
            `${ownersJsonPath}[${k}].item${k}.children.cardContent.children.tradeUnitCardContainer.children`,
            state,
            dispatch
          )
        )
          isFormValid = false;
      }
    } else {
      let ownersJsonPath =
        "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional.children.cardContent.children.tradeUnitCardContainer.children";
      // let owners = get(
      //   state.screenConfiguration.screenConfig.apply,
      //   ownersJsonPath,
      //   []
      // );
      // for (var x = 0; x < owners.length; x++) {
      //   if (
      //     (owners[x].isDeleted === undefined ||
      //       owners[x].isDeleted !== false) &&
      //     !validateFields(
      //       `${ownersJsonPath}[${x}].item${x}.children.cardContent.children.tradeUnitCardContainer.children`,
      //       state,
      //       dispatch
      //     )
      //   )
      if (!validateFields(ownersJsonPath, state, dispatch)) isFormValid = false;
    }

    // check for multiple owners
    if (
      get(
        state.screenConfiguration.preparedFinalObject,
        "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
      ) === "INDIVIDUAL.MULTIPLEOWNERS" &&
      get(
        state.screenConfiguration.preparedFinalObject,
        "Licenses[0].tradeLicenseDetail.owners"
      ).length <= 1
    ) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please add multiple owners !",
            labelKey: "ERR_ADD_MULTIPLE_OWNERS"
          },
          "error"
        )
      );
      return false; // to show the above message
    }
    if (isFormValid && isOwnerShipValid) {
      isFormValid = await applyTradeLicense(state, dispatch, activeStep);
      if (!isFormValid) {
        hasFieldToaster = false;
      }
    } else {
      isFormValid = false;
    }
  }
  if (activeStep === 2) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]",
      {}
    );

    get(LicenseData, "tradeLicenseDetail.subOwnerShipCategory") &&
    get(LicenseData, "tradeLicenseDetail.subOwnerShipCategory").split(
      "."
    )[0] === "INDIVIDUAL"
      ? setMultiOwnerForApply(state, true)
      : setMultiOwnerForApply(state, false);

    if (get(LicenseData, "licenseType")) {
      setValidToFromVisibilityForApply(state, get(LicenseData, "licenseType"));
    }

    const uploadedDocData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].tradeLicenseDetail.applicationDocuments",
      []
    );

    const uploadedTempDocData = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].applicationDocuments",
      []
    );

    for (var y = 0; y < uploadedTempDocData.length; y++) {
      if (
        uploadedTempDocData[y].required &&
        !some(uploadedDocData, { documentType: uploadedTempDocData[y].name })
      ) {
        isFormValid = false;
      }
    }

    if (isFormValid) {
      if (getQueryArg(window.location.href, "action") === "edit") {
        //EDIT FLOW
        const businessId = getQueryArg(
          window.location.href,
          "applicationNumber"
        );
        const tenantId = getQueryArg(window.location.href, "tenantId");
        dispatch(
          setRoute(
            `/tradelicence/search-preview?applicationNumber=${businessId}&tenantId=${tenantId}&edited=true`
          )
        );
        const updateMessage = {
          labelName: "Rates will be updated on submission",
          labelKey: "TL_COMMON_EDIT_UPDATE_MESSAGE"
        };
        dispatch(toggleSnackbar(true, updateMessage, "info"));
      }
      const reviewDocData =
        uploadedDocData &&
        uploadedDocData.map(item => {
          return {
            title: `TL_${item.documentType}`,
            link: item.fileUrl && item.fileUrl.split(",")[0],
            linkText: "View",
            name: item.fileName
          };
        });
      createEstimateData(
        LicenseData,
        "LicensesTemp[0].estimateCardData",
        dispatch
      ); //get bill and populate estimate card
      dispatch(
        prepareFinalObject("LicensesTemp[0].reviewDocData", reviewDocData)
      );
    }
  }
  if (activeStep === 3) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]"
    );
    isFormValid = await applyTradeLicense(state, dispatch);
    if (isFormValid) {
      moveToSuccess(LicenseData, dispatch);
    }
  }
  if (activeStep !== 3) {
    if (isFormValid) {
      changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName:
          "Please fill all mandatory fields and upload the documents !",
        labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
      };
      switch (activeStep) {
        case 0:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Trade Details, then do next !",
            labelKey: "ERR_FILL_TRADE_MANDATORY_FIELDS"
          };
          break;
        case 1:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Owner Details, then do next !",
            labelKey: "ERR_FILL_OWNERS_MANDATORY_FIELDS"
          };
          break;
        case 2:
          errorMessage = {
            labelName: "Please upload all the required documents !",
            labelKey: "ERR_UPLOAD_REQUIRED_DOCUMENTS"
          };
          break;
      }
      dispatch(toggleSnackbar(true, errorMessage, "warning"));
    }
  }
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    if (activeStep === 2 && mode === "next") {
      const isDocsUploaded = get(
        state.screenConfiguration.preparedFinalObject,
        "LicensesTemp[0].reviewDocData",
        null
      );
      activeStep = isDocsUploaded ? 3 : 2;
    } else {
      activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    }
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 3 ? true : false;
  const isPayButtonVisible = activeStep === 3 ? true : false;
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "TL_COMMON_BUTTON_PREV_STEP"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "TL_COMMON_BUTTON_NXT_STEP"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    },
    visible: false
  }
});

export const footerReview = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  const roleExists = ifUserRoleExists("CITIZEN");
  const redirectionURL = roleExists ? "/tradelicense-citizen" : "/tradelicence";

  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let tlCertificateDownloadObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  let tlCertificatePrintObject = {
    label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
    link: () => {
      generateReceipt(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "TL_RECEIPT" },
    link: () => {
      generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: () => {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "TL_APPLICATION" },
    link: () => {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [
        tlCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        tlCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "APPLIED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "pending_approval":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return getCommonApplyFooter({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left", display: "flex" }
          },
          children: {
            downloadMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-tradelicence",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Download",
                  leftIcon: "cloud_download",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: downloadMenu
                }
              }
            },
            printMenu: {
              uiFramework: "custom-atoms-local",
              moduleName: "egov-tradelicence",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Print",
                  leftIcon: "print",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: printMenu
                }
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        },
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            rejectButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "16px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "Reject",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/tradelicence/approve?purpose=reject&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "REJECT"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            },
            approveButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "APPROVE",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/tradelicence/approve?applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "APPROVE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            },
            proceedPayButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "PROCEED TO PAYMENT",
                  labelKey: "TL_COMMON_BUTTON_PROC_PMT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `${redirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenantId}&businessService=TL`
              },
              //visible: getButtonVisibility(status, "PROCEED TO PAYMENT"),
              roleDefination: {
                rolePath: "user-info.roles",
                //roles: ["TL_CEMP", "CITIZEN"]
                action: "PAY"
              }
            },
            cancelButton: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  minWidth: "200px",
                  height: "48px",
                  marginRight: "45px"
                }
              },
              children: {
                nextButtonLabel: getLabel({
                  labelName: "CANCEL TRADE LICENSE",
                  labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/tradelicence/approve?purpose=cancel&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "CANCEL TRADE LICENSE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      }
    }
  });
};
