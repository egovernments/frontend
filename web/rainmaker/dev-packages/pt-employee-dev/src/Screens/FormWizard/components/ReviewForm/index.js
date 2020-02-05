import React, { Component } from "react";
import { Icon, Card, Dialog } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import AddRebateExemption from "./components/addRebateBox";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";
import CalculationDetails from "./components/CalculationDetails";
import propertyAddressConfig from "./formConfigs/propertyAddress";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import EditIcon from "./components/EditIcon";

import PropertyAddressInfo from 'egov-ui-kit/common/propertyTax/Property/components/PropertyAddressInfo';
import AssessmentInfo from 'egov-ui-kit/common/propertyTax/Property/components/AssessmentInfo';
import OwnerInfo from 'egov-ui-kit/common/propertyTax/Property/components/OwnerInfo';


import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10,
  totalAmountTobePaid: "",
};

const AddRebatePopUp = formHoc({ formKey: "additionalRebate", path: "PropertyTaxPay" })(AddRebateExemption);

class ReviewForm extends Component {
  state = {
    valueSelected: "",
    showRebateBox: false,
    calculationDetails: false,
  };

  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
  };

  onRadioButtonChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ totalAmountTobePaid: inputValue });
  };

  addRebateBox = (show) => {
    this.setState({
      showRebateBox: show,
    });
  };

  updateCalculation = () => {
    this.addRebateBox(false);
    const { updateEstimate } = this.props;
    updateEstimate();
  };

  openCalculationDetails = () => {
    this.setState({ calculationDetails: true });
  };

  closeCalculationDetails = () => {
    this.setState({ calculationDetails: false });
  };

  editIcon = <Icon onClick={this.handleEdit} style={defaultIconStyle} color="#ffffff" action="image" name="edit" />;

  onEditButtonClick = (index) => {
    let { onTabClick } = this.props;
    onTabClick(index);
  };

  render() {
    let { addRebateBox, updateCalculation, onEditButtonClick } = this;
    let { showRebateBox } = this.state;
    let { stepZero, stepTwo, stepOne, estimationDetails, importantDates, totalAmount } = this.props;
    const { generalMDMSDataById = {} } = this.props;

    return (
      <div>
        <Card
          textChildren={
            <div className="col-sm-12 col-xs-12" style={{ alignItems: "center" }}>
              <div>
                <Label
                  labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                  label={'PT_APPLICATION_SUMMARY'}
                  fontSize="20px"
                />

              </div>
              {estimationDetails && estimationDetails.length > 0 && <PropertyTaxDetailsCard
                estimationDetails={estimationDetails}
                importantDates={importantDates}
                addRebateBox={addRebateBox}
                openCalculationDetails={this.openCalculationDetails}
              />}
              <PropertyAddressInfo generalMDMSDataById={generalMDMSDataById} properties={this.props.properties} editIcon={<EditIcon onIconClick={() => onEditButtonClick(0)} />}></PropertyAddressInfo>
              <AssessmentInfo generalMDMSDataById={generalMDMSDataById} properties={this.props.properties} editIcon={<EditIcon onIconClick={() => onEditButtonClick(1)} />}></AssessmentInfo>
              <OwnerInfo generalMDMSDataById={generalMDMSDataById} properties={this.props.properties} editIcon={<EditIcon onIconClick={() => onEditButtonClick(2)} />}></OwnerInfo>
            </div>
          }
        />
        {!this.props.isCompletePayment && (
          <CalculationDetails
            open={this.state.calculationDetails}
            data={this.props.calculationScreenData}
            closeDialogue={() => this.closeCalculationDetails()}
          />
        )}
        <div className="pt-rebate-exemption-box">
          <Dialog
            open={showRebateBox}
            children={[
              <div className="pt-rebate-box">
                <AddRebatePopUp updateEstimate={updateCalculation} totalAmount={totalAmount} />
              </div>,
            ]}
            bodyStyle={{ backgroundColor: "#ffffff" }}
            isClose={false}
            onRequestClose={() => addRebateBox(false)}
            contentStyle={{ width: "56%" }}
            contentClassName="rebate-modal-content"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { common = {} } = state;
  const { generalMDMSDataById } = common || {};
  return {
    ownProps,
    generalMDMSDataById,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewForm);
