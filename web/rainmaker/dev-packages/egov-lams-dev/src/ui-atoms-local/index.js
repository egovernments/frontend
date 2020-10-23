import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestAtoms = Loadable({
  loader: () => import("./TestAtoms"),
  loading: () => <Loading />
});

const Checkbox = Loadable({
  loader: () => import("./Checkbox"),
  loading: () => <Loading />
});

const AutoSuggest = Loadable({
  loader: () => import("./AutoSuggest"),
  loading: () => <Loading />
});

const ApplicationNo = Loadable({
  loader: () => import("./ApplicationNo"),
  loading: () => <Loading />
});

export {
  TestAtoms,
  Checkbox,
  AutoSuggest,
  ApplicationNo

};
