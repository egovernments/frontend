import React from "react";
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from '../../actions/apitransport/apitransport';
import { Typography } from '@material-ui/core';
import style from './styles';
import { withStyles } from '@material-ui/core/styles';
import Card from "../common/Card/Card";
import CardBody from "../common/Card/CardBody.js";
import CardHeader from "../common/Card/CardHeader.js";
import CardIcon from "../common/Card/CardIcon.js";
import CustomCard from '../common/CustomCard/CustomCard'
import Paper from '@material-ui/core/Paper';
import Variables from '../../styles/variables'
import Icons from '../common/Icon/Icon'
import Config from '../../config/configs'
import getFilterObj from '../../actions/getFilterObj';
import history from '../../utils/web.history';
import _ from 'lodash';
import dashboardAPI from '../../actions/dashboardAPI';
import { isMobile } from 'react-device-detect';
import CustomizedMenus from '../Dashboard/download';
import CustomizedShare from '../Dashboard/share';
import FilterIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Menu from '../common/CustomMenu'
import getFinancialYearObj from '../../actions/getFinancialYearObj';

const new_array_val = []
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: this.props.GFilterData,
            page: _.get(this.props, 'match.params.pageId'),
            dontShowHeader: true,
            dashboardConfigData: []
        };
    }

    async componentDidMount() {
        await this.workingOnLabelText()
    }

    lightenDarkenColor(col, amt) {
        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        let color = (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        return color
    }

    handleOnClick() {
        let path = ''
        if (window.location.pathname && window.location.pathname.includes('ulb-')) {
            path = 'ulb-overview'
            console.log("----setting path ul1----", path)
        } else {
            path = 'overview'
            console.log("----setting path home1----", path)

        }
        history.push(`${process.env.PUBLIC_URL}/` + path)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dashboardConfigData !== this.props.dashboardConfigData) {
            this.setState({
                dashboardConfigData: this.props.dashboardConfigData
            })
        }
    }

    renderChart(data, index) {
        let { chartLabelName } = this.state;
        let { classes, strings } = this.props;
        let filters = getFilterObj(this.props.GFilterData, this.props.globalFilterData, this.state.page);
        let bgColor = Variables.colors[index].light
        let iconColor = Variables.colors[index].dark
        let pageId = ''
        let moduleLevel = ''

        if(data){
            if(data.ref && data.url) {
                pageId = data && data.ref && data.ref.url
            }
            if(data.moduleLevel) {
                moduleLevel = data.moduleLevel
            }
        }

        if (data.vizType.toUpperCase() === 'COLLECTION') {
            let url = Config.DEMO_API_URL + Config.APP_NAME + pageId
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.paper} style={{ paddingBottom: '5px' }}>
                    <Paper className={classes.paperStyle} onClick={() => this.handleOnClick()}>
                        <div className={classes.paperContainer}>
                            <div>
                                <Paper className={classes.iconPaper}>
                                    <div >
                                        <Icons type={data.name}></Icons>
                                    </div>
                                </Paper>
                            </div>
                            <div className={classes.paperValues}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div style={{ textAlign: 'left', color: 'black' }}>
                                            {/* <h3 style={{ padding: '5px', margin: '0px' }}>{strings[data.name] || data.name}</h3> */}
                                            <Typography className={classes.paperTitle}>{strings[data.name] || data.name}</Typography>

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Grid container spacing={24}>
                                            {
                                                data && data.charts && Array.isArray(data.charts) && data.charts.length > 0 && data.charts.map((d, i) => {
                                                    return <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.customCard}><CustomCard key={d.id} moduleLevel={moduleLevel} chartData={d} filters={filters} type="overview" page={window.location.pathname || ''}></CustomCard></Grid>
                                                })
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </div>
                        </div>

                    </Paper>
                </Grid>
            )
        }
        else {
            return (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.root} >

                    <Card color="blue" bgColor={bgColor} page={pageId || 'overview'}>
                        <CardHeader color="rose" icon page={pageId || 'overview'}>
                            <CardIcon color="rose" bgColor={iconColor}>
                                <Icons type={data.name}></Icons>
                            </CardIcon><div style={{ textAlign: 'left', color: 'black', }}>
                                <Typography className={classes.cardTitle}>{strings[data.name] || data.name}</Typography>
                            </div>

                        </CardHeader>
                        <CardBody page={pageId || 'overview'}>
                            <Grid container spacing={24}>
                                {
                                    data && data.charts && Array.isArray(data.charts) && data.charts.length > 0 && data.charts.map((d, i) => {

                                        return <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.customCard}>
                                            <CustomCard chartLabelName={chartLabelName} key={d.id} moduleLevel={moduleLevel} chartData={d} filters={filters} type="module" page={window.location.pathname || ''}></CustomCard></Grid>
                                    })
                                }
                            </Grid>
                        </CardBody>
                    </Card>
                </Grid>
            )
        }

    }

    callDashboardAPI() {
        let dashboardApi = new dashboardAPI(20000);
        let overview = false
        if (_.toLower(this.state.page) === 'dashboard' || typeof this.state.page == 'undefined') {
            overview = true
        } else {
            this.setState({
                dontShowHeader: false
            })
        }
        console.log(window.location.pathname);
        console.log(window.location.href);

        let path = ''
        if (window.location.pathname && window.location.pathname.includes('ulb-')) {
            path = 'ulb-home'
            console.log("----setting path ul----", path)
        } else {
            path = 'home'
            console.log("----setting path home----", path)

        }
        this.props.APITransport(dashboardApi, path || 'home');

    }

    componentDidMount() {
        let getFYobj = getFinancialYearObj();

        let newFilterData = this.state.filter

        newFilterData.duration.value.startDate = getFYobj.value.startDate
        newFilterData.duration.value.endDate = getFYobj.value.endDate

        this.setState({
            filter: newFilterData
        })
        this.callDashboardAPI();
    }

    render() {
        let { classes, strings } = this.props;
        let { dashboardConfigData } = this.state;
        let tabsInitData = dashboardConfigData && Array.isArray(dashboardConfigData) && dashboardConfigData.length > 0 && dashboardConfigData[0] ? dashboardConfigData[0] : ''
        let dashboardName = dashboardConfigData && Array.isArray(dashboardConfigData) && dashboardConfigData.length >= 0 && dashboardConfigData[0] && dashboardConfigData[0].name && dashboardConfigData[0].name
        return (
            <Grid container spacing={24} id="divToPrint">
                <Grid container spacing={24} className={classes.actions}>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.pageHeader}>
                        {this.props.strings[dashboardName] || dashboardName}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{ textAlign: 'right', justifyContent: 'flex-end' }}>
                        {isMobile && <div id="divNotToPrint" data-html2canvas-ignore="true" className={classes.posit}>

                            <Menu type="download" bgColor="white" color="black" fileHeader="SURE Dashboard" fileName={dashboardName}></Menu>
                            {!this.state.dontShowHeader &&
                                <Button className={classes.btn1} data-html2canvas-ignore="true"
                                    onClick={this.handleFilters.bind(this)}
                                    fileName={dashboardName}
                                >
                                    <FilterIcon></FilterIcon>
                                </Button>
                            }
                        </div>
                        }

                        {!isMobile && <div id="divNotToPrint" className={classes.acbtn} style={{ display: 'flex', justifyContent: 'flex-end', }}>
                            <CustomizedMenus key="download" fileName={dashboardName} fileHeader="State Wide Urban Real-Time Executive (SURE) Dashboard" />
                            <CustomizedShare key="share" fileName={dashboardName} />
                        </div>}
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography className={classes.filter}>{strings[tabsInitData.title] || tabsInitData.title}</Typography>
                </Grid>

                {/* {tabsInitData.visualizations && Array.isArray(tabsInitData.visualizations) && tabsInitData.visualizations.length > 0 && this.gettingData(tabsInitData.visualizations)} */}
                {tabsInitData.visualizations && Array.isArray(tabsInitData.visualizations) && tabsInitData.visualizations.length > 0 && tabsInitData.visualizations.map((k, v) => {
                    return (
                        k.vizArray && Array.isArray(k.vizArray) && k.vizArray.length > 0 && k.vizArray.map((data, index) => {
                            // if (data.vizType.toUpperCase() !== 'COLLECTION') { this.gettingData(data) }
                            return (this.renderChart(data, index))

                        })
                    )
                })}

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    strings: state.lang,
    dashboardConfigData: state.firstReducer.dashboardConfigData,
    globalFilterData: state.globalFilter,
    GFilterData: state.GFilterData
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            APITransport: APITransport,
        },
        dispatch
    );

export default withStyles(style)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));