import React, { Component } from "react";
import { connect } from "react-redux";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSelectField } from "../../ui-config/screens/specs/utils";
import RenderScreen from "egov-ui-framework/ui-molecules/RenderScreen";
import { getMdmsJson, getObjectKeys, getObjectValues, getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
class DynamicMdmsContainer extends Component {
  componentDidMount = async () => {
    let { rootBlockSub, state, moduleName, masterName, type, dispatch, callBackEdit } = this.props;
    const isMdmsData = this.getValueByKey('.MdmsJson');
    if(!isMdmsData || isMdmsData.length == 0 ){
      let reqObj = {
        setPath : `DynamicMdms.${moduleName}.${rootBlockSub}.MdmsJson`  , 
        setTransformPath : `DynamicMdms.${moduleName}.${rootBlockSub}Transformed`, 
        dispatchPath : "DynamicMdms",
        moduleName,
        name : masterName,
        type
      }
      await getMdmsJson(state, dispatch, reqObj);
      this.triggerCallback(null, null);
      getQueryArg(window.location.href, "action") == "edit" && callBackEdit(state, dispatch);
    }
 
  }
  onFieldChange = ( screenKey, componentJsonpath, property, value ) => {
    let { dispatch } = this.props;
    dispatch(prepareFinalObject( componentJsonpath , value ));
    this.triggerCallback(componentJsonpath, value);
  }
  getValueByKey = (key) => {
    let { state, rootBlockSub, moduleName } = this.props;
    if(key){
      return get( state, `screenConfiguration.preparedFinalObject.DynamicMdms.${moduleName}.${rootBlockSub}${key}`, []);
    } else {
      return get( state, `screenConfiguration.preparedFinalObject.DynamicMdms.${moduleName}.${rootBlockSub}Transformed`, []);
    }
   
  }
  setValueByKey = (key, dropdownData) => {
    let { rootBlockSub, moduleName, dispatch } = this.props;
    dispatch(prepareFinalObject( `DynamicMdms.${moduleName}.${rootBlockSub}.${key}Transformed`, dropdownData ));
  }
  triggerValueByKey = (keyValue, index) => {
    let { dropdownFields } = this.props;
    let dropdownData = [];
    let transformedData = this.getValueByKey(keyValue);
    dropdownData = (dropdownFields.length - 1 ==  index ) ? getObjectValues(transformedData) : getObjectKeys(transformedData);
    this.setValueByKey(dropdownFields[index].key, dropdownData);
  }
  triggerCallback = (componentJsonpath, value) => {
    let { dropdownFields, rootBlockSub, moduleName, state, dispatch } = this.props;
    let index = null;
    let keyValue = null;
    if(componentJsonpath){
      let last = componentJsonpath.substring(componentJsonpath.lastIndexOf(".") + 1, componentJsonpath.length);
      index = dropdownFields.findIndex((row) => {
        return row.key == last;
      });
    }
    if(index == 0) {
      keyValue = `Transformed.${value}`;
    } else if(index == 1){
      let target1 = this.getValueByKey(`.${dropdownFields[0].key}`);
      keyValue = `Transformed.${target1}.${value}`
    } else if(index == 2){
      let target1 = this.getValueByKey(`.${dropdownFields[0].key}`);
      let target2 = this.getValueByKey(`.${dropdownFields[1].key}`);
      keyValue = `Transformed.${target1}.${target2}.${value}`;
    } else if(index == 3){
      let target1 = this.getValueByKey(`.${dropdownFields[0].key}`);
      let target2 = this.getValueByKey(`.${dropdownFields[1].key}`);
      let target3 = this.getValueByKey(`.${dropdownFields[2].key}`);
      keyValue = `Transformed.${target1}.${target2}.${target3}.${value}`;
    } else {
      this.triggerValueByKey(null, 0);
    }
    if(componentJsonpath) {
      (dropdownFields.length > index + 1 ) && this.triggerValueByKey(keyValue, index + 1);
      let reqObj = {
        moduleName, rootBlockSub, keyValue, value, state, dispatch
      }
      typeof dropdownFields[index].callBack == "function" && dropdownFields[index].callBack(reqObj);
    }  
  }
  formDropDown = () => {
    let { dropdownFields, moduleName, masterName, rootBlockSub } = this.props;
    let allObj = {} ;
    let moduleNameCaps = moduleName.toUpperCase();
    let masterNameCaps = masterName.toUpperCase();
    dropdownFields.forEach((entry, i) => {  
      let { key } = entry;
      allObj[key] = dropdownFields.length - 1 == i ? 
      {
          uiFramework: "custom-containers",
          componentPath: "AutosuggestContainer",
          jsonPath: `DynamicMdms.${moduleName}.${rootBlockSub}.${key}` ,
          componentJsonpath : `DynamicMdms.${moduleName}.${rootBlockSub}.${key}`,
          required: true,
          gridDefination: {
            xs: 12,
            sm: 4
          },
          props: {
            style: {
              width: "100%",
              cursor: "pointer"
            },
            label: {
              labelKey: moduleNameCaps + '_' + key.toUpperCase() + '_LABEL'
            },
            
            placeholder: {
              labelKey: moduleNameCaps + '_' + key.toUpperCase() + "_PLACEHOLDER"
            },
            jsonPath: `DynamicMdms.${moduleName}.${rootBlockSub}.${key}`,
            sourceJsonPath: `DynamicMdms.${moduleName}.${rootBlockSub}.${key}Transformed`,
            setDataInField: true,
            labelsFromLocalisation: true,
            localePrefix: {
              moduleName: moduleNameCaps,
              masterName: masterNameCaps
            },
            fullwidth: true,
            required: true,
            inputLabelProps: {
              shrink: true
            }
          }
      } :
      {   
        ...getSelectField({
          label: {
            labelKey: moduleNameCaps + '_' + key.toUpperCase() + '_LABEL'
          },
          placeholder: {
            labelKey: moduleNameCaps + '_' + key.toUpperCase() + "_PLACEHOLDER"
          },
          required: true,
          jsonPath: `DynamicMdms.${moduleName}.${rootBlockSub}.${key}` ,
          componentJsonpath : `DynamicMdms.${moduleName}.${rootBlockSub}.${key}`,
          localePrefix: {
            moduleName: moduleNameCaps,
            masterName: masterNameCaps
          },
          moduleName : moduleNameCaps ,
          props: {
            setDataInField: true,
            className:"applicant-details-error"
          },
          sourceJsonPath: `DynamicMdms.${moduleName}.${rootBlockSub}.${key}Transformed`,
          gridDefination: {
            xs: 12,
            sm: 4
          }
        })
      }  
        ;
    });
    return allObj; 
  }
  render() {
    return (
      <RenderScreen
        components={this.formDropDown()}
        onFieldChange = {this.onFieldChange}
      />
    );
  }
}


const mapStateToProps = (state, ownprops) => {
  
  return { state };
};

export default connect(
  mapStateToProps,
  null
)(DynamicMdmsContainer);
