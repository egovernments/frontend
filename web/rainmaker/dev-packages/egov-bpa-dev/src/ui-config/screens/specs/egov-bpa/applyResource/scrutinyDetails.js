import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCheckBoxwithLabel,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { getTodaysDateInYMD } from "../utils";

export const buildingPlanScrutinyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Building Plan Scrutiny Application Details",
      labelKey: "Building Plan Scrutiny Application Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  buildingPlanScrutinyDetailsContainer: getCommonContainer({
    buildingplanscrutinyapplicationnumber: {
      ...getTextField({
        label: {
          labelName: "Building permit application Number",
          labelKey: "Building permit application Number"
        },
        placeholder: {
          labelName: "Building permit application Number",
          labelKey: "Building permit application Number"
        },
        required: true,
        jsonPath: "BPAs[0].BPADetails.planscrutinydetails.appnum"
      })
    },
    uploadedfile: {
      ...getTextField({
        label: {
          labelName: "Uploaded Diagram",
          labelKey: "Uploaded Diagram"
        },
        placeholder: {
          labelName: "Uploaded Diagram",
          labelKey: "Uploaded Diagram"
        },
        required: true,
        // pattern: getPattern("Name") || null,
        jsonPath: "BPAs[0].BPADetails.planscrutinydetails.diagram"
      })
    },
    scrutinyreport: {
      ...getTextField({
        label: {
          labelName: "Scrutiny Report",
          labelKey: "Scrutiny Report"
        },
        placeholder: {
          labelName: "Scrutiny Report",
          labelKey: "Scrutiny Report"
        },
        required: true,
        // pattern: getPattern("Name") || null,
        jsonPath: "BPAs[0].BPADetails.planscrutinydetails.report"
      })
    }
  })
});

export const blockWiseOccupancyAndUsageDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Block wise occupancy /sub occupancy and usage details",
      labelKey: "Block wise occupancy /sub occupancy and usage details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  blockWiseOccupancyAndUsageDetailscontainer: getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Block 1",
        labelKey: "Block 1"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    blockWiseContainer: getCommonContainer({
      buildingplanscrutinyapplicationnumber: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "AutosuggestContainer",
        jsonPath: "Employee[0].user.roles",
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: { labelName: "Residential", labelKey: "Residential" },
          placeholder: {
            labelName: "Select Occupancy",
            labelKey: "Occupancy"
          },
          jsonPath: "BPAs[0].BPADetails.blockwiseusagedetails.appnum",
          // sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
          labelsFromLocalisation: false,
          suggestions: [],
          fullwidth: true,
          required: true,
          inputLabelProps: {
            shrink: true
          },
          isMulti: true,
          labelName: "name",
          valueName: "code",
          data: [
            {
              code: "Ground Floor",
              name: "Ground Floor"
            },
            {
              code: "First Floor",
              name: "First User"
            },
            {
              code: "Second Floor",
              name: "Second Floor"
            }
          ]
        },
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }
    })
  })
});

export const demolitiondetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Demolition Details",
      labelKey: "Demolition Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  demolitionDetailsContainer: getCommonContainer({
    demolitionArea: {
      ...getTextField({
        label: {
          labelName: "Demolition Area",
          labelKey: "Demolition Area"
        },
        placeholder: {
          labelName: "Enter Demolition Area",
          labelKey: "Enter Demolition Area"
        },
        // pattern: getPattern("Name") || null,
        jsonPath: "BPAs[0].BPADetails.demolitiondetails.area"
      })
    }
  })
});

export const proposedBuildingDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Proposed Building Details",
      labelKey: "Proposed Building Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  proposedContainer: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    visible: true,
    children: {
      breakPending: getBreak(),
      proposedBuildingDetailsContainer: {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-noc",
        componentPath: "Table",
        props: {
          data: [
            {
              "Floor Description": "Ground Floor",
              Level: 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            },
            {
              "Floor Description": "First Floor",
              Level: 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            },
            {
              "Floor Description": "Second Floor",
              Level: 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            },
            {
              "Floor Description": "Third Floor",
              Level: 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            }
          ],
          columns: {
            "Floor Description": {},
            Level: {},
            "Occupancy/Sub Occupancy": {},
            "Buildup Area": {},
            "Floor Area": {},
            "Carpet Area": {}
          },
          title: "Builtup and Carpet Area Details",
          options: {
            filterType: "dropdown",
            responsive: "stacked",
            selectableRows: false,
            pagination: false,
            selectableRowsHeader: false,
            sortFilterList: false,
            sort: false,
            filter: false,
            search: false,
            print: false,
            download: false,
            viewColumns: false
          }
        }
      },
      breakP: getBreak(),
      breakq: getBreak(),
      totalBuildUpAreaDetailsContainer: getCommonContainer({
        totalBuildupArea: {
          ...getTextField({
            label: {
              labelName: "Total Buildup Area (sq.mtrs)",
              labelKey: "Total Buildup Area (sq.mtrs)"
            },
            placeholder: {
              labelName: "Total Buildup Area (sq.mtrs)",
              labelKey: "Total Buildup Area (sq.mtrs)"
            },
            required: true,
            jsonPath:
              "BPAs[0].BPADetails.totalbuildupareadetails.totalbuilduparea"
          })
        },
        numOfFloors: {
          ...getTextField({
            label: {
              labelName: "Number Of Floors",
              labelKey: "Number Of Floors"
            },
            placeholder: {
              labelName: "Number Of Floors",
              labelKey: "Number Of Floors"
            },
            required: true,
            // pattern: getPattern("Date"),
            jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.numoffloors"
          })
        },
        highFromGroundLevel: {
          ...getTextField({
            label: {
              labelName: "High From Ground Level From Mumty (In Mtrs)",
              labelKey: "High From Ground Level From Mumty (In Mtrs)"
            },
            placeholder: {
              labelName: "High From Ground Level From Mumty (In Mtrs)",
              labelKey: "High From Ground Level From Mumty (In Mtrs)"
            },
            required: true,
            // pattern: getPattern("Name") || null,
            jsonPath:
              "BPAs[0].BPADetails.totalbuildupareadetails.highfromgroundlevel"
          })
        }
      })
    }
  }
});

export const proposedBuildingDetails1 = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "Proposed Building Details",
          labelKey: "Proposed Building Details"
        })
      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: getCommonGrayCard({
        header: {
          gridDefination: {
            xs: 8
          },
          ...getCommonSubHeader({
            labelName: "Buildup and Carpet Area Details",
            labelKey: "Buildup and Carpet Area Details"
          }),
          props: {
            style: {
              marginBottom: "10px",
              // fontWeight : "bold",
              fontSize: "20px",
              color: "black"
            }
          }
        },
        buildupAndCarpetContainer: getCommonContainer({
          floordescription: getLabelWithValue(
            {
              labelName: "Floor description",
              labelKey: "Floor description"
            },
            {
              jsonPath:
                "BPAs[0].BPADetails.proposedBuildingDetails.floordesription",
              callBack: value => {
                return 1; //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
              }
            }
          ),
          level: getLabelWithValue(
            {
              labelName: "Level",
              labelKey: "Level"
            },
            {
              jsonPath: "BPAs[0].BPADetails.proposedBuildingDetails.level",
              callBack: value => {
                return value; //`COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
              }
            }
          ),
          occupancy: getLabelWithValue(
            {
              labelName: "Occupancy",
              labelKey: "Occupancy"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.occupancy"
            }
          ),
          builduparea: getLabelWithValue(
            {
              labelName: "Build Area",
              labelKey: "Build Area"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.buildarea"
            }
          ),
          floorarea: getLabelWithValue(
            {
              labelName: "Floor Area",
              labelKey: "Floor Area"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.fllorarea"
            }
          ),
          carpetarea: getLabelWithValue(
            {
              labelName: "Carpet Area",
              labelKey: "Carpet Area"
            },
            {
              jsonPath: "BPAs[0].BPADetails.basicdetails.carpetarea"
            }
          )
        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
      prefixSourceJsonPath:
        "children.cardContent.children.basicDetailsContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  totalBuildUpAreaDetailsContainer: getCommonContainer({
    totalBuildupArea: {
      ...getTextField({
        label: {
          labelName: "Total Buildup Area (sq.mtrs)",
          labelKey: "Total Buildup Area (sq.mtrs)"
        },
        placeholder: {
          labelName: "Total Buildup Area (sq.mtrs)",
          labelKey: "Total Buildup Area (sq.mtrs)"
        },
        required: true,
        jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.totalbuilduparea"
      })
    },
    numOfFloors: {
      ...getTextField({
        label: {
          labelName: "Number Of Floors",
          labelKey: "Number Of Floors"
        },
        placeholder: {
          labelName: "Number Of Floors",
          labelKey: "Number Of Floors"
        },
        required: true,
        // pattern: getPattern("Date"),
        jsonPath: "BPAs[0].BPADetails.totalbuildupareadetails.numoffloors"
      })
    },
    highFromGroundLevel: {
      ...getTextField({
        label: {
          labelName: "High From Ground Level From Mumty (In Mtrs)",
          labelKey: "High From Ground Level From Mumty (In Mtrs)"
        },
        placeholder: {
          labelName: "High From Ground Level From Mumty (In Mtrs)",
          labelKey: "High From Ground Level From Mumty (In Mtrs)"
        },
        required: true,
        // pattern: getPattern("Name") || null,
        jsonPath:
          "BPAs[0].BPADetails.totalbuildupareadetails.highfromgroundlevel"
      })
    }
  })
});
