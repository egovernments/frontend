import { Dialog } from "components";
import Button from '@material-ui/core/Button';
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest as httpRequestnew } from "egov-ui-framework/ui-utils/api";
import { get } from "lodash";
import { Card } from "components";



import "./index.css";


const dialogheader = {
  color: "black",
  fontWeight: 500,
  fontSize: "20px !important",
  lineHeight: "28px !important",
  textAlign: "left",
  paddingLeft: "5px",
  backgroundColor: "white !important",
};
class AmendmentDialogue extends Component {
  state = {
    reqDocs: []
  }

  componentDidMount = async () => {

    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "BillAmendment",
            masterDetails: [
              {
                name: "documentObj",
              },
            ],
          },
        ],
      },
    };
    const payload = await httpRequestnew(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      requestBody
    );
    const moduleName = "BillAmendment";
    let documents = get(
      payload.MdmsRes,
      `${moduleName}.documentObj`,
      []
    );


    this.setState({
      reqDocs: documents
    })
  };



  render() {
    let { open, closeDialogue, onAmendBtnClick } = this.props;
    let { reqDocs } = this.state
    return (
      <Dialog
        open={open}
        title={
          <Label label="PT_REQ_DOCS_HEADER" labelStyle={dialogheader} fontSize="18px" color="black" />
        }
        children={[
          <div>

            <div>
              {reqDocs && reqDocs.map((item, index) => {
                return (

                  <div key={index}>
                    <Card
                      textChildren={
                        <div>
                          <Label label={`BILLAMENDMENT_${item.allowedDocs[0].demandRevisionBasis}_HEADING`} className="dialog-heading" fontSize="14px" color="black" fontWeight="400" />
                          <Label label="ONE_OF_THESE_DOC_NEEDED" className="dialog-note" fontWeight="400" fontSize="14px" />
                          {(item.hasOwnProperty("allowedDocs")) &&
                            item.allowedDocs.map((doc, index) => {
                              return (
                                <div key={index} className="col-xs-6 col-sm-3 flex-child">
                                  <Label label={`BILLAMENDMENT_${doc.documentType}_LABEL`} fontSize="13px" color="black" fontWeight="400" className="dialog-docs" />

                                </div>
                              )
                            }


                            )
                          }
                        </div>
                      }
                      style={{ backgroundColor: "rgb(242,242,242)", boxShadow: "none" }}
                    />
                  </div>
                )
              })}
            </div>
            <div>


            </div>

          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={true}
        handleClose={closeDialogue}
        onRequestClose={closeDialogue}
        autoScrollBodyContent={true}
        contentClassName="amend-dialog-content"
        className="amend-dialog"
        style={{ maxHeight: "500px !importnt" }}
        titleStyle={{ dialogheader }}
        modal={true}
        actions={[
          <div style={{ position: "sticky" }}>
            <Button onClick={closeDialogue} color="primary">
              CANCEL
          </Button>
            <Button onClick={onAmendBtnClick} color="primary">
              APPLY
          </Button>
          </div>
        ]}

      />
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AmendmentDialogue);
