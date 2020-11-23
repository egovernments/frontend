import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Complaints } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import {
  transformComplaintForComponent,
  fetchFromLocalStorage
} from "egov-ui-kit/utils/commons";
import orderby from "lodash/orderBy";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getTenantId , getUserInfo} from "egov-ui-kit/utils/localStorageUtils";

import "./index.css";

class ClosedComplaints extends Component {
  componentDidMount = async () => {
    let { fetchComplaints, renderCustomTitle, pathNameRole } = this.props;
    let complaintRequest = [{ key: "status", value: "rejected,resolved,closed" }];
    if(pathNameRole === "ro")
      complaintRequest.push({ key: "assignedTo", value: JSON.parse(getUserInfo()).id })
    fetchComplaints(complaintRequest);
    const complaintCountRequest = [
      { key: "tenantId", value: getTenantId() },
      { key: "status", value: "closed,resolved,rejected" }
    ]; 
    if(pathNameRole === "ro")
      complaintCountRequest.push({ key: "assignedTo", value: JSON.parse(getUserInfo()).id })
    // getting tenantId from localStorage
    let payloadCount = await httpRequest(
      "rainmaker-pgr/v1/requests/_count",
      "_search",
      complaintCountRequest
    );
    payloadCount
      ? payloadCount.count
        ? renderCustomTitle(payloadCount.count)
        : renderCustomTitle("0")
      : renderCustomTitle("0");
  };

  onComplaintClick = complaintNo => {
    const pathNameRole = window.location.pathname.indexOf("closed-complaints-gro")>-1?"gro":
      window.location.pathname.indexOf("closed-complaints-ro")>-1?"ro":
      window.location.pathname.indexOf("closed-complaints-csr")>-1?"csr":"na";
    this.props.history.push(`/complaint-details-${pathNameRole}/${complaintNo}`);
  };

  render() {
    const { onComplaintClick } = this;
    const { closedComplaints, role, loading } = this.props;

    return (
      <Screen loading={loading}>
        <div className="form-without-button-cont-generic">
          <Complaints
            noComplaintMessage={"COMMON_NO_COMPLAINTS_MESSAGE"}
            onComplaintClick={onComplaintClick}
            complaints={closedComplaints}
            role={role}
            complaintLocation={true}
          />
        </div>
      </Screen>
    );
  }
}

const isAssigningOfficer = roles => {
  const roleCodes = roles.map((role, index) => {
    return role.code;
  });
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

const displayStatus = (status = "", assignee) => {
  let statusObj = {};
  if (
    status.toLowerCase() == "rejected" ||
    status.toLowerCase() == "resolved"
  ) {
    statusObj.status = `CS_COMMON_${status.toUpperCase()}_UCASE`;
  } else {
    statusObj.status = status;
  }
  if (status.toLowerCase() == "open") {
    statusObj.statusMessage = `CS_COMMON_SUBMITTED`;
  } else {
    statusObj.statusMessage = `CS_COMMON_${status.toUpperCase()}`;
  }

  return statusObj;
};

const mapStateToProps = state => {
  const { complaints, common } = state;
  const { categoriesById } = complaints;
  const { userInfo } = state.auth;
  const { citizenById, employeeById } = common || {};
  const { fetchSuccess } = complaints;
  const loading = fetchSuccess ? false : true;
  const role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  const pathNameRole = window.location.pathname.indexOf("closed-complaints-gro")>-1?"gro":
      window.location.pathname.indexOf("closed-complaints-ro")>-1?"ro":
      window.location.pathname.indexOf("closed-complaints-csr")>-1?"csr":"na";
  const transformedComplaints = transformComplaintForComponent(
    complaints,
    role,
    employeeById,
    citizenById,
    categoriesById,
    displayStatus
  );
  const closedComplaints = orderby(
    transformedComplaints.filter(
      complaint => complaint.complaintStatus === "CLOSED"
    ),
    "latestActionTime",
    "desc"
  );
  const numClosedComplaints = closedComplaints.length;
  return { userInfo, closedComplaints, role, loading, numClosedComplaints, pathNameRole};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComplaints: criteria => dispatch(fetchComplaints(criteria))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClosedComplaints);
