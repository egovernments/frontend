const formConfig = {
    name: "checkBoxDetails",
    fields: {
        inflammableMaterial: {
            id: "inflammableMaterial",
            jsonPath: "Properties[0].propertyDetails[0].inflammableMaterial",
            type: "checkbox",
            floatingLabelText: "PT_COMMON_HEIGHT_OF_PROPERTY",
            hintText: "Do you have any inflammable material stored in your property?",
            required: true,
            fullWidth: true,
        },
        
      
        heightOfProperty: {
            id: "heightOfProperty",
            jsonPath: "Properties[0].propertyDetails[0].heightOfProperty",
            type: "checkbox",
            floatingLabelText: "PT_COMMON_INFLAMMABLE_MATERIAL_PROPERTY",
            hintText: "Height of property more than 36 feet?",
            required: true,
            fullWidth: true,
        }
    }
}
export default formConfig;