import { Dialog } from "components";
import Button from '@material-ui/core/Button';
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest as httpRequestnew } from "egov-ui-framework/ui-utils/api";
import { get } from "lodash";
import { Card } from "components";



import "./index.css";


const rebateDialogheader = {
  color: "black",
  fontWeight: 500,
  fontSize: "20px !important",
  lineHeight: "28px !important",
  textAlign: "left",
  paddingLeft: "5px",
  backgroundColor: "white !important",
};
class RebateDialogue extends Component {
  state = {
    selectedOption: '',
    isFullPayment:''
  }
  handleRadioButton = (e,isFullPay) => {
    const {prepareFinalObject} = this.props
    this.setState({
      selectedOption: e.target.value,
      isFullPayment: isFullPay
    })
    prepareFinalObject("isFullPayment", isFullPay);
  }
  componentDidMount = async () => {

  };

  onProceedClick = () =>{
    if(isFullPayment){

    }
  }

  render() {
    let { open, closeRebateDialogue, redirectToPay,rebateForCurrYear } = this.props;
    let { reqDocs } = this.state
    return (
      <Dialog
        open={open}
        title={
          <Label label="Payment" labelStyle={rebateDialogheader} fontSize="18px" color="black" />
        }
        children={[
          <div>
          <div className="amt-radio" style={{ padding: '15px' }}>
             <label className="radio-button-label">
               <input
               className="radio-root"
          type="radio"
          onClick={(event)=>this.handleRadioButton(event,true)}
          checked={this.state.selectedOption === "Full Payment"}
          value="Full Payment"
          name="radio"
        /> Full Payment
        </label>
 
<label className="radio-button-label"><input
          type="radio"
          className="radio-root"
          onClick={(event)=>this.handleRadioButton(event,false)}
          checked={this.state.selectedOption === "Partial Payment"}
          value="Partial Payment"
          name="radio"
        /> Partial Payment
        </label>

        
            <div>
             

            </div>

          </div>
         <br />
         <br/>
         <div>
           <p>
             If you make complete payment within <span>{rebateForCurrYear.endDate}</span>, you will be getting rebate of <span>{rebateForCurrYear.rate}</span>% of <span>{rebateForCurrYear.attr}</span>
           </p>
     </div>
     </div>
      ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={true}
        handleClose={closeRebateDialogue}
        onRequestClose={closeRebateDialogue}
        autoScrollBodyContent={true}
        contentClassName="rebate-dialog-content"
        className="rebate-dialog"
        style={{ maxHeight: "500px !importnt" }}
        titleStyle={{ rebateDialogheader }}
        modal={true}
        actions={[
          <div style={{ position: "sticky" }}>
            <Button onClick={closeRebateDialogue} color="primary">
              CANCEL
          </Button>
            <Button onClick={()=>redirectToPay(this.state.isFullPayment,this.state.selectedOption)} color="primary">
              OK
          </Button>
          </div>
        ]}

      />
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RebateDialogue);
