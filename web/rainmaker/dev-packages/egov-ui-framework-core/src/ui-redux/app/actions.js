import * as actionTypes from "./actionTypes";
import { LOCALATION, ACTIONMENU, MDMS } from "../../ui-utils/endPoints";
import { setLocale, localStorageSet } from "../../ui-utils/localStorageUtils";
import { httpRequest } from "../../ui-utils/api";
import commonConfig from "config/common";
import { transformLocalizationLabels } from "../../ui-utils/commons";


const setLocalizationLabels = (locale, localizationLabels) => {
  window.localStorage.setItem(`localization_${locale}`, JSON.stringify(localizationLabels));
  setLocale(locale);
  return { type: actionTypes.ADD_LOCALIZATION, locale, localizationLabels:transformLocalizationLabels(localizationLabels) };
};

export const fetchLocalizationLabel = (locale, module="", tenantId="") => {
  return async (dispatch) => {
    const commonModules = "rainmaker-pgr,rainmaker-pt,rainmaker-tl,finance-erp,rainmaker-common,rainmaker-hr,rainmaker-uc,rainmaker-noc,rainmaker-dss";
    try {
      // const payload1 = await httpRequest("post",LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
      //   { key: "module", value: commonModules },
      //   { key: "locale", value: locale },
      //   { key: "tenantId", value: commonConfig.tenantId },
      // ]);
      const payload = module
        ? await httpRequest("post",LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
            { key: "module", value: `${module}` },
            { key: "locale", value: locale },
            { key: "tenantId", value: tenantId ? tenantId : commonConfig.tenantId },
          ])
        : await httpRequest("post",LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
          { key: "module", value: commonModules },
          { key: "locale", value: locale },
          { key: "tenantId", value: commonConfig.tenantId },
        ]);
      //let resultArray = [...payload1.messages, ...payload2.messages];

      let resultArray = payload.messages || [];
      // let resultArray = [...payload1.messages];
      // if (payload2 && payload2.messages) {
      //   resultArray = [...resultArray, ...payload2.messages];
      // }
      dispatch(setLocalizationLabels(locale, resultArray));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setRoute = route => {
  return { type: actionTypes.SET_ROUTE, route };
};
