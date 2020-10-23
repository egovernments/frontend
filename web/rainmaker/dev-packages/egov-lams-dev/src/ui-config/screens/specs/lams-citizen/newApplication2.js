import {
  getCommonCardWithHeader,
  getLabel,
  getCommonContainer, 
  getCommonHeader, 
  getCommonCard, 
  getCommonTitle ,
  getLabelWithValue ,
  getTextField,
  getPattern,
  getDivider,
  getCommonGrayCard
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object

import {getMdmsData, loadMdmsData} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import {applicationDetailsCard} from "./applicationDetailsCard";
import {newApplicationFooter} from "./newApplicationFooter";
import { value } from "jsonpath";
import {viewDocuments} from "./viewDocuments";


const getData = async (action, state, dispatch, tenantId) => {
  alert("Trying to get mdms data..");
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

const getClasses = () =>{
  return PropTypes.object.isRequired;
}
const handleFileUpload = () =>{
  alert("handlingFileUpload");
}
const onButtonClick = () =>{
  alert("Button clicked");
}
const tradeCategoryChange = () =>{
  alert("Trade Category Change");
}
const tradeTypeChange = () =>{
  alert("Trade Type changed");
}
const tradeSubTypeChange = () =>{
  alert("In trade sub type change");
}
const cbChanged = () => {
  //alert("Cant Board Changed");
}
const locationChanged = () =>{
  //alert(locationChanged);
}

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
    dispatch(prepareFinalObject("lamsApplicationDetails", [{applicationNumber:"123455",tenant:"Agra",name:"Srikanth V", location:"Agra Cant Board", surveyNumber: "157-21", area:"1234", applicationDate:"21/11/2012", status:"Pending"}]));
    dispatch(prepareFinalObject("lamsDocs",
      [{
        title:"TL_ELECTBILL",
        link:"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=84765824-c875-48b2-86f2-bf6c7f23fdf4&tenantId=pb",
        linkText:"View",
        name:"Document - 3"
      },
      {
        title:"TL_OWNERPHOTO",
        link:"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=f9c0c854-d398-4ed3-9b0c-f3aebf6b3ed8&tenantId=pb",
        linkText:"View",
        name:"Document - 2"
      }]
    ));

    const applicationNumber = "dummyApplicationNumber";
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
              }
            }
          }
        },
        applicationNumber:{
          uiFramework: "custom-atoms-local",
          moduleName: "egov-lams",
          componentPath: "ApplicationNoContainer",
          props: {
            number: "lamsApplicationDetails[0].applicationNumber"
          }
        },

        header: getCommonContainer({
          header: getCommonHeader({
            labelName: `LAMS_RENEWAL_APPLICATION NUMBER`,
            labelKey: "LAMS_RENEWAL_APPLICATION_NUMBER",
            dynamicArray: ["1213"]
          }),
          applicationNumber: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-lams",
            componentPath: "ApplicationNoContainer",
            props: {
              number: "lamsApplicationDetails[0].applicationNumber"
            }
          }
        }),
        details: getCommonCard(
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
              cantBoardName: getLabelWithValue(
                {
                  labelName: "Accesory Type",
                  labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
                },
                {
                  jsonPath:
                    "lamsApplicationDetails[0].name",
                  localePrefix: {
                    moduleName: "TRADELICENSE",
                    masterName: "ACCESSORIESCATEGORY"
                  },
                }
              ),
              applicantName: getLabelWithValue(
                {
                  labelName: "Accesory Type",
                  labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
                },
                {
                  jsonPath:
                    "lamsApplicationDetails[0].name",
                  callBack: value => {
                      return value ? value : "NA";
                    },
                  localePrefix: {
                    moduleName: "TRADELICENSE",
                    masterName: "ACCESSORIESCATEGORY"
                  },
                }
              ),
              divider1: getDivider(),
              locationDetails: getCommonGrayCard({
                location: getLabelWithValue(
                  {
                    labelName: "Accesory Type",
                    labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
                  },
                  {
                    jsonPath:
                      "lamsApplicationDetails[0].location",
                    localePrefix: {
                      moduleName: "TRADELICENSE",
                      masterName: "ACCESSORIESCATEGORY"
                    },
                  }
                )}),
              surveyNumber: getLabelWithValue(
                {
                  labelName: "Accesory Type",
                  labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
                },
                {
                  jsonPath:
                    "lamsApplicationDetails[0].surveyNumber",
                  localePrefix: {
                    moduleName: "TRADELICENSE",
                    masterName: "ACCESSORIESCATEGORY"
                  },
                }
              ),
              nameOfCb:{
                uiFramework:"custom-molecules",
                componentPath:"SingleApplication",
                visible:true,
                "props":{
                  applicationName:{
                      "label":"TL_COMMON_TABLE_COL_TRD_NAME",
                      jsonPath:"tradeName"
                  },
                  applicationNumber:{
                      "label":"TL_COMMON_TABLE_COL_APP_NO",
                      jsonPath:"applicationNumber"
                  }
                }
              },
              divider2: getDivider(),
              viewDocuments: viewDocuments()
          },
          {
            style: {
              overflow: "visible"
            }
          }
      ),
      },
      
      
    },
  }
};
export default applicationDetails;