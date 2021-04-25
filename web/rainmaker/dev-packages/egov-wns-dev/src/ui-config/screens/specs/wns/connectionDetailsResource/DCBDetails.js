import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel,
  getLabelWithValueForModifiedLabel,
  
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getLabelOnlyValue,getLabelOnlyValueforColumnData, getLabelOnlyValueforColumn , getLabelOnlyValueForTableHeader1 ,getLabelOnlyValueForTableHeader2, getLabelOnlyValueForTableHeader3, handleAmount} from '../../utils';


export const Header =  () =>  {
  return( 
     getCommonContainer({
      installment: getLabelOnlyValueForTableHeader2({ labelKey: "Installments" })  ,
      demand: getLabelOnlyValueForTableHeader3({ labelKey: "Demand" })  ,
      collection: getLabelOnlyValueForTableHeader3({ labelKey: "Collection"})  ,
      balance: getLabelOnlyValueForTableHeader3({ labelKey: "Balance"})  ,
      advance: getLabelOnlyValueForTableHeader1({ labelKey: "Advance"})  ,
     })
   )
  }

  export const subHeader =  () =>  {
    return( 
       getCommonContainer({
        installment: getLabelOnlyValueForTableHeader2({ labelKey: "Installments" })  ,
        taxAmount: getLabelOnlyValueforColumn({ labelKey: "Tax"}),
        interestAmount: getLabelOnlyValueforColumn({ labelKey: "Interest" })  ,
        penaltyAmount: getLabelOnlyValueforColumn({ labelKey: "Penalty" })  ,
       
        taxCollected: getLabelOnlyValueforColumn({ labelKey: "Tax" })  ,
        interestCollected: getLabelOnlyValueforColumn({ labelKey: "Interest" })  ,
        penaltyCollected: getLabelOnlyValueforColumn({ labelKey: "Penalty" })  ,
       
        
        taxBalance: getLabelOnlyValueforColumn({ labelKey: "Tax" })  ,
        interestBalance: getLabelOnlyValueforColumn({ labelKey: "Interest" })  ,
        penaltyBalance: getLabelOnlyValueforColumn({ labelKey: "Penalty" })  ,
        advance: getLabelOnlyValueForTableHeader1({ labelKey: "Advance" })  ,
       })
     )
    }
export const resData =  () =>  {
  return( 
     getCommonContainer({
       
      installment: getLabelOnlyValueForTableHeader2({ jsonPath: "dcbDetails[0].installment" , callBack: handleAmount  })  ,
      taxAmount: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].taxAmount" , callBack: handleAmount })  ,
      interestAmount: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].interestAmount" , callBack: handleAmount })  ,
      penaltyAmount: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].penaltyAmount" , callBack: handleAmount })  ,
    
    
      taxCollected: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].taxCollected" , callBack: handleAmount })  ,
      interestCollected: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].interestCollected", callBack: handleAmount  })  ,
      penaltyCollected: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].penaltyCollected", callBack: handleAmount  })  ,
    
      taxBalance: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].taxBalance" , callBack: handleAmount })  ,
      interestBalance: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].interestBalance" , callBack: handleAmount })  ,
      penaltyBalance: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].penaltyBalance" , callBack: handleAmount })  ,
      amount: getLabelOnlyValueforColumnData({ jsonPath: "dcbDetails[0].amount" , callBack: handleAmount })  ,
     })
   )
  }



export const getDCBDetails = () => {
    return getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
          style: { marginBottom: "10px" }
        },
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              label: "DCB Details"
            })
          }
        }
      },
      dcbHeader:Header(),
      dcbsubHeader:subHeader(),
      dcbDetails:{
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
      
          scheama: resData(),
          items: [],
          hasAddItem: false,
          isReviewPage: true,
          sourceJsonPath: "dcbDetails",
          prefixSourceJsonPath: "children",
          afterPrefixJsonPath: "children.value.children.key"
      
        },
        type: "array"
      } 
    });
  };
