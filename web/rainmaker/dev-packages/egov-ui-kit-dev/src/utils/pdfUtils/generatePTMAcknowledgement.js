import { mutationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/applyResourceMutation/mutationSummary";
import { registrationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/summaryResource/registrationSummary";
import get from "lodash/get";
import { getOwnerInfo } from "../../common/propertyTax/Property/components/OwnerInfo";
import { getAddressItems } from "../../common/propertyTax/Property/components/PropertyAddressInfo";
import { generateKeyValue, generatePDF, getDocumentsCard, getOwnerCard } from "./generatePDF";

export const generatePTMAcknowledgement = (preparedFinalObject, generalMDMSDataById, fileName = "print") => {
    console.log(mutationSummaryDetails, registrationSummaryDetails, 'ms')

    const mutationDetails = generateKeyValue(preparedFinalObject, mutationSummaryDetails);
    const registrationDetails = generateKeyValue(preparedFinalObject, registrationSummaryDetails);


    console.log(mutationDetails, registrationDetails, 'md');



    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let property = get(preparedFinalObject, 'Property', {});
    property.subOwnershipCategory = property.ownershipCategory.split('.')[1]
    const addressCard = getAddressItems(get(preparedFinalObject, 'Property', {}));
    property.owners = property.owners.filter(owner => owner.status == "ACTIVE")


    const documentsUploadRedux = get(preparedFinalObject, 'documentsUploadRedux', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);

    const ownerInfo = getOwnerInfo(property, generalMDMSDataById);
    const ownerCard = getOwnerCard(ownerInfo);


    let pdfData = {
        header: "PTM_ACKNOWLEDGEMENT", tenantId: "pb.amritsar",
        applicationNoHeader: 'PT_PROPERRTYID', applicationNoValue: property.propertyId,
        additionalHeader: "PT_APPLICATION_NO", additionalHeaderValue: property.acknowldgementNumber,
        cards: [
            { header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard },
            { header: 'PT_MUTATION_TRANSFEROR_DETAILS', items: ownerCard, type: ownerInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PT_MUTATION_TRANSFEREE_DETAILS', items: ownerCard, type: ownerInfo.length > 1 ? 'multiItem' : 'singleItem' },
            { header: "PT_MUTATION_DETAILS", items: mutationDetails, hide: !get(preparedFinalObject, 'PropertyConfiguration[0].Mutation.MutationDetails', false) },
            { header: "PT_MUTATION_REGISTRATION_DETAILS", items: registrationDetails },
            { header: 'PT_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}