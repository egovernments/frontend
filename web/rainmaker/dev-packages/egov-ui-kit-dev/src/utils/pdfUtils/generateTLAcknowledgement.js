import { tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";
import get from "lodash/get";
import { getAddressItems } from "../../common/propertyTax/Property/components/PropertyAddressInfo";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard, getEstimateCardDetails } from "./generatePDF";



export const generateTLAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {
    // registrationSummaryDetails.transferReason.localiseValue=true;

    // transferorSummaryDetails.ownerType.localiseValue=true;
    // transfereeSummaryDetails.ownerType.localiseValue=true;
    // transfereeInstitutionSummaryDetails.institutionType.localiseValue=true;
    // transferorInstitutionSummaryDetails.institutionType.localiseValue=true;

    // const mutationDetails = generateKeyValue(preparedFinalObject, mutationSummaryDetails);
    // const registrationDetails = generateKeyValue(preparedFinalObject, registrationSummaryDetails);

    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    // let property = get(preparedFinalObject, 'Property', {});

    // let transfereeOwners = get(
    //     property,
    //     "ownersTemp", []
    // );
    // let transferorOwners = get(
    //     property,
    //     "ownersInit", []
    // );
    // let transfereeOwnersDid = true;
    // let transferorOwnersDid = true;
    // transfereeOwners.map(owner => {
    //     if (owner.ownerType != 'NONE') {
    //         transfereeOwnersDid = false;
    //     }
    // })
    // transferorOwners.map(owner => {
    //     if (owner.ownerType != 'NONE') {
    //         transferorOwnersDid = false;
    //     }

    // })

    // if (transfereeOwnersDid) {
    //     delete transfereeSummaryDetails.ownerSpecialDocumentType
    //     delete transfereeSummaryDetails.ownerDocumentId
    // }
    // if (transferorOwnersDid) {
    //     delete transferorSummaryDetails.ownerSpecialDocumentType
    //     delete transferorSummaryDetails.ownerSpecialDocumentID
    // }
    // let transferorDetails = []
    // let transferorDetailsInfo = []
    // if (get(property, "ownershipCategoryInit", "").startsWith("INSTITUTION")) {
    //     transferorDetails = generateKeyValue(preparedFinalObject, transferorInstitutionSummaryDetails)
    // } else if (get(property, "ownershipCategoryInit", "").includes("SINGLEOWNER")) {
    //     transferorDetails = generateKeyValue(preparedFinalObject, transferorSummaryDetails)
    // } else {
    //     transferorDetailsInfo = getMultiItems(preparedFinalObject, transferorSummaryDetails, 'Property.ownersTemp[0]')
    //     transferorDetails = getMultipleItemCard(transferorDetailsInfo, 'PT_OWNER')
    // }
    // let transfereeDetails = []
    // let transfereeDetailsInfo = []
    // if (get(property, "ownershipCategoryTemp", "").startsWith("INSTITUTION")) {
    //     transfereeDetails = generateKeyValue(preparedFinalObject, transfereeInstitutionSummaryDetails)
    // } else if (get(property, "ownershipCategoryTemp", "").includes("SINGLEOWNER")) {
    //     transfereeDetails = generateKeyValue(preparedFinalObject, transfereeSummaryDetails)
    // } else {
    //     transfereeDetailsInfo = getMultiItems(preparedFinalObject, transfereeSummaryDetails, 'Property.ownersInit[0]')
    //     transfereeDetails = getMultipleItemCard(transferorDetailsInfo, 'PT_OWNER')
    // }
    let License = get(preparedFinalObject, 'Licenses[0]', {});

    const addressCard = getAddressItems(get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail', {}));

    const documentsUploadRedux = get(preparedFinalObject, 'LicensesTemp[0].reviewDocData', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);



const estimateDetails=getEstimateCardDetails(get(preparedFinalObject,'LicensesTemp[0].estimateCardData', []))




    const tradeReviewSummary = generateKeyValue(preparedFinalObject, tradeReviewDetails);
    let tradeTypeSummary = []
    let tradeTypeSummaryInfo = []

    if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length === 1) {
        tradeTypeSummary = generateKeyValue(preparedFinalObject, tradetypeDetails); //
    } else if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.tradeUnits', []).length > 1) {

        tradeTypeSummaryInfo = getMultiItems(preparedFinalObject, tradetypeDetails, 'Licenses[0].tradeLicenseDetail.tradeUnits')
        tradeTypeSummary = getMultipleItemCard(tradeTypeSummaryInfo, "TL_TRADE_UNIT");
    }
    let tradeAccessoriesSummary = []
    let tradeAccessoriesSummaryInfo = []

    if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length === 1) {
        tradeAccessoriesSummary = generateKeyValue(preparedFinalObject, tradeAccessoriesDetails); //
    } else if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.accessories', []).length > 1) {

        tradeAccessoriesSummaryInfo = getMultiItems(preparedFinalObject, tradeAccessoriesDetails, 'Licenses[0].tradeLicenseDetail.accessories')
        tradeAccessoriesSummary = getMultipleItemCard(tradeAccessoriesSummaryInfo,  "TL_TRADE_ACCESSORY");
    }
    let tradeOwnerSummary = []
    let tradeOwnerSummaryInfo = []

    if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.owners', []).length === 1) {
        tradeOwnerSummary = generateKeyValue(preparedFinalObject, tradeOwnerDetails);
    } else if (get(preparedFinalObject, 'Licenses[0].tradeLicenseDetail.owners', []).length > 1) {
        tradeOwnerSummaryInfo = getMultiItems(preparedFinalObject, tradeOwnerDetails, 'Licenses[0].tradeLicenseDetail.owners')
        tradeOwnerSummary = getMultipleItemCard(tradeOwnerSummaryInfo, 'TL_OWNER');
    }

    const tradeLocationSummary = generateKeyValue(preparedFinalObject, tradeLocationDetails);
    
    // tradeInstitutionDetails

    let pdfData = {
        header: "TL_TRADE_APPLICATION", tenantId: "pb.amritsar",
        applicationNoHeader: 'TL_PDF_LICENSE_NO', applicationNoValue: License.licenseNumber,
        additionalHeader: "TL_PDF_APPLICATION_NO", additionalHeaderValue: License.applicationNumber,
        cards: [
            {  items: estimateDetails,type:'estimate' },
            // { header: 'PT_MUTATION_TRANSFEROR_DETAILS', items: transferorDetails, type: transferorDetailsInfo.length > 1 ? 'multiItem' : 'singleItem' },

            { header: "TL_COMMON_TR_DETAILS", items: tradeReviewSummary },

            {header:'-1', items: tradeTypeSummary, type: tradeTypeSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            {header:'-1', items: tradeAccessoriesSummary, type: tradeAccessoriesSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            {header:'-1', items: tradeLocationSummary },

            { header: "TL_COMMON_OWN_DETAILS", items: tradeOwnerSummary, type: tradeOwnerSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },

            { header: 'TL_COMMON_DOCS', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}