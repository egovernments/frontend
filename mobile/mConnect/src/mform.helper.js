export async function getServices(token) {
  try {
    console.log('responseJson ');

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
      taxHeadMaster: responseJson.MdmsRes.BillingService.TaxHeadMaster,
      taxPeriod: responseJson.MdmsRes.BillingService.TaxPeriod,
    };

    console.log('responseJson ', JSON.stringify(responseJson));
    // Sorting and adding types to services
    await responseJson.MdmsRes.BillingService.BusinessService.forEach(
      service => {
        if (!result.serviceCategory.includes(service.code.split('.')[0])) {
          const tempServiceCategory = {
            code: service.code.split('.')[0],
            name: service.businessService.split('.')[0],
          };
          if (service.code.split('.')[1]) {
            tempServiceCategory.types = [
              {
                code: service.code.split('.')[1],
                name: service.businessService.split('.')[1],
              },
            ];
          }
          result.serviceCategory.push(tempServiceCategory);
        } else if (result.serviceCategory[service.code.split('.')[0]].types) {
          result.serviceCategory[service.code.split('.')[0]].types.push({
            code: service.code.split('.')[1],
            name: service.businessService.split('.')[1],
          });
        }
      },
    );

    return responseJson.MdmsRes.BillingService;
  } catch (error) {
    console.error('Error while getting services', error.message);
  }
}
