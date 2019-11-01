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
    setFilteredTradeTypes,
    getUniqueItemsFromArray,
    fillOldLicenseData,
    getTradeTypeDropdownData
  } from "../../utils";
  import {
    prepareFinalObject as pFO,
    toggleSnackbar
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import get from "lodash/get";
  import filter from "lodash/filter";
  


const serviceCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
        scheama: getCommonGrayCard({
            header: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                children: {
                    head: getCommonSubHeader(
                        {
                            labelName: "Service Details",
                            labelKey: "Service Details" // TL_NEW_TRADE_DETAILS_HEADER_ACC
                        },
                        {
                            style: {
                                marginBottom: 18
                            }
                        }
                    ),
                }
            },
            serviceCardContainer: getCommonContainer({
                serviceType: {
                    ...getLabelWithValue(
                        {
                            labelName: "Service Type",
                            labelKey: "Service Type"
                        }
                    )
                },
                propertyUsage: {
                    ...getLabelWithValue(
                        {
                            labelName: "Property Usage Type",
                            labelKey: "Property Usage Type"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                        },
                    )
                },
                connectionType: {
                    ...getLabelWithValue(
                        {
                            labelName: "Connection Type",
                            labelKey: "Connection Type"
                        })
                },

                meterId: {
                    ...getLabelWithValue(
                        {
                            labelName: "Meter ID",
                            labelKey: "Meter ID"
                        },
                    )
                },
                currentMeter: {
                    ...getLabelWithValue(
                        {
                            labelName: "Current Meter Reading",
                            labelKey: "Current Meter Reading"
                        },
                    )
                },
                meterReadingStatus: {
                    ...getLabelWithValue(
                        {
                            labelName: "Meter Reading Status",
                            labelKey: "Meter Reading Status"
                        },
                    )
                },
                lastMeterReading: {
                    ...getLabelWithValue(
                        {
                            labelName: "Last Meter Reading",
                            labelKey: "Last Meter Reading"
                        },
                    )
                },
                meterStatus: {
                    ...getLabelWithValue(
                        {
                            labelName: "Meter Status",
                            labelKey: "Meter Status"
                        },
                    )
                },
                consumption: {
                    ...getLabelWithValue(
                        {
                            labelName: "Consumption",
                            labelKey: "Consumption"
                        },
                    )
                }
            })

        }),
        onMultiItemAdd: (state, muliItemContent) => {
            return setFieldsOnAddItem(state, muliItemContent);
        },
        items: [],
    },
    type: "array"
}

const propertyCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
        scheama: getCommonGrayCard({
            header: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                children: {
                    head: getCommonSubHeader(
                        {
                            labelName: "Property Details",
                            labelKey: "Property Details" // TL_NEW_TRADE_DETAILS_HEADER_ACC
                        },
                        {
                            style: {
                                marginBottom: 18
                            }
                        }
                    ),
                }
            },
            propertyCardContainer: getCommonContainer({
                propertyCity: {
                    ...getLabelWithValue(
                        {
                            labelName: "City",
                            labelKey: "City"
                        }
                    )
                },
                propertyDoorNo: {
                    ...getLabelWithValue(
                        {
                            labelName: "Door / House No",
                            labelKey: "Door / House No"// TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP
                        },
                    )
                },
                propertyBuilding: {
                    ...getLabelWithValue(
                        {
                            labelName: "Building / Company Name",
                            labelKey: "Building / Company Name"
                        })
                },

                propertyStreet: {
                    ...getLabelWithValue(
                        {
                            labelName: "Street Name",
                            labelKey: "Street Name"
                        },
                    )
                },
                propertyMohalla: {
                    ...getLabelWithValue(
                        {
                            labelName: "Mohalla",
                            labelKey: "Mohalla"
                        },
                    )
                },
                propertyPincode: {
                    ...getLabelWithValue(
                        {
                            labelName: "Pincode",
                            labelKey: "Pincode"
                        },
                    )
                }
            })
        })
    }
};

const ownerCard = {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
        scheama: getCommonGrayCard({
            header: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                children: {
                    head: getCommonSubHeader(
                        {
                            labelName: "Owner Details",
                            labelKey: "Owner Details" // TL_NEW_TRADE_DETAILS_HEADER_ACC
                        },
                        {
                            style: {
                                marginBottom: 18
                            }
                        }
                    ),
                }
            },

            ownerCardContainer: getCommonContainer({
                ownerName: {
                    ...getLabelWithValue(
                        {
                            labelName: "Name",
                            labelKey: "Name"
                        }
                    )
                },
                CorrespondenceAddress: {
                    ...getLabelWithValue(
                        {
                            labelName: "CorrespondenceAddress",
                            labelKey: "CorrespondenceAddress"
                        })
                },

            })
        })
    }
};

export const waterDetails = getCommonCard({
    waterDetailsConatiner: getCommonContainer({
    }),
    serviceCard,
    propertyCard,
    ownerCard
})

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

