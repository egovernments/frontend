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
import Arrow_Downward from '../../images/arrows/Arrow_Downward.svg'
import Arrow_Upward from '../../images/arrows/Arrow_Upward.svg'


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
			console.log('-------------------',this.props.filters)
			let filters = this.props.filters
			console.log(filters)
			
			if(this.props.page.includes('ulb')) {
				if(!filters['tenantId']) {
				  console.log('=======tenet Id not there coll chartRow========')
				  let tenentFilter = []
				  tenentFilter.push(`${localStorage.getItem('tenant-id')}`)
				//   tenentFilter.push('pb.amritsar')

				  filters['tenantId'] = tenentFilter
				}
			  }
			  console.log(filters)
			  
			let requestBody = getChartOptions(code, filters);
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
				"plots": d.plots,
				"insight_data": d.insight ? d.insight : ''
			}
		}).first().value() || null;

		if (data) {
			let insightColor = data.insight_data ? data.insight_data.colorCode === "lower_red"?"#e54d42":"#259b24":'';
			let insightIcon = data.insight_data ? data.insight_data.colorCode === "lower_red"?Arrow_Downward:Arrow_Upward:'';
			
			return (
				<div className={classes.root} style={{ width: "max-content" }}>
					<span className={classes.values}>
						{/* <span style={{display:this.getRupeeSymbol(this.state.data.valueSymbol),float: 'left'}}>&#x20b9;</span>  */}

						{/* {
	            			this.state.data.value
						}  */}
						<NFormatter value={data.value} nType={data.valueSymbol} />
						{data.insight_data &&
							<React.Fragment>
								<span style={{ marginLeft: "6vh" }}>
									<img src={insightIcon} style={{ height: "16px", color: insightColor}}/>
								</span>
								{/* <span style={{ color: insightColor, marginLeft: "1vh" }}>{`${data.insight_data.value.toString().split("than last month")[0]}`}</span> */}
								<span style={{ color: insightColor, fontSize: '14px', marginLeft: "1vh" }}>{`${data.insight_data.value}`}</span>
							</React.Fragment>
						}
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