import {
	getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getBusinessServiceMdmsData, getModuleName } from "egov-ui-kit/utils/commons";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
// import { searchPropertyTable } from "./publicSearchResource/search-table";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId, setModule, getLocale } from "egov-ui-kit/utils/localStorageUtils";
import commonConfig from "config/common.js";
// import { searchPropertyDetails } from "./publicSearchResource/search-resources";
import { searchApplications } from  "./publicSearchResource/search-resources";
import { searchApplicationResults } from "./publicSearchResource/searchApplicationResult";
// import "./index.css";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenant = getTenantId();

const getMDMSData = async dispatch => {
	const mdmsBody = {
		MdmsCriteria: {
			tenantId: commonConfig.tenantId,
			moduleDetails: [
				{
					moduleName: "tenant",
					masterDetails: [
						{
							name: "tenants"
						},
						{ name: "citymodule" }
					]
				}
			]
		}
	};
	try {
		const payload = await httpRequest(
			"post",
			"/egov-mdms-service/v1/_search",
			"_search",
			[],
			mdmsBody
		);
		payload.MdmsRes.tenant.tenants =
			payload.MdmsRes.tenant.citymodule[1].tenants;
		// console.log("payload--", payload)
		dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
		await getBusinessServiceMdmsData(dispatch, commonConfig.tenantId, "wns");
	} catch (e) {
		console.log(e);
	}
};

// const getMDMSAppType = async (dispatch) => {
// 	// getMDMS data for ApplicationType
// 	let mdmsBody = {
// 		MdmsCriteria: {
// 			tenantId: commonConfig.tenantId,
// 			moduleDetails: [
// 				{
// 					moduleName: "ws-services-masters", masterDetails: [
// 						{ name: "ApplicationType" }
// 					]
// 				}
// 			]
// 		}
// 	};
// 	try {
// 		let applicationType = [];
// 		let payload = null;
// 		payload = await httpRequest("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);
// 		if (payload && payload.MdmsRes['ws-services-masters'] && payload.MdmsRes['ws-services-masters'].ApplicationType !== undefined) {
// 			payload.MdmsRes['ws-services-masters'].ApplicationType.forEach(obj => applicationType.push({
// 				code: obj.code.replace(/_/g, ' '),
// 				name: obj.name, businessService: obj.businessService
// 			}));
// 			applicationType.forEach(type => getBusinessService(type.businessService, dispatch))
// 			dispatch(prepareFinalObject("applyScreenMdmsData.searchScreen.applicationType", applicationType));
// 		}
// 	} catch (e) { console.log(e); }
// }

// const getBusinessService = async (businessService, dispatch) => {
// 	const queryObject = [
// 		{ key: "tenantId", value: getTenantId() },
// 		{ key: "businessServices", value: businessService }
// 	];
// 	const payload = await httpRequest(
// 		"post",
// 		"egov-workflow-v2/egov-wf/businessservice/_search",
// 		"_search",
// 		queryObject
// 	);
// 	if (payload.BusinessServices[0].businessService === "NewWS1" || payload.BusinessServices[0].businessService === "NewSW1") {

// 		const applicationStatus = commonGetAppStatus(payload);
// 		dispatch(prepareFinalObject("applyScreenMdmsData.searchScreen.applicationStatusNew", applicationStatus));

// 	} else {
// 		if (payload.BusinessServices[0].businessService === "ModifyWSConnection" || payload.BusinessServices[0].businessService ===
// 			"ModifySWConnection") {
// 			const applicationStatus = commonGetAppStatus(payload);
// 			dispatch(prepareFinalObject("applyScreenMdmsData.searchScreen.applicationStatusModify", applicationStatus));
// 		}
// 	}
// }

// const commonGetAppStatus = (payload) => {
// 	const { states } = payload.BusinessServices[0] || [];
// 	if (states && states.length > 0) {
// 		const status = states.map((item) => { return { code: item.applicationStatus } });
// 		return status.filter(item => item.code != null);
// 	}

// }

const screenConfig = {
	uiFramework: "material-ui",
	name: "public-search",

	beforeInitScreen: (action, state, dispatch) => {
		//   resetFields(state, dispatch);
		debugger;
		setModule(getModuleName());
		const tenantId = getTenantId();
		dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));
		// getMDMSAppType(dispatch)
		getMDMSData(dispatch);

		return action;
	},

	components: {
		div: {
			uiFramework: "custom-atoms",
			componentPath: "Form",
			props: {
				className: "public-domain-search",
				id: "search",
			},
			children: {
				searchApplications,
				breakAfterSearch3: getBreak(),
				searchApplicationResults,
				breakAfterSearch4: getBreak()
			}
		}
	}
};

export default screenConfig;