export const workflowMasterData = {
  "BusinessServices": [
      {
          "tenantId": "pb.secunderabad",
          "businessService": "LAMS_NewLR_V2",
          "business": "LAMS",
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
        "workflowCode": "LAMS_NewLR_V2",
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

  export const licenseDataPDDE = [
    {
        "comment": null,
        "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
        "tenantId": "pb.agra",
        "businessService": "TL",
        "licenseType": "PERMANENT",
        "applicationType": "NEW",
        "workflowCode": "LAMS_NewLR_V2",
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
        "status": "PDDEEXAMINATION",
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

  export const licenseDataDGDE = [
    {
        "comment": null,
        "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
        "tenantId": "pb.agra",
        "businessService": "TL",
        "licenseType": "PERMANENT",
        "applicationType": "NEW",
        "workflowCode": "LAMS_NewLR_V2",
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
        "status": "DGDEEXAMINATION",
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

  export const licenseDataMOD = [
    {
        "comment": null,
        "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
        "tenantId": "pb.agra",
        "businessService": "TL",
        "licenseType": "PERMANENT",
        "applicationType": "NEW",
        "workflowCode": "LAMS_NewLR_V2",
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
        "status": "MODEXAMINATION",
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

  export const licenseDataApproved = [
    {
        "comment": null,
        "id": "616bf520-9f39-420e-97a4-bc33d6abc62a",
        "tenantId": "pb.agra",
        "businessService": "TL",
        "licenseType": "PERMANENT",
        "applicationType": "NEW",
        "workflowCode": "LAMS_NewLR_V2",
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
        "status": "APPROVED",
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
      "workflowCode": "LAMS_NewLR_V2",
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

export const businessServiceData = [
    {
      "tenantId": "pb.agra",
      "uuid": "d6cf8818-eb89-4ac1-bd43-2bd6343aafa7",
      "businessService": "DIRECTRENEWAL",
      "business": "tl-services",
      "businessServiceSla": 172800000,
      "states": [
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "createdTime": 1593850260794,
            "lastModifiedTime": 1593850260794
          },
          "uuid": "d789fa9d-c5a9-4fef-89b8-fda953836562",
          "tenantId": "pb.agra",
          "businessServiceId": "d6cf8818-eb89-4ac1-bd43-2bd6343aafa7",
          "sla": null,
          "state": null,
          "applicationStatus": "APPLIED",
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "createdTime": 1593850260794,
                "lastModifiedTime": 1593850260794
              },
              "uuid": "6f4446e4-e2ae-4fe2-9907-ffb794be5b0c",
              "tenantId": "pb.agra",
              "currentState": "d789fa9d-c5a9-4fef-89b8-fda953836562",
              "action": "INITIATE",
              "nextState": "5052bb38-ea7a-40de-8c59-8bb0ccbcdc4c",
              "roles": [
                "CITIZEN",
                "TL_CEMP"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "createdTime": 1593850260794,
            "lastModifiedTime": 1593850260794
          },
          "uuid": "5052bb38-ea7a-40de-8c59-8bb0ccbcdc4c",
          "tenantId": "pb.agra",
          "businessServiceId": "d6cf8818-eb89-4ac1-bd43-2bd6343aafa7",
          "sla": null,
          "state": "PENDINGPAYMENT",
          "applicationStatus": "PENDINGPAYMENT",
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "createdTime": 1593850260794,
                "lastModifiedTime": 1593850260794
              },
              "uuid": "05d20581-ed36-4caf-bd7a-c38f51e93cb0",
              "tenantId": "pb.agra",
              "currentState": "5052bb38-ea7a-40de-8c59-8bb0ccbcdc4c",
              "action": "PAY",
              "nextState": "047b23cf-b650-4c7e-8edf-96b3b3fe5406",
              "roles": [
                "CITIZEN",
                "TL_CEMP",
                "SYSTEM_PAYMENT"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "createdTime": 1593850260794,
            "lastModifiedTime": 1593850260794
          },
          "uuid": "047b23cf-b650-4c7e-8edf-96b3b3fe5406",
          "tenantId": "pb.agra",
          "businessServiceId": "d6cf8818-eb89-4ac1-bd43-2bd6343aafa7",
          "sla": null,
          "state": "APPROVED",
          "applicationStatus": "APPROVED",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": true,
          "isStateUpdatable": false,
          "actions": null
        }
      ],
      "auditDetails": {
        "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
        "lastModifiedBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
        "createdTime": 1593850260794,
        "lastModifiedTime": 1593850260794
      }
    },
    {
      "tenantId": "pb.agra",
      "uuid": "643decee-1fd9-4a56-91cd-0ce435895e26",
      "businessService": "EDITRENEWAL",
      "business": "tl-services",
      "businessServiceSla": 172800000,
      "states": [
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "2df335d0-ad08-4862-b85b-eb4effafe59e",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": null,
          "applicationStatus": null,
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "8f6ef132-b05e-4380-8b67-e64d7a675bae",
              "tenantId": "pb.agra",
              "currentState": "2df335d0-ad08-4862-b85b-eb4effafe59e",
              "action": "INITIATE",
              "nextState": "167343d7-1624-4955-b9fb-4e1f10b96061",
              "roles": [
                "CITIZEN",
                "TL_CEMP"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "167343d7-1624-4955-b9fb-4e1f10b96061",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "INITIATED",
          "applicationStatus": "INITIATED",
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "3cdc6610-ae23-4b51-842b-4ac7837989d9",
              "tenantId": "pb.agra",
              "currentState": "167343d7-1624-4955-b9fb-4e1f10b96061",
              "action": "APPLY",
              "nextState": "13c41763-ff16-498c-b2c1-dfe634d60d49",
              "roles": [
                "CITIZEN",
                "TL_CEMP"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "2647c791-1110-4970-911a-9c12dc571d05",
              "tenantId": "pb.agra",
              "currentState": "167343d7-1624-4955-b9fb-4e1f10b96061",
              "action": "INITIATE",
              "nextState": "167343d7-1624-4955-b9fb-4e1f10b96061",
              "roles": [
                "CITIZEN",
                "TL_CEMP"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "13c41763-ff16-498c-b2c1-dfe634d60d49",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "APPLIED",
          "applicationStatus": "APPLIED",
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "1b51fd84-d617-4bb0-910b-48eafabd6e3a",
              "tenantId": "pb.agra",
              "currentState": "13c41763-ff16-498c-b2c1-dfe634d60d49",
              "action": "REJECT",
              "nextState": "9465ddfb-aab9-465c-943e-b653ad8c5d7d",
              "roles": [
                "TL_DOC_VERIFIER"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "416a20a0-f488-4e98-9929-94282e7be21f",
              "tenantId": "pb.agra",
              "currentState": "13c41763-ff16-498c-b2c1-dfe634d60d49",
              "action": "FORWARD",
              "nextState": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
              "roles": [
                "TL_DOC_VERIFIER"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "9465ddfb-aab9-465c-943e-b653ad8c5d7d",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "REJECTED",
          "applicationStatus": "REJECTED",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": true,
          "isStateUpdatable": false,
          "actions": null
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "FIELDINSPECTION",
          "applicationStatus": "FIELDINSPECTION",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1603256101564,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "ec54eb08-f145-4eb1-ac73-6fe5ef2433db",
              "tenantId": "pb.agra",
              "currentState": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
              "action": "ADHOC",
              "nextState": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
              "roles": [
                "TL_FIELD_INSPECTOR"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "4e295256-0b9a-48b7-89db-5a9f0d2ad6ea",
              "tenantId": "pb.agra",
              "currentState": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
              "action": "REJECT",
              "nextState": "9465ddfb-aab9-465c-943e-b653ad8c5d7d",
              "roles": [
                "TL_FIELD_INSPECTOR"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "c6d0516f-bae1-4966-b35d-964c0522349b",
              "tenantId": "pb.agra",
              "currentState": "fed593df-7b7c-4b7d-b2ea-090cd53fbc51",
              "action": "FORWARD",
              "nextState": "a3cc1800-fe3e-41f5-83ea-042be91bd514",
              "roles": [
                "TL_FIELD_INSPECTOR"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "a3cc1800-fe3e-41f5-83ea-042be91bd514",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "PENDINGAPPROVAL",
          "applicationStatus": "PENDINGAPPROVAL",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "5cf2140f-cfa8-4e31-baf4-f77c281340bf",
              "tenantId": "pb.agra",
              "currentState": "a3cc1800-fe3e-41f5-83ea-042be91bd514",
              "action": "APPROVE",
              "nextState": "2df65a5e-30a1-47d6-8c84-3f51fca21315",
              "roles": [
                "TL_APPROVER"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "58ff30fe-5457-4784-9cec-459596355a14",
              "tenantId": "pb.agra",
              "currentState": "a3cc1800-fe3e-41f5-83ea-042be91bd514",
              "action": "REJECT",
              "nextState": "9465ddfb-aab9-465c-943e-b653ad8c5d7d",
              "roles": [
                "TL_APPROVER"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "2df65a5e-30a1-47d6-8c84-3f51fca21315",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "PENDINGPAYMENT",
          "applicationStatus": "PENDINGPAYMENT",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "3e5352f5-d9a8-437f-be39-fa62ff3762f1",
              "tenantId": "pb.agra",
              "currentState": "2df65a5e-30a1-47d6-8c84-3f51fca21315",
              "action": "PAY",
              "nextState": "f830499a-a9b4-4970-8c73-fecc90b7992c",
              "roles": [
                "CITIZEN",
                "TL_CEMP",
                "SYSTEM_PAYMENT"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "f830499a-a9b4-4970-8c73-fecc90b7992c",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "APPROVED",
          "applicationStatus": "APPROVED",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593850170962,
                "lastModifiedTime": 1603256101564
              },
              "uuid": "33f24b59-1334-48f6-be96-706273685a30",
              "tenantId": "pb.agra",
              "currentState": "f830499a-a9b4-4970-8c73-fecc90b7992c",
              "action": "CANCEL",
              "nextState": "9d0646c4-4d23-40f2-b90f-77de1444477e",
              "roles": [
                "TL_APPROVER"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593850170962,
            "lastModifiedTime": 1603256101564
          },
          "uuid": "9d0646c4-4d23-40f2-b90f-77de1444477e",
          "tenantId": "pb.agra",
          "businessServiceId": "643decee-1fd9-4a56-91cd-0ce435895e26",
          "sla": null,
          "state": "CANCELLED",
          "applicationStatus": "CANCELLED",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": true,
          "isStateUpdatable": false,
          "actions": null
        }
      ],
      "auditDetails": {
        "createdBy": "d30c8aa5-4fac-4100-aa07-207143ef52d8",
        "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
        "createdTime": 1593850170962,
        "lastModifiedTime": 1603256101564
      }
    },
    {
      "tenantId": "pb.agra",
      "uuid": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
      "businessService": "LAMS_NewLR_V2",
      "business": "lams-services",
      "businessServiceSla": 2592000000,
      "states": [
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "ae5dea51-00eb-4522-bad5-00bc7632e10f",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": null,
          "state": null,
          "applicationStatus": null,
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "31788861-e6bf-4aeb-b21d-ab2cbbbaf97d",
              "tenantId": "pb.agra",
              "currentState": "ae5dea51-00eb-4522-bad5-00bc7632e10f",
              "action": "APPLY",
              "nextState": "7ba8cac7-731f-4057-9757-ed336e77626c",
              "roles": [
                "CITIZEN",
                "LR_CEMP"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": null,
          "state": "APPLIED",
          "applicationStatus": "APPLIED",
          "docUploadRequired": false,
          "isStartState": true,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "6c2f40b9-f31e-41b6-8c47-7de5f666c1dd",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "FORWARD",
              "nextState": "7ba8cac7-731f-4057-9757-ed336e77626c",
              "roles": [
                "CEO",
                "DEO"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "5d09730a-b267-4577-9ebe-36bddf1b41cf",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "APPROVE",
              "nextState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "roles": [
                "CEO",
                "DEO"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "7ba8cac7-731f-4057-9757-ed336e77626c",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": null,
          "state": "APPROVED",
          "applicationStatus": "APPROVED",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": null
        },
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "3fc18d5d-7e86-4994-9ce1-9a7c2c8adcf5",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": null,
          "state": "PDDEEXAMINATION",
          "applicationStatus": "PDDEEXAMINATION",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": true,
          "isStateUpdatable": false,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "6c2f40b9-f31e-41b6-8c47-7de5f666c1dd",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "SENDBACK",
              "nextState": "7ba8cac7-731f-4057-9757-ed336e77626c",
              "roles": [
                "PDDE"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "5d09730a-b267-4577-9ebe-36bddf1b41cf",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "FORWARD",
              "nextState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "roles": [
                "PDDE"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "5d09730a-b267-4577-9ebe-36bddf1b41cf",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "APPROVE",
              "nextState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "roles": [
                "PDDE"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "6c6b6b49-3dff-4634-9a38-7a240644aa72",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": 86400000,
          "state": "DGDEEXAMINATION",
          "applicationStatus": "DGDEEXAMINATION",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "6c2f40b9-f31e-41b6-8c47-7de5f666c1dd",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "SENDBACK",
              "nextState": "7ba8cac7-731f-4057-9757-ed336e77626c",
              "roles": [
                "DGDE"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "5d09730a-b267-4577-9ebe-36bddf1b41cf",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "FORWARD",
              "nextState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "roles": [
                "DGDE"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "5d09730a-b267-4577-9ebe-36bddf1b41cf",
              "tenantId": "pb.agra",
              "currentState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "action": "APPROVE",
              "nextState": "27427134-ffef-416b-9e1b-66d4c4fa7bc1",
              "roles": [
                "DGDE"
              ]
            }
          ]
        },
        {
          "auditDetails": {
            "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
            "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
            "createdTime": 1593431132252,
            "lastModifiedTime": 1603255684291
          },
          "uuid": "7b4385a3-4e6d-4e06-93f3-9275ddcd6df9",
          "tenantId": "pb.agra",
          "businessServiceId": "fdb95498-99fd-43b3-9ab7-d76f6ab6a36c",
          "sla": 43200000,
          "state": "MODEXAMINATION",
          "applicationStatus": "MODEXAMINATION",
          "docUploadRequired": false,
          "isStartState": false,
          "isTerminateState": false,
          "isStateUpdatable": true,
          "actions": [
            
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "f3ac0e6d-a1c6-42fe-8000-7bcfa5c1677e",
              "tenantId": "pb.agra",
              "currentState": "7b4385a3-4e6d-4e06-93f3-9275ddcd6df9",
              "action": "APPROVE",
              "nextState": "61f743f9-71e9-49ca-acb9-2de4a6115c95",
              "roles": [
                "MOD"
              ]
            },
            {
              "auditDetails": {
                "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
                "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
                "createdTime": 1593431132252,
                "lastModifiedTime": 1603255684291
              },
              "uuid": "75eaebac-28de-4fca-820b-2d109bce0336",
              "tenantId": "pb.agra",
              "currentState": "7b4385a3-4e6d-4e06-93f3-9275ddcd6df9",
              "action": "SENDBACK",
              "nextState": "3fc18d5d-7e86-4994-9ce1-9a7c2c8adcf5",
              "roles": [
                "MOD"
              ]
            }
          ]
        }
      ],
      "auditDetails": {
        "createdBy": "749d3291-88e2-4b7d-a83a-29c3efcc2466",
        "lastModifiedBy": "99ede136-57ea-4ee0-8c36-c43957504395",
        "createdTime": 1593431132252,
        "lastModifiedTime": 1603255684291
      }
    }
  ];

export const sampleSearchResponse = {
  "ResponseInfo": {
    "apiId": "Rainmaker",
    "ver": ".01",
    "ts": null,
    "resMsgId": "uief87324",
    "msgId": "20170310130900|en_IN",
    "status": "successful"
  },
  "leases": [
    {
      "comment": null,
      "id": "fb737547-e132-49b3-98e5-95f24d8fad01",
      "tenantId": "pb.secunderabad",
      "businessService": "LAMS",
      "applicationType": "RENEWAL",
      "workflowCode": "LAMS_NewLR_V2",
      "applicationNumber": "LR-APP-AGRA-2020-10-19-004161",
      "applicationDate": 1604996601979,
      "action": "FORWARD",
      "assignee": null,
      "wfDocuments": null,
      "status": "CITIZEN-REVIEW",
      "leaseDetails": {
        "id": "d466202f-6426-43da-ac4a-06723665e123",
        "surveyNo": "123456",
        "termNo": "123456",
        "area": "1234",
        "termExpiryDate": 659989800000,
        "annualRent": 12345,
        "lesseAsPerGLR": "Mst. Test d/o Test",
        "category":"Military Station - Test",
        "located" : "Outside Civil Area - Test",
        "applicationDocuments": [
          {
            "id": "9c52f9fb-0870-495f-9370-0fc265513609",
            "active": true,
            "tenantId": "pb.agra",
            "documentType": "ELECTBILL",
            "fileStoreId": "4d27f465-636e-4719-8abe-68b364cf70db",
            "documentUid": null,
            "auditDetails": null
          },
          {
            "id": "cddfa9ce-2ec5-4ff7-95b1-f69381d9de79",
            "active": true,
            "tenantId": "pb.agra",
            "documentType": "AADHAARCARD",
            "fileStoreId": "b41ccf5c-2687-41d1-9cb1-cfcf9eab36fb",
            "documentUid": null,
            "auditDetails": null
          },
          {
            "id": "e76d3fd2-b1d1-4e37-b635-93d878935b2f",
            "active": true,
            "tenantId": "pb.agra",
            "documentType": "OWNERPHOTO",
            "fileStoreId": "a5e5aa69-1115-4fac-8310-e251514d639b",
            "documentUid": null,
            "auditDetails": null
          }
        ],
        "auditDetails": {
          "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
          "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
          "createdTime": 1603081340442,
          "lastModifiedTime": 1603081340442
        }
      },
      "userDetails": [
        {
          "id": 451,
          "uuid": "9eb6f880-c22f-4c1e-8f99-106bb3e0e60a",
          "userName": "7022225104",
          "password": null,
          "salutation": null,
          "name": "Test",
          "gender": "MALE",
          "mobileNumber": "9999999999",
          "emailId": "test@gmail.com",
          "altContactNumber": "0802255445",
          "pan": "ABCDE123456",
          "aadhaarNumber": "123456789123",
          "permanentAddress": "Address",
          "permanentCity": "pb.secunderabad",
          "permanentPinCode": null,
          "correspondenceCity": null,
          "correspondencePinCode": null,
          "correspondenceAddress": null,
          "active": true,
          "dob": 519071400000,
          "pwdExpiryDate": 1610664780000,
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
          "fatherOrHusbandName": "Babu",
          "bloodGroup": null,
          "identificationMark": null,
          "photo": "https://13.71.65.215.nip.io/filestore/v1/files/id?fileStoreId=d0b3496d-75b1-45af-9fb1-65cdf682680e&tenantId=pb",
          "createdBy": "0",
          "createdDate": 1593345205000,
          "lastModifiedBy": "1",
          "lastModifiedDate": 1603263557000,
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
      "auditDetails": {
        "createdBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
        "lastModifiedBy": "9d39d685-edbe-45a7-8dc5-1166a4236b98",
        "createdTime": 1603081340442,
        "lastModifiedTime": 1603085076212
      },
      "fileStoreId": null
    }
  ]
};