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
        updateDependentFields: ({ formKey, field, dispatch, state }) => {
          removeFormKey(formKey, field, dispatch, state);
          dispatch(prepareFormData(`Properties[0].propertyDetails[0].units`, []));
          let minorObject = get(state, `common.generalMDMSDataById.UsageCategoryMinor[${field.value}]`);
          if (!isEmpty(minorObject)) {
            dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMajor", minorObject.usageCategoryMajor));
          } else {
            dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMajor", field.value));
            dispatch(prepareFormData("Properties[0].propertyDetails[0].usageCategoryMinor", null));
          }
        },
        dropDownData: [],
      },
    }
}