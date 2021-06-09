import React from "react";
import { Button } from "components";
import { ImageUpload } from "modules/common";
import { TextArea } from "modules/common";
import Axios from 'axios';

const ComplaintResolvedForm = ({ formKey, form, handleFieldChange, onSubmit }) => {
      var complaintId = (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)).replace(/%2F/gi, "/");
const updateStatus = async () => {
      await Axios.post(
      `http://devgrievanceapi.psegs.in/api/grievance/GetComplaintStatus_PMIDC`,
        {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'crossDomain': true
        },    
      Complaint_Id:complaintId, Remarks:"Resolved Succesffully", Status:"resolved"}
    ).then((response) => {
      console.log(response);
     }, (error) => {
      console.log(error);
     });
       };
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div>
      <div className="custom-padding-for-screens">
        <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
        <div style={{ padding: "24px 16px 0px 1px" }}>
          <TextArea onChange={(e, value) => handleFieldChange("textarea", value)} {...fields.textarea} />
        </div>
      </div>
      <div className="responsive-action-button-cont">
        <Button
          onClick={onSubmit, updateStatus}
          className="responsive-action-button"
          id={"complaint-resolved-mark-resolved"}
          {...submit}
          primary={true}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default ComplaintResolvedForm;
