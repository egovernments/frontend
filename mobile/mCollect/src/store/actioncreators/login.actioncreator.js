import {
  fetchTenantsPending,
  fetchTenantsSuccess,
  fetchTenantsError,
  loginUserPending,
  loginUserSuccess,
  loginUserError,
} from '../actions/login.actions';

import base64 from 'react-native-base64'

export const fetchTenants = () => {
  return dispatch => {
    dispatch(fetchTenantsPending());
    fetch(
      'https://13.71.65.215.nip.io/egov-mdms-service/v1/_search?tenantId=pb',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/json;charset=UTF-8',
          pragma: 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
        body: JSON.stringify({
          RequestInfo: {
            apiId: 'Rainmaker',
            ver: '.01',
            ts: '',
            action: '_search',
            did: '1',
            key: '',
            msgId: '20170310130900|hi_IN',
            authToken: null,
          },
          MdmsCriteria: {
            tenantId: 'pb',
            moduleDetails: [
              {
                moduleName: 'tenant',
                masterDetails: [{name: 'tenants'}, {name: 'citymodule'}],
              },
            ],
          },
        }),
        method: 'POST',
      },
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }

        dispatch(
          fetchTenantsSuccess(
            res.MdmsRes.tenant.tenants.map(tenant => {
              return {
                title: tenant.name,
                id: tenant.code,
                code: tenant.code,
              };
            }),
          ),
        );
        //return res.MdmsRes.tenant.tenants;
      })
      .catch(error => {
        dispatch(fetchTenantsError(error));
      });
  };
};

export const loginUser = user => {
  return dispatch => {
    dispatch(loginUserPending());
    const passcode = getEncodePassword(user.password);
    fetch('https://13.71.65.215.nip.io/user/oauth/token', {
      credentials: 'include',
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        authorization: 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'https://13.71.65.215.nip.io/employee/user/login',
      referrerPolicy: 'no-referrer-when-downgrade',
      body:
        'username=' +
        user.username +
        '&password=' +
        passcode +
        '&grant_type=password&scope=read&tenantId=' +
        user.tenantCode +
        '&userType=EMPLOYEE',
      method: 'POST',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        //setValToStorage('@User', res['access_token']);
        dispatch(
          loginUserSuccess({
            tenantid: res.UserRequest.tenantId,
            user: res.UserRequest,
            token: res.access_token,
          }),
        );
      })
      .catch(error => {
        dispatch(loginUserError(error));
      });
  };
};

const getEncodePassword = password => {
  if(password != null){
    let encodedpswd =  base64.encode(password);
    return base64.encode(encodedpswd);
  }
  return password;

};
