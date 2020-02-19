export async function getServices(token) {
  try {
    let response = await fetch(
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
    );

    let responseJson = await response.json();

    const result = {
      serviceCategory: [],
      serviceTypes: {},
      taxHeadMaster: responseJson.MdmsRes.BillingService.TaxHeadMaster,
      taxPeriod: responseJson.MdmsRes.BillingService.TaxPeriod,
    };

    const tempArray = [];
    // Sorting and adding types to services
    await responseJson.MdmsRes.BillingService.BusinessService.forEach(
      service => {
        if (!tempArray.includes(service.code.split('.')[0])) {
          tempArray.push(service.code.split('.')[0]);
          result.serviceCategory.push({
            code: service.code.split('.')[0],
            name: service.businessService.split('.')[0],
          });
          if (service.code.split('.')[1]) {
            result.serviceTypes[service.code.split('.')[0]] = [
              {
                code: service.code.split('.')[1],
                name: service.businessService.split('.')[1],
              },
            ];
          }
        } else if (result.serviceTypes[service.code.split('.')[0]]) {
          result.serviceTypes[service.code.split('.')[0]].push({
            code: service.code.split('.')[1],
            name: service.businessService.split('.')[1],
          });
        }
      },
    );

    return result;
  } catch (error) {
    console.error('Error while getting services', error.message);
  }
}
