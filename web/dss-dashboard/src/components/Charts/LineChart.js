import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NFormatterFun from '../common/numberFormaterFun';
import { withStyles } from '@material-ui/core/styles';
import style from './styles';
import { isMobile } from 'react-device-detect';

const options = {
  scales: {
    xAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }
    }]
},
  responsive: true,
  options: {
    responsive: true,
    
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 10
    }
  }
};

// var options = {
//   scales: {
//       xAxes: [{
//           gridLines: {
//               color: "rgba(0, 0, 0, 0)",
//           }
//       }],
//       yAxes: [{
//           gridLines: {
//               color: "rgba(0, 0, 0, 0)",
//           }   
//       }]
//   }
// }

class LineChart extends React.Component {

  constructor(props) {
    super(props);
  }
  
  callforNewData(elems) {
		// console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
		// this.setState({ data: null })

	}
  manupulateData(chartData) {
    // let temp, tempdata;
    // temp = this.props.chartData;
    var tempdata = {
      labels: [],
      datasets: []
    };
    let color = ["#99d4fa", "#179cf4", "#179cf4", "#1d9cf4", "#1sacq4", "#1gvcf4"]; 
    chartData.map((d, i) => {
      let tempObj = {
        label: "",
        borderColor: color[i],
        backgroundColor: color[i],
        fill: false
      }
      let tempdataArr = [];
      let tempdatalabel = [],tempVal='';
      // let val = NFormatterFun(_.get(d,'headerValue.value'), _.get(d,'headerValue.symbol'), this.props.GFilterData['Denomination'])
      // tempObj.label = d.headerName + " : " + val;
      tempObj.label =   d.headerName;
      d.plots.map((d1, i) => {
        tempVal = NFormatterFun(d1.value, d1.symbol, this.props.GFilterData['Denomination']);
        tempVal = (typeof tempVal == 'string')?parseFloat(tempVal.replace(/,/g, '')):tempVal;
        tempdataArr.push(tempVal);
        tempdatalabel.push(d1.name);
      })
      tempObj.data = tempdataArr;
      tempdata.labels = tempdatalabel;
      tempdata.datasets.push(tempObj);
    })
    return tempdata;
  }

  render() { 
    let { chartData,classes } = this.props;
    let data = this.manupulateData(chartData);
    if (data) {
      if (isMobile){
            return ( 
              <div className={classes.lineChart}>
                <Line
                  style={{ fill: 'none'}}
                  data={data}
                  options={options}
                  onElementsClick={this.callforNewData.bind(this)} 
                  height={350}         
                >
                </Line>
              </div>
            )
      }else{
        return ( 
              <div className={classes.lineChart}>
                <Line
                  style={{ fill: 'none'}}
                  data={data}
                  options={options}
                  onElementsClick={this.callforNewData.bind(this)}
                >
                </Line>
              </div>
            )
      }
    }
    return <div>Loading...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    GFilterData: state.GFilterData,
    chartsGData: state.chartsData

  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
}
export default  withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(LineChart));
