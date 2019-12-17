import {
  dispatchMultipleFieldChangeAction,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields, getTextToLocalMapping } from "../../utils";
// import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
  createUpdateNocApplication,
  prepareDocumentsUploadData
} from "../../../../../ui-utils/commons";
import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { mdmsMockJson } from '../mdmsMock';

const setReviewPageRoute = (state, dispatch) => {
  let tenantId = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.propertyDetails.address.city"
  );
  const applicationNumber = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber"
  );
  const appendUrl =
    process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  const reviewUrl = `${appendUrl}/egov-bpa/summary` //?applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
  dispatch(setRoute(reviewUrl));
};
const moveToReview = (state, dispatch) => {
  // const documentsFormat = Object.values(
  //   get(state.screenConfiguration.preparedFinalObject, "nocDocumentsUploadRedux")
  // );

  // let validateDocumentField = false;

  // for (let i = 0; i < documentsFormat.length; i++) {
  //   let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
  //   let isDocumentTypeRequired = get(
  //     documentsFormat[i],
  //     "isDocumentTypeRequired"
  //   );

  //   let documents = get(documentsFormat[i], "documents");
  //   if (isDocumentRequired) {
  //     if (documents && documents.length > 0) {
  //       if (isDocumentTypeRequired) {
  //         if (get(documentsFormat[i], "natureOfNoc.value")) {
  //           validateDocumentField = true;
  //         }else if (get(documentsFormat[i], "remarks.value")) {
  //           validateDocumentField = true;
  //         } else {
  //           dispatch(
  //             toggleSnackbar(
  //               true,
  //               { labelName: "Please select type of Document!", labelKey: "" },
  //               "warning"
  //             )
  //           );
  //           validateDocumentField = false;
  //           break;
  //         }
  //       } else {
  //         validateDocumentField = true;
  //       }
  //     } else {
  //       dispatch(
  //         toggleSnackbar(
  //           true,
  //           { labelName: "Please uplaod mandatory documents!", labelKey: "" },
  //           "warning"
  //         )
  //       );
  //       validateDocumentField = false;
  //       break;
  //     }
  //   } else {
  //     validateDocumentField = true;
  //   }
  // }

  // if (validateDocumentField) {
    setReviewPageRoute(state, dispatch);
  // }
};

const getMdmsData = async (state, dispatch) => {
  const tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "citiesByModule.citizenTenantId.value"
  );
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: 'pb',
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "DocumentType"
            },
            {
              name: "OwnerType"
            },
            {
              name: "OwnerShipCategory"
            }
          ]
        },
        {
          moduleName: "BPA",
          masterDetails: [
            {
              name: "DocTypeMapping"
            },
            {
              name: "ApplicationType"
            },
            {
              name: "ServiceType"
            }
          ]
        }
      ]
    }
  };
  try {
    // let payload = mdmsMockJson;
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData",
        payload.MdmsRes
      )
    );
    prepareDocumentsUploadData(state, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const getFloorDetail = (index) => {
  let floorNo = ['Ground', 'First', 'Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
  return `${floorNo[index]} floor`;
};

const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  // console.log(activeStep);
  let isFormValid = true;
  let hasFieldToaster = false;

  if (activeStep === 10) {
    let isBasicDetailsCardValid = validateFields(
      "components.div.children.formwizardFirstStep.children.basicDetails.children.cardContent.children.basicDetailsContainer.children",
      state,
      dispatch
    );

    if (
      !isBasicDetailsCardValid
    ) {
      isFormValid = false;
      hasFieldToaster = true;
    }
    const response = get(
      state,
      "screenConfiguration.preparedFinalObject.BPA.scrutinyDetails.planDetail.blocks[0].building.floors",
      []
  );
    //let index = 0;
    let data = response.map((item, index) => ({
      // [getTextToLocalMapping("Application No")]:
        "Floor Description": getFloorDetail(index),
        // [getTextToLocalMapping("Level")]:
        "Level": index,
        // [getTextToLocalMapping("Occupancy/Sub Occupancy")]:
        "Occupancy/Sub Occupancy": item.occupancies[0].type || "-",
        // [getTextToLocalMapping("Buildup Area")]:
        "Buildup Area": item.occupancies[0].builtUpArea || "-",
        // [getTextToLocalMapping("Floor Area")]:
        "Floor Area": item.occupancies[0].floorArea || "-",
        // [getTextToLocalMapping("Carpet Area")]:
        "Carpet Area": item.occupancies[0].carpetArea || "-"
    }));
    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardSecondStep.children.proposedBuildingDetails.children.cardContent.children.proposedContainer.children.proposedBuildingDetailsContainer",
        "props.data",
        data
      )
    );
  }

  if (activeStep === 11) {
    let isBuildingPlanScrutinyDetailsCardValid = validateFields(
      "components.div.children.formwizardSecondStep.children.buildingPlanScrutinyDetails.children.cardContent.children.buildingPlanScrutinyDetailsContainer.children",
      state,
      dispatch
    );
    let isBlockWiseOccupancyAndUsageDetailsCardValid = validateFields(
      "components.div.children.formwizardSecondStep.children.blockWiseOccupancyAndUsageDetails.children.cardContent.children.blockWiseOccupancyAndUsageDetailscontainer.children.cardContent.children.blockWiseContainer.children",
      state, 
      dispatch
    )
    let isDemolitiondetailsCardValid = validateFields(
      "components.div.children.formwizardSecondStep.children.demolitiondetails.children.cardContent.children.demolitionDetailsContainer.children",
      state,
      dispatch
    );
    let isProposedBuildingDetailsCardValid = validateFields(
      "components.div.children.formwizardSecondStep.children.proposedBuildingDetails.children.cardContent.children.totalBuildUpAreaDetailsContainer.children",
      state,
      dispatch
    );

    if (
      // !isBuildingPlanScrutinyDetailsCardValid 
      !isBlockWiseOccupancyAndUsageDetailsCardValid ||
      !isDemolitiondetailsCardValid ||
      !isProposedBuildingDetailsCardValid
    ) {
      isFormValid = false;
      hasFieldToaster = true;
    }
  }

  if (activeStep === 12) {
    let isApplicantTypeCardValid = validateFields(
      "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children",
      state,
      dispatch
    );
    let isSingleApplicantCardValid = validateFields(
      "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children",
      state,
      dispatch
    );
    let isInstitutionCardValid = validateFields(
      "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.applicantCard.children",
      state,
      dispatch
    );

    // Multiple applicants cards validations
    let multipleApplicantCardPath =
      "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items";
    // "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[0].item0.children.cardContent.children.applicantCard"
    let multipleApplicantCardItems = get(
      state.screenConfiguration.screenConfig.apply,
      multipleApplicantCardPath,
      []
    );
    let isMultipleApplicantCardValid = true;
    for (var j = 0; j < multipleApplicantCardItems.length; j++) {
      if (
        (multipleApplicantCardItems[j].isDeleted === undefined ||
          multipleApplicantCardItems[j].isDeleted !== false) &&
        !validateFields(
          `${multipleApplicantCardPath}[${j}].item${j}.children.cardContent.children.applicantCard.children`,
          state,
          dispatch,
          "apply"
        )
      )
        isMultipleApplicantCardValid = false;
    }

    let selectedApplicantType = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
      "SINGLE"
    );
    if (selectedApplicantType.includes("INSTITUTIONAL")) {
      isSingleApplicantCardValid = true;
      isMultipleApplicantCardValid = true;
    } else if (selectedApplicantType.includes("MULTIPLEOWNERS")) {
      isSingleApplicantCardValid = true;
      isInstitutionCardValid = true;
    } else {
      isMultipleApplicantCardValid = true;
      isInstitutionCardValid = true;
    }

    if (
      !isApplicantTypeCardValid ||
      !isSingleApplicantCardValid ||
      !isInstitutionCardValid ||
      !isMultipleApplicantCardValid
    ) {
      isFormValid = false;
      hasFieldToaster = true;
    }
  }

  if (activeStep === 13) {
    let isBoundaryDetailsCardValid = validateFields(
      "components.div.children.formwizardFourthStep.children.boundaryDetails.children.cardContent.children.boundaryDetailsConatiner.children",
      state,
      dispatch
    );
    let isDetailsofplotCardValid = validateFields(
      "components.div.children.formwizardFourthStep.children.detailsofplot.children.cardContent.children.detailsOfPlotContainer.children",
      state,
      dispatch
    );

    if (
      !isBoundaryDetailsCardValid ||
      !isDetailsofplotCardValid
    ) {
      isFormValid = false;
      hasFieldToaster = true;
    }
  }

  if (activeStep === 14) {
    const documentsFormat = Object.values(
      get(state.screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux")
    );

    let validateDocumentField = false;

    for (let i = 0; i < documentsFormat.length; i++) {
      let isDocumentRequired = get(documentsFormat[i], "isDocumentRequired");
      let isDocumentTypeRequired = get(
        documentsFormat[i],
        "isDocumentTypeRequired"
      );

      let documents = get(documentsFormat[i], "documents");
      if (isDocumentRequired) {
        if (documents && documents.length > 0) {
          if (isDocumentTypeRequired) {
            if (get(documentsFormat[i], "dropDownValues.value")) {
              validateDocumentField = true;
            } else {
              dispatch(
                toggleSnackbar(
                  true,
                  { labelName: "Please select type of Document!", labelKey: "BPA_FOOTER_SELECT_DOC_TYPE" },
                  "warning"
                )
              );
              validateDocumentField = false;
              break;
            }
          } else {
            validateDocumentField = true;
          }
        } else {
          dispatch(
            toggleSnackbar(
              true,
              { labelName: "Please uplaod mandatory documents!", labelKey: "BPA_FOOTER_UPLOAD_MANDATORY_DOC" },
              "warning"
            )
          );
          validateDocumentField = false;
          break;
        }
      } else {
        validateDocumentField = true;
      }
    }
    if (!validateDocumentField) {
    isFormValid = false;
    hasFieldToaster = true;
    }
  }

  if (activeStep === 15) {
    moveToReview(state, dispatch);
  }

  if (activeStep !== 5) {
    if (isFormValid) {
      let responseStatus = "success";
      if (activeStep === 3) {
        // getMdmsData(state, dispatch);
        // prepareDocumentsUploadData(state, dispatch);
      }
      if (activeStep === 2) {
        let response = await createUpdateNocApplication(
          state,
          dispatch,
          "INITIATE"
        );
        responseStatus = get(response, "status", "");
      }
      responseStatus === "success" && changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage = {
        labelName: "Please fill all mandatory fields and upload the documents!",
        labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
      };
      switch (activeStep) {
        case 0:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Basic Details, then proceed!",
            labelKey: "Please fill all mandatory fields for Basic Details, then proceed!"
          };
          break;
        case 1:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Scrutiny Details, then proceed!",
            labelKey: "Please fill all mandatory fields for Scrutiny Details, then proceed!"
          };
          break;
        case 2:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Applicant Details, then proceed!",
            labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
          };
          break;
        case 3:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Plot & Boundary Details, then proceed!",
            labelKey: "Please fill all mandatory fields for Plot & Boundary Details, then proceed!"
          };
          break;
        case 4:
          errorMessage = {
            labelName:
              "Please fill all mandatory fields for Plot & Boundary Info Details, then proceed!",
            labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
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
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 6 ? true : false;
  const isPayButtonVisible = activeStep === 6 ? true : false;
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
    case 3:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
      break;
    case 4:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFifthStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSixthStep"
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
    },
    {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardFifthStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardSixthStep",
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
        labelKey: "BPA_COMMON_BUTTON_PREV_STEP"
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
        labelKey: "BPA_COMMON_BUTTON_NXT_STEP"
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
        labelKey: "BPA_COMMON_BUTTON_SUBMIT"
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