// import { tradeInstitutionDetails, tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
// import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";
import { getFromObject } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils";

import { generateKeyValue, generatePDF, getDocumentsCard, getEstimateCardDetails, getMultiItems, getMultipleItemCard } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import { billAmendDemandRevisionContainer } from "../../../../egov-billamend-dev/src/ui-config/screens/specs/bill-amend/search-preview";

export const generateBillAmendAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {
    // billAmendDemandRevisionContainer
    // tradeLocationDetails.reviewMohalla.localiseValue = true;
    // tradeLocationDetails.reviewCity.localiseValue = true;

    // tradetypeDetails.reviewTradeCategory.localiseValue = true;
    // tradetypeDetails.reviewTradeType.localiseValue = true;
    // tradetypeDetails.reviewTradeSubtype.localiseValue = true;

    // tradeAccessoriesDetails.reviewAccessoryType.localiseValue = true;

    // tradeReviewDetails.reviewApplicationType.localiseValue = true;
    // tradeReviewDetails.reviewLicenceType.localiseValue = true;
    // tradeReviewDetails.reviewStructureType.localiseValue = true;
    // tradeReviewDetails.reviewSubStructureType.localiseValue = true;

    // tradeOwnerDetails.reviewOwnerGender.localiseValue = true;
    // tradeOwnerDetails.reviewownershipType.localiseValue = true;
    // tradeOwnerDetails.reviewsubOwnership.localiseValue = true;
    // tradeOwnerDetails.reviewOwnerSpecialCat.localiseValue = true;
    // tradeOwnerDetails.reviewRelationship.localiseValue = true;
    
    // tradeInstitutionDetails.reviewRelationship.localiseValue = true;
    // tradeInstitutionDetails.reviewownershipType.localiseValue = true;
    // tradeInstitutionDetails.reviewsubOwnership.localiseValue = true;

    let UlbLogoForPdf = getFromObject(preparedFinalObject, 'UlbLogoForPdf', '');
    let Amendment = getFromObject(preparedFinalObject, 'Amendment', {});

    // let tradeTypeSummary = []
    // let tradeTypeSummaryInfo = []
    // if (getFromObject(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length === 1) {
    //     tradeTypeSummary = generateKeyValue(preparedFinalObject, tradetypeDetails); //
    // } else if (getFromObject(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length > 1) {
    //     tradeTypeSummaryInfo = getMultiItems(preparedFinalObject, tradetypeDetails, 'Licenses[0].tradeLicenseDetail.tradeUnits')
    //     tradeTypeSummary = getMultipleItemCard(tradeTypeSummaryInfo, "TL_TRADE_UNIT");
    // }

    // let tradeAccessoriesSummary = []
    // let tradeAccessoriesSummaryInfo = []
    // if (getFromObject(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length === 1) {
    //     tradeAccessoriesSummary = generateKeyValue(preparedFinalObject, tradeAccessoriesDetails); //
    // } else if (getFromObject(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length > 1) {
    //     tradeAccessoriesSummaryInfo = getMultiItems(preparedFinalObject, tradeAccessoriesDetails, 'Licenses[0].tradeLicenseDetail.accessories')
    //     tradeAccessoriesSummary = getMultipleItemCard(tradeAccessoriesSummaryInfo, "TL_TRADE_ACCESSORY");
    // }

    // let tradeOwnerSummary = []
    // let tradeOwnerSummaryInfo = []

    // const ownershipType = getFromObject(License, "tradeLicenseDetail.subOwnerShipCategory", "");
    // if (ownershipType.startsWith("INSTITUTION")) {
    //     tradeOwnerSummary = generateKeyValue(preparedFinalObject, tradeInstitutionDetails);
    // } else if (ownershipType.includes("SINGLEOWNER")) {
    //     tradeOwnerSummary = generateKeyValue(preparedFinalObject, tradeOwnerDetails);
    // } else {
    //     tradeOwnerSummaryInfo = getMultiItems(preparedFinalObject, tradeOwnerDetails, 'Licenses[0].tradeLicenseDetail.owners')
    //     tradeOwnerSummary = getMultipleItemCard(tradeOwnerSummaryInfo, 'TL_OWNER');
    // }
const demandDetails=getFromObject(preparedFinalObject, 'Amendment.demandDetails', []);
const estimateCardData=demandDetails.map(demand=>{
    return {
        name:{
            labelName: demand.taxHeadMasterCode,
            labelKey:demand.taxHeadMasterCode
        },
        value:demand.collectionAmount
    }
})
    const documentsUploadRedux = getFromObject(preparedFinalObject, 'bill-amend-review-document-data', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    const estimateDetails = getEstimateCardDetails(estimateCardData,undefined,false,false)
    // const tradeReviewSummary = generateKeyValue(preparedFinalObject, tradeReviewDetails);
    const billAmendDemandRevisionSummary = generateKeyValue(preparedFinalObject, billAmendDemandRevisionContainer);

    let pdfData = {
        header: "BILLAMEND_APPLICATION", tenantId: 'pb.amritsar',
        applicationNoHeader: 'BILLAMEND_CONSUMERNO', applicationNoValue: Amendment.consumerCode,
        additionalHeader: "BILLAMEND_APPLICATIONNO", additionalHeaderValue: Amendment.amendmentId,
        cards: [
            { items: estimateDetails, type: 'estimate' },
            // { header: "TL_COMMON_TR_DETAILS", items: [] },
            // // { header: '-1', items: tradeTypeSummary, type: tradeTypeSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            // // { header: '-1', items: tradeAccessoriesSummary, type: tradeAccessoriesSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            // // { header: '-1', items: tradeLocationSummary },
            { header: "BILL_DEMAND_REVISION_BASIS_DETAILS", items:billAmendDemandRevisionSummary},
            { header: 'BILL_DOCUMENTS', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}