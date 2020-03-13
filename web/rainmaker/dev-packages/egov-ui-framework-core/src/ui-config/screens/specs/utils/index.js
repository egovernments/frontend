import { handleScreenConfigurationFieldChange as handleField } from "../../../../ui-redux/screen-configuration/actions";
import { getTranslatedLabel } from "../../../../ui-utils/commons";
import { validate } from "../../../../ui-redux/screen-configuration/utils";
import { getUserInfo } from "../../../../ui-utils/localStorageUtils";


import get from "lodash/get";

const appCardHeaderStyle = (colorOne = "#ec407a", colorTwo = "#d81b60") => {
  return {
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50px",
    padding: "15px",
    marginTop: "-36px",
    borderRadius: "3px",
    background: `linear-gradient(60deg,${colorOne} ,${colorTwo} )`,
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)"
  };
};

export const getStepperObject = (
  stpperProps,
  stepsData,
  uiFramework = "material-ui"
) => {
  let stepperData = {};
  if (uiFramework === "material-ui") {
    stepperData = {
      componentPath: "Stepper",
      uiFramework: "custom-molecules",
      props: {
        steps: stepsData,
        ...stpperProps.props
      }
    };
  }
  return stepperData;
};

export const getCommonHeader = (header, props) => {
  return {
    componentPath: "Typography",
    props: {
      variant: "headline",
      ...props
    },
    children: {
      // [header]: getLabel(header)
      key: getLabel(header)
    }
  };
};

export const getCommonTitle = (header, props = {}) => {
  return getCommonHeader(header, { variant: "title", ...props });
};

export const getCommonSubHeader = (header, props = {}) => {
  return getCommonHeader(header, { variant: "subheading", ...props });
};

export const getCommonParagraph = (paragraph, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        color: "rgba(0, 0, 0, 0.60)",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        marginBottom: "12px"
      },
      ...props
    },
    children: {
      [paragraph]: getLabel(paragraph)
    }
  };
  // getCommonHeader(paragraph, { variant: "body1", ...props });
};

export const getCommonCaption = (paragraph, props = {}) => {
  return getCommonHeader(paragraph, { variant: "caption", ...props });
};

export const getCommonValue = (value, props = {}) => {
  return getCommonHeader(value, { variant: "body2", ...props });
};

export const getCommonCard = (children, cardProps = {}) => {
  return {
    componentPath: "Card",
    props: {
      ...cardProps
    },
    children: {
      cardContent: {
        componentPath: "CardContent",
        children
      }
    }
  };
};

export const getCommonCardWithHeader = (
  children,
  header = {},
  cardProps = {}
) => {
  return getCommonCard({
    cardContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: appCardHeaderStyle()
          },
          children: header,
          gridDefination: {
            xs: 12
          }
        },
        body: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children,
          gridDefination: {
            xs: 12
          }
        }
      }
    }
  });
};

export const getCommonGrayCard = children => {
  return getCommonCard(children, {
    style: {
      backgroundColor: "rgb(242, 242, 242)",
      boxShadow: "none",
      borderRadius: 0,
      overflow: "visible"
    }
  });
};

export const getBreak = (props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Break",
    props
  };
};

export const getLabel = (label, labelKey, props = {}) => {
  return {
    uiFramework: "custom-containers",
    componentPath: "LabelContainer",
    props: {
      ...label,
      ...props
    }
  };
};


export const getLogo = (props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Images",
    props
  };
};

export const getSelectField = selectScheama => {
  return getTextField({
    ...selectScheama,
    props: { select: true, ...selectScheama.props }
  });
};

export const getDateField = dateScheama => {
  return getTextField({
    ...dateScheama,
    props: {
      type: "date",
      ...dateScheama.props
    }
  });
};

export const getTimeField = timeScheama => {
  return getTextField({
    ...timeScheama,
    props: {
      type: "time",
      ...timeScheama.props
    }
  });
};

export const getDateTimeField = dateTimeScheama => {
  return getTextField({
    ...dateTimeScheama,
    props: {
      type: "datetime-local",
      ...dateTimeScheama.props
    }
  });
};

export const getTextField = textScheama => {
  const {
    label = {},
    placeholder = {},
    localePrefix = {},
    required = false,
    pattern,
    jsonPath = "",
    sourceJsonPath = "",
    data = [],
    optionValue = "code",
    optionLabel = "code",
    iconObj = {},
    gridDefination = {
      xs: 12,
      sm: 6
    },
    props = {},
    minLength,
    maxLength,
    minValue,
    maxValue,
    infoIcon,
    title = {},
    errorMessage = "",
    requiredMessage = "",
    ...rest
  } = textScheama;
  return {
    uiFramework: "custom-containers",
    componentPath: "TextFieldContainer",
    props: {
      label,
      InputLabelProps: {
        shrink: true
      },
      placeholder,
      localePrefix,
      fullWidth: true,
      required,
      data,
      optionValue,
      optionLabel,
      sourceJsonPath,
      jsonPath,
      iconObj,
      title,
      infoIcon,
      errorMessage,
      ...props
    },
    gridDefination,
    required,
    pattern,
    jsonPath,
    minLength,
    maxLength,
    minValue,
    maxValue,
    errorMessage,
    requiredMessage,
    ...rest
  };
};

export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const getCheckBoxwithLabel = (
  label,
  gridDefination = {
    xs: 12,
    sm: 12
  },
  props = {}
) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination,
    props,
    children: {
      div: {
        uiFramework: "material-ui",
        componentPath: "Checkbox",
        props: {
          color: "primary"
        }
      },
      label: getLabel(label)
    }
  };
};

export const getRadiobuttonwithLabel = (label, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props,
    children: {
      div: {
        uiFramework: "material-ui",
        componentPath: "Radio",
        props: {
          color: "primary"
        }
      },
      label: getLabel(label)
    }
  };
};

export const getRadiobuttonGroup = (
  labels,
  gridDefination = {
    xs: 12,
    sm: 12
  }
) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    gridDefination,
    children:
      labels &&
      labels.map(label => {
        return getRadiobuttonwithLabel(label);
      })
  };
};

export const getRadioButton = (buttons, jsonPath, defaultValue) => {
  return {
    uiFramework: "custom-containers",
    componentPath: "RadioGroupContainer",
    gridDefination: {
      xs: 12,
      sm: 4
    },

    props: {
      buttons,
      jsonPath,
      defaultValue
    }
  };
};

export const getCommonContainer = (children, props = {}) => {
  return {
    componentPath: "Grid",
    props: {
      container: true,
      ...props
    },
    children
  };
};

export const getDivider = (props = {}) => {
  return {
    componentPath: "Divider",
    props
  };
};

export const dispatchMultipleFieldChangeAction = (
  screenKey,
  actionDefination = [],
  dispatch
) => {
  for (var i = 0; i < actionDefination.length; i++) {
    const { path, property, value } = actionDefination[i];
    dispatch(handleField(screenKey, path, property, value));
  }
};

export const getLabelWithValue = (label, value, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 6,
      sm: 3
    },
    props: {
      style: {
        marginBottom: "16px"
      },
      ...props
    },
    children: {
      label: getCommonCaption(label),
      value: getCommonValue(value)
    }
  };
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

export const getTabs = (list, props = {}) => {
  return {
    uiFramework: "material-ui",
    componentPath: "Tabs",
    props,
    children:
      list &&
      list.map(element => {
        return getTab(element);
      })
  };
};

export const getTab = (label, props = {}) => {
  return {
    uiFramework: "material-ui",
    componentPath: "Tab",
    props: {
      label,
      ...props
    }
  };
};

export const getPattern = type => {
  switch (type) {
    case "Name":
      return /^[a-zA-Z&)(\\\/-\s\,\.\-\’\`\,\']{1,50}$/i;
    case "MobileNo":
      return /^[6789][0-9]{9}$/i;
    case "Amount":
      return /^[0-9]{0,9}$/i;
    case "Email":
      return /^(?=^.{1,64}$)((([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/i;
    case "Address":
      return /^[<>()\-+_\|\[\]\\.,;:\s$*@'"\/#%& 0-9A-Za-z]{1,500}$/i;
    case "PAN":
      return /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/i;
    case "TradeName":
      return /^[a-zA-Z0-9\s()!-@#&.,?/]{1,100}$/i;
    case "Date":
      return /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/i;
    case "UOMValue":
      return /^(0)*[1-9][0-9]{0,3}$/i;
    case "OperationalArea":
      return /^(0)*[1-9][0-9]{0,6}$/i;
    case "NoOfEmp":
      return /^(0)*[1-9][0-9]{0,2}$/i;
    case "GSTNo":
      return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/i;
    case "DoorHouseNo":
      return /^[a-zA-Z0-9&)(\\\/-\s,#]{1,50}$/i;
    case "BuildingStreet":
      return /^[a-zA-Z0-9\s()-@#&.,?/]{1,100}$/i;
    case "Pincode":
      return /^[1-9][0-9]{5}$/i;
    case "PropertyID":
      return /^[a-zA-z0-9\s\\/\-]$/i;
    case "ElectricityConnNo":
      return /^[0-9]{15}$/i;
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



export const ifUserRoleExists = role => {
  let userInfo = JSON.parse(getUserInfo());
  const roles = get(userInfo, "roles");
  const roleCodes = roles ? roles.map(role => role.code) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

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
