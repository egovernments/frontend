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
import { isMobile } from 'react-device-detect';
import Variables from '../../styles/variables'
import Icons from '../common/Icon/Icon'
import Config from '../../config/configs'
import getFilterObj from '../../actions/getFilterObj';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            page: this.props.page
        };
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

    renderChart(data, index) {
        let { classes, strings } = this.props;
        let filters = getFilterObj(this.props.GFilterData, this.props.globalFilterData, this.state.page);
        let bgColor = Variables.colors[index].light
        let iconColor = Variables.colors[index].dark
        let pageId = data && data.ref && data.ref.url
        if (data.vizType.toUpperCase() === 'COLLECTION') {
            let url = Config.DEMO_API_URL + Config.APP_NAME + pageId
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.paper} style={{ paddingBottom: '5px' }}>
                    <a href={url} style={{ textDecoration: 'none' }}>
                        <Paper style={{ padding: '15px', backgroundColor: 'rgba(33, 150, 243, 0.24)' }}>
                            <Grid container spacing={24}>

                                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} style={{ vertical: 'bottom', horizontal: 'center' }}>
                                    <Paper className={classes.iconPaper}>
                                        <div >
                                            <Icons type={data.name}></Icons>

                                        </div>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={12} md={11} lg={11} xl={11} className={classes.grid}>
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
                                                    return <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.customCard}><CustomCard key={d.id} chartData={d} filters={filters}></CustomCard></Grid>
                                                })
                                            }
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>

                        </Paper>
                    </a>
                </Grid>
            )
        }
        else {
            return (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className={classes.root} >

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
                                        return <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.customCard}><CustomCard key={d.id} chartData={d} filters={filters}></CustomCard></Grid>
                                    })
                                }
                            </Grid>
                        </CardBody>
                    </Card>
                </Grid>
            )
        }

    }

    render() {
        let { classes, strings } = this.props;
        let { dashboardConfigData } = this.props;
        let tabsInitData = dashboardConfigData && Array.isArray(dashboardConfigData) && dashboardConfigData.length > 0 && dashboardConfigData[0] ? dashboardConfigData[0] : ''

        return (
            <Grid container spacing={24}>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography className={classes.filter}>{strings[tabsInitData.title] || tabsInitData.title}</Typography>
                </Grid>

                {
                    tabsInitData.visualizations && Array.isArray(tabsInitData.visualizations) && tabsInitData.visualizations.length > 0 && tabsInitData.visualizations.map((k, v) => {
                        return (
                            k.vizArray && Array.isArray(k.vizArray) && k.vizArray.length > 0 && k.vizArray.map((data, index) => {
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
            APITransporter: APITransport,
        },
        dispatch
    );

export default withStyles(style)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));