import React from "react";
// import moment from 'moment';
import { TextField, MobileNumberField, SingleCheckbox, DropDown,DatePicker, Label, TextFieldIcon, AutoSuggestDropdown } from "components";
import { convertLocalDate } from "./commons";
import ReactSelectDropdown from "egov-ui-kit/components/ReactSelectDropdown";

const Field = ({ fieldKey, handleFieldChange, field = {}, onTextFieldIconClick, ...rest }) => {
  const renderField = () => {
    const { type, tooltip, label, hideField, Icon, iconRedirectionURL, ...fieldProps } = field;
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
        case "SelectDropDown":
          return (
            <ReactSelectDropdown
              {...rest}
              {...fieldProps}
              dropDownData={fieldProps.dropDownData || []}
              onChange={(e, value, selectedValue) =>
              {
        
                handleFieldChange(fieldKey, e.value)
              }
              }
            />
          );
        case "date":
          return (
            <DatePicker
            formatDate={(date) => convertLocalDate(date)}
            onChange={(e, value) => handleFieldChange(fieldKey,value)}
            autoOk={true}
            {...rest}
            {...fieldProps}


            />
          )
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
                : () => onTextFieldIconClick && onTextFieldIconClick()
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

      default:
        return null;
    }
  };

  return renderField();
};

export default Field;
