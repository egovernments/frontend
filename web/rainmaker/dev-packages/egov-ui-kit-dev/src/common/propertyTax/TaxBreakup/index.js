import { Dialog } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { get } from "lodash";
import { Card } from "components";
import Divider from "@material-ui/core/Divider";

import "./index.css";

class TaxBreakup extends Component {
  state = {};

  componentDidMount = () => {};

  getEstimateFromBill = (bill) => {
    const { billDetails, tenantId } = bill && bill[0];
    let sortedBillDetails = [];
    let current = [];
    let arrears = 0;
    let currentAmount = 0;
    let totalAmount = 0;
    sortedBillDetails = billDetails.sort((x, y) => y.fromPeriod - x.fromPeriod);
    for (let billDetail of sortedBillDetails) {
      if (billDetail.fromPeriod < Date.now() && Date.now() < billDetail.toPeriod) {
        current = billDetail;
        currentAmount = billDetail.amount;
      }
      totalAmount += billDetail.amount;
    }

    if (totalAmount > 0) {
      arrears = totalAmount - currentAmount;
    }

    const { collectedAmount, billAccountDetails } = current;
    const taxHeadsFromAPI = billAccountDetails.map((item) => {
      return item.taxHeadCode;
    });

    let estimate = { totalAmount: 0 };
    estimate.totalAmount = totalAmount;
    estimate.tenantId = tenantId;
    estimate.collectedAmount = collectedAmount;
    estimate.arrears = arrears;

    const taxHeadEstimates = taxHeadsFromAPI.reduce((taxHeadEstimates, current) => {
      const taxHeadContent = billAccountDetails.filter((item) => item.taxHeadCode && item.taxHeadCode === current);
      taxHeadContent &&
        taxHeadContent[0] &&
        taxHeadEstimates.push({
          taxHeadCode: taxHeadContent[0].taxHeadCode,
          estimateAmount: taxHeadContent[0].amount,
          category: taxHeadContent[0].purpose,
          order : taxHeadContent[0].order,
        });
      return taxHeadEstimates;
    }, []);
    let  sortedEstimateDetails =[];
    sortedEstimateDetails = taxHeadEstimates.sort((a, b) => a.order - b.order);

    estimate.taxHeadEstimates = sortedEstimateDetails;
    return [{ ...estimate }];
  };

  render() {
    let { properties } = this.props;
    let bill = get(properties, "Bill");
    const estimateFromGetBill = bill && this.getEstimateFromBill(bill);
    let { open, closeBreakupDialogue } = this.props;
    let { totalAmount } = estimateFromGetBill && estimateFromGetBill[0];
    return (
      <Dialog
        open={open}
        children={[
          <div>
            <div style={{ display: "table", width: "90%" }}>
              <Label fontSize="16px" color="#fe7a51" fontWeight="bolder" label="BILL_BREAKUP" />
              <Card
                textChildren={
                  <div>
                    {estimateFromGetBill &&
                      estimateFromGetBill[0].taxHeadEstimates &&
                      estimateFromGetBill[0].taxHeadEstimates.map((item, index) => {
                        return (
                          <div key={index} className="clearfix" style={{ marginBottom: 8 }}>
                            <div>
                              <div className="col-sm-9" style={{ padding: 0 }}>
                                <Label label={item.taxHeadCode} fontSize="15px" color="black" />
                              </div>
                              <div className="col-sm-3">
                                <Label
                                  fontSize="15px"
                                  color="black"
                                  containerStyle={{ textAlign: "right" }}
                                  className="pt-rf-price"
                                  label={"" + `${item.estimateAmount}`}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    <div>
                      <div>
                        <div className="col-sm-9" style={{ padding: 0 }}>
                          <Label label="PT_DEMAND_ARREARS" fontSize="15px" color="black" />
                        </div>
                        <div className="col-sm-3">
                          <Label
                            fontSize="15px"
                            color="black"
                            containerStyle={{ textAlign: "right" }}
                            className="pt-rf-price"
                            label={estimateFromGetBill && "" + estimateFromGetBill[0].arrears}
                          />
                        </div>
                      </div>
                    </div>

                    <Divider className="reciept-divider" inset={true} linestyle={{ marginLeft: 0, marginRight: 0, height: 2 }} />
                    <div className="clearfix" style={{ marginTop: 8 }}>
                      <div className="col-sm-9" style={{ padding: 0 }}>
                        <Label label="PT_FORM4_TOTAL" labelStyle={{ color: "#fe7a51" }} />
                      </div>
                      <div className="col-sm-3">
                        <Label
                          containerStyle={{ textAlign: "right" }}
                          labelStyle={{
                            fontSize: "20px",
                            fontWeight: 500,
                            color: "#fe7a51",
                          }}
                          label={"" + totalAmount}
                        />
                      </div>
                    </div>
                  </div>
                }
                style={{ backgroundColor: "rgb(242,242,242)", boxShadow: "none" }}
              />
            </div>
          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={true}
        handleClose={closeBreakupDialogue}
        onRequestClose={closeBreakupDialogue}
        autoScrollBodyContent={true}
        contentClassName="taxhead-dialog-content"
        style={{ maxHeight: "500px !important" }}
        modal={true}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    prepareFinalObject: (jsonPath, value) => dispatch(prepareFinalObject(jsonPath, value)),
  };
};
const mapStateToProps = (state) => {
  const { properties = {} } = state;

  return { properties };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxBreakup);
