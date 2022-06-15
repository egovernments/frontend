import { getCommonHeader, getBreak, convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";
import { showSearches } from "./generateBillResource/billTabs";
import { viewCreateBill } from "./generateBillResource/viewCreateBills";
 import { bulkUpload } from "./generateBillResource/bulkUpload";
import { getTenantIdCommon } from "egov-ui-kit/utils/localStorageUtils";
import { prepareFinalObject,unMountScreen } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getRequiredDocData, showHideAdhocPopup } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils/api";
import commonConfig from "config/common.js";

const getMDMSData = (action, dispatch) => {
  // const moduleDetails = [
  //   {
  //     moduleName: "ws-services-masters",
  //     masterDetails: [
  //       { name: "Documents" }
  //     ] 
  //   }
  // ]
  // try {
  //   getRequiredDocData(action, dispatch, moduleDetails)
  // } catch (e) {
  //   console.log(e);
  // }
};

const getMhollaData = async(dispatch)=>{
//   const queryObject = [
//     { key: "tenantId", value: localStorage.getItem('tenant-id') },
     
//   ];
//   let response = await httpRequest(
//     "post",
//     "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
//     "_search",
//     queryObject,
//     {}
//   );
//   let mohallaDataArray = [];
//   let mohallaDataRow=null;
//   let name;
//   response.TenantBoundary[0].boundary.map((element,index) => {
//     name = element.name + "( "+element.code+" )";
//    // code=element.code;
//     mohallaDataRow={"code":name};
//    mohallaDataArray.push(mohallaDataRow);
  
//  });
 
//  dispatch(prepareFinalObject("mohallaData", mohallaDataArray));
}

// const getMDMSAppType =async (dispatch) => {
//   // getMDMS data for ApplicationType
//     let mdmsBody = {
//       MdmsCriteria: {
//         tenantId: commonConfig.tenantId,
//         moduleDetails: [
//          {
//             moduleName: "ws-services-masters", masterDetails: [
//               { name: "ApplicationType" }
//             ]
//           }
//         ]
//       }
//     };
  
//   }
  const header = getCommonHeader({
    labelKey: "Upload Meter Readings",
  });

  var formConfig = {
    name: "bulkUploadMeter",
    fields: {
      allotmentDate: {
        id: "allotmentDate",
        className: "bulkUploadMeter4",
        jsonPath: "Properties[0].additionalDetails.allotmentDate",
        type: "date",
        floatingLabelText: "PT_COMMON_ALLOTMENT_DATE",
        hintText: "Allotment Date",
        fullWidth: true
      },
    },
    // beforeInitForm: function beforeInitForm(action, store) {
    //   try {
  
    //     var state = store.getState();
    //     var allotmentD = (0, _get2.default)(state.common.prepareFormData, "Properties[0].additionalDetails.allotmentDate", "");
    //     var allotmentDate = allotmentD ? new Date(allotmentD) : null;
    //     (0, _set2.default)(action, "form.fields.allotmentDate.value", allotmentDate);
       
    //     return action;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

  }
  
export const getMdmsTenantsData = async (dispatch) => {
  // let mdmsBody = {
  //     MdmsCriteria: {
  //         tenantId: commonConfig.tenantId,
  //         moduleDetails: [
  //             {
  //                 moduleName: "tenant",
  //                 masterDetails: [
  //                     {
  //                         name: "tenants"
  //                     },
  //                     { 
  //                       name: "citymodule" 
  //                     }
  //                 ]
  //             },
  //         ]
  //     }
  // };
  // try {
  //     let payload = null;
  //     payload = await httpRequest(
  //         "post",
  //         "/egov-mdms-service/v1/_search",
  //         "_search",
  //         [],
  //         mdmsBody
  //     );
  //     payload.MdmsRes.tenant.tenants = payload.MdmsRes.tenant.citymodule[1].tenants;
  //     dispatch(prepareFinalObject("applyScreenMdmsData.tenant", payload.MdmsRes.tenant));

  // } catch (e) {
  //     console.log(e);
  // }
};




const BulkuploadMeter = {
  uiFramework: "material-ui",
  name: "BulkuploadMeter",
  beforeInitScreen: (action, state, dispatch) => {
   // getMDMSData(action, dispatch);
   // getMhollaData(dispatch);
   // getMDMSAppType(dispatch);
    getMdmsTenantsData(dispatch);
   
    dispatch(prepareFinalObject("searchConnection.tenantId", getTenantIdCommon()));
    dispatch(prepareFinalObject('generateBillScreen',{}))
    dispatch(prepareFinalObject('searchBillScreen',{}))
    dispatch(prepareFinalObject("currentTab", "CREATE_BILL"));


    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "BulkuploadMeter"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs:12,
                sm: 6
              },
              ...header
            },
            
          },
                 
        }, 
        bulkUpload
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "search"
      },
      children: {
        popup: {}
      }
    }
  }
};
exports.default = formConfig;
export default BulkuploadMeter;
