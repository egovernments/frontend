import {
  fetchServicesLoading,
  fetchServicesSuccess,
  fetchServicesError,
  createDemandPending,
  createDemandSuccess,
  createDemandError,
} from '../actions/mcform.actions';

export const fetchServices = () => {
  return dispatch => {
    dispatch(fetchServicesLoading());
    fetch(
      'https://mseva-uat.lgpunjab.gov.in/egov-mdms-service/v1/_search?tenantId=bh',
      {
        credentials: 'include',
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
        referrer:
          'https://mseva-uat.lgpunjab.gov.in/employee/language-selection',
        referrerPolicy: 'no-referrer-when-downgrade',
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
                moduleName: 'BillingService',
                masterDetails: [
                  {name: 'BusinessService', filter: "[?(@.type=='Adhoc')]"},
                  {name: 'TaxHeadMaster'},
                  {name: 'TaxPeriod'},
                ],
              },
            ],
          },
        }),

        method: 'POST',
        mode: 'cors',
      },
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchServicesSuccess(prepareRes(res)));
      })
      .catch(error => {
        dispatch(fetchServicesError(error));
      });
  };
};

const prepareRes = responseJson => {
  const result = {
    serviceCategory: [],
    serviceTypes: {},
    taxHeadMaster: responseJson.MdmsRes.BillingService.TaxHeadMaster,
    taxPeriod: responseJson.MdmsRes.BillingService.TaxPeriod,
  };

  const tempArray = [];
  // Sorting and adding types to services
  responseJson.MdmsRes.BillingService.BusinessService.forEach(service => {
    if (!tempArray.includes(service.code.split('.')[0])) {
      tempArray.push(service.code.split('.')[0]);
      result.serviceCategory.push({
        code: service.code.split('.')[0],
        text: service.businessService.split('.')[0],
      });
      if (service.code.split('.')[1]) {
        result.serviceTypes[service.code.split('.')[0]] = [
          {
            code: service.code.split('.')[1],
            text: service.businessService.split('.')[1],
          },
        ];
      }
    } else if (result.serviceTypes[service.code.split('.')[0]]) {
      result.serviceTypes[service.code.split('.')[0]].push({
        code: service.code.split('.')[1],
        text: service.businessService.split('.')[1],
      });
    }
  });

  return result;
};

export const createDemand = demand => {
  const {token, ...demandProps} = demand;
  return dispatch => {
    dispatch(createDemandPending());

    getDemandSupportValues(demand).then(res => {
      // create demand
      fetch(
        'https://mseva-uat.lgpunjab.gov.in/billing-service/demand/_create?',
        {
          credentials: 'include',
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
          referrer:
            'https://bihar-uat.egovernments.org/employee/uc/newCollection',
          referrerPolicy: 'no-referrer-when-downgrade',
          body: JSON.stringify({
            RequestInfo: {
              apiId: 'Mihy',
              ver: '.01',
              action: '',
              did: '1',
              key: '',
              msgId: '20170310130900|en_IN',
              requesterId: '',
              authToken: token,
            },
            Demands: [
              {
                ...demandProps,
                consumerCode: res.id,
                payer: {
                  uuid: res.userId,
                },
              },
            ],
          }),
          method: 'POST',
          mode: 'cors',
        },
      )
        .then(resp => resp.json())
        .then(resp => {
          if (resp.error) {
            throw resp.error;
          }
          dispatch(createDemandSuccess(resp.Demands[0]));
        })
        .catch(error => {
          dispatch(createDemandError(error));
        });
    });
  };
};

const getDemandSupportValues = async demand => {
  // id gen call
  const idRes = await fetch(
    'https://mseva-uat.lgpunjab.gov.in/egov-idgen/id/_generate?',
    {
      credentials: 'include',
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
      referrer: 'https://bihar-uat.egovernments.org/employee/uc/newCollection',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: JSON.stringify({
        RequestInfo: {
          apiId: 'Mihy',
          ver: '.01',
          action: '',
          did: '1',
          key: '',
          msgId: '20170310130900|en_IN',
          requesterId: '',
          authToken: demand.token,
        },
        idRequests: [
          {
            idName: '',
            format: 'UC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]',
            tenantId: demand.tenantId,
          },
        ],
      }),

      method: 'POST',
      mode: 'cors',
    },
  );

  const idResJson = await idRes.json();

  // user call
  const userRes = await fetch(
    'https://mseva-uat.lgpunjab.gov.in/user/_search?tenantId=bh',
    {
      credentials: 'include',
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
      referrer: 'https://bihar-uat.egovernments.org/employee/uc/newCollection',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: JSON.stringify({
        RequestInfo: {
          apiId: 'Mihy',
          ver: '.01',
          action: '_search',
          did: '1',
          key: '',
          msgId: '20170310130900|en_IN',
          requesterId: '',
          authToken: demand.token,
        },
        tenantId: demand.tenantId,
        userName: demand.mobileNumber,
      }),

      method: 'POST',
      mode: 'cors',
    },
  );
  const userResJson = await userRes.json();
  return {
    id: idResJson.idResponses[0].id,
    userId: userResJson.user.length > 1 ? userResJson.user[0].uuid : '',
  };
};
