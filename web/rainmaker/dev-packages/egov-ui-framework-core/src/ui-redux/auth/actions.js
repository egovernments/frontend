import * as authType from "./actionTypes";
import {
  setTenantId,
  getAccessToken,
  setUserInfo,
  setAccessToken,
  setRefreshToken,
  localStorageSet,
  localStorageGet,
  clearUserDetails,
} from "../../ui-utils/localStorageUtils";

export const authenticating = () => {
  return { type: authType.AUTHENTICATING };
};


// temp fix
const fixUserDob = (user = {}) => {
  const dob = user.dob;
  let transformeddob = null;
  if (dob && dob !== null) {
    let date = new Date(dob);
    transformeddob = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    user = { ...user, dob: transformeddob };
  }
  return user;
};

export const authenticated = (payload = {}) => {
  const userInfo = fixUserDob(payload["UserRequest"]);
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;
  const expiresIn = payload.expires_in;
  const lastLoginTime = new Date().getTime();

  setUserInfo(JSON.stringify(userInfo));
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  setTenantId(userInfo.tenantId);
  localStorageSet("expires-in", expiresIn);
  localStorageSet("last-login-time", lastLoginTime);

  return { type: authType.AUTHENTICATED, userInfo, accessToken };
};

export const logout = () => {
  return { type: authType.LOGOUT };
};
