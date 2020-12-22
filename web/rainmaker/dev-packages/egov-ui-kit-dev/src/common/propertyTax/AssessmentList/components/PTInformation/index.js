import React from "react";
import { Image, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { connect } from "react-redux";
import AssessmentInfo from "../../../Property/components/AssessmentInfo";
import PropertyAddressInfo from "../../../Property/components/PropertyAddressInfo";
import OwnerInfo from "../../../Property/components/OwnerInfo";
import TotalDues from "../../../Property/components/TotalDues";
import AssessmentHistory from "./components/AssessmentHistory";
import PaymentHistory from "./components/PaymentHistory";
import ApplicationHistory from "./components/ApplicationHistory";
import DocumentsInfo from "../../../Property/components/DocumentsInfo";
import get from "lodash/get";
import "./index.css";
import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";

const logoStyle = {
  height: "61px",
  width: "60px",
};

class PTInformation extends React.Component {
  updateProperty = () => {
    let {
      propertiesAudit,
      properties
    } = this.props;
    if(propertiesAudit.length===0) propertiesAudit.push(properties);
    let Owners = [];
    let Institution=null;
    let ownershipCategory='';
    propertiesAudit.reverse().map(property => {
      if (property.status == "ACTIVE") {
        Owners = property.owners.filter(owner => owner.status == "ACTIVE");
        Institution=property.institution;
        ownershipCategory=property.ownershipCategory;
      }
    })
    if (Owners.length == 0) {
      Owners = propertiesAudit[0].owners.filter(owner => owner.status == "ACTIVE");
      Institution=propertiesAudit[0].institution;
      ownershipCategory=propertiesAudit[0].ownershipCategory;
    }
    return {owners:Owners,institution:Institution,ownershipCategory};


  }
  getLogoUrl = (tenantId) => {
    const { cities } = this.props
    const filteredCity = cities && cities.length > 0 && cities.filter(item => item.code === tenantId);
    return filteredCity ? get(filteredCity[0], "logoId") : "";
  }

  render() {
    const {
      label,
      properties,
      generalMDMSDataById,
      totalBillAmountDue,
      documentsUploaded,
      toggleSnackbarAndSetText,
      cities,
      propertiesAudit
    } = this.props;
    let logoUrl = "";
    let corpCity = "";
    let ulbGrade = "";
    let datecraeted=convertEpochToDate(get(properties.auditDetails, "createdTime"));
    if (get(properties, "tenantId")) {
      let tenantid=get(properties, "tenantId");
     // logoUrl = get(properties, "tenantId") ? this.getLogoUrl(get(properties, "tenantId")) : "";
     logoUrl = window.location.origin + `/pb-egov-assets/${tenantid}/logo.png`;
      corpCity = `TENANT_TENANTS_${get(properties, "tenantId").toUpperCase().replace(/[.:-\s\/]/g, "_")}`;
      const selectedCityObject =cities && cities && cities.length > 0 && cities.filter(item => item.code === get(properties, "tenantId"));
      ulbGrade = selectedCityObject ? get(selectedCityObject[0], "city.ulbType") && get(selectedCityObject[0], "city.ulbType").toUpperCase() : "MUNICIPAL CORPORATION";
      //ulbGrade= "MUNICIPAL CORPORATION";
    }
    let propertyExist = properties.hasOwnProperty('propertyDetails');
    if(propertyExist) {
      if(properties.propertyDetails[0].status != null || properties.propertyDetails[0].status != undefined) {
        properties.propertyDetails[0].units && properties.propertyDetails[0].units.length > 0 && properties.propertyDetails[0].units.map( unit => {
          if(unit.constructionDetail.builtUpArea && unit.constructionDetail.builtUpArea === unit.unitArea) {
            unit.unitArea = Math.round(unit.unitArea * 9);
          }
        })
      }
    }
    if (properties.status == "INWORKFLOW") {
      const updatedOnwerInfo=this.updateProperty();
      properties.propertyDetails[0].owners = updatedOnwerInfo.owners;
      properties.propertyDetails[0].institution = updatedOnwerInfo.institution;
      properties.propertyDetails[0].ownershipCategory = updatedOnwerInfo.ownershipCategory;
    }
    return (
      <div className="form-without-button-cont-generic">
        {label && (
          <Label
            label={label}
            containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
            dark={true}
            bold={true}
            labelStyle={{ letterSpacing: 0 }}
            fontSize={"20px"}
          />
        )}
        <div>
          <Card
            textChildren={
              <div id="property-review-form" className="col-sm-12 col-xs-12" style={{ alignItems: "center" }}>
                {totalBillAmountDue > 0 && (
                  <Card
                    textChildren={
                      <TotalDues
                        history
                        tenantId={properties.tenantId}
                        consumerCode={properties.propertyId}
                        totalBillAmountDue={totalBillAmountDue}
                      />
                    }
                    style={{ backgroundColor: "rgb(255,255,255)", boxShadow: "none" }}
                  />
                )}
                <div className="pdf-header" id="pdf-header">
                  <Card
                    style={{ display: "flex", backgroundColor: "rgb(255,255,255)", minHeight: "50px", alignItems: "center", paddingLeft: "10px" }}
                    textChildren={
                      <div style={{ display: "flex" }}>
                        <Image  id="image-id" style={logoStyle} source={logoUrl} />
                        <div style={{ marginLeft: 30 }}>
                          <div style={{ display: "flex", marginBottom: 1 }}>
                            <Label label={corpCity} fontSize="20px" fontWeight="500" color="rgb(0, 0, 0)" containerStyle={{ marginRight: 10, textTransform: "uppercase" }} />
                            <Label label={ulbGrade} fontSize="20px" fontWeight="500" color="rgb(0, 0, 0)" />
                          </div>
                          <Label label={"PT_PDF_SUBHEADER"} fontSize="16px" fontWeight="500" />
                        </div>
                      </div>
                    }
                  />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex" }}>
                      <Label label="PT_PROPERTY_ID" color="rgb(0, 0, 0)" fontSize="20px" containerStyle={{ marginRight: 10 }} />
                      <Label label={`${get(properties, "propertyId")}`} fontSize="20px" />
                      <Label label="PT_APPLICATION_NO" color="rgb(0, 0, 0)" fontSize="20px" containerStyle={{ marginLeft: 100 }} />
                      <Label label={`${get(properties, "acknowldgementNumber")}`} fontSize="20px" />
                      <Label label="Date" color="rgb(0, 0, 0)" fontSize="20px" containerStyle={{ marginLeft: 100 }} />
                      <Label label={`: ${datecraeted}`} fontSize="20px" />
                      </div>
                    
                    {/* <div style={{display : "flex"}}>
                      <Label label="Property ID :" color="rgba(0, 0, 0, 0.87)" fontSize="20px"/>
                      <Label label="PT-JLD-2018-09-145323" fontSize="20px"/>
                    </div> */}
                    {/* <div style={{display : "flex"}}>
                      <Label label="PDF_STATIC_LABEL_CONSOLIDATED_BILL_DATE" color="rgba(0, 0, 0, 0.87)" fontSize="20px"/>
                      <Label label="PT-JLD-2018-09-145323" fontSize="20px"/>
                    </div> */}
                  </div>
                </div>

                <PropertyAddressInfo properties={properties} generalMDMSDataById={generalMDMSDataById}></PropertyAddressInfo>
                <AssessmentInfo properties={properties} generalMDMSDataById={generalMDMSDataById}></AssessmentInfo>
                <OwnerInfo
                  toggleSnackbarAndSetText={toggleSnackbarAndSetText}
                  properties={properties}
                  generalMDMSDataById={generalMDMSDataById}
                  totalBillAmountDue={totalBillAmountDue}
                  ownershipTransfer={true}
                  viewHistory={true}
                  propertiesAudit={propertiesAudit}
                ></OwnerInfo>
                <div id="property-assess-form">
                <DocumentsInfo documentsUploaded={documentsUploaded}></DocumentsInfo>
                  <AssessmentHistory></AssessmentHistory>
                  <PaymentHistory></PaymentHistory>
                  <ApplicationHistory></ApplicationHistory>
                </div>
                <div>* This document does not certify payment of Property Tax</div>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { screenConfiguration = {} } = state;
  const { cities } = state.common || [];

  const { preparedFinalObject } = screenConfiguration;
  let { propertiesAudit = [] } = preparedFinalObject;
  return { cities, propertiesAudit };
}


export default connect(
  mapStateToProps,
  null
)(PTInformation);
