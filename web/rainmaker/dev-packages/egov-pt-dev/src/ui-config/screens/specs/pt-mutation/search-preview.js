import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale,
  getFileUrl,
  setBusinessServiceDataToLocalStorage
} from "egov-ui-framework/ui-utils/commons";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { getSearchResults } from "../../../../ui-utils/commons";
import { httpRequest } from "../../../../ui-utils";
import {generatePdfFromDiv } from "egov-ui-kit/utils/PTCommon";
import { searchBill, showHideMutationDetailsCard, getpayments, downloadCertificateForm, downloadReceitForm } from "../utils/index";
import generatePdf from "../utils/receiptPdf";
import { loadPdfGenerationData } from "../utils/receiptTransformer";
import { citizenFooter } from "./searchResource/citizenFooter";
import {
  transferorSummary,
  transferorInstitutionSummary
} from "./summaryResource/transferorSummary";
import {
  transfereeSummary,
  transfereeInstitutionSummary
} from "./summaryResource/transfereeSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { propertySummary } from "./summaryResource/propertySummary";
import { registrationSummary } from './summaryResource/registrationSummary';
import { mutationSummary } from "./applyResourceMutation/mutationSummary";
import { downloadPrintContainer } from "./functions";
const titlebar = getCommonContainer({
  header: getCommonHeader({
    labelName: "Application Details",
    labelKey: "PT_MUTATION_APPLICATION_DETAILS"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-pt",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "applicationNumber"),
      label: {
        labelValue: "Application No.",
        labelKey: "PT_MUTATION_APPLICATION_NO"
      }
    }
  }


  // downloadMenu: {
  //   uiFramework: "custom-atoms",
  //   componentPath: "MenuButton",
  //   props: {
  //     data: {
  //       label: "Download",
  //       leftIcon: "cloud_download",
  //       rightIcon: "arrow_drop_down",
  //       props: { variant: "outlined", style: { marginLeft: 10 } },
  //       menu: []
  //     }
  //   }
  // },
  // printMenu: {
  //   uiFramework: "custom-atoms",
  //   componentPath: "MenuButton",
  //   props: {
  //     data: {
  //       label: "Print",
  //       leftIcon: "print",
  //       rightIcon: "arrow_drop_down",
  //       props: { variant: "outlined", style: { marginLeft: 10 } },
  //       menu: []
  //     }
  //   }
  // }
});

const prepareUoms = (state, dispatch) => {
  let buildings = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
    []
  );
  buildings.forEach((building, index) => {
    let uoms = get(building, "uoms", []);
    let uomsMap = {};
    uoms.forEach(uom => {
      uomsMap[uom.code] = uom.value;
    });
    dispatch(
      prepareFinalObject(
        `FireNOCs[0].fireNOCDetails.buildings[${index}].uomsMap`,
        uomsMap
      )
    );

    // Display UOMS on search preview page
    uoms.forEach(item => {
      let labelElement = getLabelWithValue(
        {
          labelName: item.code,
          labelKey: `NOC_PROPERTY_DETAILS_${item.code}_LABEL`
        },
        {
          jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${item.code}`
        }
      );

      dispatch(
        handleField(
          "search-preview",
          "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children",
          item.code,
          labelElement
        )
      );
    });
  });
};

// const prepareDocumentsUploadRedux = (state, dispatch) => {
//   dispatch(prepareFinalObject("documentsUploadRedux", documentsUploadRedux));
// };

const setDownloadMenu = (state, dispatch, tenantId, applicationNumber) => {
  /** MenuButton data based on status */
  let status = get(
    state,
    "screenConfiguration.preparedFinalObject.Property.status"
  );
  let downloadMenu = [];
  let printMenu = [];
  let certificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {
      downloadCertificateForm(get(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId);
    },
    leftIcon: "book"
  };
  let certificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {
      downloadCertificateForm(get(state, "screenConfiguration.preparedFinalObject.Properties"), "ptmutationcertificate", tenantId, 'print');
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      downloadReceitForm(get(state, "screenConfiguration.preparedFinalObject.Payments"), "consolidatedreceipt", tenantId);
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      downloadReceitForm(get(state, "screenConfiguration.preparedFinalObject.Payments"), "consolidatedreceipt", tenantId, 'print');
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      generatePdfFromDiv("download", applicationNumber,"#material-ui-cardContent")
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      generatePdfFromDiv("print", applicationNumber,"#material-ui-cardContent")
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "ACTIVE":
      downloadMenu = [
        certificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        certificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "INWORKFLOW":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.downloadMenu",
      "props.data.menu",
      downloadMenu
    )
  );
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.headerDiv.children.helpSection.children.rightdiv.children.printMenu",
      "props.data.menu",
      printMenu
    )
  );
  /** END */
};

const prepareDocumentsView = async (state, dispatch) => {
  let documentsPreview = [];

  let allDocuments =
    state.screenConfiguration.preparedFinalObject.Property.documents;

  allDocuments && allDocuments.forEach(doc => {
    documentsPreview.push({
      title: getTransformedLocale(doc.documentType),
      fileStoreId: doc.fileStoreId,
      linkText: "View"
    });
  });
  let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
  let fileUrls =
    fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
  documentsPreview = documentsPreview.map((doc, index) => {
    doc["link"] =
      (fileUrls &&
        fileUrls[doc.fileStoreId] &&
        getFileUrl(fileUrls[doc.fileStoreId])) ||
      "";
    doc["name"] =
      (fileUrls[doc.fileStoreId] &&
        decodeURIComponent(
          getFileUrl(fileUrls[doc.fileStoreId])
            .split("?")[0]
            .split("/")
            .pop()
            .slice(13)
        )) ||
      `Document - ${index + 1}`;
    return doc;
  });
  dispatch(prepareFinalObject("documentsUploadRedux", documentsPreview));
};

const setSearchResponse = async (
  state,
  dispatch,
  applicationNumber,
  tenantId
) => {
  const response = await getSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "acknowledgementIds", value: applicationNumber }
  ]);
  // const response = sampleSingleSearch();
  const properties = get(response, "Properties", []);
  let property = (properties && properties.length > 0 && properties[0]) || {};

  if (!property.workflow) {
    let workflow = {
      id: null,
      tenantId: getQueryArg(window.location.href, "tenantId"),
      businessService: "PT.MUTATION",
      businessId: getQueryArg(window.location.href, "applicationNumber"),
      action: "",
      moduleName: "PT",
      state: null,
      comment: null,
      documents: null,
      assignes: null
    };
    property.workflow = workflow;

  }

  if (property && property.owners && property.owners.length > 0) {

    let ownersTemp = [];
    let owners = [];
    property.owners.map(owner => {
      owner.documentUid= owner.documents? owner.documents[0].documentUid: "NA";
      owner.documentType=owner.documents? owner.documents[0].documentType: "NA";
      if (owner.status == "ACTIVE") {
      
        ownersTemp.push(owner);
      } else {
        owners.push(owner);
      }
    });

    property.ownersInit = owners;
    property.ownersTemp = ownersTemp;
  }
  property.ownershipCategoryTemp = property.ownershipCategory;
  property.ownershipCategoryInit = 'NA';
  // Set Institution/Applicant info card visibility
  if (
    get(
      response,
      "Properties[0].ownershipCategory",
      ""
    ).startsWith("INSTITUTION")
  ) {
    property.institutionTemp = property.institution;

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.transfereeSummary",
        "visible",
        false
      )
    );
  } else {

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.transfereeInstitutionSummary",
        "visible",
        false
      )
    );
  }

  if (get(property, 'ownersInit[0].altContactNumber', 0)) {
    property.institution = {};
    property.institution.nameOfAuthorizedPerson = get(property, 'ownersInit[0].name', '');

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.transferorSummary",
        "visible",
        false
      )
    );

  } else {

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.transferorInstitutionSummary",
        "visible",
        false
      )
    );
  }


  dispatch(prepareFinalObject("Property", property));
  dispatch(prepareFinalObject("documentsUploadRedux", property.documents));
  prepareDocumentsView(state, dispatch);

  prepareUoms(state, dispatch);
  await loadPdfGenerationData(applicationNumber, tenantId);
  setDownloadMenu(state, dispatch, tenantId, applicationNumber);
};
export const setData = async (state, dispatch, applicationNumber, tenantId) => {
  const response = await getSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "acknowledgementIds", value: applicationNumber }
  ]);

  dispatch(prepareFinalObject("Properties", get(response, "Properties", [])));
  let queryObj = [
    {
      key: "tenantId",
      value: tenantId
    },
    {
      key: "consumerCodes",
      value: applicationNumber
    }
  ];

  const responsePayments = await getpayments(queryObj)
  dispatch(prepareFinalObject("Payments", get(responsePayments, "Payments", [])));


}

const getPropertyConfigurationMDMSData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: 'pb',
      moduleDetails: [
        {
          moduleName: "PropertyTax",
          masterDetails: [{name: "PropertyConfiguration"}]
        }
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

    let propertyConfiguation = get(payload, "MdmsRes.PropertyTax.PropertyConfiguration");
    dispatch(prepareFinalObject("PropertyConfiguration", propertyConfiguation));
    showHideMutationDetailsCard(action, state, dispatch);
  } catch (e) {
    console.log(e);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    
    dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
    searchBill(dispatch, applicationNumber, tenantId);
    let businessServicesData = JSON.parse(localStorage.getItem('businessServiceData'));
    let loadBusinessServiceData = true;
    if (businessServicesData && businessServicesData.length > 0) {
      businessServicesData.map(businessService => {
        if (businessService.businessService == "PT.MUTATION") {
          loadBusinessServiceData = false;
        }
      })
    }
    setSearchResponse(state, dispatch, applicationNumber, tenantId);
    const queryObject = [
      { key: "tenantId", value: tenantId },
      // { key: "businessServices", value: "PT.MUTATION" }
    ];
    loadBusinessServiceData && setBusinessServiceDataToLocalStorage(queryObject, dispatch);
    // Hide edit buttons
    setData(state, dispatch, applicationNumber, tenantId);
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.registrationSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.transferorSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.transferorInstitutionSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
  
    let categoryType = get(
      state.screenConfiguration.preparedFinalObject,
      "Property.ownersTemp[0].ownerType"
    ); 
    if(categoryType === "NONE"){
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerDocumentId.visible",
        false
      );
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.visible",
        false
      );
      
     
   }
    // set(
    //   action,
    //   "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
    //   false
    // );
    const printCont = downloadPrintContainer(
      action,
      state,
      dispatch,
      status,
      applicationNumber,
      tenantId
    );

    set(
      action,
      "screenConfig.components.div.children.headerDiv.children.helpSection.children",
      printCont
    );
    getPropertyConfigurationMDMSData(action, state, dispatch);
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
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
              ...titlebar
            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              }
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "Property",
            moduleName: "PT.MUTATION",
            updateUrl: "/property-services/property/_update"
          }
        },
        body: getCommonCard({
          pdfHeader: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-pt",
            componentPath: "pdfHeader"
          },
          propertySummary: propertySummary,
          transferorSummary: transferorSummary,
          transferorInstitutionSummary: transferorInstitutionSummary,
          transfereeSummary: transfereeSummary,
          transfereeInstitutionSummary: transfereeInstitutionSummary,
          mutationSummary: mutationSummary,
          registrationSummary: registrationSummary,
          documentsSummary: documentsSummary
        })
      }
    }
  }
};

export default screenConfig;
