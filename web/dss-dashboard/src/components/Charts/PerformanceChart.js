import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import NFormatter from '../common/numberFormater';
import style from './PerformanceChartStyle';
import getChartOptions from '../../actions/getChartOptions';

// const style = {
//   maincls: {
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'left',
//     margin: '10px 0px'
//   },
//   progess: {
//     margin: '5px 0px',
//     height: '5px',
//     borderRadius: '2.5px'
//   },
//   topLabel: {
//     fontFamily: 'Roboto',
//     fontSize: '12px',
//     fontWeight: '500',
//     fontStretch: 'normal',
//     fontStyle: 'normal',
//     lineHeight: 'normal',
//     letterSpacing: 'normal',
//     color: '#000000'
//   },
//   bottomLabel: {
//     fontFamily: 'Roboto',
//     fontSize: '10px',
//     fontStretch: 'normal',
//     fontStyle: 'normal',
//     lineHeight: 'normal',
//     letterSpacing: 'normal',
//     color: '#000000'
//   },
//   lightTooltip: {
//     background: variables.white,
//     color: variables.black,
//     // boxShadow: theme.shadows[1],
//     fontSize: 11,
//     fontFamily: variables.SecondaryFont
//   }
// }


class PerformanceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null }
  }
  formatPlotValue(value, type) {
    return <NFormatter value={value} nType={type} />
  }
  componentDidMount() {
    let filters = {};
    this.callRequest(this.props, filters);
  }

  callRequest(props, filters) {    
    let code = props.chartData[0]['id'] ? props.chartData[0]['id']: "";
    let label = props.chartData[0]['name'];    
    if (code) {
      let temp, tempdata;
      let getAxiosOptions = getChartOptions(code,filters);
      axios.post(getAxiosOptions.url, getAxiosOptions.dataoption, getAxiosOptions.options)
        .then(response => {

          temp = response.data['responseData']['data'];
          tempdata = {
            label: label,
            dataset: []
          };
          temp.map((d, i) => {
            if (i < 3) {
              let plot = d.plots[0];
              tempdata.dataset.push({
                "label": d.headerName + " " + d.headerValue + " : " + plot.name,
                "value": plot.value,
                "label2": plot.label + ": ",
                "color": (plot.value > 50) ? "#259b24" : "#e54d42"
              });
            }
          })
          this.setState({ data: tempdata })
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    let filters = {};
    this.callRequest(nextProps, nextProps.filters);
  }
  render() { 
    const { classes } = this.props;
    if (this.state.data) {
      return (<div>
        {/* <ul className="list-inline" style={{ paddingBottom: '15px' }}>
          <li className="pull-left">
            {this.state.data.label}

          </li> */}
        {/* <Tooltip title={this.state.data.label} style={{color:'blue',backgroundColor:'white'}}>

            <li className="pull-right"><span className="pull-right"><i className="fa fa-info-circle"></i></span></li>
          </Tooltip> */}
        {/* </ul> */}

        {this.state.data.dataset.map((d, i) =>
          <div className={classes.maincls} key={i}>
            <span className={classes.topLabel}>{d.label}</span>
            <div className={classes.progess + " progress"} >
              <div className="progress-bar" role="progressbar" style={{ width: d.value + '%', backgroundColor: d.color }} aria-valuenow={d[1]} aria-valuemin={0} aria-valuemax={100} />
            </div>
            <span className={classes.bottomLabel + " label"}>{d.label2}
              <NFormatter value={d.value} nType={'percentage'} />
            </span>
          </div>
        )}
      </div>
      )
    }
    return <div>Loading...</div>
  }
}

export default withStyles(style)(PerformanceChart);
