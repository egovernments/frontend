import {
  getCommonCardWithHeader,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import {getMdmsData, loadMdmsData} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import {newApplicationDetailsCard} from "./newApplicationDetailsCard";
import { value } from "jsonpath";
import {documentList} from "../lams-common/documentList";


const getData = async (action, state, dispatch, tenantId) => {
  await getMdmsData(action, state, dispatch);
  dispatch(
    prepareFinalObject(
      "Test",
      tenantId+"test"
    )
  );
  dispatch(
    prepareFinalObject(
      "Lease",
      [{}]
    )
  );

  dispatch(
    prepareFinalObject(
      "Licenses[0].tradeLicenseDetail.address.tenantId",
      tenantId
    )
  );
  dispatch(
    prepareFinalObject("Licenses[0].tradeLicenseDetail.address.city", tenantId)
  );

  
};

const apply = {
  uiFramework: "material-ui",
  name: "mihyLoginScreen",
  beforeInitScreen:(action, state, dispatch) => {
    //const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    getData(action, state, dispatch, tenantId);
    loadMdmsData(action, state, dispatch);
    dispatch(prepareFinalObject("lamsStore.allSurveyDetails", [{"lesseAsPerGLR": "Mst.Ram Dulari d/o Sital Persad", "code": "1234512", "name": "1234512", "id":"d466202f-6426-43da-ac4a-06723665e123","surveyNo":"1234512","termNo":"1234514","area":"12344","termExpiryDate":659989800000,"annualRent":15234},{"lesseAsPerGLR": "Mst.Ram Dulari d/o Sital Persad","code": 12, "name": 12, "id":"d466202f-6426-43da-ac4a-06723665e123","surveyNo":"123451224","termNo":"12345214","area":"23414","termExpiryDate":659989800000,"annualRent":1234},{"lesseAsPerGLR": "Mst.Ram Dulari d/o Sital Persad","code": "AB-123", "name": "AB-123", "id":"d466202f-6426-43da-ac4a-06723665e123","surveyNo":"123451342","termNo":"123451124","area":"23434","termExpiryDate":659989800000,"annualRent":12524}]));


    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    dispatch(prepareFinalObject("allTenants", [{code:"Agra", name:"Agra", active: true, id:"pb.agra"},{code: "Pune",name: "Pune", active: true, id:"pb.pune"}, {name: "Lucknow", code:"Lucknow", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsLocation", [{code:"withinCB", name:"Within CB ", active: true, id:"pb.agra"},{code: "outside CB",name: "Outside CB", active: true, id:"pb.pune"}]));
    dispatch(prepareFinalObject("lamsSurveyNumber", [{code:"131-212-A", name:"131-212-A", active: true, id:"pb.agra"},{code: "131-16",name: "131-16", active: true, id:"pb.pune"},{code: "131-145",name: "131-145", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsTemp", [{applicationDocuments:documentList}]));
    return action;
  },
  components: {
    newApplicationDetailsCard,
    //newApplicationDocumentsCard,
    //newApplicationFooter
  }
};
export default apply;