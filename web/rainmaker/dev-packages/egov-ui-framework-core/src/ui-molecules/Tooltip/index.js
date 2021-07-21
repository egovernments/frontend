import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { getLocaleLabelsforTL } from "../../ui-config/screens/specs/utils";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";
import { transformById } from "../../ui-utils/commons";
import { LabelContainer } from "egov-ui-framework/ui-containers";

const localizationLabels = JSON.parse(getLocalization("localization_en_IN"));

function SimpleTooltips(props) {
  const { val, icon, ...rest } = props;
  return (
    <div style={{ display: "inline-flex" }} {...rest}>
      <Tooltip
       title={<h6 style={{ color: "white", width:"auto", fontSize:"16px" }}><LabelContainer labelName={val.value} labelKey={val.key} /></h6> }
      >
        <Icon
          style={{
            color: "rgba(0, 0, 0, 0.3799999952316284)",
            display: "inline"
          }}
        >
          <i class="material-icons">{icon}</i>
        </Icon>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SimpleTooltips;
