import {
    handleScreenConfigurationFieldChange as handleField,
    toggleSnackbar,
    prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import {
    getRequestBody,
    getTenantName
} from "./publicSearchUtils";
import { validateFields } from "../../utils/index";
import { convertEpochToDate } from "../../utils/index";
import { findAndReplace, getOpenSearchResultsForWater, getOpenSearchResultsForSewerage, getWorkFlowData, serviceConst, getMdmsDataForBill } from "../../../../../ui-utils/commons";
import { ComponentJsonPath, getPropertyWithBillAmount, fetchBill } from "./publicSearchUtils";
import store from "redux/store";

export const searchConnections = async (state, dispatch) => {
    searchApiCall(state, dispatch);
};

const removeValidation = (state, dispatch) => {
    Object.keys(ComponentJsonPath).map(key => {
        dispatch(
            handleField("public-search", ComponentJsonPath[key], "props.error", false)
        );

        dispatch(
            handleField("public-search", ComponentJsonPath[key], "isFieldValid", true)
        );

        dispatch(
            handleField("public-search", ComponentJsonPath[key], "props.helperText", "")
        );
        return true;
    });
};

const getAddress = item => {
    if (item && item.address) {
        let doorNo = item.address.doorNo != null ? item.address.doorNo + "," : "";
        let buildingName =
            item.address.buildingName != null ? item.address.buildingName + "," : "";
        let street = item.address.street != null ? item.address.street + "," : "";
        let mohalla = item.address.locality.name
            ? item.address.locality.name + ","
            : "";
        let city = item.address.city != null ? item.address.city : "";
        return doorNo + buildingName + street + mohalla + city;
    }
};

export const getPayload = (searchScreenObject) => {
    let querryObject = [];
    if (searchScreenObject) {
        if (searchScreenObject.connectionNo) {
            querryObject.push({
                key: "connectionNo",
                value: searchScreenObject.connectionNo,
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
        if (searchScreenObject.locality) {
            querryObject.push({
                key: "locality",
                value: searchScreenObject.locality.code,
            });
        }
        if (searchScreenObject.tenantId) {
            querryObject.push({
                key: "tenantId",
                value: searchScreenObject.tenantId,
            });
        }
        querryObject.push({
            key: "searchType",
            value: "CONNECTION"
        })
    }
    return querryObject;
};

const searchApiCall = async (state, dispatch) => {
    showHideTable(false, dispatch);
    let queryObject = [
        { key: "offset", value: "0" },
        { key: "limit", value: 50 }
    ];
    let searchScreenObject = get(
        state.screenConfiguration.preparedFinalObject,
        "searchScreen",
        {}
    );

    if (searchScreenObject.tenantId && searchScreenObject.locality && !(searchScreenObject.ids || searchScreenObject.mobileNumber || searchScreenObject.ownerName)) {
        store.dispatch(
            toggleSnackbar(
                true,
                {
                    labelName: "Please fill at least one field along with city",
                    labelKey:
                        "PT_SEARCH_SELECT_AT_LEAST_ONE_FIELD_WITH_CITY_AND_LOCALITY"
                },
                "error"
            )
        );
        return;
    } else {
        // removeValidation(state, dispatch);
        let requestBody = getPayload(searchScreenObject);
        let payloadbillingPeriod;
        let tenantId = searchScreenObject.tenantId;
        try {
            payloadbillingPeriod = await getMdmsDataForBill(tenantId);
            let getSearchResult = await getOpenSearchResultsForWater(queryObject, requestBody, dispatch)
            let getSearchResultForSewerage = await getOpenSearchResultsForSewerage(queryObject, requestBody, dispatch);
            let waterBillResponse = await fetchBill(getSearchResult, searchScreenObject.tenantId, "WS", "WATER", payloadbillingPeriod);
            let sewerageBillResponse = await fetchBill(getSearchResultForSewerage, searchScreenObject.tenantId, "SW", "SEWERAGE", payloadbillingPeriod);
            let waterFinalResponse = await getPropertyWithBillAmount(getSearchResult, waterBillResponse, "WATER");
            let sewerageFinalResponse = await getPropertyWithBillAmount(getSearchResultForSewerage, sewerageBillResponse, "SEWERAGE");
            let finalArray = [];
            const waterConnections = waterFinalResponse ? waterFinalResponse.WaterConnection.map(e => { e.service = serviceConst.WATER; return e }) : []
            const sewerageConnections = waterFinalResponse ? sewerageFinalResponse.SewerageConnections.map(e => { e.service = serviceConst.SEWERAGE; return e }) : [];
            let combinedSearchResults = waterFinalResponse || waterFinalResponse ? sewerageConnections.concat(waterConnections) : [];
            finalArray = combinedSearchResults;
            showResults(finalArray, tenantId, dispatch)
        } catch (err) { console.log(err) }
    }
};
const showHideTable = (booleanHideOrShow, dispatch) => {
    dispatch(
        handleField(
            "public-search",
            "components.div.children.searchApplicationResult",
            "visible",
            booleanHideOrShow
        )
    );
};

const showResults = (connections, tenantId, dispatch) => {
    let data = connections.map(item => ({
        ["WS_COMMON_TABLE_COL_SERVICE_LABEL"]: item.service,
        ["WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL"]: item.connectionNo ? item.connectionNo : "NA",
        ["WS_COMMON_TABLE_COL_OWN_NAME_LABEL"]: get(item, "property.owners[0].name", "NA"),
        ["WS_COMMON_TABLE_COL_STATUS_LABEL"]: item.status,
        ["WS_COMMON_TABLE_COL_DUE_LABEL"]: (item.totalAmount || item.totalAmount === 0) ? item.totalAmount : "NA",
        ["WS_COMMON_TABLE_COL_ADDRESS"]: get(item, "property.owners[0].permanentAddress", "NA"),
        ["WS_COMMON_TABLE_COL_DUE_DATE_LABEL"]: (item.updatedDueDate !== undefined) ? convertEpochToDate(item.updatedDueDate) : 0,
        ["WS_COMMON_TABLE_COL_TENANTID_LABEL"]: tenantId,
        ["WS_COMMON_TABLE_COL_CONNECTIONTYPE_LABEL"]: item.connectionType,
        ["WS_COMMON_TABLE_COL_ACTION_LABEL"]: { status: item.status, totalAmount: item.totalAmount, connectionNo: item.connectionNo, businessService: item.businessService, tenantId: item.tenantId }
    }))
    dispatch(handleField("public-search", "components.div.children.searchApplicationResult", "props.data", data));
    dispatch(handleField("public-search", "components.div.children.searchApplicationResult", "props.rows", connections.length));
    showHideTable(true, dispatch);
}

export const resetFields = (state) => {
    let ulbCityValue = get(state, "screenConfiguration.preparedFinalObject.searchScreen.tenantId", "");
    if (ulbCityValue) {
        store.dispatch(
            handleField(
                "public-search",
                "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ulbCity",
                "props.value",
                ""
            )
        );
    }

    store.dispatch(
        handleField(
            "public-search",
            "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.ownerMobNo",
            "props.value",
            ""
        )
    );
    store.dispatch(
        handleField(
            "public-search",
            "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.propertyID",
            "props.value",
            ""
        )
    );
    store.dispatch(
        handleField(
            "public-search",
            "components.div.children.searchApplications.children.cardContent.children.searchPropertyContainer.children.consumerNo",
            "props.value",
            ""
        )
    );
}