import _ from 'lodash';

export default function getMDMSData(tenants){
let tempDRRsObj = {},tempDDRs=[],tempULBS=[],tenantId = "",tenantLogo ={},tenantName='',corpName = '';
_.each(tenants,(v,k) => {

    if(v.code){
        tenantLogo[v.code] = v.logoId;
        tempULBS.push(v.name);
    }
    if(v.code === localStorage.getItem('tenant-id'))
        tenantName = v.name;
    if(v.city.ddrName){     
        tenantId = v.code;
        if(!_.isEmpty(tempDRRsObj,true) && typeof tempDRRsObj[v.city.ddrName] != 'undefined'){
            if(v.city.pwssb) {
                tempDRRsObj["Pwssb-DDR"].push(tenantId);
            } 
            tempDRRsObj[v.city.ddrName].push(tenantId);
        }else{
            if(v.city.pwssb) {
                if (tempDRRsObj.hasOwnProperty("Pwssb-DDR") && tempDRRsObj["Pwssb-DDR"].length > 0) {
                    tempDRRsObj["Pwssb-DDR"].push(tenantId);
                } else {
                    tempDRRsObj["Pwssb-DDR"] = [tenantId];
                }
            }
            tempDRRsObj[v.city.ddrName] = [tenantId]
            tempDDRs.push(v.city.ddrName);
            if(!tempDDRs.includes("Pwssb-DDR")) {
                tempDDRs.push("Pwssb-DDR")
            }
        }
    }
})


let localVal = JSON.parse(localStorage.getItem("localization_"+localStorage.getItem("locale") ) );
for(var i=0; i<localVal.length;i++){    
     if(localVal[i].code === "ULBGRADE_MC1"){ 
        corpName = localVal[i]['message'];
        break;        
    } 
}
return {
    label: "DDRs",
    type: "dropdown",
    values : tempDDRs,
    master : tempDRRsObj,
    tentantLogo : tenantLogo,
    tenantName : tenantName,
    corpName : corpName,
    ULBS :{
        label: "ULBS",
        label_locale: "DSS_ULBS",
        type: "dropdown",
        values : tempULBS
    }
}
};