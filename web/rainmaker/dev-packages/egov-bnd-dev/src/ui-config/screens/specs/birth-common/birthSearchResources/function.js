import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { searchForBirth } from "../../../../../ui-utils/commons";
import { validateFields } from "../../utils";
import { convertEpochToDate } from "../../utils/index";


export const searchApiCall = async (state, dispatch) => {

  showHideTable(false, dispatch);

  let tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "bnd.birth.tenantId"
  );
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "limit", value: "10" }
  ];
  let searchSet1Visible = get(
    state.screenConfiguration,
    "screenConfig.getCertificate.components.div.children.birthSearchCard.children.cardContent.children.searchContainer1.visible",
    {}
  );

  const isSearchSet1Valid = validateFields(
    "components.div.children.birthSearchCard.children.cardContent.children.searchContainer1.children.details.children",
    state,
    dispatch,
    "getCertificate"
  );
  const isSearchSet2Valid = validateFields(
    "components.div.children.birthSearchCard.children.cardContent.children.searchContainer2.children.details.children",
    state,
    dispatch,
    "getCertificate"
  );
  const isSearchSetCommonValid = validateFields(
    "components.div.children.birthSearchCard.children.cardContent.children.searchContainerCommon.children",
    state,
    dispatch,
    "getCertificate"
  );

  if (!isSearchSetCommonValid || (searchSet1Visible && !isSearchSet1Valid) || 
    (!searchSet1Visible && !isSearchSet2Valid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill the required fields to search.",
          labelKey: "BND_COMMON_REQ_FIELDS_ERR"
        },
        "warning"
      )
    );
    return;
  }

  const responseFromAPI = await searchForBirth(dispatch, queryObject)
  const births = (responseFromAPI && responseFromAPI.births) || [{regNo:"2019-AGRA-000671","name":"Srinath","dateOfBirth":"12-12-2012","gender":"Male","mothersName":"Veena","fathersName":"Raj K T","tenantId":tenantId}];

  const birthTableData = births.map(item => {
    return {
      regNo: get(item, "regNo"),
      nameOfChild: get(item, "nameOfChild"),
      dateOfBirth: get(item, "dateOfBirth"),
      gender: get(item, "gender"),
      mothersName: get(item, "mothersName"),
      fathersName: get(item, "fathersName"),
      action: getActionItem("NEW"),//getActionItem(get(item, "status")),
      tenantId: get(item, "tenantId")
    };
  });
  dispatch(
    prepareFinalObject("bnd.birth.birthSearchResponse", births)
  );

  // const uiConfigs = get(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.common-masters.uiCommonPay");
  // const configObject = uiConfigs.filter(item => item.code === searchScreenObject.businesService);
    
  try {
    let data = birthTableData.map(item => ({
      ['BND_COMMON_TABLE_REGNO']: item.regNo || "-",
      ["BND_COMMON_NAME"]: item.nameOfChild || "-",
      ['BND_BIRTH_DATE']: item.dateOfBirth || "-", //convertEpochToDate(item.billDate) 
      ['BND_COMMON_GENDER']: item.gender || "-",
      ['BND_COMMON_MOTHERSNAME']: item.mothersName || "-",
      ['BND_COMMON_FATHERSNAME']: item.fathersName || "-",
      ['BND_COMMON_TABLE_ACTION']: item.action || "-",
      ["BUSINESS_SERVICE"]: "BIRTH_CERT",
      ["TENANT_ID"]: item.tenantId,
      // ["BILL_ID"]: item.billId,
      // ["BILL_SEARCH_URL"]: searchScreenObject.url,
      // ["ADVANCE_PAYMENT"]: isAdvancePayment
    }));
    dispatch(
      handleField(
        "getCertificate",
        "components.div.children.searchResults",
        "props.data",
        data
      )
    );
    dispatch(
      handleField(
        "getCertificate",
        "components.div.children.searchResults",
        "props.tableData",
        birthTableData
      )
    );
    dispatch(
      handleField(
        "getCertificate",
        "components.div.children.searchResults",
        "props.rows",
        birthTableData.length
      )
    );

    showHideTable(true, dispatch);
  } catch (error) {
    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
}

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "getCertificate",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

const getActionItem = (status) => {
  switch (status) {
    case "NEW": return "PAY and DOWNLOAD";
  }
}
