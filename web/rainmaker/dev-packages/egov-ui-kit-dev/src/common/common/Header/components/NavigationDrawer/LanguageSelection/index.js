import React, { Component } from "react";
import { ButtonGroup } from "components";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";

class LanguageSelection extends Component {
  state = {
    value: getLocale(),
  };

  onClick = (value) => {
    this.setState({ value });
    this.props.fetchLocalizationLabel(value);
  };

  languages = [
    {
      label: "ENGLISH",
      value: "en_IN",
    },
    {
      label: "हिंदी",
      value: "hi_IN",
    },
    {
      label: "ਪੰਜਾਬੀ",
      value: "pn_IN",
    },
  ];

  styles = {
    selectedLabelStyle: {
      color: "#ffffff",
    },
    selectedStyle: {
      backgroundColor: "#fe7a51",
      border: "1px solid #fe7a51",
    },
    defaultStyle: {
      border: "1px solid #484848",
      borderRadius: "1px",
      marginRight: "4.65%",
      height: "30px",
      lineHeight: "30px",
      width: "28.48%",
      minWidth: "inherit",
      padding: 0,
    },
    defaultLabelStyle: {
      textTransform: "none",
      fontWeight: "500",
      color: "#484848",
      verticalAlign: "initial",
      padding: 0,
    },
  };

  render() {
    const { styles, languages, onClick } = this;
    const { value } = this.state;
    return (
      <div className="drawer-button-toggle-container">
        <ButtonGroup
          items={languages}
          onClick={onClick}
          selected={value}
          defaultStyle={styles.defaultStyle}
          defaultLabelStyle={styles.defaultLabelStyle}
          selectedStyle={styles.selectedStyle}
          selectedLabelStyle={styles.selectedLabelStyle}
          multiple={false}
        />
      </div>
    );
  }
}

export default LanguageSelection;
