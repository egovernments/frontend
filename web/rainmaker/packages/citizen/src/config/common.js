const commonConfig = {
  MAP_API_KEY: globalConfigExists() ? window.globalConfigs.getConfig("GMAPS_API_KEY") : process.env.REACT_APP_GMAPS_API_KEY,
  tenantId: globalConfigExists() ? window.globalConfigs.getConfig('STATE_LEVEL_TENANT_ID') : process.env.REACT_APP_DEFAULT_TENANT_ID,
  whatsappNumber: globalConfigExists() && window.globalConfigs.getConfig('DEFAULT_WHATSAPP_NUMBER')? window.globalConfigs.getConfig('DEFAULT_WHATSAPP_NUMBER') :( process.env.REACT_APP_DEFAULT_WHATSAPP_NUMBER?process.env.REACT_APP_DEFAULT_WHATSAPP_NUMBER:918744060444),
  // forgotPasswordTenant: "pb.amritsar",
};

function globalConfigExists(){
  return typeof window.globalConfigs !== 'undefined' && typeof window.globalConfigs.getConfig === 'function';
 }

export default commonConfig;
