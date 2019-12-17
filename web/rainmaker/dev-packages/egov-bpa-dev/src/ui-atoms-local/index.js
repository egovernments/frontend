import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestAtoms = Loadable({
  loader: () => import("./TestAtoms"),
  loading: () => <Loading />
});
const AutoSuggest =  Loadable({
  loader: () => import("./AutoSuggest"),
  loading: () => <Loading />
});
const downloadFile = Loadable({
  loader: () => import("./downloadFile"),
  loading: () => <Loading />
});
const FormIcon = Loadable({
  loader: () => import("./Icons/FormIcon"),
  loading: () => <Loading />
});
const ApplicationNumber = Loadable({
  loader: () => import("./ApplicationNumber"),
  loading: () => <Loading />
});

export {
  TestAtoms,
  AutoSuggest,
  downloadFile,
  FormIcon,
  ApplicationNumber
};
