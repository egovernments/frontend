import './index.css';

const formConfig = {
  name: "bussinessDetails",
  fields: {
    VasikaNo: {
      id: "vasikaNo",
      className:"bussinessDetails",
      jsonPath: "Properties[0].propertyDetails[0].vasikaNo",
      type: "textfield",
      floatingLabelText: "PT_COMMON_VASIKA_NO",
      hintText: "Vasika No",
      required: true,
      fullWidth: true,
      
    },
    vasikaDate: {
      id: "vasikaDate",
      className:"bussinessDetails",
      jsonPath: "Properties[0].propertyDetails[0].vasikaDate",
      type: "date",
      floatingLabelText: "PT_COMMON_VASIKA_DATE",
      hintText: "Vasika Date",
      required: true,
      fullWidth: true,
    },
    allotmentNo: {
      id: "allotmentNo",
      className:"bussinessDetails",
      jsonPath:"Properties[0].propertyDetails[0].allotmentNo" ,
      type: "textfield",
      floatingLabelText: "PT_COMMON_ALLOTMENT_NO",
      hintText: "Allotment No",
      required: true,
      fullWidth: true,
      
    },
    allotmentDate: {
      id: "allotmentDate",
      className:"bussinessDetails",
      jsonPath: "Properties[0].propertyDetails[0].allotmentDate",
      type: "date",
      floatingLabelText: "PT_COMMON_ALLOTMENT_DATE",
      hintText: "Allotment Date",
      required: true,
      fullWidth: true,
      
    },
    businessName: {
      id: "businessName",
      className:"bussinessDetails",
      jsonPath:"Properties[0].propertyDetails[0].businessName" ,
      type: "textfield",
      floatingLabelText: "PT_COMMON_BUSSINESS_NAME",
      hintText: "Bussiness Name",
      required: true,
      fullWidth: true,
      
    },
    remrks: {
      id: "remarks",
      className:"bussinessDetails",
      jsonPath: "Properties[0].propertyDetails[0].remrks",
      type: "textfield",
      floatingLabelText: "PT_COMMON_REMARKS",
      hintText: "Remarks",
      required: true,
      fullWidth: true,
      
    },
  }
}

export default formConfig;
