import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import UiTable from '../common/UiTable/UiTable';
import SwitchButton from '../common/tableswitchs/switchButtons';
import Chips from '../common/Chips/Chips';
import _ from 'lodash';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import APITransport from '../../actions/apitransport/apitransport';
import NFormatterFun from '../common/numberFormaterFun';
import getChartOptions from '../../actions/getChartOptions';
import axios from 'axios';

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter2: false,
      filterValue: {},
      data: null,
      drillCode: null,
      visualcode: null,
      tabFilterKey: null,
      drillDownId: null,
      active:'BOUNDARY'
    }
  }

  getRequest(calledFrom, visualcode, filters, moduleLevel, dataChips) {
    let getAxiosOptions = getChartOptions(visualcode, filters);
    
    if (getAxiosOptions && getAxiosOptions.url) {
      axios.post(getAxiosOptions.url, getAxiosOptions.dataoption, getAxiosOptions.options)
        .then(response => {
          let tempState = {};
          let tempData = response.data.responseData;
          let drillCode = response.data.responseData['drillDownChartId'];
          let visualcode = response.data.responseData['visualizationCode'];

          if (dataChips) {
            // tempData['filter2'] = dataChips['filter'];
            tempData['tt'] = dataChips['tt'];

            tempState.data = tempData;
            tempState.filter2 = true
            tempState.filterValue = dataChips['tt'];
            tempState.drillCode = drillCode;
            if (drillCode != 'none' || calledFrom == 'clickFromTab')
              tempState.visualcode = visualcode;
          } else {
            tempState.data = tempData;
            tempState.drillCode = drillCode;
            if (drillCode != 'none' || calledFrom == 'clickFromTab')
              tempState.visualcode = visualcode;
          }
          this.setState(tempState);
        })
        .catch(error => {
          console.log(error.response)
        });
    }
  }

  handleChipClick = (visualcode) => {
    visualcode = this.props.chartsData[this.props.chartKey]['visualizationCode']
    let tenantId = {};
    if (this.state.filter2 && this.state.filterValue) {
      tenantId = { tenantId: this.state.filterValue.tenantId }
    }
    //this.setState({ data: prodData[0] })   
    this.setState({
      drillDownId: this.props.chartsData[this.props.chartKey].filter[0],
      filter2: false
    })

    let dataChips = {
      filter2: false
    }

    this.getRequest("handleChipClick", this.state.activeTab? this.state.activeTab : visualcode, {}, 'PT', null)
  }
  applyFilter = (visualcode, drillCode, rowData, event) => {
    let dataChips = {
      filter2: true,
      tt:
      {
        id: 1,
        'label': rowData[this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0 ? this.state.data.filter[0].column : this.props.chartsData[this.props.chartKey].filter[0].column] ,
        'type': this.state.active,
        'color': 'orange',
        [this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0  && this.state.data.filter[0].key ?  this.state.data.filter[0].key :'']: rowData[this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0 ? this.state.data.filter[0].column : '']
      },
      visualcode: visualcode
    };
    this.getRequest("applyFilter", drillCode, { [this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0 ? this.state.data.filter[0].key : '']: dataChips.tt[this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0 ? this.state.data.filter[0].key : ''] }, 'PT', dataChips)
  }

  
  clickFromTab = (visualcode,active) => {
    let tenantId = {};
    if (this.state.filter2 && this.state.filterValue) {
      tenantId = { tenantId: this.state.filterValue.tenantId }
    }
    let dataChips = {
      filter2: false
    }
    

    this.getRequest("clickFromTab", visualcode, tenantId, 'PT', "")
    this.setState({
      filter2: false,
      activeTab: visualcode,
      active:active
    })


  }

  render() {
    let { classes, chartData, chartKey, chartsData, strings } = this.props;
    let drillCode, visualcode, tabFilterKey;
    if (this.props && chartData) {
      if (this.state.data) {
        chartData = this.state.data.data;
        drillCode = this.state.drillCode;
        visualcode = this.state.visualcode;
      }
      drillCode = drillCode ? drillCode : chartsData[this.props.chartKey]['drillDownChartId'];
      visualcode = visualcode ? visualcode : chartsData[this.props.chartKey]['visualizationCode'];
      let columnData = _.chain(chartData).first().get("plots").map((k, v) => {
        if(k.name != "S.N."){
          let yes = v < 0;
          let isNumeric = _.toLower(k.symbol) === 'amount' || _.toLower(k.symbol) === "number" || _.toLower(k.symbol) === "percentage";
          return { id: k.name, numeric: isNumeric, stickyHeader: yes, disablePadding: false, label: k.name }
        }
      }).value();
      // small hack but need to remove from backend.
      columnData.splice(0, 1);
      
      let newData = _.chain(chartData).map((rowData) => {
      if(rowData){        
        return _.defaults(..._.map(rowData.plots, a => {
          if(a.name != "S.N."){
            if (a.symbol.toUpperCase() === 'TEXT') {

              let label = _.chain(a.label).split('.').join("_").toUpper().value();
              let text = null;
              try {
                text = strings["TENANT_TENANTS_" + label]
              } catch{
                text = a.label;
              }
              if (!text) {
                text = a.label;
              }
              return { [a.name]: text }
            } else {
              let val = NFormatterFun(a.value, a.symbol, this.props.GFilterData['Denomination'], false);
              // console.log(typeof(val))
              return { [a.name]: val }
            }
          }
        }));
      }
      }).value();
      return (
        <div className={classes.tableChart} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tableHeading">
            {/* <h5 style={{ flex: '1', textAlign: 'left' }}>Demand & Collection Index</h5> */}
            {/* <div className="fwh"></div> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SwitchButton clickFromTab={this.clickFromTab} chartParent={this.props.chartParent} />

            </div>
          </div>
          {(this.state.data && this.state.filter2) &&
            <div className="row tableFilterChipWrap">
              <div className="filLabel">
                Filters Applied
                        </div>
              <div className="chipWrap">
                <Chips val={this.state.filterValue} visualcode={visualcode} handleClick={this.handleChipClick} />
              </div>
            </div>
          }
          {/* <Table tableData={this.state.data} callBack={this.applyFilter.bind(this)} />               */}
          {
            <UiTable
              column={this.state.data && this.state.data.filter && Array.isArray(this.state.data.filter) && this.state.data.filter.length > 0 && this.state.data.filter[0].column ? this.state.data.filter[0].column : (chartsData[chartKey] && Array.isArray(chartsData[chartKey].filter) && chartsData[chartKey].filter.length > 0 ? chartsData[chartKey].filter[0].column : '')}
              data={newData}
              columnData={columnData}
              // callAPI={this.filterPageAPI.bind(this)}
              tableType='CENTERS_TABLE'
              cellClick={this.applyFilter.bind(this, visualcode, drillCode)}
              //  orderBy={'Sno'}
              // needCheckBox={false}
              // needHash={false}
              Gfilter={this.props.GFilterData}
              needSearch
              needHash={true}
              needExport
              excelName={this.props.label || "DSS"}
            // toggleSideDrawer={this.handleInfoClick.bind(this)}
            // editInfo={this.handleEditClick.bind(this)}
            // deleteCenter={this.setdeleteCenter.bind(this)}
            // searchOnServer={this.searchOnServer.bind(this)}
            />
          }
        </div>
      );
    }
    return <div>Loading...</div>
  }
}
const mapStateToProps = (state) => {
  return {
    dncData: state.DemandAndCollectionData,
    GFilterData: state.GFilterData,
    chartsData: state.chartsData,
    strings: state.lang
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport
  }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableChart)));
