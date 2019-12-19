import React, { Component } from "react";
import { Icon } from "components";
import PropertyAddress from "./components/PropertyAddress";
import PaymentAmountDetails from "./components/PaymentAmountDetails";
import CalculationDetails from "./components/CalculationDetails";
import AssessmentInfo from "./components/AssessmentInfo";
import OwnerInfo from "./components/OwnerInfo";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import EditIcon from "./components/EditIcon";
import {
  findCorrectDateObj,
  findCorrectDateObjPenaltyIntrest
} from "egov-ui-kit/utils/PTCommon";
import Label from "egov-ui-kit/utils/translationNode";

import { SingleCheckbox } from "components";
import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 22,
  height: 22,
  marginLeft: 15,
  marginRight: 10
};

const PropAddressIcon = (
  <Icon style={defaultIconStyle} color="#ffffff" action="action" name="home" />
);
const AssessmentInfoIcon = (
  <Icon
    style={defaultIconStyle}
    color="#ffffff"
    action="action"
    name="assignment"
  />
);
const OwnerInfoIcon = (
  <Icon
    style={defaultIconStyle}
    color="#ffffff"
    action="social"
    name="person"
  />
);

class ReviewForm extends Component {
  state = {
    valueSelected: "Full_Amount",
    importantDates: {},
    totalAmountTobePaid: 0,
    errorText: "",
    pattern: false,
    minLength: 1,
    maxLength: 11,
    termsAccepted: false,
    calculationDetails: false
  };

  // componentWillReceiveProps(nextProps) {
  //   let { estimationDetails: nextEstimationDetails } = nextProps;
  //   const { totalAmountToBePaid } = this.state
  //   const { totalAmount: nextTotalAmount } = this.props.estimationDetails[0] || 0
  //   if (totalAmountToBePaid !== nextTotalAmount && !isNaN(parseFloat(nextTotalAmount)) && isFinite(nextTotalAmount)) {
  //     this.setState({
  //       totalAmountTobePaid: nextTotalAmount,
  //     })
  //   }
  // }

  componentDidMount() {
    this.getImportantDates();
  }

  getImportantDates = async () => {
    const { currentTenantId } = this.props;
    try {
      let ImpDatesResponse = await httpRequest(
        MDMS.GET.URL,
        MDMS.GET.ACTION,
        [],
        {
          MdmsCriteria: {
            tenantId: currentTenantId,
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "Rebate"
                  },
                  {
                    name: "Penalty"
                  },
                  {
                    name: "Interest"
                  },
                  {
                    name: "FireCess"
                  }
                ]
              }
            ]
          }
        }
      );
      if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
        const {
          Interest,
          FireCess,
          Rebate,
          Penalty
        } = ImpDatesResponse.MdmsRes.PropertyTax;
        const { financialYr } = this.props;
        const intrest = findCorrectDateObjPenaltyIntrest(financialYr, Interest);
        const fireCess = findCorrectDateObj(financialYr, FireCess);
        const rebate = findCorrectDateObj(financialYr, Rebate);
        const penalty = findCorrectDateObjPenaltyIntrest(financialYr, Penalty);
        this.setState({
          importantDates: {
            intrest,
            fireCess,
            rebate,
            penalty
          }
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  getErrorMessage = value => {
    let { totalAmount } = this.props.estimationDetails[0] || {};
    let errorText = `amount should be numeric`;
    if (isFinite(value) && value >= totalAmount) {
      errorText = `can't be greater than ${parseInt(totalAmount) - 1}`;
    } else if (isFinite(value) && value <= 100) {
      errorText = "can't be less than 100";
    }
    return errorText;
  };

  handleFieldChange = (event, value) => {
    let { totalAmount } = this.props.estimationDetails[0] || {};
    if (
      isNaN(parseFloat(value)) ||
      !isFinite(value) ||
      value >= totalAmount ||
      value < 100
    ) {
      this.setState(
        {
          errorText: this.getErrorMessage(value)
        },
        () => {
          this.props.updateTotalAmount(
            value,
            this.state.valueSelected === "Full_Amount",
            this.state.errorText
          );
        }
      );
    } else {
      this.setState(
        {
          errorText: ""
        },
        () => {
          this.props.updateTotalAmount(
            value,
            this.state.valueSelected === "Full_Amount",
            this.state.errorText
          );
        }
      );
    }
  };

  updateTotalAmount = value =>
    this.props.updateTotalAmount(
      value,
      this.state.valueSelected === "Full_Amount"
    );

  onRadioButtonChange = e => {
    let { estimationDetails } = this.props;
    let { totalAmount } = estimationDetails[0] || {};
    if (e.target.value === "Full_Amount") {
      this.setState(
        {
          totalAmountTobePaid: totalAmount,
          valueSelected: "Full_Amount",
          errorText: ""
        },
        () => {
          this.updateTotalAmount(this.props.totalAmountToBePaid);
        }
      );
    } else {
      this.setState(
        { totalAmountTobePaid: 0, valueSelected: "Partial_Amount" },
        () => {
          this.updateTotalAmount(100);
        }
      );
    }
  };

  onEditButtonClick = index => {
    let { onTabClick } = this.props;
    onTabClick(index);
  };

  openCalculationDetails = () => {
    this.setState({ calculationDetails: true });
  };

  closeCalculationDetails = () => {
    this.setState({ calculationDetails: false });
  };

  editIcon = (
    <Icon
      onClick={this.handleEdit}
      style={defaultIconStyle}
      color="#ffffff"
      action="image"
      name="edit"
    />
  );
  render() {
    let { handleFieldChange, onRadioButtonChange, onEditButtonClick } = this;
    let { valueSelected, importantDates, errorText } = this.state;
    let {
      stepZero,
      stepTwo,
      stepOne,
      estimationDetails,
      totalAmountToBePaid,
      isPartialPaymentInValid,
      termsAccepted,
      termsError,
      toggleTerms
    } = this.props;
    let { totalAmount } = estimationDetails[0] || {};
    return (
      <div>
        <PropertyAddress
          icon={PropAddressIcon}
          editIcon={<EditIcon onIconClick={() => onEditButtonClick(0)} />}
          component={stepZero}
        />
        <AssessmentInfo
          icon={AssessmentInfoIcon}
          editIcon={<EditIcon onIconClick={() => onEditButtonClick(1)} />}
          component={stepOne}
        />
        <OwnerInfo
          icon={OwnerInfoIcon}
          editIcon={<EditIcon onIconClick={() => onEditButtonClick(2)} />}
          component={stepTwo}
        />
        <PropertyTaxDetailsCard
          estimationDetails={estimationDetails}
          importantDates={importantDates}
          openCalculationDetails={this.openCalculationDetails}
          optionSelected={valueSelected}
        />
        {!this.props.isCompletePayment && (
          <CalculationDetails
            open={this.state.calculationDetails}
            data={this.props.calculationScreenData}
            closeDialogue={() => this.closeCalculationDetails()}
          />
        )}
        {!isPartialPaymentInValid && (
          <PaymentAmountDetails
            value={
              valueSelected === "Partial_Amount"
                ? totalAmountToBePaid
                : totalAmount
            }
            onRadioButtonChange={onRadioButtonChange}
            handleFieldChange={handleFieldChange}
            optionSelected={valueSelected}
            totalAmount={totalAmount && totalAmount}
            estimationDetails={estimationDetails}
            errorText={errorText}
          />
        )}
        <div>
          <p className="declaration-main-header">DECLARATION</p>
          <SingleCheckbox
            id="rcpt"
            errorMessage={<Label label={termsError} />}
            errorText={<Label label={termsError} />}
            floatingLabelText={
              <Label label="PT_FINAL_DECLARATION_MESSAGE" color="#767676" />
            }
            value={termsAccepted}
            onCheck={() => {
              toggleTerms();
            }}
          />
          {termsError && (
            <Label
              label={termsError}
              containerStyle={{
                marginTop: "-22px",
                color: "#f44336",
                "margin-left": "4px"
              }}
              fontSize="14px"
              color="red"
            />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch({ type: "SET_ROUTE", route })
});
export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);
