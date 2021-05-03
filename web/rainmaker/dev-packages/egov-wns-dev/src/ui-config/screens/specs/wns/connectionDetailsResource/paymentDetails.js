import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel,
  getLabelWithValueForModifiedLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleNA } from '../../utils';



export const resData =  () =>  {
 return( 
    getCommonContainer({
      receiptNumber: getLabelWithValue({ label: "Receipt No." }, { jsonPath: "paymentHistory[0].receiptNumber", callBack: handleNA  })  ,
      receiptDate: getLabelWithValue({ label: "Receipt Date" }, { jsonPath: "paymentHistory[0].receiptDate", callBack: handleNA  })  ,
      totalAmountDue: getLabelWithValue({ label: "Total Paid" }, { jsonPath: "paymentHistory[0].totalAmountPaid", callBack: handleNA  }),
      totalDue: getLabelWithValue({ label: "Total Due" }, { jsonPath: "paymentHistory[0].totalDue", callBack: handleNA  })  ,
     // paymentMode: getLabelWithValue({ label: "Payment Mode" }, { jsonPath: "paymentHistory.Payments[0].paymentMode" })                
    })
  )
 }
 
 
export const getPaymentDetails = () => {
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
                labelKey: "WS_PAYMENT_HISTORY_HEADER"
              })
            }
          }
        },
      paymentHistory:{
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
    
        scheama: resData(),
        items: [],
        hasAddItem: false,
        isReviewPage: true,
        sourceJsonPath: "paymentHistory",
        prefixSourceJsonPath: "children",
        afterPrefixJsonPath: "children.value.children.key"
    
      },
      type: "array"
    } 
      });
};