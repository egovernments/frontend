import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { prepareFinalObject,toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";

//import "./index.css";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getLocalization, getLocale } from "egov-ui-kit/utils/localStorageUtils";

import {
  getTranslatedLabel,
  transformById
} from "../../ui-config/screens/specs/utils";

const styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    },
    marginTop:"-31px",
    marginRight: "-10px",
  },
  checked: {}
};



class CheckboxLabels extends React.Component {
  state = {
    checkedG: false
  };

 
 

  handleChange = name => event => {
    const { jsonPath, approveCheck } = this.props;
    this.setState({ [name]: event.target.checked }, () =>
      approveCheck(jsonPath, this.state.checkedG)
    );
  };

  render() {
    const { classes, content } = this.props;

    
    const localizationLabels = JSON.parse(getLocalization(`localization_${getLocale()}`));

    const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
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

    let transfomedKeys = transformById(localizationLabels, "code");
    let translatedLabel = getLocaleLabelsforTL(
      content.labelName,
      content.labelKey,
      transfomedKeys
    );
    

    return (
      <FormGroup row>
        <FormControlLabel
          classes={{ label: "checkbox-label" }}
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange("checkedG")}
              value={this.state.checkedG}
              classes={{
                root: classes.root,
                checked: classes.checked
              }}
            />
          }
          label={translatedLabel}
        />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { screenConfiguration } = state;
  const { jsonPath } = ownprops;
  const { preparedFinalObject } = screenConfiguration;
  return { preparedFinalObject, jsonPath };
};

const mapDispatchToProps = dispatch => {
  return {
    approveCheck: (jsonPath, value) => {
      dispatch(prepareFinalObject(jsonPath, value));   
    if(value) 
      {
      dispatch(
          handleField(
            "search-preview",
            "components.div.children.footer.children.container.children.rightdiv.children.editButton",
            "props.disabled",
            true
          )
        ); 
        dispatch(
          handleField(
            "search-preview",
            "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
            "props.disabled",
            false
          )
        );         
    } 
    else{
      /*  dispatch(
        handleField(
          "search-preview",
          "components.div.children.footer.children.container.children.rightdiv.children.submitButton",
          "props.disabled",
          false
        )
      ); 
     dispatch(
        handleField(
          "search-preview",
          "components.div.children.footer.children.container.children.rightdiv.children.editButton",
          "props.disabled",
          false
        )
      );  */
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please check the declaration box to proceed further with One Click Renewal option!",
            labelKey: "TL_RENEWAL_DECLARATION_ALTERT_MESSAGE"
          },
          "error"
        )
      );

   }
       
    }
  };
};

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckboxLabels)
);
