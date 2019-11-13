import {
    getCommonCard,
    getCommonTitle,
    getTextField,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getCheckBoxwithLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { getTodaysDateInYMD } from "../utils";

export const statusOfNocDetails = getCommonCard({
    header: getCommonTitle(
        {
            labelName: "Status of NOC from the follwing departments",
            labelKey: "Status of NOC from the follwing departments"
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
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                placeholder: {
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                required: true,
                jsonPath: "Employee[0].user.name"
            })
        },
        buildingplanscrutinyapplicationdate: {
            ...getDateField({
                label: {
                    labelName: "Building Plan Scrutiny Application Date",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                placeholder: {
                    labelName: "Building Plan Scrutiny Application Number",
                    labelKey: "Building Plan Scrutiny Application Number"
                },
                required: true,
                pattern: getPattern("Date"),
                jsonPath: "Employee[0].user.dob",
                props: {
                    inputProps: {
                        // max: getTodaysDateInYMD()
                    }
                }
            })
        },
        uploadedfile: {
            ...getTextField({
                label: {
                    labelName: "Uploaded File",
                    labelKey: "Uploaded File"
                },
                placeholder: {
                    labelName: "Uploaded File",
                    labelKey: "Uploaded File"
                },
                required: true,
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.fatherOrHusbandName"
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
                pattern: getPattern("Name") || null,
                jsonPath: "Employee[0].user.fatherOrHusbandName"
            })
        }
    })
});