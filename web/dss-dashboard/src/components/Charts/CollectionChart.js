import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import APITransport from '../../actions/apitransport/apitransport';
import CollectionChartRow from './CollectionChartRow';
import { withStyles } from '@material-ui/core/styles';
import style from './styles';

class CollectionChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: null, filters: null }
	}

	render() {
		let {strings, classes} =this.props;
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
						data.map((d, i) =>
							<div className={classes.collection} key={`collection-${i}`}>
								<div className={classes.collectionRow}>
									<div className={classes.CollectionLabel}>
										<span> {strings[d.label] || d.label}</span>
									</div>
									<CollectionChartRow key={d.id} chartData={d.charts} filters={this.props.filters} />
								</div>

							</div>
						)}
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