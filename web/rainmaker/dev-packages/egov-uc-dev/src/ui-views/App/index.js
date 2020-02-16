import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import MainRoutes from "ui-routes";
//import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";
// import Div from "egov-ui-framework/ui-atoms/HtmlElements/Div";
import {
  setRoute,
  fetchLocalizationLabel
} from "egov-ui-framework/ui-redux/app/actions";
import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getLocale,
  getAccessToken
} from "egov-ui-framework/ui-utils/localStorageUtils";

import "./index.scss";

import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";
const Loading = () => <LinearProgress />;

const MainRoutes = Loadable({
  loader: () => import("ui-routes"),
  loading: () => <Loading />
});
const Div = Loadable({
  loader: () => import("egov-ui-framework/ui-atoms/HtmlElements/Div"),
  loading: () => <Loading />
});

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 8,
  },
  title: {
    flexGrow: 1,
  },
};

class App extends React.Component {
  componentDidMount = () => {
    const { fetchLocalizationLabel, toggleSpinner, setRoute } = this.props;
    toggleSpinner();
    fetchLocalizationLabel(getLocale() || "en_IN");
    // ,"rainmaker-common,rainmaker-uc"
    toggleSpinner();
    if (getAccessToken()) {
      const path =
        process.env.REACT_APP_SELF_RUNNING === "true"
          ? `/egov-ui-framework/uc/search`
          : `/uc/search`;
      setRoute(`${path}`);
    }
  };

  componentWillReceiveProps(nextProps) {
    const { route: nextRoute } = nextProps;
    const { route: currentRoute, history, setRoute } = this.props;
    if (nextRoute && currentRoute !== nextRoute) {
      history.push(nextRoute);
      setRoute("");
      window.parent.postMessage(`/employee-mcs${nextRoute}`, "*");
    }
  }

  render() {
    const { authenticated,classes ,setRoute} = this.props;
    const childProps = {
      isAuthenticated: authenticated
    };
    return (
      <Div className="App">
        <AppBar position="static">
          <Toolbar>
            {/*<IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>*/}
            <Typography variant="h6" className={classes.title}>
              MCS
            </Typography>
            {getAccessToken() && <Button color="inherit" onClick={(e)=>{
              window.localStorage.clear()
              const path =
                process.env.REACT_APP_SELF_RUNNING === "true"
                  ? `/egov-ui-framework/uc/login`
                  : `/uc/login`;
              setRoute(`${path}`);
            }}>Logout</Button>}
          </Toolbar>
        </AppBar>
        <MainRoutes childProps={childProps} />
        {/* {spinner && <LoadingIndicator/>} */}
      </Div>
    );
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { route, spinner } = app;
  const { authenticated } = auth;
  return {
    route,
    spinner,
    authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoute: route => dispatch(setRoute(route)),
    fetchLocalizationLabel: (locale, module) =>
      dispatch(fetchLocalizationLabel(locale, module)),
    toggleSpinner: () => dispatch(toggleSpinner())
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withStyles(styles)(App));
