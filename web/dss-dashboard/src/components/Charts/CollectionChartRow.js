import React from 'react';
import axios from 'axios';
import NFormatter from '../common/numberFormater';
import getChartOptions from '../../actions/getChartOptions';

export default class CollectionChartRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: null }
	}

	componentWillReceiveProps(nextProps) {
		let code = this.props.chartData['id'] ? this.props.chartData['id'] : "";
		if (code) {
			let tempdata;
			let getAxiosOptions = getChartOptions(code, nextProps.filters);
			axios.post(getAxiosOptions.url, getAxiosOptions.dataoption, getAxiosOptions.options)
				.then(response => {
					response.data.responseData.data.map((d, i) => {
						tempdata = {
							"label": d.headerName,
							"valueSymbol": d.headerSymbol,
							"value": d.headerValue
						}
					});
					this.setState({ data: tempdata });
				})
				.catch(error => {
					console.log(error)
				});
		}
	}

	render() {
		if (this.state.data) {
			return (
				<div className="col-12">
					<span className="tt-value">
						{/* <span style={{display:this.getRupeeSymbol(this.state.data.valueSymbol),float: 'left'}}>&#x20b9;</span>  */}

						{/* {
	            			this.state.data.value
						}  */}
						<NFormatter value={this.state.data.value} nType={this.state.data.valueSymbol} />
						{/* {
	            			this.symbol(this.state.data.valueSymbol)
	            		} */}
					</span>

				</div>
			);
		}
		return <div></div>
	}
}
