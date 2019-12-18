import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <Switch>                
                <Route path="/:pageId/:viewAll?" component={Dashboard} />
                <Route path="/" component={Dashboard} />
            </Switch>
        );

    }

}

export default AppRouter;