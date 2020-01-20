import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import department_icon from '../../../../images/icon-department.svg';
import styles from './ButtonDropDownStyles';
import { isMobile } from 'react-device-detect';

class SimpleSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value ? this.props.value : this.props.selected,
            // selectedData: this.props.formattedTime
        }
    }


    handleChange = event => {

        let { target } = this.props;
        this.setState({
            value: event.target.value
        })
        if (typeof this.props.handleChange === 'function') {
            this.props.handleChange(false, target, event.target.value)
        }
    };
    prepareFilterDropdown(data) {
        return (
            data.map((item, index) => {
                if (typeof (item) !== 'object') {
                    return (<MenuItem key={index} value={item}>{item}</MenuItem>)
                } else {
                    return (<MenuItem key={index} value={item.value}>{item.value}</MenuItem>)
                }
            })
        )
    }
    render() {
        let { classes, data, selected, noIcon, value } = this.props;
        // return (<div className={classes.list} style={isMobile?{width:'200px' ,display:"inline-flex"}:{display:"inline-flex"}}>
        return (<div className={classes.list} style={{display:"inline-flex"}}>
                {!noIcon && <SVG src={department_icon} className={classes.CloseButton} >
                    Close
                </SVG>}
                <Select
                    // disableUnderline={true}
                    value={value || selected}
                    onChange={this.handleChange.bind(this)}
                    // fullWidth
                    // defaultValue={value || selected}
                    classes={
                        { root: classes.ddl}
                    }
                >

                    {this.prepareFilterDropdown(data)}
                </Select>
            </div >
        );
    }
}
export default withStyles(styles)(SimpleSelect);
