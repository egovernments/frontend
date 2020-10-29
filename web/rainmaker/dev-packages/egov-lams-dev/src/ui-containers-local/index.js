import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;


const TestContainer = Loadable({
  loader: () => import("./TestContainer"),
  loading: () => <Loading />
});

const AutosuggestContainer = Loadable({
  loader: () => import("./AutosuggestContainer"),
  loading: () => <Loading />
});

const DocumentListContainer = Loadable({
  loader: () => import("./DocumentListContainer"),
  loading: () => <Loading />
});

const DownloadFileContainer = Loadable({
  loader: () => import("./DownloadFileContainer"),
  loading: () => <Loading />
});

const CustomTabContainer = Loadable({
  loader: () => import("./CustomTabContainer"),
  loading: () => <Loading />
});

const TestTabs = Loadable({
  loader: () => import("./TestTabs"),
  loading: () => <Loading />
});

const WorkFlowContainer = Loadable({
  loader: () => import("./WorkFlowContainer"),
  loading: () => <Loading />
});
const TaskStatusContainer = Loadable({
  loader: () => import("./TaskStatusContainer"),
  loading: () => <Loading />
});
const TableData = Loadable({
  loader: () => import("./TableData"),
  loading: () => <Loading />
});
const Table = Loadable({
  loader: () => import("./Table"),
  loading: () => <Loading />
});
const Filter = Loadable({
  loader: () => import("./Filter"),
  loading: () => <Loading />
});

export {
  TestContainer,
  AutosuggestContainer,
  DocumentListContainer,
  DownloadFileContainer,
  CustomTabContainer,
  TestTabs,
  WorkFlowContainer,
  TaskStatusContainer,
  TableData,
  Table,
  Filter
};
