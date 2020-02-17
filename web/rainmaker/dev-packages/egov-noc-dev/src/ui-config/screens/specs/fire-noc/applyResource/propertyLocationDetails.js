import {uniqBy} from "lodash/uniqBy";
import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getPattern,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import { httpRequest } from "../../../../../ui-utils/api";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";
import set from "lodash/set";
import { object } from "prop-types";

const showHideMapPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog.props.open",
    false
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog",
      "props.open",
      !toggle
    )
  );
};

const getMapLocator = textSchema => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-noc",
    componentPath: "MapLocator",
    props: {}
  };
};

const getDetailsFromProperty = async (state, dispatch) => {
  try {
    const propertyId = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId",
      ""
    );

    const tenantId = getTenantId();
    if (!tenantId) {
      dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "Please select city to search by property id !!",
            labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
          },
          "warning"
        )
      );
      return;
    }
    if (propertyId) {
      let payload = await httpRequest(
        "post",
        `/pt-services-v2/property/_search?tenantId=${tenantId}&ids=${propertyId}`,
        "_search",
        [],
        {}
      );
      if (
        payload &&
        payload.Properties &&
        payload.Properties.hasOwnProperty("length")
      ) {
        if (payload.Properties.length === 0) {
          dispatch(
            toggleSnackbar(
              true,
              {
                labelName: "Property is not found with this Property Id",
                labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
              },
              "info"
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID",
              "props.value",
              ""
            )
          );
        } else {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
              "props.value",
              {
                value: payload.Properties[0].address.locality.code,
                label: payload.Properties[0].address.locality.name
              }
            )
          );
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address",
              payload.Properties[0].address
            )
          );
          // dispatch(
          //   handleField(
          //     "apply",
          //     "components.div.children.formwizardSecondStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown",
          //     "props.value",
          //     payload.Properties[0].address.tenantId
          //   )
          // );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const propertyLocationDetails = getCommonCard(
  {
    header: getCommonTitle(
      {
        labelName: "Property Location Details",
        labelKey: "NOC_PROPERTY_LOCATION_DETAILS_HEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),

    propertyDetailsConatiner: getCommonContainer({
      area: {
        ...getSelectField({
          label: {
            labelName: "area",
            labelKey: "area"
          },
          placeholder: {
            labelName: "area",
            labelKey: "area"
          },
          data: [
            {
              code: "Urban",
              label: "TL_PAYMENT_BY_OWNER"
            },
            {
              code: "Rural",
              label: "TL_PAYMENT_BY_OTHERS"
            }
          ],
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.area",
          required: true
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.area",
              action.value
            )
          );
          if(action.value=='Rural'){
            if(state.screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.propertyDetails.district){
              dispatch(
                handleField(
                  "apply",
                  "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
                  "props.value",
                  null
                )
              );
            }
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.subDistrict",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyFirestation",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyCity",
                "visible",
                false
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
                "visible",
                false
              )
            );
          const districtData= get(
            state.screenConfiguration,
            "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
            []
          );
          const newDistrictData =districtData.map((item)=>{
            return {
              name:item.city.districtName,
              code:item.code
            }

          });
          const fireStationsList = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
            []
          );
          const newdata=[];
          for(var i=0;i< fireStationsList.length;i++)
          {
            for(var j=0;j<newDistrictData.length;j++)
            {
              if(newDistrictData[j].code==fireStationsList[i].baseTenantId)
              {
                
                newdata.push({
                  code:newDistrictData[j].name
                })
              }
            }
          }
          const unqdata=newdata.filter( (ele, ind) => ind === newdata.findIndex( elem => elem.code === ele.code));
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.firestationId",
              null
            )
          );
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
              null
            )
          );
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
              null
            )
          );
          dispatch(
            prepareFinalObject(
              "applyScreenMdmsData.tenant.District",
              unqdata
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
              "props.data",
              unqdata
            )
          );
            
          }
          else{
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.district",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.subDistrict",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.firestationId",
                null
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyCity",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyFirestation",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
                "visible",
                false
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.subDistrict",
                "visible",
                false
              )
            );
          }
        }
      },
      district: {
        ...getSelectField({
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.district",
          sourceJsonPath: "applyScreenMdmsData.tenant.District",
          required: true,
          visible: false,
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: {
            labelName: "District",
            labelKey: "District"
          },
          placeholder: {
            labelName: "District",
            labelKey: "District"
          },
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.district",
          sourceJsonPath: "applyScreenMdmsData.tenant.District",
          required: true,
          fullwidth: true,
          props: {
            menuPortalTarget:document.querySelector('body'),
            setDataInField: true,
          },
          gridDefination: {
            xs: 12,
            sm: 4
          },
          inputLabelProps: {
            shrink: true
          },
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.district",
              action.value
            )
          );
          if(action.value){
            let fireStationsList = get(
              state,
              "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
              []
            );
            const districtData= get(
              state.screenConfiguration,
              "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
              []
            );
            let districtlist = districtData.filter((districtlists)=>{
             
                return districtlists.city.districtName===action.value
              
            });
            const subDistrictLists=[];
            const firestationtenantidlist=[];
            for(var i=0;i<districtlist.length;i++)
            {
              const fireStations = fireStationsList.filter(firestation => {
                return firestation.baseTenantId===districtlist[i].code;
              });
              if(fireStations[0]){
              firestationtenantidlist.push({code:fireStations[0].baseTenantId});
              for(var j=0;j<fireStations[0].subDistrict.length;j++){
                  subDistrictLists.push({code:fireStations[0].subDistrict[j]});  
              }
            }
            }
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.subDistrict",
                "props.data",
                subDistrictLists
              )
            );

          }
        }
      },
      subDistrict: {
        ...getSelectField({
          label: {
            labelName: "subDistrict",
            labelKey: "subDistrict"
          },
          placeholder: {
            labelName: "subDistrict",
            labelKey: "subDistrict"
          },
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.subDistrict",
          required: true,
          visible: false,
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.subDistrict",
              action.value
            )
          );
          if(action.value){         
            let fireStationsList = get(
              state,
              "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
              []
            );
            
            let fireStations = fireStationsList.filter(firestation => {
              return firestation.subDistrict 
            });
            const firesation =[];
            for(var i=0;i<fireStations.length;i++)
            {
              for(var j=0;j<fireStations[i].subDistrict.length;j++)
              {
                if(fireStations[i].subDistrict[j]==action.value)
              {
                firesation.push({code:fireStations[i].code});
                dispatch(
                  prepareFinalObject(
                    "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
                    fireStations[i].baseTenantId
                  )
                );
                dispatch(
                  prepareFinalObject(
                    "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
                    "SC1"
                  )
                );
                break;
              }
              } 
            }
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyFirestation",
                "props.data",
                firesation
              )
            );
          }
        }
      },
      propertyId: getTextField({
        label: {
          labelName: "Property ID",
          labelKey: "NOC_PROPERTY_ID_LABEL"
        },
        placeholder: {
          labelName: "Enter Property ID",
          labelKey: "NOC_PROPERTY_ID_PLACEHOLDER"
        },
        iconObj: {
          iconName: "search",
          position: "end",
          color: "#FE7A51",
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              getDetailsFromProperty(state, dispatch);
            }
          }
        },
        // title: {
        //   value:
        //     "If you have already assessed your property, then please search your property by your PAID",
        //   key: "NOC_PROPERTY_ID_TOOLTIP_MESSAGE"
        // },
        // infoIcon: "info_circle",
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId",
        visible: false
      }),
      propertyCity: {
        ...getSelectField({
          label: { labelName: "City", labelKey: "NOC_PROPERTY_CITY_LABEL" },
          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS"
          },
          optionLabel: "name",
          placeholder: {
            labelName: "Select City",
            labelKey: "NOC_PROPERTY_CITY_PLACEHOLDER"
          },
          sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
          required: true,
          visible: false,
          props: {
            className:"applicant-details-error",
            required: true
            // disabled: true
          }
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          //Below only runs for citizen - not required here in employee
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
              action.value
            )
          );
          try {
            let payload = await httpRequest(
              "post",
              "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
              "_search",
              [{ key: "tenantId", value: action.value }],
              {}
            );
            const mohallaData =
              payload &&
              payload.TenantBoundary[0] &&
              payload.TenantBoundary[0].boundary &&
              payload.TenantBoundary[0].boundary.reduce((result, item) => {
                result.push({
                  ...item,
                  name: `${action.value
                    .toUpperCase()
                    .replace(
                      /[.]/g,
                      "_"
                    )}_REVENUE_${item.code
                    .toUpperCase()
                    .replace(/[._:-\s\/]/g, "_")}`
                });
                return result;
              }, []);

            

            dispatch(
              prepareFinalObject(
                "applyScreenMdmsData.tenant.localities",
                mohallaData
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
                "props.suggestions",
                mohallaData
              )
            );
            const mohallaLocalePrefix = {
              moduleName: action.value,
              masterName: "REVENUE"
            };
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyMohalla",
                "props.localePrefix",
                mohallaLocalePrefix
              )
            );

            dispatch(
              fetchLocalizationLabel(getLocale(), action.value, action.value)
            );
          } catch (e) {
            console.log(e);
          }
          // Set Firestation based on ULBl
          let fireStationsList = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
            []
          );
          let fireStations = fireStationsList.filter(firestation => {
            return firestation.baseTenantId === action.value;
          });
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyFirestation",
              "props.data",
              fireStations
            )
          );
        }
      },
      propertyPlotSurveyNo: getTextField({
        label: {
          labelName: "Plot/Survey No.",
          labelKey: "NOC_PROPERTY_PLOT_NO_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Plot/Survey No.",
          labelKey: "NOC_PROPERTY_PLOT_NO_PLACEHOLDER"
        },
        pattern: getPattern("DoorHouseNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo"
      }),
      propertyBuilidingName: getTextField({
        label: {
          labelName: "Building/Colony Name",
          labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Building/Colony Name",
          labelKey: "NOC_PROPERTY_DETAILS_BLDG_NAME_PLACEHOLDER"
        },
        pattern: getPattern("BuildingStreet"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",

        jsonPath:
          "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName"
      }),
      propertyStreetName: getTextField({
        label: {
          labelName: "Street Name",
          labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Street Name",
          labelKey: "NOC_PROPERTY_DETAILS_SRT_NAME_PLACEHOLDER"
        },
        pattern: getPattern("BuildingStreet"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.street"
      }),
      landMark: getTextField({
        label: {
          labelName: "Land Mark",
          labelKey: "land mark"
        },
        placeholder: {
          labelName: "Enter Land Mark",
          labelKey: "enter the Land Mark"
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.landMark"
      }),
      propertyMohalla: {
        uiFramework: "custom-containers",
        componentPath: "AutosuggestContainer",
        jsonPath:
          "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
        required: true,
        visible: false,
        props: { 
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: {
            labelName: "Mohalla",
            labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_LABEL"
          },
          placeholder: {
            labelName: "Select Mohalla",
            labelKey: "NOC_PROPERTY_DETAILS_MOHALLA_PLACEHOLDER"
          },
          jsonPath:
            "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
          sourceJsonPath: "applyScreenMdmsData.tenant.localities",
          labelsFromLocalisation: true,
          errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
          suggestions: [],
          fullwidth: true,
          required: true,
          
          // props: {
          //   menuPortalTarget:document.querySelector('body'),
          //   setDataInField: true,
          //   labelsFromLocalisation: true
          // }
          inputLabelProps: {
            shrink: true
          }
          // className: "tradelicense-mohalla-apply"
        },
        beforeFieldChange: async (action, state, dispatch) => {
          // dispatch(
          //   prepareFinalObject(
          //     "Licenses[0].tradeLicenseDetail.address.locality.name",
          //     action.value && action.value.label
          //   )
          // );
        },
        gridDefination: {
          xs: 12,
          sm: 6
        }
      },
      propertyPincode: getTextField({
        label: {
          labelName: "Pincode",
          labelKey: "NOC_PROPERTY_DETAILS_PIN_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Pincode",
          labelKey: "NOC_PROPERTY_DETAILS_PIN_PLACEHOLDER"
        },
        pattern: getPattern("Pincode"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode"
        // required: true
      }),
      propertyGisCoordinates: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "gis-div-css",
          style: {
            width: "100%",
            cursor: "pointer"
          },
          jsonPath:
            "FireNOCs[0].fireNOCDetails.propertyDetails.address.latitude"
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.latitude",
        onClickDefination: {
          action: "condition",
          callBack: showHideMapPopup
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        children: {
          gisTextField: {
            ...getTextField({
              label: {
                labelName: "Locate on Map",
                labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_LABEL"
              },
              placeholder: {
                labelName: "Select your property location on map",
                labelKey: "NOC_PROPERTY_DETAILS_GIS_CORD_PLACEHOLDER"
              },
              jsonPath:
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.latitude",
              iconObj: {
                iconName: "gps_fixed",
                position: "end"
              },
              gridDefination: {
                xs: 12,
                sm: 12
              },
              props: {
                disabled: true,
                cursor: "pointer",
                jsonPath:
                  "FireNOCs[0].fireNOCDetails.propertyDetails.address.latitude"
              }
            })
          }
        }
      },
      propertyFirestation: getSelectField({
        label: {
          labelName: "Applicable Fire Station",
          labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Select Applicable Fire Station",
          labelKey: "NOC_PROPERTY_DETAILS_FIRESTATION_PLACEHOLDER"
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.firestationId",
        required: true,
        visible: false,
        localePrefix: {
          moduleName: "firenoc",
          masterName: "FireStations"
        }
      })
    }),
    mapsDialog: {
      componentPath: "Dialog",
      props: {
        open: false
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          children: {
            popup: getMapLocator()
          }
        }
      }
    }
  },
  {
    style: { overflow: "visible" }
  }
);