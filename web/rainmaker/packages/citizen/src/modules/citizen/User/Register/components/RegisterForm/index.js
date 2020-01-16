import React from "react";
import { Link } from "react-router-dom";
import Field from "egov-ui-kit/utils/field";
import { Button, Card, Image } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { CityPicker } from "modules/common";
import Hidden from "@material-ui/core/Hidden";
import { startSMSRecevier } from "egov-ui-kit/utils/commons";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import "./index.css";
const RegisterForm = ({ handleFieldChange, form,logoUrl }) => {
  const fields = form.fields || {};
  const submit = form.submit;
  return (
    <div className="rainmaker-displayInline">
    <Card
      className="cardwidth user-screens-card "
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
          <Label className="heading text-center" bold={true} dark={true} fontSize={16} label="CORE_REGISTER_HEADING" />
          <Field fieldKey="phone" field={fields.phone} handleFieldChange={handleFieldChange} />
          <Field fieldKey="name" field={fields.name} handleFieldChange={handleFieldChange} />
          <CityPicker onChange={handleFieldChange} fieldKey="city" field={fields.city} />
          <div style={{ marginBottom: "24px", position: "relative", zIndex: 10 }} className="text-right">
            <Label id="otp-trigger" className="otp-prompt" label="CORE_REGISTER_HAVE_ACCOUNT" />
            <Link to="/user/login">
              <div style={{ display: "inline-block" }}>
                <Label containerStyle={{ cursor: "pointer" }} id="otp-resend" className="otp-resend" label="CORE_COMMON_LOGIN" />
              </div>
            </Link>
          </div>
          <Button
            primary={true}
            fullWidth={true}
            {...submit}
            onClick={(e) => {
              startSMSRecevier();
            }}
          />
        </div>
      }
    />
    <Hidden smDown>
     <div className="vl">
       <div className ="circle">
       <Label  color="black" fontSize= "16px" label="OR"/>
       </div>
    </div>
    <div className="qrscan">
      <div className="qrImg">
       <Image className="qrlogo" source="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjp_P6X1IfnAhUjzzgGHU9AB1kQjRx6BAgBEAQ&url=https%3A%2F%2Fappadvice.com%2Fapp%2Fqr-code-qr-reader-scanner%2F1180506724&psig=AOvVaw3fHo2gA8TxuCpGZ86ywuWt&ust=1579248181278968" />
       </div>
       <div  className="qrtext">
       <Label  color="black" fontSize= "14px" label="Scan the QR Code to continue with Whatsapp"/>
       </div>
    </div>
    </Hidden>
    </div>
  );
};

export default RegisterForm;
