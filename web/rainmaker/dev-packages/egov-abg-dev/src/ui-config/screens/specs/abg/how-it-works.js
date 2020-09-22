const screenConfig = {
  uiFramework: "material-ui",
  name: "HowItWorks",

  components: {
    div: {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-abg",
      componentPath: "HowItWorks",
      props: {
        className: "common-div-css"
      }
    }
  }
};

export default screenConfig;
