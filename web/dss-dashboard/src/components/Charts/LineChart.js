import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NFormatterFun from '../common/numberFormaterFun';

const options = {
  responsive: true,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 10
    }
  }
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    let temp, tempdata;
    temp = this.props.chartData.data;
    tempdata = {
      labels: [],
      datasets: []
    };
    let color = ["#99d4fa", "#179cf4", "#179cf4", "#1d9cf4", "#1sacq4", "#1gvcf4"];

    temp.map((d, i) => {
      let tempObj = {
        label: "",
        borderColor: color[i],
        backgroundColor: color[i],
        fill: false
      }
      let tempdataArr = [];
      let tempdatalabel = [];
      tempObj.label = d.headerName + " : " + NFormatterFun(d.headerValue, d.headerSymbol, this.props.GFilterData['Denomination']);
      d.plots.map((d1, i) => {
        tempdataArr.push(NFormatterFun(d1.value, d1.symbol, this.props.GFilterData['Denomination']));
        tempdatalabel.push(d1.name);
      })
      tempObj.data = tempdataArr;
      tempdata.labels = tempdatalabel;
      tempdata.datasets.push(tempObj);
    })

    this.setState({ data: tempdata })
  }
  render() {
    if (this.state.data) {
      return (
        <div>
          {/* <ul className="list list-inline">
                <li style={{textAlign:'left'}}>{this.props.label} 
                { this.props.section !="Service" && <i>(In {this.props.GFilterData['Denomination']}) </i>}</li>
            </ul> */}
          <Line
            data={this.state.data}
            options={options}
            height={175}
          />
        </div>
      )
    }
    return <div>Loading...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    GFilterData: state.GFilterData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
