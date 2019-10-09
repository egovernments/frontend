// export const options = {
//   "rainmaker-pgr-nonframework": [
//     {
//       reportResultUrl: "/rainmaker-pgr/v1/reports/_get",
//       metaDataUrl: "/report/rainmaker-pgr/metadata/_get",
//       customReportName: "SourceWiseReport",
//       needDefaultSearch: true,
//     },
//   ]
// };

export const getResultUrl = (moduleName,reportName) => {
  let reportResultUrl = `/report/${moduleName}/${reportName}/_get`;
  return reportResultUrl;
};

export const getMetaDataUrl = (moduleName,reportName) => {
  let metaDataUrl = `/report/${moduleName}/${reportName}/metadata/_get`;
  return metaDataUrl;
};

export const getReportName = (moduleName, reportName) => {
  let finalName = reportName;
  return finalName;
};
