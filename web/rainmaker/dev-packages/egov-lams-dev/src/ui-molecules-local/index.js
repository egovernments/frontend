import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});

const UploadSingleFile = Loadable({
  loader: () => import("./UploadSingleFile"),
  loading: () => <Loading />
});

const DocumentList = Loadable({
  loader: () => import("./DocumentList"),
  loading: () => <Loading />
});

const CustomTab = Loadable({
  loader: () => import("./CustomTab"),
  loading: () => <Loading />
});

const SingleApplication = Loadable({
  loader: () => import("./SingleApplication"),
  loading: () => <Loading />
});

const Footer = Loadable({
  loader: () => import("./Footer"),
  loading: () => <Loading />
});

const Stepper = Loadable({
  loader: () => import("./Stepper"),
  loading: () => <Loading />
});
const TaskDialog = Loadable({
  loader: () => import("./TaskDialog"),
  loading: () => <Loading />
});

const TaskStatusComponents = Loadable({
  loader: () => import("./TaskStatusComponents"),
  loading: () => <Loading />
});

const ActionDialog = Loadable({
  loader: () => import("./ActionDialog"),
  loading: () => <Loading />
});

const HowItWorks = Loadable({
  loader: () => import("./HowItWorks"),
  loading: () => <Loading />
});

export {
  TestMolecules,
  UploadSingleFile,
  DocumentList,
  CustomTab,
  Footer,
  Stepper,
  TaskDialog,
  TaskStatusComponents,
  ActionDialog,
  SingleApplication,
  HowItWorks
};
