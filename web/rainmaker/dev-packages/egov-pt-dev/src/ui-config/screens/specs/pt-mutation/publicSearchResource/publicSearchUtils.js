import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
export const applyMohallaData = (mohallaData, tenantId, dispatch) => {
	dispatch(
		prepareFinalObject(
		  "applyScreenMdmsData.tenant.localities",
		  mohallaData
		)
	  );
	  dispatch(
		handleField(
		  "public-search",
		  "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.locality",
		  "props.suggestions",
		  mohallaData
		  // payload.TenantBoundary && payload.TenantBoundary[0].boundary
		)
	  );
	  const mohallaLocalePrefix = {
		moduleName: tenantId,
		masterName: "REVENUE"
	  };
	  dispatch(
		handleField(
		  "public-search",
		  "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.locality",
		  "props.localePrefix",
		  mohallaLocalePrefix
		)
	  );
}