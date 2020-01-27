import _ from 'lodash';

export default function getMDMSData(tenants){
let tempDRRsObj = {},tempDDRs=[],tenantId = "",tenantLogo ={},tenantName='',corpName = '';
_.each(tenants,(v,k) => {

    if(v.code)
        tenantLogo[v.code] = v.logoId;
    if(v.code == localStorage.getItem('tenant-id'))
        tenantName = v.name;
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


let localVal = JSON.parse(localStorage.getItem("localization_"+localStorage.getItem("locale") ) );
for(var i=0; i<localVal.length;i++){    
     if(localVal[i].code === "ULBGRADE_MC1"){ 
        //console.log(localVal[i]["code"],localVal[i]['message']);
        corpName = localVal[i]['message'];
        break;        
    } 
}
//console.log(responseData.MdmsRes.tenant.tenants);
//console.log(tempDRRsObj);
//console.log(tempDDRs);
//console.log(tenantLogo);
return {
    label: "DDRs",
    type: "dropdown",
    values : tempDDRs,
    master : tempDRRsObj,
    tentantLogo : tenantLogo,
    tenantName : tenantName,
    corpName : corpName
}
};