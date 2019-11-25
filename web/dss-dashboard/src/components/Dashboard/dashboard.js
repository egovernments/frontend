import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import APITransport from '../../actions/apitransport/apitransport';
import dashboardAPI from '../../actions/dashboardAPI';
import GlobalFilter from '../common/globalFilter/index';
import { updateGlobalFilterData } from '../../actions/globalFilter/GFilterAction';
import style from './styles';
import PageLayout from '../Charts/pagelayout';
import CustomizedMenus from './download';
import CustomizedShare from './share';
import FilterIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Menu from '../common/CustomMenu'

let page = 'home';
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.GFilterData,
      isFilterOpen: false
    }

  }

  componentDidMount() {
    let dashboardApi = new dashboardAPI(20000);
    this.props.APITransport(dashboardApi, page);
  }

  share() {

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

  handleFilters() {
    let fil = this.state.isFilterOpen
    this.setState({
      isFilterOpen: !fil
    })
  }

  render() {
    let { classes, dashboardConfigData, GFilterData } = this.props;
    let displayName = [true, false, true, false];
    return (
      <div id="divToShare">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
          <span style={{ fontSize: '20px' }}>
            <img src="/images/collapse/collapse@3x.png" style={{ width: '36px', height: '36px', position: 'relative', left: '-35px', bottom: '0px' }} />
            <span style={{ marginLeft: "-35px", fontFamily: 'Roboto' }}>State Wide Urban Real-Time Executive (SURE) Dashboard
          </span>
          </span>
          <div className={[classes.desktop, classes.posit].join(' ')}>

            <Menu type="download" bgColor="white" color="black"></Menu>
            <Button style={{ borderRadius: '2px', backgroundColor: "#fe7a51", color: "white" }}
              onClick={this.handleFilters.bind(this)}
            >
              <FilterIcon></FilterIcon>
            </Button>
          </div>

          <div className={classes.mobile}>
            <CustomizedMenus key="download" fileName={"SURE Dashboard"} />
            <CustomizedShare key="share" PDFDownloads={this.share.bind(this)} />
          </div>

        </div>
        <div className={classes.mobile}>
          {/* <div className="elemClass"> */}
          <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={false} />

        </div>

        {this.state.isFilterOpen &&
          <GlobalFilter applyFilters={this.applyFilter.bind(this)} hideDepart={false} />
        }

        <div id="divToPrint" className="elemClass">
          {dashboardConfigData.map((page, i) =>
            // <div>
            <PageLayout key={i} chartRowData={page.visualizations} headingTitle="Revenue" GFilterData={GFilterData} displayName={displayName} page={page} />
            // </div>
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
    GFilterData: state.GFilterData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport,
    updateFilterData: updateGlobalFilterData
  }, dispatch)
}
export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));
