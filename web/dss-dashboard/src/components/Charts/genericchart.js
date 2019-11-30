import React from 'react';
import CollectionChart from './CollectionChart';
import PerformanceChart from './PerformanceChart'
import ChartType from './charttype';
import style from './layOutStyle';
import { withStyles } from '@material-ui/styles';
import Cards from '../common/Cards/Cards';

class GenericChart extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextprops) {
        //  console.log("GenericChart",nextprops, this.props);

    }

    renderCharts(d, chartData) {
        // let {  page } = this.props;
        let filters = this.props.filters;
        switch (d.vizType.toUpperCase()) {
            case 'METRIC-COLLECTION':
                return <CollectionChart key={d.id} chartData={d.charts} filters={filters} dimensions={d.dimensions} section={chartData.name} />
            case 'PERFORMING-METRIC':
                return <PerformanceChart key={d.id} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section={chartData.name} />
            case 'CHART':
                return <ChartType key={d.id} gFilter={this.props.gFilter} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section={chartData.name} />
            default:
                return <div></div>
        }
    }
    render() {
        let { classes, chartData } = this.props;
        return (
            <div className={classes.chartRow}>
                {chartData.vizArray.map((d, i) =>
                    <Cards key={i} id={d.id} name={d.name} needInfo={true} title={d.name} noUnit={d.noUnit || false}>
                        {this.renderCharts(d, chartData)}
                    </Cards>

                )}
            </div>
        );
    }
}


export default withStyles(style)(GenericChart);