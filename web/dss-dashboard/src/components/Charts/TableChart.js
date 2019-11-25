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
import axios from 'axios';
import NFormatterFun from '../common/numberFormaterFun';
import getChartOptions from '../../actions/getChartOptions';

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter : false,
      filterValue : {},
      code:"",
      data: null
    }
  }

  componentDidMount(){
      this.setState({code : this.props.chartParent[0]['id']});
  }

  getRequest(calledFrom,code,filters,moduleLevel,dataChips){
    if(calledFrom == 'handleChipClick'){
      code =this.state.code;
    }
    if(calledFrom == 'clickFromTab'){
        if(this.state.filter){
          filters.tenantId = this.state.filterValue.tenantId;
        }
        this.setState({code : code});
        if(code == "demandCollectionIndexBoundaryRevenue" && this.state.filter){
          code = "boundaryDrillDown";
        }
    }
    let getAxiosOptions = getChartOptions(code,filters);        
    axios.post(getAxiosOptions.url,getAxiosOptions.dataoption,getAxiosOptions.options)
      .then(response => {                
            var tempData = response.data.responseData;
            if(dataChips){
              tempData['filter'] = dataChips['filter'];
              tempData['tt'] = dataChips['tt'];
              
              this.setState({ data : tempData , filter:dataChips['filter'],filterValue:dataChips['tt'] });
            }else{
              this.setState({ data : tempData });
            }
        })
      .catch(error => {
        console.log(error.response)
    });
  }

  handleChipClick = () => {
    //this.setState({ data: prodData[0] })   
    let dataChips = {  
      filter : false
    }
    this.getRequest("handleChipClick",'',{},'PT',dataChips)
  }
  applyFilter = (rowData,event) => {
    let dataChips = {  
      filter : true,
      tt : 
          { 
            id: 1,
            'label' : rowData.Boundary,
            'type': 'ULBS',
            'color' : 'orange',
            tenantId: [rowData.Boundary] 
          },
      code : 'demandCollectionIndexBoundaryRevenue'
      };
    this.getRequest("applyFilter",'boundaryDrillDown',{tenantId: [rowData.Boundary]},'PT',dataChips)
    // switch (filter) {
    //   case 1:
    //     console.log(prodData[filter]);
       // this.setState({ data: prodData[1] })
    //     break;
    //   case 2:
    //     this.setState({ data: prodData[filter] })
    //     break;
    // }
  }
  clickFromTab = (code) =>{
    this.getRequest("clickFromTab",code,{},'PT',"")
  }

  render() {
    if (this.state.data || this.props || this.props.chartData.data) {
      let { classes, chartData } = this.props;
      if(this.state.data){
        chartData = this.state.data;
      }
      
      let columnData = _.chain(chartData.data).first().get("plots").map((k, v) => {
        let yes = v < 1;
        return { id: k.name, numeric: (k.symbol === "number" || k.symbol === "amount"), stickyHeader: yes, disablePadding: false, label: k.name }


      }).value();
      let newData = _.chain(chartData.data).map((rowData) => {
        return _.defaults(..._.map(rowData.plots, a => {
          if(a.symbol.toUpperCase() === 'TEXT'){
            return { [a.name]: a.label }
          }else{
            return { [a.name]: NFormatterFun(a.value,a.symbol,this.props.GFilterData['Denomination'],true) }
          }
        }));

      }).value();

      return (       
            <div class="tableChart" style={{display:'flex',flexDirection:'column'}}>
              <div className="tableHeading">
                <h5 style={{flex:'1', textAlign: 'left'}}>Demand & Collection Index</h5>
                {/* <div className="fwh"></div> */}
                <div style={{display:'flex',flexDirection:'column'}}>
                <SwitchButton clickFromTab={this.clickFromTab} chartParent={this.props.chartParent}/>

                </div>
              </div>
              {(this.state.data && this.state.filter) &&
                <div className="row tableFilterChipWrap">
                  <div className="filLabel">
                    Filters Applied
                        </div>
                  <div className="chipWrap">
                    <Chips val={this.state.filterValue} handleClick={this.handleChipClick} />
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
                  cellClick={this.applyFilter.bind(this)}
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
    GFilterData: state.GFilterData
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    APITransport: APITransport
  }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TableChart)));
