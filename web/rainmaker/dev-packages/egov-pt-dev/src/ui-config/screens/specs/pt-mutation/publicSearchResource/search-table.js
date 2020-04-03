import {
	getLocaleLabels,
	getTransformedLocalStorgaeLabels
  } from "egov-ui-framework/ui-utils/commons";
  import {
	getEpochForDate,
	getTextToLocalMapping,
	sortByEpoch
  } from "../../utils";
  
  export const textToLocalMapping = {
	ULB: getLocaleLabels(
	  "ULB",
	  "PT_SEARCH_ULB",
	  getTransformedLocalStorgaeLabels()
	),
	Locality: getLocaleLabels(
	  "Locality",
	  "PT_SEARCH_LOCALITY",
	  getTransformedLocalStorgaeLabels()
	),
	"Owner Name": getLocaleLabels(
	  "Owner Name",
	  "PT_COMMON_TABLE_COL_OWNER_NAME",
	  getTransformedLocalStorgaeLabels()
	),
  
	"Mobile No.": getLocaleLabels(
	  "Mobile No.",
	  "PT_MUTATION_APPLICANT_MOBILE_NO_LABEL",
	  getTransformedLocalStorgaeLabels()
	),
	"No. of Property": getLocaleLabels(
	  "No. of Property",
	  "PT_SEARCH_NO_OF_PROPERTY",
	  getTransformedLocalStorgaeLabels()
	),
	"Pending Dues": getLocaleLabels(
	  "Pending Dues",
	  "PT_SEARCH_PENDING_DUES",
	  getTransformedLocalStorgaeLabels()
	),
	Status: getLocaleLabels(
	  "Status",
	  "PT_COMMON_TABLE_COL_STATUS_LABEL",
	  getTransformedLocalStorgaeLabels()
	),
	"Search Results for Properties": getLocaleLabels(
	  "Search Results for Properties",
	  "PT_HOME_PROPERTY_RESULTS_TABLE_HEADING",
	  getTransformedLocalStorgaeLabels()
	)
  };
  
  export const searchPropertyTable = {
	uiFramework: "custom-molecules",
	// moduleName: "egov-tradelicence",
	componentPath: "Table",
	visible: false,
	props: {
	  className: "propertyTab",
	  // data: [],
	  columns: [
		getTextToLocalMapping("ULB"),
		getTextToLocalMapping("Locality"),
		getTextToLocalMapping("Owner Name"),
		getTextToLocalMapping("Mobile No."),
		getTextToLocalMapping("No. of Property"),
		getTextToLocalMapping("Pending Dues"),
		getTextToLocalMapping("Status"),
		{
		  name: "tenantId",
		  options: {
			display: false
		  }
		}
	  ],
	  title: getTextToLocalMapping("Search Results for Properties"),
	  options: {
		filter: false,
		download: false,
		responsive: "stacked",
		selectableRows: false,
		hover: true,
		rowsPerPageOptions: [10, 15, 20]
	  },
	  customSortColumn: {
		column: "Application Date",
		sortingFn: (data, i, sortDateOrder) => {
		  const epochDates = data.reduce((acc, curr) => {
			acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
			return acc;
		  }, []);
		  const order = sortDateOrder === "asc" ? true : false;
		  const finalData = sortByEpoch(epochDates, !order).map(item => {
			item.pop();
			return item;
		  });
		  return { data: finalData, currentOrder: !order ? "asc" : "desc" };
		}
	  }
	}
  };
  