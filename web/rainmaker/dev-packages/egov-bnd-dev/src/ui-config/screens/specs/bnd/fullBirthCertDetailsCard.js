import {
  getCommonContainer,
  getDivider,
  getCommonGrayCard,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDate, checkValueForNA } from "egov-ui-framework/ui-config/screens/specs/utils";
import {genderValues} from "./../../../../ui-utils/constants";

const addSpace = data => {
  return ""+checkValueForNA(data);;
};

const addMoneySuffix = data => {
  data = checkValueForNA(data);
  return data==="NA"? data: data+" /-";
};

const checkNoData = data => {
  data = checkValueForNA(data);
  return data==="NA"? "-": data;
};

const getGenderStr = data => {
  data = checkValueForNA(data);
  data = data!="NA"?genderValues[data]:data;
  return data;
};

export const getBirthCertDetailsCard = (inJsonPath) => {

  return getCommonGrayCard({

    // value2: getCommonValue({
    //   jsonPath: inJsonPath + ".detailsAndMutDate",
    //   callBack: addSpace
    // }),
    certDetailsContainer: getCommonContainer(
      {
        name: getLabelWithValue(
          {
            labelName: "Name",
            labelKey: "Name"
          },
          {
            jsonPath: inJsonPath + ".fullName",
            callBack: checkNoData
          }
        ),
        genderStr: getLabelWithValue(
          {
            labelName: "Gender",
            labelKey: "Gender"
          },
          {
            jsonPath: inJsonPath + ".gender",
            callBack: getGenderStr
          }
        )
      }),
    //divider1: getDivider(),
    certDetailsContainer2: getCommonContainer(
      {
        dob: getLabelWithValue(
          {
            labelName: "Date of Birth",
            labelKey: "Date of Birth"
          },
          {
            jsonPath: inJsonPath + ".dateofbirth",
            callBack: convertEpochToDate
          }
        ),
        placeOfBirth: getLabelWithValue(
          {
            labelName: "Place of Birth",
            labelKey: "Place of Birth"
          },
          {
            jsonPath: inJsonPath + ".placeofbirth",
            callBack: checkNoData
          }
        )
      }),
    //divider2: getDivider(),
    certDetailsContainer3: getCommonContainer(
      {
        nameOfMother: getLabelWithValue(
          {
            labelName: "Name of Mother",
            labelKey: "Name of Mother"
          },
          {
            jsonPath: inJsonPath + ".birthMotherInfo.fullName",
            callBack: checkNoData
          }
        ),
        nameOfFather: getLabelWithValue(
          {
            labelName: "Name of Father",
            labelKey: "Name of Father"
          },
          {
            jsonPath: inJsonPath + ".birthFatherInfo.fullName",
            callBack: checkNoData
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider2: getDivider(),
    certDetailsContainer4: getCommonContainer(
      {
        mothersUid: getLabelWithValue(
          {
            labelName: "Mother's UID No",
            labelKey: "Mother's UID No"
          },
          {
            jsonPath: inJsonPath + "birthMotherInfo.aadharno",
            callBack: checkNoData
          }
        ),
        fathersUid: getLabelWithValue(
          {
            labelName: "Father's UID No",
            labelKey: "Father's UID No"
          },
          {
            jsonPath: inJsonPath + "birthFatherInfo.aadharno",
            callBack: checkNoData
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider4: getDivider(),
    certDetailsContainer6: getCommonContainer(
      {
        presentAddr: getLabelWithValue(
          {
            labelName: "ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD",
            labelKey: "Address of parents at the time of birth of the child"
          },
          {
            jsonPath: inJsonPath + ".birthPresentaddr.fullAddress",
            callBack: checkNoData
          }
        ),
        permenantAddr: getLabelWithValue(
          {
            labelName: "PERMANENT ADDRESS OF THE PARENTS",
            labelKey: "Permanent address of parent"
          },
          {
            jsonPath: inJsonPath + ".birthPermaddr.fullAddress",
            callBack: checkNoData
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider5: getDivider(),
    certDetailsContainer7: getCommonContainer(
      {
        registrationNo: getLabelWithValue(
          {
            labelName: "Registration Number",
            labelKey: "Registration Number"
          },
          {
            jsonPath: inJsonPath + ".registrationno",
            callBack: checkNoData
          }
        ),
        dateOfRegistration: getLabelWithValue(
          {
            labelName: "Date of Registration",
            labelKey: "Date of Registration"
          },
          {
            jsonPath: inJsonPath + ".dateofreport",
            callBack: convertEpochToDate
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    ),
    divider6: getDivider(),
    certDetailsContainer8: getCommonContainer(
      {
        dateOfIssue: getLabelWithValue(
          {
            labelName: "Date of Issue",
            labelKey: "Date of Issue"
          },
          {
            jsonPath: inJsonPath + ".dateofissue",
            callBack: convertEpochToDate
          }
        ),
      },
      {
        style: {
          overflow: "visible"
        }
      }
    )
  });
}