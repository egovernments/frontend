import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropertyTax from '../components/PropertyTax';
import TradeLicense from '../components/TradeLicense';
import Dashboard from '../components/Dashboard/dashboard';

class AppRouter extends Component {
    authenticateUser = () => {
        // let token = sessionStorage.getItem('token');
        // if (token) {
        return true;
        // }
        // return false;
    }

    render() {
        return (
            //<BrowserRouter> 
            // <Route path="/" render={props => { const subdomain = window.location.hostname.split('.'); 
            // if (subdomain && subdomain.length > 1) 
            // return <PartnerLayout {...props} subdomain={subdomain[0]}/>; return <AppLayout {...props}/>; }}/> 
            // </BrowserRouter>
            <Switch>
                <Route exact path="/dashboard/" component={Dashboard} />
                {/* <Route path="/login" component={Login} />
                <Route path="/forgot" component={Forgot} />
                <Route exact={true} path="/resetPassword/:id" component={ResetPassword} /> */}
                <Route exact path="/dashboard/dashboard/" component={Dashboard} />
                <Route exact path="/dashboard/propertytax/" component={PropertyTax} />
                <Route exact path="/dashboard/tradeLicense/" component={TradeLicense} />
                {/* <Route exact path="/dashboard">
                  <Dashboard isLoaded={this.props.isLoaded} /></Route> */}

                {/* <PrivateRoute path="/home" component={Home} RoleKey={"DASHBOARD"} authenticate={this.authenticateUser()}  />
                               
                <PrivateRoute path="/user" RoleKey={"USERS"} component={User}  authenticate={this.authenticateUser()}/>             */}
            </Switch>
        );

    }

}

export default AppRouter;