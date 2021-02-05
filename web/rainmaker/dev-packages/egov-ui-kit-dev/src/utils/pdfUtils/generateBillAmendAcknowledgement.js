// import { tradeInstitutionDetails, tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
// import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";
import { billAmendDemandRevisionContainer } from "egov-billamend/ui-config/screens/specs/bill-amend/search-preview";
import { generateKeyValue, generatePDF, getDocumentsCard, getEstimateCardDetails } from "egov-ui-kit/utils/pdfUtils/generatePDF";
import { getFromObject } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils";


export const generateBillAmendAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {

    billAmendDemandRevisionContainer.demandRevisionBasis.localiseValue = true;
 
    let UlbLogoForPdf = getFromObject(preparedFinalObject, 'UlbLogoForPdf', '');
    let Amendment = getFromObject(preparedFinalObject, 'Amendment', {});

    const modifiedDemand = { ...billAmendDemandRevisionContainer };
    let demandRevisionBasis = getFromObject(Amendment, "amendmentReason", "");
    switch (demandRevisionBasis) {
        case "COURT_CASE_SETTLEMENT":
            delete modifiedDemand.govtNotificationNumber;
            delete modifiedDemand.fromDate
            delete modifiedDemand.toDate
            break;
        case "ARREAR_WRITE_OFF":
        case "ONE_TIME_SETTLEMENT":
            delete modifiedDemand.courtOrderNo
            delete modifiedDemand.dateEffectiveFrom
            delete modifiedDemand.documentNo
            break;
        case "DCB_CORRECTION":
        case "REMISSION_FOR_PROPERTY_TAX":
        case "OTHERS":
            delete modifiedDemand.courtOrderNo
            delete modifiedDemand.dateEffectiveFrom
            delete modifiedDemand.govtNotificationNumber
            break;
        default:
            delete modifiedDemand.courtOrderNo
            delete modifiedDemand.dateEffectiveFrom
            delete modifiedDemand.govtNotificationNumber
    }
    const demandDetails = getFromObject(preparedFinalObject, 'Amendment.demandDetails', []);
    const estimateCardData = [{
        name: {
            labelName: 'BILL_TAX_HEADS',
            labelKey: 'BILL_TAX_HEADS'
        },
        value: 'BILL_REDUCED_AMOUNT_RS'
    }]
    demandDetails.map(demand => {
        estimateCardData.push({
            name: {
                labelName: demand.taxHeadMasterCode,
                labelKey: demand.taxHeadMasterCode
            },
            value: demand.taxAmount == 0 ? '0' : Math.abs(demand.taxAmount)
        })
    })

    const documentsUploadRedux = getFromObject(preparedFinalObject, 'bill-amend-review-document-data', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    const estimateDetails = getEstimateCardDetails(estimateCardData, undefined, false, false)
    const billAmendDemandRevisionSummary = generateKeyValue(preparedFinalObject, modifiedDemand);

    let pdfData = {
        header: "BILLAMEND_APPLICATION", tenantId: 'pb.amritsar',
        applicationNoHeader: 'BILLAMEND_CONSUMERNO', applicationNoValue: Amendment.consumerCode,
        additionalHeader: "BILLAMEND_APPLICATIONNO", additionalHeaderValue: Amendment.amendmentId,
        cards: [
            { header: "BILL_ADJUSTMENT_AMOUNT_DETAILS", type: 'header' },
            { items: estimateDetails, type: 'estimate' },
            { header: "BILL_DEMAND_REVISION_BASIS_DETAILS", items: billAmendDemandRevisionSummary },
            { header: 'BILL_DOCUMENTS', items: documentCard }]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName);
}