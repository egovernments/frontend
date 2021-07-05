import DownloadPrintButton from "egov-ui-framework/ui-molecules/DownloadPrintButton";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import Label from "egov-ui-kit/utils/translationNode";
import React from "react";
import { generatePdfFromDiv } from "../../../utils/PTCommon";
import { downloadPTBill  } from "egov-common/ui-utils/commons";

import "./index.css";

const PTHeader = ({ header = '', headerValue = '', subHeaderTitle = '', subHeaderValue = '', downloadPrintButton = false ,download,print,totalBillAmountDue=0,tenantId=''}) => {
  const locale = getLocale() || "en_IN";
  const localizationLabelsData = initLocalizationLabels(locale);
  let isCitizen = process.env.REACT_APP_NAME === "Citizen";
  let downloadButton;
  let printButton
//let tenantId = getTenantId();
  if (downloadPrintButton) {
    
    let applicationDownloadObject = {
      
      label: { labelName: "Application", labelKey: "PT_APPLICATION" },
      link: () => {
download?download():generatePdfFromDiv("download", subHeaderValue, "#property-review-form");
      },
      leftIcon: "assignment"
    
    };
  

    let tlCertificatePrintObject = {
      label: { labelName: "Application", labelKey: "PT_APPLICATION" },
      link: () => {
        print?print():generatePdfFromDiv("print", subHeaderValue, "#property-review-form");
      },
      leftIcon: "book"

    };

    let billDownloadObject = {
      label: { labelName: "Bill", labelKey: "PT_BILL" },
      link: () => {
        const billQueryStr = [
          { key: "propertyId", value: subHeaderValue },
          { key: "tenantId", value: tenantId}
        ]
        downloadPTBill(billQueryStr,"download"); 
      },
      leftIcon: "assignment"
    };

    let billPrintObject = {
      label: { labelName: "Bill", labelKey: "PT_BILL" },
      link: () => {
        const billQueryStr = [
          { key: "propertyId", value: subHeaderValue },
          { key: "tenantId", value: tenantId },
          {key: "businessService", value: "PT"}
        ]
        downloadPTBill(billQueryStr,"print");       },
      leftIcon: "book"

    };
    let downloadMenu = [];
    let printMenu = [];
    if(!isCitizen){
    downloadMenu.push(applicationDownloadObject);
    printMenu.push(tlCertificatePrintObject);
    
    }

    
   
    if(totalBillAmountDue!=0){
      downloadMenu.push(billDownloadObject);
      printMenu.push(billPrintObject);
    }
    if(downloadMenu.length!=0){
    
    downloadButton = { menu: downloadMenu, visibility: true };
    printButton = { menu: printMenu, visibility: true };
    }
    else{  downloadPrintButton = false;}
  }

  return (
    <div className="search-preview-header flex-child" style={{ display: "flex", marginBottom: downloadPrintButton ? 20 : 10, marginTop: 20, justifyContent: "space-between" }}>
      <div>
        <Label
          label={`${getTranslatedLabel(header, localizationLabelsData)} ${headerValue}`}
          containerStyle={{ padding: "10px 0px 0px 0px", marginLeft: "16px", display: "inline-block" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
        {subHeaderValue.length !== 0 && <Label
         // bold={true}
          //"PT_PROPERTY_PTUID"
          label={`${getTranslatedLabel(subHeaderTitle, localizationLabelsData)} ${subHeaderValue}`}
          containerStyle={{ marginLeft: "13px", display: "inline-block" }}
          labelStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "rgba(255, 255, 255, 0.87)",
            marginLeft: "8px",
            padding: "8px 19px",
            //paddingRight: "19px",
            textAlign: "center",
            verticalAlign: "middle",
            //lineHeight: "35px",
            fontSize: "16px",
          }}
          fontSize={"16px"}
        />}
      </div>
      {downloadPrintButton && <div className="header-buttons" style={{ float: "right", display: "flex", marginRight: 20 }} >
        <DownloadPrintButton
          data={{
            label: {
              llabelName: "DOWNLOAD",
              labelKey: "PT_DOWNLOAD",
            },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: 65, marginRight: 20, color: "#FE7A51" } },
            menu: downloadButton.menu,
          }}
        />
        <DownloadPrintButton
          data={{
            label: {
              llabelName: "Print",
              labelKey: "PT_PRINT",
            },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: 65, marginLeft: 10, color: "#FE7A51" } },
            menu: printButton.menu,
          }}
        />
      </div>}
    </div>

  )
}
export default PTHeader;
