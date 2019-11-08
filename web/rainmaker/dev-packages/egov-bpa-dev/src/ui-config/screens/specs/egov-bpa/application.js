import {
    getCommonCardWithHeader,
    getCommonCard,
    getCommonGrayCard,
    getLabel,
    getCommonSubHeader,
    getTextField,
    getSelectField,
    getCommonContainer,
    getPattern
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import { cash, demandDraft, cheque } from "./payment-methods";

  const application = {
    uiFramework: "material-ui",
    name: "mihyRegisterScreen",
    components: {
        mihyRegisterCard: getCommonGrayCard({
          tabSection: {
              uiFramework: "custom-containers-local",
              moduleName: "egov-bpa",
              componentPath: "CustomTabContainer",
              props: {
                // horizontal: {
                //   tabsGrid: { xs: 4, sm: 2, md: 2 },
                //   contentGrid: { xs: 8, sm: 10, md: 10 }
                // },
                tabs: [
                    {
                        tabButton: {labelName: "APPLICATION DETAILS"},
                        tabIcon: "APPLICATION DETAILS",
                        tabContent: { cash }
                      },
                      {
                        tabButton: {labelName: "DOCUMENT DETAIL"},
                        tabIcon: "DOCUMENT DETAIL",
                        tabContent: { cheque }
                      },
                      {
                        tabButton: {labelName: "UPDATE NOC DETAILS"},
                        tabIcon: "UPDATE NOC DETAILS",
                        tabContent: { demandDraft }
                      }
                ]
              },
              type: "array"
            }
          },
          
        )
      }
  };
  
  export default application;
  