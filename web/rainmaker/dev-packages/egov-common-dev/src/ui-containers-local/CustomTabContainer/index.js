import React from "react";
import RenderScreen from "egov-ui-framework/ui-molecules/RenderScreen";
import CustomTab from "../../ui-molecules-local/CustomTab";
import { connect } from "react-redux";
import { addComponentJsonpath } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import cloneDeep from "lodash/cloneDeep";
import {paymentMethods} from "./payment-methods"
import get from "lodash/get";

class MultiItem extends React.Component {
  state = {
    tabIndex: 0,
    tabs : undefined
  };

  methods = {
    CASH : "cash",
    CHEQUE : "cheque",
    DD : "DD",
    CARD : "card",
    OFFLINE_NEFT : "neftRtgs",
    OFFLINE_RTGS : "neftRtgs",
    POSTAL_ORDER : "postalOrder"
  }

  fieldsToReset = [
    "ReceiptTemp[0].Bill[0].payer",
    "ReceiptTemp[0].Bill[0].paidBy",
    "ReceiptTemp[0].Bill[0].payerMobileNumber",
    "ReceiptTemp[0].instrument.transactionNumber",
    "ReceiptTemp[0].instrument.transactionDateInput",
    "ReceiptTemp[0].instrument.ifscCode",
    "ReceiptTemp[0].instrument.instrumentNumber",
    "ReceiptTemp[0].instrument.transactionNumberConfirm",
    "ReceiptTemp[0].instrument.bank.name",
    "ReceiptTemp[0].instrument.branchName"
  ];

  componentDidMount = () =>{
    const {tabs} = this.props;
    this.props.dispatch(handleField("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
    this.setState({
      tabs
    })
  }

  componentWillReceiveProps = (nextProps) =>{
    const tabs = get(nextProps, "tabs");
    const previousTabs = get(this.props , "tabs");
    if(tabs.length != previousTabs.length) {
      this.props.dispatch(handleField("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
      this.setState({
        tabs
      })
    }
  }

  resetAllFields = (children, dispatch, state) => {
    for (var child in children) {
      if (children[child].children) {
        for (var innerChild in children[child].children) {
          if (
            get(
              state.screenConfiguration.screenConfig["pay"],
              `${
                children[child].children[innerChild].componentJsonpath
              }.props.value`
            )
          ) {
            dispatch(
              handleField(
                "pay",
                children[child].children[innerChild].componentJsonpath,
                "props.value",
                ""
              )
            );
            dispatch(
              handleField(
                "pay",
                children[child].children[innerChild].componentJsonpath,
                "props.error",
                false
              )
            );
            dispatch(
              handleField(
                "pay",
                children[child].children[innerChild].componentJsonpath,
                "isFieldValid",
                true
              )
            );
            dispatch(
              handleField(
                "pay",
                children[child].children[innerChild].componentJsonpath,
                "props.helperText",
                ""
              )
            );
          }
        }
      }
    }
  };

  resetFields = (dispatch, state) => {
    const { tabs }=this.state;
    const finalObject = get(state , "screenConfiguration.preparedFinalObject");
    const ifscCode = get(finalObject, "ReceiptTemp[0].instrument.ifscCode");
    const transactionDateInput = get(finalObject, "ReceiptTemp[0].instrument.transactionDateInput");
    const transactionNumber = get(finalObject, "ReceiptTemp[0].instrument.transactionNumber");
    const bankName = get(finalObject,"ReceiptTemp[0].instrument.bank.name");
    const branchName  = get(state.screenConfiguration.preparedFinalObject,"ReceiptTemp[0].instrument.branchName");
    if (bankName && branchName) {
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.bank.name", ""));
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.branchName", ""));
    }
    if(ifscCode){
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.ifscCode", ""));
    }
    if(transactionDateInput){
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionDateInput", ""));
    }
    if(transactionNumber){
      dispatch(prepareFinalObject("ReceiptTemp[0].instrument.transactionNumber", ""));
    }
    const keyToIndexMapping = tabs.map((item,index) => {
      return{
              index : index,
              key: get(this.methods, item.code)
      }
    })
    const objectJsonPath = "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs";
    const instrumentTypes = get(state.screenConfiguration.screenConfig["pay"] , objectJsonPath);
    
    instrumentTypes.forEach(item => {
      const tabContent = get(item , "tabContent");
      const children = Object.values(tabContent)[0].children;
      this.resetAllFields(children, dispatch, state);
    })
    
    // keyToIndexMapping.forEach(item => {
    //   const objectJsonPath = `components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[${
    //     item.index
    //   }].tabContent[${item.key}].children`;
    //   const children = get(
    //     state.screenConfiguration.screenConfig["pay"],
    //     objectJsonPath,
    //     {}
    //   );
    //   this.resetAllFields(children, dispatch, state);
    // });
  };

  setInstrumentType = (value, dispatch) => {
    dispatch(
      prepareFinalObject("ReceiptTemp[0].instrument.instrumentType.name", value)
    );
  };

  onTabChange = (tabIndex, dispatch, state) => {
    const {tabs}=this.state;
    this.resetFields(dispatch, state);
    this.setInstrumentType(get(tabs[tabIndex] , "code"), dispatch);
  };

  onTabClick = tabIndex => {
    const { state, dispatch } = this.props;
    this.onTabChange(tabIndex, dispatch, state);
    this.setState({ tabIndex });
  };

  render() {
    const {
      uiFramework,
      onFieldChange,
      onComponentClick,
      screenKey,
      componentJsonpath,
    } = this.props;
    const { onTabClick } = this;
    const tabs = get(this.state , "tabs" , this.props.tabs);
    // this.props.dispatch(handleField("pay", "components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection", "props.tabs", tabs));
    const transFormedProps = {
      ...this.props,
      tabs: tabs.map((tab, key) => {
        return {
          ...tab,
          tabContent: (
            <RenderScreen
              key={key}
              screenKey={screenKey}
              components={cloneDeep(
                addComponentJsonpath(
                  tab.tabContent,
                  `${componentJsonpath}.props.tabs[${key}].tabContent`
                )
              )}
              uiFramework={uiFramework}
              onFieldChange={onFieldChange}
              onComponentClick={onComponentClick}
            />
          )
        };
      })
    };
    return <CustomTab handleClick={onTabClick} tabs={tabs} {...transFormedProps} />;
  }
}

const mapStateToProps = (state , ownProps) => {
  const {jsonPath} = ownProps;
  const businessServiceDetails = get(state.screenConfiguration.preparedFinalObject , jsonPath);
  const notAllowedTypes = get(businessServiceDetails , "collectionModesNotAllowed");
  const tabs = paymentMethods && paymentMethods.reduce((acc , item) => {
    const index = notAllowedTypes && notAllowedTypes.findIndex((type) => {
      return item.code == type;
    });
    if(index === -1){
      acc.push({
        ...item
      })
    }
    return acc;
  },[])
  return {  state , tabs };
};

export default connect(mapStateToProps)(MultiItem);
