export const LOCALATION = {
  GET: {
    URL: "localization/messages/v1/_search",
    ACTION: "_search",
  },
};

export const COMPLAINT = {
  GET: {
    URL: "rainmaker-pgr/v1/requests/_search",
    ACTION: "_search",
  },
};

export const DRAFTS = {
  GET: {
    URL: "pt-services-v2/drafts/_search",
    ACTION: "_search",
  },
};

export const FILE_UPLOAD = {
  POST: {
    URL: "filestore/v1/files",
  },
};

export const FETCH_FILE = {
  GET: {
    URL: "filestore/v1/files/url",
  },
};

export const CATEGORY = {
  GET: {
    URL: "mdms/v1/_search",
    ACTION: "_search",
  },
};

export const AUTH = {
  LOGOUT: {
    URL: "/user/_logout",
    ACTION: "_logout",
  },
};

export const USER = {
  SEARCH: {
    URL: "/user/_search",
    ACTION: "search",
  },
  UPDATE: {
    URL: "/profile/_update",
    ACTION: "create",
  },
};

export const OTP = {
  RESEND: {
    URL: "/user-otp/v1/_send",
    ACTION: "_send",
  },
};

export const EMPLOYEE = {
  GET: {
    URL: "/hrms/employees/_search",
    ACTION: "_search",
  },
};

export const EMPLOYEE_ASSIGN = {
  GET: {
    URL: "/hrms/employees/_search",
    ACTION: "_search",
  },
};

export const EMPLOYEE_CREATE = {
  POST: {
    URL: "/hrms/employees/_create",
  },
};

export const EMPLOYEE_UPDATE = {
  POST: {
    URL: "/hrms/employees/_update",
  },
};

export const CITIZEN = {
  GET: {
    URL: "/user/v1/_search",
    ACTION: "_search",
  },
};

export const MDMS = {
  GET: {
    URL: "mdms/v1/_search",
    ACTION: "_search",
  },
};

export const TENANT = {
  POST: {
    URL: "location/location/v11/tenant/_search",
    ACTION: "_search",
  },
};

export const SPEC = {
  GET: {
    URL: "spec-directory",
    ACTION: "_search",
  },
};

export const CITY = {
  GET: {
    URL: "mdms/v1/_search",
    ACTION: "_search",
  },
};

export const FLOOR = {
  GET: {
    URL: "mdms/v1/_search",
    ACTION: "_search",
  },
};
export const ACTIONMENU = {
  GET: {
    URL: "/access/v1/actions/egov-mdms-service/_get",
    ACTION: "_get",
  },
};

export const PROPERTY = {
  GET: {
    URL: "/property/property/_search",
    ACTION: "_get",
  },
};

export const DRAFT = {
  GET: {
    URL: "/pt-services-v2/drafts/_search",
    ACTION: "_get",
  },
};

export const PGService = {
  GET: {
    URL: "/pg-service/transaction/v1/_search",
    ACTION: "_get",
  },
};

export const RECEIPT = {
  GET: {
    URL: "/collection/receipts/_search",
    ACTION: "_get",
  },
};

export const BOUNDARY = {
  GET: {
    URL: "/location/location/v11/boundarys/_search",
    ACTION: "_get",
  },
};

export const EVENTSCOUNT = {
  GET: {
    URL: "/user-event/v1/events/notifications/_count",
    ACTION: "_search",
  },
};

export const NOTIFICATIONS = {
  GET: {
    URL: "/user-event/v1/events/_search",
    ACTION: "_search",
  },
};

export const EVENTS_UPDATE = {
  POST: {
    URL: "/user-event/v1/events/lat/_update",
    ACTION: "_update",
  },
};

export const EVENTS_UPDATE_MAIN = {
  POST: {
    URL: "/user-event/v1/events/_update",
    ACTION: "_update",
  },
};

export const EVENTS_CREATE = {
  POST: {
    URL: "/user-event/v1/events/_create",
    ACTION: "_create",
  },
};

export const FETCHBILL = {
  GET: {
    URL: "/billing/bill/v2/_fetchbill",
    ACTION: "_get",
  },
};
export const FETCHRECEIPT = {
  GET: {
    URL: "/collection/payments/_search",
    ACTION: "_get",
  },
};
export const DOWNLOADRECEIPT = {
  GET: {
    URL: "/pdfgen/v1/_create",
    ACTION: "_get",
  },
};
export const FETCHASSESSMENTS = {
  GET: {
    URL: "/property/assessment/_search",
    ACTION: "_search",
  },
};
export const PAYMENTSEARCH = {
  GET: {
    URL: "/collection/payments/",
    ACTION: "_search",
  },
};
export const WORKFLOW_SEARCH = {
  POST: {
    URL: "workflow/egov-wf/process/_search",
  },
};
export const WORKFLOW_BUSINESS_SEARCH = {
  POST: {
    URL: "workflow/egov-wf/businessservice/_search",
    ACTION: "_search",
  },
};
export const WORKFLOW_COUNT = {
  GET: {
    URL: "workflow/egov-wf/process/_count",
    ACTION: "_search",
  },
};
export const PROPERTY_CREATE = {
  POST: {
    URL: "/property/property/_create",
    ACTION: "_update",
  },
};
export const PROPERTY_UPDATE = {
  POST: {
    URL: "/property/property/_update",
    ACTION: "_update",
  },
};
export const PROPERTY_ASSESSMENT_UPDATE = {
  POST: {
    URL: "/property/assessment/_update",
  },
};
export const WATER_CREATE = {
  POST: {
    URL: "/water/wc/_create",
  },
};
export const WATER_SEARCH = {
  POST: {
    URL: "/water/wc/_search",
    ACTION: "_search",
  },
};
export const WATER_UPDATE  = {
  POST: {
    URL: "/water/wc/_update",
  },
};
export const WATER_CAL_ESTIMATE = {
  POST: {
    URL: "water-calculator/waterCalculator/_estimate",
    ACTION: "_estimate",
  },
};
export const WATER_CAL_SEARCH = {
  POST: {
    URL : "/water-calculator/meterConnection/_search",
    ACTION : "_search",
  },
};
export const WATER_CAL_CREATE = {
  POST: {
    URL : "/water-calculator/meterConnection/_create",
    ACTION : "_create",
  },
};
export const WATER_CAL_ADHOC = {
  POST: {
    URL: "water-calculator/waterCalculator/_applyAdhocTax",
  },
};
export const IDGEN = {
  POST: {
    URL: "/idgen/id/_generate",
  },
};

export const SEWERAGE_SEARCH = {
  POST : {
    URL: "/sewerage/swc/_search",
    ACTION: "_search",
  },
};
export const SEWERAGE_CREATE = {
  POST : {
    URL : "/sewerage/swc/_create",
  },
};
export const SEWERAGE_UPDATE = {
  POST : {
    URL : "/sewerage/swc/_update",
  },
};
export const SEWERAGE_CAL_ESTIMATE = {
  POST : {
    URL : "sewerage-calculator/sewerageCalculator/_estimate",
    ACTION : "_estimate",
  },
};
export const SEWERAGE_CAL_ADHOC = {
  GET : {
    URL : "sewerage-calculator/sewerageCalculator/_applyAdhocTax",
  },
};
export const MDMS_GET = {
  POST: {
    URL: "mdms/v1/_get",
  },
};

export const PROPERTYTAX_CAL_SEARCH = {
  GET : {
    URL : "propertytax-calculator/billingslab/_search",
    ACTION : "_search",
  },
};
export const PROPERTYTAX_CAL_GETBILL = {
  POST : {
    URL : "propertytax-calculator/propertytax/_getbill",
    ACTION : "_create",
  },
};
export const PROPERTYTAX_CAL_ESTIMATE = {
  POST : {
    URL : "propertytax-calculator/propertytax/v2/_estimate",
    ACTION : "_estimate",
  },
};
export const COLLECTION_RECEIPTS = {
  POST : {
    URL : "collection/receipts/_create",
    ACTION : "_create",
  },
};
export const COLLECTION_PAYMENTS = {
  SEARCH : {
    URL : "collection/payments/_search",
  },
};


export const PDFGEN = {
  POST: {
    URL: "pdfgen/v1/_create",
  },
};

export const TL = {
  CREATE: {
    URL: "/tradelicense/v1/_create",
  },
  UPDATE: {
    URL: "/tradelicense/v1/_update",
  },
  SEARCH: {
    URL: "/tradelicense/v1/_search",
  },
};

export const TL_BPAREG = {
  CREATE: {
    URL: "/tradelicense/v1/BPAREG/_create",
  },
  UPDATE: {
    URL: "/tradelicense/v1/BPAREG/_update",
  },
  SEARCH: {
    URL: "/tradelicense/v1/BPAREG/_search",
  },
};

export const TL_CALC = {
  GETBILL: {
    URL: "/tradelicense-calculator/v1/_getbill",
  },
  BILLINGSLAB: {
    URL: "/tradelicense-calculator/billingslab/_search",
  },
  BPAREG: {
    URL: "/tradelicense-calculator/v1/BPAREG/_getbill",
  },
};

export const FIRENOC = {
  CREATE: {
    URL: "/firenoc/v1/_create",
  },
  UPDATE: {
    URL: "/firenoc/v1/_update",
  },
  SEARCH: {
    URL: "/firenoc/v1/_search",
  },
};

export const FINANCE_MASTER = {
  BANKBRANCHES: {
    URL: "finance-masters/bankbranches/_search",
  },
  BANKS_SEARCH: {
    URL: "/finance-masters/banks/_search",
  },
  FUNDS_SEARCH: {
    URL: "/finance-masters/funds/_search",
  },
  FUNCTIONARIES_SEARCH: {
    URL: "/finance-masters/functionaries/_search",
  },
  FUNCTIONS_SEARCH: {
    URL: "/finance-masters/functions/_search",
  },
};

export const SEARCHER = {
  BILL_GENIE: {
    URL: "searcher/bill-genie/billswithaddranduser/_get",
  },
  LOCALITY: {
    URL: "searcher/locality/",
    ACTION: "_get"
  },
};

export const BILLING = {
  SEARCH : {
    URL : "/billing/bill/_search",
  },
  GENERATE : {
    URL : "/billing/bill/_generate",
  },
};

export const BILLING_V2 = {
  SEARCH : {
    URL : "billing/bill/v2/_search",
  },
};

export const BILLING_DEMAND = {
  CREATE : {
    URL : "/billing/demand/_create",
  },
  UPDATE : {
    URL : "/billing/demand/_update",
  },
  SEARCH : {
    URL : "/billing/demand/_search",
  },
};

export const FETCHBILL_2 = {
  GET = {
    URL : "/billing/bill/v2/_fetchbill",
  }
};

export const LOCATION = {
  BOUNDARY_TYPE: {
    URL: "location/boundarys/getByBoundaryType",
  },
  HEIRARCHY: {
    URL: "location/boundarytypes/getByHierarchyType",
    ACTION: "_get"
  },
  BOUNDARYS: {
    URL: "egov-location/boundarys",
    ACTION: "_get"
  },
};

export const BPA = {
  CREATE : {
    URL : "building-plan/v1/bpa/_create",
  },
  UPDATE : {
    URL : "/building-plan/v1/bpa/_update",
  },
  SEARCH : {
    URL : "/building-plan/v1/bpa/_search",
  },
  UPDATE_WITHOUT_BPA : {
    URL : "/building-plan/v1/_update",
  },
  SEARCH_BPAREG : {
    URL : "/building-plan/v1/BPAREG/_search",
  },
  PERMITORDER : {
    URL : "/building-plan/v1/bpa/_permitorderedcr",
  },
};

