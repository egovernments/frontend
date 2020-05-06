import {
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import store from "ui-redux/store";
import set from 'lodash/set';
import { toggleSnackbar, handleScreenConfigurationFieldChange as handleField } from 'egov-ui-framework/ui-redux/screen-configuration/actions';
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";

let redirectUrl = getQueryArg(window.location.href, "redirectUrl");
let screenKey = "register-property"


let validateFields = (
  objectJsonPath,
  state,
  dispatch,
  screen = "apply"
) => {
  const fields = get(
    state.screenConfiguration.screenConfig[screen],
    objectJsonPath,
    {}
  );
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (
        fields[variable] &&
        fields[variable].props &&
        (fields[variable].props.disabled === undefined ||
          !fields[variable].props.disabled) &&
        !validate(
          screen,
          {
            ...fields[variable],
            value: get(
              state.screenConfiguration.preparedFinalObject,
              fields[variable].jsonPath
            )
          },
          dispatch,
          true
        )
      ) {
      	// Needs to remove and find better solutions
      	if(isFormValid && variable == 'sameAsPropertyAddress'){
      		isFormValid = true
      	}else{      	
        	isFormValid = false;
        }
      }
    }
  }
  return isFormValid;
};


const callBackForApply = async (state, dispatch) => {

  let consumerCode = getQueryArg(window.location.href, "consumerCode");
  let propertyPayload = get(
    state,
    "screenConfiguration.preparedFinalObject.Property"
  );

  let isAssemblyDetailsValid = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children",
    state,
    dispatch,
    screenKey
  );

  let isAssemblyDetailsPropType = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.propertyType",
    state,
    dispatch,
    screenKey
  );
  let isAssemblyDetailsConstructedArea = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.totalConstructedArea",
    state,
    dispatch,
    screenKey
  );
  let isAssemblyDetailsusageType = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.usageType",
    state,
    dispatch,
    screenKey
  );
  let isAssemblyDetailstotalLandArea = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.totalLandArea",
    state,
    dispatch,
    screenKey
  );

  let isPropertyLocationDetailsValid = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyLocationDetails.children.cardContent.children.propertyLocationDetailsContainer.children",
    state,
    dispatch,
    screenKey
  );
  

  let isPropertyOwnerDetailsTypeSelection = validateFields(
     "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children",
     state,
     dispatch,
     screenKey
   );
  let isPropertyOwnerDetailsValid = true;
  if(propertyPayload.ownershipCategory){
  	if(propertyPayload.ownershipCategory === 'INDIVIDUAL.SINGLEOWNER'){
	  isPropertyOwnerDetailsValid = validateFields(   
	"components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children",
	     state,
	     dispatch,
	     screenKey
	   );
	}else if(propertyPayload.ownershipCategory === 'INDIVIDUAL.MULTIPLEOWNERS'){
	   
	   let multiOwnerItems = get(
		    state,
		    "screenConfiguration.screenConfig.register-property.components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items"
		  );
     if(multiOwnerItems && multiOwnerItems.length > 0){
  	   for(var i=0;i < multiOwnerItems.length;i++){
      	   isPropertyOwnerDetailsValid = validateFields(   
      	"components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items["+i+"].item"+i+".children.cardContent.children.applicantCard.children",
      	     state,
      	     dispatch,
      	     screenKey
      	   );
        }
      }
	   
	}else if(propertyPayload.ownershipCategory === 'INSTITUTIONALGOVERNMENT' || propertyPayload.ownershipCategory === 'INSTITUTIONALPRIVATE'){	   
    dispatch(
      handleField(
        screenKey,
        "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children.privateInstitutionTypeDetails",
        "required",
         true
      )
    );
	   let isPropertyOwnerInstitutionTypeValid = validateFields(   
	"components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionType.children.cardContent.children.institutionTypeDetailsContainer.children",
	     state,
	     dispatch,
	     screenKey
	   );	   
	   let isPropertyOwnerInstitutionInfoValid = validateFields(   
	"components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.institutionDetailsContainer.children",
	     state,
	     dispatch,
	     screenKey
	   );
	   
	   isPropertyOwnerDetailsValid = (isPropertyOwnerInstitutionTypeValid)?isPropertyOwnerInstitutionInfoValid:false
	}
  }else{
    isPropertyOwnerDetailsValid = validateFields(   
  "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children",
       state,
       dispatch,
       screenKey
     );
  }
  if (
    isAssemblyDetailsValid &&
    isAssemblyDetailsPropType &&
    isAssemblyDetailsConstructedArea &&
    isAssemblyDetailstotalLandArea &&
    isAssemblyDetailsusageType &&
    isPropertyLocationDetailsValid &&
    isPropertyOwnerDetailsTypeSelection &&
    isPropertyOwnerDetailsValid
  ) {
    propertyPayload.owners.map(owner => {
      if (!_.isUndefined(owner.status)) {
        owner.status = "INACTIVE"
      }
    })
    if (
      propertyPayload
        .ownershipCategory
        .includes("INDIVIDUAL")
    ) {
      propertyPayload.owners.map(owner => {
        owner.status = "ACTIVE";
      })
      propertyPayload.owners = [...propertyPayload.owners]
    } else if (
      propertyPayload
        .ownershipCategory
        .includes("INSTITUTIONALPRIVATE") ||
      propertyPayload
        .ownershipCategory
        .includes("INSTITUTIONALGOVERNMENT")
    ) {
      propertyPayload.owners.map(owner => {
        owner.status = "ACTIVE";
        owner.ownerType = 'NONE';
        owner.altContactNumber = propertyPayload.institution.landlineNumber;
      })
      propertyPayload.owners = [
        ...propertyPayload.owners
      ]
    }
    set(propertyPayload, "channel", "SYSTEM");
    set(propertyPayload, "source", "MUNICIPAL_RECORDS");
    set(propertyPayload, "noOfFloors", 1);
    propertyPayload.landArea = parseInt(propertyPayload.landArea);
    propertyPayload.tenantId = propertyPayload.address.city;
    propertyPayload.address.city = propertyPayload.address.city.split(".")[1];
    try {
      if(propertyPayload.propertyType === 'BUILTUP.SHAREDPROPERTY') {
        let unit = {};
        unit.usageCategory = propertyPayload.subUsageCategory;
        unit.occupancyType = "SELFOCCUPIED";
        unit.constructionDetail = {};
        propertyPayload.units = [];
        propertyPayload.units.push(unit);
      }
      propertyPayload.creationReason = 'CREATE';
      let payload = null;
      payload = await httpRequest(
        "post",
        "/property-services/property/_create",
        "_update",
        [],
        { Property: propertyPayload }

      );
      if (payload) {
        store.dispatch(handleField(screenKey, "components.adhocDialog", "props.open", true));
        setTimeout(() => {
          window.location.href=window.location.origin + '/'+process.env.REACT_APP_NAME.toLowerCase() +`${redirectUrl}?propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}`
          /*store.dispatch(
            setRoute(
              `${redirectUrl}?propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}`
            )
          );*/
        }, 3000);
      }
      else {
        store.dispatch(
          setRoute(
            `acknowledgement?purpose=apply&status=failure&applicationNumber=${consumerCode}&tenantId=${propertyPayload.tenantId}`
          )
        );
      }
    } catch (e) {
      console.log(e);
      store.dispatch(
        setRoute(
          `acknowledgement?purpose=apply&status=failure&applicationNumber=${consumerCode}&tenantId=${propertyPayload.tenantId}
        `
        )
      );
    }
  } else {
    dispatch(
      toggleSnackbar(
        true, {
        labelKey: "PT_COMMON_REQUIRED_FIELDS",
        labelName: "Please fill Required details"
      },
        "warning"
      )
    )
  }
}

export const footer = getCommonApplyFooter({
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
        labelKey: "PT_COMMON_BUTTON_SUBMIT"
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForApply
    },
    visible: true
  }
});
