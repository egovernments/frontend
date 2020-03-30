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
      console.log("payloadfordata",payload2)
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
            labelName: "Area Type",
            labelKey: "NOC_AREA_TYPE_LABEL"
          },
          placeholder: {
            labelName: "Select Area Type",
            labelKey: "NOC_AREA_TYPE_PLACEHOLDER"
          },
          data: [
            {
              code: "Urban",
              label: "NOC_AREA_TYPE_URBAN"
            },
            {
              code: "Rural",
              label: "NOC_AREA_TYPE_RURAL"
            }
          ],
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.areaType",
          required: true
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.areaType",
              action.value
            )
          );
          if(action.value=='Rural'){
            // if(state.screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1){
            //   dispatch(
            //     handleField(
            //       "apply",
            //       "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
            //       "props.value",
            //       null
            //     )
            //   );
            // }
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
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyLandmark",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyVillageName",
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
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyStreetName",
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
         /*    dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1",
                action.value
              )
             );
            dispatch(  
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline2",
                action.value
              )
              ); */

          const districtList= get(
            state.screenConfiguration,
            "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
            []              );
          const districtTenantMap =districtList.map((item)=>{
            return {
              name:item.city.districtName,
              //code:item.code
              code:item.city.districtCode
            }

          });

          //console.log("districtTenantMap",districtTenantMap); 

          const fireStationsList = get(
            state,
            "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
            []
          );

          //console.log("fireStationsList",fireStationsList);

          const districtlist=[];

      /*     for(var i=0;i< fireStationsList.length;i++)
          {
            for(var j=0;j<districtTenantMap.length;j++)
            {
              if(districtTenantMap[j].code==fireStationsList[i].baseTenantId)
              {
                
                districtlist.push({
                  code:districtTenantMap[j].name                  
                })
              }
            }
          }   */

         for (let i=0;i<districtTenantMap.length;i++)
          {
            districtlist.push({

              code:districtTenantMap[i].name,
              //name:districtTenantMap[i].name

            })

          }          
 
          //console.log("districtlist",districtlist); 

          const unqDistrictList=districtlist.filter( 
            (ele, ind) => ind === districtlist.findIndex( elem => elem.code === ele.code)
          );

          console.log("unique districtlist",unqDistrictList); 

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
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.district",
              "props.data",
              unqDistrictList
            )
          );
            
          }
          else{            
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1",
                null
              )
            );
            dispatch(
              prepareFinalObject(
                "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",
                null
              )
            );
            
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyVillageName",
                "visible",
                false
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
                "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children.propertyStreetName",
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
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1",
          sourceJsonPath: "applyScreenMdmsData.tenant.District",
          required: true,
          visible: false,
          label: {
            labelName: "District Name",
            labelKey: "NOC_DISTRICT_LABEL"
          },
          placeholder: {
            labelName: "Select District",
            labelKey: "NOC_DISTRICT_PLACEHOLDER"
          },
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1",
          // sourceJsonPath: "applyScreenMdmsData.tenant.District",
          required: true,
          fullwidth: true,
          props: {
            menuPortalTarget:document.querySelector('body'),
            setDataInField: true,
          }
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.addressline1",
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

         //  console.log("tenanats list",districtlist );

             let tenantids = districtlist.map((districtlists)=>{             
              return districtlists.code          
             });
          //  console.log("tenant ids", tenantids); 

          

            
           // console.log("fireStationsList",fireStationsList);



            const subDistrictLists=[]; 

            const firestationtenantidlist=[];

            const fireStations = [];
     
           for(var i=0;i<tenantids.length;i++)
            {
             const fireStations = fireStationsList.filter(firestation => {       
                               
              return tenantids.includes(firestation.baseTenantId);   

                // return tenantids[i].indexOf(firestation.baseTenantId) !== -1 

                // return firestation.baseTenantId === tenantids[i]; 

                //return 'code' in districtlist[i];

              }); 

              if(fireStations[i]){

                // firestationtenantidlist.push({code:fireStations[0].baseTenantId}); 
  
                for(var j=0;j<fireStations[i].subDistrict.length;j++){
                //subDistrictLists.push({code:fireStations[0].subDistrict[j]});  
                    subDistrictLists.push(fireStations[i].subDistrict[j]);  
                  }
                }

            }  

            //console.log('filtered fireStations', fireStations);                 


             
            

            console.log("subdistrict list",subDistrictLists );

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
            labelName: "sub District Name",
            labelKey: "NOC_SUB_DISTRICT_LABEL"
          },
          placeholder: {
            labelName: "Select Sub District",
            labelKey: "NOC_SUB_DISTRICT_PLACEHOLDER"
          },
          jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",
          required: true,
          visible: false,
          props: {
            menuPortalTarget:document.querySelector('body'),
            setDataInField: true,
          }
        }),
        beforeFieldChange: async (action, state, dispatch) => {
          dispatch(
            prepareFinalObject(
              "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",
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

            console.log("fireStations subdistricts ", fireStations)

            const firesation =[];

            for(var i=0;i<fireStations.length;i++)
            {
              for(var j=0;j<fireStations[i].subDistrict.length;j++)
              {
                if(fireStations[i].subDistrict[j].code==action.value)
              {
                firesation.push({code:fireStations[i].code});

                console.log("789546221525552452",getTenantId());
                dispatch(
                  prepareFinalObject(
                    "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
                    getTenantId()
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
            console.log("payload",payload)
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

              console.log(mohallaData,"mohallaData")

            

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
          console.log("fireStationsList",fireStationsList);
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
        visible: false,
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.street"
      }),
      propertyVillageName: getTextField({
        label: {
          labelName: "Village Name",
          labelKey: "NOC_PROPERTY_DETAILS_VILL_NAME_LABEL"
        },
        props:{
          className:"applicant-details-error"
        },
        placeholder: {
          labelName: "Enter Village Name",
          labelKey: "NOC_PROPERTY_DETAILS_VILL_NAME_PLACEHOLDER"
        },
        visible:false,
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.village"
      }),
      propertyLandmark: getTextField({
        label: {
          labelName: "Landmark Name",
          labelKey: "NOC_PROPERTY_DETAILS_LANDMARK_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Landmark",
          labelKey: "NOC_PROPERTY_DETAILS_LANDMARK_NAME_PLACEHOLDER"
        },
        visible: true,
        jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.landmark"
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
        props: {
          menuPortalTarget:document.querySelector('body'),
          setDataInField: true,
        },
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