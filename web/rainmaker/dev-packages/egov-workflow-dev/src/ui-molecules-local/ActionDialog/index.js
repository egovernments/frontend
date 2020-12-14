import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import DatePicker from "material-ui/DatePicker";
import TextField from '@material-ui/core/TextField';
import get from "lodash/get";
const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  },
  tradeSubType: {
    label: {
      labelName: "SubType",
      labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
    },
    placeholder: {
      labelName: "Enter the Trade SubType",
      labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_DIALOG_PLACEHOLDER"
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["TL_FIELD_INSPECTOR", "TL_DOC_VERIFIER"]
    }
  },
  cbrnNumber: {
    label: {
      labelName: "cbrnNumber",
      labelKey: "TL_NEW_TRADE_DETAILS_CBRNUMBER_LABEL"
    },
    placeholder: {
      labelName: "Enter the cbrnNumber",
      labelKey: "TL_NEW_TRADE_DETAILS_CBRNUMBER_PLACEHOLDER"
    }

  },
  cbrnDate: {
    // getDateField({
    label: {
      labelName: "cbrnDate",
      labelKey: "TL_NEW_TRADE_DETAILS_CBRNDATE_LABEL"
    }

    //})
  }

};

class ActionDialog extends React.Component {
  state = {
    employeeList: [],
    roles: ""
  };

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  getButtonLabelName = label => {
    switch (label) {
      case "FORWARD":
        return "Verify and Forward";
      case "MARK":
        return "Mark";
      case "REJECT":
        return "Reject";
      case "CANCEL":
      case "APPROVE":
        return "APPROVE";
      case "PAY":
        return "Pay";
      case "SENDBACK":
        return "Send Back";
      default:
        return label;
    }
  };

  render() {
        
    let {
      open,
      onClose,
      dropDownData,
      handleFieldChange,
      onButtonClick,
      dialogData,
      dataPath,
      state
    } = this.props;
    const {
      buttonLabel,
      showEmployeeList,
      dialogHeader,
      moduleName,
      isDocRequired
    } = dialogData;
    const { getButtonLabelName } = this;
    let fullscreen = false;
    const showAssignee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }
    if (dataPath === "FireNOCs") {
      dataPath = `${dataPath}[0].fireNOCDetails.additionalDetail`
    } else if (dataPath === "Assessment"||dataPath === "Property" || dataPath === "BPA" || dataPath === "Noc") {
      dataPath = `${dataPath}.workflow`;
    } else {
      dataPath = `${dataPath}[0]`;
    }
    let assigneePath= '';
    /* The path for Assignee in Property and Assessment has latest workflow contract and it is Array of user object  */
    if (dataPath.includes("Assessment")||dataPath.includes("Property")){
      assigneePath=`${dataPath}.assignes[0].uuid`;
    }else{
      assigneePath=`${dataPath}.assignee[0]`;
    }

    let wfDocumentsPath;
    if(dataPath === "BPA.workflow") {
      wfDocumentsPath = `${dataPath}.varificationDocuments`
    } else if (dataPath === "Noc.workflow") {
      wfDocumentsPath = `${dataPath}.documents`
    } else {
      wfDocumentsPath = `${dataPath}.wfDocuments`
    }
    let showSubTradeField=false;
    let showSubTradeFields =false;
    const status = get(
      state ,
      `screenConfiguration.preparedFinalObject.Licenses[0].status`,
      null
    );
    if(status!=null){
      if(status=="FIELDINSPECTION"){
          showSubTradeField=true;
      }else if(status=="PENDINGAPPROVAL"){
          showSubTradeFields=true;
      }
    }
    
    

    return (
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
       // fullWidth={fullwidth}
        style={{marginTop: fullscreen ? "20%" : 0}}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                  {showEmployeeList && showAssignee && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>
                          handleFieldChange(
                            assigneePath,
                            e.target.value
                          )
                        }
                        jsonPath={assigneePath}
                      />
                    </Grid>
                  )}
                  <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.comments.label}
                      onChange={e =>
                        handleFieldChange(`${dataPath}.comment`, e.target.value)
                      }
                      jsonPath={`${dataPath}.comment`}
                      placeholder={fieldConfig.comments.placeholder}
                    />
                  </Grid>
                  {showSubTradeField &&
                  <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.tradeSubType.label}
                      onChange={e =>
                        handleFieldChange(`${dataPath}.tradeLicenseDetail.additionalDetail.tradeSubType`, e.target.value)
                      }
                      required={true}
                      jsonPath={`${dataPath}.tradeLicenseDetail.additionalDetail.tradeSubType`}
                      placeholder={fieldConfig.tradeSubType.placeholder}
                    />
                  </Grid>

                  }   
                  {showSubTradeFields &&
                    <Grid item sm="12">
                    <TextFieldContainer
                    
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.cbrnNumber.label}
                      required={true}
                      onChange={(e, value) => {
                        let num = JSON.stringify({ 'cbrnNumber': e.target.value })
                        handleFieldChange(`${dataPath}.tradeLicenseDetail.additionalDetail.cbrnNumber`, e.target.value)
                      }
                      }
                      jsonPath={`${dataPath}.tradeLicenseDetail.additionalDetail.cbrnNumber`}
                      placeholder={fieldConfig.cbrnNumber.placeholder}
                    />
                  </Grid>}
                  {showSubTradeFields &&
                  <Grid item sm="12">
                    <TextFieldContainer
                      id="datetime-local"
                      label={fieldConfig.cbrnDate.label}
                      //label="Date"
                      type="date"
                      required={true}
                      InputProps={{ inputProps: { max: new Date().toISOString().slice(0,10)} }}
                      //format={'DD/MM/YYYY'}
                      // formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e, value) => {
                        handleFieldChange(`${dataPath}.tradeLicenseDetail.additionalDetail.cbrnDate`, e.target.value)
                      }
                      }
                      jsonPath={`${dataPath}.tradeLicenseDetail.additionalDetail.cbrnDate`}

                    />
                  </Grid>

                  } 

                  <Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <div className="rainmaker-displayInline">
                        <LabelContainer
                          labelName="Supporting Documents"
                          labelKey="WF_APPROVAL_UPLOAD_HEAD"
                        />
                        {isDocRequired && (
                          <span style={{ marginLeft: 5, color: "red" }}>*</span>
                        )}
                      </div>
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />
                    </div>
                    <UploadMultipleFiles
                      maxFiles={4}
                      inputProps={{
                        accept: "image/*, .pdf, .png, .jpeg"
                      }}
                      buttonLabel={{ labelName: "UPLOAD FILES",labelKey : "TL_UPLOAD_FILES_BUTTON" }}
                      jsonPath={wfDocumentsPath}
                      maxFileSize={5000}
                    />
                    <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={() =>
                          onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
          }
        />
      </Dialog>
    );
  }
}
export default withStyles(styles)(ActionDialog);
