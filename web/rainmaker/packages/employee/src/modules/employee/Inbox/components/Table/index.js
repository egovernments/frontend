import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TaskDialog } from "egov-workflow/ui-molecules-local";
import { addWflowFileUrl, orderWfProcessInstances } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { Card } from "components";
import orderBy from "lodash/orderBy";
import { getWFConfig } from "./workflowRedirectionConfig";
import React from "react";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";
import { setRoute } from "egov-ui-kit/redux/app/actions";


class InboxData extends React.Component {
  state = {
    dialogOpen: false,
    workflowHistory: [],
  };

  getProcessIntanceData = async (pid) => {
    const tenantId = getTenantId();
    const queryObject = [{ key: "businessIds", value: pid }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];
    const payload = await httpRequest("egov-workflow-v2/egov-wf/process/_search?", "", queryObject);
    const processInstances = payload && payload.ProcessInstances.length > 0 && orderWfProcessInstances(payload.ProcessInstances);
    return processInstances;
  };

  onHistoryClick = async (moduleNumber) => {
    const { toggleSnackbarAndSetText, prepareFinalObject } = this.props;
    const processInstances = await this.getProcessIntanceData(moduleNumber.text);
    if (processInstances && processInstances.length > 0) {
      await addWflowFileUrl(processInstances, prepareFinalObject);
      this.setState({
        dialogOpen: true,
      });
    } else {
      toggleSnackbarAndSetText(true, {
        labelName: "API error",
        labelKey: "ERR_API_ERROR",
      });
    }
  };

  onDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  getModuleLink = async (item, row, index) => {
    const { prepareFinalObject } = this.props;
    const status = row[2].text && row[2].text.props.defaultLabel;
    const taskId = index === 0 && item.text;
    const tenantId = getTenantId();
    const processInstances = await this.getProcessIntanceData(row[0].text);

    if (processInstances && processInstances.length > 0) {
      await addWflowFileUrl(processInstances, prepareFinalObject);
    }

    let baseUrl = document.location.origin;
    let contextPath =
      status === "Initiated"
        ? getWFConfig(row[0].hiddenText).INITIATED
        :  getWFConfig(row[0].hiddenText).DEFAULT;

    let queryParams = `applicationNumber=${taskId}&tenantId=${tenantId}`;
    this.props.setRoute(`${contextPath}?${queryParams}`);
    // window.location.href = `${baseUrl}${contextPath}?${queryParams}`;
  };

  getSlaColor = (sla, businessService) => {
    const { businessServiceSla } = this.props;
    const MAX_SLA = businessServiceSla[businessService];
    let slaValue = "";
    if (sla <= 0) {
      slaValue = "redSlab"
    } else if (0 < sla && sla <= (MAX_SLA - MAX_SLA / 3)) {
      slaValue = "yellowSlab"
    } else {
      slaValue = "greenSlab"
    }
    switch (slaValue) {
      case "greenSlab": return "inbox-cell-badge-primary sla-positive-value"
      case "yellowSlab": return "inbox-cell-badge-primary sla-middle-value"
      case "redSlab": return "inbox-cell-badge-primary sla-negative-value"
    }
  }

  render() {
    const { data, ProcessInstances } = this.props;
    const { onHistoryClick, onDialogClose, getModuleLink } = this;
    return (
      <Table>
        <TableHead>
          <TableRow>
            {data.headers.map((item, index) => {
              let classNames = `inbox-data-table-headcell inbox-data-table-headcell-${index}`;
              return <TableCell className={classNames}>{<Label label={item} labelStyle={{ fontWeight: "500" }} color="#000000" />}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        {data.rows.length === 0 ? (
          <TableBody>
            <Label labelClassName="" label="COMMON_INBOX_NO_DATA" />
          </TableBody>
        ) : (
            <TableBody>
              {data.rows.map((row, i) => {
                return (
                  <TableRow key={i} className="inbox-data-table-bodyrow">
                    {row.map((item, index) => {
                      let classNames = `inbox-data-table-bodycell inbox-data-table-bodycell-${index}`;
                      if (item.subtext) {
                        return (
                          <TableCell className={classNames}>
                            <div onClick={() => getModuleLink(item, row, index)} className="inbox-cell-text">{<a onClick={() => getModuleLink(item, row, index)}>{item.text} </a>}</div>
                            <div className="inbox-cell-subtext">{<Label label={`CS_COMMON_INBOX_${item.subtext.toUpperCase()}`} color="#000000" />}</div>
                          </TableCell>
                        );
                      } else if (item.badge) {
                        return (
                          <TableCell className={classNames}>
                            <span
                              class={this.getSlaColor(item.text, row[2].text.props.label.split('_')[1])}
                            //class={item.text >= 1 ? "inbox-cell-badge-primary sla--positive-value" : "inbox-cell-badge-primary sla--negative-value"}
                            >
                              {item.text}
                            </span>
                          </TableCell>
                        );
                      } else if (item.historyButton) {
                        return (
                          <TableCell className={classNames}>
                            <div onClick={() => onHistoryClick(row[0])} style={{ cursor: "pointer" }}>
                              <i class="material-icons">history</i>
                            </div>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell className={classNames}>
                            <div>
                              {item.text}
                            </div>
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
              <TaskDialog open={this.state.dialogOpen} onClose={onDialogClose} history={ProcessInstances} />
            </TableBody>
          )}
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { workflow } = preparedFinalObject;
  const { ProcessInstances } = workflow || [];
  return { ProcessInstances };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: url => dispatch(setRoute(url)),
    toggleSnackbarAndSetText: (open, message) => dispatch(toggleSnackbarAndSetText(open, message)),
    prepareFinalObject: (path, value) => dispatch(prepareFinalObject(path, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxData);

export const Taskboard = ({ data }) => {
  return (
    <div>
      {data.map((item, i) => (
        <div className="col-sm-4">
          <Card
            className="inbox-card inbox-worklist-card"
            key={i}
            textChildren={
              <div>
                <div className="head">{item.head}</div>
                <div className="body">{item.body}</div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

const onModuleCardClick = (route) => {
  window.location.href = document.location.origin + route;
};
