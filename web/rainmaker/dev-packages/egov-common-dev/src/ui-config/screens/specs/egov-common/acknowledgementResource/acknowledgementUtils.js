import {
  getCommonHeader,
  getCommonCard,
  getCommonParagraph,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import "./acknowledgementUtils.css";

const style = {
  bodyBox: {
    marginLeft: 16,
    flex: 2
  },
  tailText: {
    color: "rgba(0, 0, 0, 0.6000000238418579)",
    fontSize: 16,
    fontWeight: 400
  },
  tailNumber: {
    fontSize: 24,
    fontWeight: 500
  },
  tailBox: {
    textAlign: "right",
    justifyContent: "center",
    flex: 1
  },
  bodySub: {
    marginTop: "8px",
    marginBottom: "0px",
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto"
  },
  container: {
    display: "flex",
    minHeight: "106px",
    justifyContent: "center",
    alignItems: "center"
  }
};

const acknowledgementCard = ({
  icon = "done",
  backgroundColor = "#39CB74",
  header,
  body,
  tailText,
  number,
  businessService,
  extraData

} = {}) => {
if(extraData!=null){
  if(extraData.payment.paymentDetails[0].businessService=="PT"){
    if (window.appOverrides && window.appOverrides.validateForm)
    {
     window.appOverrides.validateForm("PTReceiptAvailable", {extraData: extraData});
    }
}

let isUCPayment=extraData.payment.paymentDetails[0].businessService!="PT"
&&extraData.payment.paymentDetails[0].businessService!="TL"&&
extraData.payment.paymentDetails[0].businessService!="FIRENOC";
if(isUCPayment){
  if (window.appOverrides && window.appOverrides.validateForm)
  {
   window.appOverrides.validateForm("UCEmployeeReceiptAvailable", {receipt:extraData.payment });
  } 
}
}
  const tail =
    tailText && number && number !== "null"
      ? {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            text: getCommonHeader(tailText, { style: style.tailText }),
            paragraph: getCommonHeader(
              {
                labelName: number
              },
              { style: style.tailNumber }
            )
          },
          props: {
            style: style.tailBox
          }
        }
      : {};

  return getCommonCard({
    applicationSuccessContainer: getCommonContainer(
      {
        avatar: {
          componentPath: "Avatar",
          props: {
            style: {
              width: "72px",
              height: "72px",
              backgroundColor: backgroundColor
            }
          },
          children: {
            Icon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: icon,
                style: {
                  fontSize: "50px"
                },
                iconSize: "50px"
              }
            }
          }
        },
        body: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            header: getCommonHeader(header),
            paragraph: body
              ? getCommonParagraph(body, {
                  style: style.bodySub
                })
              : {}
          },
          props: {
            style: style.bodyBox
          }
        },
        tail: tail
      },
      {
        style: style.container
      }
    )
  });
};

export default acknowledgementCard;
