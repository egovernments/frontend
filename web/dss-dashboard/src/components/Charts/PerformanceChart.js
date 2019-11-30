import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NFormatter from '../common/numberFormater';
import _ from 'lodash';
import style from './PerformanceChartStyle';
import getChartOptions from '../../actions/getChartOptions';
import ChartsAPI from '../../actions/charts/chartsAPI'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialogs from '../common/Dialogs/Dialogs';
import APITransport from '../../actions/apitransport/apitransport';
import ActionButtons from '../common/inputs/ActionButtons';
import Cards from '../common/Cards/Cards';
import UiTable from '../common/UiTable/UiTable';

class PerformanceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, IsOpen: false }
  }
  formatPlotValue(value, type) {
    return <NFormatter value={value} nType={type} />
  }

  callAPI() {
    let code = this.props.chartData[0]['id'] ? this.props.chartData[0]['id'] : "";
    let requestBody = getChartOptions(code, {});

    let chartsAPI = new ChartsAPI(2000, 'dashboard', code, requestBody.dataoption);
    this.props.APITransport(chartsAPI);
  }

  componentDidMount() {
    // let filters = {};
    // this.callRequest(this.props, filters);
    this.callAPI();
  }
  handleClick() {
    this.setState({
      IsOpen: true
    })
  }
  closeDialogue() {
    this.setState({
      IsOpen: false
    })
  }
  renderCard(data) {
    console.log(data);

    let obj = {
      rank: "",
      ULBs: "",
      TargetAchieved: '',
      status: ''
    }
    let columnData = [];
    columnData.push({ id: 'rank', numeric: true, stickyHeader: false, disablePadding: false, label: 'Rank' })
    columnData.push({ id: 'ULBs', numeric: true, stickyHeader: false, disablePadding: false, label: 'ULBs' })
    columnData.push({ id: 'TargetAchieved', numeric: true, stickyHeader: false, disablePadding: false, label: 'Target Achieved' })
    columnData.push({ id: 'status', numeric: true, stickyHeader: false, disablePadding: false, label: 'Status' })
    let newData = _.chain(data).orderBy('value','desc').map((rowData, i) => {
      return {
        rank: (i + 1),
        ULBs: rowData.fortable,
        TargetAchieved: Math.floor((rowData.value || 0)) + '%',
        status: rowData.value,
      }
    }).value();


    return (<Cards >
      <UiTable
        data={newData}
        columnData={columnData}

        tableType='ULB'
        // cellClick={this.applyFilter.bind(this, visualcode, drillCode)}
        noPage={false}
        // Gfilter={this.props.GFilterData}
        needSearch={false}
        needExport={false}
        excelName={""}

      />
    </Cards >)
  }
  renderPopup(data) {
    const { classes } = this.props;
    if (data.length > 3) {
      return (<div className={classes.bottomDiv}>
        <ActionButtons buttonType={"default"} text={"View all ulbs"} handleClick={this.handleClick.bind(this)} />
        <Dialogs close={this.closeDialogue.bind(this)} IsOpen={this.state.IsOpen} title={"Back to MyDashboard"} needCustomTitle={true}>
          {this.renderCard(data)}
        </Dialogs>
      </div>)
    } else {
      return null;
    }
  }
  componentWillReceiveProps(nextProps) {
    // let filters = {};
    // this.callRequest(nextProps, nextProps.filters);
  }
  render() {
    let { strings } = this.props;

    const { classes } = this.props;
    let codekey = _.chain(this.props).get('chartData').first().get("id").value();
    let data = _.chain(this.props).get("chartsGData").get(codekey).get('data').map((d, i) => {
      let plot = d.plots[0];
      let label = _.chain(plot.name).split('.').join("_").toUpper().value();
      return {
        "fortable": (strings["TENANT_TENANTS_" + label] || label),
        "label": d.headerName + " " + d.headerValue + " : " + (strings["TENANT_TENANTS_" + label] || label),
        "value": plot.value,
        "label2": (strings[plot.label] || plot.label) + ": ",
        "color": (plot.value > 50) ? "#259b24" : "#e54d42"
      }
    }).compact().value() || [];

    if (data) {
      return (<div>
        {data.map((d, i) => {
          if (i < 4) {
            return (<div className={classes.maincls} key={i}>
              <span className={classes.topLabel}>{d.label}</span>
              <div className={classes.progess} >
                <div className={classes.progressLine} role="progressbar" style={{ width: d.value + '%', backgroundColor: d.color }} aria-valuenow={d[1]} aria-valuemin={0} aria-valuemax={100} />
              </div>
              <span className={classes.bottomLabel + " label"}>{d.label2}
                <NFormatter value={d.value} nType={'percentage'} />
              </span>
            </div>)
          }
        }
        )}
        {this.renderPopup(data)}
      </div>
      )
    }
    return <div>Loading...</div>
  }
}
const mapStateToProps = (state) => {
  return {
    dashboardConfigData: state.firstReducer.dashboardConfigData,
    GFilterData: state.GFilterData,
    chartsGData: state.chartsData,
    strings: state.lang

  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport,
    // updateFilterData: updateGlobalFilterData
  }, dispatch)
}
export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(PerformanceChart));
