import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "../../ui-atoms/Icon";

const styles = theme => ({
  divContianer: {
    display: "flex"
  }
});

function SimpleTooltips(props) {
  const { classes, children,toolTipProps } = props;
  return (
    <div>
      <Tooltip {...toolTipProps}>
        <div className={(classes && classes.divContianer) ? classes.divContianer : ''}>
          {children}
          <Icon iconName="info"></Icon>
        </div>
      </Tooltip>
    </div>
  );
}

export default withStyles(styles)(SimpleTooltips);
