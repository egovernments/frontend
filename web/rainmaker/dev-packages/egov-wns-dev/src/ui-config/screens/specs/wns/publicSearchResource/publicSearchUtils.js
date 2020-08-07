import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { getSearchBillResult } from "../../../../../ui-utils/commons";

export const ComponentJsonPath = {
  ulbCity:
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ulbCity",
  consumerNo:
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.consumerNo",
  ownerName:
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ownerName",
  ownerMobNo:
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ownerMobNo",
  propertyID:
    "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.propertyID",
};

// export const getSearchResults = async (requestPayload) => {
//   const PUBLIC_SEARCH = {
//     GET: {
//       URL: "egov-searcher/property-services/propertyopensearch/_get",
//       ACTION: "_get",
//     },
//   };
//   const searchResponse = await httpRequest(
//     "post",
//     PUBLIC_SEARCH.GET.URL,
//     PUBLIC_SEARCH.GET.ACTION,
//     [],
//     { searchCriteria: requestPayload }
//   );
//   return searchResponse;
// };

export const getPayload = (searchScreenObject) => {
  let querryObject = [];
  if (searchScreenObject) {
    if (searchScreenObject.consumerNo) {
      querryObject.push({
        key: "connectionNumber",
        value: searchScreenObject.consumerNo,
      });
    }
    if (searchScreenObject.mobileNumber) {
      querryObject.push({
        key: "mobileNumber",
        value: searchScreenObject.mobileNumber,
      });
    }
    if (searchScreenObject.ids) {
      querryObject.push({ key: "propertyIds", value: searchScreenObject.ids });
    }
    if (searchScreenObject.tenantId) {
      querryObject.push({
        key: "tenantId",
        value: searchScreenObject.tenantId,
      });
    }
  }
  return querryObject;
};


export const generateBill = async (
  dispatch,
  consumerCodes,
  tenantId,
  businessService
) => {
  try {
    if (consumerCodes && consumerCodes.length > 0 && tenantId) {
      const queryObj = [
        {
          key: "tenantId",
          value: tenantId,
        },
      ];
      queryObj.push({
        key: "consumerCode",
        value: consumerCodes.join(","),
      });
      if (businessService) {
        queryObj.push({
          key: "service",
          value: businessService,
        });
      }
      const payload = await getSearchBillResult(queryObj, dispatch);
      return payload;
    }
  } catch (e) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: e.message, labelKey: e.message },
        "error"
      )
    );
    console.log(e);
  }
};

export const getBill = async (queryObject, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/billing-service/bill/v2/_fetchbill",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    console.log(error, "fetxh");
  }
};

export const getPropertyWithBillAmount = (propertyResponse, billResponse) => {
  try {
    if(billResponse && billResponse.Bill && billResponse.Bill.length > 0) {
      propertyResponse.Properties.map((item, key) => {
        billResponse.Bill.map(bill => {
          if(bill.consumerCode === item.propertyId) {
            propertyResponse.Properties[key].totalAmount = bill.totalAmount;
          }
        });
      });
      return propertyResponse;
    } else {
      return propertyResponse;
    }
  } catch (error) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    console.log(error, "Bill Error");
  }
}