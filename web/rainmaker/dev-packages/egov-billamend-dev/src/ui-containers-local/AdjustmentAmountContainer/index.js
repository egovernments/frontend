import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import get from "lodash/get";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import CheckBoxContainer from "../CheckBoxContainer";




const styles = theme => ({

  textField: {
  },
input: {
    padding: "10px 0px 2px 10px !important",
    "&:before": {
      border: "2px solid rgba(0, 0, 0, 0.42) !important",
      height: "40px !important",
      borderRadius: "5px !important"
    },
    "&:after": {
      border: "2px solid #DB6844 !important",
      height: "40px !important",
      borderRadius: "5px !important"
    }
}
});

const themeStyles = (theme) => ({
  documentContainer: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px",
  },
  documentCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px",
  },
  documentSubCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: "1px",
  },
  documentIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px",
    marginTop: "20px",
  },
  documentSuccess: {
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39CB74",
    color: "white",
    marginTop: "20px",
  },
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px",
  },
  input: {
    display: "none",
  },
  iconDiv: {
    display: "flex",
    alignItems: "center",
  },
  descriptionDiv: {
    alignItems: "center",
    display: "block",
    marginTop: "20px",
  },
  formControl: {
    minWidth: 250,
    padding: "0px",
  },
  fileUploadDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "5px",
    "& input": {
      display: "none",
    },
  },
});

const lableStyle = {
  display: "flex",
  alignItems: "center"
};
const taxHeadsLabel = {
  display: "flex",
  alignItems: "center",
  fontWeight: 600
}

class AdjustmentAmountContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reducedAmount: "",
      additionalAmount: "",
      color: "red",
      year: 1964
    };
  }

  handlereducedAmountChange = (event) => {
    this.setState({ reducedAmount: event.target.value });
  }

  handleadditionalAmountChange = (event) => {
    this.setState({ name: event.target.value });
  }

  getHeaderTaxCard = (card, key) => {
    const { classes, ...rest } = this.props;

    return (
      <React.Fragment>
        <Grid container={true}>
          <Grid item={true} xs={4} sm={4} md={3} style={lableStyle}>
            <LabelContainer
              labelKey={getTransformedLocale(card.taxHeads)}
            />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={3}>
            <TextField
              variant="outlined"
              // value={this.state.reducedAmount}
              className={classes.textField}
              // onChange={this.handlereducedAmountChange}
              InputProps={{
                className: classes.input,
            }}
            />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={3}>
            <TextField 
                variant="outlined"
                // value={this.state.reducedAmount}
                className={classes.textField}
                // onChange={this.handleadditionalAmountChange}
                InputProps={{
                  className: classes.input,
              }}
              />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={4}>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };


  render() {
    const { ...rest } = this.props;
    let data = [
      {
        "taxHeads": "Water Tax"
      },
      {
        "taxHeads": "Water cess"
      },
      {
        "taxHeads": "Interest"
      },
      {
        "taxHeads": "Penalty"
      },
    ]
    return (
      <div>
        <Grid container={true}>
          <Grid item={true} xs={4} sm={4} md={3} style={taxHeadsLabel}>
            <LabelContainer
              labelKey={getTransformedLocale("TAX_HEADS")}
            />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={3}>
            <CheckBoxContainer
              labelName="Reduced Amount (Rs)"
              labelKey="BILL_REDUCED_AMOUNT_RS"
            />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={3}>
            <CheckBoxContainer
              labelName="Additional Amount (Rs)"
              labelKey="BILL_ADDITIONAL_AMOUNT_RS"
            />
          </Grid>
          <Grid item={true} xs={4} sm={4} md={4}>
          </Grid>
        </Grid>
        <div>
          {data && data.length > 0 && data.map((card, index) => {
            return (
              <div>{this.getHeaderTaxCard(card, index++)}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(AdjustmentAmountContainer)
);
