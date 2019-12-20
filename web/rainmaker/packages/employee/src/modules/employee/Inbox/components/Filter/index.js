import React from "react";
import { DropDown } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";



const Filter = ({inboxData}) => {
    console.log(inboxData,'inboxData');
    return (

        <div className="row">
            <div className="col-md-3">
                <DropDown
                    floatingLabelText="Module"
                    className="filter-fields"
                    dropDownData={[
                        {
                            value: "ALL",
                            label: "All",
                        },
                        {
                            value: "India",
                            label: "IN",
                        },
                        {
                            value: "USA",
                            label: "US",
                        },
                        {
                            value: "Australia",
                            label: "AUS",
                        },
                    ]}
                    value={'ALL'}
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
                    floatingLabelText="Locality"
                    className="filter-fields"
                    dropDownData={[
                        {
                            value: "ALL",
                            label: "All",
                        },
                        {
                            value: "India",
                            label: "IN",
                        },
                        {
                            value: "USA",
                            label: "US",
                        },
                        {
                            value: "Australia",
                            label: "AUS",
                        },
                    ]}
                    value={'ALL'}
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
                    floatingLabelText="Status"
                    className="filter-fields"
                    dropDownData={[
                        {
                            value: "ALL",
                            label: "All",
                        },
                        {
                            value: "India",
                            label: "IN",
                        },
                        {
                            value: "USA",
                            label: "US",
                        },
                        {
                            value: "Australia",
                            label: "AUS",
                        },
                    ]}
                    value={'ALL'}
                    underlineStyle={{
                        position: "absolute",
                        bottom: -1,
                        borderBottom: "1px solid #FE7A51",
                        width: "100%"
                    }}
                />
            </div>
            <div className="col-md-3">
                <div className="rainmaker-displayInline" style={{ cursor: "pointer", marginRight: 5, paddingTop: '30px' }}>
                    <Label label="CLEAR ALL" color="#fe7a51" fontSize="15px" />
                </div>
            </div>
        </div>
    );
};

export default Filter;
