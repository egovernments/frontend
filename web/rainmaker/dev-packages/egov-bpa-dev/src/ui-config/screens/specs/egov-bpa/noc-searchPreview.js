import {
    getCommonCard,
    getCommonContainer,
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonHeader,
    getLabelWithValue,
    getCommonTitle,
    getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
    getQueryArg,
    setBusinessServiceDataToLocalStorage
} from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../ui-utils/api";
import { getNocSearchResults } from "../../../../ui-utils/commons";
import { checkValueForNA, ifUserRoleExists } from "../utils/index";
import { requiredDocumentsData } from "../utils/noc-functions"

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
        leftContainerH: getCommonContainer({
            header: getCommonHeader({
                labelName: "NOC Application",
                labelKey: "BPA_TASK_DETAILS_HEADER"
            }),
        }),
    }
}

const titlebar2 = getCommonTitle(
    {
        labelName: "NOC Details",
        labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
    },
    {
        style: {
            marginBottom: 18
        }
    }
);
const applicationOverview = getCommonContainer({
    header: getCommonTitle(
        {
            labelName: "Application Overview",
            // labelKey: "BPA_NOC_APP_OVER_VIEW_HEADER"
        },
        {
            style: {
                marginBottom: 18
            }
        }
    ),
    appOverViewDetailsContainer: getCommonContainer({
        applicationNo: getLabelWithValue(
            {
                labelName: "Application No",
                // labelKey: "BPA_NOC_APP_NO_LABEL"
            },
            {
                jsonPath: "Noc.applicationNo",
                callBack: checkValueForNA
            }
        ),
        module: getLabelWithValue(
            {
                labelName: "Module",
                // labelKey: "BPA_NOC_MODULE_LABEL"
            },
            {
                jsonPath: "Noc.source",
                callBack: checkValueForNA
            }
        ),
        status: getLabelWithValue(
            {
                labelName: "Status",
                labelKey: "BPA_NOC_STATUS_LABEL"
            },
            {
                jsonPath: "Noc.applicationStatus",
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
                    borderRadius: "2px"
                }
            },
            children: {
                buttonLabel: getLabel({
                    labelName: "VIEW APPLICATION",
                    labelKey: "BPA_OC_VIEW_APP_BUTTON"
                })
            },
            onClickDefination: {
                action: "page_change",
                path: getRedirectionURL()
            },
        },
    }),
});

const nocDetails = getCommonGrayCard({
    header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
            style: { marginBottom: "10px" }
        },
        children: {
            header: {
                gridDefination: {
                    xs: 12
                },
                ...getCommonSubHeader({
                    labelName: "Fire NOC",
                    // labelKey: "BPA_NOC_FIRE_TITLE"
                })
            },
        }
    },
    documentDetailsCard: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "PreviewContainer",
        props: {
            sourceJsonPath: "documentDetailsPreview",
            className: "noc-review-documents",
            buttonLabel: {
                labelName: "UPLOAD FILE",
                labelKey: "NOC_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
            },
            inputProps: {
                accept: "image/*, .pdf, .png, .jpeg",
                multiple: false
            },
            maxFileSize: 6000
        }
    }
});

const setSearchResponse = async (
    state,
    dispatch,
    applicationNumber,
    tenantId, action
) => {
    await getRequiredMdmsDetails(state, dispatch);

    const response = await getNocSearchResults([
        {
            key: "tenantId",
            value: tenantId
        },
        { key: "applicationNo", value: applicationNumber }
    ]);
    dispatch(prepareFinalObject("Noc",get(response, "Noc[0]", {})));
    requiredDocumentsData(state, dispatch, action);
};

const getRequiredMdmsDetails = async (state, dispatch, action) => {
    let mdmsBody = {
        MdmsCriteria: {
            tenantId: getTenantId().split('.')[0],
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
    payload = {
        "ResponseInfo": null,
        "MdmsRes": {
          "NOC": {
            "DocumentTypeMapping": [
              {
                "applicationType": "PROVISIONAL",
                "nocType": "FIRE_NOC",
                "docTypes": [
                  {
                    "documentType": "NOC.FIRE",
                    "required": true
                  }
                ]
              },
              {
                "applicationType": "NEW",
                "nocType": "FIRE_NOC",
                "docTypes": [
                  {
                    "documentType": "NOC.FIRE",
                    "required": true
                  },
                  {
                    "documentType": "NOC.AIRPORT",
                    "required": true
                  }
                ]
              },
              {
                "applicationType": "RENEW",
                "nocType": "FIRE_NOC",
                "docTypes": [
                  {
                    "documentType": "NOC.FIRE",
                    "required": false
                  }
                ]
              },
              {
                "applicationType": "PROVISIONAL",
                "nocType": "AIRPORT_AUTHORITY",
                "docTypes": [
                  {
                    "documentType": "NOC.AIRPORT",
                    "required": true
                  }
                ]
              },
              {
                "applicationType": "NEW",
                "nocType": "AIRPORT_AUTHORITY",
                "docTypes": [
                  {
                    "documentType": "NOC.AIRPORT",
                    "required": true
                  }
                ]
              },
              {
                "applicationType": "RENEW",
                "nocType": "AIRPORT_AUTHORITY",
                "docTypes": [
                  {
                    "documentType": "NOC.AIRPORT",
                    "required": false
                  }
                ]
              }
            ]
          },
          "common-masters": {
            "DocumentType": [
              {
                "code": "APPL.IDENTITYPROOF.AADHAAR",
                "active": true
              },
              {
                "code": "APPL.IDENTITYPROOF.PASSPORT",
                "active": true
              },
              {
                "code": "APPL.IDENTITYPROOF.DRIVINGLICENSE",
                "active": true
              },
              {
                "code": "APPL.ADDRESSPROOF.ELECTRICITYBILL",
                "active": true
              },
              {
                "code": "APPL.ADDRESSPROOF.PASSPORT",
                "active": true
              },
              {
                "code": "APPL.LTR.LTR",
                "active": true
              },
              {
                "code": "APPL.TDP.TDP",
                "active": true
              },
              {
                "code": "APPL.LAC.LAC",
                "active": true
              },
              {
                "code": "APPL.SSC.SSC",
                "active": true
              },
              {
                "code": "APPL.LSVS.LSVS",
                "active": true
              },
              {
                "code": "BPD.SP.SP",
                "active": true
              },
              {
                "code": "BPD.RP.RP",
                "active": true
              },
              {
                "code": "BPD.FP.FP",
                "active": true
              },
              {
                "code": "BPD.SCP.SCP",
                "active": true
              },
              {
                "code": "BPD.EP.EP",
                "active": true
              },
              {
                "code": "BPD.SECP.SECP",
                "active": true
              },
              {
                "code": "BPD.PP.PP",
                "active": true
              },
              {
                "code": "NOC.FIRE.CERTIFICATE",
                "active": true
              },
              {
                "code": "NOC.AGRICULTURE.LANDUSE",
                "active": true
              },
              {
                "code": "NOC.AGRICULTURE_WATERBODY.FTL",
                "active": true
              },
              {
                "code": "FI.FIR.FIR",
                "active": true
              },
              {
                "code": "FI.SINS.SINS",
                "active": true
              },
              {
                "code": "FI.SISS.SISS",
                "active": true
              },
              {
                "code": "FI.SIES.SIES",
                "active": true
              },
              {
                "code": "FI.SIWS.SIWS",
                "active": true
              },
              {
                "code": "NOC.AIRPORT.CERTIFICATE",
                "active": true
              },
              {
                "code": "APPL.BUILDING_DIAGRAM.SECTION_PLAN",
                "active": true
              },
              {
                "code": "APPL.BUILDING_DIAGRAM.ELEVATION_PLAN",
                "active": true
              },
              {
                "code": "APPL.BUILDING_DIAGRAM.FLOOR_PLAN",
                "active": true
              },
              {
                "code": "APPL.LOCALBODY.MUNCIPAL_APPROVAL",
                "active": true
              },
              {
                "code": "APPL.LOCALBODY.PANCHAYAT_APPROVAL",
                "active": true
              },
              {
                "code": "APPL.LOCALBODY.DTCP_APPROVAL",
                "active": true
              },
              {
                "code": "OWNERIDPROOF",
                "allowedFormat": [
                  "image/*",
                  ".pdf",
                  ".png",
                  ".jpeg"
                ],
                "maxFileSize": 6000
              },
              {
                "code": "OWNERSHIPPROOF",
                "allowedFormat": [
                  "image/*",
                  ".pdf",
                  ".png",
                  ".jpeg"
                ],
                "maxFileSize": 6000
              },
              {
                "code": "OWNERPHOTO",
                "allowedFormat": [
                  "image/*",
                  ".png",
                  ".jpeg"
                ],
                "maxFileSize": 3000
              },
              {
                "code": "OLDLICENCENO",
                "allowedFormat": [
                  "image/*",
                  ".pdf",
                  ".png",
                  ".jpeg"
                ],
                "maxFileSize": 6000
              }
            ]
          }
        }
      };
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
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
    let nocType = get(
        state,
        "screenConfiguration.preparedFinalObject.Noc.nocType", ""
    );

    let documents = [];
    applicationDocuments && applicationDocuments.length > 0 &&
        applicationDocuments.forEach(doc => {
            if (doc.applicationType === "NEW" && doc.nocType === nocType) {
                documents.push(doc.docTypes);
            }
        });

        let documentsList = [];
        if (documents[0] && documents[0].length > 0) {
          documents[0].forEach(doc => {
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
          });
        }
          const bpaDocuments = documentsList;
          let documentsContract = [];
          let tempDoc = {};
        
          if ( bpaDocuments && bpaDocuments.length > 0) {
          bpaDocuments.forEach(doc => {
            let card = {};
            card["code"] = doc.documentType.split(".")[0];
            card["title"] = doc.documentType.split(".")[0];
            card["cards"] = [];
            tempDoc[doc.documentType.split(".")[0]] = card;
          });
          bpaDocuments.forEach(doc => {
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
                return { code: item.documentType, label: item.documentType };
              });
              card["dropDownValues"] = dropDownValues;
            }
            tempDoc[doc.documentType.split(".")[0]].cards.push(card);
          });
        }
        
        if(tempDoc) {
          Object.keys(tempDoc).forEach(key => {
            documentsContract.push(tempDoc[key]);
          });
        }

    dispatch(prepareFinalObject("documentDetailsPreview", documentsContract));

}
const screenConfig = {
    uiFramework: "material-ui",
    name: "search-preview",
    beforeInitScreen: (action, state, dispatch) => {
        const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
        const tenantId = getQueryArg(window.location.href, "tenantId");
        setSearchResponse(state, dispatch, applicationNumber, tenantId, action);
        const queryObject = [
            { key: "tenantId", value: tenantId },
            { key: "businessServices", value: "FIRENOC_SRV" }
        ];
        setBusinessServiceDataToLocalStorage(queryObject, dispatch);
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
                        header2: {
                            uiFramework: "custom-atoms",
                            componentPath: "Container",
                            props: {
                                color: "primary",
                                style: { justifyContent: "flex-end" }
                            },
                            gridDefination: {
                                xs: 12,
                                sm: 6,
                                md: 6,
                                align: "right"
                            },
                            children: {
                                // titlebar2
                            }
                        }
                    }
                },

                taskStatus: {
                    uiFramework: "custom-containers-local",
                    componentPath: "WorkFlowContainer",
                    moduleName: "egov-workflow",
                    visible: true,
                    props: {
                        dataPath: "Noc",
                        moduleName: "Noc",
                        updateUrl: "/noc-services/v1/noc/_update"
                    }
                },
                applicationOverviewContainer: getCommonCard({
                    applicationOverview: applicationOverview
                }),
                body: getCommonCard({
                    nocDetails: nocDetails
                }),
            }
        }
    }
};

export default screenConfig; 