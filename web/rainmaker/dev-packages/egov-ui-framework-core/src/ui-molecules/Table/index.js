import React from "react";
import MUIDataTable from "mui-datatables";
import get from "lodash/get";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { LabelContainer } from "../../ui-containers";
import { getLocaleLabels } from "../../ui-utils/commons";
import "./index.css";

class Table extends React.Component {
  state = {
    data: [],
    columns: [],
    customSortOrder: "asc"
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            "&:nth-child(2)": {
              color: "#2196F3",
              cursor: "pointer"
            }
          }
        },
        MuiTypography: {
          caption: {
            fontSize: "14px"
          }
        },
        MuiFormLabel: {
          root: {
            fontSize: "14px"
          }
        },
        MuiTableCell: {
          body: {
            fontSize: 14
          }
        }
      }
    });

  formatData = (data, columns) => {
    return (
      data &&
      [...data].reduce((acc, curr) => {
        let dataRow = [];
        // Object.keys(columns).forEach(column => {
        columns.forEach(column => {
          // Handling the case where column name is an object with options
          column = typeof column === "object" ? get(column, "labelKey") : column;
          let columnValue = get(curr, `${column}`, "");
          if (get(columns, `${column}.format`, "")) {
            columnValue = columns[column].format(curr);
          }
          dataRow.push(columnValue);
        });
        let updatedAcc = [...acc];
        updatedAcc.push(dataRow);
        return updatedAcc;
      }, [])
    );
  };

  componentWillReceiveProps(nextProps) {
    const { data, columns } = nextProps;
    this.updateTable(data, columns);
  }

  componentDidMount() {
    const { data, columns } = this.props;
    this.updateTable(data, columns);
  }

  getTranslatedHeader = (columns) => {
    if(columns) {
      const colArray = [];
      columns.map((item,key)=>{
        columns[key].name = <LabelContainer labelKey={item.labelKey} labelName={item.labelKey} />
      })
      return columns;
    }
  }

  updateTable = (data, columns) => {
    // const updatedData = this.formatData(data, columns);
    // Column names should be array not keys of an object!
    // This is a quick fix, but correct this in other modules also!
    let fixedColumns = Array.isArray(columns) ? columns : Object.keys(columns);
    const updatedData = this.formatData(data, fixedColumns);
    this.setState({
      data: updatedData,
      // columns: Object.keys(columns)
      columns: this.getTranslatedHeader(fixedColumns)
    });
  };

  onColumnSortChange = (columnName, i) => {
    let { customSortOrder, data } = this.state;
    const { customSortColumn } = this.props;
    const { column, sortingFn } = customSortColumn;
    if (columnName === column) {
      const updatedData = sortingFn(cloneDeep(data), "", customSortOrder);
      this.setState({
        data: updatedData.data,
        customSortOrder: updatedData.currentOrder
      });
    }
  };

  getTabelTitle = (title) => {
    return getLocaleLabels(
      title.labelName,
      title.labelKey
    );
  }

  render() {
    const { data, columns } = this.state;
    const { options, title, rows, customSortDate } = this.props;
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={this.getTabelTitle(title) + " ("+rows+")"}
          data={data}
          columns={columns}
          options={{
            ...options,
            onColumnSortChange: (columnName, order) =>
              this.onColumnSortChange(columnName, order)
          }}
        />
      </MuiThemeProvider>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default Table;