
export const documentList = [
  {
    "code": "APPLICATION",
    "maxFileSize": 5000,
    "required": true,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_APPLICATION_DESCRIPTION",
    "statement": "LAMS_APPLICATION_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[0]"
  },
  {
    "code": "LEASEDEED",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_LEASEDEED_DESCRIPTION",
    "statement": "LAMS_LEASEDEED_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[1]"
  },
  {
    "code": "GLREXTRACTPLAN",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_GLREXTRACTPLAN_DESCRIPTION",
    "statement": "LAMS_GLREXTRACTPLAN_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[2]"
  },
  {
    "code": "BUILDINGPLAN",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_BUILDINGPLAN_DESCRIPTION",
    "statement": "LAMS_BUILDINGPLAN_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[3]"
  },
  {
    "code": "NODUECERT",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_NODUECERT_DESCRIPTION",
    "statement": "LAMS_NODUECERT_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[4]"
  },
  {
    "code": "LEGALRIGHTS",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_LEGALRIGHTS_DESCRIPTION",
    "statement": "LAMS_LEGALRIGHTS_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[5]"
  },
  {
    "code": "SELFDECLARATION",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_SELFDECLARATION_DESCRIPTION",
    "statement": "LAMS_SELFDECLARATION_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[6]"
  },
  {
    "code": "CONDONATION",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_CONDONATION_DESCRIPTION",
    "statement": "LAMS_CONDONATION_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[7]"
  },
  {
    "code": "TRANSFERDEED",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_TRANSFERDEED_DESCRIPTION",
    "statement": "LAMS_TRANSFERDEED_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[8]"
  },
  {
    "code": "DEATHCERTIFICATE",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_DEATHCERTIFICATE_DESCRIPTION",
    "statement": "LAMS_DEATHCERTIFICATE_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[9]"
  },
  {
    "code": "INDEMNITYBOND",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_INDEMNITYBOND_DESCRIPTION",
    "statement": "LAMS_INDEMNITYBOND_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[10]"
  },
  {
    "code": "OTHERS",
    "maxFileSize": 5000,
    "required": false,
    "formatProps": {
      "accept": "image/*,.pdf,.png,.jpeg"
    },
    "description": "LAMS_OTHERS_DESCRIPTION",
    "statement": "LAMS_OTHERS_STATEMENT",
    "jsonPath": "lamsStore.Lease[0].wfDocuments[11]"
  }


];
