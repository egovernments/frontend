import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DocumentList from "../DocumentList";
import { connect } from "react-redux";
import get from "lodash/get";

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
    return <DocumentList { ...rest }  />;
  }
}
const  filterDropdownFunction = (rowObject, preparedFinalObject, filterConditon) => {
  if (!filterConditon) {
    return true;
  } else {
    if (filterConditon.parentArrayJsonPath) {
      let returnValue=false;
      const objectArray = get(preparedFinalObject, filterConditon.parentArrayJsonPath, []);
      objectArray.map(object => {
        if (rowObject.parentValue.includes(object[filterConditon.parentJsonpath])) {
          returnValue= true;
        }
      })
      return returnValue;
    }
    const objectValue = get(preparedFinalObject, filterConditon.parentJsonpath, '');
    if (rowObject.parentValue.includes(objectValue)) {
      return true;
    } else {
      return false;
    }
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
  let preparedFinalObject = get(state, 'common.prepareFormData', {})
  let ptDocumentsList = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsContract",
    []
  );
  ptDocumentsList.map(documentList => {
    documentList.cards.map(document => {
      if (document.code.includes("TRANSFERREASONDOCUMENT")) {
        document.dropdown.value = reasonForTransfer;
        document.dropdown.disabled = true;
      }
      document.dropdown.menu=document.dropdown.menu.filter(menu=>filterDropdownFunction(menu, preparedFinalObject, document.dropdownFilter));
    })
    documentList.cards = documentList.cards.filter(document => filterFunction(document, preparedFinalObject, document.filterCondition))
  })
  return { ptDocumentsList,preparedFinalObject };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(DocumentListContainer)
);
