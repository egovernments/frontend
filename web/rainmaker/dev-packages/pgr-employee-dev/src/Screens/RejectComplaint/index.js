import React, { Component } from "react";
import { connect } from "react-redux";
import formHOC from "egov-ui-kit/hocs/form";
import { Screen } from "modules/common";
import RejectComplaintForm from "./components/RejectComplaintForm";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { localStorageGet , getLocalization} from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import "./index.css";

const RejectComplaintHOC = formHOC({
  formKey: "rejectComplaint",
  isCoreConfiguration: true,
  path: "pgr/pgr-employee"
})(RejectComplaintForm);

class RejectComplaint extends Component {
  state = {
    valueSelected: "",
    commentValue: ""
  };
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([
      { key: "serviceRequestId", value: match.params.serviceRequestId }
    ]);
  }

  options = [
    {
      value: "ES_REASSIGN_OPTION_ONE",
      label: <Label label="ES_REASSIGN_OPTION_ONE" />
    },
    {
      value: "ES_REJECT_OPTION_TWO",
      label: <Label label="ES_REJECT_OPTION_TWO" />
    },
    // { value: "Operation already underway", label: <Label label="ES_REJECT_OPTION_THREE" /> },
    { value: "ES_REJECT_OPTION_FOUR", label: <Label label="ES_REJECT_OPTION_FOUR" /> }
  ];

  commentsValue = {};

  handleCommentsChange = (e, value) => {
    this.commentsValue.textVal = e.target.value;
    this.setState({
      commentValue: e.target.value
    });
    this.concatComments(this.commentsValue);
    //this.concatComments({textVal:e.target.value, radioValue:this.commentsValue.radioValue});
  };
  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
    this.commentsValue.radioValue = value;
    this.concatComments(this.commentsValue);
  };
  concatComments = val => {
    let com1 = "";
    let com2 = "";
    if (val.radioValue) {
      let initialValue = val.radioValue;
      let localisationStoreKey = localStorageGet("locale") === "hi_IN" ? "localization_hi_IN":"localization_en_IN"
      let allLocalizationValues = JSON.parse(getLocalization(localisationStoreKey));
      let localizedValue = jp.query(allLocalizationValues,"$[?(@.code=='"+initialValue+"')]")
      if(localizedValue && localizedValue.length > 0 && localizedValue[0].message)
      {
        com1 = localizedValue[0].message + ";";
      }
    }
    if (val.textVal) {
      com2 = val.textVal;
    }
    let concatvalue = com1 + com2;
    this.props.handleFieldChange("rejectComplaint", "comments", concatvalue);
  };

  onSubmit = e => {
    const { valueSelected, commentValue } = this.state;
    const { toggleSnackbarAndSetText } = this.props;
    if (!valueSelected || (valueSelected === "Other" && !commentValue)) {
      e.preventDefault();
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Please mention your reason",
          labelKey: "ERR_PLEASE_MENSION_YOUR_REASON"
        },
        "error"
      );
    }
  };

  render() {
    const { handleCommentsChange, handleOptionsChange, onSubmit } = this;
    const { valueSelected, commentValue } = this.state;

    return (
      <Screen className="background-white">
        <RejectComplaintHOC
          options={this.options}
          ontextAreaChange={handleCommentsChange}
          handleOptionChange={handleOptionsChange}
          optionSelected={valueSelected}
          commentValue={commentValue}
          onSubmit={onSubmit}
        />
      </Screen>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchComplaints: criteria => dispatch(fetchComplaints(criteria)),
    handleFieldChange: (formKey, fieldKey, value) =>
      dispatch(handleFieldChange(formKey, fieldKey, value)),
    toggleSnackbarAndSetText: (open, message, error) =>
      dispatch(toggleSnackbarAndSetText(open, message, error))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RejectComplaint);
