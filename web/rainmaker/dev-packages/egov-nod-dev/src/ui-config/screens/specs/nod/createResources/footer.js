import {
  dispatchMultipleFieldChangeAction,
  getLabel,
  getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter, validateFields } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {createUpdateNodApplication,prepareDocumentsUploadData} from "../../../../../ui-utils/commons";
import set from "lodash/set";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const getMdmsData = async (state, dispatch) => {
  let tenantId = "pb";
  // let tenantId = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "FireNOCs[0].fireNOCDetails.propertyDetails.address.city"
  // );
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {moduleName: "NoDues",masterDetails: [{name: "Documents"}]},
      ]
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.Nod.Documents",
        payload.MdmsRes.Nod.Documents
      )
    );
    prepareDocumentsUploadData(state, dispatch);
  } catch (e) {
    console.log(e);
  }
};



const callBackForPrevious = async (state, dispatch , action) => {
  
  let activeStep = state.screenConfiguration.preparedFinalObject.stepper;
  if (activeStep === 2) {
   
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFirstStep.visible',true);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFirstStep.props.visible',true);

   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.visible',false);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.props.visible',false);
 
 
   set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.props.visible',false);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.visible',false);
 
   dispatch(prepareFinalObject('stepper',1)) 
 
  }

  if (activeStep === 3) {

    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.props.visible',false);
 
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.props.visible',true);
  
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.props.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.visible',true);
  
  
      dispatch(prepareFinalObject('stepper',2)) 
}

  if (activeStep === 4) {
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.props.visible',true);
 
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.props.visible',false);
  
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.props.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.visible',true);
  
    dispatch(prepareFinalObject('stepper',3))
  }

  if (activeStep === 5) {
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFifthStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFifthStep.props.visible',false);
 
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.props.visible',true);
  
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.props.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.visible',true);
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.submitButton.props.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.submitButton.visible',false);
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.nextButton.props.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.nextButton.visible',true);
  
 

    dispatch(prepareFinalObject('stepper',4))

  }
};



const callBackForNext = async (state, dispatch , action) => {
 
  let activeStep = state.screenConfiguration.preparedFinalObject.stepper;

  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
  
  ];
  dispatchMultipleFieldChangeAction("create", actionDefination, dispatch);





  if (activeStep === 1) {
   
    prepareDocumentsUploadData(state, dispatch);
   
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFirstStep.visible',false);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFirstStep.props.visible',false);

   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.visible',true);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.props.visible',true);
 
 
   set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.props.visible',true);
   set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.previousButton.visible',true);
 
 
 
   dispatch(prepareFinalObject('stepper',2)) 
 
  }

  if (activeStep === 2) {
   
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.props.visible',true);
    //set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.children.documentsDetails.children.cardContent.children.documentList.visible',true);
    //set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.children.documentsDetails.children.cardContent.children.documentList.props.visible',true);
 
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardSecondStep.props.visible',false);
  

      dispatch(prepareFinalObject('stepper',3)) 
}

  if (activeStep === 3) {
   
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardThirdStep.props.visible',false);
 
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.props.visible',true);
 


    dispatch(prepareFinalObject('stepper',4))
  }

  if (activeStep === 4) {
    
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFourthStep.props.visible',false);
 
   
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFifthStep.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.formwizardFifthStep.props.visible',true);
 
    
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.submitButton.props.visible',true);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.submitButton.visible',true);
  
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.nextButton.props.visible',false);
    set(state.screenConfiguration.screenConfig.create,'components.div.children.footer.children.nextButton.visible',false);
  
  
  
    dispatch(prepareFinalObject('stepper',5))

  }
};

export const footer = getCommonApplyFooter("BOTTOM", {
//export const footer = getCommonCard({
  previousButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        // minWidth: "200px",
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
        label: "Previous Step"
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
        // minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        label: "Next Step"
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
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        // minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        label: "Submit"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callNODCreateApi
    },
    visible: false
  },
});
