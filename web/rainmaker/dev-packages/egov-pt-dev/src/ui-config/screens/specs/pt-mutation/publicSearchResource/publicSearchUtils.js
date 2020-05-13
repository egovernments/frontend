import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

export const applyMohallaData = (mohallaData, tenantId, dispatch) => {
  dispatch(
    prepareFinalObject("applyScreenMdmsData.tenant.localities", mohallaData)
  );
  dispatch(
    handleField(
      "public-search",
      "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.locality",
      "props.data",
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
};

export const ComponentJsonPath = {
  ulbCity:
    "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ulbCity",
  locality:
    "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.locality",
  ownerName:
    "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ownerName",
  ownerMobNo:
    "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.ownerMobNo",
  propertyID:
    "components.div.children.searchPropertyDetails.children.cardContent.children.searchPropertyContainer.children.propertyID"
};

export const getSearchResults = async requestPayload => {
  const PUBLIC_SEARCH = {
    GET: {
      URL: "egov-searcher/property-services/propertyopensearch/_get",
      ACTION: "_get"
    }
  };
  const searchResponse = await httpRequest(
    "post",
    PUBLIC_SEARCH.GET.URL,
    PUBLIC_SEARCH.GET.ACTION,
    [],
    { searchCriteria: requestPayload }
  );
  return searchResponse;
};

export const getPayload = searchScreenObject => {
  let querryObject = [];
  if(searchScreenObject){
    if(searchScreenObject.ownerName){
      querryObject.push({key:"ownerName", value: searchScreenObject.ownerName});
    }
    if(searchScreenObject.mobileNumber){
      querryObject.push({key:"mobileNumber", value: searchScreenObject.mobileNumber});
    }
    if(searchScreenObject.ids){
      querryObject.push({key:"propertyIds", value: searchScreenObject.ids});
    }
    if(searchScreenObject.locality){
      querryObject.push({key:"locality", value: searchScreenObject.locality.code});
    }
    if(searchScreenObject.tenantId){
      querryObject.push({key:"tenantId", value: searchScreenObject.tenantId});
    }
  }
  return querryObject;
};

export const getTenantName = (tenantId, state) => {
  const cityObject = get(state.common, "cities", []);
  if(cityObject && cityObject.length > 0) {
	return cityObject[cityObject.findIndex(item =>item.key.indexOf(tenantId) !== -1)].name;
  }
};
