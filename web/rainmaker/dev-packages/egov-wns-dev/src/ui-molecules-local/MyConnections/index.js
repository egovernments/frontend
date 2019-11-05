import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";


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
    console.log(this.props)
    return (
      <Card className={classes.card}>
        <CardContent>
          <div>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <Label
                  labelName="Application No."
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="WS-2018-PB-242565"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <Label
                  labelName="Consumer No."
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Link to="connection-details">
                  <Label
                    labelName="WS-2018-PB-242565"
                    fontSize={14}
                    style={{ fontSize: 14 }}
                  />
                </Link>
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <Label
                  labelName="Owner Name"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Label
                  labelName="Satinder pal"
                  fontSize={14}
                  style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 12 }}>
              <Grid item xs={3}>
                <Label
                  labelName="Address"
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
                <Label
                  labelName="Status"
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
            <Link to="viewBill">
              <div >
                <Label
                  labelName="Pay Now"
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
  }
}

export default withStyles(styles)(MyConnections);
