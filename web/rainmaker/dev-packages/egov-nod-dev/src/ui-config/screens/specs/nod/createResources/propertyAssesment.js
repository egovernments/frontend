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
  
 
 
  export const resData =  () =>  {
    return( 
       getCommonContainer({
         
        applicantName: getLabelWithValue({labelName: "Assessment Date", label: "Assessment Date"},{jsonPath:"propertyAssesmentResponse[0].assessmentDate"}),
        mobileNo: getLabelWithValue({labelName: "Assessment No.",label: "Assessment No."},{jsonPath:"propertyAssesmentResponse[0].assessmentNumber"}),
        applicantEmail: getLabelWithValue({labelName: "Assessment Year",label: "Assessment Year"},{jsonPath:"propertyAssesmentResponse[0].financialYear"}),
     })
     )
    }
 
 
 
 
 
 
  export const propertyAssesment = getCommonCard({
    subHeader: getCommonTitle({  label: "Assesment Details" },
    {style: { marginBottom: 8 } }),
  
    PropertyBills: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
       
        scheama: resData(),
        items: [],
        hasAddItem: false,
        isReviewPage: true,
        sourceJsonPath: "propertyAssesmentResponse",
        prefixSourceJsonPath:"children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
    
  
  


