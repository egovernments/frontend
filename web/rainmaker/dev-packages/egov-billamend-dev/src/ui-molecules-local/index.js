import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});

const DocumentList = Loadable({
  loader: () => import("./DocumentList"),
  loading: () => <Loading />
});

const UploadSingleFile = Loadable({
  loader: () => import("./UploadSingleFile"),
  loading: () => <Loading />
});

// const TaxHeadsList = Loadable({
//   loader: () => import("./TaxHeadsList"),
//   loading: () => <Loading />
// });

export {
  TestMolecules,
  DocumentList,
  UploadSingleFile,
  // TaxHeadsList
};
