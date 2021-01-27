import { httpRequest } from "../../../../../ui-utils/api";
import { MDMS } from "egov-ui-kit/src/utils/endPoints";
// Mdms API call
export const getMdmsResults = async mdmsBody => {
  try {
    const response = await httpRequest(
      "post",
      MDMS.URL,
      "_search",
      [],
      mdmsBody
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
