import React from "react";
import { Button, Icon } from "components";
import { SuccessMessage } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const FeedbackAcknowledge = ({ history }) => {
  return (
    <div className="feedback-success-container">
      <div className="success-message-main-screen">
        <SuccessMessage successmessage="CS_FEEDBACK_SUCCESS" icon={<Icon action="navigation" name="check" />} backgroundColor={"#22b25f"} />
      </div>
      <div className="responsive-action-button-cont">
        <Button
          id="feedback-acknowledgement"
          onClick={() => history.push("pgr-home")}
          primary={true}
          label={<Label buttonLabel={true} label="CORE_COMMON_CONTINUE" />}
          fullWidth={true}
          className="responsive-action-button"
        />
      </div>
    </div>
  );
};

export default FeedbackAcknowledge;
