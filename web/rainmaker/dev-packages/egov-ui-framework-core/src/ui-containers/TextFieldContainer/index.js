import MenuItem from "@material-ui/core/MenuItem";
import { sortDropdownLabels } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import set from "lodash/set";
import React from "react";
import { connect } from "react-redux";
import { TextfieldWithIcon, Tooltip } from "../../ui-molecules";
import {
  appendModulePrefix, epochToYmd,
  getLocaleLabels
} from "../../ui-utils/commons";

class TextFieldContainer extends React.Component {
  componentDidMount() {
    const { hasDependant, onChange, value } = this.props;
    if (hasDependant && value) {
      onChange({ target: { value } });
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    let {
      value,
      data = [],
      index,
      errorMessage,
      error,
      disabled = false,
      locale
    } = this.props;
    let {
      value: valueNew,
      data: dataNew = [],
      index: indexNew,
      errorMessage: errorMessageNew,
      error: errorNew,
      disabled: disabledNew = false,
      locale: localeNew
    } = nextProps;

    if (locale != localeNew ||
      value != valueNew ||
      index != indexNew ||
      errorMessage != errorMessageNew ||
      error != errorNew ||
      disabled != disabledNew ||
      Array.isArray(data) != Array.isArray(dataNew) ||
      data.length != dataNew.length) {
      return true
    }
    return false
  }
  render() {
    let {
      label = {},
      placeholder = {},
      localePrefix = {},
      jsonPath,
      iconObj = {},
      value,
      dropdownData,
      data = [],
      optionValue = "code",
      optionLabel = "code",
      sourceJsonPath,
      index,
      componentJsonpath,
      hasLocalization,
      localizationLabels,
      state,
      infoIcon,
      dispatch,
      title,
      errorMessage,
      error,
      disabled = false,
      multiline = false,
      rows = "1",
      select,
      cityDropdown,
      autoSelect,
      preparedFinalObject,
      ...rest
    } = this.props;
    if (!isEmpty(iconObj) && iconObj.onClickDefination) {
      iconObj = {
        ...iconObj,
        onClick: () =>
          iconObj.onClickDefination.callBack(state, dispatch, {
            index,
            componentJsonpath
          })
      };
    }

    if (select) {
      const constructDropdown = dt => {
        return dt.map(d => {
          return {
            value: d[optionValue],
            label: d[optionLabel]
          };
        });
      };
      if (data && data.length > 0) {
        dropdownData = constructDropdown(data || []);
        // if autoSelect is true and dropDownData is one, then select the value by default
        if (data.length == 1 && autoSelect) {
          value = dropdownData[0].value;
          if (!get(preparedFinalObject, jsonPath)) {
            set(preparedFinalObject, jsonPath, value);
          }
        }
      } else if (sourceJsonPath) {
        dropdownData = constructDropdown(
          get(preparedFinalObject, sourceJsonPath, [])
        );
      } else if (cityDropdown) {
        dropdownData = constructDropdown(get(state, cityDropdown, []));
      }
    }

    let translatedLabel = getLocaleLabels(
      label.labelName,
      label.labelKey,
      localizationLabels
    );
    let translatedPlaceholder = getLocaleLabels(
      placeholder.labelName,
      placeholder.labelKey,
      localizationLabels
    );
    let translateddefaultErrorMsg = getLocaleLabels(
      "Invalid input",
      "ERR_DEFAULT_INPUT_FIELD_MSG",
      localizationLabels
    );
    errorMessage = error
      ? getLocaleLabels(
        translateddefaultErrorMsg,
        errorMessage,
        localizationLabels
      )
      : "";
    if (dropdownData.length > 0) {
      dropdownData = dropdownData.sort(sortDropdownLabels)
      return (
        <TextfieldWithIcon
          label={translatedLabel}
          disabled={disabled}
          placeholder={translatedPlaceholder}
          iconObj={iconObj}
          value={value ? value : translatedPlaceholder}
          {...rest}
          error={error}
          helperText={errorMessage}
        >
          <MenuItem value={translatedPlaceholder} disabled>
            <div className="select-field-placeholder">
              {translatedPlaceholder}
            </div>
          </MenuItem>
          {hasLocalization === false
            ? dropdownData.map((option, key) => (
              <MenuItem key={key} value={option.value}>
                {option.label}
              </MenuItem>
            ))
            : dropdownData.map((option, key) => (
              <MenuItem key={key} value={option.value}>
                {getLocaleLabels(
                  option.value,
                  localePrefix && !isEmpty(localePrefix)
                    ? appendModulePrefix(option.value, localePrefix)
                    : option.label,
                  localizationLabels
                )}
              </MenuItem>
            ))}
        </TextfieldWithIcon>
      );
    } else {
      return select ? (
        <div>
          <TextfieldWithIcon
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            iconObj={iconObj}
            value={value ? value : translatedPlaceholder}
            {...rest}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            error={error}
            helperText={errorMessage}
          >
            <MenuItem value={translatedPlaceholder} disabled>
              <div className="select-field-placeholder">
                {translatedPlaceholder}
              </div>
            </MenuItem>
          </TextfieldWithIcon>
          {title && !isEmpty(title) && infoIcon && (
            <Tooltip val={title} icon={infoIcon} />
          )}
        </div>
      ) : (
        <div>
          <TextfieldWithIcon
            label={translatedLabel}
            placeholder={translatedPlaceholder}
            iconObj={iconObj}
            value={
              this.props.type === "date" && !value
                ? translatedPlaceholder
                : value
            }
            {...rest}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            error={error}
            helperText={errorMessage}
          />
          {title && !isEmpty(title) && infoIcon && (
            <Tooltip val={title} icon={infoIcon} />
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownprops) => {
  const {
    jsonPath,
    value,
  } = ownprops;
  const { screenConfiguration, app } = state;
  const { localizationLabels, locale } = app;
  // const { preparedFinalObject } = screenConfiguration;
  let fieldValue = value === undefined ? get(screenConfiguration.preparedFinalObject, jsonPath) : value;
  // Convert epoch to YYYY-MM-DD and set date picker value
  if (ownprops.type && ownprops.type === "date")
    fieldValue = epochToYmd(fieldValue);
  let dropdownData = [];

  let disabled = ownprops.disabled;
  if (ownprops.checkFieldDisable) {
    let dependantJsonPath = ownprops.jsonPath;
    dependantJsonPath = dependantJsonPath.replace(ownprops.jsonPathRemoveKey, ownprops.dependantField)
    disabled = get(screenConfiguration.preparedFinalObject, dependantJsonPath, false)
  }
  return { value: fieldValue, dropdownData, state, localizationLabels, disabled, locale, preparedFinalObject:screenConfiguration.preparedFinalObject
   };
};

export default connect(mapStateToProps)(TextFieldContainer);
