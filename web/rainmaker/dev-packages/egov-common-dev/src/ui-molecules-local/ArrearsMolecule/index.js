import React from "react";
import ArrearTable from "../../ui-atoms-local/ArrearTable";
import './index.css';

const ArrearsMolecule = (props) => {
    let headers = ['CS_BILL_PERIOD'];
    let values = [];
    props.fees ? Object.keys(props.fees).map((key, ind) => {
        let value = [];
        let head=[];
        props.fees[key].map(fee => {
            // if (ind == 0) {
                head.push(fee.name.labelName)
            // }
            value.push(fee.value)
        })

        if(headers.length<head.length){
            headers=['CS_BILL_PERIOD',...head];
        }else{
            value.splice(-1,0,0);
        }
        value.unshift(key);
        values.push(value);
    }
    ) : "NA"
    return (<ArrearTable headers={headers} values={values} ></ArrearTable>)
}
export default ArrearsMolecule;
