import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { LabelContainer } from "egov-ui-framework/ui-containers";


const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

// onCardClick = () => {
// switch (item.status) {
//   case "INITIATED":
//     return `/tradelicense-citizen/apply?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
//   default:
//     return `/tradelicence/search-preview?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
// }
// };
// onCardClick = () => {

// }

class MyConnections extends React.Component {
  render() {
    const { classes } = this.props;
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
                    labelName="WS-2018-PB-242565"
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
                  <Link to="/wns/connection-details">
                    <Label
                      labelName="WS-2018-PB-642665"
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
                    labelName="Active"
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
                    labelName="Satinder pal"
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
                    labelName="707/B, Railway Colony, Amrister,Punjab"
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
                    labelName="25"
                    fontSize={14}
                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                  />
                </Grid>
              </Grid>
              <Link to="/wns/viewBill">
                <div >
                  <LabelContainer
                    labelKey="CS_COMMON_PAY"
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
                    labelName="Sewerage"
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
                    labelName="SW-2018-PB-242565"
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
                  <Link to="/wns/connection-details">
                    <Label
                      labelName="SW-2018-PB-642665"
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
                    labelName="Active"
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
                    labelName="Satinder pal"
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
                    labelName="707/B, Railway Colony, Amrister,Punjab"
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
                    labelName="37"
                    fontSize={14}
                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                  />
                </Grid>
              </Grid>
              <Link to="/wns/viewBill">
                <div >
                  <LabelContainer
                    labelKey="CS_COMMON_PAY"
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
      </div>
    );
  }
}

export default withStyles(styles)(MyConnections);
