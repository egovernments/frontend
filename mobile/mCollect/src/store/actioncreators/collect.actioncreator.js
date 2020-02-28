import {
  fetchBillLoading,
  fetchBillSuccess,
  fetchBillError,
  createPaymentPending,
  createPaymentSuccess,
  createPaymentError,
} from '../actions/collect.actions';

export const fetchBill = data => {
  return dispatch => {
    dispatch(fetchBillLoading());
    fetch(
      `https://mseva-uat.lgpunjab.gov.in/billing-service/bill/_generate?consumerCode=${data.consumerCode}&businessService=${data.businessService}&tenantId=${data.tenantId}`,
      {
        credentials: 'omit',
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
        referrer: 'https://mseva-uat.lgpunjab.gov.in/employee/uc/newCollection',
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
            authToken: data.token,
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
        dispatch(fetchBillSuccess(prepareRes(res)));
      })
      .catch(error => {
        dispatch(fetchBillError(error));
      });
  };
};

const prepareRes = res => {
  if (res.Bill) return res.Bill[0];
};

export const createPayment = data => {
  const {bill, amountPaid, tenantId, token} = data;
  return dispatch => {
    dispatch(createPaymentPending());

    const requestBody = {
      RequestInfo: {
        apiId: 'Mihy',
        ver: '.01',
        action: '_create',
        did: '1',
        key: '',
        msgId: '20170310130900|en_IN',
        requesterId: '',
        authToken: token,
      },
      Receipt: [
        {
          Bill: [bill],
          instrument: {
            amount: amountPaid,
            instrumentType: {name: 'Cash'},
            tenantId,
          },
          tenantId,
        },
      ],
    };

    console.log(
      'request body for Create Receipt :',
      JSON.stringify(requestBody),
    );

    fetch(
      'https://mseva-uat.lgpunjab.gov.in/collection-services/receipts/_create?',
      {
        credentials: 'omit',
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
          'https://mseva-uat.lgpunjab.gov.in/employee/uc/pay?tenantId=pb.testing',
        referrerPolicy: 'no-referrer-when-downgrade',
        body: JSON.stringify(requestBody),
        method: 'POST',
        mode: 'cors',
      },
    )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.Errors) {
          throw resp.Errors;
        }
        dispatch(createPaymentSuccess(resp.Receipt[0]));
      })
      .catch(error => {
        dispatch(createPaymentError(error));
      });
  };
};
