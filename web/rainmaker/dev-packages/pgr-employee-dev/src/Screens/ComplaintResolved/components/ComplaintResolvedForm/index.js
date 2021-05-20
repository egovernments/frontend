import React from "react";
import { Button } from "components";
import { ImageUpload } from "modules/common";
import { TextArea } from "modules/common";

const ComplaintResolvedForm = ({ formKey, form, handleFieldChange, onSubmit }) => {
  function callDgrApi() {
    var complaintId = (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)).replace(/%2F/gi, "/");
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://devgrievanceapi.psegs.in/api/grievance/GetComplaintStatus_PMIDC',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Complaint_Id": complaintId, "Remarks": "Resolved Succesffully", "Status": "resolved" })
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }
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
          onClick={() => {
            onSubmit();
            callDgrApi();
          }}
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
