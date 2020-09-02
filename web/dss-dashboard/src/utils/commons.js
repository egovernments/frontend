export const removeSignFromInsightData=(value='') =>{
    if(value.startsWith('-')){
        value=value.replace('-','');
    }
    else if(value.startsWith('+')){
        value=value.replace('+','');
    }
    return value;
}

export const getLocaleLabels = (key="", strings={} )=>{
    return strings[key]||key;
}