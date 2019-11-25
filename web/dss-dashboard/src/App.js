import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { changeTheName } from '../src/actions/firstAction';
import Dashboard from '../src/components/Dashboard/dashboard';
import SideBar from '../src/components/common/sidebar';
import NavBar from '../src/components/common/navbar';
import { Route } from "react-router-dom";
import PropertyTax from '../src/components/PropertyTax';
import Spinner from './components/common/Spinner'
const styles = theme => ({
  root:{
    display:'flex'
  }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeTheName = this.changeTheName.bind(this);
    // this.props.loadDashboardConfigData(); removed by Amit 24-10
  }
  componentDidMount() {
    document.title = "DSS Dashboard";
  }
  changeTheName = (e) => {
    this.props.changeTheName();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container-fluid">
            <div className="row">
              <Spinner />
              <SideBar isLoaded={this.props.isLoaded} />
              <main role="main" style={{ backgroundColor: '#f4f7fb' }} className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <Route exact path="/dashboard/propertytax">
                  <PropertyTax isLoaded={this.props.isLoaded} dashboardConfigData={this.props.dashboardConfigData} /></Route>
                <Route exact path="/dashboard/">
                  <Dashboard isLoaded={this.props.isLoaded} /></Route>
              </main>
            </div>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  // name: state.firstReducer.name,
  // dashboardConfigData: state.firstReducer.dashboardConfigData,
  isLoaded: state.firstReducer.isLoaded,
  apistatus: state.apistatus

});

const mapDispatchToProps = (dispatch) => ({
  changeTheName: () => dispatch(changeTheName()),
  // loadDashboardConfigData: () => dispatch(loadDashboardConfigData())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
