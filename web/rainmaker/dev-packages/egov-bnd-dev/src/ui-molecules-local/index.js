import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});

const HowItWorks = Loadable({
  loader: () => import("./HowItWorks"),
  loading: () => <Loading />
});

const SingleApplication = Loadable({
  loader: () => import("./SingleApplication"),
  loading: () => <Loading />
});

export {
  TestMolecules,
  HowItWorks,
  SingleApplication
};
