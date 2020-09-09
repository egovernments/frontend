const formConfig = {
  name: "assignComplaint",
  fields: {
    action: {
      id: "action",
      jsonPath: "actionInfo[0].action",
      value: "",
    },
    assignee: { //This assignee mathes with wats sent from handle field change.
      id: "assignee2",//This is not used
      jsonPath: "actionInfo",
      value: "",
    },
  },
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
  redirectionRoute: "",
};

export default formConfig;
