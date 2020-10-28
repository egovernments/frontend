import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestAtoms = Loadable({
  loader: () => import("./TestAtoms"),
  loading: () => <Loading />
});

const ConsumerNo = Loadable({
  loader: () => import("./ConsumerNo"),
  loading: () => <Loading />
});

export {
  TestAtoms,
  ConsumerNo
};
