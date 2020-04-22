
import {
  getCommonContainer,
  getCommonHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./applyResource/footer";
import {
  propertyLocationDetails
} from "./applyResourceMutation/propertyLocationDetails";
import {
  propertyAssemblyDetails
} from "./applyResourceMutation/propertyAssemblyDetails";
import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import set from "lodash/set";
import get from "lodash/get";

import { propertyOwnershipDetails } from './applyResourceMutation/propertyOwnershipDetails'

export const header = getCommonContainer({
  header: getCommonHeader({
    labelKey: "PT_COMMON_REGISTER_NEW_PROPERTY"
  }),
});


export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    propertyAssemblyDetails,
    propertyLocationDetails,
    propertyOwnershipDetails
  }
};

const getMdmsData = async (action, state, dispatch) => {
  let tenantId = process.env.REACT_APP_NAME === "Employee" ? getTenantId() : JSON.parse(getUserInfo()).permanentCity;
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }]
        },
        {
          moduleName: "firenoc",
          masterDetails: [{ name: "BuildingType" }, { name: "FireStations" }]
        },
        {
          moduleName: "egov-location",
          masterDetails: [
            {
              name: "TenantBoundary"
            }
          ]
        },
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
        { moduleName: "PropertyTax", masterDetails: [{ name: "MutationDocuments" }] }
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    let OwnerShipCategory = get(
      payload,
      "MdmsRes.common-masters.OwnerShipCategory"
    )
    let institutions = []
    OwnerShipCategory = OwnerShipCategory.map(category => {
      if (category.code.includes("INDIVIDUAL")) {
        return category.code;
      }
      else {
        let code = category.code.split(".");
        institutions.push({ code: code[1], parent: code[0], active: true });
        return code[0];
      }
    });
    OwnerShipCategory = OwnerShipCategory.filter((v, i, a) => a.indexOf(v) === i)
    OwnerShipCategory = OwnerShipCategory.map(val => { return { code: val, active: true } });
    payload.MdmsRes['common-masters'].Institutions = institutions;
    payload.MdmsRes['common-masters'].OwnerShipCategory = OwnerShipCategory;

    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};



const getFirstListFromDotSeparated = list => {
  list = list.map(item => {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [...new Set(list)].map(item => {
    return { code: item };
  });
  return list;
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(
      prepareFinalObject(
        "Property.additionalDetails",
        {}
      )
    );

    set(
      action.screenConfig,
      "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentID.props.style.display",
      'none'
    );
    set(
      action.screenConfig,
      "components.div.children.formwizardFirstStep.children.transferorDetails.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style.display",
      'none'
    );

    //Set Module Name
    set(state, "screenConfiguration.moduleName", "egov-pt");

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(() => {
      // Set Dropdowns Data
      let buildingUsageTypeData = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
        []
      );
      buildingUsageTypeData = getFirstListFromDotSeparated(
        buildingUsageTypeData
      );
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.DropdownsData.BuildingUsageType",
          buildingUsageTypeData
        )
      );
      let ownershipCategory = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
        []
      );
      //  ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.DropdownsData.OwnershipCategory",
          ownershipCategory
        )
      );
    });

    // Set defaultValues of radiobuttons and selectors
    let noOfBuildings = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings",
      "SINGLE"
    );
    set(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings",
      noOfBuildings
    );
    let nocType = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType",
      "PROVISIONAL"
    );
    set(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType",
      nocType
    );
    if (
      get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType"
      ) === "PROVISIONAL"
    ) {
      set(
        action.screenConfig,
        "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber.props.style",
        { visibility: "hidden" }
      );
    }

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        formwizardFirstStep,
        footer
      }
    }
  }
};

export default screenConfig;
