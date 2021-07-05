import {plotSize,measuringUnit,beforeInitFormForPlot,annualRent} from "../utils/reusableFields";
const formConfig = {
  name: "plotDetails",
  fields: {
    ...plotSize,
    ...measuringUnit,
    ...annualRent
  },
  isFormValid: false,
  ...beforeInitFormForPlot
};

export default formConfig;
