import React from "react";
import { Dialog, DropDown, Button, DatePicker} from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions"
import { httpRequest } from "egov-ui-kit/utils/api";
import {toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import get from "lodash/get";
import store from "ui-redux/store";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";


const DeclarationDialog = ({ popupClose, popupOpen }) => {

  let getValue = (jsonPath) =>{
    let val = get(store.getState(), `screenConfiguration.preparedFinalObject.${jsonPath}`);
    return epochToDate(val);
  }

  let epochToDate = (t) =>{
    function pad2(n) {
      return n > 9 ? n : "0" + n;
    }
    var d = new Date(Number(t));
    var year = d.getFullYear();
    var month = d.getMonth() + 1; // months start at zero
    var day = d.getDate();
    return  year + "-" + pad2(month) + "-" + pad2(day);
  }

  let dateToEpoch = (datestring) => {
    let tdate = datestring.split("-");
    return new Date(tdate[0], tdate[1] - 1, tdate[2]).getTime();
  }

  let onChangeHandler = (e) => {
    store.dispatch(prepareFinalObject(`declaration.${e.target.id}`, dateToEpoch(e.target.value)));
  }

  let isValidForm = () => {
    let fromDate = get(store.getState(), "screenConfiguration.preparedFinalObject.declaration.fromDate") 
    let toDate = get(store.getState(), "screenConfiguration.preparedFinalObject.declaration.toDate");
    if(!fromDate || !toDate)
    {
      store.dispatch(toggleSnackbar(
        true,
        {
          labelName: "Please select dates",
          labelKey: "Please select dates"
        },
        "error"
      ));
      return false;
    }
    return true;
  }

  let updateDeclaration = async (isAgreed) =>{
    let queryParams = [];
    const requestBody = {};
    queryParams.push({ key: "agreed", value: isAgreed});
    queryParams.push({ key: "startdateepoch", value:  get(store.getState(), "screenConfiguration.preparedFinalObject.declaration.fromDate")});
    queryParams.push({ key: "enddateepoch", value: get(store.getState(), "screenConfiguration.preparedFinalObject.declaration.toDate")});
    try{
      let payload = null;
      payload = await httpRequest(
        `/birth-death-services/common/updateDeclaration`,
        "updateDeclaration",
        queryParams,
        requestBody
      );
      return payload;
    }
    catch (e) {
      store.dispatch(toggleSnackbar(
        true,
        {
          labelName: "Api Error",
          labelKey: "ERR_API_ERROR"
        },
        "error"
      ));
      console.error(e);
    }
  }
  
  let tenant = getTenantId().split(".").length>1? getTenantId().split(".")[1].toUpperCase():"";
  return (
    <Dialog
      open={popupOpen}
      isClose={true}
      title={
        <Label label={"Declaration"} bold={true} color="rgba(0, 0, 0, 0.8700000047683716)" fontSize="20px" labelStyle={{ padding: "16px 0px 0px 24px" }} />
      }
      children={[
        <Label label={`It is confirmed that all services available on the e-Chhawani Portal are being processed on the Portal by ${tenant} Cantonment Board and no manual processing is being done in such matters.`} 
          bold={false} color="rgba(0, 0, 0, 0.8700000047683716)" 
          fontSize="15px" 
          labelStyle={{ padding: "16px 0px 0px 24px" }} />,
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            id="fromDate"
            label="From Date"
            type="date"
            defaultValue={getValue("declaration.fromDate")}
            disabled = {true}
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={onChangeHandler}
          />
          <TextField
            id="toDate"
            label="To Date"
            type="date"
            defaultValue={getValue("declaration.toDate")}
            disabled = {true}
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={onChangeHandler}
          />
        </Grid>,
        <Button
          label ="I Agree"
          className="responsive-action-button"
          fullWidth={true}
          primary={true}
          buttonStyle={{ padding: '1px' }}
          style={{ padding: '5px', border: '5px', width: "36%" }}
          onClick={(e) => {
            if(isValidForm())
            {
              updateDeclaration('Y').then((result)=>{
                if(result == "Success")
                {
                  store.dispatch(toggleSnackbar(
                    true,
                    {
                      labelName: "Declaration successful",
                      labelKey: "Declaration successful"
                    },
                    "error"
                  ));
                  popupClose();
                }
              });
            }
          }}
        />,
        <Button
          label ="I Disagree"
          className="responsive-action-button"
          fullWidth={true}
          primary={true}
          buttonStyle={{ padding: '1px' }}
          style={{ padding: '5px', border: '5px', width: "36%" }}
          onClick={(e) => {
            if(isValidForm())
            {
              updateDeclaration('N').then((result)=>{
                if(result=="Success")
                {
                  store.dispatch(toggleSnackbar(
                    true,
                    {
                      labelName: "Declaration successful",
                      labelKey: "Declaration successful"
                    },
                    "success"
                  ));
                  popupClose();
                }
              });
            }
          }}
        />,
        <Button
          label ="Cancel"
          className="responsive-action-button"
          fullWidth={true}
          primary={true}
          onClick={(e) => {
            popupClose();
          }}
          variant={"outlined"}
          color={"primary"}
          buttonStyle={{ padding: '1px' }}
          style={{ padding: '5px', border: '5px', width: "36%" }}
        />,
      ]}
      handleClose={popupClose}
      contentClassName={"logout-popup"}
      contentStyle={{ width: "90%" }}
    />
  );
};

export default DeclarationDialog;
