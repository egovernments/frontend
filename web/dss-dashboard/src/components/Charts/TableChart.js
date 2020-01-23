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
import getFilterObj from '../../actions/getFilterObj';
import axios from 'axios';
import { isMobile } from 'react-device-detect';

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
      active:null,
      drilfilters:null,
      filterList : {}
    }
  }

  getRequest(calledFrom, visualcode,active, filterList) {
    //let filters = getFilterObj(this.props.GFilterData, this.props.globalFilterData, page);
    filterList = filterList ? filterList : this.state.filterList;
    let filters = {},ttest = [],tempFL;
    if(!_.isEmpty(filterList,true)){      
      _.map(filterList, (k,v) => { 
        if(filterList[v] && filterList[v].length >0){
          tempFL = filterList[v][filterList[v].length - 1];
            if(tempFL[2]['column'] == 'DDRs'){
              let tempDDR = this.props.globalFilterData[1]['master'][tempFL[4]];
                  for (var j = 0; j < tempDDR.length; j++) {
                    ttest.push(tempDDR[j]);
                  }
                  filters[tempFL[2]['key']] = ttest;
                  console.log(ttest);
            }else{
              console.log(tempFL[4]);
              filters[tempFL[2]['key']] = tempFL[4];
            }

        }
      });
    }
  

    var globalFilters = this.props.filters;
    globalFilters = {...globalFilters,...filters};

    if(this.props.page && this.props.page.includes('ulb')) {
      if(!globalFilters['tenantId']) {
        console.log('=======tenet Id not there TableChart comp========')
        let tenentFilter = []
        tenentFilter.push(`${localStorage.getItem('tenant-id')}`)
        globalFilters['tenantId'] = tenentFilter
      }
    }
    console.log(globalFilters)

    let getAxiosOptions = getChartOptions(visualcode, globalFilters);
    
    if (getAxiosOptions && getAxiosOptions.url) {
      axios.post(getAxiosOptions.url, getAxiosOptions.dataoption, getAxiosOptions.options)
        .then(response => {
          let tempState = {};
          let tempData = response.data.responseData;
          let drillCode = response.data.responseData['drillDownChartId'];
          let visualcode = response.data.responseData['visualizationCode'];
          let drilfilters = (response.data.responseData['filter'] && response.data.responseData['filter'].length>0)?response.data.responseData['filter'][0]:null;
          tempState.data = tempData;
          tempState.drillCode = drillCode;
          tempState.drilfilters= drilfilters;
          if(active)
            tempState.active = active.toUpperCase();
          if (drillCode != 'none' || calledFrom == 'clickFromTab')
            tempState.visualcode = visualcode;          
          tempState.filterList=filterList;
          this.setState(tempState);
        })
        .catch(error => {
          console.log(error.response)
        });
    }
  }

  handleChipClick = (index,tabName,visualcode) => {      
    let filterList =  _.cloneDeep(this.state.filterList);
    filterList[tabName] = filterList[tabName].splice(0,index);
    if(_.isEmpty(filterList[tabName],true) && filterList[tabName].length == 0){
      delete filterList[tabName];
    }
    if(this.state.active && tabName != this.state.active){
      let curTabfilter = filterList[this.state.active]
      if(curTabfilter){
        visualcode = curTabfilter[curTabfilter.length - 1][1]
      }else{
        visualcode = this.state.visualcode
      }
    }
    this.getRequest("handleChipClick", visualcode,'',filterList);
  }

  applyFilter = (visualcode, drillCode, drilfilters,tabName,rowData, event) => {
    let tempValue = rowData[drilfilters.column];
    // need to change now its hack.
    if(drilfilters.column != 'DDRs' && drilfilters.key == 'tenantId' && tempValue.split('.').length == 1){
      tempValue = 'pb.'+tempValue.toLowerCase();
    }
    tabName = tabName.toUpperCase();
    let tempArr = [visualcode,drillCode,drilfilters,tabName,tempValue];
    let filterList = this.state.filterList;

    if(_.isEmpty(filterList, true) || typeof filterList[tabName] == "undefined"){
      filterList[tabName] = [];
    }
    var visualCodeExists = false;
    if(filterList[tabName].length > 0){

      for(var i=0; i < filterList[tabName].length ; i++ ){
        if(filterList[tabName][i][0] == visualcode){
          // if it is exists visualCode
          filterList[tabName][i] = tempArr;
          visualCodeExists = true;
          break;
        }
      }
      // Not Exists so pushing new to exist tab
      if(!visualCodeExists){
        filterList[tabName].push(tempArr);
      }
    }else{
      // New entry
      filterList[tabName].push(tempArr);
    }
    this.getRequest("applyFilter", drillCode, '',filterList)
  }

  getFilterObj(filters){
    /*let tempDDR = this.props.globalFilterData[1]['master'][tvalue[i]];
    for (var j = 0; j < tempDDR.length; j++) {
      tempValue.push(tempDDR[j]);
    }
    console.log(this.props.GFilterData);*/
    return filters;
  }

  renderChip = (tabName, chipValue) => {
    var row = [];
    for(var i=0; i < chipValue.length;i++){
      if(chipValue[i] && chipValue[i].length >0 ){
        row.push(<div className="chipWrap" style={isMobile?{margin:"2px 20px"}:{}}><Chips fromScreen="TableChart" index={i} label={tabName} value={chipValue[i]} handleClick={this.handleChipClick} /></div>);
      }
    }
    return row;
  }

  clickFromTab = (visualcode,active) => {
    let filterList = this.state.filterList;
    if(!_.isEmpty(filterList, true) && typeof filterList[active] !== 'undefined' && filterList[active].length > 0){
      visualcode = filterList[active][filterList[active].length - 1][1];
    }
    this.getRequest("clickFromTab", visualcode,active)    
  }


  render() {
    let { classes, chartData, chartKey, chartsData, strings, chartParent } = this.props;
    let drillCode, visualcode, tabFilterKey,tabName,drilfilters;
    if (this.props && chartData) {
      if (this.state.data) {
        chartData = this.state.data.data;
        drillCode = this.state.drillCode;
        visualcode = this.state.visualcode;
        tabName = this.state.active;
        drilfilters = this.state.drilfilters;
      }
      drillCode = drillCode ? drillCode : chartsData[this.props.chartKey]['drillDownChartId'];
      visualcode = visualcode ? visualcode : chartsData[this.props.chartKey]['visualizationCode'];
      tabName = tabName ? tabName : chartParent[0]['tabName'];
      drilfilters = drilfilters? drilfilters : chartsData[this.props.chartKey]['filter'][0];
      let columnData = _.chain(chartData).first().get("plots").map((k, v) => {
        if(k.name != "S.N."){
          let yes = v < 0;
          let isNumeric = _.toLower(k.symbol) === 'amount' || _.toLower(k.symbol) === "number" || _.toLower(k.symbol) === "percentage";
          return { id: k.name, numeric: isNumeric, stickyHeader: yes, disablePadding: false, label: k.name, colType: k.symbol }
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
              <SwitchButton clickFromTab={this.clickFromTab} chartParent={chartParent} />

            </div>
          </div>
          {(this.state.data && !_.isEmpty(this.state.filterList, true)) &&
            <div className="row tableFilterChipWrap">
              <div className="filLabel">
                Filters Applied
              </div>              
              {/* { 
                _.map(this.state.filterList, (k, v) =>  {
                    return this.renderChip(v,k)
                })
              } */}


              {/* { 
                isMobile ? 
               ( <div class="cutome_label_chip">
               { _.map(this.state.filterList, (k, v) =>  {
                  return this.renderChip(v,k)
              })}</div>):
              _.map(this.state.filterList, (k, v) =>  {
                return this.renderChip(v,k)
            })
              } */}
 {_.map(this.state.filterList, (k, v) =>  {
              if(isMobile){
                    return(
                      <div class="cutome_label_chip" style={{display: "inline-grid"}}>
                      {this.renderChip(v,k)}
                      </div>
                    )
                  }else{
                    return this.renderChip(v,k)
                  }
                })}
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
              cellClick={this.applyFilter.bind(this, visualcode, drillCode,drilfilters,tabName)}
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
    globalFilterData:state.globalFilter,
    strings: state.lang
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport
  }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableChart)));
