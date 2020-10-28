import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;


const EstimateCardContainer = Loadable({
  loader: () => import("./EstimateCardContainer"),
  loading: () => <Loading />
});

const DocumentListContainer = Loadable({
  loader: () => import("./DocumentListContainer"),
  loading: () => <Loading />
});

// const AdjustmentAmountContainer = Loadable({
//   loader: () => import("./AdjustmentAmountContainer"),
//   loading: () => <Loading />
// });
export {

  EstimateCardContainer,

  TestContainer,
  DocumentListContainer,
  // AdjustmentAmountContainer

};
