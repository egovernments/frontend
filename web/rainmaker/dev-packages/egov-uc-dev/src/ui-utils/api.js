import axios from "axios";
import {
  // fetchFromLocalStorage,
  addQueryArg
} from "egov-ui-framework/ui-utils/commons";
import store from "../ui-redux/store";
// import { toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
/* import {
  getAccessToken
  //getTenantId
} from "egov-ui-framework/ui-utils/commons"; */
// import { getAccessToken } from "ui-utils/commons";
import {
  setTenantId,
  getAccessToken,
  setUserInfo,
  setAccessToken,
  setRefreshToken,
  localStorageSet,
  localStorageGet,
  clearUserDetails,
} from "./localStorageUtils/index";

const instance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

const wrapRequestBody = (requestBody, action, customRequestInfo) => {
  const authToken = getAccessToken();
  let RequestInfo = {
    apiId: "Rainmaker",
    ver: ".01",
    // ts: getDateInEpoch(),
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|en_IN",
    requesterId: "",
    authToken: authToken //Please change this before deploying
  };
  RequestInfo = { ...RequestInfo, ...customRequestInfo };
  return Object.assign(
    {},
    {
      RequestInfo
    },
    requestBody
  );
};

export const httpRequest = async (
  method = "get",
  endPoint,
  action,
  queryObject = [],
  requestBody = {},
  headers = [],
  customRequestInfo = {}
) => {
  // store.dispatch(toggleSpinner());
  let apiError = "Api Error";

  if (headers)
    instance.defaults = Object.assign(instance.defaults, {
      headers
    });

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await instance.post(
          endPoint,
          wrapRequestBody(requestBody, action, customRequestInfo)
        );
        break;
      default:
        response = await instance.get(endPoint);
    }
    const responseStatus = parseInt(response.status, 10);
    // store.dispatch(toggleSpinner());
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    }
  } catch (error) {
    const { data, status } = error.response;
    if (status === 400 && data === "") {
      apiError = "INVALID_TOKEN";
    } else {
      apiError =
        (data.hasOwnProperty("Errors") &&
          data.Errors &&
          data.Errors.length &&
          data.Errors[0].message) ||
        (data.hasOwnProperty("error") &&
          data.error.fields &&
          data.error.fields.length &&
          data.error.fields[0].message) ||
        (data.hasOwnProperty("error_description") && data.error_description) ||
        apiError;
    }
    // store.dispatch(toggleSpinner());
  }
  // unhandled error
  throw new Error(apiError);
};

// export const authenticated = (payload = {}) => {
//   const userInfo = fixUserDob(payload["UserRequest"]);
//   const accessToken = payload.access_token;
//   const refreshToken = payload.refresh_token;
//   const expiresIn = payload.expires_in;
//   const lastLoginTime = new Date().getTime();

//   setUserInfo(JSON.stringify(userInfo));
//   setAccessToken(accessToken);
//   setRefreshToken(refreshToken);
//   setTenantId(userInfo.tenantId);
//   localStorageSet("expires-in", expiresIn);
//   localStorageSet("last-login-time", lastLoginTime);

//   return { type: authType.AUTHENTICATED, userInfo, accessToken };
// };

export const loginRequest = async (username = null, password = null, refreshToken = "", grantType = "password", tenantId = "", userType) => {
  tenantId = tenantId;
  const loginInstance = axios.create({
    baseURL: window.location.origin,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0",
    },
  });

  let apiError = "Api Error";
  var params = new URLSearchParams();
  username && params.append("username", username);
  password && params.append("password", password);
  refreshToken && params.append("refresh_token", refreshToken);
  params.append("grant_type", grantType);
  params.append("scope", "read");
  params.append("tenantId", tenantId);
  userType && params.append("userType", userType);

  try {
    const response = await loginInstance.post("/user/oauth/token", params);
    const responseStatus = parseInt(response.status, 10);
    setTenantId(response.data.UserRequest.tenantId);
    setAccessToken(response.data.access_token);
    if (responseStatus === 200 || responseStatus === 201) 
    {
      return response.data;
    }
  } catch (error) {
    const { data, status } = error.response;
    if (status === 400) {
      apiError = (data.hasOwnProperty("error_description") && data.error_description) || apiError;
    }
  }

  throw new Error(apiError);
};

export const logoutRequest = async () => {
  let apiError = "Api Error";
  try {
    alert("Logged out");
    return;
  } catch (e) {
    apiError = e.message;
    // alert(e.message);
  }

  throw new Error(apiError);
};
