import app from "../app/reducer";
import auth from "../auth/reducer";
import screenConfiguration from "../screen-configuration/reducer";

const rootReducer = {
  app,
  auth,
  screenConfiguration
};

export default rootReducer;
