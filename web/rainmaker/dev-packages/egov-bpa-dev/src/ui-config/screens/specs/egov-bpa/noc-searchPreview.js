import {
    getCommonCard,
    getCommonContainer,
    // getCommonGrayCard,
    getCommonHeader,
    getLabelWithValue,  
    getCommonTitle, 
    getLabel,         
  } from "egov-ui-framework/ui-config/screens/specs/utils";
// import { applicationOverview } from "./nocSummary/applicationOverview";
import { checkValueForNA, ifUserRoleExists } from "../utils/index";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils/api";
import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField, } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { nocDetails } from "./nocSummary/nocDetails";
import { nocDetailsApply } from "./noc";
import { getAppSearchResults } from "../../../../ui-utils/commons";
import get from "lodash/get";

export const getRedirectionURL = () => {
    const redirectionURL = ifUserRoleExists("CITIZEN")
      ? "/bpastakeholder-citizen/home"
      : "/inbox";
    return redirectionURL;
  };
const titlebar = {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      leftContainerH:getCommonContainer({
        header: getCommonHeader({
          labelName: "NOC Application",
        //   labelKey: "BPA_TASK_DETAILS_HEADER"
        }),
      }),
    }
}

const titlebar2 = getCommonTitle(
    {
      labelName: "NOC Details",
    //   labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
    },
    {
      style: {
        // marginBottom: 18
      }
    }
);
const applicationOverview = getCommonContainer({
    header: getCommonTitle(
        {
          labelName: "Application Overview",
        //   labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
        },
        {
          style: {
            marginBottom: 18
          }
        }
    ),
    basicDetailsContainer: getCommonContainer({
        applicationNo: getLabelWithValue(
            {
                labelName: "Application No",
                // labelKey: "BPA_OC_SCRUTINY_NO_LABEL"
            },
            {
                jsonPath: "BPA.edcrNumber",
                callBack: checkValueForNA
            }
        ),
        module: getLabelWithValue(
            {
                labelName: "Module",
                // labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
            },
            {
                // localePrefix: {
                //     moduleName: "WF",
                //     masterName: "BPA"
                //   },
                jsonPath: "BPA.applicationType",
                callBack: checkValueForNA
            }
        ),
        // locality: getLabelWithValue(
        //     {
        //         labelName: "Locality",
        //         // labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
        //     },
        //     {
        //         jsonPath: "BPA.riskType",
        //         callBack: checkValueForNA
        //     }
        // ),
        status: getLabelWithValue(
            {
                labelName: "Status",
                // labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
            },
            {
                jsonPath: "BPA.serviceType",
                callBack: checkValueForNA
            }
        ),
        viewApplication: {
            componentPath: "Button",
            gridDefination: {
              xs: 12,
              sm: 3
            },
            props: {
              variant: "outlined",
              style: {
                color: "#FE7A51",
                border: "#FE7A51 solid 1px",
                borderRadius: "2px",
                // width: window.innerWidth > 480 ? "80%" : "100%",
                // height: "48px"
              }
            },
            children: {
              buttonLabel: getLabel({
                labelName: "VIEW APPLICATION",
                // labelKey: "BPA_SCRUTINY_CLEARFORM_BUTTON"
              })
            },
            onClickDefination: {
                action: "page_change",
                path: getRedirectionURL()
            },
          },
    }),
})

const setSearchResponse = async (action, state, dispatch) => {
  // let applicationNumber = PB-BP-2020-06-30-003182;
  // const response = await getAppSearchResults([
  //   {
  //     key: "tenantId",
  //     value: tenantId
  //   },
  //   { key: "applicationNo", value: applicationNumber }
  // ]);
  
}
const getRequiredMdmsDetails = async (state, dispatch, action) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: getTenantId(),
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "DocumentType"
              }
            ]
          },
          {
            moduleName: "NOC",
            masterDetails: [
              {
                name: "DocumentTypeMapping"
              },
            ]
          }
        ]
      }
    };
    let payload = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
    );
      console.log(payload, "payloadddd");
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  prepareDocsInEmployee(state, dispatch, action);  
}

export const prepareDocsInEmployee = (state, dispatch, action) => {
  let applicationDocuments = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.NOC.DocumentTypeMapping",
    []
  );
  let documentsDropDownValues = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType",
    []
  );
  console.log(applicationDocuments,documentsDropDownValues, "documentsDropDownValues" );
  let documents = [];  
  applicationDocuments && applicationDocuments.length > 0 && 
  applicationDocuments.forEach(doc =>{
    if(doc.applicationType === "NEW") {
      documents.push(doc.docTypes[0]);      
    }
  });

  let documentsList = [];  
  if (documents && documents.length > 0) {
    documents.map(doc => {
      let code = doc.documentType;     
      doc.dropDownValues = [];
      documentsDropDownValues.forEach(value => {
      let values = value.code.slice(0, code.length);
      if (code === values) {
        doc.hasDropdown = true;
        doc.dropDownValues.push(value);
      }
    });
    documentsList.push(doc);    
    })
  }  
  const nocDocuments = documentsList;
  let documentsContract = [];
  let tempDoc = {};
  if ( nocDocuments && nocDocuments.length > 0) {
    nocDocuments.forEach(doc => {
      let card = {};
      card["code"] = doc.documentType.split(".")[0];
      card["title"] = doc.documentType.split(".")[0];
      card["cards"] = [];
      tempDoc[doc.documentType.split(".")[0]] = card;
    });
    nocDocuments.forEach(doc => {
      let card = {};
      card["name"] = doc.documentType;
      card["code"] = doc.documentType;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropDownValues) {
        let dropDownValues = {};
        dropDownValues.label = "Select Documents";
        dropDownValues.required = doc.required;
        dropDownValues.menu = doc.dropDownValues.filter(item => {
          return item.active;
        });
        dropDownValues.menu = dropDownValues.menu.map(item => {
          return { code: item.code, label: item.code };
        });
        card["dropDownValues"] = dropDownValues;
      }
      tempDoc[doc.documentType.split(".")[0]].cards.push(card);
    });
  }

  console.log(tempDoc, "tempDoc");
  if(tempDoc) {
    Object.keys(tempDoc).forEach(key => {
      documentsContract.push(tempDoc[key]);
    });
  }
  console.log(documentsContract, "documentsContract");
  let finalCards = [];
  documentsContract && documentsContract[0].cards.map(card => {
    card.documentCode = card.code.split(".").join("_");
    card.readOnly = false;
    finalCards.push(card);
  })
  let fireDocuments = [finalCards[0]];
  let airportDocuments = [finalCards[1]];
  console.log(finalCards, "documentsContract");
// dispatch(prepareFinalObject("finalCardsforPreview", finalCards));
  
dispatch(prepareFinalObject("finalCardsforPreview1", fireDocuments));
dispatch(prepareFinalObject("finalCardsforPreview2", airportDocuments));
  
}

const screenConfig = {
    uiFramework: "material-ui",
    name: "noc-searchPreview",
    beforeInitScreen: (action, state, dispatch) => { 
      getRequiredMdmsDetails(state, dispatch, action);
      setSearchResponse( action, state, dispatch );
      // prepareDocsInEmployee(state, dispatch, action);
      dispatch(
        handleField(
          "noc-searchPreview",
          "components.div.children.body.children.cardContent.children.nocDetailsApply.children.cardContent.children.airNocDetailsCard.children.cardContent.children.airnocDetailsContainer.children.approvedRejectOn",
          "visible",
          false
        )
      );
      return action;
    },
    components: {
      div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "common-div-css bpa-searchpview"
        },
        children: {
          headerDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Container",
            children: {
              header: {
                gridDefination: {
                  xs: 12,
                  sm: 6,
                  md: 6
                },
                ...titlebar
              },
            }
          },
          applicationOverviewContainer: getCommonCard({
            applicationOverview:applicationOverview
          }),
          body: getCommonCard({
            titlebar2: titlebar2,
            // applicationOverview: applicationOverview,
            nocDetails: nocDetails,
          }),
        }
      }
    }
  };
  
  export default screenConfig;