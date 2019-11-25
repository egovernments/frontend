import React from 'react';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NFormatterFun from '../common/numberFormaterFun';

const options = {
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
				if (dataset.dataSymbol[tooltipItem.index][0] == 'number' || dataset.dataSymbol[tooltipItem.index][1] == 'Unit')
					currentValue = NFormatterFun(currentValue, dataset.dataSymbol[tooltipItem.index][0], dataset.dataSymbol[tooltipItem.index][1], true)
				return currentValue + ' (' + percentage + '%)';
			},
			title: function (tooltipItem, data) {
				return data.labels[tooltipItem[0].index];
			}
		}
	}
};

class PieChart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	componentDidMount() {
		// transformation
		var chartData = this.props.chartData;
		var tempData = {
			labels: [],
			datasets: []
		};
		var tempdataSet = {
			label: "",
			backgroundColor: ["#35a2eb", "#f19c56", "#4c76c7", "#ff6384",],
			data: [],
			dataSymbol: []
		};
		for (var key in chartData) {
			if (key == 'data' && chartData[key] && chartData[key][0]) {
				var plots = chartData[key][0]['plots'];
				for (var i = 0; i < plots.length; i++) {
					tempData.labels.push(plots[i]['name']);
					tempdataSet.data.push(NFormatterFun(plots[i]['value'], plots[i]['symbol'], this.props.GFilterData['Denomination']));
					tempdataSet.dataSymbol.push([plots[i]['symbol'], this.props.GFilterData['Denomination']]);
				}
			}
		}
		tempData.datasets.push(tempdataSet);
		this.setState({ data: tempData })
	}
	render() {
		if (this.state.data) {
			return (
				<div>
					{/* <ul className="list list-inline">
					
						<li style={{ textAlign: 'left' }}>{this.props.label} 
						{ this.props.section !="Service" && <i>(In {this.props.GFilterData['Denomination']}) </i>}</li>
						</ul> */}
					<Pie
						data={this.state.data}
						height={165}
						options={options}
					/>
				</div>
			)
		}
		return <div>Loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		GFilterData: state.GFilterData
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PieChart);