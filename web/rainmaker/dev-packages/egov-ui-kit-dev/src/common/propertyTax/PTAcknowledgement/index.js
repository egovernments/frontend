import FloatingActionButton from "material-ui/FloatingActionButton";

import React from "react";
import Label from "egov-ui-kit/utils/translationNode";
import DownloadPrintButton from "egov-ui-framework/ui-molecules/DownloadPrintButton";
import { Button, TimeLine, Card, Icon } from "components";
import "./index.css";
class PTAcknowledgement extends React.Component {
  state = {
    purpose: "apply",
    status: "success",
  };

  render() {
    let downloadMenu=[];
    let printMenu=[];
    
    let applicationDownloadObject = {
      label: { labelName: "Application", labelKey: "TL_APPLICATION" },
      link: () => {
        // const { Licenses ,LicensesTemp} = state.screenConfiguration.preparedFinalObject;
        // const documents = LicensesTemp[0].reviewDocData;
        // set(Licenses[0],"additionalDetails.documents",documents)
        // downloadAcknowledgementForm(Licenses);
        console.log("Download");
      },
      leftIcon: "assignment"
    };

    let tlCertificatePrintObject = {
      label: { labelName: "TL Certificate", labelKey: "TL_CERTIFICATE" },
       link: () => {
      //   const { Licenses } = state.screenConfiguration.preparedFinalObject;
      //   downloadCertificateForm(Licenses,'print');
      // 
      console.log("Print");
    },
       leftIcon: "book"
      
    };

    downloadMenu.push(applicationDownloadObject);
    printMenu.push(tlCertificatePrintObject);
    const { acknowledgeType = "success", messageHeader = "", message = "", receiptHeader = "PT_APPLICATION_NO_LABEL", receiptNo = "" } = this.props;
    let icon;
    let iconColor;
    if (acknowledgeType == "success") {
      icon = "done";
      iconColor = "#39CB74";
    } else if (acknowledgeType == "failed") {
      icon = "close";
      iconColor = "#E54D42";
    } else {
      icon = "done";
      iconColor = "#39CB74";
    }
    let ptHeader = "";
    if (this.state.purpose === "apply" && this.state.status === "success") {
      (ptHeader = {
        // labelName: `Application for New Trade License (${financialYearText})`,
        labelName: "Application for New Trade License 2019-2020",
        labelKey: "TL_COMMON_APPLICATION_NEW_LICENSE",
        //dynamicArray: [financialYearText]
      }),
        console.log("ptHeader---", ptHeader);
    }
    return (
      <div>
        <Label
          label="Property Assessment (2019-2020)"
          color="rgba(0, 0, 0, 0.87)"
          fontSize="24px"
          fontWeight="400"
          fontFamily="Roboto"
          lineHeight="1.35417em"
        />
        <div>
        <DownloadPrintButton data={{label: {
                    labelName:"Download",labelKey:"TL_DOWNLOAD"},
                  leftIcon: "cloud_download",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: downloadMenu
                }}/>
        <DownloadPrintButton data={{label: {
                    llabelName:"Print",labelKey:"TL_PRINT"},
                    leftIcon: "print",
                    rightIcon: "arrow_drop_down",
                    props: { variant: "outlined", style: { marginLeft: 10 } },
                    menu: printMenu
                }}/>        
        </div>
        <Card
          style={{ backgroundColor: "white" }}
          textChildren={
            <div className="MuiCardContent-root-97">
              <div className="ack-header MuiGrid-container-98" id="material-ui-applicationSuccessContainer">
                <div
                  className="MuiAvatar-root-195 MuiAvatar-colorDefault-196"
                  id="material-ui-avatar"
                  style={{ width: "72px", height: "72px", backgroundColor: iconColor }}
                >
                  <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={iconColor}>
                    <i id="custom-atoms-body" className="material-icons" style={{ fontSize: "50px" }}>
                      {icon}
                    </i>
                  </FloatingActionButton>
                </div>
                {/* <div>Property Assessed Successfully</div>
              <div>A notification regarding property assessment has been sent to property owner at registered mobile No.</div> */}
                <div className="ack-body" id="custom-atoms-body">
                  <h1 className="MuiTypography-root-8 MuiTypography-headline-13" id="material-ui-header">
                    <span id="custom-containers-key">
                      {" "}
                      <Label
                        label="Property Assessed Successfully"
                        color="rgba(0, 0, 0, 0.87)"
                        fontSize="24px"
                        fontWeight="400"
                        fontFamily="Roboto"
                        lineHeight="1.35417em"
                      />
                    </span>
                  </h1>
                  <div className="ack-sub-body" id="custom-atoms-paragraph">
                    <span>
                      {" "}
                      <Label
                        label="A notification regarding property assessment has been sent to property owner at registered mobile No."
                        color="rgba(0, 0, 0, 0.6)"
                        fontFamily="Roboto"
                      />
                    </span>
                  </div>
                </div>
                <div className="ack-text" id="custom-atoms-tail">
                  {/* {receiptNo&&<h1  className="MuiTypography-root-8 MuiTypography-headline-13" id="material-ui-text" style={{fontSize: '16px' ,fontWeight:"400" ,color: 'rgba(0, 0, 0, 0.6)'}}  > */}
                  <h1
                    className="MuiTypography-root-8 MuiTypography-headline-13"
                    id="material-ui-text"
                    style={{ fontSize: "16px", fontWeight: "400", color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <span>
                      <Label label="Poperty ID" fontSize="16px" fontWeight="400" color="rgba(0, 0, 0, 0.6)" />
                    </span>
                  </h1>
                  <h1
                    className="MuiTypography-root-8 MuiTypography-headline-13"
                    id="material-ui-paragraph"
                    style={{ fontSize: "24px", fontWeight: "500" }}
                  >
                    <span>
                      <Label label="PT-2019-878332" fontSize="24px" color="rgba(0, 0, 0, 0.87)" fontWeight="500" />
                    </span>
                  </h1>
                </div>
                <div id="tax-wizard-buttons" className="wizard-footer col-sm-12" style={{ textAlign: "right" }}>
                  <div className="button-container col-xs-6 col-md-3 property-info-access-btn" style={{ float: "right" }}>
                    <Button
                      onClick={() => this.onAssessPayClick()}
                      label={<Label buttonLabel={true} label="PT_GOHOME" fontSize="16px" />}
                      primary={true}
                      style={{ lineHeight: "auto", minWidth: "inherit" }}
                    />
                  </div>
                  <div className="button-container col-xs-6 col-md-3 property-info-access-btn" style={{ float: "right" }}>
                    <Button
                      onClick={() => this.onAssessPayClick()}
                      label={<Label buttonLabel={true} label="PT_ASSESS_PROPERTY" fontSize="16px" />}
                      primary={true}
                      style={{ lineHeight: "auto", minWidth: "inherit" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default PTAcknowledgement;
