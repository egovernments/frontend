import { getSearchResults } from "../../../../../ui-utils/commons";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";

export const fetchData = async (action, state, dispatch) => { 
  const response = await getSearchResults();
  try {
    if (response && response.Properties && response.Properties.length > 0) {
      const userMobileNumber = get(JSON.parse(getUserInfo()), "mobileNumber");
      let propertiesArray = [];
      response.Properties.forEach(property => {
        if(property.owners.length > 0) {
          let isLoggedInUser = false;
          property.owners.forEach(owner => {
            if(get(owner, "status") === "INACTIVE" && get(owner, "mobileNumber") === userMobileNumber) {
              isLoggedInUser = true;
            }
          })
          if(!isLoggedInUser) {
            propertiesArray.push(property)
          }
        }
      })

      dispatch(prepareFinalObject("searchResults", propertiesArray));
      dispatch(
        prepareFinalObject("myApplicationsCount", propertiesArray.length)
      );
      dispatch(
        handleField(
          "my-applications",
          "components.div.children.header.children.key",
          "props.dynamicArray",
          propertiesArray.length ? [propertiesArray.length] : [0]
        )
      )
    }
  } catch (error) {
    console.log(error);
  }
};
