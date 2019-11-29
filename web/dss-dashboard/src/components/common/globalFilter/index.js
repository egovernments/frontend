import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { updateGlobalFilterData } from '../../../actions/globalFilter/GFilterAction';
import styles from './Style';
import Cards from '../Cards/Cards'
import SVG from 'react-inlinesvg';
import icondepartment from '../../../images/icon-calendar.svg';
import MultipleSelects from '../inputs/MultipleSelect/MultipleSelect';
import SwitchButton from '../switchButtons/switchButtons'
import SimpleSelect from '../inputs/DropDown/droapdown';
import _ from 'lodash';
import DateRange from '../DateRange/index';
import ActionButtons from '../inputs/ActionButtons';
import APITransport from '../../../actions/apitransport/apitransport';
import { connect } from 'react-redux';
import DropDownIcon from '@material-ui/icons/ArrowDropDown';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class GlobalFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 'FY 19-20', //fOR date range
            filterData: this.props.GFilterData,
            title: '',
            dept: "All Services",
            clear: false
        }
        this.handleChanges = this.handleChanges.bind(this);
    }

    /**need to be dynamic */
    getdepartFilter(value) {
        if (value == 'Property Tax') {
            return 'PT'
        } else if (value == 'Trade licence') {
            return 'TL'
        } else if (value == 'PGR') {
            return 'PGR'
        }
        return null;
    }

    handleChanges(open, target, value) {
        if (target) {
            let newFilterData = this.state.filterData;
            // let tempValue = value;
            newFilterData[target] = value;
            // if(target == 'duration'){
            //      newFilterData[target] = this.getDateFilter(value);
            // }

            if (target == 'Services') {
                newFilterData[target] = this.getdepartFilter(value);
            }
            if (target !== 'duration') {
                this.setState({ [`${target}IsOpen`]: !open, filterData: newFilterData });
            } else {
                if (newFilterData.duration.title === 'CUSTOM') {
                    newFilterData.duration.title = moment.unix(_.get(newFilterData, 'duration.value.startDate')).format("DD/MM/YY")

                        + '-' + moment.unix(_.get(newFilterData, 'duration.value.endDate')).format("DD/MM/YY");
                }
                this.setState({ open: open, filterData: newFilterData });
            }

            console.log([`${target}IsOpen`], !open, [target], value);
            if (typeof this.props.applyFilters === 'function') {
                this.props.applyFilters(newFilterData);
            }
            if (target === 'Services') {
                this.setState({
                    dept: value
                })
            }

        }
    }

    clearFilter(value, target) {
        this.setState({
            title: 'FY 19-20',
            dept: "All Services",
            clear: true,
            value: 'FY 19-20',
            filterData: {
                'Denomination': 'Lac'
            }
        }, this.props.applyFilters(this.state.filterData));
    }

    openPicker() {
        this.setState({ open: true })

    }

    handleClose(newValue) {
        this.setState({ open: false })

        if (newValue) {
            this.setState({
                value: newValue
            });
        }
    }

    renderDateRange(label, data) {
        let { classes } = this.props;
        return (
            <FormControl fullWidth className={classes.margin}>
                <Input
                    disabled
                    disableUnderline={true}
                    id="adornment-amount"
                    value={(_.get(this.state, "filterData.duration.title") || this.state.value)}
                    style={{
                        color: '#000000', width: 'auto',
                        margin: '0 10px 0 0'
                    }}
                    // onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start">
                        <SVG src={icondepartment} className={classes.CloseButton}>

                        </SVG>
                    </InputAdornment>}
                    endAdornment={<DropDownIcon style={{ color: '#656565' }}></DropDownIcon>}
                    onClick={this.openPicker.bind(this)}
                />
                <DateRange
                    key={"DateRange"}
                    id="customCalander"
                    title1={(_.get(this.state, "filterData.duration.title") || this.state.value)}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    value={this.state.value}
                    handleSelectedOk={this.handleChanges.bind(this)}
                ></DateRange>
                {/* // handleApplyFilter={this.handleApplyFilter.bind(this)} */}

            </FormControl>
        );
    }

    renderSimpleSelect(label, data) {
        let newData = _.map(data, (d, i) => {
            return {
                key: i + 1,
                value: d
            }
        })
        newData = [{ key: 0, value: `All ${label}` }, ...newData];
        return (
            <SimpleSelect data={newData} value={this.state.dept} target={label} selected={this.state[label] || `All ${label}`} handleChange={this.handleChanges.bind(this)}></SimpleSelect>
        )
    }

    renderSwitch(label, data) {
        let newData = _.map(data, (d) => {
            return {
                key: d,
                value: d
            }
        })
        return (
            <SwitchButton type="small" topMmargin="5px" selected={this.state.filterData[label] || data[0]} target={label} data={newData} handleSelected={this.handleChanges}></SwitchButton>
        )
    }

    renderMultiselect(target, hndlslected, defaultV, data) {
        return (<MultipleSelects
            logo={target}
            handleSelected={hndlslected}
            target={target}
            open={this.state.multiselectStateIsOpen}
            defaultValue={defaultV}
            item={data}
            clear={this.state.clear}
            handleClear={this.handleClear.bind(this)}
        />);
    }

    handleClear() {
        this.setState({
            clear: false
        })
    }
    applyFilter() {
        this.props.applyFiltersLive(this.state.filterData);
    }
    renderComponents(object) {
        let type = object.type;
        let label = object.label;
        switch (type) {
            case "dropdown":
                switch (label) {
                    case "ULBS":
                        return this.renderMultiselect(object.label, this.handleChanges, this.state.Ulbs, object.values)
                    case "DDRs":
                        return this.renderMultiselect(object.label, this.handleChanges, this.state.ddrs, object.values)
                    case "Services":
                        return this.renderSimpleSelect(object.label, object.values, this.handleChanges)
                    case "Date Range":
                        return this.renderDateRange(object.label, object.values);
                }
                break;
            case "switch":
                return this.renderSwitch(object.label, object.values)
                break;
        }
    }

    render() {
        let { classes, globalFilterData } = this.props;
        return (
            <Cards key="gf" fullW={true}>
                <div className={classes.mainFilter}>
                    {globalFilterData.map(ro => {
                        if (this.props.hideDepart && ro.label == "Services") {
                            return (<div key={ro.label} className={classes.filterS}></div>);

                        }
                        return (
                            <div key={ro.label} className={classes.filterS}>
                                <div className={classes.filterHead}>{ro.label}</div>
                                {this.renderComponents(ro)}
                            </div>
                        );
                    })
                    }
                    {/* <div className={`${classes.filterS} ${classes.fullWidth}`}>

                    </div> */}

                    <div className={classes.actions}>
                        <ActionButtons buttonType="default" text="CLEAR ALL" disableed={Object.keys(this.state.filterData).length == 0} clas={classes.clearbtn} handleClick={this.clearFilter.bind(this)} />
                        <ActionButtons buttonType="default" text="APPLY" clas={classes.clearbtn} handleClick={this.applyFilter.bind(this)} />
                    </div>
                </div>

            </Cards>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        globalFilterData: state.globalFilter,
        GFilterData: state.GFilterData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport,
        updateFilterData: updateGlobalFilterData
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GlobalFilter));
