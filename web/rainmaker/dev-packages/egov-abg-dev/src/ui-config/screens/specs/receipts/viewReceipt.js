import commonConfig from "config/common.js";
import { getCommonHeader ,getCommonContainer } from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import { setServiceCategory } from "../utils";
import { viewReceiptDetailsCard } from "./cancelReceiptResource/cancelReceiptDetails";
import { viewReceiptFooter } from "./cancelReceiptResource/cancelReceiptFooter";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const header =getCommonContainer({
  header: getCommonHeader({
    labelName: `Cancel Receipt`, //later use getFinancialYearDates
    labelKey: "CR_COMMON_HEADER"
  }),
  //applicationNumber: applicationNumberContainer()
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-abg",
    componentPath: "ApplicationContainer",
    props: {
      number: getQueryArg(window.location.href, "consumerCode")|| 'PB-PT-2020-03-03-004161',
      label: {
        labelValue: "Receipt Details Receipt No.",
        labelKey: "CR_RECEIPT_DETAILS_NUMBER"
      }
    },
    visible: true
  }
});
const tenantId = getTenantId();
const loadServiceType = async (tenantId, dispatch) => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService",
              filter: "[?(@.type=='Adhoc')]"
            },
            {
              name: "TaxHeadMaster"
            },
            {
              name: "TaxPeriod"
            }
          ]
        }
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );
    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.BillingService",
        payload.MdmsRes.BillingService
      )
    );
    setServiceCategory(
      get(payload, "MdmsRes.BillingService.BusinessService", []),
      dispatch
    );
  } catch (e) {
    console.log(e);
  }
}
const getData = async (action, state, dispatch, demandId) => {

  let requestBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            },
            { name: "citymodule" }
          ]
        }
      ]
    }
  };

  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );

    if (payload) {
      dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
      const citymodule = get(payload, "MdmsRes.tenant.citymodule");
      const liveTenants = citymodule && citymodule.filter(item => item.code === "UC");
      dispatch(
        prepareFinalObject("applyScreenMdmsData.tenant.citiesByModule", get(liveTenants[0], "tenants"))
      );
    }
    const serviceCategories = get(
      state.screenConfiguration,
      "preparedFinalObject.searchScreenMdmsData.serviceCategory",
      []
    );
    if (serviceCategories && serviceCategories.length !== 0) {
      setServiceCategory(
        serviceCategories,
        dispatch
      );
    } else if (tenantId) {
      loadServiceType(tenantId, dispatch)
    }
    dispatch(
      prepareFinalObject("Demands[0].tenantId", tenantId)
    );
  } catch (e) {
    console.log(e);
  }
  if (!demandId) {
    try {
      let payload = null;
      payload = await httpRequest("post", "/egov-idgen/id/_generate", "", [], {
        idRequests: [
          {
            idName: "",
            format: "UC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]",
            tenantId: `${tenantId}`
          }
        ]
      });
      dispatch(
        prepareFinalObject(
          "Demands[0].consumerCode",
          get(payload, "idResponses[0].id", "")
        )
      );
      loadServiceType(tenantId, dispatch);
    } catch (e) {
      console.log(e);
    }
  }

  // return action;
};

const viewReceipt = {
  uiFramework: "material-ui",
  name: "viewReceipt",
  beforeInitScreen: (action, state, dispatch) => {
    const demandId = get(
      state.screenConfiguration.preparedFinalObject,
      "Demands[0].id",
      null
    );
    const screenConfigForUpdate = get(
      state.screenConfiguration,
      "screenConfig.viewReceipt"
    );

    dispatch(prepareFinalObject('DynamicMdms.BillingService.selectedValues',[]));
    dispatch(prepareFinalObject('DynamicMdms.BillingService.serviceCategories.selectedValues',[]));
dispatch(prepareFinalObject('PaymentReceipt',JSON.parse(`{"id":"b1fd005e-300b-44fc-8054-328f74fdfa5a","tenantId":"pb.amritsar","totalDue":1000,"totalAmountPaid":1000,"transactionNumber":"amritsar2423512102","transactionDate":1589543644191,"paymentMode":"CASH","instrumentDate":1589543644191,"instrumentNumber":null,"instrumentStatus":"APPROVED","ifscCode":null,"auditDetails":{"createdBy":"1692","createdTime":1589543644141,"lastModifiedBy":"1692","lastModifiedTime":1589543644141},"additionalDetails":null,"paymentDetails":[{"paymentId":null,"id":"b9e9d174-22c4-472e-bc84-d837372f2bec","tenantId":"pb.amritsar","totalDue":1000,"totalAmountPaid":1000,"receiptNumber":"PT/1013/2020-21/000127","manualReceiptNumber":null,"manualReceiptDate":0,"receiptDate":1589543644141,"receiptType":"BILLBASED","businessService":"PT","billId":"94495d41-3b29-446e-bee3-cf9be51226f9","bill":{"id":"94495d41-3b29-446e-bee3-cf9be51226f9","mobileNumber":null,"paidBy":null,"payerName":null,"payerAddress":null,"payerEmail":null,"payerId":null,"status":"ACTIVE","reasonForCancellation":null,"isCancelled":null,"additionalDetails":null,"billDetails":[{"billDescription":null,"displayMessage":null,"callBackForApportioning":null,"cancellationRemarks":null,"id":"28d6ab60-9294-49b7-99a1-45b44e8b497a","tenantId":"pb.amritsar","demandId":"483cda54-e5e4-40d8-9a33-2a2648bd7690","billId":"94495d41-3b29-446e-bee3-cf9be51226f9","amount":1000,"amountPaid":1000,"fromPeriod":1522540800000,"toPeriod":1554076799000,"additionalDetails":{"calculationDescription":["44508915-f86c-4ed9-b090-2eb15294c7ea|0"]},"channel":null,"voucherHeader":null,"boundary":null,"manualReceiptNumber":null,"manualReceiptDate":null,"billAccountDetails":[{"id":"a2d888fc-0d64-4a79-b266-3d6961a9b999","tenantId":"pb.amritsar","billDetailId":"28d6ab60-9294-49b7-99a1-45b44e8b497a","demandDetailId":"d764236c-9e51-442f-91ea-1318bc009fab","order":2,"amount":1000,"adjustedAmount":0,"isActualDemand":null,"taxHeadCode":"PT_FIRE_CESS","additionalDetails":null,"purpose":null,"auditDetails":null},{"id":"910bb32c-b542-48da-8c9d-f22c47526c68","tenantId":"pb.amritsar","billDetailId":"28d6ab60-9294-49b7-99a1-45b44e8b497a","demandDetailId":"af90c6bf-1345-49d0-8f7e-7940c7d6bdc7","order":0,"amount":-8166.67,"adjustedAmount":0,"isActualDemand":null,"taxHeadCode":"PT_UNIT_USAGE_EXEMPTION","additionalDetails":null,"purpose":null,"auditDetails":null},{"id":"34678abc-00e8-4fa7-9aed-87e0f5437759","tenantId":"pb.amritsar","billDetailId":"28d6ab60-9294-49b7-99a1-45b44e8b497a","demandDetailId":"ede05786-3b4e-4984-ab2c-54033cf5caad","order":0,"amount":0,"adjustedAmount":0,"isActualDemand":null,"taxHeadCode":"PT_OWNER_EXEMPTION","additionalDetails":null,"purpose":null,"auditDetails":null},{"id":"4c49eeb0-643a-44d1-bdec-504cd423a481","tenantId":"pb.amritsar","billDetailId":"28d6ab60-9294-49b7-99a1-45b44e8b497a","demandDetailId":"601cfa29-fb51-4cbf-b40b-db8e44c7a0fe","order":2,"amount":0,"adjustedAmount":0,"isActualDemand":null,"taxHeadCode":"PT_CANCER_CESS","additionalDetails":null,"purpose":null,"auditDetails":null},{"id":"979d300e-67b5-4e30-a292-356a02184988","tenantId":"pb.amritsar","billDetailId":"28d6ab60-9294-49b7-99a1-45b44e8b497a","demandDetailId":"c07a56da-1cb6-4dca-b2ed-9991f0d3f727","order":3,"amount":8166.67,"adjustedAmount":0,"isActualDemand":null,"taxHeadCode":"PT_TAX","additionalDetails":null,"purpose":null,"auditDetails":null}],"collectionType":null,"auditDetails":null,"expiryDate":1589587199085}],"tenantId":"pb.amritsar","auditDetails":{"createdBy":"b5985139-1885-49a1-a8f4-f6afba65c02e","createdTime":1589543639085,"lastModifiedBy":"b5985139-1885-49a1-a8f4-f6afba65c02e","lastModifiedTime":1589543639085},"collectionModesNotAllowed":["DD","OFFLINE_NEFT","OFFLINE_RTGS","POSTAL_ORDER"],"partPaymentAllowed":true,"isAdvanceAllowed":false,"minimumAmountToBePaid":null,"businessService":"PT","totalAmount":0,"consumerCode":"PG-PT-2020-05-13-001551","billNumber":"BILLNO-PT-004178","billDate":1589543639085,"amountPaid":null},"additionalDetails":null,"auditDetails":{"createdBy":"1692","createdTime":1589543644141,"lastModifiedBy":"1692","lastModifiedTime":1589543644141}}],"paidBy":"COMMON_OWNER","mobileNumber":"9965664222","payerName":"Jagankumar","payerAddress":"No 1, New cross street","payerEmail":null,"payerId":"effffe62-4f5c-4624-8f0e-f1915eb40126","paymentStatus":"NEW","fileStoreId":null}`)))
    if (demandId) {

      set(
        screenConfigForUpdate,
        "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.serviceCategory.props.disabled",
        true
      );
      set(
        screenConfigForUpdate,
        "components.div.children.cancelReceiptDetailsCard.children.cardContent.children.searchContainer.children.serviceType.props.disabled",
        true
      );
      action.screenConfig = screenConfigForUpdate;
    }
    !demandId && getData(action, state, dispatch, demandId);

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "viewReceipt"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        viewReceiptDetailsCard,
        viewReceiptFooter
      }
    }
  }
};

export default viewReceipt;
