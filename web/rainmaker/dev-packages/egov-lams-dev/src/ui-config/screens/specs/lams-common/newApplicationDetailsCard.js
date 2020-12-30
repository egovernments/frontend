import {
    getCommonCard,   
    getCommonTitle,
    getSelectField,
    getCommonParagraph,
    getPattern,
    getTextField,
    getDateField,
    getCommonSubHeader,
    getCommonGrayCard,
    getCommonContainer 
  } from "egov-ui-framework/ui-config/screens/specs/utils";

  import get from "lodash/get";
  import {loadSurveyNumbers, getSurveyDetails} from "../lams-utils/utils"
  import {getDetailsForOwner, getMaxDateForDOB} from "../utils"
  import {documentListContainer} from "./documentListContainer";
  import {prepareFinalObject,  handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
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
        "components.div1.children.details.children.cardContent.children.optionSelection.children.surveyNo", //"components.newApplicationDetailsCard.children.cardContent.children.surveyNo",
        "visible",
        true
      )
    );
    const located = get(state.screenConfiguration.preparedFinalObject.lamsStore.Lease[0],"located");
    const LeaseRenewalWorkflowCode = (located === "insideCivil")? "LAMS_NewLR_CEO_V3": "LAMS_NewLR_DEO_V3";
    dispatch(prepareFinalObject("lamsStore.Lease[0].workflowCode", LeaseRenewalWorkflowCode));
  }

  const surveyNoChanged = (action, state, dispatch) => {
    getSurveyDetails(action, state, dispatch);
    dispatch(
      handleField(
        "newApplication",
        "components.div1.children.details.children.cardContent.children.leaseDetails",
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
              autoSelect: true,
              gridDefination: {
                xs: 12,
                sm: 4
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
              gridDefination: {
                xs: 12,
                sm: 4
              },
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
              gridDefination: {
                xs: 12,
                sm: 4
              }
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
            
        }),
          leaseDetails:{
            uiFramework: "custom-atoms",
            componentPath: "Div",
            visible:false,
            props: {
              disableValidation: true,
            },
            children: {
              details: leaseDetailsCard
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
            infoIcon: "info_circle"
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
            jsonPath: "lamsStore.Lease[0].userDetails[0].name"
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
              "lamsStore.Lease[0].userDetails[0].fatherOrHusbandName"
          }),
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
          getOwnerGenderField: getSelectField({
            label: {
              labelName: "Gender",
              labelKey: "LAMS_APPLICANT_GENDER_LABEL"
            },
            placeholder: {
              labelName: "Select Gender",
              labelKey: "LAMS_APPLICANT_GENDER_PLACEHOLDER"
            },
            required: true,
            optionValue: "code",
            optionLabel: "label",
            jsonPath: "lamsStore.Lease[0].userDetails[0].gender",
            data: [
              {
                code: "MALE",
                label: "COMMON_GENDER_MALE"
              },
              {
                code: "FEMALE",
                label: "COMMON_GENDER_FEMALE"
              },
              {
                code: "OTHERS",
                label: "COMMON_GENDER_TRANSGENDER"
              }
            ]
          }),
          ownerDOB: {
            ...getDateField({
              label: {
                labelName: "Date of Birth",
                labelKey: "LAMS_APPLICANT_DOB"
              },
              placeholder: {
                labelName: "Enter Date of Birth",
                labelKey: "LAMS_APPLICANT_DOB_PLACEHOLDER"
              },
              required: true,
              pattern: getPattern("Date"),
              isDOB: true,
              errorMessage: "LAMS_APPLICANT_DOB_ERROR_MESSAGE",
              jsonPath: "lamsStore.Lease[0].userDetails[0].dob",
              props: {
                inputProps: {
                  max: getMaxDateForDOB()
                }
              }
            })
          },
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
            jsonPath: "lamsStore.Lease[0].userDetails[0].emailId"
          }),
          ownerPAN: getTextField({
            label: {
              labelName: "PAN No.",
              labelKey: "LAMS_APPLICANT_PAN_LABEL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Owner's PAN No.",
              labelKey: "LAMS_APPLICANT_PAN_PLACEHOLDER"
            },
            pattern: getPattern("PAN"),
            jsonPath: "lamsStore.Lease[0].userDetails[0].pan"
          }),
          
          ownerAddress: getTextField({
            label: {
              labelName: "Correspondence Address",
              labelKey: "LAMS_APPLICANT_ADDR_LABEL"
            },
            props:{
              className:"applicant-details-error"
            },
            placeholder: {
              labelName: "Enter Correspondence Address",
              labelKey: "LAMS_APPLICANT_ADDR_PLACEHOLDER"
            },
            required: true,
            pattern: getPattern("Address"),
            jsonPath: "lamsStore.Lease[0].userDetails[0].permanentAddress"
          }),
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