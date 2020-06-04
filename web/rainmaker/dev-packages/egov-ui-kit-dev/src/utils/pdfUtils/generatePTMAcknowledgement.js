import { mutationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/applyResourceMutation/mutationSummary";
import { transfereeInstitutionSummaryDetails, transfereeSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/searchPreviewResource/transfereeSummary";
import { transferorInstitutionSummaryDetails, transferorSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/searchPreviewResource/transferorSummary";
import { registrationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/summaryResource/registrationSummary";
import get from "lodash/get";
import { getAddressItems } from "../../common/propertyTax/Property/components/PropertyAddressInfo";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard } from "./generatePDF";

export const generatePTMAcknowledgement = (preparedFinalObject, fileName = "print") => {

    const mutationDetails = generateKeyValue(preparedFinalObject, mutationSummaryDetails);
    const registrationDetails = generateKeyValue(preparedFinalObject, registrationSummaryDetails);

    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let property = get(preparedFinalObject, 'Property', {});

    let transferorDetails = []
    let transferorDetailsInfo = []
    if (get(property, "ownershipCategoryInit", "").startsWith("INSTITUTION")) {
        transferorDetails = generateKeyValue(preparedFinalObject, transferorInstitutionSummaryDetails)
    } else if (get(property, "ownershipCategoryInit", "").includes("SINGLEOWNER")) {
        transferorDetails = generateKeyValue(preparedFinalObject, transferorSummaryDetails)
    } else {
        transferorDetailsInfo = getMultiItems(preparedFinalObject, transferorSummaryDetails, 'Property.ownersTemp[0]')
        transferorDetails = getMultipleItemCard(transferorDetailsInfo, 'PT_OWNER')
    }
    let transfereeDetails = []
    let transfereeDetailsInfo = []
    if (get(property, "ownershipCategoryTemp", "").startsWith("INSTITUTION")) {
        transfereeDetails = generateKeyValue(preparedFinalObject, transfereeInstitutionSummaryDetails)
    } else if (get(property, "ownershipCategoryTemp", "").includes("SINGLEOWNER")) {
        transfereeDetails = generateKeyValue(preparedFinalObject, transfereeSummaryDetails)
    } else {
        transfereeDetailsInfo = getMultiItems(preparedFinalObject, transfereeSummaryDetails, 'Property.ownersInit[0]')
        transfereeDetails = getMultipleItemCard(transferorDetailsInfo, 'PT_OWNER')
    }


    const addressCard = getAddressItems(get(preparedFinalObject, 'Property', {}));

    const documentsUploadRedux = get(preparedFinalObject, 'documentsUploadRedux', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);


    let pdfData = {
        header: "PTM_ACKNOWLEDGEMENT", tenantId: "pb.amritsar",
        applicationNoHeader: 'PT_PROPERRTYID', applicationNoValue: property.propertyId,
        additionalHeader: "PT_APPLICATION_NO", additionalHeaderValue: property.acknowldgementNumber,
        cards: [
            { header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard },
            { header: 'PT_MUTATION_TRANSFEROR_DETAILS', items: transferorDetails, type: transferorDetailsInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PT_MUTATION_TRANSFEREE_DETAILS', items: transfereeDetails, type: transfereeDetailsInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: "PT_MUTATION_DETAILS", items: mutationDetails, hide: !get(preparedFinalObject, 'PropertyConfiguration[0].Mutation.MutationDetails', false) },
            { header: "PT_MUTATION_REGISTRATION_DETAILS", items: registrationDetails },
            { header: 'PT_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}