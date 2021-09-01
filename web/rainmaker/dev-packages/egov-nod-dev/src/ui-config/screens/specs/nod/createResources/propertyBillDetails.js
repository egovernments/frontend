import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonGrayCard,
  getLabelWithValue,
  getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";


  export const resData =  () =>  {
    return( 
       getCommonContainer({
        billPeriod: getLabelWithValue({labelName: "Bill Period",label: "Bill Period"}, {jsonPath:"propertyBillResponse[0].billPeriod"}),
        billNo: getLabelWithValue({labelName: "Bill No",label: "Bill No"},{jsonPath:"propertyBillResponse[0].billNumber"}),
        ReceiptNo: getLabelWithValue({labelName: "Receipt No.", label: "Receipt No."},{jsonPath:"propertyBillResponse[0].billNumber"}),
        amountPaid: getLabelWithValue({labelName: "Amount Paid",label: "Amount Paid"},{jsonPath:"propertyBillResponse[0].billNumber"})
     })
     )
    }



  export const propertyBillDetails = getCommonCard({
  subHeader: getCommonTitle({
    label: "Bill Details"
  },
  {
    style: {
      marginBottom: 8
    }
  }
  ),
  PropertyBills: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
     
      scheama: resData(),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "propertyBillResponse",
      prefixSourceJsonPath:"children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});
  


