import { Button, Card } from "components";
import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { downloadReceiptpt } from "egov-ui-kit/redux/properties/actions";
import get from "lodash/get";
import {
    getCommonHeader,
    getCommonCaption,
  } from "egov-ui-framework/ui-config/screens/specs/utils";


class PaymentHistory extends Component {
    constructor(props) {
        super(props);
    }
    getCommonValue = (value, props = {}) => {
        return getCommonHeader(value, { variant: "body2", ...props });
    };
    getLabelWithValue = (label, value, props = {}) => {
        return {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 3,
            sm: 2
          },
          props: {
            style: {
              marginBottom: "16px",
              wordBreak : "break-word"
            },
            ...props
          },
          children: {
            label: getCommonCaption(label),
            value: this.getCommonValue(value)
          }
        };
    };

    getFullRow = (labelKey, labelValue, rowGrid = 12) => {
        let subRowGrid = 1;
        if (rowGrid == 6) {
            subRowGrid = 2;
        }
        return (<div className={`col-sm-${rowGrid} col-xs-12`} style={{ marginBottom: 1, marginTop: 1 }}>
            <div className={`col-sm-${2 * subRowGrid} col-xs-4`} style={{ padding: "3px 0px 0px 0px" }}>
                <Label
                    labelStyle={{ letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "19px !important" }}
                    label={labelKey}
                    fontSize="14px"
                />
            </div>
            <div className={`col-sm-${4 * subRowGrid} col-xs-8`} style={{ padding: "3px 0px 0px 0px", paddingLeft: rowGrid == 12 ? '10px' : '15px' }}>
                <Label
                    labelStyle={{ letterSpacing: "0.47px", color: "rgba(0, 0, 0, 1.87)", fontWeight: "400", lineHeight: "19px !important" }}
                    label={labelValue}
                    fontSize="14px"
                />
            </div>
        </div>)
    }

    downloadReceiptpt(receiptQueryString) {
        console.log(receiptQueryString, "receiptQueryStringggggg");
    }
    getTransformedPaymentHistory() {
        const labelStyle = {
            letterSpacing: 1.2,
            fontWeight: "600",
            lineHeight: "35px",
        };
        const buttonStyle = {
            float: 'right',
            lineHeight: "35px",
            height: "35px",
            backgroundColor: "rgb(242, 242, 242)",
            boxShadow: "none",
            border: "1px solid rgb(254, 122, 81)",
            borderRadius: "2px",
            outline: "none",
            alignItems: "right",
        };
        const { paymentHistory = [] } = this.props;
        const paymentHistoryItems = paymentHistory.map((payment, index) => {
            return (
                <div>
                    { this.getFullRow("Receipt No", payment.receiptNumber ? payment.receiptNumber : "NA", 12 ) } 
                    { this.getFullRow("Receipt Date", payment.receiptDate ? payment.receiptDate : "NA", 12 ) } 
                    { this.getFullRow("Total Paid", payment.totalAmountPaid ? `Rs ${payment.totalAmountPaid}` : "NA", 12 ) } 
                    { this.getFullRow("Total Due", payment.totalDue ? `Rs ${payment.totalDue}` : "NA", 6 ) } 
                    <div className="col-sm-6 col-xs-12" style={{ marginBottom: 10, marginTop: 5 }}>
                        <div className="assess-history" style={{ float: "right" }}>
                            <Button 
                                label={<Label buttonLabel={true} label="Download Receipt" color="rgb(254, 122, 81)" fontSize="16px" height="35px" labelStyle={labelStyle} />}
                                buttonStyle={buttonStyle}
                                onClick={() => {
                                    const receiptQueryString= [
                                            { key: "receiptNumbers", value: payment.receiptNumber },
                                            { key: "businessService", value: 'WS' }
                                          ]
                                    this.downloadReceiptpt(receiptQueryString)
                                }}
                            ></Button>
                        </div>
                    </div >
                </div>)

        })
        return paymentHistoryItems;
    }

    render() {
        const { paymentHistory, backgroundColor = 'rgb(242, 242, 242)' } = this.props;
        let paymentHistoryItem = [];
        if (paymentHistory.length > 0) {
            paymentHistoryItem = this.getTransformedPaymentHistory();
        }
        return (
            <div>
                {paymentHistoryItem && 
                <Card style={{ backgroundColor, boxShadow: 'none' }}
                    textChildren={
                        <div>{paymentHistoryItem}</div>
                    }
                />
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const paymentHistory = get(
        state.screenConfiguration.preparedFinalObject,
        ownProps.jsonpath,
        []
      );
    return { paymentHistory };
};


const mapDispatchToProps = (dispatch) => {
    return {
     downloadReceiptpt: (receiptQueryString) => dispatch(downloadReceiptpt(receiptQueryString)),
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentHistory);
