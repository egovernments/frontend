import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import { Dialog, DialogContent } from "@material-ui/core";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

class DialogContainer extends React.Component {
  handleClose = () => {
    const { screenKey ,json} = this.props;
    this.props.handleField(
      screenKey,
      `${screenKey}.components.${json}AdhocDialog`,
      "props.open",
      false
    );
  };

  render() {
    const { open, maxWidth, children ,json} = this.props;
const child=this.props[json];
console.log(child);


children.props.components.popup={...child}
    return (
      <Dialog open={open} maxWidth={maxWidth} onClose={this.handleClose}>
        <DialogContent children={children} />
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const { screenKey } = ownProps;
  const { screenConfig } = screenConfiguration;
  let json = get(
    state.screenConfiguration.preparedFinalObject,
    'employeeStatus',
    'deactivate',
  );
  const open = get(
    screenConfig,
    `${screenKey}.components.${json}AdhocDialog.props.open`
  );


  return {
    open,
    screenKey,
    screenConfig,
    json
  };
};

const mapDispatchToProps = dispatch => {
  return { handleField: (a, b, c, d) => dispatch(handleField(a, b, c, d)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
