import React, { Component } from "react";
import { connect } from "react-redux";
import { getCityNameByCode } from "egov-ui-kit/utils/commons";
import { List, Dialog, TextFieldIcon, AutoSuggest } from "components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import filter  from "lodash/filter";
import { getTranslatedLabel } from "../../../utils/commons";
import jp from "jsonpath";

class CityPickerDialog extends Component {
  state = { results: [], searchTerm: "", open: false };

  componentDidMount = async () => {
    document.getElementById("person-city").addEventListener("focus", function() {
      blur();
      this.setState({
        open: true,
        searchTerm: "",
      });
    }.bind(this));

    this.autoSelectCity();

  };

  componentWillUnmount() {
    document.getElementById("person-city").removeEventListener("focus", null);
  }

  getLocalizedLabel = (label) => {
    const { localizationLabels } = this.props;
    return getTranslatedLabel(label, localizationLabels);
  };

  autoSelectCity=()=>{
    const {selectCity} = this.props;
    if(selectCity)
    {
      const {cities} = this.props;
      const cityIds = jp.query(cities, "$[*].key");
      const { fieldKey, onChange } = this.props;
      if(cityIds.indexOf(selectCity)>-1)
        setTimeout(function() {
          onChange(fieldKey, selectCity);
        }, 1);
    }
  }

  prepareResultsForDisplay = (results = []) => {
    results.sort(function(a, b){
      let nameA=a.key.toLowerCase(), nameB=b.key.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1 
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
  });
    return results.map((result, index) => {
      const mappedResult = {};
      mappedResult.key = result.key;
      mappedResult.primaryText = this.getLocalizedLabel(`TENANT_TENANTS_${result.key.toUpperCase().replace(/[.:-\s\/]/g, "_")}`);
      mappedResult.id = result.key;
      return mappedResult;
    });


  };

  onCityFieldClicked = () => {
    this.setState({
      open: true,
      searchTerm: "",
    });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onItemClick = (item, index) => {
    const { key } = item;
    if (key) {
      const { fieldKey, onChange } = this.props;
      onChange(fieldKey, key);
      document.getElementById("person-city").select();
      this.onClose();
    }
  };
  onKeyPressed = (e,item) => {
    const { key } = item;
    if (e.key == 'Enter') {
      e.preventDefault();
      const { fieldKey, onChange } = this.props;
      onChange(fieldKey, key);
      document.getElementById("person-city").select();
      this.onClose();
    }
}

  autoSuggestCallback = (results = [] ,searchTerm) => {
    const {cities} = this.props;
    if(searchTerm){
      const filteredCities = cities && cities.filter(item => {
        return item.description.toLowerCase().includes(searchTerm.toLowerCase())
      });
      if (results.length === 0) {
        results.push({ key: "", text: "No City Found" });
      }
    this.setState({ results : filteredCities, searchTerm });
    }
    else{
      this.setState({searchTerm });
    }
  };

  render() {
    const { autoSuggestCallback, prepareResultsForDisplay, onClose, onCityFieldClicked, onItemClick, onKeyPressed } = this;
    const { results, searchTerm, open } = this.state;
    const { field, localizationLabels,cities } = this.props;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    return (
      <div>
        <div onClick={onCityFieldClicked}>
          <TextFieldIcon
            {...field}
            errorStyle={{ bottom: "0px" }}
            value={getCityNameByCode((field || {}).value, localizationLabels)}
            id="person-city"
            iconPosition="after"
            Icon={DownArrow}
            iconStyle={ {
              position: "absolute",
              color: "#969696",
              zIndex: 2,
              bottom: 0,
              top: 10,
            //  margin: "auto",
            }
            }
          />
        </div>
        <Dialog
          className="citipicker-dialog"
          titleStyle={{ textAlign: "left", padding: "24px 16px" }}
          handleClose={onClose}
          bodyStyle={{ padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" }}
          title={<Label label="CS_SELECT_CITY_CHOOSE_CITY" fontSize="16px" bold={true} color="#484848" containerStyle={{ padding: "20px 10px", backgroundColor: "#fff" }} />}
          modal={false}
          open={open}
          autoScrollBodyContent={true}
          onRequestClose={onClose}
          contentStyle={{ width: "90%" }}
          style={{
            paddingTop: "0",
             marginTop: "-30px",
            bottom: "0",
            height: "auto",
          }}
          isClose={true}
        >
          <AutoSuggest
            id="city-picker-search"
            dataSource={cities}
            searchInputText={<Label label="ACTION_TEST_SEARCH"  color="#727272" labelStyle={{ display:"flex", justifyContent:"left" }}/>}
            searchKey="text"
            autoFocus={true}
            callback={autoSuggestCallback}
          />
          <List
            onKeyPressed={onKeyPressed}          
            onItemClick={onItemClick}
            innerDivStyle={{ paddingLeft: "50px",color:"#484848"  }}
            listItemStyle={{ borderBottom: "1px solid #eee",color:"#484848"}}
            items={displayInitialList ? prepareResultsForDisplay(cities) : prepareResultsForDisplay(results)}
            
            
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let cities = state.common.cities || [];
 let isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
  if(!isEmployee) {
    cities =filter(cities, c => c.city.ulbGrade !=="ST" );
  }
  const localizationLabels = get(state.app, "localizationLabels", {});
  return { cities, localizationLabels };
};

export default connect(mapStateToProps)(CityPickerDialog);
