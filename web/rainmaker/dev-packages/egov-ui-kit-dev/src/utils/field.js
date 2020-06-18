import React from "react";
import { TextField, MobileNumberField, SingleCheckbox, DropDown, Label, TextFieldIcon, AutoSuggestDropdown } from "components";
import { LABELS } from "./constants";
import { AutosuggestContainer } from "egov-ui-framework/ui-containers";

const Field = ({ fieldKey, handleFieldChange, field = {}, onTextFieldIconClick, ...rest }) => {
  const renderField = () => {
    const { type, tooltip, label, hideField, Icon, iconRedirectionURL, ...fieldProps } = field;
    if(fieldProps.dropDownData && fieldProps.dropDownData.length > 0) {
      fieldProps.dropDownData.map((data,key)=>{
        fieldProps.dropDownData[key].code = data.value;
        fieldProps.dropDownData[key].name = data.label;
      });
    }
    if (hideField) return null;
    switch (type) {
      case "textfield":
      case "textarea":
        return <TextField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} multiLine={type === "textarea"} />;
      case "mobilenumber":
        return <MobileNumberField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "number":
      case "password":
        return <TextField {...rest} {...fieldProps} type={type} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "checkbox":
        return (
          <SingleCheckbox {...rest} {...fieldProps} style={{ marginTop: "27px" }} onCheck={(e) => handleFieldChange(fieldKey, e.target.checked)} />
        );
      case "label":
        return <Label {...rest} {...fieldProps} />;
      case "singleValueList":
        return (
          <DropDown
            {...rest}
            {...fieldProps}
            dropDownData={fieldProps.dropDownData || []}
            onChange={(e, value, selectedValue) => handleFieldChange(fieldKey, selectedValue)}
          />
        );
      case "textFieldIcon":
        return (
          <TextFieldIcon
            iconPosition="right"
            Icon={Icon}
            {...fieldProps}
            {...rest}
            onIconClick={
              iconRedirectionURL
                ? () => {
                    window.open(iconRedirectionURL);
                  }
                : () => onTextFieldIconClick()
            }
            onChange={(e, value) => handleFieldChange(fieldKey, value)}
          />
        );
      case "autoSuggestDropdown":
        return (
          <AutoSuggestDropdown
            {...rest}
            {...fieldProps}
            dataSource={fieldProps && fieldProps.dropDownData}
            onChange={(chosenRequest, index) => {
              handleFieldChange(fieldKey, chosenRequest.value);
            }}
          />
        );

        case "AutocompleteDropdown":
        return (
          <AutosuggestContainer
            id={fieldProps.id}
            type={fieldProps.type}
            required={fieldProps.required}
            jsonPath={fieldProps.jsonPath}
            localePrefix={fieldProps.localePrefix}
            data={fieldProps && fieldProps.dropDownData}
            className="autocomplete-dropdown"
            label={{labelKey: fieldProps.floatingLabelText }}
            placeholder={{labelKey: fieldProps.hintText}}
            labelsFromLocalisation={fieldProps.labelsFromLocalisation}
            gridDefination={fieldProps.gridDefination}
            toolTip={fieldProps.toolTip}
            toolTipMessage={fieldProps.toolTipMessage}
            boundary={fieldProps.boundary}
            errorMessage={fieldProps.errorMessage}
            errorStyle={fieldProps.errorStyle}
            pattern={fieldProps.pattern}
            onChange={(chosenRequest, index) => {
              handleFieldChange(fieldKey, chosenRequest.target.value, fieldProps.jsonPath);
            }}
          />
        );

      default:
        return null;
    }
  };

  return renderField();
};

export default Field;
