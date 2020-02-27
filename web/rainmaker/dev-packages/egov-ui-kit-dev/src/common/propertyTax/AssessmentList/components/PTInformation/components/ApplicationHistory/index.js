import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { httpRequest } from "egov-ui-kit/utils/api";
import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";
import Label from "egov-ui-kit/utils/translationNode";
import HistoryCard from "../../../../../Property/components/HistoryCard";
import { getFullRow } from "../AssessmentHistory";
import { navigateToApplication } from "egov-ui-kit/utils/commons";

const labelStyle = {
    letterSpacing: 1.2,
    fontWeight: "500",
    lineHeight: "35px",
    cursor: "pointer"
};

class ApplicationHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showItems: false,
            errorMessage: "PT_APPLICATION_HISTORY_ERROR",
            applicationHistoryItem: []
        };
    }

    getUniqueList = (list = []) => {
        let newList = [];
        list.map(element => {
          if (!JSON.stringify(newList).includes(JSON.stringify(element.acknowldgementNumber))) {
            newList.push(element);
          }
        })
        return newList;
      }

    getPropertyResponse = async (propertyId, tenantId, dialogName) => {    
        const queryObject = [
          { key: "propertyIds", value: propertyId },
          { key: "tenantId", value: tenantId },
          { key: "audit", value: true }
        ];
        let ownershipInfo = {};
        try {
          const payload = await httpRequest(
            "property-services/property/_search",
            "_search",
            queryObject
          );
          if (payload && payload.Properties.length > 0) {
            payload.Properties=this.getUniqueList(payload.Properties);
            return payload.Properties;
          }
        } catch (e) {
          console.log(e);
        }
    }

    componentDidMount = () => {
        const { propertyId, tenantId, history } = this.props;
        if (propertyId) {
            this.getPropertyResponse(propertyId, tenantId).then((response)=>{
                console.log("response----", response);
                if(response && response.length > 0){
                    let applicationHistoryItem = [];
                    applicationHistoryItem = response.map(item=>{
                        return (
                            <div>
                            {getFullRow("PT_PROPERTY_APPLICATION_NO", item.acknowldgementNumber ? item.acknowldgementNumber : "NA", 12)}
                            {getFullRow("PT_PROPERTY_ID_NO", item.propertyId ? item.propertyId : "NA", 12)}
                            {getFullRow("PT_MUTATION_APPLICATION_TYPE", item.creationReason  ? item.creationReason : "NA", 12)}
                            {getFullRow("PT_MUTATION_CREATION_DATE", item.auditDetails && item.auditDetails.createdTime ? convertEpochToDate(item.auditDetails.createdTime) : "NA", 12)}
                            {getFullRow("PT_MUTATION_STATUS", item.status ? item.status : "NA", 12)}

                                <div className="application-history" style={{ float: "left",marginLeft: "15px" }}>
                                    <a
                                        onClick={() => {
                                            // history &&
                                            //     history.push(
                                            //         `/property-tax/assessment-form?FY=${Assessment.financialYear}&assessmentId=${Assessment.assessmentNumber}&isAssesment=false&isReassesment=true&propertyId=${
                                            //         propertyId
                                            //         }&tenantId=${Assessment.tenantId}`
                                            //     );
                                            // lastElement.onClick();
                                            item.workflow && item.workflow.businessService && navigateToApplication(item.workflow.businessService, history, item.acknowldgementNumber, item.tenantId, item.propertyId);
                                        }}
                                    >
                                        <Label buttonLabel={true} label='PT_VIEW_DETAILS' color="rgb(254, 122, 81)" fontSize="16px" height="40px" labelStyle={labelStyle} />
                                    </a>
                                </div>
        
                        </div>
                        )
                    });
                    if(applicationHistoryItem.length > 0){
                        this.setState({ applicationHistoryItem: applicationHistoryItem });
                    }
                }
            }).catch((e)=>{
                console.log("error---", e);
            });
        }
    }

    render() {
        const { propertyId, tenantId } = this.props;
        const { applicationHistoryItem } = this.state;
        const items = this.state.showItems ? this.state.items : [];
        const errorMessage = this.state.showItems && items.length == 0 ? this.state.errorMessage : '';
        return (<HistoryCard header={'PT_APPLICATION_HISTORY'} items={items} errorMessage={errorMessage} onHeaderClick={() => {
            if(applicationHistoryItem)
            this.setState({ showItems: !this.state.showItems, items: applicationHistoryItem })
        }}></HistoryCard>)
    }
}

const mapStateToProps = (state, ownProps) => {
    // const { Bill = [], Payments = [] } = state.properties || {};
    const propertyId = decodeURIComponent(ownProps.match.params.propertyId);
    const tenantId = decodeURIComponent(ownProps.match.params.tenantId);
    return {
        propertyId,
        tenantId
    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        null
    )
)(ApplicationHistory);