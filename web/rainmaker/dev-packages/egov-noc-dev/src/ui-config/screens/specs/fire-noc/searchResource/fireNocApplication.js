import { getCommonCard, getCommonContainer, getCommonParagraph, getCommonTitle, getDateField, getLabel, getPattern, getSelectField, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchApiCall } from "./functions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";


const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.NOCNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.ownerMobNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.applicationNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.newProvisionalType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.areaType",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.newProvisionalType",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.citySearch",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.district",
      "props.value",
      ""
    )
  );
  

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.subDistrict",
      "props.value",
      ""
    )
  );

  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.toDate",
      "props.value",
      ""
    )
  );

};

export const NOCApplication = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search NOC Application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_DESC"
  }),
  appNOCAndMobNumContainer: getCommonContainer({
    applicationNo: getTextField({
      label: {
        labelName: "Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.applicationNumber"
    }),
    NOCNo: getTextField({
      label: {
        labelName: "NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "searchScreen.fireNOCNumber"
    }),
    ownerMobNo: getTextField({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: getPattern("MobileNo"),
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
    })
  }),
  appStatusAndToFromDateContainer: getCommonContainer({
    applicationNo: getSelectField({
      label: {
        labelName: "Application status",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Application Status",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },

      localePrefix: {
        moduleName: "WF",
        masterName: "FIRENOC"
      },
      jsonPath: "searchScreen.status",
      sourceJsonPath: "searchScreenMdmsData.searchScreen.status",
      required: false,
      gridDefination: {
        xs: 12,
        sm: 4
      }

    }),    

    fromDate: getDateField({
      label: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: getPattern("Date"),
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false
    }),


    newProvisionalType: getSelectField({
      label: {
        labelName: "NOC Type",
        labelKey: "NOC_TYPE_LABEL"
        },
        placeholder: {
        labelName: "Select Application Type",
        labelKey: "NOC_APPLICATION_TYPE_PLACEHOLDER"
        },

      data: [
        {
          code: "NEW",
          label: "NOC_TYPE_NEW_RADIOBUTTON"
        },
        {
          code: "PROVISIONAL",
          label: "NOC_TYPE_PROVISIONAL_RADIOBUTTON"
        },
        {
          code: "RENEWAL",
          label: "RENEWAL"
        }
      ],
      // jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      jsonPath: "searchScreen.fireNOCType",
      // sourceJsonPath: "applyScreenMdmsData.searchScreen.fireNOCType",
      gridDefination: {
        xs: 12,
        sm: 4
      }

    }),

    
    areaType: {
      ...getSelectField({
      label: {
        labelName: "NOC Area_Type",
        labelKey: "NOC_AREA_TYPE_LABEL"
        },
        placeholder: {
        labelName: "Select Application Area Type",
        labelKey: "NOC_APPLICATION_AREA_TYPE"
        }, 

      data: [
        {
          code: "Urban",
          label: "NOC_TYPE_URBAN"
        },
        {
          code: "Rural",
          label: "NOC_TYPE_RURAL"
        }
      ],
      // jsonPath: "FireNOCs[0].fireNOCDetails.fireNOCType",
      jsonPath: "searchScreen.areaType",
      // sourceJsonPath: "applyScreenMdmsData.searchScreen.fireNOCType",
      gridDefination: {
        xs: 12,
        sm: 4
      }

    }),

    beforeFieldChange: async (action, state, dispatch) => {
      dispatch(
        prepareFinalObject(
          "searchScreen.areaType",
          action.value
        )
      );
      if(action.value=='Rural'){

        const districtList= get(
          state.screenConfiguration,
          "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
          []              );

        const districtTenantMap =districtList.map((item)=>{
          return {
            name:item.city.districtName,
            //code:item.code
            code:item.city.districtTenantCode
          }

        });

        const fireStationsList = get(
          state,
          "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
          []
        );



        const districtlist=[];

     /* 
     for(var i=0;i< fireStationsList.length;i++)
        {
          for(var j=0;j<districtTenantMap.length;j++)
          {
            if(districtTenantMap[j].code==fireStationsList[i].baseTenantId)
            {
              
              districtlist.push({
                code:districtTenantMap[j].code                  
              })
            }
          }
        }  
        
        */
        
        for (let i=0;i<districtTenantMap.length;i++)
        {
          districtlist.push({

            code:districtTenantMap[i].code,
            //name:districtTenantMap[i].name

          })

        } 

   

        const unqDistrictList=districtlist.filter( 
          (ele, ind) => ind === districtlist.findIndex( elem => elem.code === ele.code)
        );


    
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.district",         
            "props.data",
            unqDistrictList
          )
        );
   
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.district",         
            "visible",
            true
          )
        );
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.subDistrict",         
            "visible",
            true
          )
        );
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.citySearch",         
            "visible",
            false
          )
        );
      }
      else
      {

              
        const districtList= get(
          state.screenConfiguration,
          "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
          []              );

        const districtTenantMap =districtList.map((item)=>{
          return {
            name:item.city.districtName,
            //code:item.code
            code:item.city.districtTenantCode
          }

        });

        //console.log("districtTenantMap",districtTenantMap); 

        const fireStationsList = get(
          state,
          "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
          []
        );

        //console.log("fireStationsList",fireStationsList);


        const districtlist=[];

    /*      for(var i=0;i< fireStationsList.length;i++)
        {
          for(var j=0;j<districtTenantMap.length;j++)
          {
            if(districtTenantMap[j].code==fireStationsList[i].baseTenantId)
            {
              
              districtlist.push({
                code:districtTenantMap[j].code                  
              })
            }
          }
        }    */

       for (let i=0;i<districtTenantMap.length;i++)
        {
          districtlist.push({

            code:districtTenantMap[i].code,
            //name:districtTenantMap[i].name

          })

        }       

        //console.log("districtlist",districtlist); 

        const unqDistrictList=districtlist.filter( 
          (ele, ind) => ind === districtlist.findIndex( elem => elem.code === ele.code)
        );

        console.log("unique districtlist",unqDistrictList); 

       /*  dispatch(
          prepareFinalObject(
            "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code",
            null
          )
        );
        dispatch(
          prepareFinalObject(
            "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
            null
          )
        ); */
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.district",         
            "props.data",
            unqDistrictList
          )
        );

        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.district",         
            "visible",
            true
          )
        );
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.subDistrict",         
            "visible",
            false
          )
        );
        dispatch(
          handleField(
            "search",
            "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.citySearch",         
            "visible",
            true
          )
        );
      }
    }
   },

  //   district: {
  //     ...getSelectField({
  //     label: {
  //       labelName: "District",
  //       labelKey: "NOC_PROPERTY_DISTRICT_LABEL"
  //     },
  //     localePrefix: {
  //       moduleName: "TENANT",
  //       masterName: "TENANTS"
  //     },
  //     placeholder: {
  //       labelName: "Select District",
  //       labelKey: "NOC_PROPERTY_DISTRICT_PLACEHOLDER"
  //     },
  //     sourceJsonPath: "applyScreenMdmsData.tenant.District",
  //     jsonPath: "searchScreen.city",

  //     gridDefination: {
  //       xs: 12,
  //       sm: 4
  //     },
  //     visible:false,

  //   }),
  //   beforeFieldChange: async (action, state, dispatch) => {
  //     dispatch(
  //       prepareFinalObject(
  //         "searchScreen.city",
  //         action.value
  //       )
  //     );       

  //     if(action.value){
        

     
  //       let fireStationsList = get(
  //         state,
  //         "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
  //         []
  //       );
        
  //       console.log("fireStationsList", fireStationsList);

  //       const districtData= get(
  //         state.screenConfiguration,
  //         "preparedFinalObject.applyScreenMdmsData.tenant.tenants",
  //         []
  //       );

  //       console.log("districtData", districtData);


  //       let districtlist = districtData.filter((districtlists)=>{
         
  //           return districtlists.city.districtTenantCode===action.value
          
  //       });

  //      console.log("tenanats list",districtlist );

  //        let tenantids = districtlist.map((districtlists)=>{             
  //         return districtlists.code          
  //        });

  //        let urbanids = districtlist.map((districtlists)=>{             
  //         return districtlists.code          
  //        });

  //       console.log("tenant ids", urbanids); 
        
   
       
  //      let urbanlist = []

  //       for (let i=0;i<urbanids.length;i++)
  //         {
  //               urbanlist.push({
                
  //                 code:urbanids[i],

  //                     })
  //           }

  //       console.log("urbanlist",urbanlist);



  //       const subDistrictLists=[]; 

  //       const firestationtenantidlist=[];

  //       const fireStations = [];
 
  //      for(var i=0;i<tenantids.length;i++)
  //       {
  //        const fireStations = fireStationsList.filter(firestation => {       
                           
  //         return tenantids.includes(firestation.baseTenantId);   

  //           // return tenantids[i].indexOf(firestation.baseTenantId) !== -1 

  //           // return firestation.baseTenantId === tenantids[i]; 

  //           //return 'code' in districtlist[i];

  //         }); 

  //         if(fireStations[i]){

  //           // firestationtenantidlist.push({code:fireStations[0].baseTenantId}); 

  //           for(var j=0;j<fireStations[i].subDistrict.length;j++){
  //           //subDistrictLists.push({code:fireStations[0].subDistrict[j]});  
  //               subDistrictLists.push(fireStations[i].subDistrict[j]);  
  //             }
  //           }

  //       }  

  //       //console.log('filtered fireStations', fireStations);     
      
  //       let value = get(
  //         state.screenConfiguration.preparedFinalObject,
  //         "searchScreen.areaType",[]);

  //     if( value === 'Urban')
  //     {

  //       const ulblist=[]; 

  //       const firestationtenantidlist=[];

  //       const fireStations = [];
 
  //      for(var i=0;i<tenantids.length;i++)
  //       {
  //        const fireStations = fireStationsList.filter(firestation => {       
                           
  //         return tenantids.includes(firestation.baseTenantId);   

  //           // return tenantids[i].indexOf(firestation.baseTenantId) !== -1 

  //           // return firestation.baseTenantId === tenantids[i]; 

  //           //return 'code' in districtlist[i];

  //         }); 

  //         if(fireStations[i]){

  //           // firestationtenantidlist.push({code:fireStations[0].baseTenantId}); 

  //           for(var j=0;j<fireStations[i].ulb.length;j++){

  //           //subDistrictLists.push({code:fireStations[0].subDistrict[j]});  

  //                ulblist.push(fireStations[i].ulb[j]);  
  //             }
  //           }

  //       }  
         
         
      
  //       dispatch(
  //         handleField(
  //           "search",
  //           "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.citySearch",
  //          "props.data",
  //          ulblist
  //         )
  //       );

  //     }   else {
        

  //      console.log("subdistrict list",subDistrictLists );        
        
      

  //       dispatch(
  //         handleField(
  //           "search",
  //           "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.subDistrict",         
  //           "props.data",
  //           subDistrictLists
  //         )
  //       );
  //     } 
        
  //     }
  //   }
  // },

  //   subDistrict: {
  //     ...getSelectField({
  //     label: {
  //       labelName: "SubDistrict",
  //       labelKey: "NOC_PROPERTY_SUBDISTRICT_LABEL"
  //     },
  //    /*   localePrefix: {
  //       moduleName: "TENANT",
  //       masterName: "TENANTS"
  //     }, */
  //     placeholder: {
  //       labelName: "Select SubDistrict",
  //       labelKey: "NOC_PROPERTY_SUBDISTRICT_PLACEHOLDER"
  //     },
  //     sourceJsonPath: "applyScreenMdmsData.tenant.SubDistrict",
  //     jsonPath: "searchScreen.subDistrict",

  //     gridDefination: {
  //       xs: 12,
  //       sm: 4
  //     },
  //     visible:false,
  //   }),

  //   afterFieldChange: (action, state, dispatch) => {

  //     let fireStationsList = get(
  //       state,
  //       "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.FireStations",
  //       []
  //     );
      
  //     let fireStations = fireStationsList.filter(firestation => {
  //       return firestation.subDistrict 
  //     });

  //     let props_value ;
       
  //     for(var i=0;i<fireStations.length;i++)
  //     {
  //       for(var j=0;j<fireStations[i].subDistrict.length;j++)
  //       {
  //         if(fireStations[i].subDistrict[j].code==action.value)
  //       {
  //         props_value = fireStations[i].baseTenantId;
  //       }
  //      }
  //     }

  //    console.log("props value", props_value);            
      
  //     set(
  //       state,
  //       "screenConfiguration.preparedFinalObject.searchScreen.subDistrict",
  //       props_value
  //     );
  //   }

  // },


    // citySearch: getSelectField({
    //   label: {
    //     labelName: "City",
    //     labelKey: "NOC_PROPERTY_CITY_LABEL"
    //   },
    //   localePrefix: {
    //     moduleName: "TENANT",
    //     masterName: "TENANTS"
    //   },
    //   placeholder: {
    //     labelName: "Select City",
    //     labelKey: "NOC_PROPERTY_CITY_PLACEHOLDER"
    //   },
    //   sourceJsonPath: "applyScreenMdmsData.searchScreen.tenantData",
    //   jsonPath: "searchScreen.subDistrict",

    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   }
    // }),
    



  }),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
        // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            borderColor: "#FE7A51",
            width: "220px",
            height: "48px",
            margin: "8px",
            float: "right"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "NOC_HOME_SEARCH_RESET_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: resetFields
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 6
        // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            margin: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "220px",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      }
    })
  })
});