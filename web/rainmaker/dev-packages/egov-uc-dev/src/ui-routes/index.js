import React from "react";
import RenderRoutes from "egov-ui-framework-core/ui-molecules/RenderRoutes";
import { appRoutes } from "../ui-config";

const MainRoutes = childProps => {
  return (
    <main>
      <RenderRoutes routes={appRoutes} childProps={childProps} />
    </main>
  );
};

export default MainRoutes;
