import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import APITransport from '../../actions/apitransport/apitransport';
import CollectionChartRow from './CollectionChartRow';
import { Grid } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { withStyles } from '@material-ui/core/styles';
import style from './styles';


class CollectionChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: null, filters: null }
	}

	render() {
		let { strings, classes } = this.props;
		// debugger;
		// let codekey = _.chain(this.props).get('chartData').first().get("id").value();
		let data = this.props.chartData.map((d, i) => {
			return {
				"label": d.name,
				charts: d
			}
		})

		if (data) {
			return (
				<div className={classes.collectionChart}>
					{
						data.map((d, i) => {
							console.log("CollectionChart data >> ", d);
							let precision = 100; // 2 decimals
							let randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);

							return <div className={classes.collection} key={`collection-${i}`}>
								<div className={classes.collectionRow}>
									<Grid container direction="row" alignItems="center">
										<Grid item sm={6}>
											<div className={classes.CollectionLabel}>
												<span> {strings[d.label] || d.label}</span>
											</div>
											<span>
												<CollectionChartRow randomnum={randomnum} key={d.id} chartData={d.charts} filters={this.props.filters} />
											</span>
											
										</Grid>


										{/* <Grid item sm={6} style={{ color: "#73bf70" }}>
											<div><span>
												<img src={Arrow_Upward} style={{ height: "13px" }} alt="Arrow_Upward" />
												<img src={Arrow_Downward} style={{ height: "13px" }} alt="Arrow_Upward" />
											</span><span>{`${randomnum} %`}</span></div>
										</Grid> */}
									</Grid>
								</div>

							</div>
						})}
				</div>
			);
		}

		return <div>Loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		dashboardConfigData: state.firstReducer.dashboardConfigData,
		GFilterData: state.GFilterData,
		chartsGData: state.chartsData,
		strings: state.lang
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		APITransport: APITransport,
		// updateFilterData: updateGlobalFilterData
	}, dispatch)
}
export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(CollectionChart));