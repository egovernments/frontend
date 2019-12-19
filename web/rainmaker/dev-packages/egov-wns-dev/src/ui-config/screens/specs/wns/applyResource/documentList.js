export const documentList = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-tradelicence",
  componentPath: "DocumentListContainer",
  props: {
    buttonLabel: {
      labelName: "UPLOAD FILE",
      labelKey: "TL_BUTTON_UPLOAD FILE"
    },
    description: {
      labelName: "Only .jpg and .pdf files. 6MB max file size.",
      labelKey: "TL_UPLOAD_RESTRICTIONS"
    },
    inputProps: {
      accept: "image/*, .pdf, .png, .jpeg"
    },
    documentTypePrefix: "TL_",
    maxFileSize: 6000
  }
};
