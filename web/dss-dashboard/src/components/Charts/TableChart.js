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
// import axios from 'axios';
import NFormatterFun from '../common/numberFormaterFun';
import getChartOptions from '../../actions/getChartOptions';
import axios from 'axios';
class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      filterValue: {},
      data: null,
      drillCode:null,
      visualcode:null,
      tabFilterKey:null
    }
  }

  componentDidMount() {    
  }
  componentWillReceiveProps(nextProps) {
		console.log("TableChart", nextProps, this.props);
	}
  getRequest(calledFrom, visualcode, filters, moduleLevel, dataChips) {    
    let getAxiosOptions = getChartOptions(visualcode, filters);
     axios.post(getAxiosOptions.url,getAxiosOptions.dataoption,getAxiosOptions.options)
       .then(response => { 
            let tempState = {};               
            let tempData = response.data.responseData;
            let drillCode = response.data.responseData['drillDownChartId'];
            let visualcode = response.data.responseData['visualizationCode'];
             if(dataChips){
              tempData['filter'] = dataChips['filter'];
              tempData['tt'] = dataChips['tt'];
                 
              tempState.data = tempData; 
              tempState.filter = dataChips['filter']; 
              tempState.filterValue = dataChips['tt']; 
              tempState.drillCode = drillCode;
              if(drillCode !='none' || calledFrom == 'clickFromTab')
                  tempState.visualcode = visualcode;
            }else{
              tempState.data = tempData; 
              tempState.drillCode = drillCode;
              if(drillCode !='none' || calledFrom == 'clickFromTab')
                tempState.visualcode = visualcode;              
            }
            this.setState(tempState);
         })
       .catch(error => {
         console.log(error.response)
     });
  }

  handleChipClick = (visualcode) => {
    //this.setState({ data: prodData[0] })   
    let dataChips = {
      filter: false
    }
    this.getRequest("handleChipClick", visualcode, {}, 'PT', dataChips)
  }
  applyFilter = (visualcode,drillCode,rowData, event) => {
    let dataChips = {
      filter: true,
      tt:
      {
        id: 1,
        'label': rowData.Boundary,
        'type': 'ULBS',
        'color': 'orange',
        tenantId: [rowData.Boundary]
      },
      visualcode: visualcode
    };
    this.getRequest("applyFilter", drillCode, { tenantId: [rowData.Boundary] }, 'PT', dataChips)  
  }
  clickFromTab = (visualcode) => {
    let tenantId = {};
    if(this.state.filter){
       tenantId = { tenantId: this.state.filterValue.tenantId } 
    }

    this.getRequest("clickFromTab", visualcode, tenantId, 'PT', "")
  }

  render() {
    console.log(this.props.chartData)
    let { classes, chartData,chartKey,chartsData } = this.props;
    let drillCode,visualcode,tabFilterKey;
    if (this.props && chartData) {
      if(this.state.data){
        chartData = this.state.data.data;
        drillCode = this.state.drillCode;
        visualcode = this.state.visualcode;        
      }
      drillCode = drillCode?drillCode:chartsData[this.props.chartKey]['drillDownChartId'];
      visualcode = visualcode?visualcode:chartsData[this.props.chartKey]['visualizationCode'];
      
      let columnData = _.chain(chartData).first().get("plots").map((k, v) => {
        let yes = v < 1;
        return { id: k.name, numeric: (k.symbol === "number" || k.symbol === "amount"), stickyHeader: yes, disablePadding: false, label: k.name }


      }).value();
      let newData = _.chain(chartData).map((rowData) => {
        return _.defaults(..._.map(rowData.plots, a => {
          if (a.symbol.toUpperCase() === 'TEXT') {
            return { [a.name]: a.label }
          } else {
            return { [a.name]: NFormatterFun(a.value, a.symbol, this.props.GFilterData['Denomination'], true) }
          }
        }));

      }).value();
      console.log("clickFromTab", this.props.chartParent);

      return (
        <div class={classes.tableChart} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tableHeading">
            {/* <h5 style={{ flex: '1', textAlign: 'left' }}>Demand & Collection Index</h5> */}
            {/* <div className="fwh"></div> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SwitchButton clickFromTab={this.clickFromTab} chartParent={this.props.chartParent} />

            </div>
          </div>
          {(this.state.data && this.state.filter) &&
            <div className="row tableFilterChipWrap">
              <div className="filLabel">
                Filters Applied
                        </div>
              <div className="chipWrap">
                <Chips val={this.state.filterValue} visualcode ={visualcode} handleClick={this.handleChipClick} />
              </div>
            </div>
          }
          {/* <Table tableData={this.state.data} callBack={this.applyFilter.bind(this)} />               */}
          {
            <UiTable
              data={newData}
              columnData={columnData}
              // callAPI={this.filterPageAPI.bind(this)}
              tableType='CENTERS_TABLE'
              cellClick={this.applyFilter.bind(this,visualcode,drillCode)}
              //  orderBy={'Sno'}
              // needCheckBox={false}
              // needHash={false}
              needSearch
              needExport
              excelName={"Demand & Collection Index"}
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
    chartsData: state.chartsData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport
  }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableChart)));
