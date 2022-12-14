import {
    getBreak,
    getCommonTitle,
    getCommonContainer,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { callisDecL } from "../applyResource/footer";
  const declarationDetails = getCommonContainer({
    checkbox: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "CheckboxContainer",
      jsonPath: "Licenses[0].isDeclared",
      props: {
        label: {
          labelName:
            "I hereby Solemnly affirm and declare that the information as furnished is true and correct to the best of my knowledge and belief. I/ We have not been barred for building construction activities by any competent authority and further undertake that if any information at any stage shall be found to be false, my registration shall be liable to be canceled without any prior notice in that regard and I shall not claim any compensation etc. for such a default on my part. In case of any discrepancies found later, I shall be liable for punishment under the relevant provisions of Law as also under Municipal Act and the Act.",
          labelKey: "TL_DECLARAION_LABEL test test test",
        },
        jsonPath: "Licenses[0].isDeclared",
        required: true
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
      type: "array",
      required: true
    },
  });
  
  export const declarationSummary = getCommonContainer({
    headers: getCommonTitle(
      {
        labelName: "Declaration",
        labelKey: "TL_DECLARATION_TITLE",
      },
      {
        style: {
          marginBottom: 10,
          marginTop: 18,
        },
        required: true
      }
      
    ),
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: {
          margin: "10px",
        },
        required: true
      },
      children: {
        body: declarationDetails,
      },
      onClickDefination: {
        action: "condition",
        callBack: callisDecL
      },
    },
  });