import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import groupBy from "lodash/groupBy";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
//import "./index.css";

const styles = {
  whiteCard: {
    // maxWidth: 250,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 11,
    paddingBottom: 0,
    marginRight: 16,
    marginTop: 16,
    display: "inline-flex",
  },
  // subtext: {
  //   // paddingTop: 7,
  //   display: "inline-flex",
  // },
  body2: {
    wordWrap: "break-word",
  },
};

const cellstyle = {
  display: "flex",
  alignItems: "center",
  maxWidth: "0% !important",
  fontSize: "10px",
};
const style = {
  display: "inline-grid",
  alignItems: "center",
  maxWidth: "22.8%",
};
const tablestyle = {
  display: "inline-grid",
  alignItems: "end",
  maxWidth: "23.3%",
  marginTop: "auto",
};

const documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px",
};

const documentTitleOrg = {
  color: "#CA9382",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "8px",
  background: "#FEF0E7",
  borderRadius: "20px",
  padding: 10,
  display: "inline-block",
};

const documentTitlegrey = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  background: "#F3F4F6",
  borderRadius: "50%",
  padding: "10px 18px",
  display: "inline-block",
};

const fontStyle = {
  fontSize: "12px",
};

const marginStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
};

const floatStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  width: "100%",
};

function MultiDocDetailCard(props) {
  debugger;
  const { classes, docItem, docIndex, name, ...rest } = props;
  console.log(props, "singleprops");
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid
          item={true}
          md={12}
          xs={12}
          sm={12}
          className={
            props.backgroundGrey
              ? classNames(classes.whiteCard, "background-grey")
              : classes.whiteCard
          }
        >
          {docItem.documents && docItem.documents.length > 0 ? (
            <div style={{ width: "100%" }}>
              <div style={floatStyle}>
                {getTransformedLocale(docItem.documentCode)}
                {docItem.readOnly ? (
                  ""
                ) : (
                  <Button
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => props.toggleEditClick(docIndex)}
                  >
                    Upload
                  </Button>
                )}
              </div>
              {docItem.documents.map((doc) => (
                <div
                  style={{
                    display: "inline-flex",
                    width: "91%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div>File</div>
                    <div>
                      <Typography style={marginStyle}>
                        <div style={marginStyle}>
                          {!doc.name ? "" : doc.name}
                        </div>
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <div>Uploaded By</div>
                    <div>
                      <Typography style={marginStyle}>
                        <div style={marginStyle}>
                          {!doc.createdBy ? "" : doc.createdBy}
                        </div>
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>Uploaded Date</div>
                    </div>
                    <div>
                      <Typography style={marginStyle}>
                        <div style={marginStyle}>
                          {!doc.createdTime
                            ? ""
                            : doc.createdTime.toLocaleDateString()}
                        </div>
                      </Typography>
                    </div>
                  </div>

                  <div>
                    <div>
                      <Button
                        color="primary"
                        onClick={() => {
                          debugger;
                          window.open(doc.link, "_blank");
                        }}
                      >
                        View File
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "inline-flex",
                justifyContent: "space-between",
              }}
            >
              <div style={marginStyle}>
                {getTransformedLocale(docItem.documentCode)}
              </div>
              <div style={marginStyle}>No Documents Uploaded</div>
              <div>
                {docItem.readOnly ? (
                  ""
                ) : (
                  <Button
                    color="primary"
                    style={{ float: "right" }}
                    onClick={() => props.toggleEditClick(docIndex)}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

MultiDocDetailCard.propTypes = {
};

export default withStyles(styles)(MultiDocDetailCard);
