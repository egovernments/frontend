import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";

export const textToLocalMapping = {
  "Employee ID": getLocaleLabels(
    "Employee ID",
    "HR_COMMON_TABLE_COL_EMP_ID",
    getTransformedLocalStorgaeLabels()
  ),
  Name: getLocaleLabels(
    "Name",
    "HR_COMMON_TABLE_COL_NAME",
    getTransformedLocalStorgaeLabels()
  ),
  Role: getLocaleLabels(
    "Role",
    "HR_COMMON_TABLE_COL_ROLE",
    getTransformedLocalStorgaeLabels()
  ),
  Designation: getLocaleLabels(
    "Designation",
    "HR_COMMON_TABLE_COL_DESG",
    getTransformedLocalStorgaeLabels()
  ),
  Department: getLocaleLabels(
    "Department",
    "HR_COMMON_TABLE_COL_DEPT",
    getTransformedLocalStorgaeLabels()
  ),
  "Search Results for Employee": getLocaleLabels(
    "Search Results for Employee",
    "HR_HOME_SEARCH_RESULTS_TABLE_HEADING",
    getTransformedLocalStorgaeLabels()
  ),
  "Tenant ID": getLocaleLabels(
    "Tenant ID",
    "HR_COMMON_TABLE_COL_TENANT_ID",
    getTransformedLocalStorgaeLabels()
  )
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  moduleName: "egov-hrms",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      [get(textToLocalMapping, "Employee ID")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#FE7A51"
                }}
              >
                {rowData[get(textToLocalMapping, "Employee ID")]}
              </span>
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "Name")]: {},
      [get(textToLocalMapping, "Role")]: {},
      [get(textToLocalMapping, "Designation")]: {},
      [get(textToLocalMapping, "Department")]: {}
      // [get(textToLocalMapping, "Tenant ID")]: {}
    },
    title: get(textToLocalMapping, "Search Results for Employee")
  }
};

const onRowClick = rowData => {
  let viewEmployeeUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? "/egov-ui-framework/hrms/view"
      : "/hrms/view";
  return `${viewEmployeeUrl}?employeeID=${
    rowData[get(textToLocalMapping, "Employee ID")]
  }&tenantId=${rowData[get(textToLocalMapping, "Tenant ID")]}`;
};
