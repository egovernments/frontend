import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard/dashboard';
import history from "./web.history";
import Home from '../components/Home/Home'

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
            <Router history={history}>
                <div style={{width:'100%'}}>
                    <Switch>
                        <Route path={`${process.env.PUBLIC_URL}/:pageId/:viewAll?`} component={Dashboard} />
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                    </Switch>
                </div>
            </Router>

        );

    }

}

export default AppRouter;