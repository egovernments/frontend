import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import APITransport from '../../actions/apitransport/apitransport';
import dashboardAPI from '../../actions/dashboardAPI';
import GlobalFilter from '../common/globalFilter/index';
import { isMobile } from 'react-device-detect';
import { updateGlobalFilterData } from '../../actions/globalFilter/GFilterAction';
import style from './styles';
import PageLayout from '../Charts/pagelayout';
import CustomizedMenus from './download';
import CustomizedShare from './share';
import FilterIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Menu from '../common/CustomMenu'
import _ from 'lodash';
import getChartOptions from '../../actions/getChartOptions';
import getFilterObj from '../../actions/getFilterObj';

import ChartsAPI from '../../actions/charts/chartsAPI';

let page = 'home';
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.GFilterData,
      isFilterOpen: false
    }

  }

  callDashboardAPI() {
    let dashboardApi = new dashboardAPI(20000);
    this.props.APITransport(dashboardApi, page);
  }

  componentDidMount() {
    this.callDashboardAPI();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.dashboardConfigData != this.props.dashboardConfigData) {
    //   let allChartsapi = new AllChartsAPI(20000, 'dashboard',
    //     {
    //       "aggregationRequestDto": {
    //         "visualizations": [
    //           {
    //             "type": "METRIC",
    //             "code": "cumulativeCollection"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "topPerformingUlbs"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "bottomPerformingUlbs"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "totalCollectionDeptWise"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "totalApplication&ClosedApplication"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "topPerformingUlbsCompletionRate"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "bottomPerformingUlbsCompletionRate"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "totalApplicationDeptWise"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "totalCollection"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "targetCollection"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "cumulativeCollection"
    //           },
    //           {
    //             "type": "METRIC",
    //             "code": "targetAchieved"
    //           }
    //         ]
    //       }
    //     }, {});
    //   this.props.APITransport(allChartsapi, page);
    // }
  }

  share() {

  }
  callAll() {
    let { chartsData } = this.props;
    let filters = getFilterObj(this.props.GFilterData, this.props.globalFilterData, page);
    _.each(chartsData, (k, v) => {
      let code = v;
      if (code) {
        let requestBody = getChartOptions(code, filters);
        let chartsAPI = new ChartsAPI(2000, 'dashboard', code, requestBody.dataoption);
        this.props.APITransport(chartsAPI)
      }
    })
  }

  applyFilter(filterData) {
    /**
     * next to this step dynamic properties are not avaiblable
     */
    this.setState({
      filter: filterData
    })
    this.props.updateFilterData(filterData);

  }
  applyFiltersLive(filter) {
    console.log(filter);
    this.setState({
      filter: filter
    }, this.callAll())
  }

  handleFilters() {
    debugger;
    console.log(this.state.isFilterOpen, !isMobile);

    // let fil = this.state.isFilterOpen
    this.setState({
      isFilterOpen: !this.state.isFilterOpen
    })
  }

  render() {
    let { classes, dashboardConfigData, GFilterData } = this.props;
    let displayName = [true, false, true, false];
    return (
      <div id="divToShare" className={classes.dashboard}>
        <div className={classes.actions}>
          <span style={{ fontSize: '20px', flex: 1, textAlign: 'left', margin:'auto' }}>
            <span style={{ fontFamily: 'Roboto'}}>State Wide Urban Real-Time Executive (SURE) Dashboard
          </span>
          </span>
          {isMobile && <div className={[classes.desktop, classes.posit].join(' ')}>

            <Menu type="download" bgColor="white" color="black"></Menu>
            <Button className={classes.btn1}
              onClick={this.handleFilters.bind(this)}
            >
              <FilterIcon></FilterIcon>
            </Button>
          </div>}

          {!isMobile && <div className={classes.acbtn}>
            <CustomizedMenus key="download" fileName={"SURE Dashboard"} />
            <CustomizedShare key="share" PDFDownloads={this.share.bind(this)} />
          </div>}

        </div>
        <div className={classes.mobile} style={{paddingRight: '10px'}}>
          {/* <div className="elemClass"> */}
          {(this.state.isFilterOpen || !isMobile) &&
            <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={false} applyFiltersLive={this.applyFiltersLive.bind(this)} />
          }
        </div>

        {/* {this.state.isFilterOpen &&
          <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={false} applyFiltersLive={this.applyFiltersLive.bind(this)} />
        } */}

        <div id="divToPrint" className="elemClass">
          {dashboardConfigData.map((page, i) =>
            <PageLayout key={i} chartRowData={page.visualizations} headingTitle="Revenue" GFilterData={GFilterData} displayName={displayName} page={page} />

          )
          }
        </div>
        {/* </div> */}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dashboardConfigData: state.firstReducer.dashboardConfigData,
    globalFilterData: state.globalFilter,
    GFilterData: state.GFilterData,
    chartsData: state.chartsData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport,
    updateFilterData: updateGlobalFilterData
  }, dispatch)
}
export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));
