const formConfig = {
    name: "basicInformation",
    fields: {
      typeOfUsage1: {
        id: "typeOfUsage1",
        jsonPath: "Properties[0].propertyDetails[0].usageCategoryMinor",
        type: "singleValueList",
        localePrefix: "PROPERTYTAX_BILLING_SLAB",
        floatingLabelText: "PT_COMMONS_PROPERTY_USAGE_TYPE",
        hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
        required: true,
        fullWidth: true,
        
      },
    }
}

export default formConfig;