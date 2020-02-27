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
import "./index.css"

const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

class Applications extends React.Component {
  getTaskDetails = data => {
    data.service = data.service.toUpperCase();
    window.location.href = `/citizen/wns/search-preview?applicationNumber=${data.applicationNo}&history=${true}&tenantId=${data.property.tenantId}&service=${data.service}`
  }
  render() {
    const { myApplicationResults, classes } = this.props;
    return (
      <div className="application-card">
        {myApplicationResults && myApplicationResults.length > 0 ? (
          myApplicationResults.map(item => {
            return (
              <div>
                <Card className={classes.card}>
                  <CardContent>
                    <div>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item md={4} xs={6}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_SERVICE"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item md={8} xs={6}>
                          <LabelContainer
                            labelName={item.service}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item md={4} xs={6}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_APPLICATION_NO"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item md={8} xs={6}>
                          <LabelContainer
                            labelName={item.applicationNo}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item md={4} xs={6}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_OWNER_NAME"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item md={8} xs={6}>
                          <LabelContainer
                            labelName={item.property.owners.map(owner => owner.name)}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item md={4} xs={6}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_DUE"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item md={8} xs={6}>
                          <Label
                            labelName={item.due}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item md={4} xs={6}>
                          <LabelContainer
                            labelKey="WS_MYCONNECTIONS_STATUS"
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                          />
                        </Grid>
                        <Grid item md={8} xs={6}>
                          <Label
                            labelName={item.applicationStatus}
                            fontSize={14}
                            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                          />
                        </Grid>
                      </Grid>
                      <div className="linkStyle" onClick={() => this.getTaskDetails(item)}>
                        <LabelContainer
                          labelKey="WS_VIEW_DETAILS"
                          style={{
                            color: "#fe7a51",
                            fontSize: 14,
                          }}
                        />

                        {/* {item.due === "-" ?
                          (<div></div>)
                          : item.due === 0 ?
                            (<div> <LabelContainer
                              labelKey="WS_COMMON_PAID_LABEL"
                              style={{ color: '#008000', textTransform: 'uppercase', fontWeight: 400 }}
                            /></div>) :
                            (<div className="linkStyle" onClick={() => this.getViewBillDetails(item)}>
                              <LabelContainer
                              labelName="VIEW DETAILS"
                                // labelKey="CS_COMMON_PAY"
                                style={{
                                  color: "#fe7a51",
                                  fontSize: 14,
                                }}
                              />
                            </div>)
                        } */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })
        ) : (
            <div style={{
              display: "flex",
              width: "100%",
              height: "50vh",
              alignItems: 'center',
              justifyContent: "center",
              textAlign: "center"
            }}>
              <LabelContainer
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
  const myApplicationResults = get(
    state.screenConfiguration.preparedFinalObject,
    "myApplicationResults",
    []
  );
  // const myConnectionDue = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "myConnectionDue",
  //   []
  // );
  const screenConfig = get(state.screenConfiguration, "screenConfig");
  return { screenConfig, myApplicationResults };
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
  )(Applications)
); 