import get from "lodash/get";
import set from "lodash/set";
import {
  getLocaleLabels,
  getQueryArg,
  getTodaysDateInYMD,
  getTransformedLocalStorgaeLabels,
  getObjectKeys,
  getObjectValues,
} from "egov-ui-framework/ui-utils/commons";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
  toggleSpinner,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validate } from "egov-ui-framework/ui-redux/screen-configuration/utils";

export const getCommonApplyFooter = (children) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer",
    },
    children,
  };
};

export const getDocList = (state, dispatch) => {
  const demandRevisionBasisValue = get(
    state.screenConfiguration.preparedFinalObject,
    "Bill.demandRevisionBasis",
    ""
  );
  const documentObj = get(
    state.screenConfiguration.preparedFinalObject,
    "applyScreenMdmsData.BillAmendment.documentObj"
  );
  const documentTypes = get(
    state.screenConfiguration.preparedFinalObject,
    "applyScreenMdmsData.common-masters.DocumentType"
  );

  let documentObjArray = [];
  let flag = false;

  documentObj.forEach((docObj) => {
    docObj.allowedDocs.forEach((innerObj) => {
      innerObj.demandRevisionBasis.forEach((value) => {
        if (value === demandRevisionBasisValue) flag = true;
      });
    });
    if (flag) {
      documentObjArray.push(docObj);
      flag = false;
      return true;
    }
  });

  


  // const filteredDocTypes =
  //   documentObjArray &&
  //   documentObjArray.length > 0 &&
  //   documentObjArray[0].allowedDocs.reduce((acc, item, index) => {
  //     documentTypes.find((document, index) => {
  //       if (document.code === item.documentType)
  //         acc.push({
  //           ...documentTypes[index],
  //         });
  //     });
  //     return acc;
  //   }, []);
  // // const applicationDocArray =
  // const applicationDocArray =
  //   filteredDocTypes &&
  //   filteredDocTypes.reduce((result, item) => {
  //     const transformedDocObj =
  //       documentObjArray &&
  //       documentObjArray.length > 0 &&
  //       documentObjArray[0].allowedDocs.filter(
  //         (docObj) => docObj.documentType === item.code
  //       )[0];
  //     if (
  //       transformedDocObj.demandRevisionBasis.includes(demandRevisionBasisValue)
  //     ) {
  //       result.push({
  //         code: item.code,
  //         maxFileSize: item.maxFileSize,
  //         required: transformedDocObj.required,
  //         formatProps: {
  //           accept: item.allowedFormat.join(","),
  //         },
  //         description: `COMMON_${item.code}_DESCRIPTION`,
  //         statement: `COMMON_${item.code}_STATEMENT`,
  //       });
  //     }
  //     return result;
  //   }, []);
  let applicationDocArray = documentObjArray[0].allowedDocs.map((item) => {
    return {
      code: item.documentType,
      maxFileSize: item.maxFileSize,
      required: item.required,
      formatProps: {
        accept: item.allowedFormat.join(","),
      },
      dropdown:item.dropdownData ? item.dropdownData:[],
      description: `COMMON_${item.documentType}_DESCRIPTION`,
      statement: `COMMON_${item.documentType}_STATEMENT`,
    };
  })
  let applicationDocument = prepareDocumentTypeObj(applicationDocArray);
  dispatch(
    prepareFinalObject("BillTemp[0].applicationDocuments", applicationDocument)
  );

  //REARRANGE APPLICATION DOCS FROM TL SEARCH IN EDIT FLOW
  let applicationDocs = get(
    state.screenConfiguration.preparedFinalObject,
    "Bill[0].tradeLicenseDetail.applicationDocuments",
    []
  );
  let applicationDocsReArranged =
    applicationDocs &&
    applicationDocs.length &&
    applicationDocument.reduce((acc, item) => {
      const index = applicationDocs.findIndex(
        (i) => i.documentType === item.code
      );
      if (index > -1) {
        acc.push(applicationDocs[index]);
      }
      return acc;
    }, []);
  applicationDocsReArranged &&
    dispatch(
      prepareFinalObject(
        "Bill[0].tradeLicenseDetail.applicationDocuments",
        applicationDocsReArranged
      )
    );
};

export const prepareDocumentTypeObj = (documents) => {
  let documentsArr =
    documents.length > 0
      ? documents.reduce((documentsArr, item, ind) => {
          documentsArr.push({
            ...item,
            jsonPath: `Bill[0].tradeLicenseDetail.applicationDocuments[${ind}]`,
          });
          return documentsArr;
        }, [])
      : [];
  return documentsArr;
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const validateFields = (
  objectJsonPath,
  state,
  dispatch,
  screen = "apply"
) => {
  const fields = get(
    state.screenConfiguration.screenConfig[screen],
    objectJsonPath,
    {}
  );
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (
        fields[variable] &&
        fields[variable].props &&
        (fields[variable].props.disabled === undefined ||
          !fields[variable].props.disabled) &&
        !validate(
          screen,
          {
            ...fields[variable],
            value: get(
              state.screenConfiguration.preparedFinalObject,
              fields[variable].jsonPath
            ),
          },
          dispatch,
          true
        )
      ) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};
