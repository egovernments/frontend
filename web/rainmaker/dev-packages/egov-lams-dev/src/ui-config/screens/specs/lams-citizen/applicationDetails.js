import {
  getCommonCard,
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
import { value } from "jsonpath";


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


const applicationDetails = {
  uiFramework: "material-ui",
  name: "mihyLoginScreen",
  beforeInitScreen:(action, state, dispatch) => {
    //const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    getData(action, state, dispatch, tenantId);
    loadMdmsData(action, state, dispatch);
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    dispatch(prepareFinalObject("allTenants", [{code:"Agra", name:"Agra", active: true, id:"pb.agra"},{code: "Pune",name: "Pune", active: true, id:"pb.pune"}, {name: "Lucknow", code:"Lucknow", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsLocation", [{code:"withinCB", name:"Within CB ", active: true, id:"pb.agra"},{code: "outside CB",name: "Outside CB", active: true, id:"pb.pune"}]));
    dispatch(prepareFinalObject("lamsSurveyNumber", [{code:"131-212-A", name:"131-212-A", active: true, id:"pb.agra"},{code: "131-16",name: "131-16", active: true, id:"pb.pune"},{code: "131-145",name: "131-145", active: true, id:"pb.lucknow"}]));
    dispatch(prepareFinalObject("lamsTemp", [{applicationDocuments:[{"code":"OWNERPHOTO","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.png,.jpeg"},"description":"COMMON_OWNERPHOTO_DESCRIPTION","statement":"COMMON_OWNERPHOTO_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[0]"},{"code":"AADHAARCARD","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.pdf,.png,.jpeg"},"description":"COMMON_AADHAARCARD_DESCRIPTION","statement":"COMMON_AADHAARCARD_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[1]"},{"code":"ELECTBILL","maxFileSize":5000,"required":true,"formatProps":{"accept":"image/*,.pdf,.png,.jpeg"},"description":"COMMON_ELECTBILL_DESCRIPTION","statement":"COMMON_ELECTBILL_STATEMENT","jsonPath":"Licenses[0].tradeLicenseDetail.applicationDocuments[2]"}]}]));
    return action;
  },
  components: {
    ApplicationDetailsCard:getCommonCard(
      {
        header: getCommonTitle(
            {
              labelName: "Lease Details",
              labelKey: "LAMS_LEASE_DETAILS"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
          cantonmentBoard: {
            uiFramework: "custom-containers-local",
              moduleName: "egov-lams",
              componentPath: "AutosuggestContainer",
              jsonPath: "lamsStore.Lease[0].tenantId",
              sourceJsonPath: "allTenants",
               props:{
                className: "autocomplete-dropdown",
                suggestions: [],
                disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                label: {
                  labelName: "Cantonment Boards",
                  labelKey: "LAMS_CB_LABEL"
                },
                placeholder: {
                  labelName: "Cantonment Board",
                  labelKey: "CB_PLACEHOLDER"
                },
                required: true,
                jsonPath: "lamsStore.Lease[0].tenantId",
                sourceJsonPath: "allTenants",
                inputLabelProps: {
                  shrink: true
                },
                onClickHandler: cbChanged
              },
              gridDefination: {
                xs: 12,
                sm: 6
              },
              required: true
          },
          location: {
            uiFramework: "custom-containers-local",
              moduleName: "egov-lams",
              componentPath: "AutosuggestContainer",
              jsonPath: "lamsStore.Lease[0].location",
              sourceJsonPath: "allTenants",
               props:{
                className: "autocomplete-dropdown",
                suggestions: [],
                disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                label: {
                  labelName: "Location",
                  labelKey: "LAMS_LOCATION_LABEL"
                },
                placeholder: {
                  labelName: "Cantonment Board",
                  labelKey: "LAMS_LOCATION_PLACEHOLDER"
                },
                required: true,
                jsonPath: "lamsStore.Lease[0].location",
                sourceJsonPath: "lamsLocation",
                inputLabelProps: {
                  shrink: true
                },
                onClickHandler: locationChanged
              },
              gridDefination: {
                xs: 12,
                sm: 6
              },
              required: true
          },
          LeaseSurveyNo: {
            uiFramework: "custom-containers",
            componentPath: "AutosuggestContainer",
            jsonPath: "lamsStore.Lease[0].surveyNumber",
            required: true,
            props: {
              style: {
                width: "100%",
                cursor: "pointer"
              },
              hasZindex:true,
              label: {
                labelName: "Survey Number",
                labelKey: "LAMS_SURVEYNO_LABEL"
              },
              placeholder: {
                labelName: "Select Survey Number",
                labelKey: "LAMS_SURVEYNO_PLACEHOLDER"
              },
              jsonPath: "lamsStore.Lease[0].surveyNumber",
              sourceJsonPath: "lamsSurveyNumber",
              labelsFromLocalisation: true,
              suggestions: [],
              fullwidth: true,
              required: true,
              inputLabelProps: {
                shrink: true
              }                 
            },              
            gridDefination: {
              xs: 12,
              sm: 6
            }
          }, 
          lesseAsPerGLR2: getTextField({
            label: {
              labelName: "Lease as per GLR",
              labelKey: "LAMS_ASPERGLR_LABEL"
            },
            placeholder: {
              labelName: "Select Survey Number",
              labelKey: "LAMS_ASPERGLR_PLACEHOLDER"
            },
    
            required: true,
            visible: true,
            pattern: getPattern("Name"),
            errorMessage: "",
            jsonPath: "lamsStore.Lease[0].lesseAsPerGLR2"
          }),
    
          leaseDetailsContainer : getCommonContainer({
            checkBox:{
              required: true,
              uiFramework: "custom-atoms-local",
              moduleName: "egov-lams",
              componentPath: "Checkbox",
              props: {
                content: "For this property"
              },
              jsonPath: "lamsStore.Lease[0].forThisProperty",
            }
        },        
        ) 
      },
      {
        style: {
          overflow: "visible"
        }
      }
    )

  }
    
};


export default applicationDetails;