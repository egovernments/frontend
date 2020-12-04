import {
  getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import {
    prepareFinalObject
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
  import { validateFields } from "../utils";
  import {checkIfCitizenEditScreen} from "../lams-utils/utils";
  import { toggleSpinner , toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { httpRequest } from "egov-ui-framework/ui-utils/api";
  import get from "lodash/get";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import jp from "jsonpath";

const checkIfFormIsValid = async (state, dispatch) => {

  let isFormValid = true;

  const isLeaseDetailsValid = validateFields(
    "components.newApplicationDetailsCard.children.cardContent.children",
    //"components.div.children.newCollectionConsumerDetailsCard.children.cardContent.children.ucConsumerContainer.children",
    state,
    dispatch
  );  

  isFormValid = isLeaseDetailsValid;

  if (isFormValid) {
    try {
      dispatch(toggleSpinner());

      let uploadedDocsInRedux = get(
        state.screenConfiguration.preparedFinalObject,
        "lamsStore.uploadedDocsInRedux"
      ); 

      let applicationDocuments = get(
        state.screenConfiguration.preparedFinalObject,
        "lamsStore.Lease[0].leaseDetails.applicationDocuments"
      ); 

      let finalDocsArray = jp.query(uploadedDocsInRedux, "$[*][0]");
      finalDocsArray.forEach((element, index) => {element.active = true});
      //var finalDocsWithIds = finalDocsArray.filter(function(element) {if(element.id) return element;});
      var finalDocsWithoutIds = finalDocsArray.filter(function(element) {if(!element.id) return element;});
      dispatch(prepareFinalObject("lamsStore.Lease[0].wfDocuments", finalDocsWithoutIds ));
      
      let removedDocsArray = get(
        state.screenConfiguration.preparedFinalObject,
        "lamsStore.removedDocs"
      ); 
      removedDocsArray = removedDocsArray?removedDocsArray : [];
      let mergedArray = [...finalDocsArray,...removedDocsArray];
      console.log("Check this ", finalDocsArray, removedDocsArray, finalDocsWithoutIds, mergedArray);
      //alert("Check once "+JSON.stringify(mergedArray));
      dispatch(prepareFinalObject("lamsStore.Lease[0].leaseDetails.applicationDocuments", mergedArray));

      const lease = get(
        state.screenConfiguration.preparedFinalObject,
        "lamsStore.Lease[0]"
      );
      
      let payload = {
        leases: [lease],
      };

      dispatch(toggleSpinner());
      //ToBeRemoved

      if(checkIfCitizenEditScreen()) //If its citizen-edit screen for citizen-review call update.
      {
        payload = await httpRequest(
          "post",
          "lams-services/v1/_update",
          "_update",
          [],
          {
            leases: [lease],
          }
        );
      }
      else  //else call create.
      {
        payload = await httpRequest(
          "post",
          "lams-services/v1/_create",
          "_create",
          [],
          {
            leases: [lease],
          }
        );
      }
      dispatch(toggleSpinner());
      console.log("Response is ", payload);
      //toBeRemoved
      //payload = {"ResponseInfo":{"apiId":"Rainmaker","ver":".01","ts":null,"resMsgId":"uief87324","msgId":"20170310130900|en_IN","status":"successful"},"leases":[{"comment":null,"id":"fb737547-e132-49b3-98e5-95f24d8fad01","tenantId":"pb.agra","businessService":"LAMS","applicationType":"RENEWAl","workflowCode":"LAMS_LR","applicationNumber":"TL-APP-AGRA-2020-10-19-004161","applicationDate":1603081340442,"action":"FORWARD","assignee":null,"wfDocuments":null,"status":"FIELDINSPECTION","leaseDetails":{"id":"d466202f-6426-43da-ac4a-06723665e123","surveyNo":"1234512","termNo":"1234514","area":"2344","termExpiryDate":659989800000,"annualRent":125234,"lesseAsPerGLR":"Mst.Ram Dulari d/o Sital Persad","applicationDocuments":[{"id":"9c52f9fb-0870-495f-9370-0fc265513609","active":true,"tenantId":"pb.agra","documentType":"ELECTBILL","fileStoreId":"4d27f465-636e-4719-8abe-68b364cf70db","documentUid":null,"auditDetails":null},{"id":"cddfa9ce-2ec5-4ff7-95b1-f69381d9de79","active":true,"tenantId":"pb.agra","documentType":"AADHAARCARD","fileStoreId":"b41ccf5c-2687-41d1-9cb1-cfcf9eab36fb","documentUid":null,"auditDetails":null},{"id":"e76d3fd2-b1d1-4e37-b635-93d878935b2f","active":true,"tenantId":"pb.agra","documentType":"OWNERPHOTO","fileStoreId":"a5e5aa69-1115-4fac-8310-e251514d639b","documentUid":null,"auditDetails":null}],"auditDetails":{"createdBy":"9d39d685-edbe-45a7-8dc5-1166a4236b98","lastModifiedBy":"9d39d685-edbe-45a7-8dc5-1166a4236b98","createdTime":1603081340442,"lastModifiedTime":1603081340442}},"auditDetails":{"createdBy":"9d39d685-edbe-45a7-8dc5-1166a4236b98","lastModifiedBy":"9d39d685-edbe-45a7-8dc5-1166a4236b98","createdTime":1603081340442,"lastModifiedTime":1603085076212},"fileStoreId":null}]};
      if (payload.leases && payload.leases.length>0 && payload.leases[0].applicationNumber) {
        const applicationNumber = payload.leases[0].applicationNumber;
        const status = "success";
        const purpose = "apply"
        dispatch(
          setRoute(
            `/lams-citizen/acknowledgement?applicationNumber=${applicationNumber}&status=${status}&purpose=${purpose}`
          )
        );
        //window.location.href = `acknowledgement?purpose=resubmit&status=success&applicationNumber=${applicationNumber}&tenantId=${tenant}&secondNumber=${licenseNumber}`;
      }
     
    } 
    catch (error) {
      console.log(error)
      dispatch(toggleSpinner());
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
  } else {
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
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      },
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