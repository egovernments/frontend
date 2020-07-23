import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDateAndHandleNA } from '../../utils';

export const reviewModificationsEffectiveDate = {
  reviewModification:getLabelWithValue(
  {
    labelName: "Modifications Effective Date",
    labelKey: "WS_MODIFICATIONS_EFFECTIVE_DATE"
  },
  {
    jsonPath: "WaterConnection[0].dateEffectiveFrom",
    callBack: convertEpochToDateAndHandleNA
  }
)};

export const reviewModificationsEffective = () => {
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
            labelKey: "WS_MODIFICATIONS_EFFECTIVE_FROM"
          })
        }
      }
    },
    viewOne: modificationsEffectiveDateDetails
  })
};

const modificationsEffectiveDateDetails = getCommonContainer(
  reviewModificationsEffectiveDate
);