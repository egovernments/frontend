import { getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";

export const consumerAddresss = {
  address: getTextField({
    label: {
      labelName: "Consumer Address",
      labelKey: "UC_ADDRESS_LABEL",
    },
    placeholder: {
      labelName: "Enter Address ",
      labelKey: "UC_ADDRESS_PLACEHOLDER",
    },
    Required: false,
    jsonPath: "Demands[0].additionalDetails.address",
  }),
};