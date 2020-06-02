import { getAssessmentInfo, getUnitInfo } from "../../common/propertyTax/Property/components/AssessmentInfo";
import { getOwnerInfo } from "../../common/propertyTax/Property/components/OwnerInfo";
import { getAddressItems } from "../../common/propertyTax/Property/components/PropertyAddressInfo";
import { generatePDF } from "./generatePDF";

export const generatePTAcknowledgment = (propertyDetails, generalMDMSDataById, UlbLogoForPdf) => {

    // ('dummy', [{ key: "sasa", value: "sasas" }, { key: "sasa", value: "sasas" }, { key: "sasa", value: "sasas" }, { key: "sasa", value: "sasas" }]))

    console.log(propertyDetails, generalMDMSDataById, UlbLogoForPdf, 'pdf data')
    const addressCard = getAddressItems(propertyDetails);
    const ownerCard = getOwnerInfo(propertyDetails, generalMDMSDataById);
    const assessmentCard = getAssessmentInfo(propertyDetails, generalMDMSDataById);
    const unitCard = getUnitInfo(propertyDetails['units'], propertyDetails);
    let ownerInfoCard = ownerCard[0].items.filter(item => item);
    const documentCard = propertyDetails.documentsUploaded.map(item => {
        return { key: item.title, value: item.name }
    })
    if (ownerCard.length > 1) {
        let items = [];

        ownerCard.map((owner, index) => {
            items.push({ header: `PT_OWNER_${index}`, items: owner.items.filter(item => item) })
        })
        ownerInfoCard = items
    }
    let unitInfoCard = []
    if (unitCard.length >= 1) {
        let unitItems = [];

        unitCard.map((unit, index) => {
            let unitItem = { items: unit[0] }
            if (propertyDetails.propertySubType !== "SHAREDPROPERTY") {
                unitItem.header = `PT_FLOOR_${index}`;
            }
            unitItems.push(unitItem)
        })
        unitInfoCard = unitItems
    }
    // const unitInfoCard={multiItem:true,color:white};
    console.log(unitCard, ownerCard, 'asasa');

    let pdfData = {
        header: "PT_ACKNOWLEDGEMENT", tenantId: "pb.amritsar", applicationNoHeader:
            'PT_PROPERRTYID', additionalHeader: "PT_APPLICATION_NO", applicationNoValue:
            'PB-PT-2019-11-21-003114 ', additionalHeaderValue: "PB-AC-2019-11-21-003114", cards:
            [{ header: "PT_PROPERTY_ADDRESS_SUB_HEADER", items: addressCard },
            { header: "PT_ASSESMENT_INFO_SUB_HEADER", items: assessmentCard },
            { items: unitInfoCard, type: "multiItem" },
            { header: 'PT_OWNERSHIP_INFO_SUB_HEADER', items: ownerInfoCard, type: ownerCard.length > 1 ? 'multiItem' : 'singleItem' },
            { header: 'PT_COMMON_DOCS', items: documentCard }]
    }
    generatePDF(UlbLogoForPdf, pdfData);
}