import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './TabsStyle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CustomTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    handleClick(event) {
        this.props.handleClick(this.props.value, this.props.target)
    }

    // hasPermission(RoleKey, RoleAction) {
    //     return hasPermission(RoleKey, RoleAction);
    // }
    // hasRoutePermission(RoleKey) {
    //     return hasRoutePermission(RoleKey);
    // }
    handleChange() {
        this.props.handleChange();
    }
    renderTab(needActionAuth) {
        let { myTabs , classes} = this.props;
        return (<Tabs
            value={this.props.value}
            onChange={this.props.handleChange}
            classes={{
                root: classes.root,
                indicator: classes.indicator
            }}
        >
            {myTabs.map(tab => {
                // if (needActionAuth) {
                //     let _isPermited = this.hasPermission(tab.RoleKey, tab.RoleAction)
                //     if (_isPermited) {
                //         return (
                //             <Tab
                //                 disableRipple
                //                 value={tab.RoleKey + "." + tab.RoleAction}
                //                 label={tab.name}
                //                 key={tab.RoleKey + "." + tab.RoleAction}
                //             />
                //         )
                //     } else {
                //         return null;
                //     }
                // } else {
                // let _isPermited = this.hasRoutePermission(tab.RoleKey)
                // if (_isPermited) {
                return (
                    <Tab
                        // disableRipple
                        value={tab.name}
                        label={tab.name}
                        key={tab.key}
                    />
                )
                // } else {
                //     return null;
                // }
                // }
            })
            }
        </Tabs>);
    }

    rederSwitch() {
        const { tabType } = this.props;
        // switch (tabType) {
        //     case "SimpleTab":
        return this.renderTab(true)
        // case "AuthTab":
        //     return this.renderTab(false)
        // default:
        //     return null;
        // }
    }
    render() {
        return this.rederSwitch();
    }
}

export default withStyles(styles)(CustomTabs);