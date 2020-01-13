import React from "react";
import PropTypes from "prop-types";
import TextField from "../TextField";

const containerStyle = {
  position: "relative",
  display: "inline-block",
  width: "100%",
  boxSizing: "border-box",
};

const textFieldBaseStyle = {
  textIndent: 35,
};

const prefixBaseStyle = {
  position: "absolute",
  color: "#969696",
  zIndex: 2,
  top: 35,
  paddingRight: 5,
  borderRight: "1px solid #eee",
};

const floatingLabelStyle = {
  left: -35,
};

const MobileNumberField = ({ className, textFieldStyle = {}, prefix = "+91", prefixStyle = {}, ...textFieldProps }) => {
  return (
    <div style={containerStyle}>
      <div style={{ ...prefixBaseStyle, ...prefixStyle }}>{prefix}</div>
      <TextField
        className={`mobile-number-field ${className}`}
        id="mobile-number-field"
        name="mobile-number-field"
        errorStyle={{ marginLeft: "-35px" }}
        style={{ ...textFieldBaseStyle, ...textFieldStyle }}
        {...textFieldProps}
        floatingLabelStyle={floatingLabelStyle}
        type="number"
      />
    </div>
  );
};

MobileNumberField.propTypes = {
  textFieldStyle: PropTypes.object,
  prefixStyle: PropTypes.object,
  prefix: PropTypes.string,
};

export default MobileNumberField;
