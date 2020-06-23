import {
  getCommonHeader,
  getCommonCard,
  getCommonParagraph,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg, getTransformedLocale } from "egov-ui-framework/ui-utils/commons";

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

 const getCurrentFinancialYear = () => {
  let today = new Date();
  let curMonth = today.getMonth();
  let fiscalYr = "";
  if (curMonth > 3) {
    let nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    let nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

const downloadprintMenu = ( downloadMenu, printMenu) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex" }
    },
    children: {
      downloadMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
            leftIcon: "cloud_download",
            rightIcon: "arrow_drop_down",
            props: {
              variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className:
                "tl-download-button"
            },
            menu: downloadMenu
          }
        }
      },
      printMenu: {
        uiFramework: "custom-molecules",
        componentPath: "DownloadPrintButton",
        props: {
          data: {
            label: { labelName: "PRINT", labelKey: "TL_PRINT" },
            leftIcon: "print",
            rightIcon: "arrow_drop_down",
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
            menu: printMenu
          }
        }
      }

    },
  }

}


const getHeader = (applicationNumber, moduleName) => {
  return getCommonContainer({
    header: getCommonHeader({
      labelName: `Application for ${ moduleName } (${getCurrentFinancialYear()})`, //later use getFinancialYearDates
      labelKey: getTransformedLocale(`${moduleName}_COMMON_APPLY_HEADER_LABEL`)
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-noc",
      componentPath: "ApplicationNoContainer",
      props: {
        number: applicationNumber
      },
      visible: true
    }
  })
}

export const getAcknowledgementCard = ({
  state,
  dispatch,
  purpose,
  status,
  applicationNumber,
  secondNumber,
  tenant,
  loadPdfGenerationData,
  moduleName,
  downloadMenu,
  printMenu,
  applicationSuccessFooter,
  paymentSuccessFooter,
  gotoHomeFooter,
  approvalSuccessFooter,
  paymentFailureFooter
}) => {
  if (purpose === "apply" && status === "success") {
    { loadPdfGenerationData && loadPdfGenerationData(applicationNumber, tenant);}
    return {
      header: getHeader(applicationNumber, moduleName),
      headerdownloadprint: downloadprintMenu( downloadMenu, printMenu),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName:
                "A notification regarding Application Submission has been sent to building owner at registered Mobile No.",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_SUCCESS_MESSAGE_SUB`)
            },
            tailText: {
              labelName: "Application No.",
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_APP_NO_LABEL`)
            },
            number: applicationNumber
          }),
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: applicationSuccessFooter(
        state,
        dispatch,
        applicationNumber,
        tenant
      )
    };
  } else if (purpose === "pay" && status === "success") {
    { loadPdfGenerationData && loadPdfGenerationData(applicationNumber, tenant); }
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: getTransformedLocale(`${moduleName}_PAYMENT_COLLECTION_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName:
                "A notification regarding Payment Collection has been sent to building owner at registered Mobile No.",
              labelKey: getTransformedLocale(`${moduleName}_PAYMENT_SUCCESS_MESSAGE_SUB`)
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: getTransformedLocale(`${moduleName}_PMT_RCPT_NO`)
            },
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter: paymentSuccessFooter()
    };
  } else if (purpose === "approve" && status === "success") {
    { loadPdfGenerationData && loadPdfGenerationData(applicationNumber, tenant); }
    return {
      header:getHeader(applicationNumber, moduleName),
      headerdownloadprint: downloadprintMenu( downloadMenu, printMenu),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: `${moduleName} Approved Successfully`,
              labelKey: getTransformedLocale(`${moduleName}_APPROVAL_CHECKLIST_MESSAGE_HEAD`)
            },
            body: {
              labelName:
                `A notification regarding ${moduleName}Approval has been sent to building owner at registered Mobile No.`,
              labelKey: getTransformedLocale(`${moduleName}_APPROVAL_CHECKLIST_MESSAGE_SUB`)
            },
            tailText: {
              labelName: `${moduleName} No.`,
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_NOC_NO_LABEL`)
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: `${moduleName} Application Rejected`,
              labelKey: getTransformedLocale(`${moduleName}_APPROVAL_REJ_MESSAGE_HEAD`)
            },
            body: {
              labelName:
                `A notification regarding ${moduleName} Rejection has been sent to building owner at registered Mobile No.`,
              labelKey: getTransformedLocale(`${moduleName}_APPROVAL_REJ_MESSAGE_SUBHEAD`)
            }
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: `${moduleName} Cancelled`,
              labelKey: getTransformedLocale(`${moduleName}_CANCELLED_MESSAGE_HEAD`)
            },
            body: {
              labelName:
              `A notification regarding ${moduleName} cancellation has been sent to building owner at registered Mobile No.`,
              labelKey: getTransformedLocale(`${moduleName}_CANCELLED_MESSAGE_SUBHEAD`)
            },
            tailText: {
              labelName: `${moduleName} No.`,
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_NOC_NO_LABEL`)
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment has failed!",
              labelKey: getTransformedLocale(`${moduleName}_PAYMENT_FAILURE_MESSAGE_MAIN`)
            },
            body: {
              labelName:
                "A notification regarding payment failure has been sent to the building owner and applicant.",
              labelKey: getTransformedLocale(`${moduleName}_PAYMENT_FAILURE_MESSAGE_SUB`)
            }
          })
        }
      },
      paymentFailureFooter: paymentFailureFooter(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Marked Successfully",
              labelKey: getTransformedLocale(`${moduleName}_MARK_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_MARKED_SUCCESS`)
            },
            tailText: {
              labelName: "Application No.",
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_APP_NO_LABEL`)
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: getTransformedLocale(`${moduleName}_FORWARD_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_FORWARD_SUCCESS`)
            },
            tailText: {
              labelName: "Application No.",
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_APP_NO_LABEL`)
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "sendback" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application sent back Successfully",
              labelKey: getTransformedLocale(`${moduleName}_SENDBACK_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName: "Application has been sent back successfully",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_SENDBACK_SUCCESS`)
            },
            tailText: {
              labelName: "Application No.",
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_APP_NO_LABEL`)
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  } else if (purpose === "refer" && status === "success") {
    return {
      header: getHeader(applicationNumber, moduleName),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: acknowledgementCard({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application referred Successfully",
              labelKey: getTransformedLocale(`${moduleName}_REFER_SUCCESS_MESSAGE_MAIN`)
            },
            body: {
              labelName: "Application has been referred successfully",
              labelKey: getTransformedLocale(`${moduleName}_APPLICATION_REFER_SUCCESS`)
            },
            tailText: {
              labelName: "Application No.",
              labelKey: getTransformedLocale(`${moduleName}_HOME_SEARCH_RESULTS_APP_NO_LABEL`)
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter
    };
  }
};

const acknowledgementCard = ({
  icon = "done",
  backgroundColor = "#39CB74",
  header,
  body,
  tailText,
  number
} = {}) => {
  const tail = tailText
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
            paragraph: getCommonParagraph(body, {
              style: style.bodySub
            })
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
 
export default getAcknowledgementCard;
