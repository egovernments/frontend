import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import { Chip } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import AutoComplete from '../inputs/MultipleSelect/AutoComplete'
import getFinancialYearObj from '../../../actions/getFinancialYearObj';
import TenentAPI from '../../../actions/tenent/tenent'
import Constant from '../../../actions/constants'

class GlobalFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: getFinancialYearObj(true), //fOR date range
            filterData: this.props.GFilterData,
            title: '',
            dept: "All Services",
            clear: false,
            pageId: _.get(this.props, 'match.params.pageId'),
            role: this.props.dashboardConfigData && Array.isArray(this.props.dashboardConfigData) && this.props.dashboardConfigData.length > 0 && this.props.dashboardConfigData[0].roleName && this.props.dashboardConfigData[0].roleName,
            tenents: '',
            tenentName: '',
            wards: '',
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

    componentDidMount() {
        let tenentCode = `${localStorage.getItem('tenant-id')}` ? `${localStorage.getItem('tenant-id')}` : ''
        
        // let req = {
        //     "RequestInfo": {
        //         "authToken": ""
        //     },
        //     "MdmsCriteria": {
        //         "tenantId": tenent && tenent !== 'null' ? tenent : 'pb',
        //         "moduleDetails": [
        //             {
        //                 "moduleName": "tenant",
        //                 "masterDetails": [
        //                     {
        //                         "name": "tenants"
        //                     }]
        //             }
        //         ]
        //     }
        // }

        // const { TenentTransporter } = this.props
        // let tenentAPI = new TenentAPI(2000, 'dashboard', Constant.TENENTS, req, '');
        // TenentTransporter(tenentAPI);

        let tenentName = []
        let tenentObj = {}

        if(tenentCode && tenentCode !== 'null') {
            let tenent = `${localStorage.getItem('tenant-id')}` ? (`${localStorage.getItem('tenant-id')}`).split('.')[1] : ''

            if(tenent && tenent !== 'null') {
                let data = tenent[0].toUpperCase() + tenent.slice(1)
                 tenentObj[data] = tenentCode
                 tenentName.push(data)

                 console.log(tenentCode)
                 console.log(tenent)
                 console.log(data)
                 console.log(tenentObj)
                 console.log(tenentName)
                 this.setState({ tenants: tenentObj, tenentName: tenentName })

             }
        }
       
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tenents != this.props.tenents) {
            // let tenentIds = _.chain(this.props).get("tenents").get('MdmsRes').get('tenant').get('tenants').map((ulb, index) => {
            let tenants = _.get(this.props.tenents, 'MdmsRes.tenant.tenants')
            let tenentName = []
            let tenentObj = {}
            if (tenants && Array.isArray(tenants)) {
                tenants.map((t) => {
                    tenentObj[t.name] = t.code
                    tenentName.push(t.name)
                })

                this.setState({ tenants: tenentObj, tenentName: tenentName })
            }
        }

        if (prevProps.wards != this.props.wards) {
            // let wardData = _.chain(this.props).get("wards").get('MdmsRes').get('egov-location').get('TenantBoundary').first().get('boundary').get('children').first().get('children').map()
            let tenantsBoundry = _.get(this.props.wards, 'MdmsRes.egov-location.TenantBoundary')
            let nameArray = []

            let adminBoundary = []
            let revenueBoundary = []
            let adminName = []
            let revenueName = []
            let wardObj = {}
            let revenueBoundaryObj = {}
            if (tenantsBoundry && Array.isArray(tenantsBoundry) && tenantsBoundry.length > 0) {
                tenantsBoundry.map((boundaryData) => {
                    if (boundaryData['hierarchyType'] && boundaryData['hierarchyType'].code && boundaryData['hierarchyType'].code === 'REVENUE') {
                        let tenantsBoundryObj = boundaryData['boundary']

                        if (tenantsBoundryObj && tenantsBoundryObj.children && Array.isArray(tenantsBoundryObj.children) && tenantsBoundryObj.children.length > 0) {
                            let tenantsBoundryObjChildren = tenantsBoundryObj.children[0]
                            if (tenantsBoundryObjChildren && tenantsBoundryObjChildren.children && Array.isArray(tenantsBoundryObjChildren.children) && tenantsBoundryObjChildren.children.length > 0) {
                                tenantsBoundryObjChildren.children.map((children) => {

                                    revenueBoundaryObj[children.name] = children.code
                                    revenueName.push(children.name)
                                })
                            }
                        }
                    } else {
                        let tenantsBoundryObj = boundaryData['boundary']

                        if (tenantsBoundryObj && tenantsBoundryObj.children && Array.isArray(tenantsBoundryObj.children) && tenantsBoundryObj.children.length > 0) {
                            let tenantsBoundryObjChildren = tenantsBoundryObj.children[0]
                            if (tenantsBoundryObjChildren && tenantsBoundryObjChildren.children && Array.isArray(tenantsBoundryObjChildren.children) && tenantsBoundryObjChildren.children.length > 0) {
                                tenantsBoundryObjChildren.children.map((children) => {
                                    wardObj[children.name] = children.code
                                    adminName.push(children.name)
                                })
                            }
                        }
                    }
                })

            }
            if (this.state.pageId === 'ulb-pgr') {
                this.setState({ wards: adminName, wardsArr: wardObj })
            } else {
                this.setState({ wards: revenueName, wardsArr: revenueBoundaryObj })
            }

        }
    }

    handleChanges(open, target, value) {
        console.log('=------------------------------------------', target, value)
        if (target) {
            let newFilterData = this.state.filterData;
            // let tempValue = value;
            if (target === 'Wards') {
                let wardsObj = this.state.wardsArr
                let wardKeys = []
                if (value) {
                    value.map((v) => {
                        wardKeys.push(wardsObj[v])
                    })
                }
                newFilterData[target] = wardKeys;
            } else {
                newFilterData[target] = value;
            }
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
                    newFilterData.duration.title = moment.unix(_.get(newFilterData, 'duration.value.startDate')).format('ll')

                        + '-' + moment.unix(_.get(newFilterData, 'duration.value.endDate')).format('ll');
                }
                this.setState({ open: open, filterData: newFilterData });
            }
            if (typeof this.props.applyFilters === 'function') {
                console.log(newFilterData)
                this.props.applyFilters(newFilterData);

            }
            if (target === 'Services') {
                this.setState({
                    dept: value
                })
            }

        }
    }

    handleFilterChange(open, target, value) {
        if (target) {

            if (target === 'ULBS') {
                let ulbs = []
                let tenents = this.state.tenants
                if (Array.isArray(value) && value.length > 0) {
                    value.map((d, i) => {
                        if (tenents[d]) {
                            ulbs.push(tenents[d])
                        }
                    })
                }
                let req = {
                    "RequestInfo": {
                        "authToken": ""
                    },
                    "MdmsCriteria": {
                        "tenantId": ulbs[ulbs.length - 1],

                        "moduleDetails": [
                            {
                                "moduleName": "egov-location",
                                "masterDetails": [
                                    {
                                        "name": "TenantBoundary"
                                    }]
                            }
                        ]
                    }
                }

                const { WardTransporter } = this.props
                let tenentAPI = new TenentAPI(2000, 'dashboard', Constant.WARD_DATA, req, '');
                WardTransporter(tenentAPI);
            }

            let newFilterData = this.state.filterData;
            newFilterData[target] = value;

            if (target !== 'duration') {
                this.setState({ [`${target}IsOpen`]: !open, filterData: newFilterData });
            } else {
                if (newFilterData.duration.title === 'CUSTOM') {
                    newFilterData.duration.title = moment.unix(_.get(newFilterData, 'duration.value.startDate')).format('ll')

                        + '-' + moment.unix(_.get(newFilterData, 'duration.value.endDate')).format('ll');
                }
                this.setState({ open: open, filterData: newFilterData });
            }

            if (typeof this.props.applyFilters === 'function') {
                this.props.applyFilters(newFilterData);

            }
        }
    }

    clearFilter(value, target) {
        /**
         * this is for quick fix as we reloded
         * 
         */
        // this.setState({
        //     title: 'FY 19-20',
        //     dept: "All Services",
        //     clear: true,
        //     value: 'FY 19-20',
        //     filterData: {
        //         'Denomination': 'Lac'
        //     }
        // }, this.props.applyFilters(this.state.filterData));
        // let pageId=_.get(this.props,'match.params.pageId');
        let viewAll = _.get(this.props, 'match.params.viewAll');
        if (viewAll) {
            let pageId = _.get(this.props, 'match.params.pageId');
            this.props.history.push(`/${pageId}`);
            window.location.reload();
        } else {
            window.location.reload();
        }

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
        let { strings } = this.props;

        return (

            <FormControl fullWidth className={classes.formControl} >
                <div className={classes.list}>
                    <SVG src={icondepartment} className={classes.CloseButton}>

                    </SVG>
                    <Input
                        // disabled
                        // disableUnderline={true}
                        id="adornment-amount"
                        value={(_.get(this.state, "filterData.duration.title") || this.state.value)}
                        style={{
                            color: '#000000',
                            margin: '0 0px 0 0',
                            // width: _.get(this.state, "filterData.duration.title") ? '200px' : '200px'
                            width: isMobile ? '200px' : '150px'
                        }}
                        // onChange={handleChange('amount')}
                        //     startAdornment={<InputAdornment position="start">
                        //     <SVG src={icondepartment} className={classes.CloseButton}>

                        //     </SVG>
                        // </InputAdornment>}
                        endAdornment={<DropDownIcon style={{ color: '#656565' }}></DropDownIcon>}
                        onClick={this.openPicker.bind(this)}
                    />
                    <DateRange
                        selectBtn={strings["DSS_SELECT"] || "SELECT"}
                        cancelBtn={strings["DSS_CANCEL"] || "CANCEL"}
                        key={"DateRange"}
                        id="date-range"
                        title1={(_.get(this.state, "filterData.duration.title") || this.state.value)}
                        keepMounted
                        open={this.state.open}
                        onClose={this.handleClose.bind(this)}
                        value={this.state.value}
                        handleSelectedOk={this.handleChanges.bind(this)}
                    ></DateRange>
                    {/* // handleApplyFilter={this.handleApplyFilter.bind(this)} */}
                </div>
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
            <SwitchButton type="small" topMmargin="5px" padding="3px" fontSize="14px" selected={this.state.filterData[label] || data[0]} target={label} data={newData} handleSelected={this.handleChanges}></SwitchButton>
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

    renderAutoComplete(target, hndlslected, defaultV, data) {
        return (<AutoComplete
            logo={target}
            handleSelected={hndlslected}
            target={target}
            open={this.state.multiselectStateIsOpen}
            defaultValue={defaultV}
            item={data ? data : []}
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
                        return this.renderAutoComplete(object.label, this.handleChanges, this.state.ulbs, object.values)
                    case "DDRs":
                        return this.renderAutoComplete(object.label, this.handleChanges, this.state.ddrs, object.values)
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

    renderUlbFilters(object) {
        let type = object.type;
        let label = object.label;

        switch (type) {
            case "dropdown":
                switch (label) {
                    case "Date Range":
                        return this.renderDateRange(object.label, object.values);
                    case "ULBS":
                        return this.renderAutoComplete(object.label, this.handleFilterChange.bind(this), this.state.ulbs, this.state.tenentName)
                    case "Wards":
                        console.log('loading wards', this.state)
                        return this.renderAutoComplete(object.label, this.handleChanges, this.state.ulbs, this.state.wards)
                }
                break;
            case "switch":
                return this.renderSwitch(object.label, object.values)
                break;
        }
    }

    handleOnDelete(target, value) {
        let filterData = this.state.filterData;

        let newFilterData = []
        if (filterData[target] && Array.isArray(filterData[target])) {
            filterData[target].map((data) => {
                if (data !== value) {
                    newFilterData.push(data)
                }
            })
        }
        filterData[target] = newFilterData
        this.setState({ filterData: filterData, DDRs: newFilterData });
        if (typeof this.props.applyFilters === 'function') {
            // this.props.applyFilters(filterData);
            this.setState({
                DDRs: newFilterData,
                // defaultV: newFilterData
            })
        }
        if (target === 'ULBS') {
            this.setState({
                ulbs: newFilterData
            })
        }
        if (target === 'DDRs') {
            this.setState({
                ddrs: newFilterData
            })
        }
    }

    renderFilters() {
        let { classes, GFilterData } = this.props;
        return <div className={classes.fVisible}>
            {GFilterData && GFilterData.DDRs && GFilterData.DDRs.length > 0 && <div className={classes.fVRow}>
                <div className={classes.fTitle}><span style={{ margin: !isMobile ? 'auto' : '' }}>Selected DDRs:</span></div>
                <div className={classes.mChips}>
                    {GFilterData.DDRs.map(item => {
                        let handleOnDelete = this.handleOnDelete.bind(this)
                        return <div style={{ margin: isMobile ? '4px 0 0 0' : '0 4px 0 0' }}>
                            {/* <Chip fullwidth className={classes.mCustomChip} label={item} color={'gray'}  onDelete={() => handleOnDelete('DDRs',item)}> */}

                            <Chip fullwidth className={classes.mCustomChip} label={item} style={{ padingLeft: '3px' }} color={'gray'} >
                            </Chip></div>
                    })

                    }
                </div>
            </div>}
            {GFilterData && GFilterData.ULBS && GFilterData.ULBS.length > 0 && <div className={classes.fVRow}>
                <div className={classes.fTitle}><span style={{ margin: !isMobile ? 'auto' : '' }}>Selected ULBs:</span></div>
                <div className={classes.mChips}>
                    {GFilterData.ULBS.map(item => {
                        let handleOnDelete = this.handleOnDelete.bind(this)
                        return <div style={{ margin: isMobile ? '4px 0 0 0' : '0 4px 0 0' }}>
                            {/* <Chip className={classes.mCustomChip} label={item} color={'gray'} onDelete={() => handleOnDelete('ULBS',item)}></Chip></div> */}

                            <Chip className={classes.mCustomChip} label={item} color={'gray'}></Chip></div>
                    })

                    }</div>
            </div>
            }
        </div>
    }

    render() {
        let { classes, globalFilterData, ulbFilter, mdmsData, GFilterData, ulbFilters } = this.props;
        let { strings } = this.props;
        let role = this.props.dashboardConfigData && Array.isArray(this.props.dashboardConfigData) && this.props.dashboardConfigData.length > 0 && this.props.dashboardConfigData[0].roleName && this.props.dashboardConfigData[0].roleName

        console.log(role)
        if (role) {
            if (role !== 'Admin') {
                console.log('Admin calling')
                return (
                    <Cards key="gf" fullW={true}>
                        <div className={classes.mainFilter}>

                            {globalFilterData.map(ro => {
                                if (this.props.hideDepart && ro.label == "Services") {
                                    return (<div></div>);

                                } else if (ro.label == "DDRs") {
                                    return (
                                        <div key={ro.label} className={`${classes.filterS} ${"GF_" + ro.label}`}>
                                            <div className={classes.filterHead}>{strings[ro.label_locale] || ro.label_locale}</div>
                                            {this.renderComponents(mdmsData)}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={ro.label} className={`${classes.filterS} ${"GF_" + ro.label}`}>
                                            <div className={classes.filterHead}>{strings[ro.label_locale] || ro.label_locale}</div>
                                            {this.renderComponents(ro)}
                                        </div>
                                    );
                                }
                            })
                            }
                            {/* <div className={`${classes.filterS} ${classes.fullWidth}`}>
    
                        </div> */}

                            {/* {isMobile && this.renderFilters()}s */}

                            {isMobile ? <div id="divNotToPrint" className={classes.actions} style={{ maxWidth: "inherit", marginTop: '7px' }}>
                                <ActionButtons buttonType="default" fontSize="16px" text={strings["DSS_CLEAR_ALL"] || "DSS_CLEAR_ALL"} disableed={Object.keys(this.state.filterData).length == 0} clas={classes.clearbtn} handleClick={this.clearFilter.bind(this)} />
                                <ActionButtons containedButton={true} buttonType="default" fontSize="16px" text={strings["DSS_APPLY"] || "DSS_APPLY"} clas={classes.clearbtn} handleClick={this.applyFilter.bind(this)} />
                            </div>
                                :
                                <div id="divNotToPrint" className={classes.actions} style={{ maxWidth: 300, marginTop: '7px' }}>
                                    <ActionButtons buttonType="default" fontSize="16px" text={strings["DSS_CLEAR_ALL"] || "DSS_CLEAR_ALL"} disableed={Object.keys(this.state.filterData).length == 0} clas={classes.clearbtn} handleClick={this.clearFilter.bind(this)} />
                                    <ActionButtons containedButton={true} buttonType="default" fontSize="16px" text={strings["DSS_APPLY"] || "DSS_APPLY"} clas={classes.clearbtn} handleClick={this.applyFilter.bind(this)} />
                                </div>
                            }
                        </div>

                        {/* {!isMobile && this.renderFilters()} */}

                        {/* <div className={classes.fVisible}>
                        {GFilterData && GFilterData.DDRs && GFilterData.DDRs.length > 0 && <div className={classes.fVRow}>
                            <div className={classes.fTitle}><span style={{ margin: 'auto' }}>Selected DDRs:</span></div>
                            <div className={classes.mChips}>
                                {GFilterData.DDRs.map(item => {
                                    let handleOnDelete = this.handleOnDelete.bind(this)
                                    return <Chip className={classes.mCustomChip} label={item} color={'gray'} onDelete={() => handleOnDelete(item)}></Chip>
                                })
    
                                }
                            </div>
                        </div>}
                        {GFilterData && GFilterData.ULBS && GFilterData.ULBS.length > 0 && <div className={classes.fVRow}>
                            <div className={classes.fTitle}><span style={{ margin: 'auto' }}>Selected ULBs:</span></div>
                            <div className={classes.mChips}>
                                {GFilterData.ULBS.map(item => {
                                    return <div style={{ marginRight: '5px' }}><Chip className={classes.mCustomChip} label={item} color={'gray'}></Chip></div>
                                })
    
                                }</div>
                        </div>
                        }
                    </div> */}

                    </Cards>
                );
            } else {

                return (
                    <Cards key="gf" fullW={true}>
                        <div className={classes.mainFilter}>


                            {ulbFilters.map(ro => {

                                return (
                                    <div key={ro.label} className={`${classes.filterS} ${"GF_" + ro.label}`}>
                                        <div className={classes.filterHead}>{strings[ro.label_locale] || ro.label_locale}</div>
                                        {this.renderUlbFilters(ro)}
                                    </div>
                                );
                            })
                            }

                            {isMobile ? <div id="divNotToPrint" className={classes.actions} style={{ maxWidth: "inherit", marginTop: '7px' }}>
                                <ActionButtons buttonType="default" fontSize="16px" text={strings["DSS_CLEAR_ALL"] || "DSS_CLEAR_ALL"} disableed={Object.keys(this.state.filterData).length == 0} clas={classes.clearbtn} handleClick={this.clearFilter.bind(this)} />
                                <ActionButtons containedButton={true} buttonType="default" fontSize="16px" text={strings["DSS_APPLY"] || "DSS_APPLY"} clas={classes.clearbtn} handleClick={this.applyFilter.bind(this)} />
                            </div>
                                :
                                <div id="divNotToPrint" className={classes.actions} style={{ maxWidth: 300, marginTop: '7px' }}>
                                    <ActionButtons buttonType="default" fontSize="16px" text={strings["DSS_CLEAR_ALL"] || "DSS_CLEAR_ALL"} disableed={Object.keys(this.state.filterData).length == 0} clas={classes.clearbtn} handleClick={this.clearFilter.bind(this)} />
                                    <ActionButtons containedButton={true} buttonType="default" fontSize="16px" text={strings["DSS_APPLY"] || "DSS_APPLY"} clas={classes.clearbtn} handleClick={this.applyFilter.bind(this)} />
                                </div>
                            }
                        </div>

                    </Cards>
                );
            }
        }
        else {
            return (<div></div>)
        }

    }

}

const mapStateToProps = (state) => {
    return {
        mdmsData: state.mdmsData,
        globalFilterData: state.globalFilter,
        GFilterData: state.GFilterData,
        strings: state.lang,
        tenents: state.tenents,
        wards: state.wards,
        dashboardConfigData: state.firstReducer.dashboardConfigData,
        ulbFilters: state.ulbFilters
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport,
        updateFilterData: updateGlobalFilterData,
        TenentTransporter: APITransport,
        WardTransporter: APITransport,

    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(GlobalFilter)));
