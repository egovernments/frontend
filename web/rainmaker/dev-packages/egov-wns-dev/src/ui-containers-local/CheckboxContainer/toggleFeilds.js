import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import set from "lodash/set";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { isModifyMode } from "./../../ui-utils/commons";

export const toggleWater = (onFieldChange, value) => {
  let isMode = isModifyMode();
  let mStep = (isMode) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange(
    "apply",
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.dynamicMdmsWaterSource`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNumberOfTapsPropsed",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewPipeSize",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSubSource",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSource",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading",
    "visible",
    value
  );
}

export const toggleSewerage = (onFieldChange, value) => {
  let isMode = isModifyMode();
  let mStep = (isMode) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType",
    "props.value",
    "Non Metered"
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfClosets",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfToilets",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterClosets",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfToilets",
    "visible",
    value
  );
}

export const togglePlumberFeilds = (onFieldChange, value) => {
  let isMode = isModifyMode();
  let mStep = (isMode) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberLicenceNo`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberName`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.plumberDetailsContainer.children.cardContent.children.plumberDetails.children.plumberMobNo`,
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberMobileNo",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberName",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.children.reviewPlumberLicenseNo",
    "visible",
    value
  );
}

export const toggleConnHolderDetails=(onFieldChange, value)=>{
  onFieldChange(
    "apply",
    "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.holderDetails",
    "visible",
    value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewSix",
    "visible",
    !value
  );
  onFieldChange(
    "apply",
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFive",
    "visible",
    value
  );
}

export const togglePropertyFeilds = (action, value) => {
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyIDDetails.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.Details.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.ownerDetails.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.connectionHolderDetails.visible",
    value
  );
  
}

export const toggleSewerageFeilds = (action, value) => {
  let isMode = isModifyMode();
  let mStep = (isMode) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfToilets.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.noOfWaterClosets.visible`,
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfToilets.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNoOfClosets.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterClosets.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfToilets.visible",
    value
  )
}

export const toggleWaterFeilds = (action, value) => {
  let isMode = isModifyMode();
  let mStep = (isMode) ? 'formwizardSecondStep' : 'formwizardThirdStep';
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.connectionType.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.numberOfTaps.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSourceType.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.waterSubSource.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.connectiondetailscontainer.children.cardContent.children.connectionDetails.children.pipeSize.visible`,
    value
  );
  set(
    action.screenConfig,
    `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID.visible`,
    value
    );
    set(
      action.screenConfig,
      `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate.visible`,
      value
      );
      set(
        action.screenConfig,
        `components.div.children.${mStep}.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading.visible`,
        value
        );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskNumberOfTapsPropsed.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewPipeSize.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSubSource.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewWaterSource.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewConnectionType.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewConnDetails.children.cardContent.children.viewFour.children.view.children.taskPipeSizeProposed.visible",
    value
  );
  set(
    action.screenConfig,
    "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSix.children.reviewNumberOfTaps.visible",
    value
  );
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId.visible",
  //   value
  // );
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate.visible",
  //   value
  // );
  // set(
  //   action.screenConfig,
  //   "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading.visible",
  //   value
  // );
}