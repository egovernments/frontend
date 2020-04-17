
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { getSearchResults } from "../../../../ui-utils/commons";
import { convertDateToEpoch, getTextToLocalMapping, validateFields } from "../utils/index";

export const propertySearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 0)
}

export const applicationSearch = async (state, dispatch) => {
  searchApiCall(state, dispatch, 1)
}

const removeValidation = (state, dispatch, index) => {
 
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      "props.error",
      false
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      "props.error",
      false
    )
  );


  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
      "isFieldValid",
      true
    )
  );
  dispatch(
    handleField(
      "propertySearch",
      "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
      "isFieldValid",
      true
    )
  );

}

const getAddress = (item) => {
  let doorNo = item.address.doorNo != null ? (item.address.doorNo + ",") : '';
  let buildingName = item.address.buildingName != null ? (item.address.buildingName + ",") : '';
  let street = item.address.street != null ? (item.address.street + ",") : '';
  let mohalla = item.address.locality.name ? (item.address.locality.name + ",") : '';
  let city = item.address.city != null ? (item.address.city) : '';
  return (doorNo + buildingName + street + mohalla + city);
}

const searchApiCall = async (state, dispatch, index) => {
  showHideTable(false, dispatch, 0);
  showHideTable(false, dispatch, 1);

  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  if ((!searchScreenObject.tenantId) && index == 0) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_FIRENOC_FILL_VALID_FIELDS"
        },
        "error"
      )
    );
    return;

  }
  let queryObject = [
    {
      key: "tenantId",
      value: searchScreenObject.tenantId
    }
  ];
  if (index == 1 && process.env.REACT_APP_NAME == "Citizen") {
    queryObject = [];
  }


  let formValid = false;
  if (index == 0) {
    if (searchScreenObject.ids != '' || searchScreenObject.mobileNumber != '' || searchScreenObject.oldpropertyids != '') {
      formValid = true;
    }
  } else {
    if (searchScreenObject.ids != '' || searchScreenObject.mobileNumber != '' || searchScreenObject.acknowledgementIds != '') {
      formValid = true;
    }
  }
  if (!formValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_FIRENOC_FILL_VALID_FIELDS"
        },
        "error"
      )
    );
    return;
  }
  let form1 = validateFields("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails", state, dispatch, "propertySearch");
  let form2 = validateFields("components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails", state, dispatch, "propertySearch");
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails"
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails"
  // "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo"
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.captureMutationDetails.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchProperty.children.searchPropertyDetails.children.ulbCityContainer.children",
    state,
    dispatch,
    "propertySearch"
  );

  const isownerCityRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ulbCity",
    state,
    dispatch,
    "propertySearch"
  );


  const isownerMobNoRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.ownerMobNo",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.mobileNumber == '';

  const ispropertyTaxUniqueIdRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.propertyTaxUniqueId",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.ids == '';

  const isexistingPropertyIdRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[0].tabContent.searchPropertyDetails.children.cardContent.children.ulbCityContainer.children.existingPropertyId",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.oldpropertyids == '';
  const ispropertyTaxApplicationNoRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.propertyTaxApplicationNo",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.acknowledgementIds == '';
  const ispropertyTaxApplicationOwnerNoRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.ownerMobNoProp",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.mobileNumber == '';
  const ispropertyTaxApplicationPidRowValid = validateFields(
    "components.div.children.propertySearchTabs.children.cardContent.children.tabSection.props.tabs[1].tabContent.searchApplicationDetails.children.cardContent.children.appNumberContainer.children.applicationPropertyTaxUniqueId",
    state,
    dispatch,
    "propertySearch"
  ) || searchScreenObject.ids == '';




  if (!(isSearchBoxFirstRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to search",
          labelKey: "ERR_FIRENOC_FILL_VALID_FIELDS"
        },
        "error"
      )
    );
    return;
  }
  if (index == 0 && !(isSearchBoxFirstRowValid && isownerCityRowValid && ispropertyTaxUniqueIdRowValid && isexistingPropertyIdRowValid && isownerMobNoRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey: "PT_INVALID_INPUT"
        },
        "error"
      )
    );
    return;
  } else if (index == 1 && !(ispropertyTaxApplicationPidRowValid && ispropertyTaxApplicationOwnerNoRowValid && ispropertyTaxApplicationNoRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey: "PT_INVALID_INPUT"
        },
        "error"
      )
    );
    return;
  }


  if (
    Object.keys(searchScreenObject).length == 0 || Object.keys(searchScreenObject).length == 1 ||
    (Object.values(searchScreenObject).every(x => x === ""))
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field along with city",
          labelKey: "PT_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE_OTHER_THAN_CITY"
        },
        "error"
      )
    );
    return;
  }
  //   else if (
  //     (searchScreenObject["fromDate"] === undefined ||
  //       searchScreenObject["fromDate"].length === 0) &&
  //     searchScreenObject["toDate"] !== undefined &&
  //     searchScreenObject["toDate"].length !== 0
  //   ) {
  //     dispatch(
  //       toggleSnackbar(
  //         true,
  //         { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" },
  //         "warning"
  //       )
  //     );
  //   } 
  else {

    removeValidation(state, dispatch, index);

    //  showHideProgress(true, dispatch);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        if (key === "fromDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "daystart")
          });
        } else if (key === "tenantId") {
          // queryObject.push({
          //   key: key,
          //   value: convertDateToEpoch(searchScreenObject[key], "dayend")
          // });

        }
        else if (key === "ids") {
          queryObject.push({
            key: "propertyIds",
            value: searchScreenObject[key].trim()
          });
        }

        else if (key === "toDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "dayend")
          });
        }
        // else if (key === "status") {
        //   queryObject.push({
        //     key: "action",
        //     value: searchScreenObject[key].trim()
        //   });
        // }
        else {
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }
    try {
      const response = await getSearchResults(queryObject);
      // const response = searchSampleResponse();

      let propertyData = response.Properties.map(item => ({
        [getTextToLocalMapping("Property Tax Unique Id")]:
          item.propertyId || "-",
        [getTextToLocalMapping("Owner Name")]: item.owners[0].name || "-",
        [getTextToLocalMapping("Guardian Name")]:
          item.owners[0].fatherOrHusbandName || "-",
        [getTextToLocalMapping("Existing Property Id")]:
          item.oldPropertyId || "-",
        [getTextToLocalMapping("Address")]:
          getAddress(item) || "-",
        tenantId: item.tenantId,
        [getTextToLocalMapping("Status")]: item.status || "-"
      }));

      let applicationData = response.Properties.map(item => ({
        // [getTextToLocalMapping("Application No")]:
        //   item.applicationNo || "-",
        [getTextToLocalMapping("Application No")]:
          item || "-",
        [getTextToLocalMapping("Property Tax Unique Id")]: item || "-",
        [getTextToLocalMapping("Application Type")]:
          item.creationReason ? getTextToLocalMapping("PT." + item.creationReason) : "NA",
        [getTextToLocalMapping("Owner Name")]:
          item.owners[0].name || "-",
        [getTextToLocalMapping("Address")]:
          getAddress(item) || "-",
        tenantId: item.tenantId,
        [getTextToLocalMapping("Status")]: item.status || "-",
        temporary: item
      }));

      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchPropertyTable",
          "props.data",
          propertyData
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchPropertyTable",
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Properties"
          )} (${response.Properties.length})`
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchApplicationTable",
          "props.data",
          applicationData
        )
      );
      dispatch(
        handleField(
          "propertySearch",
          "components.div.children.searchApplicationTable",
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Property Application"
          )} (${response.Properties.length})`
        )
      );
      //showHideProgress(false, dispatch);
      showHideTable(true, dispatch, index);
    } catch (error) {
      //showHideProgress(false, dispatch);
      dispatch(
        toggleSnackbar(
          true,
          { labelName: error.message, labelKey: error.message },
          "error"
        )
      );
      console.log(error);
    }
  }
};
const showHideTable = (booleanHideOrShow, dispatch, index) => {
  if (index == 0) {
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.searchPropertyTable",
        "visible",
        booleanHideOrShow
      )
    );
  }
  else {
    dispatch(
      handleField(
        "propertySearch",
        "components.div.children.searchApplicationTable",
        "visible",
        booleanHideOrShow
      )
    );
  }
};





export const downloadPrintContainer = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let ptMutationCertificateDownloadObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "book"
  };
  let ptMutationCertificatePrintObject = {
    label: { labelName: "PT Certificate", labelKey: "MT_CERTIFICATE" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "MT_RECEIPT" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      console.log("clicked");
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: { labelName: "Application", labelKey: "MT_APPLICATION" },
    link: () => {
      console.log("clicked");

    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [
        ptMutationCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        ptMutationCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "APPLIED":
    case "CITIZENACTIONREQUIRED":
    case "FIELDINSPECTION":
    case "PENDINGAPPROVAL":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "CANCELLED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "REJECTED":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return {
    rightdiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: { textAlign: "right", display: "flex" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "MT_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "pt-download-button" },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-pt",
          componentPath: "MenuButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "MT_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "pt-print-button" },
              menu: printMenu
            }
          }
        }

      },
      // gridDefination: {
      //   xs: 12,
      //   sm: 6
      // }
    }
  }
};
