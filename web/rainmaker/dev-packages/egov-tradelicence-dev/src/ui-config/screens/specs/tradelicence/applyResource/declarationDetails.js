import {
  getBreak,
  getCommonTitle,
  getCommonContainer,
} from "egov-ui-framework/ui-config/screens/specs/utils";

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
        labelKey: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta nibh et est dignissim elementum. Donec eget nibh justo. In hac habitasse platea dictumst. Aenean vitae vulputate dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque ex diam, suscipit et accumsan vitae, suscipit id magna. Donec sodales a nulla vel mattis. Proin a nibh sed eros egestas volutpat. Donec at cursus urna. Aenean accumsan convallis hendrerit. Aenean finibus eros sit amet dui aliquam volutpat. In hac habitasse platea dictumst. Ut vulputate nisi at sapien eleifend, sed maximus ipsum gravida.",
      },
      jsonPath: "Licenses[0].isDeclared",
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
    type: "array",
  },
});

export const declarationSummary = getCommonContainer({
  
  headers: getCommonTitle(
    {
      labelName: "Declaration",
      labelKey: "TL_DECLARATION_TITLE",
      visible: process.env.REACT_APP_NAME === "Citizen" ? true : false,
    },
    {
      style: {
        marginBottom: 10,
        marginTop: 18,
      },
    }
    
  ),
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        margin: "10px",
      },
    },
    children: {
      body: declarationDetails,
    },
  },

});

