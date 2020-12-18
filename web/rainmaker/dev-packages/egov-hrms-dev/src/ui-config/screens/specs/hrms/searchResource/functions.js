import {
  handleScreenConfigurationFieldChange as handleField,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import find from "lodash/find";
import get from "lodash/get";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import { validateFields } from "../../utils";

export const getDeptName = (state, codes) => {
  let deptMdmsData = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenMdmsData.common-masters.Department",
    []
  );
  let codeNames = codes.map(code => {
    return get(find(deptMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

export const getDesigName = (state, codes) => {
  let desigMdmsData = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenMdmsData.common-masters.Designation",
    []
  );
  let codeNames = codes.map(code => {
    return get(find(desigMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

export const searchApiCall = async (state, dispatch) => {
  let { localisationLabels } = state.app || {};
  showHideTable(false, dispatch);
  const tenantId =
    get(state.screenConfiguration.preparedFinalObject, "hrmsSearchScreen.ulb") ||
    getTenantId();
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "hrmsSearchScreen",
    {}
  );
  const isSearchFormValid = validateFields(
    "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!isSearchFormValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to start search",
          labelKey: "ERR_FILL_VALID_FIELDS"
        },
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x.trim() === "")
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "ERR_FILL_ONE_FIELDS"
        },
        "warning"
      )
    );
  } else {
    // Add selected search fields to queryobject
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    let response = await getSearchResults(queryObject, dispatch);
    try {
      let data = response.Employees.map(item => {
        // GET ALL CURRENT DESIGNATIONS OF EMPLOYEE
        let currentDesignations = get(item, "assignments", [])
          .filter(assignment => {
            return assignment.isCurrentAssignment;
          })
          .map(assignment => {
            return assignment.designation;
          });

        // GET ALL CURRENT DEPARTMENTS OF EMPLOYEE
        let currentDepartments = get(item, "assignments", [])
          .filter(assignment => {
            return assignment.isCurrentAssignment;
          })
          .map(assignment => {
            return assignment.department;
          });

        return {
          ["HR_COMMON_TABLE_COL_EMP_ID"]: get(item, "code", "-") || "-",
          ["HR_COMMON_TABLE_COL_NAME"]: get(item, "user.name", "-") || "-",
          ["HR_COMMON_TABLE_COL_ROLE"]:
            get(item, "user.roles", [])
              .map(role => {
                return ` ${role.name}`;
              })
              .join() || "-",
          ["HR_COMMON_TABLE_COL_DESG"]:
            getDesigName(state, currentDesignations) || "-",
          ["HR_COMMON_TABLE_COL_DEPT"]:
            getDeptName(state, currentDepartments) || "-",
          ["HR_COMMON_TABLE_COL_STATUS"]:
            get(item, "user.active", true) ? "ACTIVE" : "INACTIVE" || "-",
          ["HR_COMMON_TABLE_COL_TENANT_ID"]: get(item, "tenantId", "-")
        };
      });

      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.rows",
          response.Employees.length
        )
      );
      showHideTable(true, dispatch);
    } catch (error) {
      dispatch(
        toggleSnackbar(
          true,
          { labelName: "Unable to parse search results!" },
          "error"
        )
      );
    }
  }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};
