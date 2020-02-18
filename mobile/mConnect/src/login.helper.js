export async function getTenants() {
  try {
    let response = await fetch(
      'https://uttarakhand-dev.egovernments.org/egov-mdms-service/v1/_search?tenantId=uk',
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
          'https://uttarakhand-dev.egovernments.org/employee/language-selection',
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
            tenantId: 'uk',
            moduleDetails: [
              {
                moduleName: 'tenant',
                masterDetails: [{name: 'tenants'}, {name: 'citymodule'}],
              },
            ],
          },
        }),

        method: 'POST',
        mode: 'cors',
      },
    );
    let responseJson = await response.json();
    return responseJson.MdmsRes.tenant.tenants;
  } catch (error) {
    console.error(error);
  }
}
