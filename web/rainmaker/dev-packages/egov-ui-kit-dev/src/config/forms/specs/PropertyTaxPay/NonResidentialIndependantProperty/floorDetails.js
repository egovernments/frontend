import { MDMS } from "egov-ui-kit/utils/endPoints";
import { subUsageType, occupancy, builtArea, beforeInitForm, annualRent, floorName } from "../utils/reusableFields";
const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_COMMON_USAGE_TYPE",
      // value: "Non Residential",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: "PROPERTYTAX_BILLING_SLAB_NONRESIDENTIAL",
      required: true,
      numcols: 4,
      disabled: true,
      formName: "plotDetails",
    },
    ...subUsageType,
    ...occupancy,
    ...builtArea,
    ...floorName,
    ...annualRent,
  },
  isFormValid: false,
  ...beforeInitForm,
};

export default formConfig;
