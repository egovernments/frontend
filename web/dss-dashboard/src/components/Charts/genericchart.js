import React from 'react';
import CollectionChart from './CollectionChart';
import PerformanceChart from './PerformanceChart'
import ChartType from './charttype';
import style from './layOutStyle';
import { withStyles } from '@material-ui/styles';
import Cards from '../common/Cards/Cards';
import variables from '../../styles/variables';

class GenericChart extends React.Component {

    setViewAll = (visualCode) =>{
        this.props.setViewAll(visualCode);
    }
    renderCharts(d, chartData) {
        // let {  page } = this.props;
        let filters = this.props.filters;
        switch (d.vizType.toUpperCase()) {
            case 'METRIC-COLLECTION':
                return <CollectionChart key={d.id} chartData={d.charts} filters={filters} dimensions={d.dimensions} section={chartData.name} />
            case 'PERFORMING-METRIC':
                return <PerformanceChart key={d.id} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section={chartData.name} setViewAll={this.setViewAll.bind(this)}/>
            case 'CHART':
                return <ChartType key={d.id} gFilter={this.props.gFilter} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section={chartData.name} />
            default:
                return <div></div>
        }
    }
    render() {
        let { classes, chartData, row } = this.props;
        let style = {
            flex: ((row == 0) ? '3' : '1'),
            backgroundColor: variables.widget_background,
            height: 'auto',
            margin: '10px 10px 10px 10px !important',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            // flex: 3
        }
        let style1 = {
            flex: ((row == 0) ? '2.1' : '1'),
            backgroundColor: variables.widget_background,
            height: 'auto',
            margin: '10px 10px 10px 10px !important',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            // flex: 2
        }
        return (
            <div className={classes.chartRow}>
                {chartData.vizArray.map((d, i) =>
                    // cardStyle={i == 1 ? style : style1} 
                    <Cards key={i} id={d.id} name={d.name} cardStyle={i == 1 && row === 0 ? style : style1} needInfo={true} title={d.name} noUnit={d.noUnit || false}>
                        {this.renderCharts(d, chartData)}
                    </Cards>

                )}
            </div>
        );
    }
}


export default withStyles(style)(GenericChart);