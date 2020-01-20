import React from "react";
import { Icon } from "components";
import filter from "lodash/filter";
import isUndefined from "lodash/isUndefined";
import AutoComplete from "material-ui/AutoComplete";
import { withStyles } from "@material-ui/core/styles";
import Label from "egov-ui-kit/utils/translationNode";
import { List} from  "egov-ui-kit/components";
import Input from '@material-ui/core/Input';
import { connect } from "react-redux";
import { setRoute } from "egov-ui-kit/redux/app/actions";
import get from "lodash/get";
import "./index.css";

const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    // margin: "0px 8px"
    marginLeft:"8px",
    position: "fixed",
    top: "50px",
    height: "48px",
    zIndex: "1100",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 2px rgba(0, 0, 0, 0.23)",
    backgroundColor: "#fff",
    borderRadius: "28px",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: "16px",
  },
});
const getListItems = items =>
  items.map((item) => ({
    primaryText: (
      <Label
        label={item.label}
        fontSize="16px"
        color="#484848"
        labelStyle={{ fontWeight: 500 }}
      />
    )
  
   // route: item.route,

  }));
const items = [
  {
    code: "ACTIVE",
    label: "Active"
  },
  {
    code: "INACTIVE",
    label: "Inactive"
  },
  {
    code: "PAID",
    label: "Paid"
  }
  ];

class WhatsAppScreen extends React.Component {
  state = {
    searchText: "",
    data:items,
  };
  getNameById = (id, dropDownData) => {
    //const { dropDownData } = this.props;
    const filteredArray = filter(dropDownData, { value: id });
    return filteredArray.length > 0 ? filteredArray[0].label : id;
  };

  componentWillReceiveProps(nextProps) {
    const { dropDownData } = nextProps;
    let { getNameById } = this;
    if (!isUndefined(nextProps.value)) {
      this.setState({ searchText: getNameById(nextProps.value, dropDownData) });
    }
  }

  onChangeText = (searchText, dataSource, params) => {
    this.setState({ searchText });
    //logic to like search on items    
    const filterData = items.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));
 
    
    this.setState({
      data:filterData,
    })
    if(searchText===""){
      this.setState({
        data:items,
      })
    }
  };

  onSearchClick = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getTransformedItems = () => {
    //const { menu } = this.props;
    const transformedItems =
      items &&
      items.map((item, index) => {
          return {
            label: item.label,
            value: item.code,
          };
        });
    return transformedItems;
  };

  render() {
    const { classes, history } = this.props;
    const { searchText } = this.state;
    const { getNameById, onChangeText, getTransformedItems } = this;
    
    return (
        <div>
       <div className="search-background">
        <div className="header-iconText">
        <Icon id="back-navigator" action="navigation" name="arrow-back" />
        <Label
              label="Choose City"
              color="white"
              fontSize={18}
              bold={true}
              containerStyle={{ marginLeft: 17,marginTop:-2 }}
        />

       </div>   
       <div className={`${classes.root} dashboard-search-main-cont`}>
        <Icon action="action" name="search" style={{ marginLeft: 12 }} />
        <Input
        placeholder="Search City"
        //className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
        onChange={(e) => {
          this.onChangeText(e.target.value);
        //   this.setState({
        //   searchText:e.target.value,
        
        
        // })
      }}
      />
        {/* <AutoComplete
          hintText={
            <Label
              label="COMMON_SEARCH_SERVICE_INFORMATION"
              color="rgba(0, 0, 0, 0.38)"
              fontSize={16}
              // containerStyle={{ marginLeft: 10, paddingBottom: 5 }}
            />
          }
          searchText={searchText}
          onNewRequest={(chosenRequest, index) => {
            history.push(chosenRequest.value);
          }}
          onUpdateInput={onChangeText}
         dataSource={getTransformedItems() || []}
          underlineFocusStyle={{ borderBottom: "none", borderTop: "none" }}
          underlineStyle={{ borderBottom: "none", borderTop: "none" }}
          // listStyle={{ padding: "20px 20px 20px 20px" }}
          menuStyle={{ maxHeight: "150px", maxWidth: "600px", marginTop: 10, backgroundColor: "#fff", overflowY: "auto" }}
          dataSourceConfig={{ text: "label", value: "value" }}
          filter={(searchText, key) => {
            return key.toLowerCase().includes(getNameById(searchText) && getNameById(searchText.toLowerCase()));
          }}
        /> */}

        {/* <Icon action="av" name="mic" style={{ marginRight: 12 }} /> */}
      </div>
       
       <div className="list-style">
       <List
          items={getListItems(this.state.data)}
          primaryTogglesNestedList={true}
          onItemClick={(item, index) => {
            history && history.push(item.route);
          }}
          
      />
    </div>
    </div>
       </div>
    );
  }
}
// const mapStateToprops = (state) => {
//   const menu = get(state.app, "menu");
//   return { menu };
// };

export default withStyles(styles)(
  connect(
    null,
    null
  )( WhatsAppScreen )
);

