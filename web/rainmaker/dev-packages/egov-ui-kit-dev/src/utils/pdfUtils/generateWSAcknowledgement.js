import { propertyDetails,locationDetails,propertyOwnerDetail,connectionHolderDetails} from "egov-wns/ui-config/screens/specs/wns/applyResource/review-trade";
import {connectionDetails} from "egov-wns/ui-config/screens/specs/wns/applyResource/task-connectiondetails";
import {plumberDetails, roadDetails, activateDetails, additionDetails} from "egov-wns/ui-config/screens/specs/wns/applyResource/review-owner";
import get from "lodash/get";
import { generateKeyValue, generatePDF, getDocumentsCard, getMultiItems, getMultipleItemCard } from "./generatePDF";

export const generateWSAcknowledgement = (preparedFinalObject, fileName = "print") => {
    propertyDetails.reviewPropertyType.localiseValue=true;
    propertyDetails.reviewPropertyUsageType.localiseValue=true;
    propertyDetails.reviewPropertySubUsageType.localiseValue=true;
    propertyOwnerDetail.gender.localiseValue=true;
    const propertyDetail = generateKeyValue(preparedFinalObject, propertyDetails);
    const locationDetail = generateKeyValue(preparedFinalObject, locationDetails);
    const connectionDetail = generateKeyValue(preparedFinalObject, connectionDetails);
    const connHolderDetail = generateKeyValue(preparedFinalObject, connectionHolderDetails);
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
        ownerDetail = getMultipleItemCard(ownerDetailInfo, 'WS_OWNER');
    } else {
         ownerDetail = generateKeyValue(preparedFinalObject, propertyOwnerDetail);
    }
    const documentsUploadRedux = get(preparedFinalObject, 'DocumentsData', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    

    let pdfData = {
        header: WaterConnection.applicationNo.includes("WS")?"PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER":"PDF_STATIC_LABEL_SW_CONSOLIDATED_ACKNOWELDGMENT_LOGO_SUB_HEADER", tenantId: "pb.amritsar",
        applicationNoHeader:WaterConnection.applicationNo.includes("WS")?'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_WATER_APPLICATION':'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_SEWERAGE_APPLICATION',
        additionalHeader: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_APPLICATION_NO', additionalHeaderValue: WaterConnection.applicationNo,
        cards: [
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PROPERTY_DETAILS_HEADER", items: propertyDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_LOCATION_DETAILS_HEADER", items: locationDetail },
            { header: "PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_OWNER_DETAILS_HEADER", items: ownerDetail, type: ownerDetailInfo.length > 1 ? 'multiItem' : 'singleItem'  },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_DETAILS_HEADER', items: connectionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_CONNECTION_HOLDER_DETAILS_HEADER', items: connHolderDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_DOCUMENTS_DETAILS_HEADER', items: documentCard },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ADDITIONAL_CONNECTION_HEADER', items: additionDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_PLUMBER_DETAILS_HEADER', items: plumberDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ROAD_CHARGES_HEADER', items: roadDetail },
            { header: 'PDF_STATIC_LABEL_WS_CONSOLIDATED_ACKNOWELDGMENT_ACTIVATION_DETAILS_HEADER', items: activateDetail }  
            ]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
    return true;
}