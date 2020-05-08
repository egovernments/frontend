import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

const styles = {
  whiteCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 11,
    paddingBottom: 10,
    marginRight: 16,
    marginTop: 16,
    display: "inline-flex",
  },

  body2: {
    wordWrap: "break-word",
  },
};

const cellstyle = {
  display: "flex",
  alignItems: "center",
  maxWidth: "22.8%",
};

const tablestyle = {
  display: "inline-grid",
  alignItems: "end",
  //maxWidth: "23.3%",
  marginTop: "auto",
};

const documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "14px",
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
  margiTop: 10,
};

const documentTitlegrey = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  background: "#F3F4F6",
  borderRadius: "50%",
  padding: "10px 18px",
  display: "flex",
  width: "40px",
  height: "40px",
  position: "relative",
  overflow: "hidden",
  alignItems: "center",
  flexShrink: "0",
  justifyContent: "center",
};

const fontStyle = {
  fontSize: "12px",
};
const marginStyle = {
  fontSize: "12px",
  margin: "auto",
};
function SingleDocDetailCard(props) {
  const { classes, docItem, docIndex, name, ...rest } = props;
  return (
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
        <Grid xs={1} style={cellstyle}>
          <div style={documentTitlegrey}>{docIndex + 1}</div>
        </Grid>
        <Grid xs={12} sm={6} style={tablestyle}>
          <div>
            <LabelContainer
              labelName={getTransformedLocale(docItem.documentCode)}
              labelKey={getTransformedLocale(docItem.documentCode)}
              style={documentTitle}
            />
          </div>
          <div style={fontStyle}>
            {!docItem.dropDownValues ? "" : docItem.dropDownValues.value}
          </div>
        </Grid>

        <Grid xs={9} className={classes.subtext}>
          {docItem.documents && docItem.documents.length > 0 ? (
            <span>
              {docItem.documents.map((doc) => (
                <Grid
                  xs={7}
                  style={{
                    display: "inline-block",
                    marginRight: "3px",
                    padding: "2px 0px 10px",
                  }}
                >
                  <Typography style={marginStyle}>
                    <span style={documentTitleOrg}>{doc.fileName}</span>
                  </Typography>
                </Grid>
              ))}
            </span>
          ) : (
            <Grid xs={7}>
              <Typography style={marginStyle}>No Documents Uploaded</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

SingleDocDetailCard.propTypes = {

};

export default withStyles(styles)(SingleDocDetailCard);
