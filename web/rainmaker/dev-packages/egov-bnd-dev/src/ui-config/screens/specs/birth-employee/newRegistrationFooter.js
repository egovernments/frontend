import {
  getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import {
    prepareFinalObject
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
  import { validateFields } from "../utils";
  import { toggleSpinner , toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { httpRequest } from "egov-ui-framework/ui-utils/api";
  import get from "lodash/get";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import jp from "jsonpath";
  import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
  import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";

const checkIfFormIsValid = async (state, dispatch) => {

  let isFormValid = true;

  const newRegistration = validateFields(
    "components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children",
    state,
    dispatch,
    "newRegistration"
  );  

  const placeOfBirth = validateFields(
    "components.div2.children.details.children.cardContent.children.placeInfo.children.cardContent.children.placeOfBirth.children",
    state,
    dispatch,
    "newRegistration"
  );  

  const childsInfo = validateFields(
    "components.div2.children.details.children.cardContent.children.childInfo.children.cardContent.children.infoOfChild.children",
    state,
    dispatch,
    "newRegistration"
  ); 

  const fathersInfo = validateFields(
    "components.div2.children.details.children.cardContent.children.fathersInfo.children.cardContent.children.fathersInfo.children",
    state,
    dispatch,
    "newRegistration"
  ); 

  const mothersInfo = validateFields(
    "components.div2.children.details.children.cardContent.children.mothersInfo.children.cardContent.children.mothersInfo.children",
    state,
    dispatch,
    "newRegistration"
  ); 

  const permAddr = validateFields(
    "components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children",
    state,
    dispatch,
    "newRegistration"
  ); 

  const addrTimeOfBirth = validateFields(
    "components.div2.children.details.children.cardContent.children.informantsInfo.children.cardContent.children.informantInfo.children",
    state,
    dispatch,
    "newRegistration"
  ); 

  if(newRegistration && permAddr && placeOfBirth &&
      childsInfo && fathersInfo && mothersInfo && addrTimeOfBirth)
    isFormValid = true
  else
    isFormValid = false;

  if (isFormValid) {
    try {
      dispatch(toggleSpinner());

      const newRegData = get(
        state.screenConfiguration.preparedFinalObject,
        "bnd.birth.newRegistration",
        []
      );
      newRegData["tenantid"] = getTenantId()
      newRegData["excelrowindex"] = -1

      if(newRegData["dateofreportepoch"]!=null)
        newRegData["dateofreportepoch"] = convertDateToEpoch(newRegData["dateofreportepoch"])/1000;
      if(newRegData["dateofbirthepoch"]!=null)
        newRegData["dateofbirthepoch"] = convertDateToEpoch(newRegData["dateofbirthepoch"])/1000;
      
      let payload = {
        BirthCertificate: [newRegData],
      };

      dispatch(toggleSpinner());

      payload = await httpRequest(
        "post",
        "birth-death-services/common/saveBirthImport",
        "saveBirthImport",
        [],
        payload);

      dispatch(toggleSpinner());
    
      if (payload) {
        if(payload.errorRowMap && Object.keys(payload.errorRowMap).length > 0)
        {
          let errorString = "";
          for(key in payload.errorRowMap)
          {
            errorString+=key+" ";
          }
          dispatch(toggleSnackbar(
            true,
            {
              labelName: "API Error",
              labelKey: errorString
            },
            "info"
          ));
        }
        else
        {
          dispatch(toggleSnackbar(
            true,
            {
              labelName: "API Error",
              labelKey: "BND_SUCCESS"
            },
            "info"
          ));
        }
      }
      else
      {
        // dispatch(
        //   setRoute(
        //     `/lams-citizen/acknowledgement?applicationNumber=${applicationNumber}&status=${status}&purpose=${purpose}`
        //   )
        // );
      }
    } 
    catch (error) {
      console.log(error)
      dispatch(toggleSnackbar(
        true,
        {
          labelName: "API Error",
          labelKey: "LAMS_API_ERROR"
        },
        "info"
      )
    );
    }
  } 
  else 
  {
    dispatch(toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields.",
          labelKey: "LAMS_REQUIRED_FIELDS_ERROR_MSG"
        },
        "info"
      )
    );
  }
};

const callBackSubmit = async (state, dispatch) => {
  checkIfFormIsValid(state, dispatch);
};

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const footer = getCommonApplyFooter({
  previousButton: {
    componentPath: "Button",
    visible:false,
    props: {
      variant: "contained",
      color: "primary",
      className:"submit-btn leaseApplicationSubmitButton",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "LAMS_COMMON_SUBMIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackSubmit
    },
    visible: true
  }
});