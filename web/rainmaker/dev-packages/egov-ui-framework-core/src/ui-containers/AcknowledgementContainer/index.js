import React from "react";
import { AckHeader, AckBody, AckFooter } from "../../ui-atoms";
import { routeTo } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formActionUtils";
import "./index.css";

class AcknowledgementContainer extends React.Component {

	onclickFooter = (path)=>{
		routeTo(path);
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
export default AcknowledgementContainer;