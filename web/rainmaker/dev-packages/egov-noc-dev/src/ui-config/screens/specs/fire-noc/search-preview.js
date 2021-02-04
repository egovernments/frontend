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
  setBusinessServiceDataToLocalStorage,
  getFileUrl
} from "egov-ui-framework/ui-utils/commons";
import { createEstimateData } from "../utils/index";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { getSearchResults,download } from "../../../../ui-utils/commons";
import { searchBill, generateBill ,createBill} from "../utils/index";
import generatePdf from "../utils/receiptPdf";
import { loadPdfGenerationData } from "../utils/receiptTransformer";
import { citizenFooter } from "./searchResource/citizenFooter";
import {
  applicantSummary,
  institutionSummary
} from "./summaryResource/applicantSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { nocSummary } from "./summaryResource/nocSummary";
import { propertySummary } from "./summaryResource/propertySummary";

const titlebar = getCommonContainer({
  header: getCommonHeader({
    labelName: "Task Details",
    labelKey: "NOC_TASK_DETAILS_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: getQueryArg(window.location.href, "applicationNumber")
    }
  },
  downloadMenu: {
    uiFramework: "custom-atoms",
    componentPath: "MenuButton",
    props: {
      data: {
        label: "Download",
        leftIcon: "cloud_download",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        menu: []
      }
    }
  },
  printMenu: {
    uiFramework: "custom-atoms",
    componentPath: "MenuButton",
    props: {
      data: {
        label: "Print",
        leftIcon: "print",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        menu: []
      }
    }
  }
});

const prepareDocumentsView = async (state, dispatch) => {
  let documentsPreview = [];

  // Get all documents from response
  let firenoc = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0]",
    {}
  );
  let buildingDocuments = jp.query(
    firenoc,
    "$.fireNOCDetails.buildings.*.applicationDocuments.*"
  );
  let applicantDocuments = jp.query(
    firenoc,
    "$.fireNOCDetails.applicantDetails.additionalDetail..ownerAuditionalDetail.documents.*"
  );
  let otherDocuments = jp.query(
    firenoc,
    "$.fireNOCDetails.additionalDetail.documents.*"
  );
  let allDocuments = [
    ...buildingDocuments,
    ...applicantDocuments,
    ...otherDocuments
  ];

  allDocuments.forEach((doc, index) => {
    documentsPreview.push({
      title: getTransformedLocale(doc.documentType || doc.title),
      fileStoreId: doc.fileStoreId,
      linkText: "View"
    });
    if(doc && doc.dropdown && doc.dropdown.value) {
      documentsPreview[index].dropdown = {
        value : doc.dropdown.value
      }
    }
  });
  if(documentsPreview && documentsPreview.length <= 0) {
    let reduxDocuments = get(
      state,
      "screenConfiguration.preparedFinalObject.documentsUploadRedux",
      {}
    );
    jp.query(reduxDocuments, "$.*").forEach((doc, index) => {
      if (doc.documents && doc.documents.length > 0) {
        documentsPreview.push({
          title: getTransformedLocale(doc.documentCode),
          name: doc.documents[0].fileName,
          fileStoreId: doc.documents[0].fileStoreId,
          linkText: "View",
        });
        if(doc && doc.dropdown && doc.dropdown.value) {
          documentsPreview[index].dropdown = {
            value : doc.dropdown.value
          }
        }
      }
      
    });
    set(
      firenoc,
      "fireNOCDetails.applicantDetails.additionalDetail.ownerAuditionalDetail.documents",
      documentsPreview
    );
  }
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
  dispatch(prepareFinalObject("documentsPreview", documentsPreview));
};

const prepareUoms = (state, dispatch) => {
  let buildings = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
    []
  );
  buildings.forEach((building, index) => {
    let uoms = get(building, "uoms", []);
    let uomsMap = {};
    uoms.forEach(uom => {if(uom.active==true){
      uomsMap[uom.code] = uom.value;}
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
          jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${
            item.code
          }`
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

const setDownloadMenu = (state, dispatch) => {
  /** MenuButton data based on status */
  let status = get(
    state,
    "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status"
  );
let applicationNumber=get(
  state,
  "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber"
);
let tenantId=get(
  state,
  "screenConfiguration.preparedFinalObject.FireNOCs[0].tenantId"
);

  let downloadMenu = [];
  let printMenu = [];
  let certificateDownloadObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: () => {
      generatePdf(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  let certificatePrintObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: () => {
      generatePdf(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: () => {
      const receiptQueryString = [
        { key: "tenantId", value: tenantId },  { key: "consumerCodes", value: applicationNumber },
    ]
    download(receiptQueryString , "download" , "consolidatedreceipt", state);
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: () => {
      const receiptQueryString = [
        { key: "tenantId", value: tenantId },  { key: "consumerCodes", value: applicationNumber },
    ]
    download(receiptQueryString , "print" , "consolidatedreceipt", state);    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: () => {
      generatePdf(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: () => {
      generatePdf(state, dispatch, "application_print");
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
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
    case "DOCUMENTVERIFY":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "REJECTED":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.headerDiv.children.header.children.downloadMenu",
      "props.data.menu",
      downloadMenu
    )
  );
  dispatch(
    handleField(
      "search-preview",
      "components.div.children.headerDiv.children.header.children.printMenu",
      "props.data.menu",
      printMenu
    )
  );
  /** END */
};

const setSearchResponse = async (
  state,
  dispatch,
  applicationNumber,
  tenantId
) => {
  const fireDetails = get(state.screenConfiguration.preparedFinalObject, 'FireNOCs', []);
  const response = await getSearchResults([
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "applicationNumber", value: applicationNumber }
  ])
  const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);
  if(fireDetails && fireDetails.length > 0 && !(equals(fireDetails, response.FireNOCs))) {
    // const response = sampleSingleSearch();
    dispatch(prepareFinalObject("FireNOCs", fireDetails, []));
  }
  else {
    dispatch(prepareFinalObject("FireNOCs", get(response, "FireNOCs", [])));

  }
  // let firNOCType = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "FireNOCs[0].fireNOCDetails.fireNOCType",[]);


    // if( firNOCType === "RENEWAL")
    // {           
    //   set(
    //     action,
    //     "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.fireNocNumber.visible",
    //     false
    //   );      

    // }       
    // else {      
    //   set(
    //     action,
    //     "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.oldFireNocNumber.visible",
    //     false
    //   );  

    //   } 

  // Set Institution/Applicant info card visibility
  if (
    get(
      response,
      "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
      ""
    ).startsWith("INSTITUTION")
  ) {
    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.applicantSummary",
        "visible",
        false
      )
    );
  } else {
    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.institutionSummary",
        "visible",
        false
      )
    );
  }


  let areaTypeDta= get(response,
    "FireNOCs[0].fireNOCDetails.propertyDetails.address.areaType",
      ""
    )

    const city = get(
      response,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict"
    );
    //   // var mtenantid = value === 'Urban'? currentcity : tenantId;
    
    //   console.log("valuevalue",city);
    //   // console.log("mtenantidmtenantid",mtenantid);
      dispatch(fetchLocalizationLabel(getLocale(), `${city}`, city));

if(areaTypeDta === "Urban")
{

  dispatch(
    handleField(
      "search-preview",
      "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.villageName",
      "visible",
      false
    )
  );

  dispatch(
    handleField(
      "search-preview",
      "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.subDistrict",
      "visible",
      false
    )
  );

}

else{

  dispatch(
    handleField(
      "search-preview",
      "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.city",
      "visible",
      false
    )
  );

  dispatch(
    handleField(
      "search-preview",
      "components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.mohalla",
      "visible",
      false
    )
  );

}

let NOCTypeDta= get(response,
  "FireNOCs[0].fireNOCDetails.fireNOCType",
    ""
  )

  if(NOCTypeDta === "RENEWAL"){

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.fireNocNumber",
        "visible",
        false
      )
    );

  }
  else{

    dispatch(
      handleField(
        "search-preview",
        "components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.oldFireNocNumber",
        "visible",
        false
      )
    );

  }
const city22 = get(
  state.screenConfiguration.preparedFinalObject,
  "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict"
);
  // var mtenantid = value === 'Urban'? currentcity : tenantId;

  // console.log("mtenantidmtenantid",mtenantid);
  dispatch(fetchLocalizationLabel(getLocale(), `${city22}`, city22));


  prepareDocumentsView(state, dispatch);
  prepareUoms(state, dispatch);
  await loadPdfGenerationData(applicationNumber, tenantId);
  const isAlreadyEdited = getQueryArg(window.location.href, "edited");
  if(isAlreadyEdited) {
    const propertyItems = get(state.screenConfiguration.screenConfig, 'search-preview.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children', {});
    dispatch(
      handleField(
        "search-preview",
        `components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.items[0].item0.children.cardContent.children.propertyContainer`,
        "children",
        propertyItems
      )
    );
  }
  setDownloadMenu(state, dispatch);
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen:  (action, state, dispatch) => {
    let applicationNumber =
    getQueryArg(window.location.href, "applicationNumber") ||
    get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.applicationNumber"
    );
    const city = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    generateBill(dispatch, applicationNumber, tenantId);
    // const queryObject1 = [
    //   { key: "tenantId", value: tenantId },
    //   { key: "consumerCode", value: applicationNumber },
    //   { key: "services", value: "FIRENOC" }
    // ];
 
    // dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));

    searchBill(dispatch, applicationNumber, tenantId);
  //  createBill(queryObject1,dispatch)
  //  .then(payload=>{
  //   console.log("2323232>>>....billData",payload);
  //   let billData = get(payload, "Bill[0]") ;
  //   console.log("2323232>>>....billData",billData);
  //   if (billData) {
  //     const estimateData = 
  //     (billData);
  //     estimateData &&
  //       estimateData.length &&
  //       dispatch(
  //         prepareFinalObject(
  //           "applyScreenMdmsData.estimateCardData",
  //           estimateData
  //         )
  //       );
  //       console.log("asdsasd",estimateData);
  //   }

  // })

    setSearchResponse(state, dispatch, applicationNumber, tenantId);

    const queryObject = [
      { key: "tenantId", value: tenantId },
      { key: "businessServices", value: "FIRENOC" }
    ];
    setBusinessServiceDataToLocalStorage(queryObject, dispatch);


    // Hide edit buttons
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible",
      //true
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible",
      //true
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.children.cardContent.children.header.children.editSection.visible",
      //true
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.children.cardContent.children.header.children.editSection.visible",
      //true
      false
    );
    set(
      action,
      "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible",
      false
    );
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
              ...titlebar
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "FireNOCs",
            moduleName: "FIRENOC",
            updateUrl: "/firenoc-services/v1/_update"
          }
        },
        body: getCommonCard({
          estimateSummary: estimateSummary,
          nocSummary: nocSummary,
          propertySummary: propertySummary,
          applicantSummary: applicantSummary,
          institutionSummary: institutionSummary,
          documentsSummary: documentsSummary
        }),
        citizenFooter:
          process.env.REACT_APP_NAME === "Citizen" ? citizenFooter : {}
      }
    }
  }
};

export default screenConfig;
