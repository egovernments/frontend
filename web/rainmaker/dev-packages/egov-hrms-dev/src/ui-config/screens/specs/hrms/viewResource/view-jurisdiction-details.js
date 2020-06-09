import {
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import get from "lodash/get";
import set from "lodash/set";

import { convertEpochToDate, checkValueForNA } from "../../utils";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";


const gotoCreatePage = (state, dispatch) => {
  const createUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/hrms/create?step=1`
      : `/hrms/create?step=1`;
  dispatch(setRoute(createUrl));
};

const jurisdictionCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-hr",
    scheama: getCommonGrayCard({
      jurisCardContainer: getCommonContainer({
        reviewHierarchy: getLabelWithValue(
          {
            labelName: "Hierarchy",
            labelKey: "HR_HIERARCHY_LABEL"
          },
          { jsonPath: "Employee[0].jurisdictions[0].hierarchy" }
        ),
        reviewBoundaryType: getLabelWithValue(
          {
            labelName: "Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_LABEL"
          },
          { jsonPath: "Employee[0].jurisdictions[0].boundaryType" }
        ),
        reviewBoundary: getLabelWithValue(
          { labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" },

          {
            jsonPath: "Employee[0].jurisdictions[0].boundary",           
            /* localePrefix: {
              moduleName: "TENANT",
              masterName: "TENANTS"
            } */         
    
          callBack: (value, state) => {       
           
            let tenantID =  get(
              state.screenConfiguration.preparedFinalObject,
              "Employee[0].tenantId",
              null
              );
               let boundary_type =  get(
              state.screenConfiguration.preparedFinalObject,
              "Employee[0].jurisdictions[0].boundaryType",
              null
              );

              if(boundary_type == "Zone")
                {
                /* let result = `${tenantID
                  .toUpperCase()
                  .replace(
                    /[.]/g,
                    "_"
                  )}_REVENUE_ZONE_${value
                  .toUpperCase()
                  .replace(/[._:-\s\/]/g, "_")}`;
                  return result; */

                  let tenantBoundary = get(
                    state.screenConfiguration.preparedFinalObject,
                    `createScreenMdmsData.egov-location.TenantBoundary`,
                    []
                  );

                  let crawlingData = get(
                    tenantBoundary[0],
                    "boundary.children",
                    []
                  );                  

                  if(crawlingData[0].code===value)
                   return crawlingData[0].code 

                }                 
                else if(boundary_type == "City")
                {
                  let result = `TENANT_TENANTS_${tenantID
                    .toUpperCase()
                    .replace(/[._:-\s\/]/g, "_")}`;
                  return result;  

                }
                else if(boundary_type === "Locality")
                {
                  
                  /* let result = `${tenantID
                    .toUpperCase()
                    .replace(
                      /[.]/g,
                      "_"
                    )}_REVENUE_${value
                    .toUpperCase()
                    .replace(/[._:-\s\/]/g, "_")}`; */
                    let tenantBoundary = get(
                      state.screenConfiguration.preparedFinalObject,
                      `createScreenMdmsData.egov-location.TenantBoundary`,
                      []
                    );
  
                    let crawlingData = get(
                      tenantBoundary[0],
                      "boundary.children",
                      []
                    );
                    let list = get(
                      crawlingData[0],
                      "children",
                      []
                    );
                    
                    let locality_value;

                    for(let i=0;i<list.length;i++)
                    {
                      for(let j=0;j<list[i].children.length;j++)
                    {
                       if(list[i].children[j].code==value)
                       {
                         locality_value = list[i].children[j].name;
                       }
                    }
                      
                    }
                    

                  return locality_value;

                }
                else if(boundary_type === "Block")
                {
                  /* let result = `${tenantID
                    .toUpperCase()
                    .replace(
                      /[.]/g,
                      "_"
                    )}_REVENUE_BLOCK_${value
                    .toUpperCase()
                    .replace(/[._:-\s\/]/g, "_")}`; */

                   let tenantBoundary = get(
                      state.screenConfiguration.preparedFinalObject,
                      `createScreenMdmsData.egov-location.TenantBoundary`,
                      []
                    );
  
                    let crawlingData = get(
                      tenantBoundary[0],
                      "boundary.children",
                      []
                    );
                    let list = get(
                      crawlingData[0],
                      "children",
                      []
                    );
                    const result = list.filter(list => list.code === value);                    
    
                    return result[0].name;
                }          

              } 
          }
       
        ),
         
      })
    }),

    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath:
      "children.cardContent.children.jurisCardContainer.children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
};

export const getJurisdictionDetailsView = (isReview = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Jurisdiction Details",
            labelKey: "HR_JURIS_DET_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isReview,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "HR_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: gotoCreatePage
          }
        }
      }
    },
    viewOne: jurisdictionCard
  });
};
