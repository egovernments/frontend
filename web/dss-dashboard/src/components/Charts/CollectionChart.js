import React from 'react';
import CollectionChartRow from './CollectionChartRow';

export default class CollectionChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: null, filters: null }
	}

	componentDidMount() {
		let tempdata = []
		this.props.chartData.map((d, i) => {
			tempdata.push({
				"label": d.name,
				charts: d
			})
		})
		this.setState({ data: tempdata, filters: this.props.filters })
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ filters: this.props.filters1 });
	}
	render() {
		if (this.state.data) {
			return (
				<div className="collectionChart">
					{
						this.state.data.map((d, i) =>
							<div className="colRow" key={`collection-${i}`}>
								<div className="row">
									<div className="col-12">
										<span className="tt-label"> {d.label}</span>
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
