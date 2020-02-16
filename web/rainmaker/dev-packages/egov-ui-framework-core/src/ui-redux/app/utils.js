import { transformLocalizationLabels } from "../../ui-utils/commons";
import { getLocalization } from "../../ui-utils/localStorageUtils";

export const initLocalizationLabels = (locale) => {
  let localizationLabels;
  try {
    localizationLabels = getLocalization(`localization_${locale}`);
    localizationLabels = JSON.parse(localizationLabels);
    localizationLabels = transformLocalizationLabels(localizationLabels);
  } catch (error) {
    localizationLabels = {};
  }

  return localizationLabels;
};
