import './index.css';

const formConfig = {
  name: "bussinessDetails",
  fields: {
    VasikaNo: {
      id: "vasikaNo",
      className:"bussinessDetails",
      jsonPath: "Properties[0].bussinessDetails[0].units[0].vasikaNo",
      type: "textfield",
      floatingLabelText: "Vasika No",
      hintText: "Vasika No",
      required: true,
      fullWidth: true,
      
    },
    datePicker: {
      id: "vasikaDate",
      className:"bussinessDetails",
      jsonPath: "Properties[0].bussinessDetails[0].units[0].vasikaDate",
      type: "date",
      floatingLabelText: "Vasika Date",
      hintText: "Vasika Date",
      required: true,
      fullWidth: true,
      
    },
    allotmentNo: {
      id: "allotmentNo",
      className:"bussinessDetails",
      jsonPath:"Properties[0].bussinessDetails[0].units[0].allotmentNo" ,
      type: "textfield",
      floatingLabelText: "Allotment No",
      hintText: "Allotment No",
      required: true,
      fullWidth: true,
      
    },
    allotmentDate: {
      id: "allotmentDate",
      className:"bussinessDetails",
      jsonPath: "Properties[0].bussinessDetails[0].units[0].allotmentDate",
      type: "date",
      floatingLabelText: "Allotment Date",
      hintText: "Allotment Date",
      required: true,
      fullWidth: true,
      
    },
    businessName: {
      id: "businessName",
      className:"bussinessDetails",
      jsonPath:"Properties[0].bussinessDetails[0].units[0].businessName" ,
      type: "textfield",
      floatingLabelText: "Bussiness Name",
      hintText: "Bussiness Name",
      required: true,
      fullWidth: true,
      
    },
    remrks: {
      id: "remarks",
      className:"bussinessDetails",
      jsonPath: "Properties[0].bussinessDetails[0].units[0].remrks",
      type: "textfield",
      floatingLabelText: "Remarks",
      hintText: "Remarks",
      required: true,
      fullWidth: true,
      
    },
  }
}

export default formConfig;
