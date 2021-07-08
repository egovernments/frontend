import { propertyDetails, locationDetails, propertyOwnerDetail, connectionHolderDetails, connectionHolderSameAsOwnerDetails } from "egov-wns/ui-config/screens/specs/wns/applyResource/review-trade";
import { connDetailsWater, connDetailsSewerage } from "egov-wns/ui-config/screens/specs/wns/applyResource/task-connectiondetails";
import { plumberDetails, roadDetails, additionDetailsWater, additionDetailsSewerage, activateDetailsMeter, activateDetailsNonMeter } from "egov-wns/ui-config/screens/specs/wns/applyResource/review-owner";
import get from "lodash/get";
import { reviewModificationsEffectiveDate } from "egov-wns/ui-config/screens/specs/wns/applyResource/reviewModificationsEffective";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard, generateKeyValueForModify,getEstimateCardDetails } from "./generatePDF";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

export const generateWSAcknowledgement = (preparedFinalObject, fileName = "print", service, connType) => {
    propertyDetails.reviewPropertyType.localiseValue = true;
    propertyDetails.reviewPropertyType.localiseValue = true;
    propertyDetails.reviewPropertyUsageType.localiseValue = true;
    propertyDetails.reviewPropertySubUsageType.localiseValue = true;
    locationDetails.reviewLocation.localiseValue = true;
    connectionHolderDetails.gender.localiseValue = true;
    connectionHolderDetails.relationship.localiseValue = true;
    connectionHolderDetails.specialApplicantCategory.localiseValue = true;
    plumberDetails.reviewPlumberProvidedBy.localiseValue = true;
    roadDetails.reviewRate.localiseValue = true;
    //roadDetails.localiseValue = true;
    roadDetails.getCommonContainerreviewRoadType.localiseValue = true;
    propertyOwnerDetail.gender.localiseValue = true;
    propertyOwnerDetail.specialApplicantCategory.localiseValue = true;
    propertyOwnerDetail.relationship.localiseValue = true;
    additionDetailsWater.reviewWaterSource.localiseValue=true;
    additionDetailsWater.reviewConnectionType.localiseValue=true;
    additionDetailsWater.reviewWaterSubSource.localiseValue=true;
    additionDetailsWater.reviewMotorInfo.localiseValue=true;
    additionDetailsWater.reviewAuthorizedConnection.localiseValue=true;
    additionDetailsWater.reviewUsageType.localiseValue=true;
    additionDetailsWater.reviewSubUsageType.localiseValue=true;
    let propDetail = generateKeyValue(preparedFinalObject, propertyDetails);
    let propertyDetail = propDetail.map(cur => {
        if (cur.key === "Rainwater harvesting Facility") {
            if (cur.value === true) { return ({ key: cur.key, value: "Yes" }) }
            else if(cur.value === false){ return ({ key: cur.key, value: "No" }) }
            else{ return ({ key: cur.key, value: "NA" })}
        } else {
            return ({ key: cur.key, value: cur.value })
        }
    })
    const locationDetail = generateKeyValue(preparedFinalObject, locationDetails);
    let connectionDetail = {};
    if (service === "WATER") {
        connectionDetail = generateKeyValue(preparedFinalObject, connDetailsWater);
    } else {
        connectionDetail = generateKeyValue(preparedFinalObject, connDetailsSewerage);
    }
    let additionDetail = {};
    if (service === "WATER") {
        //console.log("additionDetailsWater--",additionDetailsWater);
        additionDetail = generateKeyValue(preparedFinalObject, additionDetailsWater);
    } else {
        additionDetail = generateKeyValue(preparedFinalObject, additionDetailsSewerage);
    }
    let activateDetail = {};
    if (connType === "Metered") {
        activateDetail = generateKeyValue(preparedFinalObject, activateDetailsMeter);
    } else {
        activateDetail = generateKeyValue(preparedFinalObject, activateDetailsNonMeter);
    }
    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let WaterConnection = get(preparedFinalObject, 'WaterConnection[0]', {});
    let isMode = (WaterConnection.applicationType !== null) ? WaterConnection.applicationType.split("_")[0] : "";
    let reviewModificationsEffective = [];
    let plumberDetail = [];
    let roadDetail = [];
    let roadDetailInfo = []
    if (isMode === "MODIFY") {
        reviewModificationsEffective = generateKeyValueForModify(preparedFinalObject, reviewModificationsEffectiveDate);
    } else {
        plumberDetail = generateKeyValue(preparedFinalObject, plumberDetails);
       // roadDetail = generateKeyValue(preparedFinalObject, roadDetails);
      
    }
    if (WaterConnection.tempRoadType && WaterConnection.tempRoadType.length > 0) {
        roadDetailInfo = getMultiItems(preparedFinalObject, roadDetails, 'WaterConnection[0].tempRoadType')
        roadDetail = getMultipleItemCard(roadDetailInfo, 'WS_ROADTYPE');
    }
   
    let connHolderDetail = {};
    if (WaterConnection.connectionHolders === null) {
        let sameAsOwnerArray = generateKeyValue(preparedFinalObject, connectionHolderSameAsOwnerDetails);
        connHolderDetail = sameAsOwnerArray.map(cur => {
            return ({
                key: cur.key,
                value: "yes"
            })
        })
    } else {
        connHolderDetail = generateKeyValue(preparedFinalObject, connectionHolderDetails);
    }

    let ownerDetail = []
    let ownerDetailInfo = []
    if (WaterConnection.property && WaterConnection.property.owners && WaterConnection.property.owners.length > 1) {
        ownerDetailInfo = getMultiItems(preparedFinalObject, propertyOwnerDetail, 'WaterConnection[0].property.owners')
        ownerDetail = getMultipleItemCard(ownerDetailInfo, 'WS_OWNER');
    } else {
        ownerDetail = generateKeyValue(preparedFinalObject, propertyOwnerDetail);
    }
    const documentsUploadRedux = get(preparedFinalObject, 'DocumentsData', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    const tenantId = getQueryArg(window.location.href, "tenantId");
    let estimate = get(preparedFinalObject, 'taxHeadEstimates', []);
    estimate = estimate && estimate.filter(est=>est.estimateAmount!=0);
    let formattedFees =estimate && estimate.map((taxHead) => {
      return {
        info: {
          labelKey: taxHead.taxHeadCode,
          labelName: taxHead.taxHeadCode,
        },
        name: {
          labelKey: taxHead.taxHeadCode,
          labelName: taxHead.taxHeadCode,
        },
        value: taxHead.estimateAmount,
      };
    });
    const estimateDetails = formattedFees && getEstimateCardDetails(formattedFees);
    let pdfData = {
        header: WaterConnection.applicationNo.includes("WS") ? "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER" : "PDF_STATIC_LABEL_SW_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER", tenantId: tenantId,
        applicationNoHeader: WaterConnection.applicationType !== null ? WaterConnection.applicationType.split("_").join(" ") : "",
        additionalHeader: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_APPLICATION_NO', additionalHeaderValue: WaterConnection.applicationNo,
        cards: [
            { items: estimateDetails, type: 'estimate',hide: estimate.length === 0 },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PROPERTY_DETAILS_HEADER", items: propertyDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOCATION_DETAILS_HEADER", items: locationDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_OWNER_DETAILS_HEADER", items: ownerDetail, type: ownerDetailInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_DETAILS_HEADER', items: connectionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_HOLDER_DETAILS_HEADER', items: connHolderDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_DOCUMENTS_DETAILS_HEADER', items: documentCard, hide: documentCard.length === 0 },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ADDITIONAL_CONNECTION_HEADER', items: additionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PLUMBER_DETAILS_HEADER', items: plumberDetail, hide: plumberDetail.length === 0 },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ROAD_CHARGES_HEADER', items: roadDetail, hide: roadDetail.length === 0,type: roadDetailInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ACTIVATION_DETAILS_HEADER', items: activateDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_MODIFY_EFFECTIVE_FROM_HEADER', items: reviewModificationsEffective, hide: reviewModificationsEffective.length === 0 },

        ]
 
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
    return true;
}