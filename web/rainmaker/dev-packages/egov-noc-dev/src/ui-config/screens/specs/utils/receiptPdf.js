import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import QRCode from "qrcode";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
import { getMessageFromLocalization } from "./receiptTransformer";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getOwners = data => {
  let retowners = [];
  data.owners.forEach(owner => {
    retowners.push(
      [
        {
          text: "Mobile No.",
          border: [true, true, false, false]
        },
        {
          text: "Name",
          border: [false, true, false, false]
        },
        {
          text: "Gender",
          border: [false, true, false, false]
        },
        {
          text: "Date of Birth",
          border: [false, true, true, false]
        }
      ],
      [
        {
          text: get(owner, "mobile"),
          style: "receipt-table-value",
          border: [true, false, false, false]
        },
        {
          text: get(owner, "name"),
          style: "receipt-table-value",
          border: [false, false, false, false]
        },
        {
          text: get(owner, "gender"),
          style: "receipt-table-value",
          border: [false, false, false, false]
        },
        {
          text: get(owner, "dob"),
          style: "receipt-table-value",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: "",
          border: [true, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },

        {
          text: "",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: "Father/Husband's Name",
          border: [true, false, false, false]
        },
        {
          text: "Relationship",
          border: [false, false, false, false]
        },
        {
          text: "Email",
          border: [false, false, false, false]
        },
        {
          text: "PAN No.",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: get(owner, "fatherHusbandName"),
          style: "receipt-table-value",
          border: [true, false, false, false]
        },
        {
          text: get(owner, "relationship"),
          style: "receipt-table-value",
          border: [false, false, false, false]
        },
        {
          text: get(owner, "email"),
          style: "receipt-table-value",
          border: [false, false, false, false]
        },
        {
          text: get(owner, "pan"),
          style: "receipt-table-value",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: "",
          border: [true, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },

        {
          text: "",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: "Correspondence Address",
          border: [true, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },
        {
          text: "",
          border: [false, false, false, false]
        },
        {
          text: "",
          border: [false, false, true, false]
        }
      ],
      [
        {
          text: get(owner, "address"),
          style: "receipt-table-value",
          border: [true, false, false, true]
        },
        {
          text: "",
          style: "receipt-table-value",
          border: [false, false, false, true]
        },
        {
          text: "",
          style: "receipt-table-value",
          border: [false, false, false, true]
        },

        {
          text: "",
          style: "receipt-table-value",
          border: [false, false, true, true]
        }
      ]
    );
  });

  return retowners;
};

const getBuildings = data => {
  let retbuildings = [];
  data &&
  data.buildings.forEach(building => {
    retbuildings.push([
      {
        text: "Property Type",
        border: [true, true, false, false]
      },
      {
        text: " Name of Building",
        border: [false, true, false, false]
      },
      {
        text: "Building Usage Type",
        border: [false, true, false, false]
      },
      {
        text: "Building Usage Subtype",
        border: [false, true, true, false]
      }
    ]);
    retbuildings.push([
      {
        text: data.propertyType,
        style: "receipt-table-value",
        border: [true, false, false, false]
      },
      {
        text: get(building, "name", "NA"),
        style: "receipt-table-value",
        border: [false, false, false, false]
      },
      {
        text: get(building, "usageType", "NA"),
        style: "receipt-table-value",
        border: [false, false, false, false]
      },
      {
        text: get(building, "usageSubType", "NA"),
        style: "receipt-table-value",
        border: [false, false, true, false]
      }
    ]);
    let headerrow = [];
    let valuerow = [];
    for (let [uomkey, uomvalue] of Object.entries(building.uoms)) {
      headerrow.push({
        text: getMessageFromLocalization(
          `NOC_PROPERTY_DETAILS_${getTransformedLocale(uomkey)}_LABEL`
        ),
        border: valuerow.length == 0
          ? [true, false, false, false]
          : valuerow.length == 3
            ? [false, false, true, false]
            : [false, false, false, false]
      });
      valuerow.push({
        text: uomvalue,
        style: "receipt-table-value",
        border: valuerow.length == 0
          ? [true, false, false, false]
          : valuerow.length == 3
            ? [false, false, true, false]
            : [false, false, false, false]
      // left, top ,right ,down
      });
      // draw when elements in one row are four
      if (headerrow.length == 4) {
        retbuildings.push(
          [headerrow[0], headerrow[1], headerrow[2], headerrow[3]],
          [valuerow[0], valuerow[1], valuerow[2], valuerow[3]]
        );
        headerrow = [];
        valuerow = [];
      }
    }
    if (headerrow.length > 0) {
      var i;
      for (i = 4 - headerrow.length; i > 0; i--) {
        headerrow.push({
          text: "",
          border: valuerow.length == 3
            ? [false, false, true, false]
            : [false, false, false, false]
        });
        valuerow.push({
          text: "",
          style: "receipt-table-value",
          border: valuerow.length == 3
            ? [false, false, true, false]
            : [false, false, false, true]
        });
      }
      retbuildings.push(
        [headerrow[0], headerrow[1], headerrow[2], headerrow[3]],
        [valuerow[0], valuerow[1], valuerow[2], valuerow[3]]
      );
      headerrow = [];
      valuerow = [];
    }
    // set last row bottom border
    retbuildings[retbuildings.length - 1][0].border[3] = true;
    retbuildings[retbuildings.length - 1][1].border[3] = true;
    retbuildings[retbuildings.length - 1][2].border[3] = true;
    retbuildings[retbuildings.length - 1][3].border[3] = true;
  });
  return retbuildings;
};
const getApplicationData = async (transformedData, ulbLogo, type) => {
  console.log("transformedData33", transformedData)
  let borderLayout = {
    hLineWidth: function(i, node) {
      return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
    },
    vLineWidth: function(i, node) {
      return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
    },
    hLineColor: function(i, node) {
      return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
    },
    vLineColor: function(i, node) {
      return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
    }
  // paddingLeft: function(i, node) {
  //   return 5;
  // },
  // paddingRight: function(i, node) {
  //   return 5;
  // },
  // paddingTop: function(i, node) {
  //   return 5;
  // },
  // paddingBottom: function(i, node) {
  //   return 5;
  // }
  };

  let headerText = "Application Confirmation";
  let nocSubheadOne = [
    {
      text: [
        {
          text: "Application No.     ",
          bold: true
        },
        {
          text: transformedData.applicationNumber,
          bold: false
        }
      ],
      alignment: "left"
    },
    {
      text: [
        {
          text: "Date of Application ",
          bold: true
        },
        {
          text: transformedData.applicationDate,
          bold: false
        }
      ],
      alignment: "right"
    }
  ];
  let nocSubheadTwo = [
    {
      text: [
        {
          text: "Application Mode ",
          bold: true
        },
        {
          text: transformedData.applicationMode,
          bold: false
        }
      ],
      alignment: "left"
    }
  ];
  let nocDetails = [
    {
      text: "NOC DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "NOC Type",
              border: [true, true, false, false],
              style: "noc-table-key"
            },
            {
              text: "Provisional NOC No.",
              border: [false, true, false, false]
            },
            {
              text: "Applicable Fire station",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: transformedData.nocType,
              border: [true, false, false, true],
              style: "receipt-table-value"
            },
            {
              text: transformedData.provisionalNocNumber,
              border: [false, false, false, true],
              style: "receipt-table-value"
            },
            {
              text: transformedData.fireStationId,
              border: [false, false, true, true],
              style: "receipt-table-value"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let propertyDetails = [
    {
      text: "PROPERTY DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: getBuildings(transformedData)
      },
      layout: borderLayout
    }
  ];
  let propertyLocationDetails = [
    {
      text: "PROPERTY LOCATION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [

          [
            {
              text: "Area Type",
              border: [true, true, false, false]
            },
            {
              text: "District Name",
              border: [false, true, false, false]
            },
            {
              text: "Sub-District",
              border: [false, true, false, false]
            },
            {
              text: "Property Id",
              border: [false, true, true, false]
            },

          ],
          [
            {
              text: transformedData.areaType,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.subDistrict,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.propertyId,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [

            {
              text: "City",
              border: [true, false, false, false]
            },
            {
              text: "Door/House No.",
              border: [false, false, false, false]
            },
            {
              text: "Building/Company Name",
              border: [false, false, false, false]
            },
            {
              text: "Street Name",
              border: [false, false, true, false]
            }
          ],
          [

            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.door,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.buildingName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.street,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },
          ],
          [


            {
              text: " village",
              border: [true, false, false, false]
            },
            {
              text: " landmark",
              border: [false, false, false, false]
            },


            {
              text: " Mohalla",
              border: [false, false, false, false]
            },
            {
              text: "Pincode",
              border: [false, false, true, false]
            },

          ],
          [

            {
              text: transformedData.village,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },

            {
              text: transformedData.landmark,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },

            {
              text: transformedData.mohalla,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.pincode,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [
            {
              text: "Location on Map",
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: "Fire Station",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],
          [
            {
              text: transformedData.gis,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.fireStationId,
              style: "receipt-table-firestation",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, true]
            },
          ]

        ]
      },
      layout: borderLayout
    },

  ]

  let applicantDetails = [
    {
      text: "APPLICANT DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        //widths: ["*", "*", "*", "*"],
        widths: ["25%", "25%", "25%", "25%"],
        body: getOwners(transformedData)
      },
      layout: borderLayout
    }
  ];
  let institutionDetails = [
    {
      text: "INSTITUTION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "Type of Institution",
              border: [true, true, false, false]
            },
            {
              text: "Name of Institute",
              border: [false, true, false, false]
            },
            {
              text: "Official Telephone No.",
              border: [false, true, false, false]
            },
            {
              text: "Authorized Person",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: getMessageFromLocalization(
                `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(
                  transformedData.ownershipType
                )}`
              ),
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.institutionName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.telephoneNumber,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.owners[0].name,
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Designation in Institution",
              border: [true, false, false, false]
            },
            {
              text: "Mobile No. of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Email of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Official Correspondence Address",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: transformedData.institutionDesignation,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.owners[0].mobile,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].email,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].address,
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    },



  ];
  let documents = [];
  let owners = transformedData.owners.map(owner => [
    {
      text: "Applicant Name",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.name,
      border: [false, true, true, true]
    },
    {
      text: "Mobile No.",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.mobile,
      border: [false, true, true, true]
    }
  ]);
  let applicantInformation = [
    {
      text: "APPLICANT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
      //  widths: ["25%", "25%", "25%", "25%"],
        widths: ["25%", "25%", "25%", "25%"],
        body: owners
      },
      layout: borderLayout
    }
  ];
  let amountPaid = [
    {
      text: "AMOUNT PAID",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "NOC Fee",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            /* {
              text: "NOC Taxes",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }, */
            {
              text: "Adhoc Penalty/Rebate",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "TOTAL",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.nocFee,
              border: [true, true, true, true],
              alignment: "center"
            },
           /*  {
              text: transformedData.nocTaxes,
              border: [true, true, true, true],
              alignment: "center"
            }, */
            {
              text: transformedData.nocAdhocPenaltyRebate,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.totalAmount,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let paymentInformation = [
    {
      text: "PAYMENT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Payment Mode",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Transaction ID/ Cheque/ DD No.",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Bank Name & Branch",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.paymentMode,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.transactionNumber,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.bankAndBranch,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];

  let citizengeneratedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
             // text: "Approved by: ",
              //bold: true
            },
            {
            //  text: transformedData.auditorName,
             // bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }      
 ] ;

  let generatedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
              text: "Generated by: ",
              bold: true
            },
            {
              text: transformedData.auditorName,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }
  ];
  let qrText = `Application: ${transformedData.applicationNumber}, Date: ${
  transformedData.applicationDate
  }, Buildings: ${transformedData.propertyType}, Applicant: ${
  transformedData.owners[0].name
  }, Address: ${transformedData.address}`;

  if (transformedData.ownershipType.startsWith("INSTITUTION")) {
    applicantDetails = [];
    applicantInformation = [];
  } else {
    institutionDetails = [];
  }



  switch (type) {
    case "application":
      applicantInformation = [];
      amountPaid = [];
      paymentInformation = [];
      generatedApprovedBy = [];
      break;
    case "receipt":
      headerText = "Payment Receipt";
      nocSubheadOne = [
        {
          text: [
            {
              text: "Application No.            ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Date of Payment   ",
              bold: true
            },
            {
              text: transformedData.paymentDate,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
      nocSubheadTwo = [
        {
          text: [
            {
              text: "Payment Receipt No.  ",
              bold: true
            },
            {
              text: transformedData.receiptNumber,
              bold: false
            }
          ],
          alignment: "left"
        }
      ];
      nocDetails = [];
      propertyDetails = [];
      propertyLocationDetails = [];
      applicantDetails = [];
      documents = [];
      qrText = `Application: ${
      transformedData.applicationNumber
      }, Receipt number: ${transformedData.receiptNumber}, Date of payment: ${
      transformedData.paymentDate
      }, Fees Paid: ${transformedData.amountPaid}, Payment mode: ${
      transformedData.paymentMode
      }, Transaction ID: ${transformedData.transactionNumber}`;
      break;
    case "certificate":
      headerText = "Certificate";
      nocSubheadOne = [
        {
          text: [
            {
              text: "Fire NOC No. ",
              bold: true
            },
            {
              text: transformedData.fireNOCNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Application No. ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
       nocSubheadTwo = [
        {
          text: [
            {
              text: "Date of Issue ",
              bold: true
            },
            {
              text: transformedData.issuedDate,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Valid Till ",
              bold: true
            },
            {
              text: transformedData.validTo,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
      applicantDetails = [];
      documents = [];

      
      citizengeneratedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                 // text: "Approved by: ",
                  //bold: true
                },
                {
                //  text: transformedData.auditorName,
                 // bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      generatedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                  text: "Approved by: ",
                  bold: true
                },
                {
                  text: transformedData.auditorName,
                  bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      qrText = `Application: ${
      transformedData.applicationNumber
      }, NOC Number: ${transformedData.fireNOCNumber}, Date of Issue: ${
      transformedData.issuedDate
      }, Valid Till: ${transformedData.validTo}, Buildings: ${
      transformedData.propertyType
      }, Applicant: ${transformedData.owners[0].name}`; 
      break;
  }

  // Generate QR code base64 image
  let qrcode = await QRCode.toDataURL(qrText);



  let dd = {
    content: [
      {
        style: "noc-head",
        table: {
          widths: [120, "*", 120],
          body: [
            [
              {
                image: ulbLogo,
                width: 60,
                height: 61.25,
                margin: [51, 12, 10, 10]
              },
              {
                stack: [
                  {
                    text: transformedData.corporationName,
                    style: "receipt-logo-header"
                  },
                  {
                    text: `Fire NOC ${headerText}`,
                    style: "receipt-logo-sub-header"
                  }
                ],
                alignment: "left",
                margin: [10, 23, 0, 0]
              },
              {
                image: qrcode,
                width: 70,
                height: 70,
                margin: [50, 8, 8, 8],
                alignment: "right"
              }
            ]
          ]
        },
        layout: "noBorders"
      },
      {
        style: "noc-subhead",
        columns: nocSubheadOne
      },
      {
        style: "noc-subhead",
        columns: nocSubheadTwo
      },
     ...nocDetails,
     ...propertyDetails,
     ...propertyLocationDetails,
     ...applicantDetails,
     ...documents,
     ...applicantInformation,
     ...institutionDetails,
     ...amountPaid,
     ...paymentInformation,
      process.env.REACT_APP_NAME !== "Citizen"? generatedApprovedBy : citizengeneratedApprovedBy 

    ],
    footer: [],
    styles: {
      "noc-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "noc-head-new": {
        fontSize: 10,
        fillColor: "#F2F2F2",
        margin: [0, 0, 0, 0]
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74,
        margin: [0, 0, 0, 5]
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "noc-subhead": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 0, 0],
        color: "#484848"
      },
      "noc-title": {
        fontSize: 10,
        bold: true,
        margin: [-18, 16, 8, 8],
        color: "#484848",
        fontWeight: 500
      },
      "noc-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "noc-table-key": {
        color: "#484848",
        bold: false,
        fontSize: 10
      },
      "receipt-table-value": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-table-firestation": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 12,
        bold: true,
        margin: [-20, 30, -10, 0],
        color: "#484848"
      }
    },
    
  };
  return dd;
};

const newgetApplicationData = async (transformedData, ulbLogo, type) => {
  console.log("transformedData33", transformedData)
  let borderLayout = {
    hLineWidth: function(i, node) {
      return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
    },
    vLineWidth: function(i, node) {
      return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
    },
    hLineColor: function(i, node) {
      return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
    },
    vLineColor: function(i, node) {
      return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
    }
  // paddingLeft: function(i, node) {
  //   return 5;
  // },
  // paddingRight: function(i, node) {
  //   return 5;
  // },
  // paddingTop: function(i, node) {
  //   return 5;
  // },
  // paddingBottom: function(i, node) {
  //   return 5;
  // }
  };

  let headerText = "Application Confirmation";
  let nocSubheadOne = [
    {
      text: [
        {
          text: "Application No.     ",
          bold: true
        },
        {
          text: transformedData.applicationNumber,
          bold: false
        }
      ],
      alignment: "left"
    },
    {
      text: [
        {
          text: "Date of Application ",
          bold: true
        },
        {
          text: transformedData.applicationDate,
          bold: false
        }
      ],
      alignment: "right"
    }
  ];
  let nocSubheadTwo = [
    {
      text: [
        {
          text: "Application Mode ",
          bold: true
        },
        {
          text: transformedData.applicationMode,
          bold: false
        }
      ],
      alignment: "left"
    }
  ];
  let nocDetails = [  
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              //text: "NOC No ".transformedData.fireNOCNumber,
              text: `NOC No ${transformedData.fireNOCNumber}`,
              border: [false, false, false, false],
              //style: "noc-table-key"
              alignment: "left"

            },
            {
              text: `NOC Type: ${transformedData.nocType}`,
              border: [false, false, false, false],
              alignment: "center"
            },
            {
              text: `Dated ${transformedData.issuedDate}`,
              border: [false, false, false, false],
              alignment: "right"
            }
          ],
          /* [
            {
              text: transformedData.fireNOCNumber,
              border: [false, false, false, false],
              style: "receipt-table-value"
            },
            {
              text: transformedData.nocType,
              border: [false, false, false, false],
              style: "receipt-table-value"
            },
            {
              text: transformedData.issuedDate,
              border: [false, false, false, false],
              style: "receipt-table-value"
            }
          ] */
        ]
      },
     // layout: borderLayout
    }
  ];

  let space = [
    {
      text: "",
      style: "noc-title"
    }];
 
  /* let firstparagraph = [
   
    {
      style: "noc-table",
      table: {
     //   widths: ["*", "*", "*"],
        body: [
          [
            {
              text: `Certified that the ${transformedData.buildingName} at   ${transformedData.door}  ${transformedData.street} comprised of 0 basements and 3 (Upper floor) owned/occupied by   ${transformedData.owners[0].name} have compiled with the fire prevention and fire safety requirements of National Building Code and verified by the officer concerned of fire service on ${transformedData.issuedDate} in the presence of ${transformedData.owners[0].name} (Name of the owner or his representative) and that the building / premises is fit for occupancy group Assembly subdivision D-2 (As per NBC) for period of one year from issue date. Subject to the following conditions.`,
              border: [false, false, false, false],
              style: "noc-table-key"
            },          
            
          ],
          
        ]
      },
    }
  ];

  let issued = [
    {
      text: `Issued on ${transformedData.issuedDate} at ${transformedData.city}`,
      style: "noc-title"
    }];

  let secondparagraph = [
    
    {
      style: "noc-table",
      table: {
        //widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "ਤਸਦੀਕ ਕੀਤਾ ਜਦਾ ਹੈ ਿਕ Barbeque Nation Hospitality Limited ਜੋ ਿਕ THIRD FLOOR SCO 37 & 38  PHASE 2 PATIALA ਸਮੇਤ 0 ਬੇਸਮਟ ਅਤੇ 3 (ਪਰਲੀ ਮੰਿਜ਼ਲ) ਮਲਕੀਅਤ/ਕਾਬਜ਼ਦਾਰ MANISH KUMAR PANDEY ਨੰ ੂਅੱਗ ਬੁਝਾਉਣ ਦੇ ਪਭਾਵੀ ਅਤੇ ਬਚਾਅ ਦੇ ਰਾਟਰੀ ਿਬਲਿਡੰਗ ਕੋਡ ਅਨੁਸਾਰ ਿਜਸ ਨੰ ੂਸਬੰਧਤ ਅੱਗਬੁਝਾਊ ਅਿਧਕਾਰੀ ਵੱਲ ਪ ਮਾਿਣਤ ਕੀਤਾ ਿਗਆ 04-May-2019 ਮੋਜੂਦਗੀ ਿਵੱਚ Manish Kumar (ਮਾਲਕ ਦਾ ਨਾਮ ਜਉਸ ਦਾ ਪਤੀਿਨਧੀ) ਅਤੇ ਇਮਾਰਤ / ਿਬਲਿਡੰਗ ਆਬਾਦੀ ਲਈ ਯੋਗ ਹੈ। Occupancy Group Assembly subdivision               D-2 (ਐਨ. ਬੀ. ਸੀ. ਦੇ ਅਨੁਸਾਰ) ਦੇ ਪਭਾਵੀ ਸਮਤ ਇੱਕ ਸਾਲ ਤੱਕ। ਿਜਸ ਲਈ ਿਨਮਨ ਅਨੁਸਾਰ ਹਦਾਇਤਹਨ।",
        
              border: [false, false, false, false],
              style: "noc-table-key"
            },           
            
          ],
          
        ]
      },
    }
  ]; */

 /*  let pointsheadline= [{
    
      text: `ਜਾਰੀ ਕਰਨ ਦੀ ਿਮਤੀ ${transformedData.issuedDate}  ਿਕੱਥੇ ${transformedData.city}.`,
      style: "noc-title"
    }];

  let firstpointinenglish = [
    {
      text: "1. Fire Safety arrangements shall be kept in working condition at all times",
      style:"noc-title"
    }
  ];

  let firstpointinpunjabi = [
    {
      text: "ਹਰ ਸਮਅੱਗ ਤਬਚਾਅ ਦੇਯੰਤਰਾਂਨੰੂਚਾਲੂ /ਚੰਗੀ ਹਾਲਤ ਿਵੱਚ ਰੱਿਖਆ ਜਾਵੇ।",
      style:"noc-title"
    }
  ];
  
  let secondpointinenglish = [
    {
      text: "2. No, alteration/ addition/ change in use of occupancy is allowed.",
      style:"noc-title"
    }
  ];

  let secondpointinpunjabi = [
    {
      text: "ਿਕਸਵੀ ਤਰਦੇ ਬਦਲਾਅ/ ਵਾਧੇ/ ਕਾਬਜਕਾਰ ਿਵੱਚ ਬਦਲਾਵ ਦੀ ਮਨਾਹੀ ਹੈ।",      
      style:"noc-title"
    }
  ];

  let thridpointinenglish = [
    {
      text: "3. Occupants/ owner should have trained staff to operate the operaon of fire safety system provided there in.",
      style:"noc-title"
    }
  ];

  let thirdpointinpunjabi = [
    {
      text: "ਉਪਲੱਬਧ ਅੱਗ ਬੁਝਾਉਣ ਦੇ ਯੰਤਰ ਦੀ ਵਰਤ ਤ ਰਿਹਣ ਵਾਲੇ ਲੋਕ / ਮਾਲਕ ਨੰ ੂ ਜਾਣੂੰ ਕਰਵਾਇਆ ਜਾਣਾਯਕੀਨੀ ਬਣਾਇਆ ਜਾਵੇ।",            
      style:"noc-title"
    }
  ];

  let fourthpointinenglish = [
    {
      text: "4. Fire Officer can check the arrangements of fire safety at any me, this cerficate will be withdrawn without any noce if any deficiency is found.",
      style:"noc-title"
    }
  ];

  let fourthpointinpunjabi = [
    {
      text: "ਫਾਇਰ ਿਬਗੇਡ ਅਿਧਕਾਰੀ ਿਕਸੇ ਵੀ ਵਕਤ ਇਨ ਸਾਰੇ ਪਬੰਧ ਨੰ ੂ ਚੈਕ ਕਰ ਸਕਦਾ ਹੈ, ਜੇ ਕਰ ਕੋਈ ਕਮੀ ਪਾਈਗਈ ਤ ਿਬਨ ਿਕਸੇ ਨਿਟਸ ਦੇ ਇਹ ਸਰਟੀਿਫਕੇਟ ਰੱਦ ਸਮਿਝਆ ਜਾਵੇਗਾ।",      
      style:"noc-title"
    }
  ];

  let fifthpointinenglish = [
    {
      text: "5.Occupants/ owner should apply for renewal of fire safety cerficate one month prior to expiry of this cerficate.",
      style:"noc-title"
    }
  ];

  let fifthpointinpunjabi = [
    {
      text: "ਮਾਲਕ ਜਾਰੀ ਕੀਤੇ ਗਏ ਫਾਇਰ ਸੇਫਟੀ ਸਰਟੀਿਫਕੇਟ ਦੀ ਿਮਤੀ ਖਤਮ ਹੋਣ ਤ ਇੱਕ ਮਹੀਨਾ ਪਿਹਲ ਰੀਨੀਊਕਰਵਾਉਣ ਲਈ ਪਾਬੰਦ ਹੋਵੇਗਾ।", 
      style:"noc-title"
    }
  ];


  let starmarkoneinenglish = [
    {
      text: "* Above Details cannot be used as ownership proof.",
      style:"noc-title"
    }
  ];

  let starmarkoneinpunjabi = [
    {
      text: "ਉਪਰੋਕਤ ਦਰਸਾਈ ਗਈ ਜਾਣਕਾਰੀ ਨੰੂਮਾਲਕਾਨਾ ਦੇ ਸਬੂਤ ਵਜ ਨਹ ਵਰਿਤਆ ਜਾਵੇਗਾ।", 
      style:"noc-title"
    }
  ];

  let starmarktwoinenglish = [
    {
      text: "This is digitaly created cerificate, no signatue are needed",
      style:"noc-title"
    }
  ];

  let starmarktwoinpunjabi = [
    {
      text: "ਇਹ ਿਡਜੀਟਲੀ (ਕੰਿਪਊਟਰਾਈਜ਼ਡ) ਿਤਆਰ ਕੀਤਾ ਿਗਆ ਸਰਟੀਿਫਕੇਟ ਹੈ, ਿਜਸ ਿਵੱਚ ਦਸਤਖਤ ਦੀ ਕੋਈ ਲੋੜ ਨਹ ਹੈ।", 
      style:"noc-title"
    }
  ]; */
  


  let propertyDetails = [
    {
      text: "PROPERTY DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: getBuildings(transformedData)
      },
      layout: borderLayout
    }
  ];
  let propertyLocationDetails = [
    {
      text: "PROPERTY LOCATION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [

          [
            {
              text: "Area Type",
              border: [true, true, false, false]
            },
            {
              text: "District Name",
              border: [false, true, false, false]
            },
            {
              text: "Sub-District",
              border: [false, true, false, false]
            },
            {
              text: "Property Id",
              border: [false, true, true, false]
            },

          ],
          [
            {
              text: transformedData.areaType,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.subDistrict,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.propertyId,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [

            {
              text: "City",
              border: [true, false, false, false]
            },
            {
              text: "Door/House No.",
              border: [false, false, false, false]
            },
            {
              text: "Building/Company Name",
              border: [false, false, false, false]
            },
            {
              text: "Street Name",
              border: [false, false, true, false]
            }
          ],
          [

            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.door,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.buildingName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.street,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },
          ],
          [


            {
              text: " village",
              border: [true, false, false, false]
            },
            {
              text: " landmark",
              border: [false, false, false, false]
            },


            {
              text: " Mohalla",
              border: [false, false, false, false]
            },
            {
              text: "Pincode",
              border: [false, false, true, false]
            },

          ],
          [

            {
              text: transformedData.village,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },

            {
              text: transformedData.landmark,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },

            {
              text: transformedData.mohalla,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.pincode,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [
            {
              text: "Location on Map",
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: "Fire Station",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],
          [
            {
              text: transformedData.gis,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.fireStationId,
              style: "receipt-table-firestation",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, true]
            },
          ]

        ]
      },
      layout: borderLayout
    },

  ]

  let applicantDetails = [
    {
      text: "APPLICANT DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        //widths: ["*", "*", "*", "*"],
        widths: ["25%", "25%", "25%", "25%"],
        body: getOwners(transformedData)
      },
      layout: borderLayout
    }
  ];
  let institutionDetails = [
    {
      text: "INSTITUTION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "Type of Institution",
              border: [true, true, false, false]
            },
            {
              text: "Name of Institute",
              border: [false, true, false, false]
            },
            {
              text: "Official Telephone No.",
              border: [false, true, false, false]
            },
            {
              text: "Authorized Person",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: getMessageFromLocalization(
                `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(
                  transformedData.ownershipType
                )}`
              ),
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.institutionName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.telephoneNumber,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.owners[0].name,
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Designation in Institution",
              border: [true, false, false, false]
            },
            {
              text: "Mobile No. of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Email of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Official Correspondence Address",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: transformedData.institutionDesignation,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.owners[0].mobile,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].email,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].address,
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    },



  ];
  let documents = [];
  let owners = transformedData.owners.map(owner => [
    {
      text: "Applicant Name",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.name,
      border: [false, true, true, true]
    },
    {
      text: "Mobile No.",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.mobile,
      border: [false, true, true, true]
    }
  ]);
  let applicantInformation = [
    {
      text: "APPLICANT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
      //  widths: ["25%", "25%", "25%", "25%"],
        widths: ["25%", "25%", "25%", "25%"],
        body: owners
      },
      layout: borderLayout
    }
  ];
  let amountPaid = [
    {
      text: "AMOUNT PAID",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "NOC Fee",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            /* {
              text: "NOC Taxes",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }, */
            {
              text: "Adhoc Penalty/Rebate",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "TOTAL",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.nocFee,
              border: [true, true, true, true],
              alignment: "center"
            },
           /*  {
              text: transformedData.nocTaxes,
              border: [true, true, true, true],
              alignment: "center"
            }, */
            {
              text: transformedData.nocAdhocPenaltyRebate,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.totalAmount,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let paymentInformation = [
    {
      text: "PAYMENT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Payment Mode",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Transaction ID/ Cheque/ DD No.",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Bank Name & Branch",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.paymentMode,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.transactionNumber,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.bankAndBranch,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];

  let citizengeneratedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
             // text: "Approved by: ",
              //bold: true
            },
            {
            //  text: transformedData.auditorName,
             // bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }      
 ] ;

  let generatedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
              text: "Generated by: ",
              bold: true
            },
            {
              text: transformedData.auditorName,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }
  ];
  let qrText = `Application: ${transformedData.applicationNumber}, Date: ${
  transformedData.applicationDate
  }, Buildings: ${transformedData.propertyType}, Applicant: ${
  transformedData.owners[0].name
  }, Address: ${transformedData.address}`;

  if (transformedData.ownershipType.startsWith("INSTITUTION")) {
    applicantDetails = [];
    applicantInformation = [];
  } else {
    institutionDetails = [];
  }



  switch (type) {
    case "application":
      applicantInformation = [];
      amountPaid = [];
      paymentInformation = [];
      generatedApprovedBy = [];
      break;
    case "receipt":
      headerText = "Payment Receipt";
      nocSubheadOne = [
        {
          text: [
            {
              text: "Application No.            ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Date of Payment   ",
              bold: true
            },
            {
              text: transformedData.paymentDate,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
      nocSubheadTwo = [
        {
          text: [
            {
              text: "Payment Receipt No.  ",
              bold: true
            },
            {
              text: transformedData.receiptNumber,
              bold: false
            }
          ],
          alignment: "left"
        }
      ];
      nocDetails = [];
      propertyDetails = [];
      propertyLocationDetails = [];
      applicantDetails = [];
      documents = [];
      qrText = `Application: ${
      transformedData.applicationNumber
      }, Receipt number: ${transformedData.receiptNumber}, Date of payment: ${
      transformedData.paymentDate
      }, Fees Paid: ${transformedData.amountPaid}, Payment mode: ${
      transformedData.paymentMode
      }, Transaction ID: ${transformedData.transactionNumber}`;
      break;
    case "certificate":
      headerText = "Certificate";
      /* nocSubheadOne = [
        {
          text: [
            {
              text: "Fire NOC No. ",
              bold: true
            },
            {
              text: transformedData.fireNOCNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Application No. ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
       nocSubheadTwo = [
        {
          text: [
            {
              text: "Date of Issue ",
              bold: true
            },
            {
              text: transformedData.issuedDate,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Valid Till ",
              bold: true
            },
            {
              text: transformedData.validTo,
              bold: false
            }
          ],
          alignment: "right"
        }
      ]; */
      applicantDetails = [];
      documents = [];

      
      citizengeneratedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                 // text: "Approved by: ",
                  //bold: true
                },
                {
                //  text: transformedData.auditorName,
                 // bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      generatedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                  text: "Approved by: ",
                  bold: true
                },
                {
                  text: transformedData.auditorName,
                  bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      qrText = `Application: ${
      transformedData.applicationNumber
      }, NOC Number: ${transformedData.fireNOCNumber}, Date of Issue: ${
      transformedData.issuedDate
      }, Valid Till: ${transformedData.validTo}, Buildings: ${
      transformedData.propertyType
      }, Applicant: ${transformedData.owners[0].name}`; 
      break;
  }

  // Generate QR code base64 image
  let qrcode = await QRCode.toDataURL(qrText);

 
  let dd = {
    
    content: [     
      {       
        style: "noc-head-new",
        table: {
          widths: [120, "*", 120],
          body: [
            [
              {
                image: ulbLogo,
                width: 60,
                height: 61.25,
                margin: [51, 12, 10, 10],
                border: [true, true, false, false],             

              },
              {
                stack: [
                  {
                    //text: transformedData.corporationName,
                    text: "Punjab Fire Services",
                    style: "receipt-logo-header",
                    alignment: "center",
                  },
                  {
                    text: `${transformedData.city}`,
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  },
                  {
                    text: "FIRE SAFETY CERTIFICATE",
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  },
                  {
                    text: "ਫਾਇਰ ਸੇਫਟੀ ਪਮਾਣ ਪੱਤਰ",
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  }
                ],
                alignment: "left",
                margin: [10, 23, 0, 0],
                border: [false, true, false, false],             

              },
              {
                image: qrcode,
                width: 70,
                height: 70,
                margin: [50, 8, 8, 8],
                alignment: "right",
                border: [false, true, true, false],           

              }
              
            ],          
    /*         [
              {
                text: `NOC No ${transformedData.fireNOCNumber}`,
                border: [true, false, false, false],             
                alignment: "left"
  
              },
              {

                text: `NOC Type: ${transformedData.nocType}`,
                border: [false, false, false, false],             
                alignment: "center"
              },
              {

                text: `Dated ${transformedData.issuedDate}`,
                border: [false, false, true, false],             
                alignment: "right"
              }
              
            ],  */

         
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*", '*', '*'],
          body: [           
            
            [             
              {
                text: `NOC No ${transformedData.fireNOCNumber}`,
                border: [true, false, false, false],             
                alignment: "left"
  
              },
              {

                text: `NOC Type: ${transformedData.nocType}`,
                border: [false, false, false, false],             
                alignment: "center"
              },
              {

                text: `Dated ${transformedData.issuedDate}`,
                border: [false, false, true, false],             
                alignment: "right"
              }
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [
             
              {
                text: `Certified that the ${transformedData.buildingName} at  ${transformedData.address} comprised of ${transformedData.buildings[0].uoms.NO_OF_BASEMENTS} basements and ${transformedData.buildings[0].uoms.NO_OF_FLOORS} (Upper floor) owned/occupied by   ${transformedData.owners[0].name} have compiled with the fire prevention and fire safety requirements of National Building Code and verified by the officer concerned of fire service on ${transformedData.issuedDate} in the presence of ${transformedData.owners[0].name} (Name of the owner or his representative) and that the building / premises is fit for occupancy group Assembly subdivision D-2 (As per NBC) for period of one year from issue date. Subject to the following conditions.`,

                border: [true, false, true, false],             
                alignment: "center"
              },
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [
             
              {
                text: `Issued on ${transformedData.issuedDate} at ${transformedData.city}`,
   
                    border: [true, false, true, false],             
                alignment: "center"
              },
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: `ਤਸਦੀਕ ਕੀਤਾ ਜਦਾ ਹੈ ਿਕ ${transformedData.buildingName} ਜੋ ਿਕ ${transformedData.address} ${transformedData.city} ${transformedData.subDistrict} ਸਮੇਤ ${transformedData.buildings[0].uoms.NO_OF_BASEMENTS} ਬੇਸਮਟ ਅਤੇ ${transformedData.buildings[0].uoms.NO_OF_FLOORS} (ਪਰਲੀ ਮੰਿਜ਼ਲ) ਮਲਕੀਅਤ/ਕਾਬਜ਼ਦਾਰ ${transformedData.owners[0].name} ਨੰ ੂਅੱਗ ਬੁਝਾਉਣ ਦੇ ਪਭਾਵੀ ਅਤੇ ਬਚਾਅ ਦੇ ਰਾਟਰੀ ਿਬਲਿਡੰਗ ਕੋਡ ਅਨੁਸਾਰ ਿਜਸ ਨੰ ੂਸਬੰਧਤ ਅੱਗਬੁਝਾਊ ਅਿਧਕਾਰੀ ਵੱਲ ਪ ਮਾਿਣਤ ਕੀਤਾ ਿਗਆ ${transformedData.issuedDate} ਮੋਜੂਦਗੀ ਿਵੱਚ ${transformedData.owners[0].name} (ਮਾਲਕ ਦਾ ਨਾਮ ਜਉਸ ਦਾ ਪਤੀਿਨਧੀ) ਅਤੇ ਇਮਾਰਤ / ਿਬਲਿਡੰਗ ਆਬਾਦੀ ਲਈ ਯੋਗ ਹੈ। Occupancy Group Assembly subdivision               D-2 (ਐਨ. ਬੀ. ਸੀ. ਦੇ ਅਨੁਸਾਰ) ਦੇ ਪਭਾਵੀ ਸਮਤ ਇੱਕ ਸਾਲ ਤੱਕ। ਿਜਸ ਲਈ ਿਨਮਨ ਅਨੁਸਾਰ ਹਦਾਇਤਹਨ।`,
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: `ਜਾਰੀ ਕਰਨ ਦੀ ਿਮਤੀ ${transformedData.issuedDate}  ਿਕੱਥੇ ${transformedData.city}.`,
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                margin: [10, 23, 0, 0],

                text: "1. Fire Safety arrangements shall be kept in working condition at all times",
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਹਰ ਸਮਅੱਗ ਤਬਚਾਅ ਦੇਯੰਤਰਾਂਨੰੂਚਾਲੂ /ਚੰਗੀ ਹਾਲਤ ਿਵੱਚ ਰੱਿਖਆ ਜਾਵੇ।",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "2. No, alteration/ addition/ change in use of occupancy is allowed.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਿਕਸਵੀ ਤਰਦੇ ਬਦਲਾਅ/ ਵਾਧੇ/ ਕਾਬਜਕਾਰ ਿਵੱਚ ਬਦਲਾਵ ਦੀ ਮਨਾਹੀ ਹੈ।",      
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "3. Occupants/ owner should have trained staff to operate the operaon of fire safety system provided there in.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਉਪਲੱਬਧ ਅੱਗ ਬੁਝਾਉਣ ਦੇ ਯੰਤਰ ਦੀ ਵਰਤ ਤ ਰਿਹਣ ਵਾਲੇ ਲੋਕ / ਮਾਲਕ ਨੰ ੂ ਜਾਣੂੰ ਕਰਵਾਇਆ ਜਾਣਾਯਕੀਨੀ ਬਣਾਇਆ ਜਾਵੇ।",            
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "4. Fire Officer can check the arrangements of fire safety at any me, this cerficate will be withdrawn without any noce if any deficiency is found.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਫਾਇਰ ਿਬਗੇਡ ਅਿਧਕਾਰੀ ਿਕਸੇ ਵੀ ਵਕਤ ਇਨ ਸਾਰੇ ਪਬੰਧ ਨੰ ੂ ਚੈਕ ਕਰ ਸਕਦਾ ਹੈ, ਜੇ ਕਰ ਕੋਈ ਕਮੀ ਪਾਈਗਈ ਤ ਿਬਨ ਿਕਸੇ ਨਿਟਸ ਦੇ ਇਹ ਸਰਟੀਿਫਕੇਟ ਰੱਦ ਸਮਿਝਆ ਜਾਵੇਗਾ।",      
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "5.Occupants/ owner should apply for renewal of fire safety cerficate one month prior to expiry of this cerficate.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਮਾਲਕ ਜਾਰੀ ਕੀਤੇ ਗਏ ਫਾਇਰ ਸੇਫਟੀ ਸਰਟੀਿਫਕੇਟ ਦੀ ਿਮਤੀ ਖਤਮ ਹੋਣ ਤ ਇੱਕ ਮਹੀਨਾ ਪਿਹਲ ਰੀਨੀਊਕਰਵਾਉਣ ਲਈ ਪਾਬੰਦ ਹੋਵੇਗਾ।", 
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },


      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "* Above Details cannot be used as ownership proof.",
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਉਪਰੋਕਤ ਦਰਸਾਈ ਗਈ ਜਾਣਕਾਰੀ ਨੰੂਮਾਲਕਾਨਾ ਦੇ ਸਬੂਤ ਵਜ ਨਹ ਵਰਿਤਆ ਜਾਵੇਗਾ।", 
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "This is digitaly created cerificate, no signatue are needed",
               border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਇਹ ਿਡਜੀਟਲੀ (ਕੰਿਪਊਟਰਾਈਜ਼ਡ) ਿਤਆਰ ਕੀਤਾ ਿਗਆ ਸਰਟੀਿਫਕੇਟ ਹੈ, ਿਜਸ ਿਵੱਚ ਦਸਤਖਤ ਦੀ ਕੋਈ ਲੋੜ ਨਹ ਹੈ।", 
                border: [true, false, true, true],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },


     
       
      
       

     /* ...space,
     ...space,
     ...nocDetails,
     ...space,
     ...firstparagraph,
     ...issued,
     ...secondparagraph,
     ...pointsheadline,
     ...firstpointinenglish,
     ...firstpointinpunjabi,
     ...secondpointinenglish,
     ...secondpointinpunjabi,
     ...thridpointinenglish,
     ...thirdpointinpunjabi,
     ...fourthpointinenglish,
     ...fourthpointinpunjabi,
     ...fifthpointinenglish,
     ...fifthpointinpunjabi,
     ...starmarkoneinenglish,
     ...starmarkoneinpunjabi,
     ...starmarktwoinenglish,
     ...starmarktwoinpunjabi, */


     /* ...propertyDetails,
     ...propertyLocationDetails,
     ...applicantDetails,
     ...documents,
     ...applicantInformation,
     ...institutionDetails,
     ...amountPaid,
     ...paymentInformation, */
     // process.env.REACT_APP_NAME !== "Citizen"? generatedApprovedBy : citizengeneratedApprovedBy 

    
    ],
    
    footer: [],
    styles: {
      "noc-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "noc-head-new": {
        fontSize: 11,
        //fillColor: "#F2F2F2",
        margin: [0, 0, 0, 0]
      },

      
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74,
        margin: [0, 0, 0, 5]
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "noc-subhead": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 0, 0],
        color: "#484848"
      },
      "noc-title": {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 0],
        color: "#484848",
        fontWeight: 500
      },
      "noc-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "noc-table-key": {
        color: "#484848",
        bold: false,
        fontSize: 10
      },
      "receipt-table-value": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-table-firestation": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 12,
        bold: true,
        margin: [-20, 30, -10, 0],
        color: "#484848"
      }
    }
  };


  return dd;
};

const provisionApplicationData = async (transformedData, ulbLogo, type) => {
  console.log("provisional certificate", transformedData)
  let borderLayout = {
    hLineWidth: function(i, node) {
      return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
    },
    vLineWidth: function(i, node) {
      return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
    },
    hLineColor: function(i, node) {
      return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
    },
    vLineColor: function(i, node) {
      return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
    }
  // paddingLeft: function(i, node) {
  //   return 5;
  // },
  // paddingRight: function(i, node) {
  //   return 5;
  // },
  // paddingTop: function(i, node) {
  //   return 5;
  // },
  // paddingBottom: function(i, node) {
  //   return 5;
  // }
  };

  let headerText = "Application Confirmation";
  let nocSubheadOne = [
    {
      text: [
        {
          text: "Application No.     ",
          bold: true
        },
        {
          text: transformedData.applicationNumber,
          bold: false
        }
      ],
      alignment: "left"
    },
    {
      text: [
        {
          text: "Date of Application ",
          bold: true
        },
        {
          text: transformedData.applicationDate,
          bold: false
        }
      ],
      alignment: "right"
    }
  ];
  let nocSubheadTwo = [
    {
      text: [
        {
          text: "Application Mode ",
          bold: true
        },
        {
          text: transformedData.applicationMode,
          bold: false
        }
      ],
      alignment: "left"
    }
  ];
  let nocDetails = [  
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              //text: "NOC No ".transformedData.fireNOCNumber,
              text: `NOC No ${transformedData.fireNOCNumber}`,
              border: [false, false, false, false],
              //style: "noc-table-key"
              alignment: "left"

            },
            {
              text: `NOC Type: ${transformedData.nocType}`,              
              border: [false, false, false, false],
              alignment: "center"
            },
            {
              text: `Dated ${transformedData.issuedDate}`,
              border: [false, false, false, false],
              alignment: "right"
            }
          ],
          /* [
            {
              text: transformedData.fireNOCNumber,
              border: [false, false, false, false],
              style: "receipt-table-value"
            },
            {
              text: transformedData.nocType,
              border: [false, false, false, false],
              style: "receipt-table-value"
            },
            {
              text: transformedData.issuedDate,
              border: [false, false, false, false],
              style: "receipt-table-value"
            }
          ] */
        ]
      },
     // layout: borderLayout
    }
  ];

  let space = [
    {
      text: "",
      style: "noc-title"
    }];
 

 
  


  let propertyDetails = [
    {
      text: "PROPERTY DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: getBuildings(transformedData)
      },
      layout: borderLayout
    }
  ];
  let propertyLocationDetails = [
    {
      text: "PROPERTY LOCATION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [

          [
            {
              text: "Area Type",
              border: [true, true, false, false]
            },
            {
              text: "District Name",
              border: [false, true, false, false]
            },
            {
              text: "Sub-District",
              border: [false, true, false, false]
            },
            {
              text: "Property Id",
              border: [false, true, true, false]
            },

          ],
          [
            {
              text: transformedData.areaType,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.subDistrict,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.propertyId,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [

            {
              text: "City",
              border: [true, false, false, false]
            },
            {
              text: "Door/House No.",
              border: [false, false, false, false]
            },
            {
              text: "Building/Company Name",
              border: [false, false, false, false]
            },
            {
              text: "Street Name",
              border: [false, false, true, false]
            }
          ],
          [

            {
              text: transformedData.city,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.door,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.buildingName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.street,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },
          ],
          [


            {
              text: " village",
              border: [true, false, false, false]
            },
            {
              text: " landmark",
              border: [false, false, false, false]
            },


            {
              text: " Mohalla",
              border: [false, false, false, false]
            },
            {
              text: "Pincode",
              border: [false, false, true, false]
            },

          ],
          [

            {
              text: transformedData.village,
              style: "receipt-table-value",
              border: [true, false, false, false]
            },

            {
              text: transformedData.landmark,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },

            {
              text: transformedData.mohalla,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.pincode,
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],

          [
            {
              text: "Location on Map",
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: "Fire Station",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, false]
            },

          ],
          [
            {
              text: transformedData.gis,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.fireStationId,
              style: "receipt-table-firestation",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: "",
              style: "receipt-table-value",
              border: [false, false, true, true]
            },
          ]

        ]
      },
      layout: borderLayout
    },

  ]

  let applicantDetails = [
    {
      text: "APPLICANT DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        //widths: ["*", "*", "*", "*"],
        widths: ["25%", "25%", "25%", "25%"],
        body: getOwners(transformedData)
      },
      layout: borderLayout
    }
  ];
  let institutionDetails = [
    {
      text: "INSTITUTION DETAILS",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "Type of Institution",
              border: [true, true, false, false]
            },
            {
              text: "Name of Institute",
              border: [false, true, false, false]
            },
            {
              text: "Official Telephone No.",
              border: [false, true, false, false]
            },
            {
              text: "Authorized Person",
              border: [false, true, true, false]
            }
          ],
          [
            {
              text: getMessageFromLocalization(
                `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(
                  transformedData.ownershipType
                )}`
              ),
              style: "receipt-table-value",
              border: [true, false, false, false]
            },
            {
              text: transformedData.institutionName,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.telephoneNumber,
              style: "receipt-table-value",
              border: [false, false, false, false]
            },
            {
              text: transformedData.owners[0].name,
              style: "receipt-table-value",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: "Designation in Institution",
              border: [true, false, false, false]
            },
            {
              text: "Mobile No. of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Email of Authorized Person",
              border: [false, false, false, false]
            },
            {
              text: "Official Correspondence Address",
              border: [false, false, true, false]
            }
          ],
          [
            {
              text: transformedData.institutionDesignation,
              style: "receipt-table-value",
              border: [true, false, false, true]
            },
            {
              text: transformedData.owners[0].mobile,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].email,
              style: "receipt-table-value",
              border: [false, false, false, true]
            },
            {
              text: transformedData.owners[0].address,
              style: "receipt-table-value",
              border: [false, false, true, true]
            }
          ]
        ]
      },
      layout: borderLayout
    },



  ];
  let documents = [];
  let owners = transformedData.owners.map(owner => [
    {
      text: "Applicant Name",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.name,
      border: [false, true, true, true]
    },
    {
      text: "Mobile No.",
      border: [true, true, false, true],
      style: "receipt-table-value"
    },
    {
      text: owner.mobile,
      border: [false, true, true, true]
    }
  ]);
  let applicantInformation = [
    {
      text: "APPLICANT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
      //  widths: ["25%", "25%", "25%", "25%"],
        widths: ["25%", "25%", "25%", "25%"],
        body: owners
      },
      layout: borderLayout
    }
  ];
  let amountPaid = [
    {
      text: "AMOUNT PAID",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["25%", "25%", "25%", "25%"],
        body: [
          [
            {
              text: "NOC Fee",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            /* {
              text: "NOC Taxes",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }, */
            {
              text: "Adhoc Penalty/Rebate",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "TOTAL",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.nocFee,
              border: [true, true, true, true],
              alignment: "center"
            },
            /* {
              text: transformedData.nocTaxes,
              border: [true, true, true, true],
              alignment: "center"
            }, */
            {
              text: transformedData.nocAdhocPenaltyRebate,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.totalAmount,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];
  let paymentInformation = [
    {
      text: "PAYMENT INFORMATION",
      style: "noc-title"
    },
    {
      style: "noc-table",
      table: {
        widths: ["*", "*", "*"],
        body: [
          [
            {
              text: "Payment Mode",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Transaction ID/ Cheque/ DD No.",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            },
            {
              text: "Bank Name & Branch",
              border: [true, true, true, true],
              style: "receipt-table-value",
              alignment: "center"
            }
          ],
          [
            {
              text: transformedData.paymentMode,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.transactionNumber,
              border: [true, true, true, true],
              alignment: "center"
            },
            {
              text: transformedData.bankAndBranch,
              border: [true, true, true, true],
              alignment: "center"
            }
          ]
        ]
      },
      layout: borderLayout
    }
  ];

  let citizengeneratedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
             // text: "Approved by: ",
              //bold: true
            },
            {
            //  text: transformedData.auditorName,
             // bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }      
 ] ;

  let generatedApprovedBy = [
    {
      style: "receipt-approver",
      columns: [
        {
          text: [
            {
              text: "Generated by: ",
              bold: true
            },
            {
              text: transformedData.auditorName,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Commissioner/EO",
              bold: true
            }
          ],
          alignment: "right"
        }
      ]
    }
  ];
  let qrText = `Application: ${transformedData.applicationNumber}, Date: ${
  transformedData.applicationDate
  }, Buildings: ${transformedData.propertyType}, Applicant: ${
  transformedData.owners[0].name
  }, Address: ${transformedData.address}`;

  if (transformedData.ownershipType.startsWith("INSTITUTION")) {
    applicantDetails = [];
    applicantInformation = [];
  } else {
    institutionDetails = [];
  }



  switch (type) {
    case "application":
      applicantInformation = [];
      amountPaid = [];
      paymentInformation = [];
      generatedApprovedBy = [];
      break;
    case "receipt":
      headerText = "Payment Receipt";
      nocSubheadOne = [
        {
          text: [
            {
              text: "Application No.            ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Date of Payment   ",
              bold: true
            },
            {
              text: transformedData.paymentDate,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
      nocSubheadTwo = [
        {
          text: [
            {
              text: "Payment Receipt No.  ",
              bold: true
            },
            {
              text: transformedData.receiptNumber,
              bold: false
            }
          ],
          alignment: "left"
        }
      ];
      nocDetails = [];
      propertyDetails = [];
      propertyLocationDetails = [];
      applicantDetails = [];
      documents = [];
      qrText = `Application: ${
      transformedData.applicationNumber
      }, Receipt number: ${transformedData.receiptNumber}, Date of payment: ${
      transformedData.paymentDate
      }, Fees Paid: ${transformedData.amountPaid}, Payment mode: ${
      transformedData.paymentMode
      }, Transaction ID: ${transformedData.transactionNumber}`;
      break;
    case "certificate":
      headerText = "Certificate";
      /* nocSubheadOne = [
        {
          text: [
            {
              text: "Fire NOC No. ",
              bold: true
            },
            {
              text: transformedData.fireNOCNumber,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Application No. ",
              bold: true
            },
            {
              text: transformedData.applicationNumber,
              bold: false
            }
          ],
          alignment: "right"
        }
      ];
       nocSubheadTwo = [
        {
          text: [
            {
              text: "Date of Issue ",
              bold: true
            },
            {
              text: transformedData.issuedDate,
              bold: false
            }
          ],
          alignment: "left"
        },
        {
          text: [
            {
              text: "Valid Till ",
              bold: true
            },
            {
              text: transformedData.validTo,
              bold: false
            }
          ],
          alignment: "right"
        }
      ]; */
      applicantDetails = [];
      documents = [];

      
      citizengeneratedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                 // text: "Approved by: ",
                  //bold: true
                },
                {
                //  text: transformedData.auditorName,
                 // bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      generatedApprovedBy = [
        {
          style: "receipt-approver",
          columns: [
            {
              text: [
                {
                  text: "Approved by: ",
                  bold: true
                },
                {
                  text: transformedData.auditorName,
                  bold: false
                }
              ],
              alignment: "left"
            },
            {
              text: [
                {
                  text: "Commissioner/EO",
                  bold: true
                }
              ],
              alignment: "right"
            }
          ]
        }      
     ] ;

      qrText = `Application: ${
      transformedData.applicationNumber
      }, NOC Number: ${transformedData.fireNOCNumber}, Date of Issue: ${
      transformedData.issuedDate
      }, Valid Till: ${transformedData.validTo}, Buildings: ${
      transformedData.propertyType
      }, Applicant: ${transformedData.owners[0].name}`; 
      break;
  }

  // Generate QR code base64 image
  let qrcode = await QRCode.toDataURL(qrText);

 
  let dd = {
    
    content: [     
      {       
        style: "noc-head-new",
        table: {
          widths: [120, "*", 120],
          body: [
            [
              {
                image: ulbLogo,
                width: 60,
                height: 61.25,
                margin: [51, 12, 10, 10],
                border: [true, true, false, false],             

              },
              {
                stack: [
                  {
                    //text: transformedData.corporationName,
                    text: "Punjab Fire Services",
                    style: "receipt-logo-header",
                    alignment: "center",
                  },
                  {
                    text: `< ${transformedData.city} >`,
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  },
                  {
                    text: "FIRE SAFETY CERTIFICATE",
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  },
                  {
                    text: "ਫਾਇਰ ਸੇਫਟੀ ਪਮਾਣ ਪੱਤਰ",
                    style: "receipt-logo-sub-header",
                    alignment: "center",
                  }
                ],
                alignment: "left",
                margin: [10, 23, 0, 0],
                border: [false, true, false, false],             

              },
              {
                image: qrcode,
                width: 70,
                height: 70,
                margin: [50, 8, 8, 8],
                alignment: "right",
                border: [false, true, true, false],           

              }
              
            ],          
    /*         [
              {
                text: `NOC No ${transformedData.fireNOCNumber}`,
                border: [true, false, false, false],             
                alignment: "left"
  
              },
              {

                text: `NOC Type: ${transformedData.nocType}`,
                border: [false, false, false, false],             
                alignment: "center"
              },
              {

                text: `Dated ${transformedData.issuedDate}`,
                border: [false, false, true, false],             
                alignment: "right"
              }
              
            ],  */

         
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*", '*', '*'],
          body: [           
            
            [             
              {
                text: `NOC No ${transformedData.fireNOCNumber}`,
                border: [true, false, false, false],             
                alignment: "left"
  
              },
              {

                text: `NOC Type: ${transformedData.nocType}`,
                border: [false, false, false, false],             
                alignment: "center"
              },
              {

                text: `Dated ${transformedData.issuedDate}`,
                border: [false, false, true, false],             
                alignment: "right"
              }
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [
             
              {
                //text: `Certified that the ${transformedData.buildingName} at   ${transformedData.door}  ${transformedData.street} comprised of 0 basements and 3 (Upper floor) owned/occupied by   ${transformedData.owners[0].name} have compiled with the fire prevention and fire safety requirements of National Building Code and verified by the officer concerned of fire service on ${transformedData.issuedDate} in the presence of ${transformedData.owners[0].name} (Name of the owner or his representative) and that the building / premises is fit for occupancy group Assembly subdivision D-2 (As per NBC) for period of one year from issue date. Subject to the following conditions.`,
                text: `Certified that the ${transformedData.buildingName} at ${transformedData.address}   ${transformedData.city} ${transformedData.subDistrict}   has been inspected by the fire officer. This site is vacant/under-construction and is aaccessible to fire brigade. As per proposed drawing, building is to be constructed with ${transformedData.buildings[0].uoms.NO_OF_BASEMENTS} basements and ${transformedData.buildings[0].uoms.NO_OF_FLOORS} (Upper floor). Fire department has examined the fire safety layout plan/drawing and found to be fit for occupancy group Educational subdivision B-1 (as per NBC).`,
                border: [true, false, true, false],             
                alignment: "center"
              },
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [
             
              {
                text: `Issued on ${transformedData.issuedDate} at ${transformedData.fireStationId}`,
   
                    border: [true, false, true, false],             
                alignment: "left"
              },
             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: `ਤਸਦੀਕ ਕੀਤਾ ਜਦਾ ਹੈ ਿਕ ${transformedData.buildingName} ਪਤਾ ${transformedData.address} ${transformedData.city} ${transformedData.subDistrict}  ਦੀ ਫਾਇਰ ਅਫਸਰ ਵਲ                 ਪੜਤਾਲ ਕੀਤੀ ਗਈ। ਇਸ ਸਮਇਹ ਜਗਾ ਖਾਲੀ/ਉਸਾਰੀ ਅਧੀਨ ਹੈ ਅਤੇ ਫਾਇਰ ਿਬਗੇਡ ਦੀ ਪਹੁੰਚ ਦੇਅੰਦਰ ਹੈ। ਲੇਆਊਟ ਪਲਾਨ/ ਡਰਾਇੰਗ ਮੁਤਾਿਬਕ ${transformedData.buildings[0].uoms.NO_OF_BASEMENTS} ਬੇਸਮਟ ਅਤੇ ${transformedData.buildings[0].uoms.NO_OF_FLOORS} ਮੰਿਜਲ ਹਨ। ਫਾਇਰ ਿਵਭਾਗ ਵਲ                 ਿਬਨ ਕਰਤਾ ਦੁਆਰਾ ਜਮਾ ਕਰਵਾਏ ਗਏ ਫਾਇਰ ਸੇਫਟੀ ਲੇਆਊਟ ਪਲਾਨ/ਡਰਾਇੰਗ ਨੰ ੂਘੋਿਖਆ ਿਗਆ ਅਤੇ ਨ ਨਲ ਿਬਲਿਡੰਗ ਕੋਡ ਅਨੁਸਾਰ ਗਰੁੱਪ Educational ਸਬਡਵੀਜਨ B-1 ਿਵੱਚ ਪੈਦਾ ਹੈ।` ,
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: `ਜਾਰੀ ਕਰਨ ਦੀ ਿਮਤੀ ${transformedData.issuedDate}  ਿਕੱਥੇ ${transformedData.city}.`,
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "Provisional NOC is issued subject to following conditions:",
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਪਵੀਜਨਲ ਐਨ.ਓ.ਸੀ ਹੇਠ ਿਲਖੀਆ eਰਤfi ਦੇ ਆਧਾਰ ਤੇ ਜਾਰੀ ਕੀਤਾ ਜfiਦਾ ਹੈ।",
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                margin: [10, 23, 0, 0],

                text: "1. Occupant/Owner must install/provide fire safety arrangements as per submitted fire layout plan/drawing during construction.",
                border: [true, false, true, false],             
                alignment: "left"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਕਾਬਜਕਾਰ/ਮਾਲਕ ਵਲਜਮਕਰਵਾਏ ਗਏ ਲੇਆਊਟ ਪਲਾਨ/ਡਰਾਇੰਗ ਅਨੁਸਾਰ ਫਾਇਰ ਸੇਫਟੀ ਦੇ ਪਬੰਧ ਕਰਨ ਲਾਜਮੀ ਹੋਣਗੇ।",                            
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "2. Occupant/Owner must obtain the ﬁnal NOC from ﬁre department on completion of building construction before occupancy.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਕਾਬਜਕਾਰ/ਮਾਲਕ ਵਲ” ਇਸ ਪ˛ੋਜੈਕਟ ਦੀ ਉਸਾਰੀ ਉਪਰੰ ਤ ਫਾਇਰ ਸੇਫਟੀ ਸਬੰ ਧੀ ਫਾਇਰ ਐਨ.ਓ.ਸੀ ਲੈਣਾ ਹੋਵੇਗਾ।",      
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "3. Fire department may ask for additional arrangements (if necessary) aGer the completion of construction of building.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਫਾਇਰ ਿਵਭਾਗ ਵਲ” ਿਬਲਿਡੰ ਗ ਦੀ ਉਸਾਰੀ ਦਾ ਕੰ ਮ ਮੁਕੰ ਮਲ ਹੋਣ ਤੇ ਫਾਇਰ ਸੇਫਟੀ ਦਾ ਵਾਧੂ ਪ˛ਬੰ ਧ (ਜੇਕਰ ਲੋੜ ਹੋਵੇ) ਕਰਨ ਲਈ ਿਕਹਾ ਜਾ ਸਕਦਾ ਹੈ।",            
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "4. During construction, ﬁre safety arrangements should be provided as per requirements of NBC.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਐਨ.ਬੀ.ਸੀ ਅਨੁਸਾਰ ਿਬਲਿਡੰ ਗ ਦੀ ਉਸਾਰੀ ਸਮ” ਫਾਇਰ ਸੇਫਟੀ ਦੇ ਲੋੜੀਦੇ ਪ˛ਬੰ ਧ ਕਰਨ`  ਜਰੂਰੀ ਹੋਣਗੇ।",      
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "5. In case of any change/alteration in the building plan, owner/occupant must re-apply for the provisional certiﬁcate.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਜੇਕਰ ਕਾਬਜਕਾਰ/ਮਾਲਕ ਵਲ” ਕੋਈ ਵੀ ਤਬਦੀਲੀ ਕੀਤੀ ਜfiਦੀ ਹੈ ਤfi ਦੁਬਾਰਾ ਤੋ ਪ˛ੋਵੀਜਨਲ ਐਨ.ਓ.ਸੀ ਲਈ ਅਪਲਾਈ ਕਰਨਾ ਪਵੇਗਾ।", 
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "6. Fire department reserves the right to withdraw this issued certiﬁcate, if any change in ﬁre/building layout plan is made without notice to ﬁre department.",
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਜੇਕਰ ਕਾਬਜਕਾਰ/ਮਾਲਕ ਵਲ” ਿਬਨਾ ਫਾਇਰ ਿਵਭਾਗ ਦੀ ਮੰ ਨਜੂਰੀ ਤ” ਲੇਆਊਟ ਪਲਾਨ ਿਵਚ ਕੋਈ ਤਬਦੀਲੀ ਕੀਤੀ ਜfiਦੀ ਹੈ ਤfi ਜਾਰੀ ਕੀਤਾ ਿਗਆ ਸਰਟੀਿਫਕੇਟ ਵਾਪਸ ਲੈਣ ਦਾ ਹੱ ਕ ਰਾਖਵfi ਹੋਵੇਗਾ।", 
                border: [true, false, true, false],             
                alignment: "left",
                margin: [10, 0, 0, 0],

              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },


      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "* Above Details cannot be used as ownership proof.",
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਉਪਰੋਕਤ ਦਰਸਾਈ ਗਈ ਜਾਣਕਾਰੀ ਨੰੂਮਾਲਕਾਨਾ ਦੇ ਸਬੂਤ ਵਜ ਨਹ ਵਰਿਤਆ ਜਾਵੇਗਾ।", 
                border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "This is digitaly created cerificate, no signatue are needed",
               border: [true, false, true, false],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },

      {       
        style: "noc-head-new",
        table: {
          widths: ["*"],
          body: [           
            
            [             
              {
                text: "ਇਹ ਿਡਜੀਟਲੀ (ਕੰਿਪਊਟਰਾਈਜ਼ਡ) ਿਤਆਰ ਕੀਤਾ ਿਗਆ ਸਰਟੀਿਫਕੇਟ ਹੈ, ਿਜਸ ਿਵੱਚ ਦਸਤਖਤ ਦੀ ਕੋਈ ਲੋੜ ਨਹ ਹੈ।", 
                border: [true, false, true, true],             
                alignment: "center"
              },             
           ], 
           
           
                       
          ]
        },
    
        layout: {},
      },



    
    ],
    
    footer: [],
    styles: {
      "noc-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "noc-head-new": {
        fontSize: 11,
        //fillColor: "#F2F2F2",
        margin: [0, 0, 0, 0]
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 16,
        bold: true,
        letterSpacing: 0.74,
        margin: [0, 0, 0, 5]
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Cambay",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "noc-subhead": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 0, 0],
        color: "#484848"
      },
      "noc-title": {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 0],
        color: "#484848",
        fontWeight: 500
      },
      "noc-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },
      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "noc-table-key": {
        color: "#484848",
        bold: false,
        fontSize: 10
      },
      "receipt-table-value": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-table-firestation": {
        color: "#484848",
        bold: true,
        fontSize: 10
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 12,
        bold: true,
        margin: [-20, 30, -10, 0],
        color: "#484848"
      }
    }
  };


  return dd;
};

const generatePdf = async (state, dispatch, type) => {


  let applicationData = get(
    state.screenConfiguration.preparedFinalObject,
    "applicationDataForPdf",
    {}
  );
  console.log(applicationData, "applicationDatageneratepdf")

  let paymentData = get(
    state.screenConfiguration.preparedFinalObject,
    "receiptDataForPdf",
    {}
  );
  console.log(paymentData, "paymentData")

  let mdmsData = get(
    state.screenConfiguration.preparedFinalObject,
    "mdmsDataForPdf",
    {}
  );
  let ulbLogo = get(
    state.screenConfiguration.preparedFinalObject,
    "base64UlbLogoForPdf",
    ""
  );
  let auditorData = get(
    state.screenConfiguration.preparedFinalObject,
    "userDataForPdf",
    {}
  );
/*    if (isEmpty(applicationData)) {
    console.log("Error in application data");
    return;
  } else if (isEmpty(mdmsData)) {
    console.log("Error in mdms data");
    return;
  } else if (isEmpty(ulbLogo)) {
    console.log("Error in image data");
    return;
  }  else if (
    (type.startsWith("receipt") || type.startsWith("certificate")) &&
    isEmpty(auditorData)
  ) {
    console.log("Error in auditor user data");
    return;
  }  else if (
    (type.startsWith("receipt") || type.startsWith("certificate")) &&
    isEmpty(paymentData)
  ) {
    console.log("Error in payment data");
    return;
  }  */
  let transformedData = {
    ...applicationData,
    ...paymentData,
    ...mdmsData,
    ...auditorData
  };
  
  switch (type) {
    case "application_download":
      let fileName = `noc_application_${transformedData.applicationNumber}`;
      let application_data = await getApplicationData(
        transformedData,
        ulbLogo,
        "application"
      );
      console.log("application_data", application_data);
      console.log("application************", transformedData)

      application_data &&
      pdfMake.createPdf(application_data).download(fileName);
      break;
    case "application_print":
      application_data = await getApplicationData(
        transformedData,
        ulbLogo,
        "application"
      );
      application_data && pdfMake.createPdf(application_data).print();
      break;
    case "receipt_download":
      fileName = `noc_receipt_${transformedData.receiptNumber}`;
      application_data = await getApplicationData(
        transformedData,
        ulbLogo,
        "receipt"
      );
      application_data &&
      pdfMake.createPdf(application_data).download(fileName);
      break;
    case "receipt_print":
      application_data = await getApplicationData(
        transformedData,
        ulbLogo,
        "receipt"
      );
      application_data && pdfMake.createPdf(application_data).print();
      break;
    case "certificate_download":
      fileName = `noc_certificate_${transformedData.fireNOCNumber}`;
     // debugger;
      if(transformedData.nocType=="NEW")
      {
      application_data = await newgetApplicationData(
        transformedData,
        ulbLogo,
        "certificate"
      );
     } 
     else
     {
      application_data = await provisionApplicationData(
        transformedData,
        ulbLogo,
        "certificate"
      );
     }


     //console.log("certificate_download", application_data);
     // console.log("certificate_download************", transformedData)

      application_data &&
      pdfMake.createPdf(application_data).download(fileName);
      break;
    case "certificate_print":
      application_data = await getApplicationData(
        transformedData,
        ulbLogo,
        "certificate"
      );
      application_data && pdfMake.createPdf(application_data).print();
      break;

    default:
      break;
  }
};

export default generatePdf;
