import { getMyConnectionResults } from "../../../../../ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils";
import {
    handleScreenConfigurationFieldChange as handleField,
    prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import commonConfig from "config/common.js";

const getMdmsData = async () => {
    let mdmsBody = {
        MdmsCriteria: {
            tenantId: commonConfig.tenantId,
            moduleDetails: [
                {
                    moduleName: "tenant",
                    masterDetails: [{ name: "citymodule" }]
                }
            ]
        }
    };
    try {
        let payload = await httpRequest(
            "post",
            "/egov-mdms-service/v1/_search",
            "_search",
            [],
            mdmsBody
        );
        return payload;
    } catch (e) {
        console.log(e);
    }
};
export const fetchData = async (action, state, dispatch) => {
    const response = await getMyConnectionResults();
    const mdmsRes = await getMdmsData(dispatch);
    let tenants =
        mdmsRes &&
        mdmsRes.MdmsRes &&
        mdmsRes.MdmsRes.tenant.citymodule.find(item => {
            if (item.code === "TL") return true;
        });
    // dispatch(
    //     prepareFinalObject(
    //         "applyScreenMdmsData.common-masters.citiesByModule.TL",
    //         tenants
    //     )
    // );
    try {
        /*Mseva 2.0 */
        if (response && response.WaterConnection && response.WaterConnection.length > 0) {
            dispatch(prepareFinalObject("myConnectionResults", response.WaterConnection));
            dispatch(prepareFinalObject("myConnectionCount", response.WaterConnection.length)
            );
        }
    } catch (error) {
        console.log(error);
    }
};
