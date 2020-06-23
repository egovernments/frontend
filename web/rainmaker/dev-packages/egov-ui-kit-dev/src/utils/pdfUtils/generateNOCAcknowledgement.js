import { applicantSummaryDetails, institutionSummaryDetail } from "egov-noc/ui-config/screens/specs/fire-noc/summaryResource/applicantSummary";
import { nocSummaryDetail } from "egov-noc/ui-config/screens/specs/fire-noc/summaryResource/nocSummary";
import { propertyLocationSummaryDetail, propertySummaryDetails } from "egov-noc/ui-config/screens/specs/fire-noc/summaryResource/propertySummary";
import get from "lodash/get";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard } from "./generatePDF";



export const generateNOCAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {

    propertyLocationSummaryDetail.city.localiseValue = true;
    propertyLocationSummaryDetail.applicableFireStation.localiseValue = true;
    propertyLocationSummaryDetail.mohalla.localiseValue = true;

    propertySummaryDetails.buildingUsageType.localiseValue = true;
    propertySummaryDetails.buildingUsageSubType.localiseValue = true;

    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let FireNOC = get(preparedFinalObject, 'FireNOCs[0]', {});

    const documentsUploadRedux = get(preparedFinalObject, 'FireNOCs[0].fireNOCDetails.additionalDetail.documents', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);

    const nocSummary = generateKeyValue(preparedFinalObject, nocSummaryDetail);
    const propertySummary = generateKeyValue(preparedFinalObject, propertySummaryDetails);
    const propertyLocationSummary = generateKeyValue(preparedFinalObject, propertyLocationSummaryDetail);

    let applicantSummary = []
    let applicantSummaryInfo = []
    const ownershipType = get(FireNOC, "fireNOCDetails.applicantDetails.ownerShipType", "");
    if (ownershipType.startsWith("INSTITUTION")) {
        applicantSummary = generateKeyValue(preparedFinalObject, institutionSummaryDetail)
    } else if (ownershipType.includes("SINGLEOWNER")) {
        applicantSummary = generateKeyValue(preparedFinalObject, applicantSummaryDetails)
    } else {
        applicantSummaryInfo = getMultiItems(preparedFinalObject, applicantSummaryDetails, 'FireNOCs[0].fireNOCDetails.applicantDetails.owners')
        applicantSummary = getMultipleItemCard(applicantSummaryInfo, 'NOC_OWNER')
    }

    let pdfData = {
        header: "NOC_APPLICATION", tenantId: FireNOC.tenantId,
        applicationNoHeader: 'NOC_PDF_APPLICATION_NO', applicationNoValue: FireNOC.fireNOCDetails.applicationNumber,
        additionalHeader: "NOC_PDF_APPLICATION_DATE", additionalHeaderValue: FireNOC.fireNOCDetails.applicationDate,
        cards: [
            { header: "NOC_NOC_DETAILS_HEADER", items: nocSummary },
            { header: "NOC_COMMON_PROPERTY_DETAILS", items: propertySummary },
            { header: "NOC_COMMON_PROPERTY_LOCATION_SUMMARY", items: propertyLocationSummary },
            { header: ownershipType.startsWith("INSTITUTION") ? 'NOC_INSTITUTION_DETAILS_HEADER' : "NOC_APPLICANT_DETAILS_HEADER", items: applicantSummary, type: applicantSummaryInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'NOC_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
    }
    generatePDF(UlbLogoForPdf, pdfData, fileName);
}