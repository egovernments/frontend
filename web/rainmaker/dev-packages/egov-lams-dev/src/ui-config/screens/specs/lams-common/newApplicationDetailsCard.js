import {
    getCommonCard,   
    getCommonTitle,
    getSelectField,
    getCommonParagraph,
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import get from "lodash/get";
  import {loadSurveyNumbers, getSurveyDetails} from "../lams-utils/utils"
  import {documentListContainer} from "./documentListContainer";
  import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import {leaseDetailsCard} from "./leaseDetailsCard";

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
    dispatch(
      handleField(
        "newApplication",
        "components.newApplicationDetailsCard.children.cardContent.children.surveyNo",
        "visible",
        true
      )
    );
  }

  const surveyNoChanged = (action, state, dispatch) => {
    getSurveyDetails(action, state, dispatch);
    dispatch(
      handleField(
        "newApplication",
        "components.newApplicationDetailsCard.children.cardContent.children.leaseDetails",
        "visible",
        true
      )
    );
  }

  const onCategoryChanged = (action, state, dispatch) => {

    const selectedCategory = get(
      state.screenConfiguration.preparedFinalObject,
      "lamsStore.Lease[0].category"
    );
    if(selectedCategory.toLowerCase() ==   "cantonment")
    {
      dispatch(
        handleField(
          "newApplication",
          "components.newApplicationDetailsCard.children.cardContent.children.cantonment",
          "visible",
          true
        )
      );
    }
    else
    {
      dispatch(
        handleField(
          "newApplication",
          "components.newApplicationDetailsCard.children.cardContent.children.cantonment",
          "visible",
          false
        )
      );
    }
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
            autoSelect: true,
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
            localePrefix: {
              moduleName: "LAMS",
              masterName: "CATEGORY"
            },
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
            autoSelect: true,
            visible: false,
            beforeFieldChange: (action, state, dispatch) => {
             
            },
            afterFieldChange: (action, state, dispatch) => {
              onCategoryChanged(action, state, dispatch);
            },
          }),
          cantonment: getSelectField({
            label: {
              labelName: "Select Cantonment",
              labelKey: "LAMS_APPL_CANT"
            },
            placeholder: {
              labelName: "Select Cantonment",
              labelKey: "LAMS_APPL_CANT_PLACEHOLDER"
            },
            required: true,
            //data: null,
            localePrefix: {
              moduleName: "TENANT",
              masterName: "TENANTS"
            },
            sourceJsonPath:"lamsStore.allTenants",
            jsonPath: "lamsStore.Lease[0].tenantId",
            autoSelect: true,
            visible: true,
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
              localePrefix: {
                moduleName: "LAMS",
                masterName: "LOCATED"
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
              },
          },
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