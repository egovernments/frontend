import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

class DialogContainer extends React.Component {
  handleClose = () => {
    const { screenKey } = this.props;
    this.props.handleField(
      screenKey,
      `components.adhocDialog`,
      "props.open",
      false
    );
    if(getQueryArg(window.location.href, "action")==='apply'?true:false){
      this.props.setRoute(window.location.pathname);
    };
  };

  render() {
    const { open, maxWidth, children } = this.props;
   const DialogContent = withStyles(theme => ({
      root: {
        paddingBottom: 0
      }
    }))(MuiDialogContent);

    const DialogContainer = withStyles(theme => ({
      root: {
        zIndex: 13333    
        }
    }))(Dialog);
    
    return (
      <DialogContainer open={open} maxWidth={maxWidth} onClose={this.handleClose}>
        <DialogContent children={children} />
      </DialogContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig } = screenConfiguration;
  let open = get(
    screenConfig,
    `${screenKey}.components.adhocDialog.props.open`
  );
  open=open||getQueryArg(window.location.href, "action")==='apply'?true:false;

  return {
    open,
    screenKey,
    screenConfig
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)),
    setRoute:(url)=>dispatch(setRoute(url))
  
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
