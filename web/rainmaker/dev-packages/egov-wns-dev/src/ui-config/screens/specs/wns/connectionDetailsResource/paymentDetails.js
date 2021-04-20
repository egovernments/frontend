import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {getPaymentHistory} from "../../utils";
  import React from 'react';
  
    

  export const PaymentDetails = () =>  {
    //const tenantId = getTenantIdCommon()
    //const connectionNumber = getQueryArg(window.location.href, "connectionNumber");
    //const service = getQueryArg(window.location.href, "service");
   
      const tenantId = 'pb.fazilka';
      const connectionNumber = '0603002420';
      const service = 'WATER';
      let serviceCode=null;
      if(service == "SEWERAGE") 
      serviceCode="SW";
      else
      serviceCode="WS";
      const queryObjForPayment = [
        {
          key: "tenantId",
          value: tenantId,
        },
        {
          key: "consumerCodes",
          value:connectionNumber,
        },
      ];

         
     const paymentsDetails = getPaymentHistory(queryObjForPayment);
      
      paymentsDetails.Payments.map((item, index) => {
         alert("  totalDue =  " +paymentsDetails.Payments[index].totalDue +"  totalAmountPaid =  " +paymentsDetails.Payments[index].totalAmountPaid);
        });
        
   }



  
  export const getPaymentDetails = (isEditable = true) => {
    return getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        props: {
          style: { marginBottom: "10px" }
        },
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              labelKey: "WS_PAYMENT_HISTORY_HEADER",
              
            })
          },
        }
      },
      paymentDetails: PaymentDetails(),

        });
  };