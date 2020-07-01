import React from "react";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { Card } from "components";
import moment from "moment";
import Label from "egov-ui-kit/utils/translationNode";
// import { connect } from "react-redux";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";
const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);
const transform = (floor, key, generalMDMSDataById, propertyDetails) => {
  const { propertySubType, usageCategoryMajor } = propertyDetails;
  const { masterName, dataKey } = key;
  if (!masterName) {
    return floor["occupancyType"] === "RENTED" ? `INR ${floor["arv"]}` : `${Math.round(floor[dataKey] * 100) / 100} sq yards`;
  } else {
    if (floor[dataKey]) {
      if (dataKey === "usageCategoryDetail") {
        return generalMDMSDataById["UsageCategoryDetail"]
          ? generalMDMSDataById["UsageCategoryDetail"][floor[dataKey]].name
          : generalMDMSDataById["UsageCategorySubMinor"]
            ? generalMDMSDataById["UsageCategorySubMinor"][floor["usageCategorySubMinor"]].name
            : "NA";
      }
      // if (usageCategoryMajor === "RESIDENTIAL" && propertySubType === "SHAREDPROPERTY" && dataKey === "floorNo") {
      //   return "NA";
      // }
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "NA";
      } else {
        return generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][floor[dataKey]].name : "NA";
      }
    } else {
      return "NA";
    }
  }
};
const getAssessmentInfo = (propertyDetails, generalMDMSDataById) => {
  const { units=[], noOfFloors } = propertyDetails || {};
  return (
    propertyDetails && [
      {
        key: getTranslatedLabel("PT_ASSESMENT_INFO_USAGE_TYPE", localizationLabelsData),
        value: propertyDetails.usageCategoryMajor ? 'PROPERTYTAX_BILLING_SLAB_' + propertyDetails.usageCategoryMajor : "NA", //noOfFloors
      },
      {
        key: getTranslatedLabel("PT_ASSESMENT_INFO_TYPE_OF_BUILDING", localizationLabelsData),
        value: generalMDMSDataById
          ? propertyDetails.propertySubType
            ? generalMDMSDataById["PropertySubType"]
              ? generalMDMSDataById["PropertySubType"][propertyDetails.propertySubType].name
              : "NA"
            : generalMDMSDataById["PropertyType"]
              ? generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name
              : "NA"
          : "NA",
      },
      {
        key: getTranslatedLabel("PT_ASSESMENT_INFO_PLOT_SIZE", localizationLabelsData),
        value:
          propertyDetails.propertySubType === "SHAREDPROPERTY"
            ? "NA"
            : propertyDetails.uom
              ? `${propertyDetails.landArea} ${propertyDetails.uom}`
              : `${Math.round(propertyDetails.landArea * 100) / 100} sq yards`,
      },
      propertyDetails.propertySubType === "SHAREDPROPERTY"
        ? {
          key: getTranslatedLabel("PT_FLOOR_NO", localizationLabelsData),
          value: units.length>0? `${units[0].floorNo}` : "NA",
        } :
        {
          key: getTranslatedLabel("PT_ASSESMENT_INFO_NO_OF_FLOOR", localizationLabelsData),
          value: noOfFloors ? `${noOfFloors}` : "NA", //noOfFloors
        },
    ]
  );
};
const getUnitInfo = (units = [], propertyDetails) => {
  units = units || [];
  let floors = [];
  units.map((unit, index) => {
    if(unit){
      let floor = [{
        key: getTranslatedLabel("PT_ASSESSMENT_UNIT_USAGE_TYPE", localizationLabelsData),
        value: unit.usageCategoryMinor ? 'PROPERTYTAX_BILLING_SLAB_' + unit.usageCategoryMinor : (propertyDetails.usageCategoryMinor ? 'PROPERTYTAX_BILLING_SLAB_' + propertyDetails.usageCategoryMinor :
          (unit.usageCategoryMajor ? 'PROPERTYTAX_BILLING_SLAB_' + unit.usageCategoryMajor : "NA")),
      }, {
        key: getTranslatedLabel("PT_ASSESMENT_INFO_OCCUPLANCY", localizationLabelsData),
        value: unit.occupancyType ? 'PROPERTYTAX_OCCUPANCYTYPE_' + unit.occupancyType : "NA",
      }, {
        key: getTranslatedLabel("PT_FORM2_BUILT_AREA", localizationLabelsData),
        value: unit.unitArea ? unit.unitArea + '' : "NA",
      }];
      if (unit.occupancyType === "RENTED") {
        floor.push({
          key: getTranslatedLabel("PT_FORM2_TOTAL_ANNUAL_RENT", localizationLabelsData),
          value: unit.arv ? unit.arv + '' : "NA",
        })
      }
      if (!floors[unit['floorNo']]) {
        floors[unit['floorNo']] = [floor];
      } else {
        floors[unit['floorNo']].push(floor);
      }
    }
  }
  )
  return floors;
}
const getVasikaItems = (units = []) => {
  console.log(units,"unitsjai");
  // var units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  console.log("===units[0].vasikaDate==",units[0].vasikaDate);
  var vasika_date =(units && units[0].vasikaDate)? moment(units[0].vasikaDate).format('DD-MM-YYYY'):null;
  var allotment_date =(units && units[0].allotmentDate)? moment(units[0].allotmentDate).format('DD-MM-YYYY'):null;
  debugger;
    function convert(str) {
      // console.log("str==========================",str);
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
  units = units || [];
  return (
    units && [
      {
        key: "Vasika No",
        value: units[0].vasikaNo || "NA", //noOfFloors
      },
      {
        key: "Allotment No",
        value: units[0].allotmentNo || "NA", //noOfFloors
      },
      {
        key: "Vasika Date",
        value: vasika_date ? `${vasika_date}` : "NA",
      },
      {
        key: "Allotment Date",
        value: allotment_date ? `${allotment_date}` : "NA",
      },
      {
        key: "Bussiness Name",
        value: units[0].businessName || "NA", //noOfFloors allotment_date
      },
      {
        key: "Remarks",
        value: units[0].remrks || "NA", //noOfFloors
      },
      {
        key: "Do you have any inflammable material stored in your property?",
        value: units[0].inflammableMaterial === true ? "Yes" : "No",
      },
      {
        key: "Height of property more than 36 feet?",
        value: units[0].heightOfProperty === true ? "Yes" : "No",
      },
     
    ]
  );
}
//  const getEpochForDate = date => {
//   const dateSplit = date.split("/");
//   return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
// };
const AssessmentInfo = ({ properties, editIcon, generalMDMSDataById }) => {
  debugger;
  // console.log(properties,"propertiesasss");
  // console.log(generalMDMSDataById,"generalMDMSDataByIdassss");
  // console.log(properties.bussinessDetails[0],"bussinessDetails");
let hideSubsectionLabel=false;
  let assessmentItems = [];
  let subUnitItems = [];
  let subVasikaItems = [];
  const header = 'PT_ASSESMENT_INFO_SUB_HEADER';
  if (properties) {
    const { propertyDetails } = properties;
    const { bussinessDetails } = properties;
    // console.log(bussinessDetails,"bussinessDetails");
    // console.log(bussinessDetails[0].units[0].allotmentDate,"allotmentDate");
    // var attdate = bussinessDetails[0].units[0].allotmentDate;
    // console.log(getEpochForDate(attdate),"===========================")
    // function convert(str) {
    //   var date = new Date(str),
    //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    //     day = ("0" + date.getDate()).slice(-2);
    //   return [date.getFullYear(), mnth, day].join("-");
    // }
    // console.log(convert(attdate),"======================" )
    if (propertyDetails && propertyDetails.length > 0) {
      subUnitItems = getUnitInfo(propertyDetails[0]['units'], propertyDetails[0]);
      subVasikaItems = getVasikaItems(bussinessDetails[0]['units']);
      // console.log(subVasikaItems,"subVasikaItems");
      assessmentItems = getAssessmentInfo(propertyDetails[0], generalMDMSDataById);
      if(propertyDetails[0].propertySubType === "SHAREDPROPERTY"){
        hideSubsectionLabel=true;
      }
    }
  }
  return (
    <PropertyInfoCard editIcon={editIcon} items={assessmentItems} items2={subVasikaItems} header={header} subSection={subUnitItems} hideSubsectionLabel={hideSubsectionLabel} ></PropertyInfoCard>
  );
};
export default AssessmentInfo;