import {
  getLabel,
  getTextField,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import filter from "lodash/filter";
import { httpRequest } from "../../../../ui-utils/api";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import isUndefined from "lodash/isUndefined";
import { getTenantId, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import commonConfig from "config/common.js";

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

export const showHideAdhocPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["view"],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(
    handleField("view", "components.adhocDialog", "props.open", !toggle)
  );
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

export const epochToYmdDate = et => {
  if (!et) return null;
  if (typeof et === "string") return et;
  let d = new Date(et),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getTodaysDateInYMD = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  date = `${date.getFullYear()}-${month}-${day}`;
  return date;
};

export const showCityPicker = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["search"],
    "components.cityPickerDialog.props.open",
    false
  );
  dispatch(
    handleField("search", "components.cityPickerDialog", "props.open", !toggle)
  );
};

export const createEmployee = (state, dispatch) => {
  const tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "citiesByModule.tenantId.value"
  );
  get(state.screenConfiguration.preparedFinalObject, "Employee") &&
    dispatch(prepareFinalObject("Employee", []));
  get(
    state.screenConfiguration.preparedFinalObject,
    "hrms.reviewScreen.furnishedRolesList"
  ) && dispatch(prepareFinalObject("hrms.reviewScreen.furnishedRolesList", ""));
  const tenantIdQueryString = tenantId ? `?tenantId=${tenantId}` : "";
  const createUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/hrms/create${tenantIdQueryString}`
      : `/hrms/create${tenantIdQueryString}`;
  dispatch(setRoute(createUrl));
};

// HRMS
export const toggleDeactivateDialog = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["view"],
    "components.deactivateEmployee.props.open",
    false
  );
  dispatch(
    handleField("view", "components.deactivateEmployee", "props.open", !toggle)
  );
};

// HRMS GET STATE ADMIN ROLE
export const getAdminRole = state => {
  let userInfo = JSON.parse(getUserInfo());
  const currentUserRoles = get(userInfo, "roles");

  /** REMOVE THESE 2 HARDCODES after moving StateInfo object to localStorage */
  const configAdminRoles = JSON.parse(
    get(
      state,
      "common.stateInfoById[0].roleMapping.hrmsAdmin",
      '["HRMS_ADMIN"]'
    )
  );
  const stateTenantId = get(
    state,
    "common.stateInfoById[0].code",
    commonConfig.tenantId
  );
  /** END */

  let hasAdminRole = false;
  Array.isArray(currentUserRoles) &&
    currentUserRoles.forEach(role => {
      if (
        Array.isArray(configAdminRoles) &&
        configAdminRoles.includes(role.code) &&
        role.tenantId === stateTenantId
      ) {
        hasAdminRole = true;
      }
    });
  return { hasAdminRole: hasAdminRole, configAdminRoles: configAdminRoles };
};
