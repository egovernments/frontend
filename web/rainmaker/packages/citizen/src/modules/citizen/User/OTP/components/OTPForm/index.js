import React from "react";
import { Button, TextField, Card, Image } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import "./index.css";

const OTP = ({ handleFieldChange, form, phoneNumber, resendOTP ,logoUrl}) => {
  const fields = form.fields || {};
  const submit = form.submit;

  return (
    <Card
      className="col-sm-offset-4 col-sm-4  user-screens-card"
      textChildren={
        <div>
          <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
            <div style={{ marginBottom: "24px" }}>
              <Image className="mseva-logo" source={`${logo}`} />
            </div >
          <div style={{marginLeft:"7px", marginBottom: "24px" }}>
          <Label bold={true}  fontSize= "23px" label="|" />
          </div>
           <div style={{marginLeft:"7px" }}>
              <Label bold={true} color="black" fontSize= "24px" label="STATE_LABEL" />
           </div>
          </div>
          <Label className="otp-heading text-center" bold={true} dark={true} fontSize={16} label="CORE_OTP_HEADING" />
          <div className="citizen-otp-sent-message">
            <Label label="CORE_OTP_SENT_MESSAGE" />
            <Label labelClassName="otp-mobile-number" containerStyle={{ paddingLeft: "5px" }} label={phoneNumber} />
          </div>
          <Label label="CORE_COMMON_CHECK_MESSAGE" color={"#b3b3b3"} fontSize={"12px"} />
          <TextField
            errorStyle={{ bottom: "0px" }}
            onChange={(e, value) => handleFieldChange("otp", value)}
            id="otp"
            {...fields.otp}
            fullWidth={true}
            type={"number"}
          />
          <div style={{ marginBottom: "24px" }} className="text-right">
            <Label id="otp-trigger" className="otp-prompt" label="CORE_OTP_NOT_RECEIVE" />
            <span style={{ cursor: "pointer" }} onClick={() => resendOTP()}>
              <Label id="otp-resend" className="otp-resend" label="CORE_OTP_RESEND" />
            </span>
          </div>
          <Button {...submit} primary={true} fullWidth={true} />
        </div>
      }
    />
  );
};

export default OTP;
