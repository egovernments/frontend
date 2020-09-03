import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Maintenance from "modules/employee";
import { ImageModalDisplay } from "modules/common";

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

        <Redirect from="/" to={hasLocalisation ? "/language-selection" : defaultUrl.employee} />
      </Switch>
    </main>
  );
};

export default Main;
