import {
    getCommonCard,   
    getCommonTitle,
    getSelectField,
    getCommonParagraph,
    getPattern,
    getTextField,
    getDateField,
    getCommonCaption,
    getCommonSubHeader,
    getCommonGrayCard,
    getCommonContainer,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import get from "lodash/get";
  import {loadSurveyNumbers, getSurveyDetails} from "../lams-utils/utils"
  import {getDetailsForOwner, getMaxDateForDOB} from "../utils"
  import {documentListContainer} from "./documentListContainer";
  import {prepareFinalObject,  handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
  import {getLeaseDetailsCard} from "./leaseDetailsCard";
  import {downloadLeaseApplication, downloadLeaseApplication2,isPostDSignMode} from "../../../../ui-utils/commons";
  import {monthsPattern} from "../../../../ui-utils/constants";
  import {dSignConfirmationDialog} from "./dSignConfirmationDialog";
  import {downloadDialog} from "./downloadDialog";
  import PropTypes from "prop-types";
  import {localStorageGet, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
  import { validateFields } from "../utils";
  import {toggleSnackbar} from "egov-ui-framework/ui-redux/screen-configuration/actions";


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

  export const setPostDSignSuccessScreen = (action,state, dispatch) => {
    setVisibilityCant(action, state, dispatch, true, true);
    setVisibilityLocated(action,state, dispatch, true, true );
    setVisibilitySurveyNo(action, state, dispatch, true, true);
    setVisibilityLeaseDetails(action, state, dispatch, true, true);
    setVisibilityDownloadButton(action, state, dispatch, (process.env.REACT_APP_NAME === "Citizen"), true);
    setVisibilityEsignButton(action, state, dispatch,  (process.env.REACT_APP_NAME === "Citizen"), true);
    //setVisibilityMonths(action, state, dispatch, true, true);
    setVisibilityDocuments(action, state, dispatch, true);
    setVisibilityApplicationType(action, state, dispatch, true, true);
  }

  export const setNewApplicationScreen = (action,state, dispatch) => {
    setVisibilityApplicationType(action, state, dispatch, true, false);
    setVisibilityCant(action, state, dispatch, true, false);
    setVisibilityLocated(action,state, dispatch, false, false );
    setVisibilitySurveyNo(action, state, dispatch, false, false);
    setVisibilityLeaseDetails(action, state, dispatch, false, false);
    setVisibilityDownloadButton(action, state, dispatch, false, false);
    setVisibilityEsignButton(action, state, dispatch, false, false);
    setVisibilityDocuments(action, state, dispatch, false);
    setVisibilitySelectors(action, state, dispatch, true);
    if(process.env.REACT_APP_NAME === "Employee")
      setVisibilityOwnerInfo(action, state, dispatch, true, false);
    //setVisibilityMonths(action, state, dispatch, false, false);
  }

  export const setCitizenEditScreen = (action,state, dispatch) => {
    setVisibilityDocuments(action, state, dispatch, true);
    setVisibilitySelectors(action, state, dispatch, false);
  }
  // const onMonthsChanged = (action,state, dispatch) => {
  //   setVisibilityDownloadButton(action, state, dispatch, false);
  //   setVisibilityEsignButton(action, state, dispatch, false);
  //   const months = get(
  //     state.screenConfiguration.preparedFinalObject,
  //     "lamsStore.Lease[0].months"
  //   );
  //   if(process.env.REACT_APP_NAME === "Citizen") //This is for Citizen Screen
  //   {
  //     if(monthsPattern.test(months))
  //     {
  //       setVisibilityFatherOrHusbandName(action, state, dispatch, true, false);
  //     }
  //     else
  //     {
  //       setVisibilityFatherOrHusbandName(action, state, dispatch, false, true);
  //     }
  //   }
  //   else  //For employee take this value from Applicant Details.
  //   {
  //     setVisibilityFatherOrHusbandName(action, state, dispatch, false, true);
  //   }
  // }

  // const onFathersNameChanged = (action,state, dispatch) => {
  //   const fatherOrHusbandName = get(
  //     state.screenConfiguration.preparedFinalObject,
  //     "lamsStore.Lease[0].fatherOrHusbandName"
  //   );
  //   if(getPattern("Name").test(fatherOrHusbandName))
  //   {
  //     setVisibilityDownloadButton(action, state, dispatch, true);
  //     setVisibilityEsignButton(action, state, dispatch, true)
  //   }
  //   else
  //   {
  //     setVisibilityDownloadButton(action, state, dispatch, false);
  //     setVisibilityEsignButton(action, state, dispatch, false);
  //   }
  // }

  const onLocatedChanged = (action, state, dispatch) =>{
    if(!isPostDSignMode())
    {
      loadSurveyNumbers(action, state, dispatch);

      const located = get(state.screenConfiguration.preparedFinalObject.lamsStore.Lease[0],"located");
      const LeaseRenewalWorkflowCode = (located === "insideCivil")? "LAMS_NewLR_CEO_V3": "LAMS_NewLR_DEO_V3";
      dispatch(prepareFinalObject("lamsStore.Lease[0].workflowCode", LeaseRenewalWorkflowCode));
      //dispatch(prepareFinalObject("lamsStore.Lease[0].surveyNo", ""));

      setVisibilitySurveyNo(action, state, dispatch, true);
      setVisibilityLeaseDetails(action, state, dispatch, false);
      setVisibilityDownloadButton(action, state, dispatch, false);
      setVisibilityEsignButton(action, state, dispatch, false);
      setVisibilityDocuments(action, state, dispatch, false);;
      //setVisibilityMonths(action, state, dispatch, false);
    }
  }

  const surveyNoChanged = (action, state, dispatch) => {
    if(!isPostDSignMode())
    {
      getSurveyDetails(action, state, dispatch);

      const selectedSurveyDetails = get(state.screenConfiguration.preparedFinalObject.lamsStore,"selectedSurveyDetails"); 
      if(selectedSurveyDetails && selectedSurveyDetails.surveyId)
      {
        dispatch(prepareFinalObject("lamsStore.Lease[0].surveyId", selectedSurveyDetails.surveyId));
        dispatch(prepareFinalObject("lamsStore.Lease[0].leaseDetails", selectedSurveyDetails));
      }
      setVisibilityLeaseDetails(action, state, dispatch,true);
      setVisibilityDownloadButton(action, state, dispatch, true);
      setVisibilityEsignButton(action, state, dispatch, (process.env.REACT_APP_NAME === "Citizen"));
      setVisibilityDocuments(action, state, dispatch, true);;
      //setVisibilityMonths(action, state, dispatch, true);
    }
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
          "components.div1.children.details.children.cardContent.children.cantonment",
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
          "components.div1.children.details.children.cardContent.children.cantonment",
          "visible",
          false
        )
      );
    }
    //dispatch(prepareFinalObject("lamsStore.Lease[0].surveyNo", ""));
    dispatch(prepareFinalObject("lamsStore.allSurveyDetails", []));
  }

  const onCbChange = (action, state, dispatch) => {

    //dispatch(prepareFinalObject("lamsStore.Lease[0].surveyNo", ""));
    dispatch(prepareFinalObject("lamsStore.allSurveyDetails", []));

    if(!isPostDSignMode())
    {
      // dispatch(
      //   handleField(
      //   "newApplication",
      //   "components.div1.children.details.children.cardContent.children.optionSelection.children.surveyNo", //"components.newApplicationDetailsCard.children.cardContent.children.surveyNo",
      //   "props.value",
      //   "")
      // );

      dispatch(
        handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.located", //"components.newApplicationDetailsCard.children.cardContent.children.surveyNo",
        "props.value",
        "")
      );

      setVisibilitySurveyNo(action, state, dispatch, false);
      setVisibilityLeaseDetails(action, state, dispatch, false);
      if(get(state.screenConfiguration.preparedFinalObject.lamsStore.Lease[0],"tenantId"))
        setVisibilityLocated(action, state, dispatch, true);
      else
        setVisibilityLocated(action, state, dispatch, false);
      setVisibilityDownloadButton(action, state, dispatch, false);
      setVisibilityEsignButton(action, state, dispatch, false);
      setVisibilityDocuments(action, state, dispatch, false);;
      //setVisibilityMonths(action, state, dispatch, false);

    }

  }

  const onApplicationTypeChange = (action, state, dispatch) => {

    //dispatch(prepareFinalObject("lamsStore.Lease[0].surveyNo", ""));

    if(!isPostDSignMode())
    {
      dispatch(prepareFinalObject("lamsStore.allSurveyDetails", []));
      dispatch(
        handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.located",
        "props.value",
        "")
      );

      setVisibilityLeaseDetails(action, state, dispatch, false);
      setVisibilitySurveyNo(action, state, dispatch, false);
      setVisibilityDownloadButton(action, state, dispatch, false);
      setVisibilityEsignButton(action, state, dispatch, false);
      setVisibilityDocuments(action, state, dispatch, false);
      //setVisibilityMonths(action, state, dispatch, false);
    }
    


  }

  const onSignTypeChange = (action, state, dispatch) => {

    
  }

  const setVisibilityApplicationType = (action, state, dispatch,visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.applicationType",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1.children.details.children.cardContent.children.optionSelection.children.applicationType",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityCant = (action, state, dispatch,visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.cantonment",
        "visible",
        visible
      )
    );
    if(disabled == true || disabled == false)
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1.children.details.children.cardContent.children.optionSelection.children.cantonment",
          "props.disabled",
          disabled
        )
      );
      dispatch(
        handleField(
          "newApplication",
          "components.div1.children.details.children.cardContent.children.optionSelection.children.cantonment",
          "disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityLocated = (action, state, dispatch, visible, disabled) => {
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.located",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1.children.details.children.cardContent.children.optionSelection.children.located",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilitySurveyNo = (action, state, dispatch, visible, disabled) => {
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.surveyNo",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
          "components.div1.children.details.children.cardContent.children.optionSelection.children.surveyNo",
          "props.disabled",
          disabled
        )
      );
    }
  }

  // const setVisibilityMonths = (action, state, dispatch, visible, disabled) => {
  //   dispatch(
  //     handleField(
  //       "newApplication",
  //       "components.div1.children.details.children.cardContent.children.optionSelection.children.months",
  //       "visible",
  //       visible
  //     )
  //   );
  //   if(disabled === true || disabled === false)
  //   {
  //     dispatch(
  //       handleField(
  //         "newApplication",
  //         "components.div1.children.details.children.cardContent.children.optionSelection.children.months",
  //         "props.disabled",
  //         disabled
  //       )
  //     );
  //   }
  //   if(get(state.screenConfiguration.preparedFinalObject , "lamsStore.Lease[0].months") && !isPostDSignMode())
  //   {
  //     dispatch(
  //       handleField(
  //         "newApplication",
  //         "components.div1.children.details.children.cardContent.children.optionSelection.children.months",
  //         "props.value",
  //         ""
  //       )
  //     );
  //   }
  //}

  const setVisibilityLeaseDetails = (action, state, dispatch, visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.leaseDetails",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "components.div1.children.details.children.cardContent.children.leaseDetails",
          "props.disabled",
          disabled
        )
      );
    }
  }
  const setVisibilityDownloadButton = (action, state, dispatch, visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplication",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplication",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityFatherOrHusbandName = (action, state, dispatch, visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.fatherOrHusbandName",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.fatherOrHusbandName",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityEsignButton = (action, state, dispatch, visible, disabled) =>{
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.eSignApplication",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "components.div1.children.details.children.cardContent.children.optionSelection.children.eSignApplication",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityOwnerInfo = (action, state, dispatch, visible, disabled) =>{
    //Hiding first, then showing. 
    dispatch(handleField(
        "newApplication",
        "components.div2",
        "visible",
        false
      )
    );
    dispatch(
      handleField(
        "newApplication",
        "components.div2",
        "visible",
        visible
      )
    );
    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "components.div2",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilitySelectors = (action, state, dispatch, visible, disabled) =>{

    dispatch(
      handleField(
        "newApplication",
        "components.div1",
        "visible",
        false
      )
    );
    dispatch(
      handleField(
        "newApplication",
        "components.div1",
        "visible",
        visible
      )
    );

    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "screenConfig.newApplication.components.div1",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const setVisibilityDocuments = (action, state, dispatch, visible, disabled) =>{

    dispatch(
      handleField(
        "newApplication",
        "components.div3",
        "visible",
        false
      )
    );
    dispatch(
      handleField(
        "newApplication",
        "components.div3",
        "visible",
        visible
      )
    );

    if(disabled === true || disabled === false)
    {
      dispatch(
        handleField(
          "newApplication",
        "screenConfig.newApplication.components.div3",
          "props.disabled",
          disabled
        )
      );
    }
  }

  const locationChanged = () =>{
  }

  const validateOwnerDetails = (state,dispatch) =>{
    //Validate only on Employee side.
    if(process.env.REACT_APP_NAME === "Employee")
    {
      const isEmployeeDetailsValid = validateFields(
        "components.div2.children.details.children.cardContent.children.ownerDetails.children.cardContent.children.ownerDetailsCardContainer.children",
        state,
        dispatch,
        "newApplication"
      );
      if(!isEmployeeDetailsValid)
        dispatch(toggleSnackbar(
          true,
          {labelName: "Please fill the Applicant Details",
          labelKey: "ERR_LAMS_APPL_DETAILS"}, 
          "error")
        );
      return isEmployeeDetailsValid;
    }
    else
      return true;
  }

  const onDownloadApplClicked = (state, dispatch) => {

    dispatch(prepareFinalObject("lamsStore.eSignClicked", false));

    dispatch(
      handleField(
        "newApplication", 
        "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplDialogDiv.children.dialogContent.children.popup.children.optionSelection.children.div.children.yesButton.children.previousButtonLabel", 
        "props.labelKey", 
        "LAMS_DOWNLOAD")
    );

    if(validateOwnerDetails(state, dispatch))
      showHideDownloadApplPopup(state, dispatch);

  }

  const onEsignClicked = (state,dispatch) => {

    dispatch(prepareFinalObject("lamsStore.eSignClicked", true));

    dispatch(
      handleField(
        "newApplication", 
        "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplDialogDiv.children.dialogContent.children.popup.children.optionSelection.children.div.children.yesButton.children.previousButtonLabel", 
        "props.labelKey", 
        "LAMS_PROCEED_DSIGN")
    );

    if(validateOwnerDetails(state, dispatch))
      showHideDownloadApplPopup(state, dispatch);
      //showHideConfirmationPopup(state, dispatch);
  }

  export const showHideConfirmationPopup = (state, dispatch) => {
    let toggle = get(
      state.screenConfiguration.screenConfig["newApplication"],
     "components.div1.children.details.children.cardContent.children.optionSelection.children.dSignConfirmationDialogDiv.props.open",
     false
   );
   dispatch(
     handleField("newApplication", "components.div1.children.details.children.cardContent.children.optionSelection.children.dSignConfirmationDialogDiv", "props.open", !toggle)
   );
 };

 export const showHideDownloadApplPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["newApplication"],
   "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplDialogDiv.props.open",
   false
 );
 dispatch(
   handleField("newApplication", "components.div1.children.details.children.cardContent.children.optionSelection.children.downloadApplDialogDiv", "props.open", !toggle)
 );
};

  export const newApplicationDetailsCard = getCommonCard(
      {
        header: getCommonTitle(
            {
              labelName: "Lease Details",
              labelKey: "LAMS_LEASE_DETAILS"
            },
            {
              disableValidation:true,
              style: {
                marginBottom: 18
              }
            }
          ),
          optionSelection: getCommonContainer({

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
                  label: "RENEWAL"
                },
                {
                  code: "EXTENSION",
                  label: "EXTENSION"
                },
              ],
              localePrefix: {
                moduleName: "LAMS",
                masterName: "APPL_TYPE"
              },
              jsonPath: "lamsStore.Lease[0].applicationType",
              beforeFieldChange: (action, state, dispatch) => {
              
              },
              afterFieldChange: (action, state, dispatch) => {
                onApplicationTypeChange(action, state, dispatch);
              },
              autoSelect: true,
              gridDefination: {
                xs: 12,
                sm: 4
              },
              props:{
                disabled: false
              }
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
              props:{
                disabled: true,
              },
              jsonPath: "lamsStore.Lease[0].category",
              autoSelect: true,
              visible: false,
              beforeFieldChange: (action, state, dispatch) => {
              
              },
              afterFieldChange: (action, state, dispatch) => {
                onCategoryChanged(action, state, dispatch);
              },
            }),
            cantonment: {
              uiFramework: "custom-containers",
                //moduleName: "egov-lams",
                componentPath: "AutosuggestContainer",
                jsonPath: "lamsStore.Lease[0].tenantId",
                sourceJsonPath: "lamsStore.allTenants",
                visible:true,
                autoSelect:true,
                props:{
                  autoSelect:true,
                  //isClearable:true,
                  className: "autocomplete-dropdown",
                  suggestions: [],
                  disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
                  label: {
                    labelName: "Select Cantonment",
                    labelKey: "LAMS_APPL_CANT"
                  },
                  placeholder: {
                    labelName: "Select Cantonment",
                    labelKey: "LAMS_APPL_CANT_PLACEHOLDER"
                  },
                  localePrefix: {
                    moduleName: "TENANT",
                    masterName: "TENANTS"
                  },
                  labelsFromLocalisation: true,
                  required: true,
                  jsonPath: "lamsStore.Lease[0].tenantId",
                  sourceJsonPath: "lamsStore.allTenants",
                  inputLabelProps: {
                    shrink: true
                  },
                  onClickHandler: (action, state, dispatch) => {
                    console.log(action,state, dispatch );
                  },
                },
                gridDefination: {
                  xs: 12,
                  sm: 4
                },
                required: true,
                beforeFieldChange: (action, state, dispatch) => {

                },
                afterFieldChange: (action, state, dispatch) => {
                  onCbChange(action, state, dispatch);
                },
            },
            // cantonment: getSelectField({
            //   label: {
            //     labelName: "Select Cantonment",
            //     labelKey: "LAMS_APPL_CANT"
            //   },
            //   placeholder: {
            //     labelName: "Select Cantonment",
            //     labelKey: "LAMS_APPL_CANT_PLACEHOLDER"
            //   },
            //   required: true,
            //   //data: null,
            //   localePrefix: {
            //     moduleName: "TENANT",
            //     masterName: "TENANTS"
            //   },

            //   sourceJsonPath:"lamsStore.allTenants",
            //   jsonPath: "lamsStore.Lease[0].tenantId",
            //   autoSelect: true,
            //   visible: true,
            //   beforeFieldChange: (action, state, dispatch) => {
              
            //   },
            //   afterFieldChange: (action, state, dispatch) => {
            //     onCbChange(action, state, dispatch);
            //   },
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4
            //   },
            // }),
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
              visible:false,
              beforeFieldChange: (action, state, dispatch) => {
              
              },
              afterFieldChange: (action, state, dispatch) => {
                onLocatedChanged(action, state, dispatch);
              },
              gridDefination: {
                xs: 12,
                sm: 4
              }
            },
            surveyNo: {
              uiFramework: "custom-containers",
                //moduleName: "egov-lams",
                componentPath: "AutosuggestContainer",
                jsonPath: "lamsStore.Lease[0].surveyNo",
                sourceJsonPath: "lamsStore.allSurveyDetails",
                visible:true,
                autoSelect:true,
                props:{
                  autoSelect:true,
                  isClearable:true,
                  className: "autocomplete-dropdown",
                  suggestions: [],
                  disabled:false,//getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
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
                  sm: 4
                },
                required: true,
                beforeFieldChange: (action, state, dispatch) => {
                },
                afterFieldChange: (action, state, dispatch) => {
                  surveyNoChanged(action, state, dispatch);
                },
            },
            // signType: getSelectField({
            //   visible:false,
            //   label: {
            //     labelName: "Sign Type",
            //     labelKey: "LAMS_SIGN_TYPE"
            //   },
            //   placeholder: {
            //     labelName: "Select type of Signature",
            //     labelKey: "LAMS_SIGN_TYPE_PLACEHOLDER"
            //   },
            //   required: true,
            //   data: [
            //     {
            //       code: "DSIGN",
            //       label: "DSIGN"
            //     },
            //     {
            //       code: "DOWNLOAD_SIGN_UPLOAD",
            //       label: "DOWNLOAD_SIGN_UPLOAD"
            //     },
            //   ],
            //   localePrefix: {
            //     moduleName: "LAMS",
            //     masterName: "SIGN_TYPE"
            //   },
            //   jsonPath: "lamsStore.Lease[0].signType",
            //   beforeFieldChange: (action, state, dispatch) => {
              
            //   },
            //   afterFieldChange: (action, state, dispatch) => {
            //     onSignTypeChange(action, state, dispatch);
            //   },
            //   autoSelect: true,
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4
            //   }
            // }),
            // months: getTextField({
            //   label: {
            //     labelName: "For a period of (Months)",
            //     labelKey: "LAMS_FOR_A_PERIOD"
            //   },
            //   props:{
            //     className:"applicant-details-error",
            //     //hasDependant: true,
            //     //onChange:null,
            //     //disabled:getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
            //   },
            //   placeholder: {
            //     labelName: "Enter period in months",
            //     labelKey: "LAMS_FOR_A_PERIOD_PLACEHOLDER"
            //   },
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4
            //   },
            //   required: true,
            //   pattern: monthsPattern,
            //   jsonPath: "lamsStore.Lease[0].months",
            //   sourceJsonPath: "lamsStore.Lease[0].months",
            //   visible: false,
            //   afterFieldChange: (action, state, dispatch) => {
            //     onMonthsChanged(action, state, dispatch);
            //   },
            // }),
            // fatherOrHusbandName: getTextField({
            //   label: {
            //     labelName: "Father/Spouse Name",
            //     labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
            //   },
            //   props:{
            //     className:"applicant-details-error",
            //     //hasDependant: true,
            //     //onChange:null,
            //     //disabled:getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false,
            //   },
            //   placeholder: {
            //     labelName: "Enter Father/Spouse Name",
            //     labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
            //   },
            //   gridDefination: {
            //     xs: 12,
            //     sm: 4
            //   },
            //   required: true,
            //   pattern: getPattern("Name"),
            //   jsonPath: "lamsStore.Lease[0].fatherOrHusbandName",
            //   sourceJsonPath: "lamsStore.Lease[0].fatherOrHusbandName",
            //   visible: false,
            //   afterFieldChange: (action, state, dispatch) => {
            //     onFathersNameChanged(action, state, dispatch);
            //   },
            // }),
            downloadApplication: {
              uiFrameWork: "custom-atoms",
              componentPath: "Button",
              props: {
                disableValidation:true,
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  margin: "7px",
                  borderRadius: "inherit"
                }
              },
              children: {
                // previousButtonIcon: {
                //   uiFramework: "custom-atoms",
                //   componentPath: "Icon",
                //   props: {
                //     iconName: "keyboard_arrow_right"
                //   }
                // },
                previousButtonLabel: getLabel({
                  labelName: "DOWNLOAD_APPLICATION",
                  labelKey: "DOWNLOAD_APPLICATION"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack:  (state, dispatch) => {
                  onDownloadApplClicked(state, dispatch)
                }
              },
              visible: false,
            },
            eSignApplication: {
              uiFrameWork: "custom-atoms",
              componentPath: "Button",
              
              props: {
                disableValidation:true,
                variant: "outlined",
                color: "primary",
                style: {
                  minWidth: "180px",
                  height: "48px",
                  margin: "7px",
                  borderRadius: "inherit"
                }
              },
              children: {
                // previousButtonIcon: {
                //   uiFramework: "custom-atoms",
                //   componentPath: "Icon",
                //   props: {
                //     iconName: "keyboard_arrow_right"
                //   }
                // },
                previousButtonLabel: getLabel({
                  labelName: "DSIGN_APPLICATION",
                  labelKey: "DSIGN_APPLICATION"
                })
              },
              onClickDefination: {
                action: "condition",
                  callBack: (state, dispatch) => {
                    onEsignClicked(state, dispatch);
                  }
              },
              visible: false,
            },
            dSignConfirmationDialogDiv: {
              componentPath: "Dialog",
              props: {
                open: false,
                maxWidth: "sm",
                disableValidation: true
              },
              children: {
                dialogContent: {
                  componentPath: "DialogContent",
                  props: {
                    classes: {
                      root: "city-picker-dialog-style"
                    }
                    // style: { minHeight: "180px", minWidth: "365px" }
                  },
                  children: {
                    popup: dSignConfirmationDialog
                  }
                }
              }
            },
            downloadApplDialogDiv: {
              componentPath: "Dialog",
              props: {
                open: false,
                maxWidth: "sm",
                disableValidation: true
              },
              children: {
                dialogContent: {
                  componentPath: "DialogContent",
                  props: {
                    classes: {
                      root: "city-picker-dialog-style"
                    }
                    // style: { minHeight: "180px", minWidth: "365px" }
                  },
                  children: {
                    popup: downloadDialog
                  }
                }
              }
            },
        }),
          leaseDetails:{
            uiFramework: "custom-atoms",
            componentPath: "Div",
            visible:false,
            props: {
              disableValidation: true,
            },
            children: {
              details: getLeaseDetailsCard("lamsStore.selectedSurveyDetails")
            },
          },
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

export const OwnerInfoCard = getCommonCard(
  { 
    header: getCommonTitle(
      {
        labelName: "Applicant Details",
        labelKey: "LAMS_APPLICANT_DETAILS"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    ownerDetails: getCommonGrayCard({
        header: getCommonSubHeader(
          {
            labelName: "Owner Information",
            labelKey: "LAMS_APPLICANT_BASIC_DETAILS"
          },
          {
            style: {
              marginBottom: 18
            }
          }
        ),
        ownerDetailsCardContainer: getCommonContainer({
          getOwnerMobNoField: getTextField({
            label: {
              labelName: "Mobile No.",
              labelKey: "LAMS_APPLICANT_MOB_NO"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Mobile No.",
              labelKey: "LAMS_APPLICANT_MOB_NO_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("MobileNo"),
            jsonPath: "lamsStore.Lease[0].userDetails[0].mobileNumber",
            iconObj: {
              iconName: "search",
              position: "end",
              color: "#FE7A51",
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch, fieldInfo) => {
                  getDetailsForOwner(state, dispatch, fieldInfo);
                }
              }
            },
            title: {
              value: "Please search owner profile linked to the mobile no.",
              key: "LAMS_APPLICANT_MOB_NO_MESSAGE"
            },
            infoIcon: "info_circle",
            gridDefination: {
              xs: 12,
              sm: 6
            }
          }),
          ownerName: getTextField({
            label: {
              labelName: "Name",
              labelKey: "LAMS_APPLICANT_NAME_LABEL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Name",
              labelKey: "LAMS_APPLICANT_NAME_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("Name"),
            jsonPath: "lamsStore.Lease[0].userDetails[0].name",
            gridDefination: {
              xs: 12,
              sm: 6
            }
          }),
          getFatherNameField: getTextField({
            label: {
              labelName: "Father/Spouse Name",
              labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Father/Spouse Name",
              labelKey: "LAMS_APPLICANT_FATHER_NAME_LABEL"
            },
            required: true,
            pattern: getPattern("Name"),
            jsonPath:
              "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName",
            gridDefination: {
              xs: 12,
              sm: 6
            }
          }),
          getOwnerEmailField: getTextField({
            label: {
              labelName: "Email",
              labelKey: "LAMS_APPLICANT_EMAIL_LABEL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Email",
              labelKey: "LAMS_APPLICANT_EMAIL_PLACEHOLDER"
            },
            pattern: getPattern("Email"),
            jsonPath: "lamsStore.Lease[0].userDetails[0].emailId",
            gridDefination: {
              xs: 12,
              sm: 6
            }
          }),
          info1: getCommonCaption({
              labelName: "Note: This is only used to get the citizen information. Citizen Details cannot not be updated from here.",
              labelKey: "LAMS_APPL_DETAILS_NOTE"
            },
            {
              disableValidation:true,
            }
          ),
          // getRelationshipRadioButton: {
          //   uiFramework: "custom-containers",
          //   componentPath: "RadioGroupContainer",
          //   gridDefination: {
          //     xs: 12,
          //     sm: 12,
          //     md: 6
          //   },
          //   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
          //   props: {
          //     label: {
          //       name: "Relationship",
          //       key: "TL_COMMON_RELATIONSHIP_LABEL"
          //     },
          //     buttons: [
          //       {
          //         labelName: "Father",
          //         labelKey: "COMMON_RELATION_FATHER",
          //         value: "FATHER"
          //       },
          //       {
          //         labelName: "Mother",
          //         labelKey: "COMMON_RELATION_MOTHER",
          //         value: "MOTHER"
          //       },
          //       {
          //         label: "Spouse",
          //         labelKey: "COMMON_RELATION_SPOUSE",
          //         value: "SPOUSE"
          //       },
          //       {
          //         labelName: "Guardian",
          //         labelKey: "COMMON_RELATION_GUARDIAN",
          //         value: "GUARDIAN"
          //       }
          //     ],
          //     jsonPath:
          //       "Licenses[0].tradeLicenseDetail.owners[0].relationship",
          //     required: true
          //   },
          //   required: true,
          //   type: "array"
          // },
          // getRelationshipField : getSelectField({
          //   label: {
          //     labelName: "Relationship",
          //     labelKey: "TL_COMMON_RELATIONSHIP_LABEL"
          //   },
          //   placeholder: {
          //     labelName: "Select Relationship",
          //     labelKey: "TL_COMMON_RELATIONSHIP_PLACEHOLDER"
          //   },
          //   required: true,
          //   optionValue: "code",
          //   optionLabel: "label",
          //   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
          //   data: [
          //     {
          //       code: "FATHER",
          //       label: "COMMON_RELATION_FATHER"
          //     },
          //     {
          //       code: "MOTHER",
          //       label: "COMMON_RELATION_MOTHER"
          //     },
          //     {
          //       code: "SPOUSE",
          //       label: "COMMON_RELATION_SPOUSE"
          //     },    
          //     {
          //       code: "GUARDIAN",
          //       label: "COMMON_RELATION_GUARDIAN"
                
          //     }
          //   ]
          // }),
          // getOwnerGenderField: getSelectField({
          //   label: {
          //     labelName: "Gender",
          //     labelKey: "LAMS_APPLICANT_GENDER_LABEL"
          //   },
          //   placeholder: {
          //     labelName: "Select Gender",
          //     labelKey: "LAMS_APPLICANT_GENDER_PLACEHOLDER"
          //   },
          //   required: true,
          //   optionValue: "code",
          //   optionLabel: "label",
          //   jsonPath: "lamsStore.Lease[0].userDetails[0].gender",
          //   data: [
          //     {
          //       code: "MALE",
          //       label: "COMMON_GENDER_MALE"
          //     },
          //     {
          //       code: "FEMALE",
          //       label: "COMMON_GENDER_FEMALE"
          //     },
          //     {
          //       code: "OTHERS",
          //       label: "COMMON_GENDER_TRANSGENDER"
          //     }
          //   ]
          // }),
          // ownerDOB: {
          //   ...getDateField({
          //     label: {
          //       labelName: "Date of Birth",
          //       labelKey: "LAMS_APPLICANT_DOB"
          //     },
          //     placeholder: {
          //       labelName: "Enter Date of Birth",
          //       labelKey: "LAMS_APPLICANT_DOB_PLACEHOLDER"
          //     },
          //     required: true,
          //     pattern: getPattern("Date"),
          //     isDOB: true,
          //     errorMessage: "LAMS_APPLICANT_DOB_ERROR_MESSAGE",
          //     jsonPath: "lamsStore.Lease[0].userDetails[0].dob",
          //     props: {
          //       inputProps: {
          //         max: getMaxDateForDOB()
          //       }
          //     }
          //   })
          // },
          // 
          // ownerPAN: getTextField({
          //   label: {
          //     labelName: "PAN No.",
          //     labelKey: "LAMS_APPLICANT_PAN_LABEL"
          //   },
          //   props:{
          //     className:"applicant-details-error"
          //   },
          //   placeholder: {
          //     labelName: "Enter Owner's PAN No.",
          //     labelKey: "LAMS_APPLICANT_PAN_PLACEHOLDER"
          //   },
          //   pattern: getPattern("PAN"),
          //   jsonPath: "lamsStore.Lease[0].userDetails[0].pan"
          // }),
          
          // ownerAddress: getTextField({
          //   label: {
          //     labelName: "Correspondence Address",
          //     labelKey: "LAMS_APPLICANT_ADDR_LABEL"
          //   },
          //   props:{
          //     className:"applicant-details-error"
          //   },
          //   placeholder: {
          //     labelName: "Enter Correspondence Address",
          //     labelKey: "LAMS_APPLICANT_ADDR_PLACEHOLDER"
          //   },
          //   required: true,
          //   pattern: getPattern("Address"),
          //   jsonPath: "lamsStore.Lease[0].userDetails[0].permanentAddress"
          // }),
          // OwnerSpecialCategory: getSelectField({
          //   label: {
          //     labelName: "Special Owner Category",
          //     labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_LABEL"
          //   },
          //   placeholder: {
          //     labelName: "Select Special Owner Category",
          //     labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_PLACEHOLDER"
          //   },
          //   jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
          //   sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType",
          //   localePrefix: {
          //     moduleName: "common-masters",
          //     masterName: "OwnerType"
          //   }
          // })
        })
      })
       
    });;