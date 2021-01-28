import { tradeInstitutionDetails, tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";
import get from "lodash/get";
import { generateKeyValue, generatePDF, getDocumentsCard, getEstimateCardDetails, getMultiItems, getMultipleItemCard } from "./generatePDF";

export const generateTLAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {
//console.log("fileName---",fileName);
//console.log("tradeLocationDetails---",tradeLocationDetails);
//console.log("tradeReviewDetails---",tradeReviewDetails);
//console.log("preparedFinalObject---",preparedFinalObject);
    tradeLocationDetails.reviewMohalla.localiseValue = true;
    tradeLocationDetails.reviewCity.localiseValue = true;
    tradeLocationDetails.reviewPremisis.localiseValue = true;

    tradetypeDetails.reviewTradeCategory.localiseValue = true;
    tradetypeDetails.reviewTradeType.localiseValue = true;
    tradetypeDetails.reviewTradeSubtype.localiseValue = true;
    tradetypeDetails.reviewTradeUOM.localiseValue = true;
    tradeAccessoriesDetails.reviewAccessoryType.localiseValue = true;

    tradeReviewDetails.reviewApplicationType.localiseValue = true;
    tradeReviewDetails.reviewLicenceType.localiseValue = true;
    tradeReviewDetails.reviewStructureType.localiseValue = true;
    tradeReviewDetails.reviewSubStructureType.localiseValue = true;

    tradeOwnerDetails.reviewOwnerGender.localiseValue = true;
    tradeOwnerDetails.reviewownershipType.localiseValue = true;
    tradeOwnerDetails.reviewsubOwnership.localiseValue = true;
    tradeOwnerDetails.reviewOwnerSpecialCat.localiseValue = true;
    tradeOwnerDetails.reviewRelationship.localiseValue = true;
    
    tradeInstitutionDetails.reviewRelationship.localiseValue = true;
    tradeInstitutionDetails.reviewownershipType.localiseValue = true;
    tradeInstitutionDetails.reviewsubOwnership.localiseValue = true;

    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let License = get(preparedFinalObject, 'Licenses[0]', {});

    let tradeTypeSummary = []
    let tradeTypeSummaryInfo = []
    if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length === 1) {
        tradeTypeSummary = generateKeyValue(preparedFinalObject, tradetypeDetails); //
    } else if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length > 1) {
        tradeTypeSummaryInfo = getMultiItems(preparedFinalObject, tradetypeDetails, 'Licenses[0].tradeLicenseDetail.tradeUnits')
        tradeTypeSummary = getMultipleItemCard(tradeTypeSummaryInfo, "TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER");
    }

    let tradeAccessoriesSummary = []
    let tradeAccessoriesSummaryInfo = []
    //console.log("get accessories--",get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []));
    if(get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []))
    {
    if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length === 1) {
        tradeAccessoriesSummary = generateKeyValue(preparedFinalObject, tradeAccessoriesDetails); //
    } else if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length > 1) {
        tradeAccessoriesSummaryInfo = getMultiItems(preparedFinalObject, tradeAccessoriesDetails, 'Licenses[0].tradeLicenseDetail.accessories')
        tradeAccessoriesSummary = getMultipleItemCard(tradeAccessoriesSummaryInfo, "TL_TRADE_ACCESSORY");
    }
    }
    let tradeOwnerSummary = []
    let tradeOwnerSummaryInfo = []

    const ownershipType = get(License, "tradeLicenseDetail.subOwnerShipCategory", "");
    if (ownershipType.startsWith("INSTITUTION")) {
        tradeOwnerSummary = generateKeyValue(preparedFinalObject, tradeInstitutionDetails);
    } else if (ownershipType.includes("SINGLEOWNER")) {
        tradeOwnerSummary = generateKeyValue(preparedFinalObject, tradeOwnerDetails);
    } else {
        tradeOwnerSummaryInfo = getMultiItems(preparedFinalObject, tradeOwnerDetails, 'Licenses[0].tradeLicenseDetail.owners')
        tradeOwnerSummary = getMultipleItemCard(tradeOwnerSummaryInfo, 'TL_OWNER');
    }

    const documentsUploadRedux = get(preparedFinalObject, 'LicensesTemp[0].reviewDocData', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    const estimateDetails = getEstimateCardDetails(get(preparedFinalObject, 'LicensesTemp[0].estimateCardData', []))
    const tradeReviewSummary = generateKeyValue(preparedFinalObject, tradeReviewDetails);
    const tradeLocationSummary = generateKeyValue(preparedFinalObject, tradeLocationDetails);

    let pdfData = {
        header: "TL_TRADE_APPLICATION", tenantId: License.tradeLicenseDetail.address.tenantId,finYear:License.financialYear,
        applicationNoHeader: 'PDF_STATIC_LABEL_CONSOLIDATED_TLCERTIFICATE_LICENSE_NO', applicationNoValue: License.licenseNumber,
        additionalHeader: "PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_APPLICATION_NO", additionalHeaderValue: License.applicationNumber,
        cards: [
            { items: estimateDetails, type: 'estimate' },
            { header: "TL_COMMON_TR_DETAILS", items: tradeReviewSummary },
            { header: "TL_NEW_TRADE_DETAILS_TRADE_UNIT_DETAILS", items: tradeTypeSummary, type: tradeTypeSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'TL_NEW_TRADE_DETAILS_TRADE_LOCATION_DETAILS', items: tradeLocationSummary },
            { header: "TL_COMMON_OWN_DETAILS", items: tradeOwnerSummary, type: tradeOwnerSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'TL_COMMON_DOCS', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}