import React from "react";
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from '../../../actions/apitransport/apitransport';
import { Typography, Tooltip } from '@material-ui/core';
import style from './Style';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import getChartOptions from '../../../actions/getChartOptions';
import ChartsAPI from '../../../actions/charts/chartsAPI'
import NFormatter from '../numberFormater';
import { isMobile } from "react-device-detect";

class CustomCard extends React.Component {
    constructor(props) {
        super(props);
    }

    callAPI() {
        let code = this.props.chartData['id'] ? this.props.chartData['id'] : "";
        let filters = this.props.filters
        console.log(filters)
    
        if(this.props.page.includes('ulb')) {
          if(!filters['tenantId']) {
            console.log('=======tenet Id not there Home comp========')
            let tenentFilter = []
            tenentFilter.push(`${localStorage.getItem('tenant-id')}`)
            filters['tenantId'] = tenentFilter
          }
        }
        console.log(filters)

        let requestBody = getChartOptions(code, filters);
        let chartsAPI = new ChartsAPI(2000, 'dashboard', code, requestBody.dataoption);
        this.props.APITransport(chartsAPI);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        const { classes, strings, type, chartLabelName, page } = this.props;

        let codekey = _.chain(this.props).get('chartData').get("id").value();
        let data = _.chain(this.props).get("chartsGData").get(codekey).get("data").map((d, i) => {
            return {
                "label": d.headerName,
                "valueSymbol": d.headerSymbol,
                "value": d.headerValue,
                "plots": d.plots
            }
        }).first().value() || null;

        if (data) {
            let label1 = data.label ? (strings[data.label] ? strings[data.label] : data.label) : '';
            let label = !isMobile && label1.length > 11 ? label1.substring(0, 15) + "..." : label1 

            return (
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {/* <div style={{ minHeight: type === 'module' ? (isMobile ? '0px' : '50px') : '0px' }}> */}
                        <div>
                            <Tooltip title={label1} placement="top">
                                <Typography className={classes.subTitle}>{label}</Typography>
                            </Tooltip>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography className={classes.value}>
                            <NFormatter value={data.value} nType={data.valueSymbol} />

                            {/* {data.value ? (Number.isInteger(data.value) ? data.value : (data.value).toFixed(2)) : 0} */}
                        </Typography>
                    </Grid>

                </Grid>
            )
        }
        return <div>Loading...</div>
    }
}

const mapStateToProps = state => ({
    strings: state.lang,
    dashboardConfigData: state.firstReducer.dashboardConfigData,
    chartsGData: state.chartsData
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
)(CustomCard));