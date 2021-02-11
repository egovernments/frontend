import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getCommonHeader,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDateAndHandleNA, handleNA } from '../../utils';


export const ownerDetailsHeader = getCommonContainer({
  header: getCommonHeader({
    labelKey: "WS_COMMON_OWN_DETAIL"
  })
})

export const ownershipType = getLabelWithValue(
  {
    labelName: "Ownership Type ",
    labelKey: "WS_OWN_DETAIL_OWNERSHIP_TYPE_LABEL"  
  },
  {
    jsonPath: "applyScreen.property.ownershipCategory",
    callBack: handleNA,
    localePrefix: {
      moduleName: "WS",
      masterName: "OWNERSHIPCATEGORY"
    }
  }
)

export const ownerName = getLabelWithValue(
  {
    labelName: "Name",
    labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].name",
    callBack: handleNA
  }
)
export const ownerMobileNumber = getLabelWithValue(
  {
    labelName: "Mobile Number",
    labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
  },
  {
    jsonPath:
      "applyScreen.property.owners[0].mobileNumber",
    callBack: handleNA
  }
)
export const gender = getLabelWithValue(
  {
    labelName: "Gender",
    labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].gender",
    callBack: handleNA
  }
)
export const dateOfBirth = getLabelWithValue(
  {
    labelName: "Date Of Birth",
    labelKey: "WS_OWN_DETAIL_DOB_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].dob",
    callBack: convertEpochToDateAndHandleNA
  }
)
export const Relationship = getLabelWithValue(
  {
    labelName: "Relationship",
    labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].relationship",
    callBack: handleNA
  }
)
export const fatherName = getLabelWithValue(
  {
    labelName: "Father/Husband Name",
    labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
  },
  {
    jsonPath: "applyScreen.property.owners[0].fatherOrHusbandName",
    callBack: handleNA
  }
)
// export const ownerCategory = getLabelWithValue(
//   {
//     labelName: "Owner Category",
//     labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
//   },
//   {
//     jsonPath: "WaterConnection[0].property.ownershipCategory",
//   }
// )
export const email = getLabelWithValue(
  {
    labelName: "Email",
    labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].emailId",
    callBack: handleNA
  }
)
export const correspondenceAddress = getLabelWithValue(
  {
    labelName: "Correspondence Address",
    labelKey: "WS_OWN_DETAIL_CROSADD"
  },
  {
    jsonPath: "applyScreen.property.owners[0].correspondenceAddress",
    callBack: handleNA
  }
)
export const specialApplicantCategory = getLabelWithValue(
  {
    labelName: "Special Applicant Category",
    labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
  },
  {
    jsonPath: "applyScreen.property.owners[0].ownerType",
    callBack: handleNA
  }
)

export const getOwnerDetails = (isEditable = true) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form1",
    },
    children: {
      applicantSummary,
      institutionSummary,
    },
  };
};
export const checkValueForNA = value => {
  return value == null || value == undefined || value == '' ? "NA" : value;
};

export const applicantSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        
      }
    }
  },
 
  break: getBreak(),
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonContainer({
        ownerMobileNumber: getLabelWithValue(
          {
            labelName: "Mobile Number",
            labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
          },
          {
            jsonPath:
              "applyScreen.property.owners[0].mobileNumber",
              callBack: handleNA
          }),
          ownerName: getLabelWithValue(
            {
              labelName: "Name",
              labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
            },
            {
              jsonPath: "applyScreen.property.owners[0].name",
              callBack: handleNA
            }
          ),
          gender: getLabelWithValue(
            {
              labelName: "Gender",
              labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
            },
            {
              jsonPath: "applyScreen.property.owners[0].gender",
              localePrefix: {
                moduleName: "COMMON",
                masterName: "GENDER"
              },
              callBack: handleNA
            }
          ),
          fatherName: getLabelWithValue(
            {
              labelName: "Father/Husband Name",
              labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
            },
            {
              jsonPath: "applyScreen.property.owners[0].fatherOrHusbandName",
              callBack: handleNA
            }
          ),
          Relationship: getLabelWithValue(
            {
              labelName: "Relationship",
              labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
            },
            { jsonPath: "applyScreen.property.owners[0].relationship",
            localePrefix: {
              moduleName: "COMMON",
              masterName: "RELATION"
            },
            callBack: handleNA }
          ),
        reviewOwnerAddr: getLabelWithValue(
          {
            labelName: "Correspondence Address",
            labelKey: "WS_OWN_DETAIL_CROSADD"
          },
          {
            jsonPath: "applyScreen.property.owners[0].correspondenceAddress",
            callBack: checkValueForNA
          }
        ),
        reviewOwnerSpecialCat: getLabelWithValue(
          {
            labelName: "Special Applicant Category",
            labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
          },
          {
            jsonPath: "applyScreen.property.owners[0].ownerType",
            localePrefix: {
              moduleName: "common-masters",
              masterName: "OwnerType"
            },
            callBack: checkValueForNA
          }
        ),
        
        break: getBreak(),
        break: getBreak()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "applyScreen.property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

export const institutionSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        
      }
    }
  },
  breaks: getBreak(),
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonContainer({
  reviewInstituteName: getLabelWithValue(
    {
      labelName: "Institution Name",
      labelKey: "WS_COMMON_INSTITUTION_NAME"
    },
    {
      jsonPath: "applyScreen.property.institution.name",
      callBack: checkValueForNA
    }
  ),
  reviewinstituteType: getLabelWithValue(
    {
      labelName: "Institution Type",
      labelKey: "WS_COMMON_INSTITUTION_TYPE"
    },
    {
      jsonPath: "applyScreen.property.institution.type",
      localePrefix: {
        moduleName: "common-masters",
        masterName: "OwnerShipCategory"
      },
      callBack: checkValueForNA
    }
  ),
        break: getBreak()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "applyScreen.property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
 
  breaks1: getBreak(),
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonContainer({
        authorisedPersonName: getLabelWithValue(
          {
            labelName: "Name",
            labelKey: "WS_COMMON_AUTHORISED_PERSON_NAME"
          },
          {
            jsonPath: "applyScreen.property.owners[0].name",
            callBack: checkValueForNA
          }
        ),
        authorisedDesignationValue: getLabelWithValue(
          {
            labelName: "Designation",
            labelKey: "WS_COMMON_AUTHORISED_PERSON_DESIGNATION"
          },
          {
            jsonPath: "applyScreen.property.institution.designation",
            callBack: checkValueForNA
          }
        ),
        authorisedMobile: getLabelWithValue(
          {
            labelName: "Mobile",
            labelKey: "WS_COMMON_AUTHORISED_MOBILE"
          },
          {
            jsonPath: "applyScreen.property.owners[0].mobileNumber",
            callBack: checkValueForNA
          }
        ),
        authorisedLandline: getLabelWithValue(
          {
            labelName: "Landline",
            labelKey: "WS_COMMON_AUTHORISED_LANDLINE"
          },
          {
            jsonPath: "applyScreen.property.owners[0].altContactNumber",
            callBack: checkValueForNA
          }
        ),
        authorisedAddress: getLabelWithValue(
          {
            labelName: "Correspondence Address",
            labelKey: "WS_COMMON_AUTHORISED_CORRESPONDENCE_ADDRESS"
          },
          {
            jsonPath: "applyScreen.property.owners[0].correspondenceAddress",
            callBack: checkValueForNA
          }
        ),
       
        break: getBreak()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "applyScreen.property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
});