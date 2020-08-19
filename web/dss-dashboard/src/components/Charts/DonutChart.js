import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CONFIG from '../../config/configs';
import Chips from '../common/Chips/Chips';
import NFormatterFun from '../common/numberFormaterFun';
import style from './styles';


const options = {
	responsive: true,
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	},
	legend: {
		display: true,
		position: 'bottom',
		labels: {
			boxWidth: 10
		}
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem, data) {
				var dataset = data.datasets[tooltipItem.datasetIndex];
				var meta = dataset._meta[Object.keys(dataset._meta)[0]];
				var total = meta.total;
				var currentValue = dataset.data[tooltipItem.index];
				var percentage = parseFloat((currentValue / total * 100).toFixed(1));
				if (dataset.dataSymbol[tooltipItem.index][0] !== 'number') {
					currentValue = NFormatterFun(currentValue, dataset.dataSymbol[tooltipItem.index][0], dataset.dataSymbol[tooltipItem.index][1], true)
				}
				return currentValue + ' (' + percentage + '%)';
			},
			title: function (tooltipItem, data) {
				return data.labels[tooltipItem[0].index];
			}
		}
	}
};

class DonutChart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null,
			filter: {
				isFilterSelected: false,
				tabName: '',
				filterValues: ''
			},
			childData: null
		}
	}
	onClickDataType = (type) => {

		if (type && this.state.childData == null) {

			//make an api call get the data  set to child

			let childValue = {
				headerName: "DSS_PT_COLLECTION_BY_USAGE_TYPE",
				headerSymbol: "amount",
				headerValue: 61,
				insight: null,
				plots: [{
					label: null,
					name: "CASH",
					symbol: "amount",
					value: 50
				}, {
					label: null,
					name: "CHEQUE",
					symbol: "amount",
					value: 13
				}, {
					label: null,
					name: "ONLINE",
					symbol: "amount",
					value: 37
				}]
			}

			this.setState({
				filter: {
					isFilterSelected: true,
					tabName: 'Usage Type', // shoulnt be hardcoded
					filterValues: type
				},
				childData: [{
					...childValue,
					headerName: `${childValue.headerName}_${type}`
				}]
			})

		}

	}
	getData(strings, chartData) {
		var tempData = {
			labels: [],
			datasets: []
		};
		var tempdataSet = {
			label: "",
			backgroundColor: CONFIG.CHART_COLOR_CODE,
			data: [],
			dataSymbol: []
		};

		_.map(chartData, function (k, v) {
			var plots = k['plots'];
			for (var i = 0; i < plots.length; i++) {
				tempData.labels.push(strings[plots[i]['name']] || plots[i]['name']);
				tempdataSet.data.push(plots[i]['value'])
				tempdataSet.dataSymbol.push([plots[i]['symbol'], this.props.GFilterData['Denomination']]);
			}
		}.bind(this))
		tempData.datasets.push(tempdataSet);
		return tempData;
	}

	removeFilter = () => {
		this.setState({
			filter: {
				isFilterSelected: false,
				tabName: '',
				filterValues: ''
			}, childData: null
		})
	}
	render() {
		let { chartData, classes, strings } = this.props;
		let { filter, childData } = this.state;
		let { isFilterSelected, tabName, filterValues } = filter;
		let values = [filterValues]
		for (let i = 0; i < 5; i++) {
			values.push(filterValues)
		}
		let _data = isFilterSelected ? this.getData(strings, childData) : this.getData(strings, chartData)
		if (_data) {
			if (isMobile) {
				return (
					<div className={classes.piChart}>
						{isFilterSelected &&
							<div className="row pieFilterChipWrap">
								<div className="filLabel">
									Filters Applied
					</div>
								<div className="chipWrap" style={isMobile ? { margin: "2px 20px" } : {}}><Chips fromScreen="TableChart" index={0} label={tabName} tabName={tabName} value={values} handleClick={this.removeFilter} /></div></div>}
						<Doughnut
							data={_data}
							height={350}
							options={options}
							onElementsClick={(elems, l) => {
								if (chartData[0].headerName === 'DSS_PT_COLLECTION_BY_USAGE_TYPE') {
									let index = Array.isArray(elems) && elems.length > 0 && elems[0] && elems[0]['_index'] ;
									let type = index!==null &&_data&&_data.labels&&_data.labels[index];

									type && this.onClickDataType(type);
								}
							}}
						/>
					</div>
				)
			} else {
				return (
					<div className={classes.piChart}>
						{isFilterSelected &&
							<div className="row pieFilterChipWrap">
								<div className="filLabel">
									Filters Applied
					</div>
								<div className="chipWrap" style={isMobile ? { margin: "2px 20px" } : {}}><Chips fromScreen="TableChart" index={0} label={tabName} tabName={tabName} value={values} handleClick={this.removeFilter} /></div></div>}
						<Doughnut
							data={_data}
							options={options}
							height={200}
							onElementsClick={(elems, l) => {
								if (chartData[0].headerName === 'DSS_PT_COLLECTION_BY_USAGE_TYPE') {
									let index = Array.isArray(elems) && elems.length > 0 && elems[0] && elems[0]['_index'] ;
									let type = index!==null &&_data&&_data.labels&&_data.labels[index];

									type && this.onClickDataType(type);
								}
							}}
						/>
					</div>
				)
			}
		}
		return <div>Loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		GFilterData: state.GFilterData,
		strings: state.lang
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	}, dispatch)
}
export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(DonutChart));