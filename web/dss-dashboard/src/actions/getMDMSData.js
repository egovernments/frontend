import _ from 'lodash';
import axios from 'axios';
import CONFIGS from '../config/configs';

export default function getMDMSData(tenants){
let tempDRRsObj = {},tempDDRs=[],tenantId = "",tenantLogo ={};
_.each(tenants,(v,k) => {
    //console.log(te)
    //console.log(v.city.ddrName);
    //console.log(v.logoId);

    if(v.code)
        tenantLogo[v.code] = v.logoId;
    if(v.city.ddrName){     
        tenantId = v.code;
        if(!_.isEmpty(tempDRRsObj,true) && typeof tempDRRsObj[v.city.ddrName] != 'undefined'){
            tempDRRsObj[v.city.ddrName].push(tenantId);
        }else{
            tempDRRsObj[v.city.ddrName] = [tenantId]
            tempDDRs.push(v.city.ddrName);
        }
    }
})


//console.log(responseData.MdmsRes.tenant.tenants);
//console.log(tempDRRsObj);
//console.log(tempDDRs);
//console.log(tenantLogo);
return {
    label: "DDRs",
    type: "dropdown",
    values : tempDDRs,
    master : tempDRRsObj,
    tentantLogo : tenantLogo
}
};