import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Citizen from "modules/citizen";
import Maintenance from "modules/Maintenance";
const Main = ({ routes, hasLocalisation, defaultUrl }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/`}
          render={(props) => {
            return <Maintenance />;
          }}
        />
        <Redirect from="/" to={hasLocalisation ? "/language-selection" : defaultUrl.citizen} />
      </Switch>
    </main>
  );
};

export default Main;
