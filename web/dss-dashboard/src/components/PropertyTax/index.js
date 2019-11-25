import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
// // import { mainListItems, secondaryListItems } from '../common/utils';
// import SideBar from '../common/sidebar';
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

let page = 'propertyTax';
class PropertyTax extends Component {
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
    this.props.updateFilterData({'Denomination': 'Lac'});
  }

  handleFilters() {
    let fil = this.state.isFilterOpen
    this.setState({
      isFilterOpen: !fil
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
  tabChanged(value, v) {
    console.log(value, v)
    this.setState({
      selectedTab: v
    });
  }
  render() {
    let { classes, dashboardConfigData, GFilterData } = this.props;
    let displayName = [true, false, false, true, false, false];
    let tabsInitData = _.chain(dashboardConfigData).first().get("visualizations").groupBy("name").value();
    console.log(tabsInitData);
    let tabs = _.map(tabsInitData, (k, v) => {
      return {
        name: v,
        key: v
      };
    });
    let defaultTab = this.state.selectedTab ? this.state.selectedTab : _.get(_.first(tabs), 'name')




    return (<div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3" >
        <span style={{ fontSize: '20px' }}>
          <img src="/images/collapse/collapse@3x.png" style={{ width: '36px', height: '36px', position: 'relative', left: '-35px', bottom: '0px' }} />
          <span style={{ marginLeft: "-35px" }}>Property Tax</span>
        </span>

        <div className={classes.desktop} >

          <Button style={{ borderRadius: '2px', backgroundColor: "#fe7a51", color: "white" }}
            onClick={this.handleFilters.bind(this)}
          >
            <FilterIcon></FilterIcon>
          </Button>
          <Menu type="download" bgColor="white" color="black"></Menu>

        </div>

        {/* <div className={classes.desktop} >
          </div> */}

        <div className={classes.mobile}>
          <CustomizedMenus key="download" />
          <CustomizedShare key="share" />

        </div>

      </div>
      <div className={classes.mobile}>
        <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={true} />
      </div>

      {this.state.isFilterOpen &&
        <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={true} />
      }


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
            <div id={(defaultTab) === v? "divToPrint":'divNotToPrint'} className={(defaultTab) === v? "elemClass":'elemClass1'}>
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
    GFilterData: state.GFilterData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport,
    updateFilterData: updateGlobalFilterData
  }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PropertyTax)));
