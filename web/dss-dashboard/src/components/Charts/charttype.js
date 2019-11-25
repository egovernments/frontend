import React from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TableChart from './TableChart';
import CONFIGS from '../../config/configs';
import getChartOptions from '../../actions/getChartOptions';

export default class ChartType extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null }
    }
    componentDidMount() {
        let filters = this.props.filters ? this.props.filters : {};
        this.getRequest(this.props, filters);
    }
    componentWillReceiveProps(nextProps) {
        this.getRequest(this.props, nextProps.filters, nextProps);
    }

    getRequest(props, filters, nextProps) {
        let url = props.chartData[0]['id'] ? CONFIGS.BASE_URL + "/dashboard/getChartV2" : "";
        if (url) {
            let modulelevel = (nextProps && nextProps.modulelevel) ? nextProps.modulelevel : ""
            this.getRequest1(url, props.chartData[0]['id'], filters, modulelevel)
        }
    }
    getChartData(chartType, url) {
        this.props.chartData[0].map((d, i) =>
            this.props.getChartData(chartType, url)
        )
    }
    getRequest1(url, code, filters, moduleLevel) {
        let getAxiosOptions = getChartOptions(code,filters);        
        axios.post(getAxiosOptions.url, getAxiosOptions.dataoption, getAxiosOptions.options)
            .then(response => {
                this.setState({ data: response.data })
            })
            .catch(error => {
                console.log(error.response)
            });
    }
    render() {
        if (this.state.data) {
            var chartData = this.state.data.responseData;
            this.state.data = null;
            switch (this.props.chartData[0]["chartType"].toUpperCase()) {

                case 'PIE':
                    return <PieChart chartData={chartData} label={this.props.label} dimensions={this.props.dimensions} section={this.props.section} />
                case 'LINE':
                    return <LineChart chartData={chartData} label={this.props.label} dimensions={this.props.dimensions} section={this.props.section} />
                case 'BAR':
                    return <BarChart chartData={chartData} label={this.props.label} dimensions={this.props.dimensions} section={this.props.section} />
                case 'TABLE':
                    return <TableChart chartData={chartData} chartParent={this.props.chartData} dimensions={this.props.dimensions} section={this.props.section} />
                default:
                    return false;
            }
        }
        return <div>Loading...</div>
    }
}




