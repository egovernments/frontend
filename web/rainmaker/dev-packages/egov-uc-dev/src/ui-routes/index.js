import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";
import { appRoutes } from "../ui-config";

const Loading = () => <LinearProgress />;


const RenderRoutes = Loadable({
  loader: () => import("egov-ui-framework/ui-molecules/RenderRoutes"),
  loading: () => <Loading />
});


const MainRoutes = childProps => {
  return (
    <main>
      <RenderRoutes routes={appRoutes} childProps={childProps} />
    </main>
  );
};

export default MainRoutes;
