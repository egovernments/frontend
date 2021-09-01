import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DocumentList from "../../ui-molecules-local/DocumentList";
import { connect } from "react-redux";
import get from "lodash/get";
console.log('tesiting----------');
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    // display: "none !important",
    //For QA Automation
    position: "absolute",
    right: 0
  }
});

class DocumentListContainer extends Component {

componentDidMount()
{
  console.log("cdm is calling ");
}



  render() {
    console.log("render method -------");
    const { uploadedDocuments, ...rest } = this.props;
    return <DocumentList uploadedDocsInRedux={uploadedDocuments} {...rest} />;
  }
}

const mapStateToProps = state => {
  console.log("hiiiiiiii",state);
  const { screenConfiguration } = state;
  const documents = get(
    screenConfiguration.preparedFinalObject,
    "NodTemp[0].applicationDocuments",
    []
  );
  const uploadedDocuments = get(
    screenConfiguration.preparedFinalObject,
    "NodTempTemp[0].uploadedDocsInRedux",
    {}
  );
  const tenantId = get(
    screenConfiguration.preparedFinalObject,
    "NodTemp[0].tenantId",
    ""
  );
  const { preparedFinalObject } = screenConfiguration || {};
  console.log("hiiiiiiii");
  return { documents, tenantId, uploadedDocuments, preparedFinalObject };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(DocumentListContainer)

);
