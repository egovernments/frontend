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
      `https://13.71.65.215.nip.io/billing-service/bill/v2/_fetchbill?consumerCode=${data.consumerCode}&businessService=${data.businessService}&tenantId=${data.tenantId}`,
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
        referrer: 'https://13.71.65.215.nip.io/employee/uc/newCollection',
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
        // console.log(
        //   'Bill :',
        //   JSON.stringify(prepareRes(res))
        // );
        dispatch(fetchBillSuccess(prepareRes(res)));
      })
      .catch(error => {
        // console.log(
        //   'Bill Error :',
        //   JSON.stringify(error));
        dispatch(fetchBillError(error));
      });
  };
};

const prepareRes = res => {
  if (res.Bill) return res.Bill[0];
};

export const createPayment = data => {
  const {bill, amountPaid, tenantId, token,paidBy,payer} = data;
  return dispatch => {
    dispatch(createPaymentPending());

    const requestBody = {
      RequestInfo: {
        apiId: 'Rainmaker',
        ver: '.01',
        action: '_create',
        did: '1',
        key: '',
        msgId: '20170310130900|en_IN',
        requesterId: '',
        authToken: token,
      },
      Payment: 
        {
          //Bill: [bill],
          mobileNumber: bill.payerMobileNumber,
          paidBy: paidBy,
          paymentMode:'Cash',
          payerName:payer,
          // instrument: {
          //   amount: amountPaid,
          //   instrumentType: {name: 'Cash'},
          //   tenantId,
          // },
          tenantId,
          totalAmountPaid:amountPaid,
          totalDue:amountPaid,
          paymentDetails:[{
            billId:bill.id,
            businessService:bill.businessService,
            totalAmountPaid:amountPaid,
            totalDue:amountPaid,

          }
        ]

        }
      
    };

    // console.log(
    //   'request body for Create Receipt :',
    //   JSON.stringify(requestBody),
    // );

    fetch(
      'https://13.71.65.215.nip.io/collection-services/payments/_create?',
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
          'https://13.71.65.215.nip.io/employee/egov-common/pay?tenantId=pb.agra',
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
        console.log(
          'Payment :',
          JSON.stringify(resp.Payments[0]),
        );
        dispatch(createPaymentSuccess(resp.Payments[0]));
      })
      .catch(error => {
        // console.log("Payments");
        // console.log(error);
        dispatch(createPaymentError(error));
      });
  };
};
