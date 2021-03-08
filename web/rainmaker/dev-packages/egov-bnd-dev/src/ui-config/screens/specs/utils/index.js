import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { getQueryArg,getTransformedLocalStorgaeLabels ,getLocaleLabels} from "egov-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField, toggleSpinner , toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getCommonCard,
  getCommonCaption
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "../../../../ui-utils";
import commonConfig from "config/common.js";
import {prepareFinalObject} from "egov-ui-framework/ui-redux/screen-configuration/actions";   //returns action object
import { downloadReceiptFromFilestoreID} from "egov-common/ui-utils/commons";
import store from "ui-redux/store";

export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      result[item[id]] = {
        ...item
      };

      return result;
    }, {})
  );
};

export const getMdmsData = async  requestBody=> {
  try {
    const response = await httpRequest(
      "post",
      "egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );
   
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const validateFields = (
  objectJsonPath,
  state,
  dispatch,
  screen = "apply"
) => {
  const fields = get(
    state.screenConfiguration.screenConfig[screen],
    objectJsonPath,
    {}
  );
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (
        fields[variable] &&
        fields[variable].props &&
        (fields[variable].props.disabled === undefined ||
          !fields[variable].props.disabled) &&
        (fields[variable].props.disableValidation === undefined ||
          !fields[variable].props.disableValidation) && 
        !validate(
          screen,
          {
            ...fields[variable],
            value: get(
              state.screenConfiguration.preparedFinalObject,
              fields[variable].jsonPath
            )
          },
          dispatch,
          true
        )
      ) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

export const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
  //example input format : "2018-10-02"
  try {
    const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

export const getEpochForDate = date => {
  const dateSplit = date.split("/");
  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
};

export const sortByEpoch = (data, order) => {
  if (order) {
    return data.sort((a, b) => {
      return a[a.length - 1] - b[b.length - 1];
    });
  } else {
    return data.sort((a, b) => {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
};

export const ifUserRoleExists = role => {
  let userInfo = JSON.parse(getUserInfo());
  const roles = get(userInfo, "roles");
  const roleCodes = roles ? roles.map(role => role.code) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

export const convertEpochToDate = dateEpoch => {
  const dateFromApi = new Date(dateEpoch);
  console.log("Check the data epoch",dateFromApi);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${day}/${month}/${year}`;
};

export const getCurrentFinancialYear = () => {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

export const getFinancialYearDates = (format, et) => {
  /** Return the starting date and ending date (1st April to 31st March)
   *  of the financial year of the given date in ET. If no ET given then
   *  return the dates for the current financial year */
  var date = !et ? new Date() : new Date(et);
  var curMonth = date.getMonth();
  var financialDates = { startDate: "NA", endDate: "NA" };
  if (curMonth > 3) {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = `01/04/${date.getFullYear().toString()}`;
        financialDates.endDate = `31/03/${(date.getFullYear() + 1).toString()}`;
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = `${date.getFullYear().toString()}-04-01`;
        financialDates.endDate = `${(date.getFullYear() + 1).toString()}-03-31`;
        break;
    }
  } else {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = `01/04/${(
          date.getFullYear() - 1
        ).toString()}`;
        financialDates.endDate = `31/03/${date.getFullYear().toString()}`;
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = `${(
          date.getFullYear() - 1
        ).toString()}-04-01`;
        financialDates.endDate = `${date.getFullYear().toString()}-03-31`;
        break;
    }
  }
  return financialDates;
};

export const gotoApplyWithStep = (state, dispatch, step) => {
  const applicationNumber = getQueryArg(
    window.location.href,
    "applicationNumber"
  );
  const applicationNumberQueryString = applicationNumber
    ? `&applicationNumber=${applicationNumber}`
    : ``;
  const applyUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/abg/apply?step=${step}${applicationNumberQueryString}`
      : `/abg/apply?step=${step}${applicationNumberQueryString}`;
  dispatch(setRoute(applyUrl));
};

export const showHideAdhocPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["search"],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(
    handleField("search", "components.adhocDialog", "props.open", !toggle)
  );
};

export const getCommonGrayCard = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          ch1: getCommonCard(children, {
            style: {
              backgroundColor: "rgb(242, 242, 242)",
              boxShadow: "none",
              borderRadius: 0,
              overflow: "visible"
            }
          })
        },
        gridDefination: {
          xs: 12
        }
      }
    },
    gridDefination: {
      xs: 12
    }
  };
};

export const getLabelOnlyValue = (value, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 6,
      sm: 4
    },
    props: {
      style: {
        marginBottom: "16px"
      },
      ...props
    },
    children: {
      value: getCommonCaption(value)
    }
  };
};


export const onActionClick = (rowData) =>{
  switch(rowData[8]){
    case "PAY" : return "";
    case "DOWNLOAD RECEIPT" : ""
    case "GENERATE NEW RECEIPT" : ""
  }
}

export const getTextToLocalMapping = label => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Bill No.":
      return getLocaleLabels(
        "Bill No.",
        "ABG_COMMON_TABLE_COL_BILL_NO",
        localisationLabels
      );

    case "Consumer Name":
      return getLocaleLabels(
        "Consumer Name",
        "ABG_COMMON_TABLE_COL_CONSUMER_NAME",
        localisationLabels
      );

    case "Service Category":
      return getLocaleLabels(
        "Service Category",
        "ABG_COMMON_TABLE_COL_SERVICE_CATEGORY",
        localisationLabels
      );
    case "Bill Date":
      return getLocaleLabels(
        "Bill Date",
        "ABG_COMMON_TABLE_COL_BILL_DATE",
        localisationLabels
      );

    case "Bill Amount(Rs)":
      return getLocaleLabels(
        "Bill Amount(Rs)",
        "ABG_COMMON_TABLE_COL_BILL_AMOUNT",
        localisationLabels
      );

    case "Status":
      return getLocaleLabels(
        "Status",
        "ABG_COMMON_TABLE_COL_STATUS",
        localisationLabels
      );
    case "Action":
      return getLocaleLabels(
        "Action",
        "ABG_COMMON_TABLE_COL_ACTION",
        localisationLabels
      );

    case "Consumer ID":
      return getLocaleLabels(
        "Consumer ID",
        "ABG_COMMON_TABLE_COL_CONSUMER_ID",
        localisationLabels
      );

   case "Owner Name":
      return getLocaleLabels(
        "Owner Name",
        "ABG_COMMON_TABLE_COL_OWN_NAME",
        localisationLabels
      );

  case "Download":
      return getLocaleLabels(
        "Download",
        "ABG_COMMON_TABLE_COL_DOWNLOAD_BUTTON"
      );

    case "View button":
      return getLocaleLabels(
        "Action",
        "ABG_COMMON_TABLE_COL_VIEW_BUTTON",
        localisationLabels
      );

      case "ACTIVE":
      return getLocaleLabels(
        "Pending",
        "BILL_GENIE_ACTIVE_LABEL",
        localisationLabels
      );

      case "CANCELLED":
      return getLocaleLabels(
        "Cancelled",
        "BILL_GENIE_CANCELLED_LABEL",
        localisationLabels
      );

      case "PAID":
      return getLocaleLabels(
        "Paid",
        "BILL_GENIE_PAID_LABEL",
        localisationLabels
      );
      case "PAY":
      case "PARTIALLY PAID":
      return getLocaleLabels(
        "PAY",
        "BILL_GENIE_PAY",
        localisationLabels
      );
      case "EXPIRED":
      return getLocaleLabels(
        "Expired",
        "BILL_GENIE_EXPIRED",
        localisationLabels
      );
      case "GENERATE NEW BILL":
      return getLocaleLabels(
        "GENERATE NEW BILL",
        "BILL_GENIE_GENERATE_NEW_BILL",
        localisationLabels
      );

      case "DOWNLOAD RECEIPT":
        return getLocaleLabels(
          "DOWNLOAD RECEIPT",
          "BILL_GENIE_DOWNLOAD_RECEIPT",
          localisationLabels
        );
      case "Search Results for Bill":
        return getLocaleLabels(
          "Search Results for Bill",
          "BILL_GENIE_SEARCH_TABLE_HEADER",
          localisationLabels
        );
      case "PARTIALLY_PAID":
      case "PARTIALLY PAID":
        return getLocaleLabels(
            "Partially Paid",
            "BILL_GENIE_PARTIALLY_PAID",
            localisationLabels
          ); 
      case "BILL_GENIE_GROUP_SEARCH_HEADER" : 
          return getLocaleLabels(
            "Search Results for Group Bills",
            "BILL_GENIE_GROUP_SEARCH_HEADER",
            localisationLabels
          ); 
  }
};

export const loadMdmsData = async (action, state, dispatch) => {

  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            },
            { name: "citymodule" }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [            
            { name: "Help" }
          ]
        }
      ]
    }
  };

  try{
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );
    console.log("Mdms Data Recieved is ",payload);
    if (payload) {
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
      const citymodule = get(payload, "MdmsRes.tenant.citymodule");
      const liveTenants = citymodule && citymodule.filter(item => item.code === "UC");
      dispatch(
        prepareFinalObject("applyScreenMdmsData.tenant.citiesByModule", get(liveTenants[0], "tenants"))
      );
    }
    return payload;
  }
  catch (e) {
    console.log(e);
  }
}

export const loadHospitals = async (action, state, dispatch, module) => {
  let requestBody = {};
  let payload = null;

  const tenantId = (module=="birth")?
    get(state.screenConfiguration.preparedFinalObject.bnd.birth,"tenantId"):
    get(state.screenConfiguration.preparedFinalObject.bnd.death,"tenantId");

  const queryParams = [
    { key: "tenantId", value: tenantId }  
    ];
  
  try
  {
    payload = await httpRequest(
      "post",
      "birth-death-services/common/getHospitals",
      "getHospitals",
      queryParams,
      requestBody
    );
  }
  catch(e)
  {
    //toBeRemoved
    payload = {"hospitalDtls":[{"id":"asdf","name":"St Johns Hospital"},{"id":"mcd","name":"Government Hospital Pune"}]};
  }
  //console.log("Survey numbers recieved...",payload);
  if(payload.hospitalDtls)
  {
    for (let hospital of payload.hospitalDtls) {
      hospital.code = hospital.id;
      hospital.name = hospital.name;
    }
    dispatch(prepareFinalObject("bnd.allHospitals", payload.hospitalDtls));
  }
}

export const downloadCert = async (tenantId, id) => {
  let requestBody = {};
  let payload = null;

  const queryParams = [
    { key: "tenantId", value: tenantId } ,
    { key: "id" , value: id }
    ];
  try
  {
    payload = await httpRequest(
      "post",
      "/birth-death-services/birth/_download",
      "_download",
      queryParams,
      requestBody
    );
  }
  catch(e)
  {
    console.error(e);
    toggleSnackbar(
      true,
      {
        labelName: "Could not initiate download",
        labelKey: "ERR_API_ERROR"
      },
      "error"
    );
    //toBeRemoved
    //payload = {consumerCode:"CH-CB-AGRA-2020-001504", filestoreId:"4f0d9299-7fa0-4af6-9077-389ebf2367c4", tenantId: "pb.agra"};
  }

  return payload;
}


export const postPaymentSuccess = async(action,state,dispatch, data) => {

  dispatch(toggleSpinner());
  setTimeout(() => {     
    postPaymentActivity(action,state, dispatch,data);
    dispatch(toggleSpinner());
  }, 4000); //Give 2 sec gap so that the screen is loaded correctly
    
};

export const postPaymentActivity = async(data) => {
  try {
    if(data.tenantId && data.consumerCode)
    {
      store.dispatch(toggleSpinner());
      let queryParams = [{key:"tenantId",value:data.tenantId},{key:"consumerCode",value:data.consumerCode}];
      const response = await httpRequest(
        "post",
        "birth-death-services/birth/_getfilestoreid",
        "getfilestoreid",
        queryParams,
        {}//{ searchCriteria: queryObject }
      );
      store.dispatch(toggleSpinner());
      if(response && response.filestoreId)
      {
        let mode = 'download';
        downloadReceiptFromFilestoreID(response.filestoreId, mode);
      }
      return response;
    }
  } catch (error) {
    store.dispatch(toggleSpinner());
    console.error(error);
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};

export const triggerDownload = () => {

  const state = store.getState();
  const certificateId =get(state,`screenConfiguration.preparedFinalObject.bnd.birth.download.certificateId`);
  const tenantId = get(state,`screenConfiguration.preparedFinalObject.bnd.birth.download.tenantId`);
  const businessService = get(state,`screenConfiguration.preparedFinalObject.bnd.birth.download.businessService`);

  downloadCert(tenantId,certificateId).then((response) => {

    if(response && response.consumerCode) // Redirect to payment page
    {
      const appName =
          process.env.REACT_APP_NAME === "Citizen"
            ? "citizen"
            : "employee";
            
      const url =
      process.env.NODE_ENV === "development"
        ? `/egov-common/pay?consumerCode=${
            response.consumerCode
          }&tenantId=${tenantId}&businessService=${
            businessService
          }`
        : `/${appName}/egov-common/pay?consumerCode=${
            response.consumerCode
          }&tenantId=${tenantId}&businessService=${
            businessService
          }`;
      document.location.href = `${document.location.origin}${url}`;
    }
    else 
    if(response && response.filestoreId)
    {
      downloadReceiptFromFilestoreID(response.filestoreId,'download')
    }

  });

}

export const downloadReceipt = async (consumerCode,tenantId) => {

  const state = store.getState();

  store.dispatch(toggleSpinner());
  let queryParams = [{key:"tenantId",value:tenantId},{key:"consumerCodes",value:consumerCode}];
  const response = await httpRequest(
    "post",
    "collection-services/payments/_search",
    "_search",
    queryParams,
    {}//{ searchCriteria: queryObject }
  );
  store.dispatch(toggleSpinner());
  if(response && response.Payments && response.Payments.length>0 && response.Payments[0].fileStoreId)
  {
    let mode = 'download';
    downloadReceiptFromFilestoreID(response.Payments[0].fileStoreId, mode);
  }
  return response;

}