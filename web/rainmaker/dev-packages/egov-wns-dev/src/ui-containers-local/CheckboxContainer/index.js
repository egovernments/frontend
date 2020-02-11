import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from '@material-ui/core/FormGroup';
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import "./index.css";

const styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  formControl: {
    marginTop: 0,
    paddingBottom: 0
  },
  group: {
    display: "inline-block",
    margin: 0
  },
  checked: {},
  radioRoot: {
    marginBottom: 12
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.56
  }
};

class CheckboxLabels extends React.Component {
  state = { checkedSewerage: false, checkedWater: true }

  handleWater = name => event => {
    const { jsonPathWater, approveCheck, onFieldChange } = this.props;
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.checkedWater) {
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize",
          "visible",
          true
        );
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps",
          "visible",
          true
        );
        if (this.state.checkedSewerage) {
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets",
            "visible",
            true
          );
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets",
            "visible",
            true
          );
        } else {
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets",
            "visible",
            false
          );
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets",
            "visible",
            false
          );
        }
      } else {
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize",
          "visible",
          false
        );
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps",
          "visible",
          false
        );
      }
      approveCheck(jsonPathWater, this.state.checkedG)
    });
  };

  handleSewerage = name => event => {
    const { jsonPathSewerage, approveCheck, onFieldChange } = this.props;
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.checkedSewerage) {
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets",
          "visible",
          true
        );
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets",
          "visible",
          true
        );
        if (!this.state.checkedWater) {
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize",
            "visible",
            false
          );
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps",
            "visible",
            false
          );
        } else {
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.pipeSize",
            "visible",
            true
          );
          onFieldChange(
            "apply",
            "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfTaps",
            "visible",
            true
          );
        }
      } else {
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfToilets",
          "visible",
          false
        );
        onFieldChange(
          "apply",
          "components.div.children.formwizardFirstStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.numberOfWaterClosets",
          "visible",
          false
        );
      }
      approveCheck(jsonPathSewerage, this.state.checkedSewerage)
    });
  }

  render() {
    const { classes, label, buttons, defaultValue, value, fieldValue, required } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl} required={required}>
          <FormLabel className={classes.formLabel}>
            <LabelContainer className={classes.formLabel} labelKey="WS_APPLY_FOR" />
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              classes={{ label: "checkbox-button-label" }}
              control={
                <Checkbox
                  checked={this.state.checkedWater}
                  onChange={this.handleWater("checkedWater")}
                  classes={{ root: classes.radioRoot, checked: classes.checked }}
                  color="primary"
                />}
              label={<LabelContainer labelKey="WS_APPLY_WATER" />}
            />
            <FormControlLabel
              classes={{ label: "checkbox-button-label" }}
              control={
                <Checkbox
                  checked={this.state.checkedSewerage}
                  onChange={this.handleSewerage("checkedSewerage")}
                  classes={{ root: classes.radioRoot, checked: classes.checked }}
                  color="primary"
                />}
              label={<LabelContainer labelKey="WS_APPLY_SEWERAGE" />}
            />
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  const { screenConfiguration } = state;
  const { jsonPathWater, jsonPathSewerage } = ownprops;
  const { preparedFinalObject } = screenConfiguration;
  return { preparedFinalObject, jsonPathWater, jsonPathSewerage };
};

const mapDispatchToProps = dispatch => {
  return { approveCheck: (jsonPath, value) => { dispatch(prepareFinalObject(jsonPath, value)); } };
};

CheckboxLabels.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CheckboxLabels));
