import {
    getCommonCard,
    getTextField,
    
    getCommonContainer,
    getPattern,
   
    getCommonTitle,
    getSelectField,
    getCommonParagraph,
    getCommonGrayCard,
    getCommonSubHeader,
    getLabelWithValue
  } from "egov-ui-framework/ui-config/screens/specs/utils";


  import { getQueryArg , getTodaysDateInYMD , getTLTenantId  } from "egov-ui-framework/ui-utils/commons";

  import {loadSurveyNumbers, getSurveyDetails, updateMdmsDropDowns} from "../lams-utils/utils"
  import {documentListContainer} from "./documentListContainer";

  import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

  import {leaseDetailsCard} from "../lams-common/leaseDetailsCard";

import PropTypes from "prop-types";

  const getClasses = () =>{
    return PropTypes.object.isRequired;
  }
  const handleFileUpload = () =>{
  }
  const onButtonClick = () =>{
  }
  const tradeCategoryChange = () =>{
  }
  const tradeTypeChange = () =>{
  }
  const tradeSubTypeChange = () =>{
  }
  const onLocatedChanged = (action, state, dispatch) =>{
    loadSurveyNumbers(action, state, dispatch);
  }
  const surveyNoChanged = (action, state, dispatch) => {
    getSurveyDetails(action, state, dispatch);
  }
  const locationChanged = () =>{
  }

  

  export const newApplicationDetailsCard = getCommonCard(
      {
        header: getCommonTitle(
            {
              labelName: "Lease Details",
              labelKey: "LAMS_LEASE_DETAILS"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
          applicationType: getSelectField({
            label: {
              labelName: "Application Type",
              labelKey: "LAMS_APPL_TYPE"
            },
            placeholder: {
              labelName: "Select application type",
              labelKey: "LAMS_APPL_TYPE_PLACEHOLDER"
            },
            required: true,
            data: [
              {
                code: "RENEWAL",
                label: "LAMS_APPL_TYPE_RENEWAL"
              },
              {
                code: "EXTENSION",
                label: "LAMS_APPL_TYPE_EXTENSION"
              },
            ],
            jsonPath: "lamsStore.Lease[0].applicationType",
            autoSelect: true
          }),
          category: getSelectField({
            label: {
              labelName: "Select Category",
              labelKey: "LAMS_APPL_CATEGORY"
            },
            placeholder: {
              labelName: "Select Category",
              labelKey: "LAMS_APPL_CATEGORY_PLACEHOLDER"
            },
            required: true,
            data: [
              {
                code: "cantonment",
                label: "LAMS_CATEGORY_CANT"
              },
              {
                code: "militaryStation",
                label: "LAMS_CATEGORY_MILIT_STN"
              },
              {
                code: "isolatedPocket",
                label: "LAMS_CATEGORY_ISOLATED_POCKET"
              },
            ],
            jsonPath: "lamsStore.Lease[0].category",
            autoSelect: true
          }),
          located: {
            ...getSelectField({
              label: {
                labelName: "Select Location Type",
                labelKey: "LAMS_APPL_LOC"
              },
              placeholder: {
                labelName: "Select Location Type",
                labelKey: "LAMS_APPL_LOC_PLACEHOLDER"
              },
              required: true,
              data: [
                {
                  code: "insideCivil",
                  label: "LAMS_CATEGORY_CANT"
                },
                {
                  code: "outsideCivil",
                  label: "LAMS_CATEGORY_MILIT_STN"
                }
              ],
              jsonPath: "lamsStore.Lease[0].located",
              autoSelect: true,
            }),
            beforeFieldChange: (action, state, dispatch) => {
             
            },
            afterFieldChange: (action, state, dispatch) => {
              onLocatedChanged(action, state, dispatch);
              dispatch(
                handleField(
                  "newApplication",
                  "components.newApplicationDetailsCard.children.cardContent.children.surveyNo",
                  "visible",
                  true
                )
              );
            },
          },
          surveyNo: {
            uiFramework: "custom-containers-local",
              moduleName: "egov-lams",
              componentPath: "AutosuggestContainer",
              jsonPath: "lamsStore.Lease[0].surveyNo",
              sourceJsonPath: "lamsStore.allSurveyDetails",
              visible:false,
               props:{
                className: "autocomplete-dropdown",
                suggestions: [],
                disabled:true,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                label: {
                  labelName: "Enter Survey Number",
                  labelKey: "LAMS_ENTER_SURVEY_NO"
                },
                placeholder: {
                  labelName: "Enter Survey Number",
                  labelKey: "LAMS_ENTER_SURVEY_NO"
                },
                required: true,
                jsonPath: "lamsStore.Lease[0].surveyNo",
                sourceJsonPath: "lamsStore.allSurveyDetails",
                inputLabelProps: {
                  shrink: true
                },
                onClickHandler: (action, state, dispatch) => {
                  console.log(action,state, dispatch );
                },
              },
              gridDefination: {
                xs: 12,
                sm: 6
              },
              required: true,
              beforeFieldChange: (action, state, dispatch) => {
              },
              afterFieldChange: (action, state, dispatch) => {
                surveyNoChanged(action, state, dispatch);
                dispatch(
                  handleField(
                    "newApplication",
                    "components.newApplicationDetailsCard.children.cardContent.children.leaseDetails",
                    "visible",
                    true
                  )
                );
              },
          },
          // lesseAsPerGLR2: getTextField({
          //   label: {
          //     labelName: "Lease as per GLR",
          //     labelKey: "LAMS_ASPERGLR_LABEL"
          //   },
          //   placeholder: {
          //     labelName: "Select Survey Number",
          //     labelKey: "LAMS_ASPERGLR_PLACEHOLDER"
          //   },
  
          //   required: true,
          //   visible: true,
          //   pattern: getPattern("Name"),
          //   errorMessage: "",
          //   jsonPath: "Lease[0].lesseAsPerGLR2"
          // }),
          leaseDetails:{
            uiFramework: "custom-atoms",
            componentPath: "Div",
            visible:false,
            props: {
             
            },
            children: {
              details: leaseDetailsCard
            },
          }
          //leaseDetails: leaseDetailsCard,
        //   cantonmentBoard2: {
        //     uiFramework: "custom-containers",//"custom-containers-local",
        //       //moduleName: "egov-lams",
        //       componentPath: "AutosuggestContainer",
        //       jsonPath: "Lease[0].tenantId",
        //       sourceJsonPath: "allTenants",
        //        props:{
        //         className: "autocomplete-dropdown",
        //         suggestions: [],
        //         disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
        //         label: {
        //           labelName: "Cantonment Boards",
        //           labelKey: "LAMS_CB_LABEL"
        //         },
        //         placeholder: {
        //           labelName: "Cantonment Board",
        //           labelKey: "CB_PLACEHOLDER"
        //         },
        //         required: true,
        //         jsonPath: "Lease[0].tenantId",
        //         sourceJsonPath: "allTenants",
        //         inputLabelProps: {
        //           shrink: true
        //         },
        //         onClickHandler: cbChanged
        //       },
        //       gridDefination: {
        //         xs: 12,
        //         sm: 6
        //       },
        //       required: true
        //   },
        //   serviceType: {
        //     uiFramework: "custom-containers",        
        //     componentPath: "AutosuggestContainer",
        //     jsonPath: "Challan[0].serviceType",
        //     gridDefination: {
        //       xs: 12,
        //       sm: 6
        //     },
        //     required: true,
        //     props: {
        //       style: {
        //         width: "100%",
        //         cursor: "pointer"
        //       },
        //       label: {
        //         labelName: "Service Type",
        //         labelKey: "UC_SERVICE_TYPE_LABEL"
        //       },
        //       placeholder: {
        //         labelName: "Select service Type",
        //         labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
        //       },
        //       localePrefix: {
        //         masterName: "BusinessService",
        //         moduleName: "BillingService"
        //       },
              
        //       visible: true,
        //       jsonPath: "Challan[0].serviceType",
        //       sourceJsonPath: "allTenants",
        //       labelsFromLocalisation: true,
        //       suggestions: [],
        //       fullwidth: true,
        //       inputLabelProps: {
        //         shrink: true
        //       }
        //     },
        //   },
        //   location: {
        //     uiFramework: "custom-containers-local",
        //       moduleName: "egov-lams",
        //       componentPath: "AutosuggestContainer",
        //       jsonPath: "Lease[0].location",
        //       sourceJsonPath: "allTenants",
        //        props:{
        //         className: "autocomplete-dropdown",
        //         suggestions: [],
        //         disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
        //         label: {
        //           labelName: "Location",
        //           labelKey: "LAMS_LOCATION_LABEL"
        //         },
        //         placeholder: {
        //           labelName: "Cantonment Board",
        //           labelKey: "LAMS_LOCATION_PLACEHOLDER"
        //         },
        //         required: true,
        //         jsonPath: "Lease[0].location",
        //         sourceJsonPath: "lamsLocation",
        //         inputLabelProps: {
        //           shrink: true
        //         },
        //         onClickHandler: locationChanged
        //       },
        //       gridDefination: {
        //         xs: 12,
        //         sm: 6
        //       },
        //       required: true
        //   },
        //   LeaseSurveyNo: {
        //     uiFramework: "custom-containers",
        //     componentPath: "AutosuggestContainer",
        //     jsonPath: "Lease[0].surveyNumber",
        //     required: true,
        //     props: {
        //       style: {
        //         width: "100%",
        //         cursor: "pointer"
        //       },
        //       hasZindex:true,
        //       label: {
        //         labelName: "Survey Number",
        //         labelKey: "LAMS_SURVEYNO_LABEL"
        //       },
        //       placeholder: {
        //         labelName: "Select Survey Number",
        //         labelKey: "LAMS_SURVEYNO_PLACEHOLDER"
        //       },
        //       jsonPath: "Lease[0].surveyNumber",
        //       sourceJsonPath: "lamsSurveyNumber",
        //       labelsFromLocalisation: true,
        //       suggestions: [],
        //       fullwidth: true,
        //       required: true,
        //       inputLabelProps: {
        //         shrink: true
        //       }                 
        //     },              
        //     gridDefination: {
        //       xs: 12,
        //       sm: 6
        //     }
        //   }, 
        //   lesseAsPerGLR2: getTextField({
        //     label: {
        //       labelName: "Lease as per GLR",
        //       labelKey: "LAMS_ASPERGLR_LABEL"
        //     },
        //     placeholder: {
        //       labelName: "Select Survey Number",
        //       labelKey: "LAMS_ASPERGLR_PLACEHOLDER"
        //     },
  
        //     required: true,
        //     visible: true,
        //     pattern: getPattern("Name"),
        //     errorMessage: "",
        //     jsonPath: "Lease[0].lesseAsPerGLR2"
        //   }),

        //   leaseDetailsContainer : getCommonContainer({
        //     checkBox:{
        //       required: true,
        //       uiFramework: "custom-atoms-local",
        //       moduleName: "egov-lams",
        //       componentPath: "Checkbox",
        //       props: {
        //         content: "For this property"
        //       },
        //       jsonPath: "Lease[0].forThisProperty",
        //     }
        // },        
        // ) 
      },
      {
        style: {
          overflow: "visible"
        }
      }
  );

  

  export const newApplicationDocumentsCard = getCommonCard(
    {
      header: getCommonTitle(
          {
            labelName: "Lease Documents",
            labelKey: "LAMS_LEASE_DOCUMENTS"
          },
          {
            style: {
              marginBottom: 18
            }
          }
        ),
        paragraph: getCommonParagraph({
          labelName:
            "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
          labelKey: "LAMS_UPLOAD_DOCS_SUBHEADER"
        }),
        documentListContainer
    },
    {
      style: {
        overflow: "visible"
      }
    }
);