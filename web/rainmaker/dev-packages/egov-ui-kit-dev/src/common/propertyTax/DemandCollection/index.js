import React from "react";
import { Card } from "components";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { prepareFormData, loadMDMSData } from "egov-ui-kit/redux/common/actions";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import commonConfig from "config/common.js";
import { TextField } from "components";
import Field from "egov-ui-kit/utils/field";
import { getTenantId ,getFinalData} from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import Label from "egov-ui-kit/utils/translationNode";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
class DemandCollection extends React.Component {
  render() {
    const { prepareFinalObject, preparedFinalObject,Properties = [] } = this.props;
    const finalData=getFinalData();
     
    let demands_data = get(preparedFinalObject, `DemandProperties[0].propertyDetails[0].demand`);
    
    let dummyarray = [];

    //changing index of yearly data

    for(let i=0; demands_data && i< demands_data.length;i++)
        {
              for(let j=0; finalData && j<finalData.length;j++)
              {
                  if(demands_data[i] && demands_data[i].demand[finalData[j].financialYear]!== undefined)
                  {
                    dummyarray[j] = demands_data[i];
                  }
              }
        }


    //making null of no demand years data

        let newarray = [];

        for(let i=0; finalData && i<finalData.length;i++)
        {
          let YearExist = get(dummyarray, `[${i}].demand[${finalData[i].financialYear}]`);
          if(YearExist)
          {
            set(newarray, `[${i}]`, dummyarray[i]);
          }  
          else
          {
            set(newarray, `[${i}]`, undefined);        
          }
        }   

        set(preparedFinalObject, `DemandProperties[0].propertyDetails[0].demand`, newarray);

    const getYear =
      finalData && finalData.length ? (
        finalData.map((data, index) => {
          return (
            <div>
              <div key={index}>{index == 0 ? data.financialYear : <Label
              label={"PT_DEMAND_ARREARS"}
              /> }</div>
              <Card
                key={index}
                style={{ backgroundColor: "white" }}
                textChildren={
                  <div className="pt-owner-info">
                    <div className={` col-sm-12`} key={index}>
                      <div className={`col-sm-6`}  style={{ zIndex:1000  }} >
                        <div className={`col-sm-12`} style={{ textAlign: "center" }}>
                        <Label
                          labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                          label={"PT_DEMAND" ? "PT_DEMAND" : "NA"}
                          fontSize="16px"
                        />
                        </div>
                        {data.taxHead.map((taxData, index1) => {                        
                           return (
                            <div className={`col-xs-12`}>
                              <TextField
                                floatingLabelText={<Label label={taxData.code}/>}
                                hintText={<Label label="PT_ENTER_AN_AMOUNT" />}
                                min={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_DEMAND`)}
                                max={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_DEMAND`)}
                                // min={taxData.isDebit?-99999:0}
                                // max={taxData.isDebit?-1:0}
                                type="textfield"
                                value={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_DEMAND`)}
                           
                            
                                onChange={(e) => {  
                                 
                                   let value = "";
                               
                                   var NumbersOnly = /^\d{0,8}(\.(\d{1,2})?)?$/i
                                   
                                 // value = e.target.value;
                                 let input = e.target.value ;
                                 var isValidinput = !!input.match(NumbersOnly)
                                  if(isValidinput || !input)
                                  {
                                   
                                    this.setState({value:input})
                                 
                                  
                                  } 
                                  else if(taxData.code ==='PT_TIME_REBATE'){
                                    input[0].includes("-")
                                    this.setState({value:input})
                                  }
                                  else
                                  {
                                    this.props.toggleSnackbarAndSetText(
                                      true,
                                      {
                                        labelName: "Integer numbers are only allowed and enter upto two decimal places.",
                                        labelKey: "ERR_DCB_VALIDATIONS_FAILED"
                                      },
                                      "error"
                                    );
                                   // alert( "Integer numbers are only allowed and enter upto two decimal places.");  
                                    return value = "" ; 
                                  }
                                 
                            
                                  // if (e.target.value.includes(".")) 
                                  // {  
                                  //  alert( "Integer numbers are only allowed.");
                                  //  return value = "" ;
                                  // }

                                  if(taxData.code === 'SWATCHATHA_TAX' ||taxData.code === 'PT_TIME_INTEREST')
                                  {
                                      if (Math.sign(e.target.value)===-1) 
                                      {  
                                        this.props.toggleSnackbarAndSetText(
                                          true,
                                          {
                                            labelName: "Negative numbers are not allowed..",
                                            labelKey: "ERR_DCB_NEGATIVE_FAILED"
                                          },
                                          "error"
                                        );
                                      //alert( "Negative numbers are not allowed.");
                                      return value = "" ;
                                      }
                                  }
                                  if(taxData.code === 'PT_HOUSE_TAX' || taxData.code === 'PT_WATER_TAX' ||taxData.code === 'PT_CONSERVANCY_TAX'
                                  || taxData.code === 'PT_LIGHTINING_TAX' || taxData.code === 'PT_EDUCATION_TAX' || taxData.code === 'PT_CONSOLIDATED_PROPERTY_TAX'
                                  || taxData.code === "PT_LIGHTING_TAX"|| taxData.code === "PT_DRAINAGE_TAX"|| taxData.code ==="PT_ADDL_WATER_TAX" 
                                  || taxData.code === "PT_SANITARY_CESS"|| taxData.code === "PT_EDUCATION_CESS" || taxData.code === "PT_SCAVENGING_TAX" ||
                                  taxData.code === "PT_LIBRARY_CESS" || taxData.code === "PT_CONSERVE_TAX" || 
                                  taxData.code === "PT_SPECIAL_CONSERVANCY_TAX")
                                  {
                                      if (Math.sign(e.target.value)===-1) 
                                      {  
                                        this.props.toggleSnackbarAndSetText(
                                          true,
                                          {
                                            labelName: "Please enter valid value for House Taxax/Water Tax/Conservancy Tax/Lightining Tax/Education Tax",
                                            labelKey: "ERR_DCB_TAX_HEAD_FAILED"
                                          },
                                          "error"
                                        ); 
                                     // alert( "Please enter valid value for House Taxax/Water Tax/Conservancy Tax/Lightining Tax/Education Tax");
                                      return value = "" ;
                                      }
                                  }
                                  value = e.target.value;                                
                                  prepareFinalObject(`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_TAXHEAD`,taxData.code)
                                  prepareFinalObject(`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_DEMAND`, taxData.isDebit?(Math.sign(value)===-1?value:-value):value)
                                                            	
                                   }

                                  }

                                onWheel={event => { event.preventDefault(); }}
                                disabled={taxData.code==='PT_TIME_REBATE' || taxData.code==='PT_ADVANCE_CARRYFORWARD' || (index == 0  ? taxData.code==='PT_TIME_INTEREST' : false ) ||  taxData.code === 'PT_TIME_PENALTY' ||(index == 0 ? taxData.code==='PT_DEMANDNOTICE_CHARGE' : false) ? true : false  }
                                
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className={`col-sm-6`}>
                        <div className={`col-sm-12`} style={{ textAlign: "center" }}>
                        <Label
                          labelStyle={{ letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" }}
                          label={"PT_COLLECTED" ? "PT_COLLECTED" : "NA"}
                          fontSize="16px"
                        />
                        </div>
                        {data.taxHead.map((taxData, index1) => {
                          return (
                            <div className={`col-xs-12`} key={index1}>
                              <TextField
                                key={index1}
                                type="textfield"

                                min={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_COLLECTED`)}
                                max={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_COLLECTED`)}
                                value={get(preparedFinalObject,`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_COLLECTED`)}

                                floatingLabelText={<Label label={taxData.code}/>}
                                hintText={<Label label="PT_ENTER_AN_AMOUNT"/>}

                                onChange={(e) => {

                                  let value = "";
                                  var NumbersOnly = /^\d{0,8}(\.(\d{1,2})?)?$/i
                                  let input = e.target.value ;
                                  var isValidinput = !!input.match(NumbersOnly)
                                   if(isValidinput || !input)
                                   {
                                     this.setState({value:input})
                                   } 
                                   else if(taxData.code ==='PT_TIME_REBATE'){
                                     input[0].includes("-")
                                     this.setState({value:input})
                                   }
                                   else
                                   {
                                    this.props.toggleSnackbarAndSetText(
                                      true,
                                      {
                                        labelName: "Integer numbers are only allowed and enter upto two decimal places.",
                                        labelKey: "ERR_DCB_VALIDATIONS_FAILED"
                                      },
                                      "error"
                                    );
                                    // alert( "Integer numbers are only allowed and enter upto two decimal places.");  
                                     return value = "" ; 
                                   }

                                  prepareFinalObject(`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_TAXHEAD`,taxData.code);
                                  prepareFinalObject(`DemandProperties[0].propertyDetails[0].demand[${index}].demand[${data.financialYear}][${parseInt(taxData.order)}].PT_COLLECTED`, e.target.value);

                                }}
                                onWheel={event => { event.preventDefault(); }}
                               // disabled={taxData.isDebit}
                                disabled={taxData.code==='PT_TIME_REBATE' || taxData.code==='PT_ADVANCE_CARRYFORWARD' || (index == 0  ? taxData.code==='PT_TIME_INTEREST' : false ) ||(index == 0 ? taxData.code==='PT_DEMANDNOTICE_CHARGE' : false) ? true : false  }
                                
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                }
              />
              <br />
            </div>
          );
        })
      ) : (
        <div>error </div>
      );
    const textdata = () => {};

    return <div>{getYear}</div>;
  }
}
const mapStateToProps = (state) => {
  const { common, form, screenConfiguration } = state;
  const { generalMDMSDataById, loadMdmsData } = common;
  let { preparedFinalObject = {} } = screenConfiguration;
  preparedFinalObject={...preparedFinalObject};
  const { Properties } = preparedFinalObject || {};
  const FinancialYear = generalMDMSDataById && generalMDMSDataById.FinancialYear;
  const getYearList = FinancialYear && Object.keys(FinancialYear);

  return { getYearList, form, Properties,preparedFinalObject };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
    removeForm: (formkey) => dispatch(removeForm(formkey)),
    toggleSpinner: () => dispatch(toggleSpinner()),
    prepareFormData: (path, value) => dispatch(prepareFormData(path, value)),
    loadMDMSData: (requestBody, moduleName, masterName) => dispatch(loadMDMSData(requestBody, moduleName, masterName)),
    reset_property_reset: () => dispatch(reset_property_reset()),
    prepareFinalObject: (jsonPath, value) => dispatch(prepareFinalObject(jsonPath, value)),
    toggleSnackbarAndSetText: (open, message, error) =>
    dispatch(toggleSnackbarAndSetText(open, message, error)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandCollection);
