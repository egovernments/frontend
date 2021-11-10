import commonConfig from "config/common.js";
import { getCommonHeader,getCommonCard, getBreak, getLabel ,getStepperObject ,getCommonContainer, getCommonTitle,getCommonParagraph,} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { createConnection } from "./createResources/createConnection";
import { propertyAssesment } from "./createResources/propertyAssesment";
import { propertyOwner } from "./createResources/propertyOwner";
import { propertyBillDetails } from "./createResources/propertyBillDetails";
import { WaterConnectionDues } from "./createResources/WaterConnectionDues";
import { SewerageConnectionDues } from "./createResources/SewerageConnectionDues";
import { sewerageConnection } from "./createResources/sewerageConnection";
import { waterConnection } from "./createResources/waterConnection";
import { nodRemarks } from "./createResources/nodRemarks";
import { propertySummary } from "./createResources/propertySummary";
import { waterSewerageSummary } from "./createResources/waterSewerageSummary";
import { documentSummary } from "./createResources/documentSummary";
import { remarksSummary } from "./createResources/remarksSummary";
import { footer } from "./createResources/footer";
import "./index.css";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { documentsDetails } from "./createResources/documentsDetails";







export const stepsData = [
  { labelName: "Property Dues", label: "Property Dues" },
  { labelName: "Water Dues", label: "Water Dues" },
  { labelName: "Sewerage Dues", label: "Sewerage Dues" },
  { labelName: "Documents", label: "Documents" },
  { labelName: "Remarks", label: "Remarks" },
  { labelName: "Summary", label: "Summary" }
 
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);
// get the documentlist from mdms file


const header = getCommonHeader({
    label: "Application for No Dues"
  });

// export const documentsDetails = getCommonCard({
  
//     header: getCommonTitle(
//       { labelName: "Required Documents", label: "Required Documents" },
//       { style: { marginBottom: 18 } }
//     ),
//     subText: getCommonParagraph({
//       labelName:"Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
//       label: "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload"
//     }),
//    // documentList
//   });

  export const formwizardFirstStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form1"
    },
    children: { 
      createConnection,  propertyOwner, propertyAssesment, propertyBillDetails },
      visible: true
   
  };
  export const formwizardSecondStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form2"
    },
    children: {  waterConnection ,WaterConnectionDues },
    visible: false
  };

  export const formwizardThirdStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form2"
    },
    children: { sewerageConnection ,SewerageConnectionDues },
    visible: false
  };
  export const formwizardFourthStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form3"
    },
    children: {  documentsDetails },
    visible: false
  };
  export const formwizardFifthStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form4"
    },
    children: {  nodRemarks },
    visible: false
  };
  export const formwizardSixthStep = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form5"
    },
    children: {  propertySummary , waterSewerageSummary , documentSummary , remarksSummary},
    visible: false
  };

const create = {
    uiFramework: "material-ui",
    name: "create",
       beforeInitScreen: (action, state, dispatch) => {
      dispatch(prepareFinalObject("NodTemp[0].tenantId", getTenantIdCommon()));
      dispatch(prepareFinalObject("searchScreen", {}));
      dispatch(prepareFinalObject('NODScreen',{}));
      dispatch(prepareFinalObject('stepper',1))
      
      return action;
    },
    components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            className: "common-div-css",
            id: "create"
          },
          children: {
            headerDiv: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
    
              children: {
                header: {
                  gridDefination: {
                    xs: 12,
                    sm: 6
                  },
                  ...header
                }
               

              }
            },
            
            stepper,
            formwizardFirstStep,
            formwizardSecondStep,
            formwizardThirdStep,
            formwizardFourthStep,
            formwizardFifthStep,
            footer: footer


          }
        },
        adhocDialog: {
          uiFramework: "custom-containers",
          componentPath: "DialogContainer",
          props: {
            open: false,
            maxWidth: false,
            screenKey: "create"
          },
          children: {
            popup: {}
          }
        }
      }


}
export default create

const openSearchConnectionForm = (state, dispatch) => {
 
 // dispatch(prepareFinalObject("Demands", []));
 // dispatch(prepareFinalObject("ReceiptTemp[0].Bill", []));
  const path =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/nod/create`
      : `/nod/search`;
  dispatch(setRoute(path));
};