
export const DSIGN_REDIRECT_URL = globalConfigExists() ? window.globalConfigs.getConfig("DSIGN_REDIRECT_URL") : process.env.DSIGN_REDIRECT_URL;

function globalConfigExists() {
  return typeof window.globalConfigs !== "undefined" && typeof window.globalConfigs.getConfig === "function";
}
