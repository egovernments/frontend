import React from "react";
import RenderScreen from "../RenderScreen";
import { SnackbarContainer } from "../../ui-containers";
import { LoadingIndicator } from "../../ui-molecules";
import "./index.css";

class CommonView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // componentDidCatch(error, errorInfo) {
  //   // Catch errors in any components below and re-render with error message
  //   this.setState({
  //     error: error,
  //     errorInfo: errorInfo
  //   })
  //   // You can also log error messages to an error reporting service here
  // }

  render() {
    const {
      components,
      uiFramework,
      onFieldChange,
      onComponentClick,
      preparedFinalObject,
      screenKey,
      toastObject,
      spinner
    } = this.props;
    const { error, message, open } = toastObject;
    // if (this.state.errorInfo) {
    //   // Error path
    //   console.error("Egov-ui-framework-error",this.state.error && this.state.error.toString());
    //   console.error("Egov-ui-framework-errorInfo",this.state.errorInfo.componentStack);
    //
    //   return null;
    // }
    return (
      <div>
        <RenderScreen
          components={components}
          uiFramework={uiFramework}
          onFieldChange={onFieldChange}
          onComponentClick={onComponentClick}
          preparedFinalObject={preparedFinalObject}
          screenKey={screenKey}
        />
        {open && (
          <SnackbarContainer variant={error} message={message} open={open} />
        )}
        {spinner && <LoadingIndicator status={"loading"} />}
      </div>
    );
  }
}

export default CommonView;
