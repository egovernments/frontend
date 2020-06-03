import React from "react";
import { connect } from "react-redux";
import Label from "../../ui-containers/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import { setRoute } from "../../ui-redux/app/actions";
import {toggleSnackbar} from "../../ui-redux/screen-configuration/actions";
import "./index.css";
import { checkValueForNA } from "../../ui-config/screens/specs/utils";
import { localStorageSet } from "../../ui-utils/localStorageUtils";
import { httpRequest } from "../../ui-utils/api";
import { convertEpochToDate } from "../../ui-config/screens/specs/utils";
import { epochToDate, navigateToApplication, getApplicationType } from "../../ui-utils/commons";
import orderBy from "lodash/orderBy";


const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

class SingleApplication extends React.Component {


 /*  onCardClick = item => {
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
  }; */

  setBusinessServiceDataToLocalStorage = async (queryObject) => {
    const {toggleSnackbar} = this.props;
    try {
      const payload = await httpRequest("post","egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);
      localStorageSet("businessServiceData", JSON.stringify(get(payload, "BusinessServices")));
      return get(payload, "BusinessServices");
    } catch (e) {
      toggleSnackbar(
        true,
        {
          labelName: "Not authorized to access Business Service!",
          labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE",
        },
        "error"
      );
    }
  };

  onCardClick = async (item) => {
    const { moduleName, toggleSnackbar, setRoute } = this.props;
    if (moduleName === "TL") {
      const wfCode = get(item, "workflowCode");
      const businessServiceQueryObject = [
        { key: "tenantId", value: get(item, "tenantId") },
        {
          key: "businessServices",
          value: wfCode
        }
      ];
      this.setBusinessServiceDataToLocalStorage(businessServiceQueryObject);
      switch (item.status) {
        case "INITIATED":
          setRoute(`/tradelicense-citizen/apply?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`);
        default:
          setRoute(`/tradelicence/search-preview?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`);
      }
      } else if (moduleName === "FIRENOC") {
        switch (item.fireNOCDetails.status) {
          case "INITIATED":
            setRoute(`/fire-noc/apply?applicationNumber=${item.fireNOCDetails.applicationNumber}&tenantId=${item.tenantId}`);
          default:
            setRoute(`/fire-noc/search-preview?applicationNumber=${item.fireNOCDetails.applicationNumber}&tenantId=${item.tenantId}`);
        }
      } else{
            toggleSnackbar(
              true,
              {
                labelName: "Business service returns empty response!",
                labelKey: "Business service returns empty response!",
              },
              "error"
            );
          }
      }


  render() {
    const { searchResults, onActionClick, classes } = this.props;
    return (
      <div className="application-card">
        {searchResults &&
          searchResults.map(item => {
            //console.log("New search results")
            return (
              <Card className={classes.card}>
                <CardContent>
                  <div style={{cursor:"pointer"}} onClick = {()=>{
                        const url = this.onCardClick(item);
                        // setRoute(url);
                        }}>
                   <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="FIRE_NOC_MY_APPLICATION_TYPE"
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Label
                          labelKey={item.fireNOCDetails.fireNOCType}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="FIRE_NOC_MY_APPLICATION_NO"
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.fireNOCDetails.applicationNumber}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="FIRE_NOC_MY_APPLICATION_NAME"
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.fireNOCDetails.applicantDetails.owners[0].name}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                                      <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey="FIRE_NOC_MY_APPLICATION_STATUS"
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={item.fireNOCDetails.status}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                      <div>
                        <Label
                          labelKey={"NOC_VIEW_DETAILS"}
                          textTransform={"uppercase"}
                          style={{
                            color: "#fe7a51",
                            fontSize: 14,
                            textTransform: "uppercase"
                          }}
                        />
                      </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    );
  }
}

/* const mapStateToProps = state => {
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
); */

const mapStateToProps = state => {
  const searchResultsRaw = get(
    state.screenConfiguration.preparedFinalObject,
    "searchResults",
    []
  );
  let searchResults = orderBy(
    searchResultsRaw,
    ["auditDetails.lastModifiedTime"],
    ["desc"]);
    searchResults=searchResults?searchResults:searchResultsRaw ;
  const screenConfig = get(state.screenConfiguration, "screenConfig");
  return { screenConfig, searchResults };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoute: path => dispatch(setRoute(path)),
    toggleSnackbar : (open,message,type) => dispatch(toggleSnackbar(open,message,type))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleApplication)
);
