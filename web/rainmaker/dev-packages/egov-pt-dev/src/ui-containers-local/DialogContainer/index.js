
import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class DialogContainer extends React.Component {
  handleClose = () => {
    const { screenKey, handleField, setRoute, redirectUrl } = this.props;
    handleField(
      screenKey,
      `components.adhocDialog`,
      "props.open",
      false
    );
    if (redirectUrl) {
      setRoute(redirectUrl);
    }
  };

  render() {
    const { open, maxWidth, children } = this.props;
    const DialogContent = withStyles(theme => ({
      root: {
        paddingBottom: 0,
        position: "relative",
        top: 0
      }
    }))(MuiDialogContent);

    const DialogContainer = withStyles(theme => ({
      root: {
        zIndex: 13333
      }
    }))(Dialog);

    const CloseButton = withStyles(theme => ({
      root: {
        justifyContent: "flex-end",
        float: "right",
        paddingRight: 0,
        zIndex: 1333,
        right: 20,
        paddingTop: 0,
        position: "absolute",
        "&:hover": {
          backgroundColor: "#FFF"
        }
      }
    }))(IconButton);

    return (
      <DialogContainer open={open} maxWidth={maxWidth} onClose={this.handleClose}>
        <CloseButton aria-label="Close" >
          <CloseIcon onClick={this.handleClose} />
        </CloseButton>
        <DialogContent children={children} />
      </DialogContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig } = screenConfiguration;
  const open = get(
    screenConfig,
    `${screenKey}.components.adhocDialog.props.open`
  );

  return {
    open,
    screenKey,
    screenConfig
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)), setRoute: (route) => dispatch(setRoute(route)), };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
