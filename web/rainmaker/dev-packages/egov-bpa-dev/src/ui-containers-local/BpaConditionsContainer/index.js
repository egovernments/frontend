import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {
  LabelContainer
} from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";
import React, { Component } from "react";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  checked: {}
};


// const requiredIcon = (
//   <sup style={{ color: "#E54D42", paddingLeft: "5px" }}>*</sup>
// );

class BpaConditionsContainer extends Component {
  handleFieldChange = (event, value, condition, key) => {
    const { permitConditions, prepareFinalObject, bpaDetails } = this.props;
    bpaDetails.additionalDetails = {
      "fieldinspection_pending": [
        {
          "questions": [
            {
              "remarks": "123",
              "question": "RIVER_EXISTS_ON_SITE",
              "value": "YES"
            },
            {
              "remarks": "123",
              "question": "TREE_EXISTS_ON_SITE",
              "value": "YES"
            },
            {
              "remarks": "123",
              "question": "PLAN_AS_PER_THE_SITE",
              "value": "YES"
            },
            {
              "remarks": "123",
              "question": "ROADWIDTH_AS_PER_THE_PLAN",
              "value": "YES"
            }
          ],
          "docs": [
            {
              "documentType": "FI.FIR.FIR",
              "fileStoreId": "7a972ebe-4816-4942-aa84-e3062f07e265",
              "fileStore": "7a972ebe-4816-4942-aa84-e3062f07e265",
              "fileName": "1.jpeg",
              "fileUrl": "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619727361.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073933Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d72a22eb908f5e6db4c97e53ed9ef3d551c65819f9b6c96b3c094e6a38461745,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619727361_large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073933Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=85aa0b478c516f5a706df178ac7b8d127ddb0a9ed94f6233843af4a4d2c95b23,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619727361_medium.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073933Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=9bdadbff4594feb1e7a953168414548adedac9c631312fa92360a8299ef630fc,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619727361_small.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073933Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=b69645d6a720df087e803d92315ad180f3f7e08ed830a716d6e5b93f3665fa84"
            },
            {
              "documentType": "FI.SINS.SINS",
              "fileStoreId": "1e1e053d-d6d8-4d14-9755-842ba4b30b8a",
              "fileStore": "1e1e053d-d6d8-4d14-9755-842ba4b30b8a",
              "fileName": "1.jpeg",
              "fileUrl": "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619784831.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=eba4bd5d5a3b3eddfcc6875618b142e835b31a3050ba624d0afb59bd937a5c4a,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619784831_large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=539e51e5caad96cfc2b175df9dd84e71aad1562861c2a9563e9598fae8009ae8,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619784831_medium.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c44df7e1efae27e57c49dbbca44a2957591fb588a64988ded413dac5093a6db8,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619784831_small.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073939Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=4bdefdbac542fca330b2f879ae5e9028b02642916d5183718887c959eed5b34a"
            },
            {
              "documentType": "FI.SISS.SISS",
              "fileStoreId": "bf3b75ed-6566-4753-a8d8-db1c2cc8dd72",
              "fileStore": "bf3b75ed-6566-4753-a8d8-db1c2cc8dd72",
              "fileName": "1.jpeg",
              "fileUrl": "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619836771.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=737b2a96a159e8ff60a995c953cb86fcbd69bc26a89cd6a9301950a7832bacdb,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619836771_large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=f88fc7630a1672dfa853f709949df7b49cbd0f3a671e9729ceb8c0a1b92ad12e,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619836771_medium.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fa309442fd0d109e235e8c2d39b4959f69263400148666e0e616d4646318a90c,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619836771_small.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073944Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=978bbbb3a04e2e00ae2f6304d521b1fba667f2d071fa86cf9a7ffbea8964616f"
            },
            {
              "documentType": "FI.SIES.SIES",
              "fileStoreId": "57181189-50aa-4edd-8d99-0fe2b8bc5c22",
              "fileStore": "57181189-50aa-4edd-8d99-0fe2b8bc5c22",
              "fileName": "1.jpeg",
              "fileUrl": "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619928081.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073953Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=0345cb8cb6e48497ea5857434fe571b392f7be81d724f74922403d44940af9a8,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619928081_large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073953Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=150e3b07694775a44ec29389e40cff1f97e73293c73a771281416776bf472d8f,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619928081_medium.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073953Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=25d22d02bf5f31c65b10d7363f8ce01bf45cdd77173314fb4fcf90c99558e436,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619928081_small.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T073953Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=945fc77b335a6b43be61626a9fae0a408b2f399535fab76f67af05c190c5b23e"
            },
            {
              "documentType": "FI.SIWS.SIWS",
              "fileStoreId": "366a4a7f-8c09-4e40-928d-d09f6d96d2aa",
              "fileStore": "366a4a7f-8c09-4e40-928d-d09f6d96d2aa",
              "fileName": "1.jpeg",
              "fileUrl": "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619997781.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T074000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=0eb93ebcf9aa1237822cc9b79686f5cc4f85bf1d2b83ac98c8759d28f1920127,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619997781_large.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T074000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d96b3833a57b1c1898437e7317d6e0a2bb18d7b74fcc27bd77567b91c72a0caa,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619997781_medium.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T074000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=991964453eea5aa31d0cfe1182a230a01176f60667b60e563d2d8416a9bf89e5,https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb/undefined/February/29/15829619997781_small.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200229T074000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIA42DEGMQ2NZVNTLNI%2F20200229%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=83405bcb9e4a2d1f96187f956d1c4e10cd00531ad04cbd48595b2da5eb5e5ce6"
            }
          ]
        }
      ]
    }
    let permitConditionsList = [], finalPermitList = [], appDocumentList;
    permitConditions.forEach(condtn => {
      if(condition === condtn.condition){
        condtn.conditionValue = !value;
      }
      permitConditionsList.push(condtn);
    })
    
    permitConditionsList.forEach(conditions => {
      if(conditions.conditionValue === true) {
        finalPermitList.push(conditions.condition);
      }
    })
    appDocumentList = {
      ...bpaDetails.additionalDetails,
      ["pendingapproval"]: finalPermitList
    }
    prepareFinalObject("permitTemp", finalPermitList);
    prepareFinalObject("BPA.additionalDetails",  appDocumentList);
  };


  render() {
    const { classes, permitConditions } = this.props;
    let index = 0;
    return (
      <div>
        {permitConditions && permitConditions.length > 0 &&
          permitConditions.map(conditions => {
            return (
                <Grid container={true}>
                    <Grid item={true} xs={2} sm={1} md={1}>
                        <div >
                            <span>{index + 1}</span>
                        </div>
                    </Grid>
                    <Grid  item={true} xs={10} sm={5} md={10}>
                        <LabelContainer
                        labelKey={conditions.condition}
                          // labelKey={getTransformedLocale(conditions.condition)}
                        />
                    </Grid>
                    <Grid>
                    <Checkbox
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}          
                      onChange={event => this.handleFieldChange(event, conditions.conditionValue, conditions.condition, index++)}
                      value={index++}        
                    />
                    </Grid>
              </Grid>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { moduleName } = screenConfiguration;
  const permitConditions = get(
    screenConfiguration.preparedFinalObject,
    "permitConditions",
    {}
  );
  const bpaDetails = get(
    screenConfiguration.preparedFinalObject,
    "BPA",
    {}
  )
  return { permitConditions, moduleName, bpaDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BpaConditionsContainer)
);