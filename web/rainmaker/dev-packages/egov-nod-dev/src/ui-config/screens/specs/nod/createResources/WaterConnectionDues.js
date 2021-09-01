import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getSelectField,
    getCommonContainer,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { httpRequest } from "../../../../../ui-utils";
  //import {generateBillApiCall ,searchBillApiCall} from "../generateBillResource/functions"
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

  
  
  export const resData =  () =>  {
    return( 
       getCommonContainer({
         
        ConsumerNo: getLabelWithValue({labelName: "Consumer No", label: "Consumer No"},{jsonPath:"waterResponse[0].ConsumerNo_w"}),
        OwnerName: getLabelWithValue({labelName: "Owner Details",label: "Owner Details"},{jsonPath:"waterResponse[0].OwnerName_w"}),
        ConnectionStatus: getLabelWithValue({labelName: "Connection Status",label: "Connection Status"},{jsonPath:"waterResponse[0].ConnectionStatus_w"}),
        Due: getLabelWithValue({labelName: "Due",label: "Due"},{jsonPath:"waterResponse[0].Due_w"}),
     })
     )
    }
 
  
  
  
  
  export const WaterConnectionDues = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Water Connection Dues", label: "Water Connection Dues" },
      { style: { marginBottom: 18 } }
    ),
    PropertyBills: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
       
        scheama: resData(),
        items: [],
        hasAddItem: false,
        isReviewPage: true,
        sourceJsonPath: "waterResponse",
        prefixSourceJsonPath:"children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
    
    
});
  


