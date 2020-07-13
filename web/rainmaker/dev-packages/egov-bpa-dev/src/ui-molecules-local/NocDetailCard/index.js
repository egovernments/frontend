import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
// import "./index.css";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  handleFileUpload,
  getTransformedLocale,
} from "egov-ui-framework/ui-utils/commons";
// import MultiDocDetailCard from "../../ui-molecules-local/MultiDocDetailCard";
import NocDocDetailCard from "../../ui-molecules-local/NocDocDetailCard";
import UploadCard from "../../ui-molecules-local/UploadCard";
import {getLoggedinUserRole} from "../../ui-config/screens/specs/utils/index.js";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { convertEpochToDate } from "../../ui-config/screens/specs/utils";

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
  whiteCard: {
    // maxWidth: 250,
    width: "100%",
    backgroundColor: "#FFFFFF",
    // paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 3,
    paddingBottom: 10,
    marginRight: 16,
    marginTop: 8,
    marginBottom:16,
    // marginBottom:4,
    display: "inline-flex",
  },
  fontStyle: {
    fontSize: "12px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    width:150,
    overflow: "hidden", 
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    // marginLeft:"7px",
  },
  labelStyle: {
    position: "relative",
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.6,
    padding: "5px 0px",
    display: "inline-block"
  },  
  underlineStyle: {
    position: "absolute",
    bottom: -1,
    borderBottom: "2px solid #FE7A51",
    width: "100%"
  },
  dividerStyle : {
    borderBottom: "1px solid rgba(5, 5, 5, 0.12)",
    width: "100%"
  },
  documentContainer: {
   backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  }
}
// const LightTooltip = withStyles((theme) => ({
//   tooltip: {
//     fontSize: 12
//   }
// }))(Tooltip);
class NocDetailCard extends Component {
  constructor(props) {
    super(props);
    const { nocFinalCardsforPreview, ...rest } = this.props;
    this.state = {
      uploadedDocIndex: 0,
      editableDocuments: null,
    };
  }
  componentDidMount = () => {
    const {
      documentsList, 
      nocDocumentDetailsUploadRedux = {}, 
      prepareFinalObject
    } = this.props;
    let index = 0;
    documentsList.forEach(docType => {
      docType.cards &&
      docType.cards.forEach(card => {
        if (card.subCards) {
          card.subCards.forEach(subCard => {
            let oldDocType = get(
              nocDocumentDetailsUploadRedux,
              `[${index}].documentType`
            );
            let oldDocCode = get(
              nocDocumentDetailsUploadRedux,
              `[${index}].documentCode`
            );
            let oldDocSubCode = get(
              nocDocumentDetailsUploadRedux,
              `[${index}].documentSubCode`
            );
            if (
              oldDocType != docType.code ||
              oldDocCode != card.name ||
              oldDocSubCode != subCard.name
            ) {
              nocDocumentDetailsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          let oldDocType = get(
            nocDocumentDetailsUploadRedux,
            `[${index}].documentType`
          );
          let oldDocCode = get(
            nocDocumentDetailsUploadRedux,
            `[${index}].documentCode`
          );
          if (oldDocType != docType.code || oldDocCode != card.name) {
            nocDocumentDetailsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropDownValues
                ? card.dropDownValues.required
                : false
            };
          }
          index++;
        }
      });
    });
    prepareFinalObject("nocDocumentDetailsUploadRedux", nocDocumentDetailsUploadRedux);
  };
  static getDerivedStateFromProps(props, state) {
    if (
      (state.editableDocuments == null &&
      props.nocFinalCardsforPreview &&
      props.nocFinalCardsforPreview.length > 0)||
      (state.editableDocuments !=null && state.editableDocuments.length >0 && props.nocFinalCardsforPreview.length>0 && 
        (state.editableDocuments.length != props.nocFinalCardsforPreview.length))
    ) {
      state.editableDocuments = Array(props.nocFinalCardsforPreview.length).fill({
        editable: false,
      });
    }
  }
  getCard = (card, key) => {
    const { classes, nocFinalCardsforPreview, ...rest } = this.props;
    if (this.state.editableDocuments)
      return (
        <React.Fragment>
          {this.state.editableDocuments &&
            this.state.editableDocuments.length > 0 &&
            (this.state.editableDocuments[key].editable ? (
              <div style={{backgroundColor:"rgb(255,255,255)", padding:"10px", marginTop: "16px" }}><UploadCard
                docItem={card}
                docIndex={key}
                key={key.toString()}
                handleDocument={this.handleDocument}
                removeDocument={this.removeDocument}
                onUploadClick={this.onUploadClick}
                handleFileUpload={this.handleFileUpload}
                handleChange={this.handleChange}
                uploadedDocIndex={this.state.uploadedDocIndex}
                toggleEditClick={this.toggleEditClick}
                isFromPreview={true}
                jsonPath = {`nocDocumentDetailsUploadRedux`}
                ids = {"nocDocumentDetailsUploadRedux"}
                specificStyles= "preview_upload_btn"
                {...rest}
              /></div>
            ) : (
              <NocDocDetailCard
                docItem={card}
                docIndex={key}
                key={key.toString()}
                handleDocument={this.handleDocument}
                removeDocument={this.removeDocument}
                onUploadClick={this.onUploadClick}
                handleFileUpload={this.handleFileUpload}
                handleChange={this.handleChange}
                uploadedDocIndex={this.state.uploadedDocIndex}
                toggleEditClick={this.toggleEditClick}
                {...rest}
              />
            ))}
        </React.Fragment>
      );
  };
  render() {
    const {
      nocFinalCardsforPreview,
      documentData,
      NOCData,
      ...rest
    } = this.props;
    return (
      <div style={styles.documentContainer}>
        {nocFinalCardsforPreview &&
          nocFinalCardsforPreview.length > 0 &&
          nocFinalCardsforPreview.map((card, index) => {
            return (
              <div style={styles.documentTitle}>
              {NOCData &&
                NOCData.map(data => {
                  return (
                    <div>
                    <LabelContainer
                      labelKey={getTransformedLocale(card.nocType)}
                      style={styles.documentTitle}
                    />
                    <Grid
                      container
                      spacing={3}
                      className={
                      this.props.backgroundGrey
                      ? classNames(styles.whiteCard, "background-grey")
                      : styles.whiteCard
                      }
                    >
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", fontSize: "12px" ,paddingBottom: "6px", paddingTop: "12px" }}
                      >
                      Status
                      </Typography>
                      <div style={styles.fontStyle}>
                        {!data.applicationStatus ? "" : data.applicationStatus}
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold", fontSize: "12px", paddingBottom: "6px", paddingTop: "12px" }}
                    >
                      Submitted On
                      </Typography>
                      <div style={styles.fontStyle}>
                      {!(data.additionalDetails && data.additionalDetails.submittedOn) ? "" :convertEpochToDate(data.additionalDetails.submittedOn)}
                      </div>
                    </Grid>
                    
                    {data.applicationStatus &&  data.applicationStatus === "APPROVED" || data.applicationStatus === "REJECTED" ? (
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", fontSize: "12px", paddingBottom: "6px", paddingTop: "12px" }}
                      >
                        Approved/Rejected on
                      </Typography>
                      <div style={styles.fontStyle}>
                        {!card.documentCode ? "" : card.documentCode}
                      </div>
                    </Grid>          
                    ) : (
                        ""
                    )}
                    </Grid>
                    <Grid item xs={12}>                    
                    <div style={styles.dividerStyle}>
                      <div style={ styles.labelStyle}>
                        <span>Documents</span>
                        <div style={styles.underlineStyle} />
                      </div>
                    </div>
                    </Grid>                     
                    </div>
                  )
                })
              }                
                <div>{this.getCard(card, index)}</div>;
              </div>
            )
          })
        }
      </div>
    );
  }

  onUploadClick = (uploadedDocIndex) => {
    this.setState({ uploadedDocIndex });
  };
  toggleEditClick = (itemIndex) => {
    let items = [...this.state.editableDocuments];
    let item = { ...items[itemIndex] };
    item.editable = item.editable ? false : true;
    items[itemIndex] = item;
    this.setState({ editableDocuments: items });
  };
  
  handleDocument = async (file, fileStoreId) => {
    let { uploadedDocIndex } = this.state;
    const {
      prepareFinalObject,
      nocDocumentDetailsUploadRedux,
      nocFinalCardsforPreview,
      NOCData,
      wfState
    } = this.props;
    const fileUrl = await getFileUrlFromAPI(fileStoreId);
    let documentCode = nocFinalCardsforPreview[uploadedDocIndex].dropDownValues.value;
    if(!documentCode){
      let documentMenu = nocFinalCardsforPreview[uploadedDocIndex].dropDownValues.menu;
      if(documentMenu && documentMenu.length > 0 && documentMenu.length == 1){
        documentCode = documentMenu[0].code;
      } else {
        documentCode = nocFinalCardsforPreview[uploadedDocIndex].documentCode
      }
    }
    let appDocumentList = [];

    let fileObj = {
      fileName: file.name,
      name: file.name,
      fileStoreId,
      fileUrl: Object.values(fileUrl)[0],
      isClickable: true,
      link: Object.values(fileUrl)[0],
      title: documentCode,
      documentType: documentCode,
      additionalDetails:{
        uploadedBy: getLoggedinUserRole(wfState),
        uploadedTime: new Date().getTime()
      }
      
    };
    if (
      nocFinalCardsforPreview[uploadedDocIndex] &&
      nocFinalCardsforPreview[uploadedDocIndex].documents
    ) {
      nocFinalCardsforPreview[uploadedDocIndex].documents.push(fileObj);
      appDocumentList = [...nocFinalCardsforPreview];
    } else {
      nocFinalCardsforPreview[uploadedDocIndex]["documents"] = [fileObj];
      appDocumentList = [...nocFinalCardsforPreview];
    }
    // if (Array.isArray(NOCData)) {
    //   if (NOCData.length > 0) {
    //     if (NOCData[0].documents) {
    //       NOCData[0].documents.push(fileObj);
    //     } else {
    //       NOCData[0].documents = [fileObj];
    //     }
    //   }
    // } else {
    //   if (NOCData.documents) {
    //     NOCData.documents.push(fileObj);
    //   } else {
    //     NOCData.documents = [fileObj];
    //   }
    // }
    // prepareFinalObject("NOCData", NOCData);

    prepareFinalObject("nocFinalCardsforPreview", appDocumentList);

    prepareFinalObject("nocDocumentDetailsUploadRedux", appDocumentList);
  };

  removeDocument = (cardIndex, uploadedDocIndex) => {
    const { prepareFinalObject, nocFinalCardsforPreview, NOCData } = this.props;
    let uploadedDocs = [];
    let fileTobeRemoved =
    nocFinalCardsforPreview[cardIndex].documents[uploadedDocIndex];

    if (Array.isArray(NOCData)) {
      if (NOCData.length > 0) {
        uploadedDocs = NOCData[0].documents;
        uploadedDocs = this.getFinalDocsAfterRemovingDocument(uploadedDocs, fileTobeRemoved);
        NOCData[0].documents = uploadedDocs;
      }
    } else {
      uploadedDocs = NOCData.documents;
      uploadedDocs = this.getFinalDocsAfterRemovingDocument(
        uploadedDocs,
        fileTobeRemoved
      );
      NOCData.documents = uploadedDocs;
    }

    nocFinalCardsforPreview[cardIndex].documents.splice(uploadedDocIndex, 1);
    prepareFinalObject("NOCData", NOCData);
    //uploadedDocs.map()
    prepareFinalObject("nocFinalCardsforPreview", nocFinalCardsforPreview);
    prepareFinalObject("nocDocumentDetailsUploadRedux", nocFinalCardsforPreview);

    this.forceUpdate();
  };

  getFinalDocsAfterRemovingDocument = (docs, file) => {
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].fileStoreId == file.fileStoreId) {
        docs.splice(i, 1);
        break;
      }
    }

    return docs;
  };

  handleChange = (key, event) => {
    const { prepareFinalObject, nocFinalCardsforPreview } = this.props;
    let appDocumentList = [];

    appDocumentList = [...nocFinalCardsforPreview];
    appDocumentList[key].dropDownValues.value = event.target.value;
    prepareFinalObject("nocFinalCardsforPreview", appDocumentList);
    prepareFinalObject("nocDocumentDetailsUploadRedux", appDocumentList);
  };
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const nocDocumentDetailsUploadRedux = get(
    screenConfiguration.preparedFinalObject,
    "nocDocumentDetailsUploadRedux",
    {}
  );
  const documentsList = get(
    screenConfiguration.preparedFinalObject,
    "nocDocumentsContract",
    []
  );
  const nocFinalCardsforPreview = get(
    screenConfiguration.preparedFinalObject,
    ownProps.jsonPath,
    []
  );
  const NOCData = get(screenConfiguration.preparedFinalObject, "NOCData", []);
  const wfState = get(
    screenConfiguration.preparedFinalObject.applicationProcessInstances,
    "state"
  );

  return { nocDocumentDetailsUploadRedux, documentsList, nocFinalCardsforPreview, NOCData, wfState };
};
const mapDispatchToProps = (dispatch) => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value)),
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NocDetailCard)
);

