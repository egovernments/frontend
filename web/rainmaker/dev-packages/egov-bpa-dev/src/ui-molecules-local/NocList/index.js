import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  handleFileUpload,
  getTransformedLocale
} from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadSingleFile } from "../../ui-molecules-local";
import Typography from "@material-ui/core/Typography";

const themeStyles = theme => ({
  documentContainer: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentSubCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: "1px"
  },
  documentIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px"
  },
  documentSuccess: {
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39CB74",
    color: "white"
  },
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  },
  iconDiv: {
    display: "flex",
    alignItems: "center"
  },
  descriptionDiv: {
    alignItems: "center",
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    minWidth: 250,
    padding: "0px"
  },
  fileUploadDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "5px"
  }
});

const styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
};

const requiredIcon = (
  <sup style={{ color: "#5b5b5b", fontSize: "12px", paddingLeft: "5px" }}>*</sup>
);

class NocList extends Component {
  state = {
    uploadedDocIndex: 0,
    nocDocumentsUpload: []
  };

  componentDidMount = () => {
    const {
      documentsList,
      prepareFinalObject
    } = this.props;
    let index = 0;
    let { nocDocumentsUpload } = this.state;

    documentsList.forEach(docType => {
      docType.cards &&
        docType.cards.forEach(card => {
          if (card.subCards) {
            card.subCards.forEach(subCard => {

              nocDocumentsUpload[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };

            });
          } else {

            nocDocumentsUpload[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropDownValues
                ? card.dropDownValues.required
                : false
            };
            // }
          }
          index++;

        });
    });

    this.setState({ ...this.state, nocDocumentsUpload });

  };

  prepareDocumentsInEmployee = async (nocDocuments, bpaDetails) => {

    let documnts = nocDocuments;

    let indexJsonPath = this.props.jsonPath ? parseInt(this.props.jsonPath.split('[')[1].substring(0, 1)) : 0;

    let requiredDocuments = [], finalQstn = [];
    if (documnts && documnts.length > 0) {
      documnts.forEach(documents => {
        let doc = {}, finalDocs = [];
        if (documents && documents.dropDownValues && documents.dropDownValues.value) {

          doc.documentType = documents.dropDownValues.value;
        }
        if (documents.documents) {
          doc.fileStoreId = documents.documents[0].fileStoreId;
          doc.fileStore = documents.documents[0].fileStoreId;
          doc.fileName = documents.documents[0].fileName;
          doc.fileUrl = documents.documents[0].fileUrl;
          if (documents.documents[0].id) {
            doc.id = docs.id;
          }
        }
        if (Object.keys(doc).length !== 0)
          finalQstn.push(doc);
      });


      if (bpaDetails.additionalDetails && bpaDetails.additionalDetails.fieldinspection_pending && bpaDetails.additionalDetails.fieldinspection_pending[0]) {
        if (bpaDetails.additionalDetails.fieldinspection_pending[indexJsonPath]) {

          bpaDetails.additionalDetails.fieldinspection_pending[indexJsonPath].docs = finalQstn
        } else {
          bpaDetails.additionalDetails.fieldinspection_pending.push({ "docs": finalQstn, "question": [] })
        }
      }
      else {
        bpaDetails.additionalDetails = bpaDetails.additionalDetails ? bpaDetails.additionalDetails : [];
        let documnt = [], fiDocs = [], details;
        documnt[0] = {};
        documnt[0].docs = finalQstn;
        documnt[0].questions = [];


        fiDocs.push({
          "docs": documnt[0].docs,
          "questions": []
        })
        details = { "fieldinspection_pending": fiDocs };

        let additionalDetailsDocs = {
          ...bpaDetails.additionalDetails,
          fieldinspection_pending: fiDocs
        }
        bpaDetails.additionalDetails = additionalDetailsDocs;
      }


      if (bpaDetails.additionalDetails && bpaDetails.additionalDetails["fieldinspection_pending"] && bpaDetails.additionalDetails["fieldinspection_pending"][indexJsonPath] && bpaDetails.additionalDetails["fieldinspection_pending"][indexJsonPath].docs) {
        prepareFinalObject("BPA", bpaDetails.additionalDetails["fieldinspection_pending"][indexJsonPath].docs);
      }

    }
  }
  distinct = (value, index, self) => {
    return self.indexOf(value) === index
  };

  onUploadClick = uploadedDocIndex => {
    this.setState({ ...this.state, uploadedDocIndex });
  };

  handleDocument = async (file, fileStoreId) => {

    let { uploadedDocIndex, nocDocumentsUpload } = this.state;
    const { prepareFinalObject, bpaDetails } = this.props;
    const fileUrl = getFileUrlFromAPI(fileStoreId).then(fileUrl);
    let nocDocuments = {};

    if (nocDocumentsUpload[uploadedDocIndex] && nocDocumentsUpload[uploadedDocIndex].documents) {
      nocDocumentsUpload[uploadedDocIndex].documents.push({
        fileName: file.name,
        fileStoreId,
        fileUrl: Object.values(fileUrl)[0]
      });
      nocDocuments = [
        ...nocDocumentsUpload
      ];
    } else {

      nocDocuments = [
        ...nocDocumentsUpload
      ];
      nocDocuments[uploadedDocIndex].documents = [
        {
          fileName: file.name,
          fileStoreId,
          fileUrl: Object.values(fileUrl)[0]
        }
      ];
    }



    this.setState({ ...this.state, nocDocumentsUpload: nocDocuments });

    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true

    if (isEmployee) {
      this.prepareDocumentsInEmployee(nocDocuments, bpaDetails);
    }

  };

  removeDocument = (remDocIndex, docIndex) => {
    let { nocDocumentsUpload } = this.state;
    const { prepareFinalObject, bpaDetails } = this.props;
    for (let key in nocDocumentsUpload) {
      if (key === `${remDocIndex}`) {
        nocDocumentsUpload[key].documents.splice(docIndex, 1);
      }
    }

    this.setState({ ...this.state, nocDocumentsUpload });
    this.forceUpdate();
    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true
    if (isEmployee) {
      this.prepareDocumentsInEmployee(nocDocumentsUpload, bpaDetails);
    }
  };

  handleChange = (key, event) => {
    let { nocDocumentsUpload } = this.state;
    const { prepareFinalObject, bpaDetails } = this.props;

    let nocDocuments = [
      ...nocDocumentsUpload];

    nocDocuments[key].dropDownValues = { value: event.target.value };

    this.setState({ ...this.state, nocDocumentsUpload: nocDocuments });


    let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true

    if (isEmployee) {
      this.prepareDocumentsInEmployee(nocDocuments, bpaDetails);
    }

  };

  getUploadCard = (card, key) => {

    let { nocDocumentsUpload } = this.state;
    const { classes, jsonPath } = this.props;

    let jsonPathNew = `${jsonPath}[${key}].documentType`;

    return (
      <Grid container={true}>
        <Grid item={true} xs={2} sm={1} className={classes.iconDiv}>
          {nocDocumentsUpload[key] && nocDocumentsUpload[key].documents && nocDocumentsUpload[key].documents.length ? (
            <div className={classes.documentSuccess}>
              <Icon>
                <i class="material-icons">done</i>
              </Icon>
            </div>
          ) : (
              <div className={classes.documentIcon}>
                <span>{key + 1}</span>
              </div>
            )}
        </Grid>
        <Grid
          item={true}
          xs={10}
          sm={5}
          md={4}
          align="left"
          className={classes.descriptionDiv}
        >
          <LabelContainer
            labelKey={getTransformedLocale(card.name)}
            style={styles.documentName}
          />
          {card.required && requiredIcon}
          <Typography variant="caption">
            <LabelContainer
              labelKey={getTransformedLocale("TL_UPLOAD_RESTRICTIONS")}
            />
          </Typography>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={4}>
          {card.dropDownValues && (
            <TextFieldContainer
              select={true}
              label={{ labelKey: getTransformedLocale(card.dropDownValues.label) }}
              placeholder={{ labelKey: card.dropDownValues.label }}
              data={card.dropDownValues.menu}
              optionValue="code"
              optionLabel="label"
              required={card.required}
              onChange={event => this.handleChange(key, event)}
              jsonPath={jsonPathNew}
            />
          )}
        </Grid>
        <Grid
          item={true}
          xs={12}
          sm={12}
          // md={4}
          className={classes.fileUploadDiv}
        >
          <UploadSingleFile
            classes={this.props.classes}
            handleFileUpload={e =>
              handleFileUpload(e, this.handleDocument, this.props)
            }
            uploaded={
              nocDocumentsUpload[key] && nocDocumentsUpload[key].documents && nocDocumentsUpload[key].documents.length > 0
                ? true
                : false
            }
            removeDocument={() => this.removeDocument(key)}
            documents={
              nocDocumentsUpload[key] && nocDocumentsUpload[key].documents
            }
            onButtonClick={() => this.onUploadClick(key)}
            inputProps={this.props.inputProps}
            buttonLabel={this.props.buttonLabel}
            id={`noc-${key + 1}`}
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, documentsList } = this.props;
    let index = 0;
    return (
      <div>
        {documentsList &&
          documentsList.map(container => {
            return (
              <div>
                <LabelContainer
                  labelKey={getTransformedLocale(container.title)}
                  style={styles.documentTitle}
                />
                {container.cards.map(card => {
                  return (
                    <div className={classes.documentContainer}>
                      {card.hasSubCards && (
                        <LabelContainer
                          labelKey={card.name}
                          style={styles.documentTitle}
                        />
                      )}
                      {card.hasSubCards &&
                        card.subCards.map(subCard => {
                          return (
                            <div className={classes.documentSubCard}>
                              {this.getUploadCard(subCard, index++)}
                            </div>
                          );
                        })}
                      {!card.hasSubCards && (
                        <div>{this.getUploadCard(card, index++)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

NocList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { moduleName } = screenConfiguration;

  const bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "BPA",
    {}
  )
  return { moduleName, bpaDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(themeStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NocList)
);
