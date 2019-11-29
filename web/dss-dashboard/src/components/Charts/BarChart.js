import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
	legend: {
		display: true,
		position: 'bottom',
		labels: {
			boxWidth: 10
		}
	}
};

export default class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null /*{
              labels: ["PT", "TL", "W&S", "NOC"],
              datasets: [
                {
                  label: ["Property Tax", "Trade License", "Water & Sewerage", "No Objection Certificate"],
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [4.2,8,6.30,10]
                }
              ]
            }*/
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log("TableChart", nextProps, this.props);
	}
	getAcronym(value) {
		var matches = value.match(/\b(\w)/g); // ['J','S','O','N']
		return matches.join(''); // JSON
	}
	componentDidMount() {
		// transformation
		var chartData = this.props.chartData;
		var tempData = {
			labels: [],
			datasets: []
		};
		var tempdataSet = {
			label: [],
			backgroundColor: ["#4cc0c0", "#4c76c7", "#ff6384", "#35a2eb"],
			data: []
		};
		for (var key in chartData) {
			if (key == 'data') {
				for (var i = 0; i < chartData[key].length; i++) {
					tempData.labels.push(this.getAcronym(chartData[key][i]['label']));
					tempdataSet.label.push(chartData[key][i]['label']);
					tempdataSet.data.push(chartData[key][i]['value']);
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
					<Bar
						data={this.state.data}
						height={200}
						options={options}
					/>
				</div>
			)
		}
		return <div>Loading...</div>
	}
}