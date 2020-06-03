import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { getAssessmentInfo, getUnitInfo } from "../../common/propertyTax/Property/components/AssessmentInfo";
import { getOwnerInfo } from "../../common/propertyTax/Property/components/OwnerInfo";
import { getAddressItems } from "../../common/propertyTax/Property/components/PropertyAddressInfo";
import { generatePDF, generateKeyValue } from "./generatePDF";
import get from "lodash/get";
import { mutationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/applyResourceMutation/mutationSummary";
import { registrationSummaryDetails } from "egov-pt/ui-config/screens/specs/pt-mutation/summaryResource/registrationSummary";

export const generatePTMAcknowledgement = (preparedFinalObject, generalMDMSDataById,  fileName = "print") => {
    console.log(mutationSummaryDetails,registrationSummaryDetails,'ms')
  
    const mutationDetails=generateKeyValue(preparedFinalObject,mutationSummaryDetails);
    const registrationDetails=generateKeyValue(preparedFinalObject,registrationSummaryDetails);
  
  
  console.log(mutationDetails,registrationDetails,'md');
  
  
  
    let UlbLogoForPdf=get(preparedFinalObject,'UlbLogoForPdf','');
    let property=get(preparedFinalObject,'Property',{});
    property.subOwnershipCategory =property.ownershipCategory.split('.')[1]
    const addressCard = getAddressItems(get(preparedFinalObject,'Property',{}));
    property.owners = property.owners.filter(owner => owner.status == "ACTIVE")
    const ownerCard = getOwnerInfo(property, generalMDMSDataById);
    // const assessmentCard = getAssessmentInfo(get(property,'propertyDetails[0]',{}), generalMDMSDataById);
    // const unitCard = getUnitInfo(get(property,"propertyDetails[0].units",[]), property);
    let ownerInfoCard = ownerCard[0].items.filter(item => item);
    const documentsUploadRedux=get(preparedFinalObject,'documentsUploadRedux',[]);
    const documentCard = documentsUploadRedux.map(item => {
        return { key: getLocaleLabels(item.title, item.title), value: item.name }
    })
    if (ownerCard.length > 1) {
        let items = [];
        ownerCard.map((owner, index) => {
            items.push({ header: getLocaleLabels(`PT_OWNER_${index}`, `PT_OWNER_${index}`), items: owner.items.filter(item => item) })
        })
        ownerInfoCard = items
    }
    

    let pdfData = {
        header: "PTM_ACKNOWLEDGEMENT", tenantId: "pb.amritsar", applicationNoHeader:
            'PT_PROPERRTYID', additionalHeader: "PT_APPLICATION_NO", applicationNoValue: property.propertyId, additionalHeaderValue: property.acknowldgementNumber, cards:
            [{ header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard },
            { header: 'PT_MUTATION_TRANSFEROR_DETAILS', items: ownerInfoCard, type: ownerCard.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PT_MUTATION_TRANSFEREE_DETAILS', items: ownerInfoCard, type: ownerCard.length > 1 ? 'multiItem' : 'singleItem' },
            { header: "PT_MUTATION_DETAILS", items: mutationDetails },
            { header: "PT_MUTATION_REGISTRATION_DETAILS", items: registrationDetails },
            { header: 'PT_SUMMARY_DOCUMENTS_HEADER', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}