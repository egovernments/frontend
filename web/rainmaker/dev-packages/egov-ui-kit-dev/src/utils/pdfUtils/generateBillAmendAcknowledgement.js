// import { tradeInstitutionDetails, tradeOwnerDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-owner";
// import { tradeAccessoriesDetails, tradeLocationDetails, tradeReviewDetails, tradetypeDetails } from "egov-tradelicence/ui-config/screens/specs/tradelicence/applyResource/review-trade";
import { billAmendDemandRevisionContainer ,billAmendpropertyContainer} from "egov-billamend/ui-config/screens/specs/bill-amend/search-preview";
import { generateKeyValue, generatePDF, getDocumentsCard, getEstimateCardDetails } from "./generatePDF";
import { getFromObject } from "egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";

const getDate=(date)=>{

    let dateObj=new Date(date);
    return `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getYear()+1900}`;
    }

export const generateBillAmendAcknowledgement = (preparedFinalObject, fileName = "acknowledgement.pdf") => {


    billAmendDemandRevisionContainer.demandRevisionBasis.localiseValue = true;
    billAmendpropertyContainer.ward.localiseValue=true;
    billAmendpropertyContainer.location.localiseValue =true;
 
    let UlbLogoForPdf = getFromObject(preparedFinalObject, 'UlbLogoForPdf', '');
    let Amendment = getFromObject(preparedFinalObject, 'Amendment', {});
   let status1 = (Amendment.status === "INACTIVE" ? " " + "(" +'BILL_INACTIVE' + " )": " ");
    const modifiedDemand = { ...billAmendDemandRevisionContainer };
    const propertydetails = { ...billAmendpropertyContainer };
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
    const estdemandDetails = getFromObject(preparedFinalObject, 'AmendmentTemp[0].estimateCardData', []);
    console.log("estdemandDetails",estdemandDetails);
   //const estimateCardData =[];
    const demanddata = [{
        name: {
            labelName: 'BILL_TAX_HEADS',
            labelKey: 'BILL_TAX_HEADS'
        },
    }];
    const estimateCardData = [{
        name: {
            labelName: 'BILL_TAX_HEADS',
            labelKey: 'BILL_TAX_HEADS'
        }
       
    }]
    demandDetails.map(demand => {
        if( demand.taxAmount > 0){
            estimateCardData[0].value=getLocaleLabels('BILL_ADDITIONAL_AMOUNT_RS','BILL_ADDITIONAL_AMOUNT_RS');
          }else{
            estimateCardData[0].value=getLocaleLabels('BILL_REDUCED_AMOUNT_RS','BILL_REDUCED_AMOUNT_RS');
          }
        estimateCardData.push({
            name: {
                labelName: demand.taxHeadMasterCode,
                labelKey: demand.taxHeadMasterCode
            },
            value: Math.abs(demand.taxAmount),
           
        })

    })

    estdemandDetails.map(est => {
            demanddata[0].value=getLocaleLabels('BILL_CURRENT_DEMAND','BILL_CURRENT_DEMAND');
        demanddata.push({
            name: {
                labelName: est.taxHeadMasterCode,
                labelKey: est.taxHeadMasterCode
            },
            value: Math.abs(est.demand),
           
        })

    })

console.log("demanddata:",demanddata);
    const documentsUploadRedux = getFromObject(preparedFinalObject, 'bill-amend-review-document-data', []);
    const documentCard = getDocumentsCard(documentsUploadRedux);
    const estimateDetails = getEstimateCardDetails(estimateCardData, undefined,demanddata)
    console.log("estimateCardData",estimateCardData);
    console.log("demanddata",demanddata);
    const billAmendDemandRevisionSummary = generateKeyValue(preparedFinalObject, modifiedDemand);
    //const propertydetails = getFromObject(preparedFinalObject, 'Properties[0]', []);
    const propertyCard = generateKeyValue(preparedFinalObject,propertydetails)
    let pdfData = {
        header: "BILLAMEND_APPLICATION", tenantId: Amendment.tenantId,
        applicationNoHeader: 'BILLAMEND_APPLICATIONNO', applicationNoValue: Amendment.amendmentId, applicationStatusValue: status1,
        additionalHeader: "BILLAMEND_APPLICATIONDATE", additionalHeaderValue:getDate(Amendment.auditDetails.createdTime) ,
        cards: [
            { header: "BILL_ADJUSTMENT_AMOUNT_DETAILS", type: 'header' },
            { items: estimateDetails, type: 'estimate' },
            {header: 'BILL_PROPERTY_DETAILS', items: propertyCard },
            { header: "BILL_DEMAND_REVISION_BASIS_DETAILS", items: billAmendDemandRevisionSummary },
            { header: 'BILL_DOCUMENTS', items: documentCard },
            
        ]
    }

    generatePDF(UlbLogoForPdf, pdfData, fileName,true);
}