import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "egov-ui-kit/common/GenericForm";

const combinationToFormkeyMapping = {
  "RESIDENTIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/ResidentialIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/ResidentialIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/ResidentialIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/ResidentialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "RESIDENTIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/ResidentialSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/ResidentialSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/ResidentialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "NONRESIDENTIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/NonResidentialIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/NonResidentialIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/NonResidentialIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/NonResidentialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "NONRESIDENTIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/NonResidentialSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/NonResidentialSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/NonResidentialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "MIXED-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/MixedIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/MixedIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/MixedIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/MixedIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "MIXED-SHAREDPROPERTY": {
    // path: "PropertyTaxPay/MixedIndependantProperty",
    // // plotForm: formHoc({ formKey: "plotDetails",isCoreConfiguration:true, path: "PropertyTaxPay/MixedSharedProperty" ,isCoreConfiguration:true})(GenericForm),
    // // floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/MixedIndependantProperty", isCoreConfiguration: true })(
    // //   GenericForm
    // // ),
    // floorObject: {
    //   formKey: "floorDetails",
    //   isCoreConfiguration: true,
    //   makeCopy: true,
    //   copyName: "floorDetails",
    //   path: "PropertyTaxPay/MixedIndependantProperty",
    // },
    // hasPlot: false,
    // hasFloor: true,
    path: "PropertyTaxPay/MixedSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/MixedSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/MixedIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "COMMERCIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/CommercialIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/CommercialIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/CommercialIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/CommercialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "COMMERCIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/CommercialSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/CommercialSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/CommercialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "INDUSTRIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/IndustrialIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/IndustrialIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/IndustrialIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/IndustrialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "INDUSTRIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/IndustrialSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/IndustrialSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/IndustrialIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "RELIGIOUS-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/ReligiousIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/ReligiousIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/ReligiousIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/ReligiousIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "RELIGIOUS-SHAREDPROPERTY": {
    path: "PropertyTaxPay/ReligiousSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/ReligiousSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/ReligiousIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "INSTITUTIONAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/InstitutionalIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/InstitutionalIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({
      formKey: "floorDetails",
      makeCopy: true,
      path: "PropertyTaxPay/InstitutionalIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/InstitutionalIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "INSTITUTIONAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/InstitutionalSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/InstitutionalSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/InstitutionalIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "OTHERS-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/OtherIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/OtherIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/OtherIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/OtherIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "OTHERS-SHAREDPROPERTY": {
    path: "PropertyTaxPay/OtherSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/OtherSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/OtherIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "PUBLICSPACES-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/PublicSpaceIndependantProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/PublicSpaceIndependantProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/PublicSpaceIndependantProperty", isCoreConfiguration: true })(
      GenericForm
    ),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/PublicSpaceIndependantProperty",
    },
    hasPlot: true,
    hasFloor: true,
  },
  "PUBLICSPACES-SHAREDPROPERTY": {
    path: "PropertyTaxPay/PublicSpaceSharedProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/PublicSpaceSharedProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    floorObject: {
      formKey: "floorDetails",
      isCoreConfiguration: true,
      makeCopy: true,
      copyName: "floorDetails",
      path: "PropertyTaxPay/PublicSpaceIndependantProperty",
    },
    hasPlot: true,
    hasFloor: false,
  },
  "COMMON-VACANT": {
    path: "PropertyTaxPay/CommonVacantLandProperty",
    plotForm: formHoc({
      formKey: "plotDetails",
      isCoreConfiguration: true,
      path: "PropertyTaxPay/CommonVacantLandProperty",
      isCoreConfiguration: true,
    })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
};

export const getPlotAndFloorFormConfigPath = (usage, propertyType) => {
  return combinationToFormkeyMapping.hasOwnProperty(`${usage}-${propertyType}`)
    ? combinationToFormkeyMapping[`${usage}-${propertyType}`]
    : combinationToFormkeyMapping["COMMON-VACANT"];
};
