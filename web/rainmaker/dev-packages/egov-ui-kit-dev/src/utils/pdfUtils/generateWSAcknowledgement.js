import { propertyDetails,locationDetails,propertyOwnerDetail} from "egov-wns/ui-config/screens/specs/wns/applyResource/review-trade";
import {connectionDetails} from "egov-wns/ui-config/screens/specs/wns/applyResource/task-connectiondetails";
import {plumberDetails, roadDetails, activateDetails, additionDetails} from "egov-wns/ui-config/screens/specs/wns/applyResource/review-owner";
import get from "lodash/get";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard } from "./generatePDF";

export const generateWSAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {
    const propertyDetail = generateKeyValue(preparedFinalObject, propertyDetails);
    const locationDetail = generateKeyValue(preparedFinalObject, locationDetails);
    // const ownerDetail = generateKeyValue(preparedFinalObject, propertyOwnerDetail);
    const connectionDetail = generateKeyValue(preparedFinalObject, connectionDetails);

    const additionDetail = generateKeyValue(preparedFinalObject, additionDetails);
    const plumberDetail = generateKeyValue(preparedFinalObject, plumberDetails);
    const roadDetail = generateKeyValue(preparedFinalObject, roadDetails);
    const activateDetail = generateKeyValue(preparedFinalObject, activateDetails);

    let UlbLogoForPdf = get(preparedFinalObject, 'UlbLogoForPdf', '');
    let WaterConnection = get(preparedFinalObject, 'WaterConnection[0]', {});


    let ownerDetail = []
    let ownerDetailInfo = []
     if (WaterConnection.property.owners.length>1) {
        ownerDetailInfo = getMultiItems(preparedFinalObject, propertyOwnerDetail, 'WaterConnection[0].property.owners')
        console.log("===ownerDetailInfo",ownerDetailInfo)
        // ownerDetail = getMultipleItemCard(ownerDetailInfo, 'PT_OWNER')
    } else {
         ownerDetail = generateKeyValue(preparedFinalObject, propertyOwnerDetail);
    }
    console.log("===ownerDetail",ownerDetail);
    const documentsUploadRedux = get(preparedFinalObject, 'DocumentsData', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    

    let pdfData = {
        header: WaterConnection.applicationNo.includes("WS")?"PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER":"PDF_STATIC_LABEL_SW_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER", tenantId: "pb.amritsar",
        applicationNoHeader:WaterConnection.applicationNo.includes("WS")?'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_WATER_APPLICATION':'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_SEWERAGE_APPLICATION',
        additionalHeader: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_APPLICATION_NO', additionalHeaderValue: WaterConnection.applicationNo,
        cards: [
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PROPERTY_DETAILS_HEADER", items: propertyDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOCATION_DETAILS_HEADER", items: locationDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_OWNER_DETAILS_HEADER", items: ownerDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_DETAILS_HEADER', items: connectionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_DOCUMENTS_DETAILS_HEADER', items: documentCard },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ADDITIONAL_CONNECTION_HEADER', items: additionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PLUMBER_DETAILS_HEADER', items: plumberDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ROAD_CHARGES_HEADER', items: roadDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ACTIVATION_DETAILS_HEADER', items: activateDetail },
            
        //     {  header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_OWNER_DETAILS_HEADER", items: ownerDetail, type: ownerDetail.length > 1 ? 'multiItem' : 'singleItem' },
  
            ]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}