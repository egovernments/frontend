import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Label from "../../ui-containers/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

class SingleApplication extends React.Component {
  onCardClick = item => {
    switch (item.status) {
      case "INITIATED":
        return `/tradelicense-citizen/apply?applicationNumber=${
          item.applicationNumber
        }&tenantId=${item.tenantId}`;
      default:
        return `/tradelicence/search-preview?applicationNumber=${
          item.applicationNumber
        }&tenantId=${item.tenantId}`;
    }
  };

  render() {
    const { searchResults, onActionClick, classes } = this.props;
    return (
      <div className="application-card">
        {searchResults &&
          searchResults.map(item => {
            return (
              <Card className={classes.card}>
                <CardContent>
                  <div>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          label={"TL_COMMON_TABLE_COL_TRD_NAME"}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.tradeName}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="TL_COMMON_TABLE_COL_APP_NO"
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.applicationNumber}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="TL_COMMON_TABLE_COL_OWN_NAME"
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.tradeLicenseDetail.owners[0].name}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    {item.licenseNumber && (
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={6}>
                          <Label
                            labelKey="PT_SEARCHPROPERTY_TABEL_EPID"
                            fontSize={14}
                            style={{
                              fontSize: 14,
                              color: "rgba(0, 0, 0, 0.60"
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Label
                            labelKey={item.licenseNumber}
                            style={{
                              fontSize: 14,
                              color: "rgba(0, 0, 0, 0.87"
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="TL_COMMON_TABLE_COL_STATUS"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.status}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Link to={this.onCardClick(item)}>
                      <div onClick={onActionClick}>
                        <Label
                          labelKey={"TL_VIEW_DETAILS"}
                          textTransform={"uppercase"}
                          style={{
                            color: "#fe7a51",
                            fontSize: 14,
                            textTransform: "uppercase"
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const searchResults = get(
    state.screenConfiguration.preparedFinalObject,
    "searchResults",
    []
  );
  return { searchResults };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(SingleApplication)
);
