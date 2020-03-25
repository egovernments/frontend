import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DocumentList } from "../../ui-molecules-local";
import { connect } from "react-redux";
import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none !important"
  }
});

class DocumentListContainer extends Component {
  render() {
    const { ...rest } = this.props;
    return <DocumentList {...rest} />;
  }

}

const filterFunction = (rowObject, preparedFinalObject, filterConditon) => {
  if (!filterConditon) {
    return true;
  } else {
    if (filterConditon.onArray) {
      let returnValue=false;
      const objectArray = get(preparedFinalObject, filterConditon.jsonPath, []);
      objectArray.map(object => {
        if (!filterConditon.filterValue.includes(object[filterConditon.arrayAttribute])) {
          returnValue= true;
        }
      })
      return returnValue;
    }
    const objectValue = get(preparedFinalObject, filterConditon.jsonPath, '');
    if (!filterConditon.filterValue.includes(objectValue)) {
      return true;
    } else {
      return false;
    }
  }
}
const mapStateToProps = state => {
  let preparedFinalObject = get(state, 'screenConfiguration.preparedFinalObject', {})
  const reasonForTransfer = get(preparedFinalObject, 'Property.additionalDetails.reasonForTransfer', '');
  let documentsList = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsContract",
    []
  );
  documentsList.map(documentList => {
    documentList.cards.map(document => {
      if (document.code.includes("TRANSFERREASONDOCUMENT")) {
        document.dropdown.value = reasonForTransfer;
        document.dropdown.disabled = true;
      }
    })
    documentList.cards = documentList.cards.filter(document => filterFunction(document, preparedFinalObject, document.filterCondition))
  })
  return { documentsList, preparedFinalObject };
};
const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) => {
      dispatch(prepareFinalObject(jsonPath, value));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DocumentListContainer)
);
