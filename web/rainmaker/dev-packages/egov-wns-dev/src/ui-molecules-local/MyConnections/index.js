import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { connect } from "react-redux";
import get from "lodash/get";

const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

class MyConnections extends React.Component {

  onCardClick = item => {
    return `/wns/viewBill?connectionNumber=${item.connectionNo}&tenantId=${item.property.tenantId}`;
  };

  render() {
    const { myConnectionResults, onActionClick, classes } = this.props;
    return (
      <div className="application-card">
        {myConnectionResults && myConnectionResults.length > 0 ? (
          myConnectionResults.map(item => {
            return (
              <div>
                <Card className={classes.card}>
                  <CardContent>
                    <div>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_SERVICE"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelName="Water"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_APPLICATION_NO"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelName={item.applicationNo}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_CONSUMER_NO"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Link to={`/wns/connection-details?connectionNumber=${item.connectionNo}&tenantId=${item.property.tenantId}`}>
                            <Label
                              labelName={item.connectionNo}
                              fontSize={14}
                              style={{ fontSize: 14 }}
                            />
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_STATUS"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Label
                            labelName={item.status}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_OWNER_NAME"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelName={item.property.owners.map(owner => owner.name)}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTION_ADDRESS"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Label
                            labelName={item.property.address.street}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={3}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_DUE"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Label
                            labelName={item.due}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Link to={this.onCardClick(item)}>
                        <div >
                          <LabelContainer
                            labelKey="CS_COMMON_PAY"
                            style={{
                              color: "#fe7a51",
                              fontSize: 14,
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })
        ) : (
            <div className="no-assessment-message-cont">
              <Label
                labelKey={"No results Found!"}
                style={{ marginBottom: 10 }}
              />
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const myConnectionResults = get(
    state.screenConfiguration.preparedFinalObject,
    "myConnectionResults",
    []
  );
  const myConnectionDue = get(
    state.screenConfiguration.preparedFinalObject,
    "myConnectionDue",
    []
  );
  const screenConfig = get(state.screenConfiguration, "screenConfig");
  return { screenConfig, myConnectionResults, myConnectionDue };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoute: path => dispatch(setRoute(path))
    // handleField: (screenKey, jsonPath, fieldKey, value) =>
    //   dispatch(handleField(screenKey, jsonPath, fieldKey, value))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyConnections)
);
