import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ChartRow from './chartrow';
import { withStyles } from '@material-ui/core';
import style from './layOutStyle';
import _ from 'lodash';


class PageLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
	          data : null
	    }
	}
	render() {
		// console.log(this.props.chartRowData);
		let { classes, chartRowData,displayName,page } = this.props;
		
		let newGFilterData = _.cloneDeep(this.props.GFilterData);

		/* Filter Customization */
		let tempValue = [],filters={};
        if(newGFilterData && newGFilterData['District']  && newGFilterData['District'].length>0){
            let tvalue = newGFilterData['District'];
            for (var i = 0; i < tvalue.length; i++) {
                     tempValue[i] = this.props.globalFilterData[1]['master'][0][tvalue[i]];
                 }
            filters['district'] = tempValue;
        }

        if(newGFilterData && newGFilterData['ULBS'] && newGFilterData['ULBS'].length>0){  
            tempValue = [];          
            for (var i = 0; i < newGFilterData['ULBS'].length; i++) {
                tempValue[i] = 'pb.' + newGFilterData['ULBS'][i].toLowerCase();
            }            
            filters['tenantId'] = tempValue;
        }

        if(newGFilterData && newGFilterData['duration'] && Object.keys(_.get(newGFilterData,'duration.value')).length>0){
            filters['duration'] = newGFilterData['duration']['value'];
            let startDate=_.get(newGFilterData,'duration.value.startDate') * 1000;
            let endDate=_.get(newGFilterData,'duration.value.endDate')* 1000;
            _.set(filters,'duration.endDate',endDate)
            _.set(filters,'duration.startDate',startDate)
        }

        filters['modulelevel'] = (page.id == 'propertyTax')?'PT':'';
        if(newGFilterData && newGFilterData['Departments'] && newGFilterData['Departments'].length>0){
            filters['modulelevel'] = newGFilterData['Departments'];
        }

		return (
			<div className={`${classes.root}`} >

				{
					chartRowData.map((vizData, j) =>
						<ChartRow key={j} rowData={vizData} displayName={displayName[j]} filters={filters} page={page}/>)
				}
			</div>);
	}
}

const mapStateToProps = (state) => {
  return {
  	globalFilterData: state.globalFilter
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
}
export default withRouter(withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(PageLayout)));

