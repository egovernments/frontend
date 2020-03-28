import * as screenActionTypes from "../actionTypes";
import get from "lodash/get";
import {validate} from "../utils";

const beforeFieldChange = (store) => (next) => (action) => {
  const { type} = action;
  if (type === screenActionTypes.HANDLE_SCREEN_CONFIGURATION_FIELD_CHANGE && action.property==="props.value") {
      const { screenKey,componentJsonpath,value } = action;
      const dispatch = store.dispatch;
      const state = store.getState();
      const componentObject=get(state,`screenConfiguration.screenConfig.${screenKey}.${componentJsonpath}`);
      if (typeof get(componentObject, "beforeFieldChange") === "function") {
        componentObject.beforeFieldChange(action,state,dispatch);
      }
      next(action);
      if (window.appOverrides) {
        window.appOverridesv1.onChange(action, state, dispatch);
      }
  } else {
    next(action);
  }
};

export default beforeFieldChange;
