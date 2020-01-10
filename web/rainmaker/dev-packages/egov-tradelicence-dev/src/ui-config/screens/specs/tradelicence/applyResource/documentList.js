export const documentList = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-tradelicence",
  componentPath: "DocumentListContainer",
  props: {
    buttonLabel: {
      labelName: "UPLOAD FILE",
      labelKey: "TL_BUTTON_UPLOAD FILE"
    },
    inputProps : [
      {
        type : "OWNERIDPROOF",
        description: {
          labelName: "Only .jpg and .pdf files. 6MB max file size.",
          labelKey: "TL_UPLOAD_RESTRICTIONS"
        },
        formatProps :{
          accept : "image/*, .pdf, .png, .jpeg",
        }, 
        maxFileSize: 6000
      },
      {
        type : "OWNERSHIPPROOF",
        description: {
          labelName: "Only .jpg and .pdf files. 6MB max file size.",
          labelKey: "TL_UPLOAD_RESTRICTIONS"
        },
        formatProps :{
          accept : "image/*, .pdf, .png, .jpeg",
        },        
        maxFileSize: 6000
      },
      {
        type : "OWNERPHOTO",
        description: {
          labelName: "Only .png and .jpeg 6MB max file size.",
          labelKey: "TL_UPLOAD_IMAGE_RESTRICTIONS"
        },
        formatProps :{
          accept: "image/*, .png, .jpeg",
        },        
        maxFileSize: 5000
      }
    ],
    // description: {
    //   labelName: "Only .jpg and .pdf files. 6MB max file size.",
    //   labelKey: "TL_UPLOAD_RESTRICTIONS"
    // },
    // inputProps: {
    //   accept: "image/*, .pdf, .png, .jpeg"
    // },
    // imageDescription: {
    //   labelName: "Only .png and .jpeg 6MB max file size.",
    //   labelKey: "TL_UPLOAD_IMAGE_RESTRICTIONS"
    // },
    // imageInputProps: {
    //   accept: "image/*, .png, .jpeg",
    // },
    documentTypePrefix: "TL_",
    //maxFileSize: 6000
  }
};
