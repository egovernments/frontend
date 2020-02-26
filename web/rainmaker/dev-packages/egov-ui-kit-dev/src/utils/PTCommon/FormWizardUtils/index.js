import React from "react";
import formHoc from "../../../hocs/form";
import { httpRequest } from "../../api";
import { getQueryValue, getFinancialYearFromQuery, convertUnitsToSqFt, findCorrectDateObj, findCorrectDateObjPenaltyIntrest } from "../../PTCommon";
import { Icon } from "../../../components";
import Label from "../../../utils/translationNode";
import { getPlotAndFloorFormConfigPath } from "../../../config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager";
import { get, set, isEmpty } from "lodash";
import { trimObj } from "../../../utils/commons";
import { MDMS } from "../../../utils/endPoints";
import {  localStorageGet } from "egov-ui-kit/utils/localStorageUtils";


const extractFromString = (str, index) => {
  if (!str) {
    return "";
  }
  // if (index==null) {
  //   return str;
  // }
  let arrayOfValues = str.split(".");
  if (arrayOfValues && arrayOfValues.length == 0) {
    return arrayOfValues[0];
  }
  if (index > arrayOfValues.length) {
    return null;
  }
  if (index <= arrayOfValues.length) {
    return arrayOfValues[index];
  }
  return null;
};

export const updateDraftinLocalStorage = async (draftInfo, assessmentNumber, self) => {
  // localStorageSet("draftId", draftInfo.id);
  self.setState(
    {
      draftRequest: { draft: draftInfo },
    },
    async () => {
      if (assessmentNumber) {
        let { draftRequest, selected } = self.state;
        const { form, prepareFormData } = self.props;
        const assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;
        draftRequest.draft = {
          ...draftRequest.draft,
          assessmentNumber: assessmentNo,
          draftRecord: {
            ...draftRequest.draft.draftRecord,
            selectedTabIndex: assessmentNumber ? selected : selected + 1,
            ...form,
            assessmentNumber: assessmentNo,
            prepareFormData,
          },
          prepareFormData,
        };
        try {
          let draftResponse = await httpRequest("pt-services-v2/drafts/_update", "_update", [], draftRequest);
          const draftInfo = draftResponse.drafts[0];
          updateDraftinLocalStorage(draftInfo);
        } catch (e) {
          alert(e);
        }
      }
      return;
    }
  );
};
export const getBusinessServiceNextAction = (businessServiceName, currentAction) => {
  const businessServiceData = JSON.parse(
    localStorageGet("businessServiceData")
  );
  
  const data =businessServiceData&&businessServiceData.filter(businessService=>businessService.businessService=="PT.CREATE");
  let { states } = data&&data.length>0&&data[0] || [];

  if (states && states.length > 0) {
    states = states.filter((item, index) => {
      if (item.state == null && item.actions && item.actions.length > 0) {
        return item.actions;
      }
    });
    const actions = states && states.length > 0 && states[0].actions;
    return actions && actions.length > 0 && actions[0].action;
  }
}

export const convertToOldPTObject = (newObject) => {
  let Properties = [
    {
      propertyId: "",
      tenantId: "",
      acknowldgementNumber: "",
      oldPropertyId: null,
      status: "",
      address: {},
      auditDetails: {},
      creationReason: null,
      occupancyDate: 0,
      propertyDetails: [
        {
          institution: null,
          tenantId: "",
          citizenInfo: {},
          source: null,
          status: "",
          usage: null,
          noOfFloors: 0,
          landArea: 0,
          buildUpArea: null,
          units: null,
          documents: null,
          additionalDetails: {
            inflammable: false,
            heightAbove36Feet: false,
          },
          financialYear: "",
          propertyType: "",
          propertySubType: null,
          assessmentNumber: "",
          assessmentDate: 0,
          usageCategoryMajor: "",
          usageCategoryMinor: "",
          ownershipCategory: "",
          subOwnershipCategory: "",
          adhocExemption: null,
          adhocPenalty: null,
          adhocExemptionReason: null,
          adhocPenaltyReason: null,
          owners: [
            {
              persisterRefId: null,
              id: null,
              uuid: "",
              userName: "",
              password: null,
              salutation: null,
              name: "",
              gender: "",
              mobileNumber: "",
              emailId: null,
              altContactNumber: null,
              pan: null,
              aadhaarNumber: null,
              permanentAddress: null,
              permanentCity: null,
              permanentPinCode: null,
              correspondenceCity: null,
              correspondencePinCode: null,
              correspondenceAddress: null,
              active: true,
              dob: null,
              pwdExpiryDate: 0,
              locale: null,
              type: "",
              signature: null,
              accountLocked: false,
              roles: [],
              fatherOrHusbandName: "",
              bloodGroup: null,
              identificationMark: null,
              photo: null,
              createdBy: "",
              createdDate: 0,
              lastModifiedBy: "",
              lastModifiedDate: 0,
              otpReference: null,
              tenantId: "",
              isPrimaryOwner: null,
              ownerShipPercentage: null,
              ownerType: "",
              institutionId: null,
              documents: [],
              relationship: "",
              additionalDetails: null,
            },
          ],
          auditDetails: {},
          calculation: null,
          channel: null,
        },
      ],
      additionalDetails: null,
    },
  ];
  let newProperty = newObject.Properties[0];
  let property = {};
  let propertyDetails = {};

  property.propertyId = newProperty.propertyId;
  property.tenantId = newProperty.tenantId;
  property.acknowldgementNumber = newProperty.acknowldgementNumber;
  property.oldPropertyId = newProperty.oldPropertyId;
  property.status = newProperty.status;
  property.address = newProperty.address;
  property.auditDetails = newProperty.auditDetails;
  property.creationReason = newProperty.creationReason;
  property.occupancyDate = newProperty.units && newProperty.units.length && newProperty.units[0].occupancyDate;
  property.additionalDetails = newProperty.additionalDetails;

  propertyDetails.institution = newProperty.institution;
  propertyDetails.tenantId = newProperty.tenantId;
  propertyDetails.citizenInfo = newProperty.owners[0];
  propertyDetails.source = newProperty.source;
  propertyDetails.status = newProperty.status;
  propertyDetails.usage = null;
  propertyDetails.noOfFloors = newProperty.noOfFloors;
  propertyDetails.landArea = newProperty.landArea;
  propertyDetails.buildUpArea = newProperty.superBuiltUpArea;
  propertyDetails.units = newProperty.units;

  propertyDetails.documents = newProperty.documents;
  propertyDetails.additionalDetails = newProperty.additionalDetails;
  propertyDetails.financialYear = null;
  propertyDetails.propertyType = extractFromString(newProperty.propertyType, 0);
  propertyDetails.propertySubType = extractFromString(newProperty.propertyType, 1);
  propertyDetails.assessmentNumber = 0;
  propertyDetails.assessmentDate = null;
  propertyDetails.usageCategoryMajor = extractFromString(newProperty.usageCategory, 0);
  propertyDetails.usageCategoryMinor = extractFromString(newProperty.usageCategory, 1);
  propertyDetails.ownershipCategory = extractFromString(newProperty.ownershipCategory, 0);
  propertyDetails.subOwnershipCategory = extractFromString(newProperty.ownershipCategory, 1);
  propertyDetails.adhocExemption = null;
  propertyDetails.adhocPenalty = null;
  propertyDetails.adhocExemptionReason = null;
  propertyDetails.adhocPenaltyReason = null;
  propertyDetails.owners = newProperty.owners;
  propertyDetails.owners=propertyDetails.owners.filter((owner)=>owner.status=='ACTIVE')

  // propertyDetails.owners[0].persisterRefId = null;
  // propertyDetails.owners[0].id = newProperty.id;
  // propertyDetails.owners[0].uuid = newProperty.owners[0].uuid;
  // propertyDetails.owners[0].userName = newProperty.owners[0].userName;
  // propertyDetails.owners[0].password = newProperty.owners[0].password;
  // propertyDetails.owners[0].salutation = newProperty.owners[0].salutation;
  // propertyDetails.owners[0].name = newProperty.owners[0].name;
  // propertyDetails.owners[0].gender = newProperty.owners[0].gender;
  // propertyDetails.owners[0].mobileNumber = newProperty.owners[0].mobileNumber;
  // propertyDetails.owners[0].emailId = newProperty.owners[0].emailId;
  // propertyDetails.owners[0].altContactNumber = newProperty.owners[0].altContactNumber;
  // propertyDetails.owners[0].pan = newProperty.owners[0].pan;
  // propertyDetails.owners[0].aadhaarNumber = newProperty.owners[0].aadhaarNumber;
  // propertyDetails.owners[0].permanentAddress = newProperty.owners[0].permanentAddress;
  // propertyDetails.owners[0].permanentCity = newProperty.owners[0].permanentCity;
  // propertyDetails.owners[0].permanentPinCode = newProperty.owners[0].permanentPinCode;
  // propertyDetails.owners[0].correspondenceCity = newProperty.owners[0].correspondenceCity;
  // propertyDetails.owners[0].correspondencePinCode = newProperty.owners[0].correspondencePinCode;
  // propertyDetails.owners[0].correspondenceAddress = newProperty.owners[0].correspondenceAddress;
  // propertyDetails.owners[0].active = newProperty.owners[0].active;
  // propertyDetails.owners[0].dob = newProperty.owners[0].dob;
  // propertyDetails.owners[0].pwdExpiryDate = newProperty.owners[0].pwdExpiryDate;
  // propertyDetails.owners[0].locale = newProperty.owners[0].locale;
  // propertyDetails.owners[0].type = newProperty.owners[0].type;
  // propertyDetails.owners[0].signature = newProperty.owners[0].signature;
  // propertyDetails.owners[0].accountLocked = newProperty.owners[0].accountLocked;
  // propertyDetails.owners[0].roles = newProperty.owners[0].roles;
  // propertyDetails.owners[0].fatherOrHusbandName = newProperty.owners[0].fatherOrHusbandName;
  // propertyDetails.owners[0].bloodGroup = newProperty.owners[0].bloodGroup;
  // propertyDetails.owners[0].identificationMark = newProperty.owners[0].identificationMark;
  // propertyDetails.owners[0].photo = newProperty.owners[0].photo;
  // propertyDetails.owners[0].createdBy = newProperty.owners[0].createdBy;
  // propertyDetails.owners[0].createdDate = newProperty.owners[0].createdDate;
  // propertyDetails.owners[0].lastModifiedBy = newProperty.owners[0].lastModifiedBy;
  // propertyDetails.owners[0].lastModifiedDate = newProperty.owners[0].lastModifiedDate;
  // propertyDetails.owners[0].otpReference = null;
  // propertyDetails.owners[0].tenantId = newProperty.owners[0].tenantId;
  // propertyDetails.owners[0].isPrimaryOwner = newProperty.owners[0].isPrimaryOwner;
  // propertyDetails.owners[0].ownerShipPercentage = newProperty.owners[0].ownerShipPercentage;
  // propertyDetails.owners[0].ownerType = newProperty.owners[0].ownerType;
  // propertyDetails.owners[0].institutionId = newProperty.owners[0].institutionId;
  // propertyDetails.owners[0].documents = newProperty.owners[0].documents;
  // propertyDetails.owners[0].relationship = newProperty.owners[0].relationship;
  // propertyDetails.owners[0].additionalDetails = newProperty.additionalDetails;
  propertyDetails.auditDetails = newProperty.auditDetails;
  propertyDetails.calculation = null;
  propertyDetails.channel = newProperty.channel;
  propertyDetails.units = propertyDetails.units && propertyDetails.units.map(unit => {
    // unit.usageCategory;
    // propertyDetails.propertyType = extractFromString(newProperty.propertyType, 0);
    // propertyDetails.propertySubType = extractFromString(newProperty.propertyType, 1);
    unit.usageCategoryMajor = extractFromString(unit.usageCategory, 0)
    unit.usageCategoryMinor = extractFromString(unit.usageCategory, 1)
    unit.usageCategorySubMinor = extractFromString(unit.usageCategory, 2)
    unit.usageCategoryDetail = extractFromString(unit.usageCategory, 3)
    // unit.constructionDetail = {
    //   builtUpArea: unit.unitArea,
    // };
    unit.unitArea = unit.constructionDetail.builtUpArea;
    return { ...unit }
  })
  property["propertyDetails"] = [propertyDetails];
  Properties[0] = { ...newProperty, ...property };

  return Properties;
};

export const callDraft = async (self, formArray = [], assessmentNumber = "") => {
  let { draftRequest, selected } = self.state;
  const { form, location, common } = self.props;
  const { search } = location;

  let prepareFormData = {
    Properties: [...self.props.prepareFormData.Properties],
  };
  //toggleSpinner();
  if (get(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined))
    delete prepareFormData.Properties[0].propertyDetails[0].institution;
  const financialYearFromQuery = getFinancialYearFromQuery();
  const selectedownerShipCategoryType = get(form, "ownershipType.fields.typeOfOwnership.value", "");
  try {
    if (financialYearFromQuery) {
      set(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
    }
    if (selectedownerShipCategoryType === "SINGLEOWNER") {
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", getSingleOwnerInfo(self));
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].ownershipCategory",
        get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
      );
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
    } else if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", getMultipleOwnerInfo(self));
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].ownershipCategory",
        get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
      );
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
    } else if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
      const { instiObj, ownerArray } = getInstituteInfo(self);
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
      set(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
      set(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", get(form, "ownershipType.fields.typeOfOwnership.value", ""));
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", get(form, "institutionDetails.fields.type.value", ""));
    }
  } catch (e) {
    alert(e);
  }

  if (!draftRequest.draft.id) {
    draftRequest.draft.tenantId = getQueryValue(search, "tenantId") || prepareFormData.Properties[0].tenantId;
    draftRequest.draft.draftRecord = {
      selectedTabIndex: selected + 1,
      prepareFormData,
    };
    try {
      let draftResponse = await httpRequest("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);
      const draftInfo = draftResponse.drafts[0];

      updateDraftinLocalStorage(draftInfo, assessmentNumber, self);
    } catch (e) {
      alert(e);
    }
  } else {
    const assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;
    draftRequest.draft = {
      ...draftRequest.draft,
      assessmentNumber: assessmentNo,
      tenantId: getQueryValue(search, "tenantId") || prepareFormData.Properties[0].tenantId,
      draftRecord: {
        ...draftRequest.draft.draftRecord,
        selectedTabIndex: assessmentNumber ? selected : selected + 1,
        assessmentNumber: assessmentNo,
        prepareFormData,
      },
      prepareFormData,
    };
    try {
      if (selected === 3) {
        draftRequest = {
          ...draftRequest,
          draft: {
            ...draftRequest.draft,
            isActive: false,
          },
        };
      }
      let draftResponse = await httpRequest("pt-services-v2/drafts/_update", "_update", [], draftRequest);
      const draftInfo = draftResponse.drafts[0];

      updateDraftinLocalStorage(draftInfo, "", self);
    } catch (e) {
      alert(e);
    }
  }
};

export const updateTotalAmount = (value, isFullPayment, errorText) => {
  this.setState({
    totalAmountToBePaid: value,
    isFullPayment,
    partialAmountError: errorText,
  });
};

export const configOwner = (ownersCount, component) =>
  formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${ownersCount}`, path: "PropertyTaxPay", isCoreConfiguration: true })(component);

export function addOwner(isMultiple = false, component, self) {
  const { ownerInfoArr, ownersCount } = self.state;
  const OwnerInfoHOC = configOwner(ownersCount, component);
  self.setState(
    {
      ownerInfoArr: [...ownerInfoArr, { index: ownersCount, Component: OwnerInfoHOC }],
      ownersCount: ownersCount + 1,
    },
    () => {
      if (isMultiple) {
        addOwner(false, component, self);
      }
    }
  );
}

export const configOwnersDetailsFromDraft = (ownerFormKeys, component) => {
  const ownerDetails = [];
  let ownersCount = 0;
  ownerFormKeys.forEach((key) => {
    const currentOwnerIndex = parseInt(key.split("_")[1]);
    if (currentOwnerIndex >= ownersCount) ownersCount = currentOwnerIndex;
    const ownerInfo = configOwner(currentOwnerIndex, component);
    ownerDetails.push({ index: ownersCount, Component: ownerInfo });
  });
  if (!ownerDetails.length) {
    ownersCount = 0;
    const ownerInfo = configOwner(ownersCount, component);
    ownerDetails.push({ index: ownersCount, Component: ownerInfo });
  }
  return {
    ownerDetails,
    totalowners: ownersCount + 1,
  };
};

const convertBuiltUpAreaToSqFt = (builtUpArea) => {
  const builtUpAreaTransform = builtUpArea * 9;
  return Math.round(builtUpAreaTransform * 100) / 100;
};

export const getTargetPropertiesDetails = (propertyDetails, self) => {
  const { search } = self.props.location;
  const assessmentNumber = getQueryValue(search, "assessmentId");
  const selectedPropertyDetails = propertyDetails;
  // return the latest proeprty details of the selected year
  const lastIndex = 0;
  if (selectedPropertyDetails[lastIndex].propertySubType === "SHAREDPROPERTY") {
    selectedPropertyDetails[lastIndex].buildUpArea =
      selectedPropertyDetails[lastIndex] &&
      selectedPropertyDetails[lastIndex].buildUpArea &&
      convertBuiltUpAreaToSqFt(selectedPropertyDetails[lastIndex].buildUpArea);
  }
  selectedPropertyDetails[lastIndex].units =
    selectedPropertyDetails[lastIndex] && selectedPropertyDetails[lastIndex].units && convertUnitsToSqFt(selectedPropertyDetails[lastIndex].units);
  return [selectedPropertyDetails[lastIndex]];
};

export const getImportantDates = async (self) => {
  const { currentTenantId } = self.props;
  const financialYearFromQuery = getFinancialYearFromQuery();
  try {
    let ImpDatesResponse = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], {
      MdmsCriteria: {
        tenantId: currentTenantId,
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "Rebate",
              },
              {
                name: "Penalty",
              },
              {
                name: "Interest",
              },
              {
                name: "FireCess",
              },
            ],
          },
        ],
      },
    });
    if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
      const { Interest, FireCess, Rebate, Penalty } = ImpDatesResponse.MdmsRes.PropertyTax;
      const intrest = findCorrectDateObjPenaltyIntrest(financialYearFromQuery, Interest);
      const fireCess = findCorrectDateObj(financialYearFromQuery, FireCess);
      const rebate = findCorrectDateObj(financialYearFromQuery, Rebate);
      const penalty = findCorrectDateObjPenaltyIntrest(financialYearFromQuery, Penalty);
      self.setState({
        importantDates: {
          intrest,
          fireCess,
          rebate,
          penalty,
        },
      });
    }
  } catch (e) {
    alert(e);
  }
};

export const getConfigFromCombination = (combination, fetchConfigurationFn) => {
  let configObject = fetchConfigurationFn(combination);
  return configObject;
};

export const getSelectedCombination = (form, formKey, fieldKeys) => {
  return (
    form[formKey] &&
    form[formKey].fields &&
    fieldKeys.reduce((result, current) => {
      if (form[formKey].fields[current].value) {
        result += form[formKey].fields[current].value;
      } else {
        result = "";
      }
      return result;
    }, "")
  );
};

export const getSingleOwnerInfo = (self) => {
  const { ownerInfo } = self.props.form;
  const ownerObj = {
    documents: [{}],
  };
  Object.keys(ownerInfo.fields).map((field) => {
    const jsonPath = ownerInfo.fields[field].jsonPath;
    if (jsonPath.toLowerCase().indexOf("document") !== -1) {
      ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
        get(ownerInfo, `fields.${field}.value`, undefined) || null;
    } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || "Male";
    } else {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || null;
    }
  });
  const ownerArray = [ownerObj];
  return ownerArray;
};

export const getMultipleOwnerInfo = (self) => {
  let { form } = self.props;
  return Object.keys(form)
    .filter((formkey) => formkey.indexOf("ownerInfo_") !== -1)
    .reduce((acc, curr, currIndex, arr) => {
      const ownerData = [...acc];
      const currForm = form[curr];
      const ownerObj = {
        documents: [{}],
      };
      Object.keys(currForm.fields).map((field) => {
        const jsonPath = currForm.fields[field].jsonPath;
        if (jsonPath.toLowerCase().indexOf("document") !== -1) {
          ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || null;
        } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
          ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || "Male";
        } else {
          ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
            get(form, `${curr}.fields.${field}.value`, undefined) || null;
        }
      });
      ownerData.push(ownerObj);
      return ownerData;
    }, []);
};

export const getInstituteInfo = (self) => {
  const { institutionAuthority, institutionDetails } = self.props.form;
  const ownerObj = {};
  const instiObj = {};
  Object.keys(institutionAuthority.fields).map((field) => {
    const jsonPath = institutionAuthority.fields[field].jsonPath;
    ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
      get(institutionAuthority, `fields.${field}.value`, undefined) || null;
  });
  Object.keys(institutionDetails.fields).map((field) => {
    const jsonPath = institutionDetails.fields[field].jsonPath;
    instiObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
      get(institutionDetails, `fields.${field}.value`, undefined) || null;
  });
  instiObj.designation = get(institutionAuthority, "fields.designation.value", "");
  const ownerArray = [ownerObj];
  return { instiObj, ownerArray };
};

const getFloorAndUnit = (floorNo, unitIndex, self) => {
  const { common } = self.props;
  const floorName = get(common, `generalMDMSDataById.Floor[${floorNo}].name`, "");
  return `${floorName} Unit - ${unitIndex}`;
};

const getBillingRate = (id, responseArr) => {
  return `${responseArr.filter((item) => item.id === id)[0].unitRate}/sq yards`;
};

export const getCalculationScreenData = async (billingSlabs, tenantId, self) => {
  const { prepareFormData } = self.props;
  const unitsArray = get(prepareFormData, "Properties[0].propertyDetails[0].units");
  const filteredUnitsArray = unitsArray && unitsArray.filter((item) => item !== null);
  const mapIdWithIndex = billingSlabs.reduce(
    (res, curr) => {
      const obj = {
        id: curr.split("|")[0],
        index: curr.split("|")[1],
      };
      res["mappedIds"].push(obj);
      res["idsArray"].push(curr.split("|")[0]);
      return res;
    },
    { mappedIds: [], idsArray: [] }
  );
  ("pt-calculator-v2/billingslab/_search");
  try {
    var billingSlabResponse = await httpRequest("pt-calculator-v2/billingslab/_search", "_search", [
      { key: "id", value: mapIdWithIndex.idsArray.join(",") },
      { key: "tenantId", value: tenantId },
    ]);
  } catch (e) {
    alert(e.message);
  }

  let finalData = mapIdWithIndex.mappedIds.reduce(
    (res, curr) => {
      const { floorNo } = filteredUnitsArray[curr.index];
      if (res.floorObj.hasOwnProperty(floorNo)) {
        res.floorObj[floorNo]++;
      } else {
        res.floorObj[floorNo] = 1;
      }
      const obj = {
        label: getFloorAndUnit(floorNo, res.floorObj[floorNo], self),
        value: getBillingRate(curr.id, billingSlabResponse.billingSlab),
        floorNo,
      };
      res.data.push(obj);
      return res;
    },
    { floorObj: {}, unitIndex: 1, data: [] }
  );
  finalData.data.sort((item1, item2) => item1.floorNo - item2.floorNo);
  return finalData;
};

export const getHeaderLabel = (selected, role) => {
  switch (selected) {
    case 0:
      return (
        <Label
          containerStyle={{ marginTop: 12 }}
          fontSize="16px"
          color="#484848"
          label={role === "citizen" ? "PT_FORM1_HEADER_MESSAGE" : "PT_EMP_FORM1_HEADER_MESSAGE"}
        />
      );
    case 1:
      return (
        <Label
          containerStyle={{ marginTop: 12 }}
          fontSize="16px"
          color="#484848"
          label={role === "citizen" ? "PT_FORM2_HEADER_MESSAGE" : "PT_EMP_FORM2_HEADER_MESSAGE"}
        />
      );
    case 2:
      return (
        <Label
          containerStyle={{ marginTop: 12 }}
          fontSize="16px"
          color="#484848"
          label={role === "citizen" ? "PT_FORM3_HEADER_MESSAGE" : "PT_EMP_FORM3_HEADER_MESSAGE"}
        />
      );
    case 3:
      return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" />;
    case 4:
      return (
        <Label
          containerStyle={{ marginTop: 12 }}
          fontSize="16px"
          color="#484848"
          label={role === "citizen" ? "PT_FORM1_HEADER_MESSAGE" : "PT_EMP_FORM5_HEADER_MESSAGE"}
        />
      );
  }
};

export const getFooterLabel = (selected) => {
  //needs to be in utils
  if (selected === 0) {
    return (
      <div
        className="rainmaker-displayInline"
        style={{ padding: "12px 0px 12px 16px", border: "1px solid #5aaafa", borderLeft: "5px solid #5aaafa" }}
      >
        <Icon action="action" name="info" color="#30588c" />
        <Label containerStyle={{ marginLeft: 16 }} fontSize="14px" color="#484848" label="PT_FORM1_INFORMATION_MESSAGE" />
      </div>
    );
  }
};

export const normalizePropertyDetails = (properties, self) => {
  let { search } = self.props.location;
  const propertyInfo = trimObj(JSON.parse(JSON.stringify(properties)));
  const property = propertyInfo[0] || {};
  const { propertyDetails } = property;
  const isReassesment = !!getQueryValue(search, "isReassesment");
  const propertyId = getQueryValue(search, "propertyId");
  const units =
    propertyDetails[0] && propertyDetails[0].units
      ? propertyDetails[0].units.filter((item, ind) => {
        return item !== null;
      })
      : [];
  if (isReassesment && propertyId) {
    property.propertyId = propertyId;
  }
  var sumOfUnitArea = 0;
  units.forEach((unit) => {
    let unitAreaInSqYd = parseFloat(unit.unitArea) / 9;
    unit.unitArea = Math.round(unitAreaInSqYd * 100) / 100;
    sumOfUnitArea += unit.unitArea;
  });
  if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
    propertyDetails[0].buildUpArea = sumOfUnitArea;
  }
  propertyDetails[0].units = units;

  if (window.appOverrides) {
    window.appOverrides.submitForm(propertyInfo);
  }

  return propertyInfo;
};

export const validateUnitandPlotSize = (plotDetails, form) => {
  //needs to be in utils
  let isValid = true;
  Object.keys(form).forEach((formKey, ind) => {
    if (formKey.startsWith("customSelect_")) {
      const floorCardIndex = formKey.split("_")[1];
      const { fields } = form[formKey];
      const floorNo = fields.floorName.value;
      const unitTotal = Object.keys(form).reduce((unitTotal, key) => {
        if (key.startsWith(`floorDetails_${floorCardIndex}_`)) {
          const form1 = form[key];
          if (form1 && form1.fields.builtArea.value) {
            unitTotal += parseFloat(form1.fields.builtArea.value);
          }
        }
        return unitTotal;
      }, 0);
      const plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
      if (unitTotal > plotSizeInFt) {
        alert(`Total area of floor ${floorNo} has exceeded the plot size`);
        isValid = false;
      }
    }
  });
  return isValid;
};

export const renderPlotAndFloorDetails = (fromReviewPage, PlotComp, FloorComp, self) => {
  let { basicInformation, plotDetails, floorDetails_0 } = self.props.form;
  if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
    let uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
    floorDetails_0.fields.builtArea.floatingLabelText = `Built Area(${uom})`;
  }

  if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
    let pathFormKeyObject = getPlotAndFloorFormConfigPath(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
    return !isEmpty(pathFormKeyObject) ? (
      <div>
        {pathFormKeyObject.hasPlot && <PlotComp component={pathFormKeyObject.plotForm} disabled={fromReviewPage} />}
        {pathFormKeyObject.hasFloor && <FloorComp componentDetails={pathFormKeyObject.floorObject} disabled={fromReviewPage} />}
      </div>
    ) : null;
  } else {
    return null;
  }
};

export const removeAdhocIfDifferentFY = (property, fY) => {
  set(property, "Properties[0].propertyDetails[0].adhocExemption", null);
  set(property, "Properties[0].propertyDetails[0].adhocExemptionReason", null);
  set(property, "Properties[0].propertyDetails[0].adhocPenalty", null);
  set(property, "Properties[0].propertyDetails[0].adhocPenaltyReason", null);
  return property;
};
