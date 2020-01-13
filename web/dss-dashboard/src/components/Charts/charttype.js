import React from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TableChart from './TableChart';
import _ from 'lodash';
import getChartOptions from '../../actions/getChartOptions';
import ChartsAPI from '../../actions/charts/chartsAPI'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import APITransport from '../../actions/apitransport/apitransport';
import DonutChart from './DonutChart'

class ChartType extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, unit: this.props.GFilterData['Denomination'] }
    }

    componentDidMount() {
        this.callAPI();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            unit: this.props.GFilterData['Denomination']
        })
        // this.getRequest(this.props, nextProps.filters, nextProps);
    }

    callAPI() {
        let code = this.props.chartData[0]['id'] || "";
        let requestBody = getChartOptions(code, this.props.filters || {});

        let chartsAPI = new ChartsAPI(2000, 'dashboard', code, requestBody.dataoption);
        this.props.APITransport(chartsAPI);
    }
    // getData(chartData) {
    // 	var tempData = {
    // 		labels: [],
    // 		datasets: []
    // 	};
    // 	var tempdataSet = {
    // 		label: "",
    // 		backgroundColor: ["#35a2eb", "#f19c56", "#4c76c7", "#ff6384",],
    // 		data: [],
    // 		dataSymbol: []
    // 	};

    // 	_.map(chartData, function (k, v) {
    // 		var plots = k['plots'];
    // 		for (var i = 0; i < plots.length; i++) {
    // 			tempData.labels.push(plots[i]['name']);
    // 			tempdataSet.data.push(NFormatterFun(plots[i]['value'], plots[i]['symbol'], this.props.GFilterData['Denomination']));
    // 			tempdataSet.dataSymbol.push([plots[i]['symbol'], this.props.GFilterData['Denomination']]);
    // 		}
    // 	}.bind(this))
    // 	tempData.datasets.push(tempdataSet);
    // 	return tempData;
    // }
    render() {
        let chartKey = _.chain(this.props).get('chartData').first().get('id').value();
        let chartType = _.chain(this.props).get('chartData').first().get('chartType').toUpper().value();
        let data = _.chain(this.props).get('chartsGData').get(chartKey).get('data').value();

        if (data) {
            // var chartData = this.state.data.responseData;
            // this.state.data = null;
            switch (chartType) {
                case 'PIE':
                    return <DonutChart chartData={data}
                        label={this.props.label}
                        unit={this.state.unit}
                        GFilterData={this.props.GFilterData}
                        dimensions={this.props.dimensions}
                        section={this.props.section}
                    />
                case 'DONUT':
                    return <DonutChart chartData={data}
                        label={this.props.label}
                        unit={this.state.unit}
                        GFilterData={this.props.GFilterData}
                        dimensions={this.props.dimensions}
                        section={this.props.section}
                    />
                case 'LINE':
                    return <LineChart chartData={data}
                        label={this.props.label}
                        unit={this.state.unit}
                        GFilterData={this.props.GFilterData}
                        dimensions={this.props.dimensions}
                        section={this.props.section}
                    />
                case 'BAR':
                    return <BarChart chartData={data}
                    label={this.props.label}
                    unit={this.state.unit}
                    GFilterData={this.props.GFilterData}
                    dimensions={this.props.dimensions}
                    section={this.props.section}
                    />
                case 'TABLE':
                    return <TableChart chartData={data}
                        chartKey={chartKey}
                        chartParent={this.props.chartData}
                        unit={this.state.unit}
                        GFilterData={this.props.GFilterData}
                        filters={this.props.filters}
                        dimensions={this.props.dimensions}
                        section={this.props.section}
                        label={this.props.label}
                    />
                default:
                    return false;
            }
        }
        return <div > Loading... </div>
    }
}
const mapStateToProps = (state) => {
    return {
        dashboardConfigData: state.firstReducer.dashboardConfigData,
        GFilterData: state.GFilterData,
        chartsGData: state.chartsData
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport,
        // updateFilterData: updateGlobalFilterData
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ChartType);