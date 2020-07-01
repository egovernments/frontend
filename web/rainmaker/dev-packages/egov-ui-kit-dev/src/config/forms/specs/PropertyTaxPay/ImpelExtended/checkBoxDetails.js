const formConfig = {
    name: "checkBoxDetails",
    fields: {
        inflammableMaterial: {
            id: "inflammableMaterial",
            jsonPath: "Properties[0].bussinessDetails[0].units[0].inflammableMaterial",
            type: "checkbox",
            floatingLabelText: "Do you have any inflammable material stored in your property?",
            hintText: "Do you have any inflammable material stored in your property?",
            required: true,
            fullWidth: true,
        },
        heightOfProperty: {
            id: "heightOfProperty",
            jsonPath: "Properties[0].bussinessDetails[0].units[0].heightOfProperty",
            type: "checkbox",
            floatingLabelText: "Height of property more than 36 feet?",
            hintText: "Height of property more than 36 feet?",
            required: true,
            fullWidth: true,
        }
    }
}
export default formConfig;