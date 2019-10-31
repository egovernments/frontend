import React from "react";
import { Tooltip } from "egov-ui-framework/ui-molecules";
import Label from "egov-ui-kit/utils/translationNode";
import { TotalDuesButton } from "./components";
import "./index.css";

const labelStyle = {
  color: "rgba(0, 0, 0, 0.6)",
  fontWeight: 400,
  letterSpacing: "0.58px",
  lineHeight: "17px",
  textAlign: "left",
  paddingRight: "20px",
};
const TotalDues = ({ totalBillAmountDue }) => {
  const data = { value: "PT_TOTALDUES_TOOLTIP", key: "PT_TOTALDUES_TOOLTIP" };
  return (
    <div className="flex-container">
      <div className="flex-child">
        <Label buttonLabel={false} label="PT_TOTAL_DUES" color="rgb(0, 0, 0, 0.87)" height="35px" labelStyle={labelStyle} fontSize="20px" />
      </div>
      <Tooltip
        val={data}
        icon={"info_circle"}
        style={{ position: "absolute", left: "130px", padding: "4px", width: "30px", display: "inline-flex" }}
      />
      <div className="flex-child">
        <Label label="Rs " secondaryText={totalBillAmountDue} labelStyle={labelStyle} fontSize="20px" color="rgb(0, 0, 0, 0.87)" height="35px"></Label>
      </div>
      {totalBillAmountDue > 0 && (
        <div className="flex-child">
          <TotalDuesButton labelText="PT_TOTALDUES_VIEW" />
        </div>
      )}
      {totalBillAmountDue > 0 && (
        <div className="flex-child">
          <TotalDuesButton labelText="PT_TOTALDUES_PAY" />
        </div>
      )}
    </div>
  );
};

export default TotalDues;
