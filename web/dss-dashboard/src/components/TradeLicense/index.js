import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
// // import { mainListItems, secondaryListItems } from '../common/utils';
// import SideBar from '../common/sidebar';
import { isMobile } from 'react-device-detect';

import CustomTabs from '../common/Tabs/Tabs';
import APITransport from '../../actions/apitransport/apitransport';
import dashboardAPI from '../../actions/dashboardAPI';
import PageLayout from '../Charts/pagelayout';
import styles from './styles';
import GlobalFilter from '../common/globalFilter';
import CustomizedMenus from '../Dashboard/download';
import CustomizedShare from '../Dashboard/share';
import FilterIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Menu from '../common/CustomMenu'
import { updateGlobalFilterData } from '../../actions/globalFilter/GFilterAction';
import { Typography } from '@material-ui/core';
import getChartOptions from '../../actions/getChartOptions';
import ChartsAPI from '../../actions/charts/chartsAPI';
import getFilterObj from '../../actions/getFilterObj';

let page = 'tradeLicense';
class TradeLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null,
      filter: this.props.GFilterData,
      isFilterOpen: false
    }
  }
  componentDidMount() {
    let dashboardApi = new dashboardAPI(20000);
    this.props.APITransport(dashboardApi, page);
    // this.props.updateFilterData({'Denomination': 'Lac'});
  }
  componentWillMount() {

    // if (this.props.location.pathname !== 'propertytax') {

    // }

  }
  handleFilters() {
    let fil = this.state.isFilterOpen
    this.setState({
      isFilterOpen: !fil
    })
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

  share() {

  }

  applyFiltersLive(filter) {
    // console.log(filter);
    this.setState({
      filter: filter
    }, this.callAll())
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
  tabChanged(value, v) {
    // console.log(value, v)
    this.setState({
      selectedTab: v
    });
  }
  render() {
    let { classes, dashboardConfigData, GFilterData } = this.props;
    // let displayName = [true, false, false, true, false, false];
    let tabsInitData = _.chain(dashboardConfigData).first().get("visualizations").groupBy("name").value();
    let tabs = _.map(tabsInitData, (k, v) => {
      return {
        name: v,
        key: v,
        lbl: v
      };
    });
    let defaultTab = this.state.selectedTab ? this.state.selectedTab : _.get(_.first(tabs), 'name')

    return (<div className={classes.dashboard}>
      <div className={classes.actions}>
        <span style={{ fontSize: '20px', flex: 1, textAlign: 'left' }}>
          <span style={{ fontFamily: 'Roboto' }}>Trade License Dashboard</span>
        </span>

        {isMobile && <div className={[classes.desktop, classes.posit].join(' ')}>
         
          <Menu type="download" bgColor="white" color="black" fileHeader="Trade License Dashboard"></Menu>
          <Button className={classes.btn1}
            onClick={this.handleFilters.bind(this)}
          >
            <FilterIcon></FilterIcon>
          </Button>

        </div>}

        {!isMobile && <div className={classes.acbtn}>
          <CustomizedMenus key="download" fileName={`SURE ${page}`} fileHeader="Trade License Dashboard" />
          <CustomizedShare key="share" PDFDownloads={this.share.bind(this)} />

        </div>}

      </div>
      <div className={classes.mobile} style={{ paddingRight: '10px' }}>
        {(this.state.isFilterOpen || !isMobile) &&
          <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={true} applyFiltersLive={this.applyFiltersLive.bind(this)} />
        }
      </div>

      {/* {this.state.isFilterOpen &&
        <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={true} applyFiltersLive={this.applyFiltersLive.bind(this)} />
      } */}


      <CustomTabs myTabs={tabs} value={defaultTab} handleChange={this.tabChanged.bind(this)}>

      </CustomTabs>
      {
        _.map(tabsInitData, (k, v) => {
          return (<Typography
            component="div"
            role="tabpanel"
            hidden={(defaultTab) !== v}
            id={`simple-tabpanel-${v}`}
            aria-labelledby={`simple-tab-${v}`}
          // {...other}
          >
            <div id={(defaultTab) === v ? "divToPrint" : 'divNotToPrint'} className={(defaultTab) === v ? "elemClass" : 'elemClass1'}>
              <PageLayout chartRowData={k} headingTitle="Revenue" GFilterData={GFilterData} displayName={""} page={page} />
            </div>
          </Typography>)
        })
      }


      {/* <div> */}
      {/* {dashboardConfigData.map((page, i) => <PageLayout chartRowData={page.visualizations} headingTitle="Revenue" GFilterData={GFilterData} displayName={displayName} page={page} />)} */}
      {/* </div> */}
      {/* <div className="table-wrapper" style={{ marginTop: '20px' }}>
        </div> */}

    </div>);
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
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TradeLicense)));
