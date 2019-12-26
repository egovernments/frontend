
import { Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import React from "react";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);

const getOwnerInfo = (latestPropertyDetails, generalMDMSDataById) => {
  const isInstitution =
    latestPropertyDetails.ownershipCategory === "INSTITUTIONALPRIVATE" || latestPropertyDetails.ownershipCategory === "INSTITUTIONALGOVERNMENT";
  const { institution, owners: ownerDetails = [] } = latestPropertyDetails || {};
  let owner = [];
  if (ownerDetails && (ownerDetails.length > 0)) {
    owner = ownerDetails[0];
  }
  return (
    ownerDetails && ownerDetails.map((owner) => {
      return ({
        items: [
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_NAME_INSTI", localizationLabelsData),
              value: (institution && institution.name) || "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_NAME", localizationLabelsData),
              value: owner.name || "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_DESIGNATION", localizationLabelsData),
              value: institution.designation || "NA",
            }
            : {
              key: getTranslatedLabel("PT_SEARCHPROPERTY_TABEL_GUARDIANNAME", localizationLabelsData),
              value: owner.fatherOrHusbandName || "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_TYPE_INSTI", localizationLabelsData),
              value:
                (institution &&
                  institution.type &&
                  generalMDMSDataById &&
                  generalMDMSDataById["SubOwnerShipCategory"] &&
                  generalMDMSDataById["SubOwnerShipCategory"][institution.type].name) ||
                "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_GENDER", localizationLabelsData),
              value: owner.gender || "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel('PT_FORM3_OWNERSHIP_TYPE', localizationLabelsData),
              value: (institution &&
                institution.type &&
                generalMDMSDataById &&
                generalMDMSDataById["OwnerShipCategory"] &&
                generalMDMSDataById["OwnerShipCategory"][latestPropertyDetails.ownershipCategory].name) ||
                "NA",
            }
            : {
              key: getTranslatedLabel('PT_FORM3_OWNERSHIP_TYPE', localizationLabelsData),
              value: (institution &&
                institution.type &&
                generalMDMSDataById &&
                generalMDMSDataById["SubOwnerShipCategory"] &&
                generalMDMSDataById["SubOwnerShipCategory"][latestPropertyDetails.ownershipCategory].name) ||
                "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_NAME_OF_AUTH", localizationLabelsData),
              value: owner.name || "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
              value: owner.mobileNumber || "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_TEL_NO", localizationLabelsData),
              value: owner.altContactNumber || "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_EMAIL_ID", localizationLabelsData),
              value: owner.emailId || "NA",
            },
          isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
              value: owner.mobileNumber || "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_USER_CATEGORY", localizationLabelsData),
              value: (owner &&
                owner.ownerType &&
                generalMDMSDataById &&
                generalMDMSDataById["OwnerType"] &&
                generalMDMSDataById["OwnerType"][owner.ownerType].name) ||
                "NA",
            }, isInstitution
            ? {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
              value: owner.correspondenceAddress || "NA",
            }
            : {
              key: getTranslatedLabel("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
              value: owner.permanentAddress || "NA",
            },
            isInstitution
              ? {
                }
              : {
                  key: getTranslatedLabel("PT_OWNERSHIP_DOCUMENT_TYPE", localizationLabelsData),
                  value:owner.documents[0].documentType? getTranslatedLabel("PT_"+(owner.documents[0].documentType).toUpperCase(),localizationLabelsData) || "NA" : "NA",
                },
                isInstitution
              ? {
                }
              : {
                  key: getTranslatedLabel("PT_OWNERSHIP_DOCUMENT_ID", localizationLabelsData),
                  value:owner.documents[0].documentType? owner.documents[0].documentUid || "NA":"NA",
                },
        ]
      })
    })
  )

};
const formatOwnerInfo = (itemsArray = []) => {
  let ownersInfo = []
  if (itemsArray.length == 1) {
    ownersInfo = itemsArray[0].items;
  } else {
    const emptySpaces = [{ key: ' ', value: ' ' }, { key: ' ', value: ' ' }, { key: ' ', value: ' ' }];
    const ownerHeader = { key: ' ', value: 'Owner-' };
    for (let index = 0; index < itemsArray.length; index++) {
      let ownerInfo = [];
      ownerInfo = itemsArray[index].items;
      ownerInfo.unshift(...emptySpaces);
      ownerInfo.unshift({ ...ownerHeader, value: ownerHeader.value + '' + (index + 1) });
      ownersInfo.push(...ownerInfo)
    }
  }
  return ownersInfo;
}

const OwnerInfo = ({ properties, editIcon, generalMDMSDataById, ownershipTransfer, viewHistory }) => {
  let ownerItems = [];
  let ownerInfo = []
  let multipleOwner = false;
  const header = 'PT_OWNERSHIP_INFO_SUB_HEADER';
  if (properties) {
    const { propertyDetails } = properties;
    if (propertyDetails && propertyDetails.length > 0) {

      ownerInfo = getOwnerInfo(propertyDetails[0], generalMDMSDataById);
      if (ownerInfo.length == 1) {
        ownerItems = formatOwnerInfo(ownerInfo);
      } else {
        multipleOwner = true;
      }

    }
  }
  return (
    <div>
      {multipleOwner && <div>
        {ownerInfo && <Card style={{ backgroundColor: 'rgb(242, 242, 242)', boxShadow: 'none' }}
          textChildren={
            <div >
              <div className="pt-rf-title rainmaker-displayInline" style={{ justifyContent: "space-between", margin: '5px 0px 5px 0px' }}>
                <div className="rainmaker-displayInline" style={{ alignItems: "center", marginLeft: '13px' }}>
                  {header && <Label
                    labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                    label={header}
                    fontSize="18px"
                  />}
                </div>
                {{ editIcon } && <span style={{ alignItems: "right" }} >{editIcon}</span>}
              </div>
              <div>
                {ownerInfo.map(
                  (ownerItem, ind) => {
                    return (<div className="col-sm-12 col-xs-12" style={{ marginBottom: 10, marginTop: 5 }}>
                      <div className="pt-rf-title rainmaker-displayInline" style={{ justifyContent: "space-between", margin: '5px 0px 5px 0px' }}>
                        <div className="rainmaker-displayInline" style={{ alignItems: "center", marginLeft: '13px' }}>
                          {<Label
                            labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                            label={'COMMON_OWNER'}
                            secondaryText={'-' + (ind + 1)}
                            fontSize="18px"
                          />}
                        </div>
                      </div>
                      {ownerItem.items.map(
                        (item) => {
                          return (<div>
                            <div className="col-sm-3 col-xs-12" style={{ marginBottom: 10, marginTop: 5 }}>
                              <div className="col-sm-12 col-xs-12" style={{ padding: "5px 0px 0px 0px" }}>
                                <Label
                                  labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "1.375em" }}
                                  label={item.key ? item.key : "NA"}
                                  fontSize="12px"
                                />
                              </div>
                              <div className="col-sm-12 col-xs-12" style={{ padding: "5px 0px 0px 0px" }}>
                                <Label
                                  labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                                  label={item.value ? item.value : "NA"}
                                  fontSize="16px"
                                />
                              </div>
                            </div>
                          </div>)
                        })}
                    </div>)
                  }
                )}
              </div>
            </div>
          }
        />}
      </div>}
      {!multipleOwner && <PropertyInfoCard editIcon={editIcon} items={ownerItems} header={header} ownershipTransfer={ownershipTransfer} viewHistory={viewHistory}></PropertyInfoCard>}
    </div>);
};

export default OwnerInfo;
