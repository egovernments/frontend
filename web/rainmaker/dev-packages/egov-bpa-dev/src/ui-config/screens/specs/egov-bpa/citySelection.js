import {
  getLabel,
  getCommonContainer,
  getCommonHeader,
  getSelectField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const screenConfig = {
  uiFramework: "material-ui",
  name: "citySelection",
  components: {
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-bpa",
      componentPath: "DialogContainer",
      props: {
        open: true,
        maxWidth: "sm",
        screenKey: "citySelection"
      },
      children: {
        popup: getCommonContainer({
          div: getCommonHeader(
              {
                labelName: "Select Your City",
                labelKey: "Select Your City"
              },
              // {
              //   style: {
              //     fontSize: "20px"
              //   }
              // }
            ),
          cityCard: getCommonContainer({
            city: getSelectField({
              label: {
                labelName: "City",
                labelKey: "City"
              },
              placeholder: {
                labelName: "Select City",
                labelKey: "Select City"
              },
              required: true,
              jsonPath: "BPAs[0].citySelection.city",
              props: {
                fullWidth: true,
                data: [
                  {
                    value: "Amritsar",
                    label: "Amritsar"
                  },
                  {
                    value: "Jalandhar",
                    label: "Jalandhar"
                  }
                ],
                optionValue: "value",
                optionLabel: "label"
              },
              gridDefination: {
                xs: 12,
                sm: 12,
                md: 12
              },
            })
          })
        }),
        nextButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              minWidth: "200px",
              height: "48px",
              marginRight: "45px"
            }
          },
          children: {
            nextButtonLabel: getLabel({
              labelName: "Apply",
              labelKey: "Apply"
            }),
            nextButtonIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "keyboard_arrow_right"
              }
            }
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              callBackForNext(state, dispatch);
            }
          }
        }
      }
    }
  }
};

const callBackForNext = (state, dispatch) => {
  let cityName = get(state, "screenConfiguration.preparedFinalObject.BPAs[0].citySelection.city");
  if (cityName) {
    startApplyFlow(state, dispatch);
  }
};

const startApplyFlow = (state, dispatch) => {
  dispatch(prepareFinalObject("BPAs", []));
  const applyUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? `/egov-ui-framework/egov-bpa/apply`
      : `/egov-bpa/apply`;
  dispatch(setRoute(applyUrl));
};

export default screenConfig;
