import { httpRequest } from "./api";
import {
    convertDateToEpoch,
    getCurrentFinancialYear,
    getCheckBoxJsonpath,
    getSafetyNormsJson,
    getHygeneLevelJson,
    getLocalityHarmedJson,
    setFilteredTradeTypes,
    getTradeTypeDropdownData
} from "../ui-config/screens/specs/utils";
import { prepareFinalObject, toggleSnackbar, toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTranslatedLabel, updateDropDowns, ifUserRoleExists } from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "redux/store";
import get from "lodash/get";
import set from "lodash/set";
import { getQueryArg, getFileUrlFromAPI, getFileUrl, getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {
    setBusinessServiceDataToLocalStorage,
    getMultiUnits
} from "egov-ui-framework/ui-utils/commons";
import commonConfig from "config/common.js";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import printJS from 'print-js';

export const updateTradeDetails = async requestBody => {
    try {
        const payload = await httpRequest(
            "post",
            "/tl-services/v1/_update",
            "", [],
            requestBody
        );
        return payload;
    } catch (error) {
        store.dispatch(toggleSnackbar(true, error.message, "error"));
    }
};

export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
    alert(1);
    console.log(label, labelKey)
    if (labelKey) {
        let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
        if (!translatedLabel || labelKey === translatedLabel) {
            return label;
        } else {
            return translatedLabel;
        }
    } else {
        return label;
    }
};

export const getSearchResults = async queryObject => {
    try {
        const response = await httpRequest(
            "post",
            "/ws-services/wc/_search",
            "_search",
            queryObject
        );
        return findAndReplace(response, null, "NA");
    } catch (error) { console.log(error) }
};

export const getSearchResultsForSewerage = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/sw-services/swc/_search",
            "_search",
            queryObject
        );
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error)
    }
};

export const getDescriptionFromMDMS = async (requestBody, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/egov-mdms-service/v1/_search",
            "_search", [],
            requestBody
        );
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        store.dispatch(
            toggleSnackbar(
                true, { labelName: error.message, labelCode: error.message },
                "error"
            )
        );
    }
};

export const fetchBill = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/billing-service/bill/v2/_fetchbill",
            "_fetchBill",
            queryObject
        );
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error)
    }
};

// api call to get my connection details
export const getMyConnectionResults = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/ws-services/wc/_search",
            "_search",
            queryObject
        );

        if (response.WaterConnection.length > 0) {
            for (let i = 0; i < response.WaterConnection.length; i++) {
                response.WaterConnection[i].service = "Water"
                try {
                    const data = await httpRequest(
                        "post",
                        `billing-service/bill/v2/_fetchbill?consumerCode=${response.WaterConnection[i].connectionNo}&tenantId=${response.WaterConnection[i].property.tenantId}&businessService=WS`,
                        "_fetchbill",
                        // queryObject
                    );
                    if (data && data !== undefined) {
                        if (data.Bill !== undefined && data.Bill.length > 0) {
                            response.WaterConnection[i].due = data.Bill[0].totalAmount
                        }

                    } else {
                        response.WaterConnection[i].due = 0
                    }

                } catch (err) {
                    console.log(err)
                    response.WaterConnection[i].due = "NA"
                }
            }
            // });
        }
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error);
    }

};

export const getMyApplicationResults = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/ws-services/wc/_search",
            "_search",
            queryObject
        );

        if (response.WaterConnection.length > 0) {
            for (let i = 0; i < response.WaterConnection.length; i++) {
                response.WaterConnection[i].service = "Water"
                try {
                    const data = await httpRequest(
                        "post",
                        `billing-service/bill/v2/_fetchbill?consumerCode=${response.WaterConnection[i].applicationNo}&tenantId=${response.WaterConnection[i].property.tenantId}&businessService=WS`,
                        "_fetchbill",
                        // queryObject
                    );
                    if (data && data !== undefined) {
                        if (data.Bill !== undefined && data.Bill.length > 0) {
                            response.WaterConnection[i].due = data.Bill[0].totalAmount
                        }

                    } else {
                        response.WaterConnection[i].due = 0
                    }

                } catch (err) {
                    console.log(err)
                    response.WaterConnection[i].due = "NA"
                }
            }
            // });
        }
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error);
    }

};

export const getSWMyApplicationResults = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/sw-services/swc/_search",
            // "/sw-services/swc/_search",
            "_search",
            queryObject
        );
        if (response.SewerageConnections.length > 0) {
            for (let i = 0; i < response.SewerageConnections.length; i++) {
                response.SewerageConnections[i].service = "Sewerage"
                try {
                    const data = await httpRequest(
                        "post",
                        `billing-service/bill/v2/_fetchbill?consumerCode=${response.SewerageConnections[i].applicationNo}&tenantId=${response.SewerageConnections[i].property.tenantId}&businessService=SW`,
                        "_fetchbill",
                        // queryObject
                    );
                    if (data && data !== undefined) {
                        if (data.Bill !== undefined && data.Bill.length > 0) {
                            response.SewerageConnections[i].due = data.Bill[0].totalAmount
                        }

                    } else {
                        response.SewerageConnections[i].due = 0
                    }

                } catch (err) {
                    console.log(err)
                    response.SewerageConnections[i].due = "NA"
                }
            }
            // });
        }
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error);
    }

};

export const getPropertyResults = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/property-services/property/_search",
            "_search",
            queryObject
        );
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error);
    }

};




export const getConsumptionDetails = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/ws-calculator/meterConnection/_search",
            "_search",
            queryObject
        );
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        store.dispatch(
            toggleSnackbar(
                true, { labelName: error.message, labelCode: error.message },
                "error"
            )
        );
    }
};

const setDocsForEditFlow = async (state, dispatch) => {
    const applicationDocuments = get(
        state.screenConfiguration.preparedFinalObject,
        "Licenses[0].tradeLicenseDetail.applicationDocuments", []
    );
    let uploadedDocuments = {};
    let fileStoreIds =
        applicationDocuments &&
        applicationDocuments.map(item => item.fileStoreId).join(",");
    const fileUrlPayload =
        fileStoreIds && (await getFileUrlFromAPI(fileStoreIds));
    applicationDocuments &&
        applicationDocuments.forEach((item, index) => {
            uploadedDocuments[index] = [{
                fileName:
                    (fileUrlPayload &&
                        fileUrlPayload[item.fileStoreId] &&
                        decodeURIComponent(
                            getFileUrl(fileUrlPayload[item.fileStoreId])
                                .split("?")[0]
                                .split("/")
                                .pop()
                                .slice(13)
                        )) ||
                    `Document - ${index + 1}`,
                fileStoreId: item.fileStoreId,
                fileUrl: Object.values(fileUrlPayload)[index],
                documentType: item.documentType,
                tenantId: item.tenantId,
                id: item.id
            }];
        });
    dispatch(
        prepareFinalObject("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments)
    );
};

export const updatePFOforSearchResults = async (
    action,
    state,
    dispatch,
    queryValue,
    queryValuePurpose,
    tenantId
) => {
    let queryObject = [{
        key: "tenantId",
        value: tenantId ? tenantId : getTenantId()
    },
    { key: "applicationNumber", value: queryValue }
    ];
    const isPreviouslyEdited = getQueryArg(window.location.href, "edited");
    const payload = !isPreviouslyEdited ?
        await getSearchResults(queryObject) :
        {
            WaterConnection: get(state.screenConfiguration.preparedFinalObject, "WaterConnection")
        };
    getQueryArg(window.location.href, "action") === "edit" &&
        (await setDocsForEditFlow(state, dispatch));
    if (payload) {
        dispatch(prepareFinalObject("WaterConnection[0]", payload.WaterConnection[0]));
    }
    // const licenseType = payload && get(payload, "Licenses[0].licenseType");
    // const structureSubtype =
    //     payload && get(payload, "Licenses[0].tradeLicenseDetail.structureType");
    // const tradeTypes = setFilteredTradeTypes(
    //     state,
    //     dispatch,
    //     licenseType,
    //     structureSubtype
    // );
    // const tradeTypeDdData = getTradeTypeDropdownData(tradeTypes);
    // tradeTypeDdData &&
    //     dispatch(
    //         prepareFinalObject(
    //             "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
    //             tradeTypeDdData
    //         )
    //     );
    updateDropDowns(payload, action, state, dispatch, queryValue);
    if (queryValuePurpose !== "cancel") {
        set(payload, getSafetyNormsJson(queryValuePurpose), "yes");
        set(payload, getHygeneLevelJson(queryValuePurpose), "yes");
        set(payload, getLocalityHarmedJson(queryValuePurpose), "No");
    }
    set(payload, getCheckBoxJsonpath(queryValuePurpose), true);

    setApplicationNumberBox(state, dispatch);

    createOwnersBackup(dispatch, payload);
};

export const getBoundaryData = async (
    action,
    state,
    dispatch,
    queryObject,
    code,
    componentPath
) => {
    try {
        let payload = await httpRequest(
            "post",
            "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
            "_search",
            queryObject, {}
        );
        const tenantId =
            process.env.REACT_APP_NAME === "Employee" ?
                get(
                    state.screenConfiguration.preparedFinalObject,
                    "Licenses[0].tradeLicenseDetail.address.city"
                ) :
                getQueryArg(window.location.href, "tenantId");

        const mohallaData =
            payload &&
            payload.TenantBoundary[0] &&
            payload.TenantBoundary[0].boundary &&
            payload.TenantBoundary[0].boundary.reduce((result, item) => {
                result.push({
                    ...item,
                    name: `${tenantId
                        .toUpperCase()
                        .replace(/[.]/g, "_")}_REVENUE_${item.code
                            .toUpperCase()
                            .replace(/[._:-\s\/]/g, "_")}`
                });
                return result;
            }, []);

        dispatch(
            prepareFinalObject(
                "applyScreenMdmsData.tenant.localities",
                // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
                mohallaData
            )
        );

        dispatch(
            handleField(
                "apply",
                "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
                "props.suggestions",
                mohallaData
            )
        );
        if (code) {
            let data = payload.TenantBoundary[0].boundary;
            let messageObject =
                data &&
                data.find(item => {
                    return item.code == code;
                });
            if (messageObject)
                dispatch(
                    prepareFinalObject(
                        "Licenses[0].tradeLicenseDetail.address.locality.name",
                        messageObject.name
                    )
                );
        }
    } catch (e) {
        console.log(e);
    }
};

const createOwnersBackup = (dispatch, payload) => {
    const owners = get(payload, "Licenses[0].tradeLicenseDetail.owners");
    owners &&
        owners.length > 0 &&
        dispatch(
            prepareFinalObject(
                "LicensesTemp[0].tradeLicenseDetail.owners",
                JSON.parse(JSON.stringify(owners))
            )
        );
};

// const getMultipleAccessories = licenses => {
//   let accessories = get(licenses, "tradeLicenseDetail.accessories");
//   let mergedAccessories =
//     accessories &&
//     accessories.reduce((result, item) => {
//       if (item && item !== null && item.hasOwnProperty("accessoryCategory")) {
//         if (item.hasOwnProperty("id")) {
//           if (item.hasOwnProperty("active") && item.active) {
//             if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
//               set(item, "active", false);
//               result.push(item);
//             } else {
//               result.push(item);
//             }
//           }
//         } else {
//           if (!item.hasOwnProperty("isDeleted")) {
//             result.push(item);
//           }
//         }
//       }
//       return result;
//     }, []);

//   return mergedAccessories;
// };

const getMultipleOwners = owners => {
    let mergedOwners =
        owners &&
        owners.reduce((result, item) => {
            if (item && item !== null && item.hasOwnProperty("mobileNumber")) {
                if (item.hasOwnProperty("active") && item.active) {
                    if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
                        set(item, "active", false);
                        result.push(item);
                    } else {
                        result.push(item);
                    }
                } else {
                    if (!item.hasOwnProperty("isDeleted")) {
                        result.push(item);
                    }
                }
            }
            return result;
        }, []);

    return mergedOwners;
};

export const prepareDocumentsUploadData = (state, dispatch) => {
    let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.ws-services-masters.Documents",
        []
    );
    documents = documents.filter(item => {
        return item.active;
    });
    console.log('documents')
    console.log(documents)
    let documentsContract = [];
    let tempDoc = {};
    documents.forEach(doc => {
        let card = {};
        card["code"] = doc.documentType;
        card["title"] = doc.documentType;
        card["cards"] = [];
        tempDoc[doc.documentType] = card;
    });

    documents.forEach(doc => {
        // Handle the case for multiple muildings
        let card = {};
        card["name"] = doc.code;
        card["code"] = doc.code;
        card["required"] = doc.required ? true : false;
        if (doc.hasDropdown && doc.dropdownData) {
            let dropdown = {};
            dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
            dropdown.required = true;
            dropdown.menu = doc.dropdownData.filter(item => {
                return item.active;
            });
            dropdown.menu = dropdown.menu.map(item => {
                return { code: item.code, label: getTransformedLocale(item.code) };
            });
            card["dropdown"] = dropdown;
        }
        tempDoc[doc.documentType].cards.push(card);
    });

    Object.keys(tempDoc).forEach(key => {
        documentsContract.push(tempDoc[key]);
    });

    dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const applyForWaterOrSewerage = async (state, dispatch, activeIndex) => {

    let queryObject = JSON.parse(JSON.stringify(get(state.screenConfiguration.preparedFinalObject, "applyScreen", {})));
    queryObject.Property = JSON.parse(JSON.stringify(findAndReplace(get(state.screenConfiguration.preparedFinalObject, "Properties[0]"), "NA", null)));
    if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.water") && get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        await applyForBothWaterAndSewerage(state, dispatch, activeIndex, queryObject);
    } else if (get(state.screenConfiguration.preparedFinalObject, "applyScreen.sewerage")) {
        await applyForSewerage(state, dispatch, activeIndex, queryObject);
    } else {
        await applyForWater(state, dispatch, activeIndex, queryObject);
    }
}

const applyForWater = async (state, dispatch, activeIndex, queryObject) => {
    try {
        const tenantId = ifUserRoleExists("CITIZEN") ? "pb.amritsar" : getTenantId();
        set(queryObject, "tenantId", tenantId);
        if (queryObject.applicationNumber) {
            let action = "INITIATE";
            if (queryObject && queryObject.applicationDocuments) {
                if (getQueryArg(window.location.href, "action") === "edit") {
                    // Changes to be done on edit
                } else if (activeIndex === 1) {
                    // set(queryObject, queryObject.applicationDocuments", null);
                } else action = "APPLY";
            }
            set(queryObject, "action", action);
            const isEditFlow = getQueryArg(window.location.href, "action") === "edit";
            !isEditFlow && (await httpRequest("post", "/ws-services/wc/_update", "", [], { WaterConnection: queryObject }));
            let searchQueryObject = [{ key: "tenantId", value: queryObject.tenantId }, { key: "applicationNumber", value: queryObject.applicationNumber }];
            let searchResponse = await getSearchResults(searchQueryObject);
            if (isEditFlow) { searchResponse = { WaterConnection: queryObject }; }
            else { dispatch(prepareFinalObject("WaterConnection", searchResponse.WaterConnection)); }
            createOwnersBackup(dispatch, searchResponse);
        } else {
            set(queryObject, "action", "INITIATE");
            //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
            // if (!queryObject.applicationNumber) set(queryObject, "WaterConnection", null);
            const response = await httpRequest("post", "/ws-services/wc/_create", "", [], { WaterConnection: queryObject });
            dispatch(prepareFinalObject("WaterConnection", response.WaterConnections));
            createOwnersBackup(dispatch, response);
        }
        /** Application no. box setting */
        setApplicationNumberBox(state, dispatch);
        return true;
    } catch (error) {
        dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
        console.log(error);
        return false;
    }
}

const applyForSewerage = async (state, dispatch, activeIndex, queryObject) => {
    try {
        const tenantId = ifUserRoleExists("CITIZEN") ? "pb.amritsar" : getTenantId();
        set(queryObject, "tenantId", tenantId);
        if (queryObject.applicationNumber) {
            let action = "INITIATE";
            if (queryObject && queryObject.applicationDocuments) {
                if (getQueryArg(window.location.href, "action") === "edit") {
                    // Changes to be done on edit.
                } else if (activeIndex === 1) {
                    // set(queryObject, "tradeLicenseDetail", null);
                } else action = "APPLY";
            }
            set(queryObject, "action", action);
            const isEditFlow = getQueryArg(window.location.href, "action") === "edit";
            !isEditFlow && (await httpRequest("post", "/sw-services/swc/_update", "", [], { SewerageConnection: queryObject }));
            let searchQueryObject = [{ key: "tenantId", value: queryObject.tenantId }, { key: "applicationNumber", value: queryObject.applicationNumber }];
            let searchResponse = await getSearchResultsForSewerage(searchQueryObject);
            if (isEditFlow) { searchResponse = { SewerageConnection: queryObject }; }
            else { dispatch(prepareFinalObject("SewerageConnection", searchResponse.SewerageConnection)); }
            createOwnersBackup(dispatch, searchResponse);
        } else {
            set(queryObject, "action", "INITIATE");
            if (!queryObject.applicationNumber) set(queryObject, "SewerageConnection", null);
            const response = await httpRequest("post", "/sw-services/swc/_create", "", [], { SewerageConnection: queryObject });
            dispatch(prepareFinalObject("SewerageConnection", response.SewerageConnections));
            createOwnersBackup(dispatch, response);
        }
        setApplicationNumberBox(state, dispatch);
        return true;
    } catch (error) {
        dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
        console.log(error);
        return false;
    }
}

const applyForBothWaterAndSewerage = async (state, dispatch, activeIndex, queryObject) => {
    try {
        const tenantId = ifUserRoleExists("CITIZEN") ? "pb.amritsar" : getTenantId();
        set(queryObject, "tenantId", tenantId);
        if (queryObject.applicationNumber) {
            let action = "INITIATE";
            if (queryObject && queryObject.applicationDocuments) {
                if (getQueryArg(window.location.href, "action") === "edit") {
                    // Changes to be done on edit
                } else if (activeIndex === 1) {
                    // set(queryObject, queryObject.applicationDocuments", null);
                } else action = "APPLY";
            }
            set(queryObject, "action", action);
            const isEditFlow = getQueryArg(window.location.href, "action") === "edit";
            !isEditFlow &&
                (await httpRequest("post", "/ws-services/wc/_update", "", [], { WaterConnection: queryObject }) &&
                    await httpRequest("post", "/sw-services/swc/_update", "", [], { SewerageConnection: queryObject }));
            let searchQueryObject = [{ key: "tenantId", value: queryObject.tenantId }, { key: "applicationNumber", value: queryObject.applicationNumber }];
            let searchResponse = await getSearchResults(searchQueryObject);
            let sewerageResponse = await getSearchResults(searchQueryObject);
            if (isEditFlow) {
                searchResponse = { WaterConnection: queryObject };
                sewerageResponse = { SewerageConnection: queryObject };
            }
            else {
                dispatch(prepareFinalObject("WaterConnection", searchResponse.WaterConnections[0]));
                dispatch(prepareFinalObject("SewerageConnection", sewerageResponse.SewerageConnections[0]));
            }
            createOwnersBackup(dispatch, searchResponse);
            createOwnersBackup(dispatch, sewerageResponse);
        } else {
            set(queryObject, "action", "INITIATE");
            //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
            if (!queryObject.applicationNumber) {
                set(queryObject, "SewerageConnection", {})
                set(queryObject, "WaterConnection", {});
            }
            const response = await httpRequest("post", "/ws-services/wc/_create", "", [], { WaterConnection: queryObject });
            const sewerageResponse = await httpRequest("post", "/sw-services/swc/_create", "", [], { SewerageConnection: queryObject });
            dispatch(prepareFinalObject("WaterConnection", response.WaterConnection));
            dispatch(prepareFinalObject("SewerageConnection", sewerageResponse.SewerageConnection));
            createOwnersBackup(dispatch, response);
            createOwnersBackup(dispatch, sewerageResponse);
        }
        /** Application no. box setting */
        setApplicationNumberBox(state, dispatch);
        return true;
    } catch (error) {
        dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
        console.log(error);
        return false;
    }
}

const convertOwnerDobToEpoch = owners => {
    let updatedOwners =
        owners &&
        owners
            .map(owner => {
                return {
                    ...owner,
                    dob: owner && owner !== null && convertDateToEpoch(owner.dob, "dayend")
                };
            })
            .filter(item => item && item !== null);
    return updatedOwners;
};

export const getImageUrlByFile = file => {
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            const fileurl = e.target.result;
            resolve(fileurl);
        };
    });
};

export const getFileSize = file => {
    const size = parseFloat(file.size / 1024).toFixed(2);
    return size;
};

export const isFileValid = (file, acceptedFiles) => {
    const mimeType = file["type"];
    return (
        (mimeType &&
            acceptedFiles &&
            acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
        false
    );
};

const setApplicationNumberBox = (state, dispatch) => {
    let applicationNumberWater = get(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].applicationNo", null);
    let applicationNumberSewerage = get(state, "screenConfiguration.preparedFinalObject.SewerageConnection[0].applicationNo", null);
    if (applicationNumberSewerage && applicationNumberWater) {
        let applicationNumbers = applicationNumberWater.concat(" ", applicationNumberSewerage);
        handleApplicationNumberDisplay(dispatch, applicationNumbers)
    } else if (applicationNumberWater) {
        handleApplicationNumberDisplay(dispatch, applicationNumberWater)
    } else {
        handleApplicationNumberDisplay(dispatch, applicationNumberSewerage)
    }
};

const handleApplicationNumberDisplay = (dispatch, applicationNumber) => {
    dispatch(handleField("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch(handleField("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNumber));
}

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
    for (let i = 0; i < arr.length; i++) {
        if (conditionCheckerFn(arr[i])) {
            return arr[i];
        }
    }
};


export const getMdmsDataForMeterStatus = async (dispatch) => {
    let mdmsBody = {
        MdmsCriteria: {
            tenantId: commonConfig.tenantId,
            "moduleDetails": [
                {
                    "moduleName": "ws-services-calculation",
                    "masterDetails": [
                        {
                            "name": "MeterStatus",
                            "filter": "$.*.name"
                        }
                    ]
                }
            ]
        }
    };
    try {
        let payload = null;
        payload = await httpRequest(
            "post",
            "/egov-mdms-service/v1/_search",
            "_search",
            [],
            mdmsBody
        );
        // console.log(payload.MdmsRes)
        let data = payload.MdmsRes['ws-services-calculation'].MeterStatus.map(ele => {
            return { code: ele }
        })
        payload.MdmsRes['ws-services-calculation'].MeterStatus = data;
        dispatch(prepareFinalObject("meterMdmsData", payload.MdmsRes));

    } catch (e) {
        console.log(e);
    }
};
export const getMdmsDataForAutopopulated = async (dispatch) => {
    let mdmsBody = {
        MdmsCriteria: {
            tenantId: commonConfig.tenantId,
            moduleDetails: [
                {
                    moduleName: "ws-services-masters",
                    masterDetails: [
                        {
                            name: "billingPeriod"
                        }
                    ]
                },
            ]
        }
    };
    try {
        let connectionNo = getQueryArg(window.location.href, "connectionNos");
        let queryObject = [
            {
                key: "tenantId",
                value: JSON.parse(getUserInfo()).tenantId
            },
            { key: "offset", value: "0" },
            { key: "connectionNumber", value: connectionNo }
        ];
        const data = await getSearchResults(queryObject)
        let res = findAndReplace(data, null, "NA")
        let connectionType = res.WaterConnection[0].connectionType
        let payload = {
            "MdmsRes": {
                "ws-services-masters": {
                    "billingPeriod": [
                        {
                            "active": true,
                            "connectionType": "Metered",
                            "billingCycle": "monthly"
                        },
                        {
                            "active": true,
                            "connectionType": "Non Metered",
                            "billingCycle": "quarterly"
                        }
                    ]
                }
            }
        }

        let billingCycle;
        payload.MdmsRes['ws-services-masters'].billingPeriod.map((x) => {
            if (x.connectionType === connectionType) {
                billingCycle = x.billingCycle
            }
        })
        dispatch(prepareFinalObject("billingCycle", billingCycle));

    } catch (e) {
        console.log(e);
    }
}

export const getMeterReadingData = async (dispatch) => {
    let queryObject = [
        {
            key: "tenantId",
            value: "pb.amritsar"
        },
        {
            key: "connectionNos",
            value: getQueryArg(window.location.href, "connectionNos")
        },
        { key: "offset", value: "0" }
    ];

    try {
        const response = await getConsumptionDetails(queryObject, dispatch);
        const data = findAndReplace(response, null, "NA");
        if (data && data.meterReadings && data.meterReadings.length > 0) {
            dispatch(prepareFinalObject("consumptionDetails", data.meterReadings));
            dispatch(
                prepareFinalObject("consumptionDetailsCount", data.meterReadings.length)
            );
        }
    } catch (error) {
        console.log(error);
    }
};

export const getPastPaymentsForWater = async (dispatch) => {
    dispatch(toggleSpinner());
    let queryObject = [
        {
            key: "tenantId",
            value: "pb.amritsar"
        },
        {
            key: "businessServices",
            value: "WS"
        },
        {
            key: "uuid",
            value: JSON.parse(getUserInfo()).uuid.toString()
        },
    ];
    try {
        const response = await httpRequest(
            "post",
            "/collection-services/payments/_search",
            "_search",
            queryObject
        );
        dispatch(toggleSpinner());
        if (response && response.Payments) {
            dispatch(prepareFinalObject("pastPaymentsForWater", response.Payments));
        }
        return findAndReplace(response, null, "NA");;
    } catch (error) {
        dispatch(toggleSpinner());
        store.dispatch(
            toggleSnackbar(
                true, { labelName: error.message, labelCode: error.message },
                "error"
            )
        );
    }
}

export const getPastPaymentsForSewerage = async (dispatch) => {
    dispatch(toggleSpinner());
    let queryObject = [
        {
            key: "tenantId",
            value: "pb.amritsar"
        },
        {
            key: "businessServices",
            value: "SW"
        },
        {
            key: "uuid",
            value: JSON.parse(getUserInfo()).uuid.toString()
        }
    ];
    try {
        const response = await httpRequest(
            "post",
            "/collection-services/payments/_search",
            "_search",
            queryObject
        );
        dispatch(toggleSpinner());
        if (response && response.Payments) {
            dispatch(prepareFinalObject("pastPaymentsForSewerage", response.Payments));
        }
        return findAndReplace(response, null, "NA");;
    } catch (error) {
        dispatch(toggleSpinner());
        store.dispatch(
            toggleSnackbar(
                true, { labelName: error.message, labelCode: error.message },
                "error"
            )
        );
    }
}

export const createMeterReading = async (dispatch, body) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/ws-calculator/meterConnection/_create",
            "", [], { meterReadings: body }
        );
        if (response && response !== undefined && response !== null) {
            getMeterReadingData(dispatch);
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.secondContainer.children.status.props",
                    "value",
                    "Working"
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                    "disabled",
                    false
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                    "disabled",
                    false
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont",
                    "visible",
                    true
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont",
                    "visible",
                    false
                )
            );
            let todayDate = new Date()
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fifthContainer.children.currentReadingDate.props",
                    "value",
                    todayDate
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.fourthContainer.children.currentReading.props",
                    "value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.thirdCont.props",
                    "value",
                    ""
                )
            );
            dispatch(
                handleField(
                    "meter-reading",
                    "components.div.children.meterReadingEditable.children.card.children.cardContent.children.sixthContainer.children.secCont.children.billingPeriod.props",
                    "labelName",
                    ""
                )
            );
        }
        dispatch(
            handleField(
                "meter-reading",
                "components.div.children.meterReadingEditable",
                "visible",
                false
            )
        );
        dispatch(prepareFinalObject("metereading", {}));
        dispatch(toggleSpinner());
    } catch (error) {
        dispatch(toggleSpinner());
        store.dispatch(
            toggleSnackbar(
                true, { labelName: error.message, labelCode: error.message },
                "error"
            )
        );
    }
}

export const wsDownloadConnectionDetails = (receiptQueryString, mode, dispatch) => {
    const FETCHCONNECTIONDETAILS = {
        GET: {
            URL: "/ws-services/wc/_search",
            ACTION: "_post",
        },
    };
    const DOWNLOADCONNECTIONDETAILS = {
        GET: {
            URL: "/pdf-service/v1/_create",
            ACTION: "_get",
        },
    };

    const FETCHSWCONNECTIONDETAILS = {
        GET: {
            URL: "/sw-services/swc/_search",
            ACTION: "_post",
        },
    };
    const service = getQueryArg(window.location.href, "service")

    switch (service) {
        case 'WATER':
            try {
                httpRequest("post", FETCHCONNECTIONDETAILS.GET.URL, FETCHCONNECTIONDETAILS.GET.ACTION, receiptQueryString).then(async (payloadReceiptDetails) => {
                    const queryStr = [
                        { key: "key", value: "ws-consolidatedacknowlegment" },
                        { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
                    ]

                    if (payloadReceiptDetails.WaterConnection[0].rainWaterHarvesting !== undefined && payloadReceiptDetails.WaterConnection[0].rainWaterHarvesting !== null) {
                        if (payloadReceiptDetails.WaterConnection[0].rainWaterHarvesting === true) {
                            payloadReceiptDetails.WaterConnection[0].rainWaterHarvesting = 'SCORE_YES'
                        } else {
                            payloadReceiptDetails.WaterConnection[0].rainWaterHarvesting = 'SCORE_NO'
                        }
                    }

                    if (payloadReceiptDetails.WaterConnection[0].property.propertyType !== null && payloadReceiptDetails.WaterConnection[0].property.propertyType !== undefined) {
                        const propertyTpe = "[?(@.code  == " + JSON.stringify(payloadReceiptDetails.WaterConnection[0].property.propertyType) + ")]"
                        let propertyTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "PropertyType", filter: `${propertyTpe}` }] }] } }
                        const mdmsPropertyType = await getDescriptionFromMDMS(propertyTypeParams, dispatch)
                        payloadReceiptDetails.WaterConnection[0].property.propertyTypeValue = mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name;//propertyType from Mdms
                    }

                    if (payloadReceiptDetails.WaterConnection[0].property.usageCategory !== null && payloadReceiptDetails.WaterConnection[0].property.usageCategory !== undefined) {
                        const propertyUsageType = "[?(@.code  == " + JSON.stringify(payloadReceiptDetails.WaterConnection[0].property.usageCategory) + ")]"
                        let propertyUsageTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "UsageCategoryMajor", filter: `${propertyUsageType}` }] }] } }
                        const mdmsPropertyUsageType = await getDescriptionFromMDMS(propertyUsageTypeParams, dispatch)
                        payloadReceiptDetails.WaterConnection[0].property.propertyUsageType = mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor[0].name;//propertyUsageType from Mdms
                    }


                    httpRequest("post", DOWNLOADCONNECTIONDETAILS.GET.URL, DOWNLOADCONNECTIONDETAILS.GET.ACTION, queryStr, { WaterConnection: payloadReceiptDetails.WaterConnection }, { 'Accept': 'application/pdf' }, { responseType: 'arraybuffer' })
                        .then(res => {
                            getFileUrlFromAPI(res.filestoreIds[0]).then((fileRes) => {
                                if (mode === 'download') {
                                    var win = window.open(fileRes[res.filestoreIds[0]], '_blank');
                                    win.focus();
                                }
                                else {
                                    printJS(fileRes[res.filestoreIds[0]])
                                }
                            });

                        });
                })

            } catch (exception) {
                alert('Some Error Occured while downloading!');
            }
            break;
        case 'SEWERAGE':
            try {
                httpRequest("post", FETCHSWCONNECTIONDETAILS.GET.URL, FETCHSWCONNECTIONDETAILS.GET.ACTION, receiptQueryString).then(async (payloadReceiptDetails) => {
                    const queryStr = [
                        { key: "key", value: "ws-consolidatedsewerageconnection" },
                        { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
                    ]

                    if (payloadReceiptDetails.SewerageConnections[0].property.propertyType !== null && payloadReceiptDetails.SewerageConnections[0].property.propertyType !== undefined) {
                        const propertyTpe = "[?(@.code  == " + JSON.stringify(payloadReceiptDetails.SewerageConnections[0].property.propertyType) + ")]"
                        let propertyTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "PropertyType", filter: `${propertyTpe}` }] }] } }
                        const mdmsPropertyType = await getDescriptionFromMDMS(propertyTypeParams, dispatch)
                        payloadReceiptDetails.SewerageConnections[0].property.propertyTypeValue = mdmsPropertyType.MdmsRes.PropertyTax.PropertyType[0].name;//propertyType from Mdms
                    }

                    if (payloadReceiptDetails.SewerageConnections[0].property.usageCategory !== null && payloadReceiptDetails.SewerageConnections[0].property.usageCategory !== undefined) {
                        const propertyUsageType = "[?(@.code  == " + JSON.stringify(payloadReceiptDetails.SewerageConnections[0].property.usageCategory) + ")]"
                        let propertyUsageTypeParams = { MdmsCriteria: { tenantId: "pb", moduleDetails: [{ moduleName: "PropertyTax", masterDetails: [{ name: "UsageCategoryMajor", filter: `${propertyUsageType}` }] }] } }
                        const mdmsPropertyUsageType = await getDescriptionFromMDMS(propertyUsageTypeParams, dispatch)
                        payloadReceiptDetails.SewerageConnections[0].property.propertyUsageType = mdmsPropertyUsageType.MdmsRes.PropertyTax.UsageCategoryMajor[0].name;//propertyUsageType from Mdms
                    }

                    httpRequest("post", DOWNLOADCONNECTIONDETAILS.GET.URL, DOWNLOADCONNECTIONDETAILS.GET.ACTION, queryStr, { SewerageConnections: payloadReceiptDetails.SewerageConnections }, { 'Accept': 'application/pdf' }, { responseType: 'arraybuffer' })
                        .then(res => {
                            getFileUrlFromAPI(res.filestoreIds[0]).then((fileRes) => {
                                if (mode === 'download') {
                                    var win = window.open(fileRes[res.filestoreIds[0]], '_blank');
                                    win.focus();
                                }
                                else {
                                    printJS(fileRes[res.filestoreIds[0]])
                                }
                            });

                        });
                })

            } catch (exception) {
                alert('Some Error Occured while downloading!');
            }
            break;
    }
}


export const getSWMyConnectionResults = async (queryObject, dispatch) => {
    dispatch(toggleSpinner());
    try {
        const response = await httpRequest(
            "post",
            "/sw-services/swc/_search",
            "_search",
            queryObject
        );
        if (response.SewerageConnections.length > 0) {
            for (let i = 0; i < response.SewerageConnections.length; i++) {
                response.SewerageConnections[i].service = "Sewerage"
                try {
                    const data = await httpRequest(
                        "post",
                        `billing-service/bill/v2/_fetchbill?consumerCode=${response.SewerageConnections[i].connectionNo}&tenantId=${response.SewerageConnections[i].property.tenantId}&businessService=SW`,
                        "_fetchbill",
                        // queryObject
                    );
                    if (data && data !== undefined) {
                        if (data.Bill !== undefined && data.Bill.length > 0) {
                            response.SewerageConnections[i].due = data.Bill[0].totalAmount
                        }

                    } else {
                        response.SewerageConnections[i].due = 0
                    }

                } catch (err) {
                    console.log(err)
                    response.SewerageConnections[i].due = "NA"
                }
            }
            // });
        }
        dispatch(toggleSpinner());
        return findAndReplace(response, null, "NA");
    } catch (error) {
        dispatch(toggleSpinner());
        console.log(error);
    }

};

export const downloadBill = (receiptQueryString, mode = "download") => {
    const FETCHBILL = {
        GET: {
            URL: "/billing-service/bill/v2/_fetchbill",
            ACTION: "_get",
        },
    };
    const DOWNLOADBILL = {
        GET: {
            URL: "/pdf-service/v1/_create",
            ACTION: "_get",
        },
    };

    try {
        httpRequest("post", FETCHBILL.GET.URL, FETCHBILL.GET.ACTION, receiptQueryString).then((payloadReceiptDetails) => {
            const queryStr = [
                { key: "key", value: "consolidatedbill" },
                { key: "tenantId", value: receiptQueryString[1].value.split('.')[0] }
            ]
            httpRequest("post", DOWNLOADBILL.GET.URL, DOWNLOADBILL.GET.ACTION, queryStr, { Bill: payloadReceiptDetails.Bill }, { 'Accept': 'application/pdf' }, { responseType: 'arraybuffer' })
                .then(res => {
                    getFileUrlFromAPI(res.filestoreIds[0]).then((fileRes) => {
                        if (mode === 'download') {
                            var win = window.open(fileRes[res.filestoreIds[0]], '_blank');
                            win.focus();
                        }
                        else {
                            printJS(fileRes[res.filestoreIds[0]])
                        }
                    });

                });
        })

    } catch (exception) {
        alert('Some Error Occured while downloading Bill!');
    }
}

let findAndReplace = (obj, oldValue, newValue) => {
    Object.keys(obj).forEach(key => {
        if ((obj[key] instanceof Object) || (obj[key] instanceof Array)) findAndReplace(obj[key], oldValue, newValue)
        obj[key] = obj[key] === oldValue ? newValue : obj[key]
    })
    return obj
}