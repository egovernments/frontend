import React, { Component } from 'react';
import GenericChart from './genericchart';
import { withStyles } from '@material-ui/styles';
import style from './layOutStyle';

class ChartRow extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { classes, rowData, displayName, filters, page } = this.props;
		return (
			<div className="container-fluid" style={{ padding: '0px', margin: '0px' }}>
				{
					displayName &&
					<div className={classes.tab}><div className={classes.header}>{rowData.name}</div></div>
				}
				<GenericChart key={rowData.id} chartData={rowData} filters={filters} page={page} />
			</div>
		);
	}
}
export default withStyles(style)(ChartRow);
