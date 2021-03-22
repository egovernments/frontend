import {
  prepareFinalObject,  handleScreenConfigurationFieldChange as handleField 
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {newRegistrationForm} from "./newRegistrationCard";
import {footer} from "./newRegistrationFooter";
import {confirmationDialog} from "./newRegistrationConfirmDialog";
import {addHospitalDialog} from "./addHospitalDialog";
import get from "lodash/get";
import {loadHospitals, loadFullCertDetails} from "../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";


export const showHideConfirmationPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["newRegistration"],
   "components.confirmationDialog.props.open",
   false
 );
 dispatch(
   handleField("newRegistration", "components.confirmationDialog", "props.open", !toggle)
 );
};

export const showHideAddHospitalDialog = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["newRegistration"],
   "components.hospitalDialog.props.open",
   false
 );
 dispatch(
   handleField("newRegistration", "components.hospitalDialog", "props.open", !toggle)
 );
};

const newRegistration = {
  uiFramework: "material-ui",
  name: "newRegistration",
  beforeInitScreen:(action, state, dispatch) => {
    
    let userAction = getQueryArg(window.location.href, "action");
    let id = getQueryArg(window.location.href, "certificateId");
    let module = getQueryArg(window.location.href, "module");
    if(userAction=="VIEW" && id && module)
    {
      loadFullCertDetails(action,state,dispatch, {tenantId:getTenantId(), id:id, module:module}).then((response)=>{
        response = {BirthCertificate:[{"birthFatherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthMotherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthPresentaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"birthPermaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"registrationno":"test","hospitalname":"VAIJAYANTI HOSPITAL","dateofreportepoch":"2021-03-16","dateofbirthepoch":"2021-03-11","genderStr":"Male","firstname":"TEst","middlename":"TEst","lastname":"TEst","placeofbirth":"TEst","informantsname":"TEst","informantsaddress":"TEst","remarks":"asdf"}]};
        if (response && response.BirthCertificate && response.BirthCertificate.length>0) {
          //dispatch(prepareFinalObject("bnd.birth.newRegistration", {"birthFatherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthMotherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthPresentaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"birthPermaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"registrationno":"test","hospitalname":"VAIJAYANTI HOSPITAL","dateofreportepoch":"2021-03-16","dateofbirthepoch":"2021-03-11","genderStr":"Male","firstname":"TEst","middlename":"TEst","lastname":"TEst","placeofbirth":"TEst","informantsname":"TEst","informantsaddress":"TEst","remarks":"asdf"}));
          dispatch(prepareFinalObject("bnd.birth.newRegistration", response.BirthCertificate[0]));
        }
      });
    }
    else
    {
      dispatch(prepareFinalObject("bnd.birth.newRegistration", {"birthFatherInfo":{},"birthMotherInfo":{},"birthPresentaddr":{},"birthPermaddr":{}}));
      //dispatch(prepareFinalObject("bnd.birth.newRegistration", {"birthFatherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthMotherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthPresentaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"birthPermaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"registrationno":"test","hospitalname":"VAIJAYANTI HOSPITAL","dateofreportepoch":"2021-03-16","dateofbirthepoch":"2021-03-11","genderStr":"Male","firstname":"TEst","middlename":"TEst","lastname":"TEst","placeofbirth":"TEst","informantsname":"TEst","informantsaddress":"TEst","remarks":"asdf"}));
      loadHospitals(action, state, dispatch, "birth",getTenantId()).then((response)=>{
        if(response && response.hospitalDtls)
        {
          for (let hospital of response.hospitalDtls) {
            hospital.code = hospital.name;
            hospital.name = hospital.name;
          }
          dispatch(prepareFinalObject("bnd.allHospitals", response.hospitalDtls));
        }
      });
    }

    return action;
  },
  components: {
    div2:{
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
      },
      children: {
        details: newRegistrationForm
      },
      //visible: process.env.REACT_APP_NAME === "Employee" ? true: false
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        details: footer
      },
    },
    confirmationDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "sm",
        disableValidation: true
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
            // style: { minHeight: "180px", minWidth: "365px" }
          },
          children: {
            popup: confirmationDialog
          }
        }
      }
    },
    hospitalDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "sm",
        disableValidation: true
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
            // style: { minHeight: "180px", minWidth: "365px" }
          },
          children: {
            popup: addHospitalDialog
          }
        }
      }
    }
  }
};


export default newRegistration;