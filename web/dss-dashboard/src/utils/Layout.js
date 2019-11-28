import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
// import NavDrawer from '../components/authenticated/navdrawer/NavDrawer';
// import NavBar from '../components/common/NavBar';
// import DashboardFooter from '../components/common/dashboardFooter';
import variables from '../styles/variables';
import NavBar from '../components/common/navbar';
import Spinner from '../components/common/Spinner';
import Sidebar from '../components/common/sidebar';
import { isMobile } from 'react-device-detect';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '10px'
      },
      appContainer: {
        display: 'flex',
    
      },
      main: {
        display: 'flex',
        flex: 1
      }
});

class Layout extends Component {
    prepareLayout() {
        const { classes } = this.props;
        return (
            <div className={`App ${classes.root}`}>
                {/* <div>
                    Change Language: <select onChange={this.handleLanguageChange}>
                        <option value="en">En- English</option>
                        <option value="hi">hi- Hindi</option>
                    </select>
                </div> */}
                {/* <NavBar /> */}
                <div className={classes.appContainer}>
                    {/* <div className="row"> */}
                    <Spinner />
                    <main role="main" style={{ backgroundColor: '#f4f7fb' }} className={classes.main}>
                        <AppRouter />
                    </main>
                </div>
            </div>
        )

    }

    render() {
        return this.prepareLayout();
    }

}

export default withStyles(styles)(Layout);