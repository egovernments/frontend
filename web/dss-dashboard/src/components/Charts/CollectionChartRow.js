import React from 'react';
// import axios from 'axios';
import NFormatter from '../common/numberFormater';
import getChartOptions from '../../actions/getChartOptions';
import ChartsAPI from '../../actions/charts/chartsAPI';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import APITransport from '../../actions/apitransport/apitransport';
import { withStyles } from '@material-ui/core/styles';
import style from './styles';

class CollectionChartRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: null }
	}
	// componentWillReceiveProps(){
	// 	this.callAPI()
	// }

	componentDidMount() {
		this.callAPI();
	}
	callAPI() {
		let code = this.props.chartData['id'] ? this.props.chartData['id'] : "";
		if (code) {
			let requestBody = getChartOptions(code, {});

			let chartsAPI = new ChartsAPI(2000, 'dashboard', code, requestBody.dataoption);
			this.props.APITransport(chartsAPI);
		}
	}


	render() {
		const { classes } = this.props;
		let codekey = _.chain(this.props).get('chartData').get("id").value();
		let data = _.chain(this.props).get("chartsGData").get(codekey).get("data").map((d, i) => {
			return {
				"label": d.headerName,
				"valueSymbol": d.headerSymbol,
				"value": d.headerValue,
				"plots": d.plots
			}
		}).first().value() || null;
		if (data) {
			return (
				<div className={classes.root}>
					<span className={classes.values}>
						{/* <span style={{display:this.getRupeeSymbol(this.state.data.valueSymbol),float: 'left'}}>&#x20b9;</span>  */}

						{/* {
	            			this.state.data.value
						}  */}
						<NFormatter value={data.value} nType={data.valueSymbol} />
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

const mapStateToProps = (state) => {
	return {
		dashboardConfigData: state.firstReducer.dashboardConfigData,
		GFilterData: state.GFilterData,
		chartsGData: state.chartsData
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		APITransport: APITransport,
		// updateFilterData: updateGlobalFilterData
	}, dispatch)
}
export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(CollectionChartRow));