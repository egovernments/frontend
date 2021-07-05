import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from 'egov-ui-framework/ui-redux/screen-configuration/actions';
import { getQueryArg, validateFields } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import set from 'lodash/set';
import store from "ui-redux/store";
import { httpRequest } from "../../../../../ui-utils";
import { getCommonApplyFooter } from "../../utils";
import { getQueryRedirectUrl } from "../searchResource/searchResults";
import "./index.css";
import cloneDeep from "lodash/cloneDeep";



let screenKey = "register-property"

export const displayEditPage = async (state, dispatch) => {
  let propertyPayload = get(
    state,
    "screenConfiguration.preparedFinalObject.Property"
  );
  
  if(window.location.href.includes("pt-common-screens/summary")) {
    let mode = getQueryArg(window.location.href, "ptmode")
    store.dispatch(
      setRoute(`register-property?purpose=update&propertyId=${propertyPayload.propertyId}&tenantId=${propertyPayload.tenantId}&ptmode=${mode}&redirectUrl=${getQueryArg(window.location.href, "redirectUrl")}&action=${getQueryArg(window.location.href, "action")}`)
    );
  }
}

const callBackForApply = async (state, dispatch) => {
  let propertyPayload = get(
    state,
    "screenConfiguration.preparedFinalObject.Property"
  );
  //console.log("propertyPayload here--",propertyPayload);
  if(window.location.href.includes("pt-common-screens/summary") && getQueryArg(window.location.href, "purpose")!='update') {
    let isFromWorkflowDetails = get ( state, "screenConfiguration.preparedFinalObject.isWorkflowDetails", null );
    set(propertyPayload, "workflow", isFromWorkflowDetails);
    let payload = null;
        payload = await httpRequest(
          "post",
          "/property-services/property/_update",
          "_update",
          [],
          { Property: propertyPayload }
        );
        if (payload) {
          store.dispatch(handleField("summary", "components.adhocDialog", "props.open", true));
          setTimeout(() => {
            const isMode = getQueryArg(window.location.href, "mode");
            if (isMode === "MODIFY") {
              store.dispatch(
                setRoute(`${getQueryRedirectUrl()}&propertyId=${payload.Properties[0].propertyId}`)
              )
            } else {
              store.dispatch(
                setRoute(`${getQueryRedirectUrl()}&propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}`)
              )
            }
          }, 3000);
        } else {
          dispatch(
            toggleSnackbar(
              true, {
              labelKey: "PT_COMMON_FAILED_TO_UPDATE_PROPERTY",
              labelName: "Failed to update property"
            },
              "warning"
            )
          )
        }
  } else {
  //console.log("in else")
  let consumerCode = getQueryArg(window.location.href, "consumerCode");

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

  let isAssemblyDetailsnoOfFloors = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.noOfFloors",
    state,
    dispatch,
    screenKey
  );

  let isAssemblyDetailsnoOfFlats = validateFields(
    "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.noOfFlats",
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
  let multiOwnerItems;
  if (propertyPayload.ownershipCategory) {
    if (propertyPayload.ownershipCategory === 'INDIVIDUAL.SINGLEOWNER') {
      isPropertyOwnerDetailsValid = validateFields(
        "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children",
        state,
        dispatch,
        screenKey
      );
    } else if (propertyPayload.ownershipCategory === 'INDIVIDUAL.MULTIPLEOWNERS') {

      multiOwnerItems = get(
        state,
        "screenConfiguration.screenConfig.register-property.components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items"
      );
      if (multiOwnerItems && multiOwnerItems.length > 0) {
        for (var i = 0; i < multiOwnerItems.length; i++) {
          if (multiOwnerItems[i] && !multiOwnerItems[i].hasOwnProperty('isDeleted')) {
            isPropertyOwnerDetailsValid = validateFields(
              "components.div.children.formwizardFirstStep.children.propertyOwnershipDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[" + i + "].item" + i + ".children.cardContent.children.applicantCard.children",
              state,
              dispatch,
              screenKey
            );
          }
        }
      }

    } else if (propertyPayload.ownershipCategory === 'INSTITUTIONALGOVERNMENT' || propertyPayload.ownershipCategory === 'INSTITUTIONALPRIVATE') {
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

      isPropertyOwnerDetailsValid = (isPropertyOwnerInstitutionTypeValid) ? isPropertyOwnerInstitutionInfoValid : false
    }
  } else {
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
    isAssemblyDetailsnoOfFloors &&
    isAssemblyDetailsnoOfFlats &&
    isAssemblyDetailstotalLandArea &&
    isAssemblyDetailsusageType &&
    isPropertyLocationDetailsValid &&
    isPropertyOwnerDetailsTypeSelection &&
    isPropertyOwnerDetailsValid
  ) {
    if (multiOwnerItems && multiOwnerItems.length > 0) {
      let checkmultiownerCount = multiOwnerItems.length;
      for (var i = 0; i < multiOwnerItems.length; i++) {
        if (multiOwnerItems[i] && multiOwnerItems[i].hasOwnProperty('isDeleted')) {
          checkmultiownerCount--;
        }
      }
      if (checkmultiownerCount < 2) {
        dispatch(
          toggleSnackbar(
            true, {
            labelKey: "PT_COMMON_ONE_MORE_OWNER_INFROMATION_REQUIRED",
            labelName: "One more owner information required"
          },
            "warning"
          )
        )
        return false;
      }
    }
    // Property.landArea Property.totalConstructedArea
    if (Number(propertyPayload.superBuiltUpArea) > Number(propertyPayload.landArea)) {
      dispatch(
        toggleSnackbar(
          true, {
          labelKey: "PT_COMMON_TOTAL_CONSTRUCTEDAREA_LESS_THAN_LANDAREA_REQUIRED",
          labelName: "Total constructed area less than land area"
        },
          "warning"
        )
      )
      return false;
    }
    for (var i = propertyPayload.owners.length - 1; i--;) {
      if (propertyPayload.owners[i].hasOwnProperty('isDeleted')) propertyPayload.owners.splice(i, 1);
    }
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
        owner.altContactNumber = propertyPayload.owners[0].altContactNumber;
      })
      propertyPayload.owners = [
        ...propertyPayload.owners
      ]
    }
    set(propertyPayload, "channel", "SYSTEM");
    if(window.location.href.includes("redirectUrl=/wns/apply")) { 
      set(propertyPayload, "source", "WATER_CHARGES");
    } else {
      set(propertyPayload, "source", "MUNICIPAL_RECORDS");
    }
   // console.log("nooffloors---",propertyPayload.noOfFloors);

    if(propertyPayload.noOfFloors==undefined || propertyPayload.noOfFloors=='')
    set(propertyPayload, "noOfFloors", 1);
    //console.log("nooffloors after---",propertyPayload.noOfFloors);
    if(propertyPayload.noOfFlats==undefined || propertyPayload.noOfFlats=='')
    set(propertyPayload, "noOfFlats", 0);
    //console.log("noOfFlats after---",propertyPayload.noOfFlats);
    propertyPayload.landArea = parseInt(propertyPayload.landArea);
    propertyPayload.tenantId = propertyPayload.tenantId || propertyPayload.address.city;
    propertyPayload.address.city = propertyPayload.tenantId.split(".")[1];
    let additionalDetails = {
      isRainwaterHarvesting: false
    }
    propertyPayload.additionalDetails = additionalDetails;
    try {
      //if (propertyPayload.propertyType === 'BUILTUP.SHAREDPROPERTY' || propertyPayload.propertyType === 'BUILTUP.INDEPENDENTPROPERTY') {
        let unit = {};
        if(propertyPayload.units && propertyPayload.units.length!=0){
          propertyPayload.units[0].usageCategory = propertyPayload.subUsageCategory ? propertyPayload.subUsageCategory : propertyPayload.usageCategory;
          propertyPayload.units[0].occupancyType = "SELFOCCUPIED";
          propertyPayload.units[0].arv = propertyPayload.arvValue
          propertyPayload.units[0].constructionDetail = {
          // carpetArea :  propertyPayload.superBuiltUpArea,
          // builtUpArea : propertyPayload.superBuiltUpArea,
          superBuiltUpArea : propertyPayload.superBuiltUpArea,
          plinthArea : propertyPayload.superBuiltUpArea,

        };
        }
        else{
        unit.usageCategory = propertyPayload.subUsageCategory ? propertyPayload.subUsageCategory : propertyPayload.usageCategory;
        unit.occupancyType = "SELFOCCUPIED";
        unit.arv = propertyPayload.arvValue
        unit.constructionDetail = {
          // carpetArea :  propertyPayload.superBuiltUpArea,
          // builtUpArea : propertyPayload.superBuiltUpArea,
          superBuiltUpArea : propertyPayload.superBuiltUpArea,
          plinthArea : propertyPayload.superBuiltUpArea,

        };
        propertyPayload.units = [];
        propertyPayload.units.push(unit);
      }
     // }
      propertyPayload.creationReason = propertyPayload.creationReason || 'CREATE';
      let payload = null;
      console.log("--propertyPayload at create--",cloneDeep(propertyPayload));
     
      if(getQueryArg(window.location.href, "purpose")=='update'){

        let isFromWorkflowDetails = get ( state, "screenConfiguration.preparedFinalObject.isWorkflowDetails", null );
        //propertyPayload.creationReason = 'UPDATE';
        let mode = getQueryArg(window.location.href, "ptmode")
        if(mode=="modify" && propertyPayload.status==='ACTIVE'){
          propertyPayload.creationReason = 'UPDATE';
        }
        set(propertyPayload, "workflow", isFromWorkflowDetails);
            payload = await httpRequest(
              "post",
              "/property-services/property/_update",
              "_update",
              [],
              { Property: propertyPayload }
            );

      }
      else{
       
        payload = await httpRequest(
          "post",
          "/property-services/property/_create",
          "_update",
          [],
          { Property: propertyPayload }
  
        );
      }
     

      let isFromWNS = get( state, "screenConfiguration.preparedFinalObject.isFromWNS", false);
      if (payload && !isFromWNS) {
        store.dispatch(handleField(screenKey, "components.adhocDialog", "props.open", true));
        setTimeout(() => {
          const isMode = getQueryArg(window.location.href, "mode");
          if (isMode === "MODIFY") {
            store.dispatch(
              setRoute(`${getQueryRedirectUrl()}&propertyId=${payload.Properties[0].propertyId}`)
            )
          } else {
           
            store.dispatch(
              setRoute(`${getQueryRedirectUrl()}&propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}`)
            )
          }
        }, 3000);
      } else if (payload && isFromWNS) {
        let mode = getQueryArg(window.location.href, "ptmode");
        let action =  getQueryArg(window.location.href, "action");
        let redirectUrl = `${getQueryRedirectUrl()}&propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}&ptmode=${mode}`
        if(action==="edit"){
          store.dispatch(
            setRoute(`summary?redirectUrl=${redirectUrl}`)
          )
        }
        else{
        store.dispatch(
          setRoute(`summary?redirectUrl=/wns/apply?propertyId=${payload.Properties[0].propertyId}&tenantId=${propertyPayload.tenantId}&ptmode=${mode}`)
        )
        }
      }
      else {
        dispatch(
          toggleSnackbar(
            true, {
            labelKey: "PT_COMMON_FAILED_TO_REGISTER_PROPERTY",
            labelName: "Failed to register property"
          },
            "warning"
          )
        )
      }
    } catch (e) {
      console.log(e);
      dispatch(
        toggleSnackbar(
          true, {
          labelKey: "PT_COMMON_FAILED_TO_REGISTER_PROPERTY",
          labelName: "Failed to register property"
        },
          "warning"
        )
      )
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
        labelName: "Next",
        labelKey: "PT_COMMON_BUTTON_NEXT"
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForApply
    },
    visible: false
  }
});
