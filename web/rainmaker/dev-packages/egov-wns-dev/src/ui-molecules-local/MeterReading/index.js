import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";


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

class MeterReading extends React.Component {
  render() {
    const { classes } = this.props;
    console.log(this.props)
    return (
      <Card className={classes.card}>
        <CardContent>
          <div>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="Q3-2018-19"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                  <Label
                    labelName="Working"
                    fontSize={14}
                    style={{ fontSize: 14 }}
                  />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="50"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                labelKey="WS_CONSUMPTION_DETAILS_LAST_READING_DATE_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="12/12/2018"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="75"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="12/12/2018"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <LabelContainer
                  labelKey="WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="47"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MeterReading);
