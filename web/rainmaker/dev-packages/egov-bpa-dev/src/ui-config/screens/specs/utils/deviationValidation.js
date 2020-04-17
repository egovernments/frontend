import _ from "lodash";
import { edcrHttpRequest } from "../../../../ui-utils/api";
export const APPROVED = "Approved";
export const ALLOW = "Validate and allow";
export const REJECT = "Validate and restrict";
export const INCOMPLETEINFO = "Not enough details";

const validationParams = [
  {
    parameter: "NumberofFloors",
    tolerancelimit: 1,
    calculationType: "number",
    restrictionType: APPROVED,
    paramPath: "edcrDetail[0].planDetail.blocks[0].building.totalFloors",
  },
  {
    parameter: "BuiltupArea",
    tolerancelimit: 10,
    calculationType: "percentage",
    restrictionType: REJECT,
    paramPath: "edcrDetail[0].planDetail.virtualBuilding.totalBuitUpArea",
  },
  {
    parameter: "FloorArea",
    tolerancelimit: 10,
    calculationType: "percentage",
    restrictionType: REJECT,
    paramPath: "edcrDetail[0].planDetail.virtualBuilding.totalFloorArea",
  },
  {
    parameter: "CarpetArea",
    tolerancelimit: 10,
    calculationType: "percentage",
    restrictionType: APPROVED,
    paramPath: "edcrDetail[0].planDetail.virtualBuilding.totalCarpetArea",
  },
  {
    parameter: "BuildingHeight",
    tolerancelimit: 10,
    calculationType: "number",
    restrictionType: REJECT,
    paramPath: "edcrDetail[0].planDetail.virtualBuilding.buildingHeight",
  },
];

const getScrutinyDetails = async (edcrNumber, tenantId) => {
  const edcrRes = await edcrHttpRequest(
    "post",
    "/edcr/rest/dcr/scrutinydetails?edcrNumber=" +
      edcrNumber +
      "&tenantId=" +
      tenantId,
    "search",
    []
  );
  return edcrRes;
};
export const deviationValidation = async (
  planEDCRNumber,
  ocEdcrNumber,
  tenantId
) => {
  const planEDCRDetails = await getScrutinyDetails(planEDCRNumber, tenantId);
  const ocEDCRDetails = await getScrutinyDetails(ocEdcrNumber, tenantId);
  let validationResponse = APPROVED;
  let planParam = [],
    ocParam = [];

  for (let paramRecord of validationParams) {

    let firstIndex = paramRecord.paramPath.indexOf("[");
    let lastIndex = paramRecord.paramPath.lastIndexOf("[");

    if (firstIndex !== lastIndex) {// To check if the record has multiple sub records like blocks
      let firstpath = paramRecord.paramPath.substring(0, lastIndex);
      let secondpath = paramRecord.paramPath.substring(lastIndex + 4);
      let planRecs = _.get(planEDCRDetails, firstpath, []);
      let ocRecs = _.get(ocEDCRDetails, firstpath, []);
      planRecs.forEach((element, i) => {
        planParam.push(_.get(planRecs[i], secondpath, null));
        ocParam.push(_.get(ocRecs[i], secondpath, null));
      });
    } else {
      planParam.push(_.get(planEDCRDetails, paramRecord.paramPath, null));
      ocParam.push(_.get(ocEDCRDetails, paramRecord.paramPath, null));
    }

    console.log(planParam, ocParam, paramRecord, "paramRecord.paramPath");
    if (planParam && ocParam && planParam.length=== ocParam.length) {
        for (let i=0; i<planParam.length; i++){
        let diff = 0;
        if (paramRecord.calculationType === "number") {
          diff = Math.abs(ocParam[i] - planParam[i]);
        } else {
          //(paramRecord.calculationType==="percentage"){
          diff = (Math.abs(ocParam[i] - planParam[i]) / planParam[i]) * 100;
        }

        if (diff > paramRecord.tolerancelimit) {
          if (paramRecord.restrictionType === REJECT) {
            validationResponse = REJECT;
            break;
          } else {
            validationResponse = ALLOW;
          }
        }
      }
    } else {
      validationResponse = INCOMPLETEINFO;
      break;
    }
    //    });

    console.log(validationResponse, "validationResponse");
  }
  return validationResponse;
};
