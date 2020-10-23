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

import {getMdmsData, loadMdmsData,
  sortByEpoch,
  getEpochForDate,
  getTextToLocalMapping} from "../lams-utils/utils";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import {applicationDetailsCard} from "./applicationDetailsCard";
import {newApplicationFooter} from "./newApplicationFooter";
import { value } from "jsonpath";
import {viewDocuments} from "./viewDocuments";
import {download} from "egov-common/ui-utils/commons"
import React from "react";

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

const onRowClick = rowData => {
  const receiptQueryString = [
    { key: "receiptNumbers", value:  rowData[0]},
    { key: "tenantId", value: rowData[6] }
  ]
  download(receiptQueryString);
};

const sampleData = [{
	"LAMS_APPLICATION_NUMBER":1234,
	"LAMS_APPLICANT_NAME":"Srikanth V",
	"LAMS_MOBILE_NO": 9603823911,
	"LAMS_SURVEY_NO": 133-23,
	"LAMS_LEASE_NAME": "Asdf asdf abcd",
	"LAMS_APPLICATION_DATE": "21/03/2012",
	"TENANT_ID":"pb.agra"
}];

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
  afterInitForm:(action, state, dispatch) => {
    alert("Hey in the after init screen");
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
              singleApplication:{
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
              table: {
                uiFramework: "custom-molecules",
                componentPath: "Table",
                visible: true,
                props: {
                  data:sampleData,
                  columns: [
                    {
                      labelName: "Application No",
                      labelKey: "LAMS_APPLICATION_NUMBER",
                      options: {
                        filter: false,
                        customBodyRender: (value, tableMeta) => (
                            <a href="javascript:void(0)" onClick={() => onRowClick(tableMeta.rowData)}>{value}</a>
                        )
                      }
                    },
                    {
                      labelName: "Applicant Name",
                      labelKey: "LAMS_APPLICANT_NAME"
                    },
                    {
                      labelName: "Mobile No",
                      labelKey: "LAMS_MOBILE_NO"
                    },
                    {
                      labelName: "Survey No",
                      labelKey: "LAMS_SURVEY_NO"
                    },
                    {
                      labelName: "Name of Lease",
                      labelKey: "LAMS_LEASE_NAME"
                    },
                    {
                      labelName: "Application Date",
                      labelKey: "LAMS_APPLICATION_DATE"
                    },
                    {
                      labelName: "Tenant Id",
                      labelKey: "TENANT_ID",
                      options: {
                        display: false,
                        viewColumns  :false
                      }
                    }
                  ],
                  title: {
                    labelName: "Pending Applications",
                    labelKey: "LAMS_PENDING_APPLICATIONS"
                  },
                  rows:"",
                  options: {
                    filter: false,
                    download: false,
                    responsive: "stacked",
                    selectableRows: false,
                    hover: true,
                    rowsPerPageOptions: [10, 15, 20]
                  },
                  customSortColumn: {
                    column: "Date",
                    sortingFn: (data, i, sortDateOrder) => {
                      const epochDates = data.reduce((acc, curr) => {
                        acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
                        return acc;
                      }, []);
                      const order = sortDateOrder === "asc" ? true : false;
                      const finalData = sortByEpoch(epochDates, !order).map(item => {
                        item.pop();
                        return item;
                      });
                      return { data: finalData, currentOrder: !order ? "asc" : "desc" };
                    }
                  }
                }
              },


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