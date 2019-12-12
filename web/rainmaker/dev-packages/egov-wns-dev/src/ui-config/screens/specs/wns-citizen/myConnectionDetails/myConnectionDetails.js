import { getMyConnectionResults } from "../../../../../ui-utils/commons";
import {
    handleScreenConfigurationFieldChange as handleField,
    prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const fetchData = async (action, state, dispatch) => {
    let queryObject = [
        {
            key: "mobileNumber",
            value: JSON.parse(getUserInfo()).mobileNumber
        }, {
            key: "tenantId",
            value: "pb.amritsar"
        },]

    const response = await getMyConnectionResults(queryObject);
    // const billResponse = await getMyConnectionDueResults();
    try {
        /*Mseva 2.0 */
        if (response && response.WaterConnection && response.WaterConnection.length > 0) {
            dispatch(prepareFinalObject("myConnectionResults", response.WaterConnection));
            dispatch(prepareFinalObject("myConnectionCount", response.WaterConnection.length));
        }
    } catch (error) {
        console.log(error);
    }
};
