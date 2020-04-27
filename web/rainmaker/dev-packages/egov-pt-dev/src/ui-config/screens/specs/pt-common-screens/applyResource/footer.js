import {
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import { getCommonApplyFooter } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import store from "ui-redux/store";
import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils";

const callBackForApply = async (state, dispatch) => {

  let tenantId = getQueryArg(window.location.href, "tenantId");
  let consumerCode = getQueryArg(window.location.href, "consumerCode");
  let propertyPayload = get(
    state, "screenConfiguration.preparedFinalObject.Property");

  if (process.env.REACT_APP_NAME === "Citizen" && propertyPayload && !propertyPayload.declaration) {
    const errorMessage = {
      labelName:
        "Please fill all mandatory fields for Applicant Details, then proceed!",
      labelKey: "ERR_CITIZEN_DECLARATION_TOAST"
    };
    dispatch(toggleSnackbar(true, errorMessage, "warning"));
    return;
  }


  let documentsUploadRedux = get(
    state, "screenConfiguration.preparedFinalObject.documentsUploadRedux");
  propertyPayload.workflow = {
    "businessService": "PT.MUTATION",
    tenantId,
    "action": "OPEN",
    "moduleName": "PT"
  },
    propertyPayload.owners.map(owner => {
      owner.status = "INACTIVE";

    })

  propertyPayload.ownersTemp.map(owner => {
    if (owner.documentUid && owner.documentType) {
      owner.documents = [{}]
      owner.documents[0].fileStoreId = owner.documentUid;
      owner.documents[0].documentType = owner.documentType;
      owner.documents[0].documentUid = owner.documentUid;
    }
  })
  propertyPayload.additionalDetails.documentDate = convertDateToEpoch(
    propertyPayload.additionalDetails.documentDate);

  if (propertyPayload.ownershipCategory.includes("INDIVIDUAL") && propertyPayload.ownershipCategoryTemp.includes("INDIVIDUAL")) {
    propertyPayload.ownersTemp.map(owner => {
      owner.status = "ACTIVE";
      owner.ownerType = 'NONE';
    })
    propertyPayload.owners = [...propertyPayload.owners, ...propertyPayload.ownersTemp]
    delete propertyPayload.ownersTemp;
  } else if (propertyPayload.ownershipCategory.includes("INSTITUTIONAL") && propertyPayload.ownershipCategoryTemp.includes("INDIVIDUAL")) {
    propertyPayload.ownersTemp.map(owner => {
      owner.status = "ACTIVE";
      owner.ownerType = 'NONE';
    })
    propertyPayload.institution = null;
    propertyPayload.owners = [...propertyPayload.owners, ...propertyPayload.ownersTemp]
    delete propertyPayload.ownersTemp;
  } else if (propertyPayload.ownershipCategory.includes("INDIVIDUAL") && propertyPayload.ownershipCategoryTemp.includes("INSTITUTIONAL")) {
    propertyPayload.owners[0].altContactNumber = propertyPayload.institutionTemp.landlineNumber;
    propertyPayload.institution = {};
    propertyPayload.institution.nameOfAuthorizedPerson = propertyPayload.institutionTemp.name;
    propertyPayload.institution.name = propertyPayload.institutionTemp.institutionName;
    propertyPayload.institution.designation = propertyPayload.institutionTemp.designation;
    propertyPayload.institution.tenantId = tenantId;
    propertyPayload.institution.type = propertyPayload.institutionTemp.institutionType;

    propertyPayload.institutionTemp.altContactNumber = propertyPayload.institutionTemp.landlineNumber;
    propertyPayload.institutionTemp.ownerType = "NONE";
    propertyPayload.institutionTemp.status = "ACTIVE";
    // propertyPayload.institutionTemp.type = propertyPayload.ownershipCategoryTemp;
    propertyPayload.owners = [...propertyPayload.owners, propertyPayload.institutionTemp]
    delete propertyPayload.institutionTemp;
  } else if (propertyPayload.ownershipCategory.includes("INSTITUTIONAL") && propertyPayload.ownershipCategoryTemp.includes("INSTITUTIONAL")) {
    propertyPayload.institution = {};
    propertyPayload.institution.nameOfAuthorizedPerson = propertyPayload.institutionTemp.name;
    propertyPayload.institution.name = propertyPayload.institutionTemp.institutionName;
    propertyPayload.institution.designation = propertyPayload.institutionTemp.designation;
    propertyPayload.institution.tenantId = tenantId;
    propertyPayload.institution.type = propertyPayload.institutionTemp.institutionType;

    propertyPayload.institutionTemp.altContactNumber = propertyPayload.institutionTemp.landlineNumber;
    propertyPayload.institutionTemp.ownerType = "NONE";
    propertyPayload.institutionTemp.status = "ACTIVE";
    // propertyPayload.institutionTemp.type = propertyPayload.ownershipCategoryTemp;
    propertyPayload.owners = [...propertyPayload.owners, propertyPayload.institutionTemp]
    delete propertyPayload.institutionTemp;
  }
  propertyPayload.ownershipCategory = propertyPayload.ownershipCategoryTemp;
  delete propertyPayload.ownershipCategoryTemp;
  let newDocuments = Object.values(documentsUploadRedux).map(document => {
    let documentValue = document.dropdown.value.includes('TRANSFERREASONDOCUMENT') ? document.dropdown.value.split('.')[2] : document.dropdown.value;
    return {
      documentType: documentValue,
      fileStoreId: document.documents[0].fileStoreId,
      documentUid: document.documents[0].fileStoreId,
      auditDetails: null,
      status: "ACTIVE"
    }
  })
  let oldDocuments = [];
  oldDocuments = propertyPayload.documents && Array.isArray(propertyPayload.documents) && propertyPayload.documents.filter(document => {
    return (document.documentType.includes('USAGEPROOF') || document.documentType.includes('OCCUPANCYPROOF') || document.documentType.includes('CONSTRUCTIONPROOF'))
  })
  oldDocuments = oldDocuments || [];
  propertyPayload.documents = [...newDocuments, ...oldDocuments];

  try {
    let queryObject = [
      {
        key: "tenantId",
        value: tenantId
      },
      {
        key: "propertyIds",
        value: consumerCode
      }
    ];
    propertyPayload.creationReason = 'MUTATION';
    let payload = null;
    payload = await httpRequest(
      "post",
      "/property-services/property/_update",
      "_update",
      queryObject,
      { Property: propertyPayload }

    );
    // dispatch(prepareFinalObject("Properties", payload.Properties));
    // dispatch(prepareFinalObject("PropertiesTemp",cloneDeep(payload.Properties)));
    if (payload) {
      store.dispatch(
        setRoute(
          `acknowledgement?purpose=apply&status=success&applicationNumber=${payload.Properties[0].acknowldgementNumber}&moduleName=PT.MUTATION&tenantId=${tenantId}
          `
        )
      );
    }
    else {
      store.dispatch(
        setRoute(
          `acknowledgement?purpose=apply&status=failure&applicationNumber=${consumerCode}&tenantId=${tenantId}
          `
        )
      );
    }
  } catch (e) {
    console.log(e);
    store.dispatch(
      setRoute(
        `acknowledgement?purpose=apply&status=failure&applicationNumber=${consumerCode}&tenantId=${tenantId}
        `
      )
    );
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
