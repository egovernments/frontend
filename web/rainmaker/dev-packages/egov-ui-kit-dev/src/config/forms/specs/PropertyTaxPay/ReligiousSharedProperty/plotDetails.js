import { MDMS } from "egov-ui-kit/utils/endPoints";
import { subUsageType, occupancy, measuringUnit, annualRent, beforeInitFormForPlot, superArea, floorName} from "../utils/reusableFields";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "textfield",
      floatingLabelText: "PT_COMMON_USAGE_TYPE",
      // value: "Religious",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: "PROPERTYTAX_BILLING_SLAB_RELIGIOUS",
      required: true,
      disabled: true,
      numcols: 4,
      formName: "plotDetails",
    },
    ...subUsageType,
    ...occupancy,
    ...superArea,
    ...measuringUnit,
    ...floorName,
    ...annualRent,
  },
  isFormValid: false,
  ...beforeInitFormForPlot,
};

export default formConfig;
