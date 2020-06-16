import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog} from "@material-ui/core";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

class DialogContainer extends React.Component {
  handleClose = () => {
    const { screenKey } = this.props;
    this.props.handleField(
      screenKey,
      `components.adhocDialog`,
      "props.open",
      false
    );
  };

  render() {
    const { open, maxWidth, children, isClose} = this.props;
   const DialogContent = withStyles(theme => ({
      root: {
        paddingBottom: 0,
        position: "relative",
        top: 10
      }
    }))(MuiDialogContent);

    const DialogContainer = withStyles(theme => ({
      root: {
        zIndex: 13333,
        }
        
    }))(Dialog);

    const CloseButton=withStyles(theme=>({
      root:{
        justifyContent: "flex-end",
        float: "right",
        paddingRight: 20,
        zIndex: 1333,
        right: 20,  
        paddingTop:10,
        position: "absolute",
        "&:hover": {
          backgroundColor: "#FFF"
        }
      }
    }))(IconButton);
    
    return (
      <DialogContainer open={open} maxWidth={maxWidth} onClose={this.handleClose} >
        {
          <CloseButton aria-label="Close" >
            <CloseIcon onClick={this.handleClose}/>
          </CloseButton>
        }
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
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
