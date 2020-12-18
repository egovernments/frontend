import commonConfig from "config/common.js";
import { getCommonCaption, getCommonCard,getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getLocaleLabels, getQueryArg, getTransformedLocalStorgaeLabels } from "egov-ui-framework/ui-utils/commons";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { downloadReceiptFromFilestoreID } from "egov-common/ui-utils/commons";
import orderBy from "lodash/orderBy";


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
  screen = "newApplication"
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
        // let s = {
        //   ...fields[variable],
        //   value: get(
        //     state.screenConfiguration.preparedFinalObject,
        //     fields[variable].jsonPath
        //   )
        // };
        // console.log("Checked for this ",s);
        // alert("not valid for "+variable);
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

export const convertDateTimeToEpoch = dateTimeString => {
  //example input format : "26-07-2018 17:43:21"
  try {
    // const parts = dateTimeString.match(
    //   /(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})/
    // );
    const parts = dateTimeString.match(
      /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/
    );
    return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
  } catch (e) {
    return dateTimeString;
  }
};

export const getMdmsData = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "egov-mdms-service/v1/_get",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getEpochForDate = date => {
  if (typeof date === "string") {
    const dateSplit = date.split("/");
    return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
  }
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

export const getDialogButton = (name, key, screenKey) => {
  return {
    componentPath: "Button",
    props: {
      color: "primary",
      style: {}
    },
    children: {
      previousButtonLabel: getLabel({
        labelName: name,
        labelKey: key
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        //showHideBreakupPopup(state, dispatch, screenKey);
      }
    }
    //visible: false
  };
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

export const getEmployeeName = async queryObject => {
  try {
    let employeeName = "";
    const payload = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      queryObject
    );
    if (payload && payload.Employees && payload.Employees.length > 0) {
      employeeName = payload.Employees[0].user.name;
    }
    return employeeName;
  } catch (e) {
    console.log(e.message);
  }
};

export const setServiceCategory = (businessServiceData, dispatch) => {
  let nestedServiceData = {};
  businessServiceData.forEach(item => {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        let child = get(
          nestedServiceData,
          `${item.code.split(".")[0]}.child`,
          []
        );
        child.push(item);
        set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
      } else {
        set(
          nestedServiceData,
          `${item.code.split(".")[0]}.code`,
          item.code.split(".")[0]
        );
        set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
      }
    } else {
      set(nestedServiceData, `${item.code}`, item);
    }
  });
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.nestedServiceData",
      nestedServiceData
    )
  );
  let serviceCategories = Object.values(nestedServiceData).filter(
    item => item.code
  );
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.serviceCategories",
      serviceCategories
    )
  );
};



export const downloadHelpFile = async (state, dispatch) => {  
  const helpurl = get(state.screenConfiguration.preparedFinalObject,
    "helpFileUrl",
    ""
  );   
  window.open(helpurl,"_blank");
};


export const getTextToLocalMapping = label => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Receipt No.":
      return getLocaleLabels(
        "Receipt No",
        "UC_COMMON_TABLE_COL_RECEIPT_NO",
        localisationLabels
      );
    case "Payee Name":
      return getLocaleLabels(
        "Consumer Name",
        "UC_COMMON_TABLE_COL_PAYEE_NAME",
        localisationLabels
      );
    case "Service Type":
      return getLocaleLabels(
        "Service Category",
        "UC_SERVICE_TYPE_LABEL",
        localisationLabels
      );
    case "Date":
      return getLocaleLabels(
        "Receipt Date",
        "UC_COMMON_TABLE_COL_DATE",
        localisationLabels
      );
    case "Amount[INR]":
      return getLocaleLabels(
        "Amount Paid[INR]",
        "UC_COMMON_TABLE_COL_AMOUNT",
        localisationLabels
      );
    case "Status":
      return getLocaleLabels(
        "Status",
        "UC_COMMON_TABLE_COL_STATUS",
        localisationLabels
      );
    case "BILLINGSERVICE_BUSINESSSERVICE_PT":
      return getLocaleLabels(
        "Property Tax",
        "BILLINGSERVICE_BUSINESSSERVICE_PT",
        localisationLabels
      );
    default:
      return getLocaleLabels(
        label,
        label,
        localisationLabels
      );
  }
};


export const downloadChallan = async (Challan, mode = 'download') => {
 
  let tenantId = get(Challan, "tenantId");

  //Added sorting for Challan details
  const challanAmtSorted=  orderBy(
    Challan.amount,
    ["amount"],
    ["desc"]);       
    Challan.amount = challanAmtSorted;
    

  const queryStr = [
    { key: "key", value:"mcollect-challan" },
    { key: "tenantId", value: tenantId ? tenantId.split(".")[0] : commonConfig.tenantId }
  ];
  const DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get",
    },
  };
    try {
      httpRequest("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Challan }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' })
        .then(res => {
          res.filestoreIds[0]
          if (res && res.filestoreIds && res.filestoreIds.length > 0) {
            res.filestoreIds.map(fileStoreId => {
              downloadReceiptFromFilestoreID(fileStoreId, mode)
            })
          } else {
            console.log("Error In Acknowledgement form Download");
          }
        });
    } catch (exception) {
      alert('Some Error Occured while downloading Acknowledgement form!');
    }
  
}

export const getDetailsForOwner = async (state, dispatch, fieldInfo) => {
  console.log("fieldInfo",fieldInfo)
  try {
    const cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
    const ownerNo = get(
      state.screenConfiguration.preparedFinalObject,
      `lamsStore.Lease[0].userDetails[${cardIndex}].mobileNumber`,
      ""
    );
    if(!ownerNo){
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please enter Mobile Number to search !",
            labelKey: "ERR_OWNER_NOT_ENTERED"
          },
          "error"
        )
      );
      return;
    }
    const owners = get(
      state.screenConfiguration.preparedFinalObject,
      `lamsStore.Lease[0].userDetails`,
      []
    );
    //owners from search call before modification.
    const oldOwnersArr = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].tradeLicenseDetail.owners",
      []
    );
    //Same no search on Same index
    if (ownerNo === owners[cardIndex].userName) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Owner already added !",
            labelKey: "ERR_OWNER_ALREADY_ADDED"
          },
          "error"
        )
      );
      return;
    }

    //Same no search in whole array
    const matchingOwnerIndex = owners.findIndex(
      item => item.userName === ownerNo
    );
    if (matchingOwnerIndex > -1) {
      if (
        !isUndefined(owners[matchingOwnerIndex].userActive) &&
        owners[matchingOwnerIndex].userActive === false
      ) {
        //rearrange
        dispatch(
          prepareFinalObject(
            `lamsStore.Lease[0].userDetails[${matchingOwnerIndex}].userActive`,
            true
          )
        );
        dispatch(
          prepareFinalObject(
            `lamsStore.Lease[0].userDetails[${cardIndex}].userActive`,
            false
          )
        );
        //Delete if current card was not part of oldOwners array - no need to save.
        if (
          oldOwnersArr.findIndex(
            item => owners[cardIndex].userName === item.userName
          ) == -1
        ) {
          owners.splice(cardIndex, 1);
          dispatch(
            prepareFinalObject(`lamsStore.Lease[0].userDetails`, owners)
          );
        }
      } else {
        dispatch(
          toggleSnackbar(
            true,
            {
              labelName: "Owner already added !",
              labelKey: "ERR_OWNER_ALREADY_ADDED_1"
            },
            "error"
          )
        );
      }
      return;
    } else {
      //New number search only
      let payload = await httpRequest(
        "post",
        `/user/_search?tenantId=${commonConfig.tenantId}`,
        "_search",
        [],
        {
          tenantId: commonConfig.tenantId,
          userName: `${ownerNo}`
        }
      );
      if (payload && payload.user && payload.user.hasOwnProperty("length")) {
        if (payload.user.length === 0) {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "This mobile number is not registered ! Enter all details and continue.",
                labelKey: "LAMS_ERR_MOBILE_NUMBER_NOT_REGISTERED"
              },
              "info"
            )
          );
        } else {
          const userInfo =
            payload.user &&
            payload.user[0] &&
            JSON.parse(JSON.stringify(payload.user[0]));
          if (userInfo && userInfo.createdDate) {
            userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
            userInfo.lastModifiedDate = convertDateTimeToEpoch(
              userInfo.lastModifiedDate
            );
            userInfo.pwdExpiryDate = convertDateTimeToEpoch(
              userInfo.pwdExpiryDate
            );
          }
          let currOwnersArr = get(
            state.screenConfiguration.preparedFinalObject,
            "lamsStore.Lease[0].userDetails",
            []
          );

          currOwnersArr[cardIndex] = userInfo;
          // if (oldOwnersArr.length > 0) {
          //   currOwnersArr.push({
          //     ...oldOwnersArr[cardIndex],
          //     userActive: false,
          //    // isDeleted:false
          //   });
          // }
          dispatch(
            prepareFinalObject(
              `Licenses[0].tradeLicenseDetail.owners`,
              currOwnersArr
            )
          );
          // dispatch(
          //   prepareFinalObject(
          //     `Licenses[0].tradeLicenseDetail.owners[0].mobileNumber`,
          //     ownerNo
          //   )
          // );
          //validateOwners(state, dispatch);
        }
      }
    }
  } catch (e) {
    console.log(e);
    dispatch(toggleSnackbar(true, e.message, "info"));
  }
};

export const getMaxDateForDOB = ()=>{
  var eighteenYearsAgo = new Date();
  eighteenYearsAgo=eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
  var finDate = new Date(eighteenYearsAgo);
  var month = finDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = finDate.getDate() < 10 ? "0" + finDate.getDate() : finDate.getDate();
  finDate = finDate.getFullYear() + "-" +month+ "-" + day;
  return finDate;
}