import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getIconStyle,
  objectToDropdown,
  getTodaysDateInYMD,
  getFinancialYearDates,
  getNextMonthDateInYMD,
  getUniqueItemsFromArray,
} from "../../utils";
import {
  prepareFinalObject as pFO,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import filter from "lodash/filter";
import "./index.css";

const tradeUnitCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonContainer({
      tradeUnitCardContainer: getCommonContainer(
        {
          tradeCategory: {
            ...getSelectField({
              label: {
                labelName: "Trade Category",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
              },
              placeholder: {
                labelName: "Select Trade Category",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_PLACEHOLDER"
              },
              required: true,
              jsonPath: "LicensesTemp.tradeUnits[0].tradeType",
              sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
              localePrefix: {
                moduleName: "TRADELICENSE",
                masterName: "TRADETYPE"
              },
              props: {
                jsonPathUpdatePrefix: "LicensesTemp.tradeUnits",
                setDataInField: true,
                className:"applicant-details-error"
              },
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
            }),
            beforeFieldChange: (action, state, dispatch) => {
              try {
                dispatch(
                  pFO(
                    "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
                    objectToDropdown(
                      get(
                        state.screenConfiguration.preparedFinalObject,
                        `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${
                          action.value
                        }`,
                        []
                      )
                    )
                  )
                );
                let componentPath = action.componentJsonpath.split(".");

                let index = action.componentJsonpath
                  .split("[")[1]
                  .split("]")[0];
                componentPath.pop();
                componentPath.push("tradeType");
                componentPath = componentPath.join(".");
                dispatch(
                  handleField(
                    "apply",
                    componentPath,
                    "props.data",
                    objectToDropdown(
                      get(
                        state.screenConfiguration.preparedFinalObject,
                        `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${
                          action.value
                        }`,
                        []
                      )
                    )
                  )
                );
                let tradeCat = get(
                  state.screenConfiguration.preparedFinalObject,
                  `LicensesTemp.tradeUnits[${parseInt(index)}].tradeType`
                );
                if (tradeCat != action.value) {
                  dispatch(
                    pFO(
                      `LicensesTemp.tradeUnits[${parseInt(
                        index
                      )}].tradeSubType`,
                      ""
                    )
                  );
                  dispatch(
                    pFO(
                      `Licenses[0].tradeLicenseDetail.tradeUnits[${parseInt(
                        index
                      )}].tradeType`,
                      ""
                    )
                  );
                }

                let cardIndex = action.componentJsonpath
                  .split("items[")[1]
                  .split("]")[0];
                let tradeCategory = get(
                  state.screenConfiguration.preparedFinalObject,
                  `LicensesTemp.tradeUnits[${cardIndex}].tradeType`,
                  ""
                );
                dispatch(
                  pFO(
                    "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
                    get(
                      state.screenConfiguration.preparedFinalObject,
                      `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${tradeCategory}.${
                        action.value
                      }`,
                      []
                    )
                  )
                );

                if(action.value === "INTERSTATE"){

                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromState",
                      "visible",
                      true
                    )
                  );

                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromDistrict",
                      "visible",
                      false
                    )
                  );

                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromDistrictText",
                      "visible",
                      true
                    )
                  );

                } else {
                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromState",
                      "visible",
                      false
                    )
                  );

                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromDistrict",
                      "visible",
                      true
                    )
                  );

                  dispatch(
                    handleField(
                      "apply",
                      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.fromDistrictText",
                      "visible",
                      false
                    )
                  );
                }

                dispatch(pFO("Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", action.value));
              } catch (e) {
                console.log(e);
              }
              }
          },
          tradeType: {
            ...getSelectField({
              label: {
                labelName: "Trade Type",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL"
              },
              placeholder: {
                labelName: "Select Trade Type",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_PLACEHOLDER"
              },
              required: true,
              visible: false,
              localePrefix: {
                moduleName: "TRADELICENSE",
                masterName: "TRADETYPE"
              },
              jsonPath: "LicensesTemp.tradeUnits[0].tradeSubType",
              props: {
                jsonPathUpdatePrefix: "LicensesTemp.tradeUnits",
                className:"applicant-details-error"
              },
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
            }),
            beforeFieldChange: (action, state, dispatch) => {
              try {
                let cardIndex = action.componentJsonpath
                  .split("items[")[1]
                  .split("]")[0];
                let tradeCategory = get(
                  state.screenConfiguration.preparedFinalObject,
                  `LicensesTemp.tradeUnits[${cardIndex}].tradeType`,
                  ""
                );
                dispatch(
                  pFO(
                    "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
                    get(
                      state.screenConfiguration.preparedFinalObject,
                      `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${tradeCategory}.${
                        action.value
                      }`,
                      []
                    )
                  )
                );
                let componentPath = action.componentJsonpath.split(".");
                componentPath.pop();
                componentPath.push("tradeSubType");
                componentPath = componentPath.join(".");
                dispatch(
                  handleField(
                    "apply",
                    componentPath,
                    "props.data",
                    get(
                      state.screenConfiguration.preparedFinalObject,
                      `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${tradeCategory}.${
                        action.value
                      }`,
                      []
                    )
                  )
                );
                let finalTradeType = tradeCategory + "." + action.value + "." + action.value;
               dispatch(pFO("Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", finalTradeType));
              } catch (e) {
                console.log(e);
              }
            }
          },
          tradeSubType: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-tradelicence",
            componentPath: "AutosuggestContainer",
            jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
            required: false,
            visible: false,
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              style: {
                width: "100%",
                cursor: "pointer"
              },
              label: {
                labelName: "Trade Sub-Type",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
              },

              placeholder: {
                labelName: "Select Trade Sub-Type",
                labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_PLACEHOLDER"
              },
              jsonPath:
                "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
              setDataInField: true,
              labelsFromLocalisation: true,
              localePrefix: {
                moduleName: "TRADELICENSE",
                masterName: "TRADETYPE"
              },
              fullwidth: true,
              required: true,
              inputLabelProps: {
                shrink: true
              }
            },
            beforeFieldChange: (action, state, dispatch) => {
              try {
                let cardIndex = action.componentJsonpath
                  .split("items[")[1]
                  .split("]")[0];
                const tradeSubTypes = get(
                  state.screenConfiguration,
                  "preparedFinalObject.Licenses[0].tradeLicenseDetail.tradeUnits",
                  []
                );
                const alreadySelected =
                  tradeSubTypes &&
                  tradeSubTypes.find((item, i) => {
                    if (item.tradeType === action.value && cardIndex != i)
                      return true;
                  });
                if (alreadySelected) {
                  dispatch(
                    toggleSnackbar(
                      true,
                      {
                        labelName:
                          "This trade type is already selected, Please select another",
                        labelKey: "TL_TRADE_TYPE_ALREADY_SELECTED"
                      },
                      "warning"
                    )
                  );

                  action.value = null;
                } else {
                  let tradeType = get(
                    state.screenConfiguration.preparedFinalObject,
                    `LicensesTemp.tradeUnits[${cardIndex}].tradeType`,
                    ""
                  );
                  let tradeCategory = get(
                    state.screenConfiguration.preparedFinalObject,
                    `LicensesTemp.tradeUnits[${cardIndex}].tradeSubType`,
                    ""
                  );
                  let tradeSubCategories = get(
                    state.screenConfiguration.preparedFinalObject,
                    `applyScreenMdmsData.TradeLicense.filteredTradeTypeTree.${tradeType}.${tradeCategory}`,
                    []
                  );
                  tradeSubCategories = getUniqueItemsFromArray(
                    tradeSubCategories,
                    "code"
                  );
                  let currentObject = filter(tradeSubCategories, {
                    code: action.value
                  });
                  if (currentObject[0].uom !== null) {
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOM"
                        ),
                        "props.value",
                        currentObject[0].uom
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.required",
                        true
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.disabled",
                        false
                      )
                    );
                  } else {
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.required",
                        false
                      )
                    );

                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.disabled",
                        true
                      )
                    );

                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOM"
                        ),
                        "props.value",
                        ""
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.value",
                        ""
                      )
                    );

                    dispatch(
                      pFO(
                        `Licenses[0].tradeLicenseDetail.tradeUnits[${cardIndex}].uom`,
                        null
                      )
                    );
                    dispatch(
                      pFO(
                        `Licenses[0].tradeLicenseDetail.tradeUnits[${cardIndex}].uomValue`,
                        null
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.error",
                        false
                      )
                    );
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }
          },
          tradeUOM: getTextField({
            label: {
              labelName: "Vehicle Number",
              labelKey: "TL_NEW_TRADE_DETAILS_VEHICLE_LABEL"
            },
            placeholder: {
              labelName: "Vehicle Number",
              labelKey: "TL_NEW_TRADE_DETAILS_VEHICLE_PLACEHOLDER"
            },
            // required: true,
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.vehicleNumber",
            gridDefination: {
              xs: 12,
              sm: 4
            },
            required:false,
            visible: false
          }),
          purpose: {
            ...getSelectField({
              label: {
                labelName: "Purpose",
                labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE"
              },
              placeholder: {
                labelName: "Select a Purpose",
                labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE_PLACEHOLDER"
              },
              localePrefix: {
                moduleName: "TRADELICENSE",
                masterName: "PURPOSE"
              },
              required: true,
              jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purpose",
              sourceJsonPath: "applyScreenMdmsData.TradeLicense.Purpose",
              props: {
                className: "tl-trade-type",
              }
            }),
          },
          purposeDetail: getTextField({
            label: {
              labelName: "Purpose Details",
              labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE_DETAILS"
            },
            props:{
              className:"applicant-details-error",
              multiline: true
            },
            placeholder: {
              labelName: "Descirbe the purpose",
              labelKey: "TL_NEW_TRADE_DETAILS_PURPOSE_DETAILS_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("eventDescription"),
            jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.purposeDetail"
          }),
        },
        {
          style: {
            overflow: "visible"
          }
        }
      )
    }),
    items: [],
    addItemLabel: {
      labelName: "ADD TRADE UNITS",
      labelKey: "TL_ADD_TRADE_UNITS"
    },
    headerName: "TradeUnits",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children",
    onMultiItemAdd: (state, muliItemContent) => {
      return setFieldsOnAddItem(state, muliItemContent);
    },
    hasAddItem:false
  },
  type: "array"
};

export const tradeDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Trade Details",
      labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  
  tradeUnitCard,
  tradeDetailsConatiner: getCommonContainer({
    fromState: {
      ...getSelectField({
        label: {
          labelName: "From State",
          labelKey: "TL_FROM_STATE_LABEL"
        },
        placeholder: {
          labelName: "Select From State",
          labelKey: "TL_FROM_STATE_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TRADELICENSE",
          masterName: "STATE"
        },
        required: true,
        visible: false,
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.fromState",
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.State",
        props: {
          className: "tl-trade-type",
        }
      }),
    },
    fromDistrict: {
      ...getSelectField({
        label: {
          labelName: "From District",
          labelKey: "TL_FROM_DISTRICT_LABEL"
        },
        placeholder: {
          labelName: "Select From District",
          labelKey: "TL_FROM_DISTRICT_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TRADELICENSE",
          masterName: "DISTRICT"
        },
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.fromDistrict",
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.District",
        props: {
          className: "tl-trade-type",
        }
      }),
      visible: true
    },
    fromDistrictText: getTextField({
      label: {
        labelName: "From District",
        labelKey: "TL_FROM_DISTRICT_TEXT_LABEL"
      },
      props:{
        className:"applicant-details-error"
      },
      placeholder: {
        labelName: "Enter From District",
        labelKey: "TL_FROM_DISTRICT_TEXT_PLACEHOLDER"
      },
      required: true,
      visible: false,
      pattern: getPattern("TradeName"),
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.fromDistrict"
    }),
    toDistrict: {
      ...getSelectField({
        label: {
          labelName: "To District",
          labelKey: "TL_TO_DISTRICT_LABEL"
        },
        placeholder: {
          labelName: "Select To District",
          labelKey: "TL_TO_DISTRICT_PLACEHOLDER"
        },
        localePrefix: {
          moduleName: "TRADELICENSE",
          masterName: "DISTRICT"
        },
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.toDistrict",
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.District",
        props: {
          className: "tl-trade-type",
        }
      }),
      visible: true
    },
  },
  {style:getQueryArg(window.location.href, "action") === "EDITRENEWAL"? {"cursor":"not-allowed"}:{}},
  ),
  // accessoriesCard
});

const setFieldsOnAddItem = (state, multiItemContent) => {
  const preparedFinalObject = JSON.parse(
    JSON.stringify(state.screenConfiguration.preparedFinalObject)
  );
  for (var variable in multiItemContent) {
    const value = get(
      preparedFinalObject,
      multiItemContent[variable].props.jsonPath
    );
    if (multiItemContent[variable].props.setDataInField && value) {
      if (
        multiItemContent[variable].props.jsonPath.split(".")[0] ===
          "LicensesTemp" &&
        multiItemContent[variable].props.jsonPath.split(".").pop() ===
          "tradeType"
      ) {
        const tradeTypeData = get(
          preparedFinalObject,
          `applyScreenMdmsData.TradeLicense.TradeType`,
          []
        );
        const tradeTypeDropdownData =
          tradeTypeData &&
          tradeTypeData.TradeType &&
          Object.keys(tradeTypeData.TradeType).map(item => {
            return { code: item, active: true };
          });
        multiItemContent[variable].props.data = tradeTypeDropdownData;
        const data = tradeTypeData[value];
        if (data) {
          multiItemContent["tradeType"].props.data = this.objectToDropdown(
            data
          );
        }
      } else if (
        multiItemContent[variable].props.jsonPath.split(".").pop() ===
        "tradeType"
      ) {
        const data = get(
          preparedFinalObject,
          `applyScreenMdmsData.TradeLicense.TradeType.${value.split(".")[0]}.${
            value.split(".")[1]
          }`
        );
        if (data) {
          multiItemContent[variable].props.data = data;
        }
      } else if (
        multiItemContent[variable].props.jsonPath.split(".").pop() ===
          "uomValue" &&
        value > 0
      ) {
        multiItemContent[variable].props.disabled = false;
        multiItemContent[variable].props.required = true;
      }
    }
    if (
      multiItemContent[variable].props.setDataInField &&
      multiItemContent[variable].props.disabled
    ) {
      if (
        multiItemContent[variable].props.jsonPath.split(".").pop() ===
        "uomValue"
      ) {
        const disabledValue = get(
          state.screenConfiguration.screenConfig["apply"],
          `${multiItemContent[variable].componentJsonpath}.props.disabled`,
          true
        );
        multiItemContent[variable].props.disabled = disabledValue;
      }
    }
  }
  return multiItemContent;
};
