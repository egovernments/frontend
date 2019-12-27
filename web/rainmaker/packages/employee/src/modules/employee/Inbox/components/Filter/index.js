import React from "react";
import { DropDown } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";



const Filter = ({ filter, handleChangeFilter, clearFilter }) => {
    return (
        <div className="row">
            <div className="col-md-3">
                <DropDown
                multiple
                    onChange={(e, index, value) => { handleChangeFilter('moduleFilter', value) }}
                    floatingLabelText={<Label label="CS_INBOX_MODULE_FILTER" fontSize="12px" />}//"Module"
                    className="filter-fields"
                    dropDownData={filter.moduleFilter.dropdownData}
                    value={filter.moduleFilter.selectedValue}
                    underlineStyle={{
                        position: "absolute",
                        bottom: -1,
                        borderBottom: "1px solid #FE7A51",
                        width: "100%"
                    }}
                />
            </div>
            <div className="col-md-3">
                <DropDown
                 multiple
                    onChange={(e, index, value) => {
                        handleChangeFilter('localityFilter', value)
                    }}
                    floatingLabelText={<Label label="CS_INBOX_LOCALITY_FILTER" fontSize="12px"/>}
                    className="filter-fields"
                    dropDownData={filter.localityFilter.dropdownData}
                    value={filter.localityFilter.selectedValue}
                    underlineStyle={{
                        position: "absolute",
                        bottom: -1,
                        borderBottom: "1px solid #FE7A51",
                        width: "90%"
                    }}
                />
            </div>
            <div className="col-md-3" >
                <DropDown
                 multiple
                    floatingLabelText={<Label label="CS_INBOX_STATUS_FILTER" fontSize="12px"  />}
                    className="filter-fields"
                    dropDownData={filter.statusFilter.dropdownData}
                    onChange={(e, index, value) => {
                                               
                        handleChangeFilter('statusFilter', value) }}
                    value={filter.statusFilter.selectedValue}
                    underlineStyle={{
                        position: "absolute",
                        bottom: -1,
                        borderBottom: "1px solid #FE7A51",
                        width: "100%"
                    }}
                />
            </div>
            <div className="col-md-3">
                <div className="rainmaker-displayInline" onClick={clearFilter} style={{ cursor: "pointer", marginRight: 5, paddingTop: '30px' }}>
                    <Label label="CS_INBOX_CLEAR" color="#fe7a51" fontSize="15px" />
                </div>
            </div>
        </div>
    );
};

export default Filter;
