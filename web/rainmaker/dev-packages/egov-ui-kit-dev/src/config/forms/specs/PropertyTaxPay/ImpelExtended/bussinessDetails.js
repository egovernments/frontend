const formConfig = {
  name: "bussinessDetails",
  fields: {
    VasikaNo: {
      id: "vasikaNo",
      jsonPath: "Properties[0].propertyDetails[0].vasikaNo",
      type: "textfield",
      floatingLabelText: "Vasika No",
      hintText: "Vasika No",
      required: true,
      fullWidth: true,
      
    },
    datePicker: {
      id: "vasikaDate",
      jsonPath: "Properties[0].propertyDetails[0].vasikaDate",
      type: "date",
      floatingLabelText: "Vasika Date",
      hintText: "Vasika Date",
      required: true,
      fullWidth: true,
      
    },
    allotmentNo: {
      id: "allotmentNo",
      jsonPath:"Properties[0].propertyDetails[0].allotmentNo" ,
      type: "textfield",
      floatingLabelText: "Allotment No",
      hintText: "Allotment No",
      required: true,
      fullWidth: true,
      
    },
    allotmentDate: {
      id: "allotmentDate",
      jsonPath: "Properties[0].propertyDetails[0].allotmentDate",
      type: "date",
      floatingLabelText: "Allotment Date",
      hintText: "Allotment Date",
      required: true,
      fullWidth: true,
      
    },
    businessName: {
      id: "businessName",
      jsonPath:"Properties[0].propertyDetails[0].businessName" ,
      type: "textfield",
      floatingLabelText: "Bussiness Name",
      hintText: "Bussiness Name",
      required: true,
      fullWidth: true,
      
    },
    remrks: {
      id: "remarks",
      jsonPath: "Properties[0].propertyDetails[0].remrks",
      type: "textfield",
      floatingLabelText: "Remarks",
      hintText: "Remarks",
      required: true,
      fullWidth: true,
      
    },
  }
}

export default formConfig;
