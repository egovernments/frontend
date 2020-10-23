export const workflowMasterData = {
  "BusinessServices": [
      {
          "tenantId": "pb.secunderabad",
          "businessService": "LAMS_NewLR",
          "business": "LAMS-LR-services",
          "businessServiceSla": 2592000000,
          "states": [
              {
                  "sla": null,
                  "state": null,
                  "applicationStatus": null,
                  "docUploadRequired": false,
                  "isStartState": true,
                  "isTerminateState": false,
                  "isStateUpdatable": true,
                  "actions": [
                      {
                          "action": "APPLY",
                          "nextState": "APPLIED",
                          "roles": [
                              "CITIZEN",
                              "LR_CEMP"
                          ]
                      }
                  ]
              },
              {
                  "sla": null,
                  "state": "APPLIED",
                  "applicationStatus": "APPLIED",
                  "docUploadRequired": false,
                  "isStartState": false,
                  "isTerminateState": false,
                  "isStateUpdatable": true,
                  "actions": [
                      {
                          "action": "SENDBACK",
                          "nextState": "APPLIED",
                          "roles": [
                              "CEO",
                              "DEO"
                          ]
                      },
                      {
                          "action": "FORWARD",
                          "nextState": "PDDEEXAMINATION",
                          "roles": [
                              "CEO",
                              "DEO"
                          ]
                      },
                      {
                          "action": "APPROVE",
                          "nextState": "APPROVED",
                          "roles": [
                              "CEO",
                              "DEO"
                          ]
                      }
                  ]
              },
              {
                  "sla": null,
                  "state": "APPROVED",
                  "applicationStatus": "APPROVED",
                  "docUploadRequired": false,
                  "isStartState": false,
                  "isTerminateState": true,
                  "isStateUpdatable": false,
                  "actions": null
              },
              {
                  "sla": null,
                  "state": "PDDEEXAMINATION",
                  "applicationStatus": "PDDEEXAMINATION",
                  "docUploadRequired": false,
                  "isStartState": false,
                  "isTerminateState": false,
                  "isStateUpdatable": true,
                  "actions": [
                      {
                          "action": "SENDBACK",
                          "nextState": "APPLIED",
                          "roles": [
                              "PDDE"
                          ]
                      },
                      {
                          "action": "FORWARD",
                          "nextState": "DGDEEXAMINATION",
                          "roles": [
                              "PDDE"
                          ]
                      },
                      {
                          "action": "APPROVE",
                          "nextState": "APPROVED",
                          "roles": [
                              "PDDE"
                          ]
                      }
                  ]
              },
              {
                  "sla": null,
                  "state": "DGDEEXAMINATION",
                  "applicationStatus": "DGDEEXAMINATION",
                  "docUploadRequired": false,
                  "isStartState": false,
                  "isTerminateState": false,
                  "isStateUpdatable": true,
                  "actions": [
                      {
                          "action": "SENDBACK",
                          "nextState": "PDDEEXAMINATION",
                          "roles": [
                              "DGDE"
                          ]
                      },
                      {
                          "action": "FORWARD",
                          "nextState": "MODEXAMINATION",
                          "roles": [
                              "DGDE"
                          ]
                      },
                      {
                          "action": "APPROVE",
                          "nextState": "APPROVED",
                          "roles": [
                              "DGDE"
                          ]
                      }
                  ]
              },
              {
                  "sla": null,
                  "state": "MODEXAMINATION",
                  "applicationStatus": "MODEXAMINATION",
                  "docUploadRequired": false,
                  "isStartState": false,
                  "isTerminateState": false,
                  "isStateUpdatable": true,
                  "actions": [
                      {
                          "action": "SENDBACK",
                          "nextState": "DGDEEXAMINATION",
                          "roles": [
                              "MOD"
                          ]
                      },
                      {
                          "action": "APPROVE",
                          "nextState": "APPROVED",
                          "roles": [
                              "MOD"
                          ]
                      }
                  ]
              }
          ]
      }
  ]
};

export const licenseData = [
    {
        "comment": null,
        "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
        "tenantId": "pb.agra",
        "businessService": "TL",
        "licenseType": "PERMANENT",
        "applicationType": "NEW",
        "workflowCode": "NewTL",
        "licenseNumber": null,
        "applicationNumber": "TL-APP-AGRA-2020-10-21-004168",
        "oldLicenseNumber": null,
        "propertyId": null,
        "oldPropertyId": null,
        "accountId": null,
        "tradeName": "asdf",
        "applicationDate": 1603267787301,
        "commencementDate": 1603304999000,
        "issuedDate": null,
        "financialYear": "2020-21",
        "validFrom": 1585679399000,
        "validTo": 1617172199000,
        "action": "APPLY",
        "assignee": [],
        "wfDocuments": null,
        "status": "APPLIED",
        "tradeLicenseDetail": {
            "id": "8e329836-85d1-4006-91a0-9ee4a383f0d5",
            "surveyNo": null,
            "subOwnerShipCategory": "INDIVIDUAL.SINGLEOWNER",
            "structureType": "IMMOVABLE.PUCCA",
            "operationalArea": 12,
            "noOfEmployees": null,
            "adhocExemption": null,
            "adhocPenalty": null,
            "adhocExemptionReason": null,
            "adhocPenaltyReason": null,
            "owners": [
                {
                    "id": 2932,
                    "uuid": "2042d9c8-5e2c-42f2-a407-e18c7b4e139c",
                    "userName": "a66347be-4a31-4d51-b391-60a21e080fc6",
                    "password": null,
                    "salutation": null,
                    "name": "asdf",
                    "gender": "MALE",
                    "mobileNumber": "7022225104",
                    "emailId": null,
                    "altContactNumber": null,
                    "pan": null,
                    "aadhaarNumber": null,
                    "permanentAddress": "asdf",
                    "permanentCity": null,
                    "permanentPinCode": null,
                    "correspondenceCity": null,
                    "correspondencePinCode": null,
                    "correspondenceAddress": null,
                    "active": true,
                    "dob": 659989800000,
                    "pwdExpiryDate": 1611043787000,
                    "locale": null,
                    "type": "CITIZEN",
                    "signature": null,
                    "accountLocked": false,
                    "roles": [
                        {
                            "id": null,
                            "name": "Citizen",
                            "code": "CITIZEN",
                            "tenantId": "pb"
                        }
                    ],
                    "fatherOrHusbandName": "asdfasdf",
                    "bloodGroup": null,
                    "identificationMark": null,
                    "photo": null,
                    "createdBy": "486",
                    "createdDate": 1603267787000,
                    "lastModifiedBy": "1",
                    "lastModifiedDate": 1603267882000,
                    "otpReference": null,
                    "tenantId": "pb",
                    "isPrimaryOwner": null,
                    "ownerShipPercentage": null,
                    "ownerType": null,
                    "institutionId": null,
                    "documents": null,
                    "userActive": true,
                    "relationship": "FATHER"
                }
            ],
            "channel": null,
            "address": {
                "id": "4a7c7726-5045-4776-8d27-5a4e76cc7209",
                "tenantId": "pb.agra",
                "doorNo": null,
                "latitude": null,
                "longitude": null,
                "addressId": null,
                "addressNumber": null,
                "type": null,
                "addressLine1": null,
                "addressLine2": null,
                "landmark": null,
                "city": "pb.agra",
                "pincode": null,
                "detail": null,
                "buildingName": null,
                "street": null,
                "locality": {
                    "code": "LOC01A01",
                    "name": "Bungalow Area Part - Ward 1",
                    "label": "Locality",
                    "latitude": null,
                    "longitude": null,
                    "children": [],
                    "materializedPath": null
                }
            },
            "tradeUnits": [
                {
                    "id": "97fc53f1-1b7a-4436-86bc-835a21d72e8a",
                    "tenantId": "pb.agra",
                    "active": true,
                    "tradeType": "TRADE.EATING.A1",
                    "uom": null,
                    "uomValue": null,
                    "auditDetails": null
                }
            ],
            "accessories": null,
            "applicationDocuments": [
                {
                    "id": "446145de-82ee-4f47-8466-228a6c8eb256",
                    "active": true,
                    "tenantId": "pb.agra",
                    "documentType": "AADHAARCARD",
                    "fileStoreId": "29fd4384-f96d-43a8-97e0-f11995f33ad7",
                    "documentUid": null,
                    "auditDetails": null
                },
                {
                    "id": "6611d586-edf2-4ca7-abbf-1b38e444f863",
                    "active": true,
                    "tenantId": "pb.agra",
                    "documentType": "OWNERPHOTO",
                    "fileStoreId": "d6d2b299-4648-4026-be22-744d87699d9e",
                    "documentUid": null,
                    "auditDetails": null
                },
                {
                    "id": "6d963b9d-bc79-4c76-aba4-91604f1592bc",
                    "active": true,
                    "tenantId": "pb.agra",
                    "documentType": "ELECTBILL",
                    "fileStoreId": "66f21eda-782e-47dd-82f4-e9a70fe84791",
                    "documentUid": null,
                    "auditDetails": null
                }
            ],
            "verificationDocuments": null,
            "additionalDetail": {
                "premisis": "RENTED"
            },
            "institution": null,
            "auditDetails": {
                "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
                "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
                "createdTime": 1603267787301,
                "lastModifiedTime": 1603267787301
            }
        },
        "calculation": null,
        "auditDetails": {
            "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
            "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
            "createdTime": 1603267787301,
            "lastModifiedTime": 1603267882794
        },
        "fileStoreId": null,
        "headerSideText": {
            "word1": "Status: ",
            "word2": "TL_APPLIED"
        }
    }
  ];

export const LicensesTemp = [{"reviewDocData":[{"title":"TL_AADHAARCARD","link":"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=29fd4384-f96d-43a8-97e0-f11995f33ad7&tenantId=pb","linkText":"View","name":"Document - 1"},{"title":"TL_OWNERPHOTO","link":"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=d6d2b299-4648-4026-be22-744d87699d9e&tenantId=pb","linkText":"View","name":"Document - 2"},{"title":"TL_ELECTBILL","link":"https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=66f21eda-782e-47dd-82f4-e9a70fe84791&tenantId=pb","linkText":"View","name":"Document - 3"}],"tradeDetailsResponse":[{"trade":"TRADE","tradeType":"EATING","tradeSubType":"A1"}],"estimateCardData":[{"name":{"labelName":"TL_TAX","labelKey":"TL_TAX"},"value":15010,"info":""}],"billingSlabData":{"tradeUnitData":[{"rate":15010,"tradeTotal":15010,"UOM":null,"count":null,"category":"TRADE.EATING.A1","type":"trade"}],"tradeTotal":15010,"accessoriesUnitData":[],"accessoriesTotal":0}}];

export const leaseData = [
  {
      "comment": null,
      "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
      "tenantId": "pb.agra",
      "businessService": "TL",
      "licenseType": "PERMANENT",
      "applicationType": "NEW",
      "workflowCode": "NewTL",
      "licenseNumber": null,
      "applicationNumber": "TL-APP-AGRA-2020-10-21-004168",
      "oldLicenseNumber": null,
      "propertyId": null,
      "oldPropertyId": null,
      "accountId": null,
      "tradeName": "asdf",
      "applicationDate": 1603267787301,
      "commencementDate": 1603304999000,
      "issuedDate": null,
      "financialYear": "2020-21",
      "validFrom": 1585679399000,
      "validTo": 1617172199000,
      "action": "APPLY",
      "assignee": [],
      "wfDocuments": null,
      "status": "APPLIED",
      "tradeLicenseDetail": {
          "id": "8e329836-85d1-4006-91a0-9ee4a383f0d5",
          "surveyNo": null,
          "subOwnerShipCategory": "INDIVIDUAL.SINGLEOWNER",
          "structureType": "IMMOVABLE.PUCCA",
          "operationalArea": 12,
          "noOfEmployees": null,
          "adhocExemption": null,
          "adhocPenalty": null,
          "adhocExemptionReason": null,
          "adhocPenaltyReason": null,
          "owners": [
              {
                  "id": 2932,
                  "uuid": "2042d9c8-5e2c-42f2-a407-e18c7b4e139c",
                  "userName": "a66347be-4a31-4d51-b391-60a21e080fc6",
                  "password": null,
                  "salutation": null,
                  "name": "asdf",
                  "gender": "MALE",
                  "mobileNumber": "7022225104",
                  "emailId": null,
                  "altContactNumber": null,
                  "pan": null,
                  "aadhaarNumber": null,
                  "permanentAddress": "asdf",
                  "permanentCity": null,
                  "permanentPinCode": null,
                  "correspondenceCity": null,
                  "correspondencePinCode": null,
                  "correspondenceAddress": null,
                  "active": true,
                  "dob": 659989800000,
                  "pwdExpiryDate": 1611043787000,
                  "locale": null,
                  "type": "CITIZEN",
                  "signature": null,
                  "accountLocked": false,
                  "roles": [
                      {
                          "id": null,
                          "name": "Citizen",
                          "code": "CITIZEN",
                          "tenantId": "pb"
                      }
                  ],
                  "fatherOrHusbandName": "asdfasdf",
                  "bloodGroup": null,
                  "identificationMark": null,
                  "photo": null,
                  "createdBy": "486",
                  "createdDate": 1603267787000,
                  "lastModifiedBy": "1",
                  "lastModifiedDate": 1603267882000,
                  "otpReference": null,
                  "tenantId": "pb",
                  "isPrimaryOwner": null,
                  "ownerShipPercentage": null,
                  "ownerType": null,
                  "institutionId": null,
                  "documents": null,
                  "userActive": true,
                  "relationship": "FATHER"
              }
          ],
          "channel": null,
          "address": {
              "id": "4a7c7726-5045-4776-8d27-5a4e76cc7209",
              "tenantId": "pb.agra",
              "doorNo": null,
              "latitude": null,
              "longitude": null,
              "addressId": null,
              "addressNumber": null,
              "type": null,
              "addressLine1": null,
              "addressLine2": null,
              "landmark": null,
              "city": "pb.agra",
              "pincode": null,
              "detail": null,
              "buildingName": null,
              "street": null,
              "locality": {
                  "code": "LOC01A01",
                  "name": "Bungalow Area Part - Ward 1",
                  "label": "Locality",
                  "latitude": null,
                  "longitude": null,
                  "children": [],
                  "materializedPath": null
              }
          },
          "tradeUnits": [
              {
                  "id": "97fc53f1-1b7a-4436-86bc-835a21d72e8a",
                  "tenantId": "pb.agra",
                  "active": true,
                  "tradeType": "TRADE.EATING.A1",
                  "uom": null,
                  "uomValue": null,
                  "auditDetails": null
              }
          ],
          "accessories": null,
          "applicationDocuments": [
              {
                  "id": "446145de-82ee-4f47-8466-228a6c8eb256",
                  "active": true,
                  "tenantId": "pb.agra",
                  "documentType": "AADHAARCARD",
                  "fileStoreId": "29fd4384-f96d-43a8-97e0-f11995f33ad7",
                  "documentUid": null,
                  "auditDetails": null
              },
              {
                  "id": "6611d586-edf2-4ca7-abbf-1b38e444f863",
                  "active": true,
                  "tenantId": "pb.agra",
                  "documentType": "OWNERPHOTO",
                  "fileStoreId": "d6d2b299-4648-4026-be22-744d87699d9e",
                  "documentUid": null,
                  "auditDetails": null
              },
              {
                  "id": "6d963b9d-bc79-4c76-aba4-91604f1592bc",
                  "active": true,
                  "tenantId": "pb.agra",
                  "documentType": "ELECTBILL",
                  "fileStoreId": "66f21eda-782e-47dd-82f4-e9a70fe84791",
                  "documentUid": null,
                  "auditDetails": null
              }
          ],
          "verificationDocuments": null,
          "additionalDetail": {
              "premisis": "RENTED"
          },
          "institution": null,
          "auditDetails": {
              "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
              "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
              "createdTime": 1603267787301,
              "lastModifiedTime": 1603267787301
          }
      },
      "calculation": null,
      "auditDetails": {
          "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
          "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
          "createdTime": 1603267787301,
          "lastModifiedTime": 1603267882794
      },
      "fileStoreId": null,
      "headerSideText": {
          "word1": "Status: ",
          "word2": "TL_APPLIED"
      }
  }
];