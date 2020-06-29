import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { AckHeader, AckPrintMenu, AckBody, AckFooter } from "../../ui-atoms";
import "./index.css";

class AcknowledgementContainer extends React.Component {

	onclickFooter = (path)=>{
		window.location.href = path
	}

	render() {
		const { ackHeader, ackBody, ackFooter } = this.props;

		return (
			<div className="common-div-css">
				<AckHeader {...ackHeader}/>
				<div className="card-container">
					<AckBody {...ackBody}/>
				</div>
				<div className="apply-wizard-footer">
					{
						ackFooter.map((config, index)=>{
							return <AckFooter 	
								key={`act-footer-${index}`}
								onClickFooter={this.onclickFooter}
								labelName={config.labelName}
								labeKey={config.labeKey}
								style={config.style}
								path={config.url}
							/>
						})
					}	
					
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state, ownProps) => {
// 	const { screenConfiguration } = state;
// 	const { screenKey } = ownProps;
// 	const { screenConfig } = screenConfiguration;
// 	let open = get(
// 		screenConfig,
// 		`${screenKey}.components.adhocDialog.props.open`
// 	);
// 	open = open || getQueryArg(window.location.href, "action") === 'showRequiredDocuments' ? true : false;

// 	return {
// 		open,
// 		screenKey,
// 		screenConfig
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)),
// 		setRoute: (url) => dispatch(setRoute(url))
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(DialogContainer);
export default AcknowledgementContainer;
