import get from "lodash/get";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import store from "../../../../ui-redux/store";
import { getEmployeeName,getMdmsData } from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  getLocalization,
  getLocale
} from "egov-ui-framework/ui-utils/localStorageUtils";
import {
  getUlbGradeLabel,
  getTranslatedLabel,
  transformById,
  getTransformedLocale,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-framework/ui-utils/localStorageUtils";


function convertNumberToWords(amount) {
  var words = [];
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
      var n_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      var received_n_array = [];
      for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
      }
      var j;
      for (i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
      }
      for (i = 0, j = 1; i < 9; i++, j++) {
          if (i ===0 || i ===2 || i ===4 || i ===7) {
              if (n_array[i] ===1) {
                  n_array[j] = 10 + parseInt(n_array[j], 10);
                  n_array[i] = 0;
              }
          }
      }
      var value = "";
      for (i = 0; i < 9; i++) {
          if (i ===0 || i ===2 || i ===4 || i ===7) {
              value = n_array[i] * 10;
          } else {
              value = n_array[i];
          }
          if (value !== 0) {
              words_string += words[value] + " ";
          }
          if ((i ===1 && value !== 0) || (i ===0 && value !== 0 && n_array[i + 1] ===0)) {
              words_string += "Crores ";
          }
          if ((i ===3 && value !== 0) || (i ===2 && value !== 0 && n_array[i + 1] ===0)) {
              words_string += "Lakhs ";
          }
          if ((i ===5 && value !== 0) || (i ===4 && value !== 0 && n_array[i + 1] ===0)) {
              words_string += "Thousand ";
          }
          if (i ===6 && value !== 0 && (n_array[i + 1] !== 0 && n_array[i + 2] !== 0)) {
              words_string += "Hundred and ";
          } else if (i ===6 && value !== 0) {
              words_string += "Hundred ";
          }
      }
      words_string = words_string.split("  ").join(" ");
  }
  return words_string;
}


const localizationLabels = JSON.parse(getLocalization("localization_en_IN"));
const transfomedKeys = transformById(localizationLabels, "code");

// const ifNotNull = value => {
//   return !["", "NA", "null", null].includes(value);
// };

const nullToNa = value => {
  return ["", "NA", "null", null].includes(value) ? "None" : value;
};

const epochToDate = et => {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

export const loadUlbLogo = tenantid => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    store.dispatch(prepareFinalObject("base64UlbLogo", canvas.toDataURL()));
    canvas = null;
  };
  img.src = `/pb-egov-assets/${tenantid}/logo.png`;
};

export const loadReceiptData = async response => {
  let data = {};

  if (response.Bill && response.Bill.length > 0) {
    data.receiptDate = epochToDate(
      get(response, "Bill[0].billDetails[0].receiptDate")
    );
    const fromDate = epochToDate(
      get(response, "Bill[0].billDetails[0].fromPeriod")
    );
    const toDate = epochToDate(
      get(response, "Bill[0].billDetails[0].toPeriod")
    );
    data.taxPeriod = `${fromDate} - ${toDate}`;
    data.consumerName = get(response, "Bill[0].payerName");
    data.mobileNumber = get(response, "Bill[0].mobileNumber");
    data.paidBy=get(response,"Bill[0].paidBy");

    const serviceCatLabel = getTransformedLocale(
      get(response, "Bill[0].billDetails[0].businessService").split(".")[0]
    );
    data.serviceCategory = getLocaleLabels(
      "",
      `BILLINGSERVICE_BUSINESSSERVICE_${serviceCatLabel}`,
      transfomedKeys
    );

    const serviceTypeLabel = getTransformedLocale(
      get(response, "Bill[0].billDetails[0].businessService")
    );
    const serviceType = getLocaleLabels(
      "",
      `BILLINGSERVICE_BUSINESSSERVICE_${serviceTypeLabel}`,
      transfomedKeys
    );
    data.serviceType = serviceType ? serviceType : "NA";
    data.amountPaid = get(response, "Bill[0].billDetails[0].amountPaid", 0);
    data.amountInWords=convertNumberToWords(data.amountPaid);

    data.amountPaid=data.amountPaid + " ("+data.amountInWords+" only)";

    data.totalAmount = get(response, "Bill[0].billDetails[0].totalAmount", 0);
    data.amountDue = data.totalAmount - data.amountPaid;
    data.paymentMode = nullToNa(
      get(response, "instrument.instrumentType.name", "NA")
    );
    data.chequeDDnumber=nullToNa(get(response,"instrument.instrumentNumber","NA")) + " - "+ nullToNa(get(response,"instrument.bank.name","NA"));
    data.chequeDDdate=nullToNa(epochToDate(get(response, "instrument.instrumentDate", null)));

    data.comments = nullToNa(
      get(response, "Bill[0].billDetails[0].additionalDetails.comment", "NA")
    );
    data.address = nullToNa(
      get(response, "Bill[0].payerAddress", "NA")
    );
    data.receiptNumber = get(
      response,
      "Bill[0].billDetails[0].receiptNumber",
      null
    );
    data.g8ReceiptNo = nullToNa(
      get(response, "Bill[0].billDetails[0].manualReceiptNumber", "None")
    );
    data.g8ReceiptDate = nullToNa(
      epochToDate(
        get(response, "Bill[0].billDetails[0].manualReceiptDate", null)
      )
    );

    const queryObj = [
      {
        key: "ids",
        value: get(response, "auditDetails.createdBy")
      },
      {
        key: "tenantId",
        value:
          process.env.REACT_APP_NAME === "Employee"
            ? getTenantId()
            : response.tenantId
      }
    ];

    data.createdBy =
      get(response, "instrument.instrumentType.name") !== "Online"
        ? await getEmployeeName(queryObj)
        : "NA";
  }
  return data;
  // store.dispatch(prepareFinalObject("receiptDataForReceipt", data));
};

export const loadMdmsData = async tenantid => {
  let localStorageLabels = JSON.parse(
    window.localStorage.getItem(`localization_${getLocale()}`)
  );
  let localizationLabels = transformById(localStorageLabels, "code");

  let data = {};
  let queryObject = [
    {
      key: "tenantId",
      value: `${tenantid}`
    },
    {
      key: "moduleName",
      value: "tenant"
    },
    {
      key: "masterName",
      value: "tenants"
    }
  ];
  let response = await getMdmsData(queryObject);

  if (
    response &&
    response.MdmsRes &&
    response.MdmsRes.tenant.tenants.length > 0
  ) {
    let ulbData = response.MdmsRes.tenant.tenants.find(item => {
      return item.code === tenantid;
    });
    /** START Corporation name generation logic */
    // let ulbGrade = get(ulbData, "city.ulbGrade", "NA");
    // let name = get(ulbData, "city.name", "NA");
    // if (ulbGrade) {
    //   if (ulbGrade === "NP") {
    //     data.corporationName = `${name.toUpperCase()} NAGAR PANCHAYAT`;
    //   } else if (ulbGrade === "Municipal Corporation") {
    //     data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    //   } else if (ulbGrade.includes("MC Class")) {
    //     data.corporationName = `${name.toUpperCase()} MUNICIPAL COUNCIL`;
    //   } else {
    //     data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    //   }
    // } else {
    //   data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    // }
    const ulbGrade = get(ulbData, "city.ulbGrade", "NA")
      ? getUlbGradeLabel(get(ulbData, "city.ulbGrade", "NA"))
      : "MUNICIPAL CORPORATION";

    const cityKey = `TENANT_TENANTS_${get(ulbData, "code", "NA")
      .toUpperCase()
      .replace(/[.]/g, "_")}`;

    data.corporationName = `${getTranslatedLabel(
      cityKey,
      localizationLabels
    ).toUpperCase()} ${getTranslatedLabel(
      ulbGrade,
      localizationLabels
    ).toUpperCase()}`;

    /** END */
    data.corporationAddress = get(ulbData, "address", "NA");
    data.corporationContact = get(ulbData, "contactNumber", "NA");
    data.corporationWebsite = get(ulbData, "domainUrl", "NA");
    data.corporationEmail = get(ulbData, "emailId", "NA");
  }
  store.dispatch(prepareFinalObject("mdmsDataForReceipt", data));
};

/** Data used for creation of receipt is generated and stored in local storage here */
