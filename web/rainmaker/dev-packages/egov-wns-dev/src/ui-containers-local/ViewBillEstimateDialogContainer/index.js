import React from "react";
import { Label } from "egov-ui-framework/ui-atoms";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { convertEpochToDate } from '../../ui-config/screens/specs/utils';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = theme => ({
  root: {
    marginBottom: 8
  },
  container: {
    paddingBottom: 10
  },
  rightAlign: {
    textAlign: "right"
  }
});

const closebuttonStyle = {
  width: "25px",
  height: "25px",
  color: "#767676"
};

const closeIcon = "close";



class ViewBillEstimateContainer extends React.Component {
  state = {
    style: {
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontSize: "20px",
      fontWeigt: 500,
      lineSpacing: "28px",
      marginTop: 25,
      marginRight: 5
    }
  };

  getBillingSlabTable = (billSlab) =>{
    return (
      <div>
       
          <Table>
            <TableHead style={{ backgroundColor: "white", borderBottom: "1px solid rgb(211, 211, 211)" }}>
              <TableRow>                
                <TableCell>
                  <LabelContainer labelName="From"  labelKey="WS_BILL_SLAB_FROM" />                 
                </TableCell>
                <TableCell>
                <LabelContainer labelName="From"  labelKey="WS_BILL_SLAB_TO" />                 
                </TableCell>
                <TableCell>
                <LabelContainer labelName="From"  labelKey="WS_BILL_CHARGE" />                 
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
            {billSlab.map((item, i) => {                   
                      return (
                        <TableRow>
                        <TableCell >
                          <span >{item.from}</span>
                        </TableCell>

                        <TableCell >
                         <span  >{item.to}</span>
                        </TableCell>

                        <TableCell >
                          <span  >{item.charge}</span>
                        </TableCell>
                      </TableRow>
                      );                  
                })
              }
        
       </TableBody>
          
    </Table>
       
        
      </div>
    );


  }

  getBillGridItem = (labelName,labelKey,data,classes,style) =>{
    return (
        <Grid sm={12} className={classes.container} container={true}>
          <Grid sm={9}>
            <LabelContainer
              labelName= {labelName}
              labelKey={labelKey}
              style={
                style
                  ? style
                  : {
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "14px",
                    fontWeigt: 400,
                    lineSpacing: "17px",
                    marginRight:"10px"
                  }
              }
            />
          </Grid>
          <Grid sm={3} className={classes.rightAlign}>
            <LabelContainer
              labelName={data}
              style={
                style
                  ? style
                  : {
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "14px",
                    fontWeigt: 400,
                    lineSpacing: "17px"
                  }
              }
            />
          </Grid>
        </Grid>
      );

  };

  getGridItem = (total, classes, style) => {

    return (
      <Grid sm={12} className={classes.container} container={true}>
        <Grid sm={9}>
          <LabelContainer
            labelName={"Total"}
            labelKey={"PT_FORM4_TOTAL"}
            style={
              style
                ? style
                : {
                  color: "rgba(0, 0, 0, 0.8700000047683716)",
                  fontSize: "14px",
                  fontWeigt: 400,
                  lineSpacing: "17px",
                  marginRight:"10px"
                }
            }
          />
        </Grid>
        <Grid sm={3} className={classes.rightAlign}>
          <LabelContainer
            labelName={`Rs ${total}`}
            style={
              style
                ? style
                : {
                  color: "rgba(0, 0, 0, 0.8700000047683716)",
                  fontSize: "14px",
                  fontWeigt: 400,
                  lineSpacing: "17px"
                }
            }
          />
        </Grid>
      </Grid>
    );
  };

  handleClose = () => {
    const { screenKey } = this.props;
    this.props.handleField(
      screenKey,
      `components.billEstimateDialog`,
      "props.open",
      false
    );
  };

  render() {
    const {
      open,
      billingSlab,
      connectionType,
      propertyLocation,
      buildingType,
      calculationAttribute,
      billAmount,
      payableBillAmount,
      wsBillingSlab,
      from, 
      to,
      charge,  
      motorCharge,
      maintenanceCharge,
      waterSource,
      propertyOwnershipCategory,   
      minimumCharge,
      motorInfo,
      ownershipCategory,
      billingCycleEndDate,
      billingCycleStartDate,
      monthsToCharge,
      motorChargePayable,
      classes
    } = this.props;
    const { style } = this.state;
    const { getGridItem, handleClose,getBillGridItem,getBillingSlabTable } = this;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        children={[
          billingSlab != null ?(
           // payableBillAmount > 0  ? (
            <div style={{ padding: "26px" }}>
              <div
                onClick={handleClose}
                style={{ float: "right", cursor: "pointer" }}
              >
                <Icon style={closebuttonStyle}>
                  {" "}
                  <i class="material-icons">{closeIcon} </i>
                </Icon>
              </div>
              <div style={{ paddingBottom: "16px", paddingTop: "8px" }}>
                <LabelContainer
                  labelName="Bill Estimate"
                  labelKey="WS_BILL_ESTIMATE"
                  style={{
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "20px",
                    fontWeigt: 500,
                    lineSpacing: "28px"
                  }}
                />
              </div>
           
              {getBillGridItem("WS_SERV_DETAIL_CONN_TYPE" ,"WS_SERV_DETAIL_CONN_TYPE",connectionType, classes)}
              {
                propertyLocation != "NA" && 
                
                getBillGridItem("WS_PROP_DETAIL_LOCATION" ,"WS_PROP_DETAIL_LOCATION",propertyLocation, classes)
              }
             
              {
                buildingType != "NA" &&
                  getBillGridItem("WS_COMMON_USAGE_TYPE" ,"WS_COMMON_USAGE_TYPE",buildingType, classes)
              }  
              
              {
                motorInfo != "NA" &&
                getBillGridItem("Motor Info","Motor Info",motorInfo,classes)
              }
              {
                ownershipCategory != "NA" &&
                getBillGridItem("OwnershipCategory","OwnershipCategory",ownershipCategory,classes)
              }
              {
                propertyOwnershipCategory !="NA" &&
                getBillGridItem("propertyOwnershipCategory","WS_CON_OWNERSHIP",propertyOwnershipCategory,classes)
              }
              {
                waterSource  !="NA" &&
                getBillGridItem("waterSource","WS_SERV_DETAIL_WATER_SOURCE",waterSource,classes)
              }

              {
              getBillGridItem("Calculation Attribute" ,"Calculation Attribute",calculationAttribute, classes)
              }
         
              {[
                 <div style={{ paddingBottom: "12px" }}>
                 <LabelContainer
                     labelKey="WS_BILLING_SLAB"
                     style={{
                     color: "rgba(0, 0, 0, 0.8700000047683716)",
                     fontSize: "16px",
                     fontWeigt: 400,
                     lineSpacing: "19px"
                     }}
                 /></div>,
                 <Divider className={classes.root} />,
                wsBillingSlab && wsBillingSlab.length > 0 ?
                (                  
                  getBillingSlabTable(wsBillingSlab)
                )
                :
                (
                  <div>
                       {
                           maintenanceCharge >0 &&
                           getBillGridItem("Maintenance charge","WS_BILL_MAINTANANCE_CHARGE","Rs "+maintenanceCharge,classes)
                         }
                         {
                           motorCharge > 0 &&
                           getBillGridItem("Motor Charge","WS_BILL_MOTOR_CHARGE","Rs "+motorCharge,classes)
                         }
                         {
                         getBillGridItem( "Min Water Charge" ,"WS_BILL_MINIMUM_CHARGE", "Rs "+Math.round(minimumCharge), classes)
                         }
                         
                    </div>
                )

              ]}
            
              <div style={{ paddingBottom: "16px", paddingTop: "8px" }}>
                <LabelContainer
                  labelName="Bill Estimate"
                  labelKey="WS_BILL_PROVISIONAL"
                  style={{
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "20px",
                    fontWeigt: 500,
                    lineSpacing: "28px"
                  }}
                />
              </div>
              <Divider className={classes.root} />
           
                        {
                          wsBillingSlab && wsBillingSlab.length > 0 &&
                           minimumCharge >0 &&
                           getBillGridItem("WS_BILL_MINIMUM_CHARGE","WS_BILL_MINIMUM_CHARGE","Rs "+minimumCharge,classes)
                         }
                         {
                           maintenanceCharge >0 &&
                           getBillGridItem("WS_BILL_MAINTANANCE_CHARGE","WS_BILL_MAINTANANCE_CHARGE","Rs "+maintenanceCharge,classes)
                         }
                         {
                           motorChargePayable > 0 &&
                           getBillGridItem("motor charge","WS_BILL_MOTOR_CHARGE","Rs "+motorChargePayable,classes)
                         }
                         {
                           billAmount > 0 &&
                           getBillGridItem("Bill Amount","WS_BILL_CHARGE","Rs "+Math.round(billAmount),classes)
                         }

              <Divider className={classes.root} />
              
              {
                billingCycleStartDate != "NA"  &&
                  getBillGridItem("Billing Period Start date","WS_BILL_START_DATE",convertEpochToDate(billingCycleStartDate),classes)
               }
               {
                 billingCycleEndDate != "NA"  &&
                  getBillGridItem("Billing Period End date","WS_BILL_END_DATE",convertEpochToDate(billingCycleEndDate),classes)
               }
                {
                 monthsToCharge > 0 && 
                  getBillGridItem("WS_BILL_MONTHS_TO_CHARGE","WS_BILL_MONTHS_TO_CHARGE",monthsToCharge,classes)
               }
               
            <Divider className={classes.root} />
                {getGridItem(Math.round(billAmount), classes, style)}
             </div>
          ) : (
              <div style={{ padding: "16px", width: "500px" }}>
                <div style={{ paddingBottom: "16px" }}>
                  <LabelContainer
                    labelKey="WS_BILL_ESTIMATE"
                    style={{
                      color: "rgba(0, 0, 0, 0.8700000047683716)",
                      fontSize: "20px",
                      fontWeigt: 500,
                      lineSpacing: "28px"
                    }}
                  />
                </div>
                {getGridItem(Math.round(billAmount), classes, style)}
              </div>
            )
        ]}
      />
    );
  }
}

const mapStateToProps = (state, ownProps, dispatch) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig, preparedFinalObject } = screenConfiguration;
  
  const billingSlab = get(
           preparedFinalObject,
          "billEstimation.BillingSlab"
       );


  const connectionType = get(
    preparedFinalObject,
    "billEstimation.BillingSlab.connectionType"
  );

  
  const buildingType = get(
    preparedFinalObject,
    "billEstimation.BillingSlab.buildingType"
  );
  const calculationAttribute = get(
    preparedFinalObject,
    "billEstimation.BillingSlab.calculationAttribute"
  );

  const propertyLocation = get(
    preparedFinalObject,
    "billEstimation.BillingSlab.propertyLocation"
  );
  const billAmount = (isNaN(get(
    preparedFinalObject,
    "billEstimation.billAmount"
  )) === false ? get(
    preparedFinalObject,
    "billEstimation.billAmount"
  ): 0 )

  const payableBillAmount = get(preparedFinalObject,
    "billEstimation.payableBillAmount"
  );

  const wsBillingSlab = get(preparedFinalObject,
    "billEstimation.BillingSlab.slabs"
  );

  const from = (wsBillingSlab && wsBillingSlab.length > 0) ? get(preparedFinalObject,"billEstimation.BillingSlab.slabs[0].from"):0;
  const to = (wsBillingSlab && wsBillingSlab.length > 0) ? get(preparedFinalObject,"billEstimation.BillingSlab.slabs[0].to"):0;
  const charge = (wsBillingSlab && wsBillingSlab.length > 0) ? get(preparedFinalObject,"billEstimation.BillingSlab.slabs[0].charge"):0;
   
  const motorCharge = get(preparedFinalObject,"billEstimation.BillingSlab.motorCharge")
  const maintenanceCharge = get(preparedFinalObject,"billEstimation.BillingSlab.maintenanceCharge")
  const waterSource =  get(preparedFinalObject,"billEstimation.BillingSlab.waterSource")
  const propertyOwnershipCategory = get(preparedFinalObject,"billEstimation.BillingSlab.propertyOwnershipCategory")
  const minimumCharge = get(preparedFinalObject,"billEstimation.BillingSlab.minimumCharge")
  const motorInfo = get(preparedFinalObject,"billEstimation.BillingSlab.motorInfo")
  const ownershipCategory = get(preparedFinalObject,"billEstimation.BillingSlab.ownershipCategory")
  const monthsToCharge = get(preparedFinalObject,"billEstimation.monthsToCharge")
  const motorChargePayable = get(preparedFinalObject,"billEstimation.motorChargePayable")
  const billingCycleEndDate = get(preparedFinalObject,"billEstimation.billingCycleEndDate")
  const billingCycleStartDate = get(preparedFinalObject,"billEstimation.billingDate")            //convertEpochToDate(new Date())
 
  const open = get(
    screenConfig,
    `${screenKey}.components.billEstimateDialog.props.open`
  );

  
  return {
    open,
    billingSlab,
    connectionType,
    buildingType,
    calculationAttribute,
    propertyLocation,
    billAmount,
    payableBillAmount,   
    wsBillingSlab,
    from,
    to,
    charge,
    motorCharge,
    maintenanceCharge,
    waterSource,
    propertyOwnershipCategory,
    minimumCharge,
    motorInfo,
    ownershipCategory,
    billingCycleEndDate,
    billingCycleStartDate,
    motorChargePayable,
    monthsToCharge,
    screenKey,
    screenConfig
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)) };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ViewBillEstimateContainer)
);
