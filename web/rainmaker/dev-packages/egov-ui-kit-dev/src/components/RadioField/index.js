import React from "react";
import Label from "egov-ui-kit/utils/translationNode";
import PropTypes from "prop-types";

const styles = {
    labelStyle: {
      font: "12px",
      letterSpacing: 0.6,
      marginBottom: 5,
      marginTop: 14,
    },
  
    radioButtonItemStyle: {
      marginBottom: "18px",
      paddingLeft: "2px",
      height: "16px",
    },
    selectedLabelStyle: {
      color: "#00bbd3",
    },
    radioButtonLabelStyle: {
      lineHeight: 1,
      marginBottom: 8,
    },
    iconStyle: {
      width: 16,
      height: 27,
    },
  };

  
const RadioField = ({floatingLabelText,id, ...textFieldProps}) => {
  return (
    // <Tooltip id={id} title={<Label label={title} color="#fff" fontSize="12px" />} placement={placement || "right"} PopperProps={PopperProps}>
    //   <Icon color="disabled" style={{ fontSize: 24 }}>
    //     <InfoIcon />
    //   </Icon>
    // </Tooltip>
<div className="col-sm-6">
              <Label label={floatingLabelText}  fontSize={12} labelStyle={styles.labelStyle} bold={true} />
              <RadioButton
                id={id} 
                name={id}
                {...textFieldProps}
                // radioButtonItemStyle={styles.radioButtonItemStyle}
                // labelStyle={styles.radioButtonLabelStyle}
                // selectedLabelStyle={styles.selectedLabelStyle}
                // className={`radio-button-${props.floatingLabelText}`}
                // iconStyle={styles.iconStyle}
                // valueSelected={'true'}
                // // disabled={disabled}
                // radioButtonItemStyle={styles.childrenStyle}
                // // {...props}
                
              />
            </div>



  );
};
RadioField.propTypes = {
  
    options: PropTypes.array,
    required: PropTypes.bool,
    floatingLabelText: PropTypes.string,
    
  };
export default RadioField;


/* 
// floatingLabelText
return
<div className="col-sm-6">
              <Label label={"PT_FORM3_GENDER"} required fontSize={12} labelStyle={styles.labelStyle} bold={true} />
              <RadioButton
                id="gender-selection"
                name="gender-selection"
                options={options}
                handleChange={(e) => {
                  handleFieldChange("ownerGender", e.target.value);
                }}
                radioButtonItemStyle={styles.radioButtonItemStyle}
                labelStyle={styles.radioButtonLabelStyle}
                selectedLabelStyle={styles.selectedLabelStyle}
                className="owner-gender-selection"
                iconStyle={styles.iconStyle}
                valueSelected={genderSelected}
                disabled={disabled}
                radioButtonItemStyle={styles.childrenStyle}
              />
            </div> */