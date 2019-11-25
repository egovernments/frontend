import React from 'react';
import CollectionChart from './CollectionChart';
import PerformanceChart from './PerformanceChart'
import ChartType from './charttype';
import style from './layOutStyle';
import { withStyles } from '@material-ui/styles';
import Cards from '../common/Cards/Cards';

class GenericChart extends React.Component{

    componentDidMount() {
        console.log(this.props);
    }
    renderCharts(d,chartData){
        // let {  page } = this.props;
        let filters =this.props.filters;       
        switch (d.vizType.toUpperCase()) {                                    
            case 'METRIC-COLLECTION':
                return <CollectionChart key={d.id} chartData={d.charts} filters = {filters} dimensions={d.dimensions} section ={chartData.name}/>
            case 'PERFORMING-METRIC':
                return <PerformanceChart key={d.id} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section ={chartData.name}/>
            case 'CHART':
                return <ChartType key={d.id} chartData={d.charts} label={d.name} filters={filters} dimensions={d.dimensions} section ={chartData.name}/>    
            default:
                return <div></div>                                 
    }
    }
    render(){
        let { classes, chartData } = this.props;
        return(
            <div className={classes.chartRow}>
            {chartData.vizArray.map((d,i)=>
            // className={"col-lg-"+d.dimensions.width}
            // style={{flex:d.dimensions.width }}
                // <div >
                // d.vizType.toUpperCase() ==='CHART'
                    <Cards key={i} id={d.id} name={d.name} needInfo={true } title={d.name}>
                   { this.renderCharts(d, chartData)}
                    </Cards>
                    // <div className="card" style={{minHeight:d.dimensions.height+"px",height:"100%"}}>
                    //     <div className="card-body">
                    //          {(() => {
                    //             console.log(d.vizType.toUpperCase());
                                
                    //                 switch (d.vizType.toUpperCase()) {                                    
                    //                         case 'METRIC-COLLECTION':
                    //                             return <CollectionChart key={d.id} chartData={d.charts} filters1 = {filters} modulelevel={modulelevel}/>
                    //                         case 'PERFORMING-METRIC':
                    //                             return <PerformanceChart key={d.id} chartData={d.charts} label={d.name} filters={filters} modulelevel={modulelevel}/>
                    //                         case 'CHART':
                    //                             return <ChartType key={d.id} chartData={d.charts} label={d.name} filters={filters} modulelevel={modulelevel}/>                                     
                    //                 }
                              
                    //         })()}
                    //     </div>
                    // </div>  
                // </div>
                )}
            </div>
        );
    }
}


export default withStyles(style)(GenericChart);