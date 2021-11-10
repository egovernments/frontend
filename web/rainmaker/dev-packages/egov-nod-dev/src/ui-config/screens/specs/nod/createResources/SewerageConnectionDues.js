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
  import "./index.css";
  import { prepareFinalObject, handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

  
  
  export const resData =  () =>  {
    return( 
       getCommonContainer({
         
        ConsumerNo: getLabelWithValue({labelName: "Consumer No", label: "Consumer No"},{jsonPath:"sewrageResponse[0].ConsumerNo"}),
        OwnerName: getLabelWithValue({labelName: "Owner Details",label: "Owner Details"},{jsonPath:"sewrageResponse[0].OwnerName"}),
        ConnectionStatus: getLabelWithValue({labelName: "Connection Status",label: "Connection Status"},{jsonPath:"sewrageResponse[0].ConnectionStatus"}),
        Due: getLabelWithValue({labelName: "Due",label: "Due"},{jsonPath:"sewrageResponse[0].Due"}),
     })
     )
    }
 
  
  
  
  
  export const SewerageConnectionDues = getCommonCard({
 
    header: getCommonTitle(
      { labelName: "Sewerage Connection Dues", label: "Sewerage Connection Dues" },
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
        sourceJsonPath: "sewrageResponse",
        prefixSourceJsonPath:"children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
    
    
});
  


