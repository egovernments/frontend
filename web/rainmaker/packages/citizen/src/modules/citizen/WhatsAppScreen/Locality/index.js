import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "components";
import commonConfig from "config/common";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { List } from "egov-ui-kit/components";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getLocale, setLocale, setModule } from "egov-ui-kit/utils/localStorageUtils";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import { Screen } from "modules/common";
import queryString from 'query-string';
import React from "react";
import { connect } from "react-redux";
// import "./index.css";
import { MDMS } from "egov-ui-kit/src/utils/endPoints";


const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    // margin: "0px 8px"
    marginLeft: "8px",
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

class WhatsAppLocality extends React.Component {
  state = {
    searchText: "",
    data: [],
    localitylist: [],
    cityname: undefined,
    phone: undefined,
  };

  componentDidMount = async () => {
    const values = queryString.parse(this.props.location.search)
    const cityname = values.tenantId;
    const phone = values.phone;
    // fetchLocalizationLabel(getLocale(), cityname ||"pb.amritsar", cityname||"pb.amritsar");
    this.setState({
      phone: phone,
    })
    this.setState({
      cityname: cityname,
    })

    const localitydata = await this.getMDMSData(cityname);
    const localityistCode = get(localitydata, "MdmsRes.egov-location.TenantBoundary", []);
    const localitylist = localityistCode.map((item) => {
      return {
        code: item.code,
        label: item.name
      }
    })

    this.setState({
      localitylist: localitylist,
    })
    let locale = getQueryArg(window.location.href, "locale") || 'en_IN';
    setLocale(locale);
    setModule('rainmaker-common');
    this.props.fetchLocalizationLabel(getLocale(),cityname,cityname);
  };


  getMDMSData = async (cityName) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: cityName || "pb.amritsar",
        moduleDetails: [
          {
            moduleName: "egov-location",
            masterDetails: [
              {
                name: "TenantBoundary", filter: `[?(@.hierarchyType.code == "ADMIN")].boundary.children.*.children.*.children.*`
              }
            ]
          },
        ]
      }
    };
    try {
      const payload = await httpRequest(
        MDMS.URL,
        "_search",
        [],
        mdmsBody
      );
      return payload;

    } catch (e) {
      console.log(e);
    }
  };

  getConnvertedString =(code='')=>{
    return `${this.state.cityname.split('.')[0].toUpperCase()}_${this.state.cityname.split('.')[1].toUpperCase()}_REVENUE_${code}`;
  }
  getListItems = items =>
    items.map((item) => ({
      primaryText: (
        <Label
          label={this.getConnvertedString(item.code)}
          fontSize="16px"
          color="#484848"
          labelStyle={{ fontWeight: 500 }}
        />
      )

    }));


  onChangeText = (searchText, localitylist, dataSource, params,) => {
    this.setState({ searchText });
    //logic to like search on items    
    const filterData = localitylist.filter(item => getLocaleLabels(this.getConnvertedString(item.code),this.getConnvertedString(item.code)).toLowerCase().includes(searchText.toLowerCase()));
    this.setState({
      data: filterData,
    })
    if (searchText === "") {
      this.setState({
        data: localitylist,
      })
    }
  };

  render() {
    const { classes } = this.props;
    const { localitylist } = this.state;
    const { onChangeText } = this;


    return (
      <div>
        <div className="search-background">
          <div className="header-iconText">
            {/* <Icon id="back-navigator" action="navigation" name="arrow-back" /> */}
            <Label
              label="Search and choose Locality"
              color="white"
              fontSize={18}
              bold={true}
              containerStyle={{ marginLeft: 20, marginTop: -2 }}
            />

          </div>

          <div className={`${classes.root} dashboard-search-main-cont`}>
            <Icon action="action" name="search" style={{ marginLeft: 12 }} />
            <Input
              placeholder="Start typing to search your Locality"
              disableUnderline={true}
              fullWidth={true}
              //className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={(e) => {
                onChangeText(e.target.value, localitylist);

              }}
            />
          </div>
        </div>
        {(this.state.data.length === 0 && this.state.searchText === "") &&
          <Screen className="whatsappScreen">
            <Label
              label="Please start typing to search and choose locality"
              fontSize="30px"
              color="#808080"
              labelStyle={{ fontWeight: 500, marginTop: 166, textAlign: "center" }}
            />

          </Screen >

        }
        <Screen className="whatsappScreen">
          <List
            items={this.getListItems(this.state.data)}
            primaryTogglesNestedList={true}
            onItemClick={(item, index) => {
              const number = this.state.phone || commonConfig.whatsappNumber;
              const name = getLocaleLabels(item.primaryText.props.label, item.primaryText.props.label);
              const weblink = "https://api.whatsapp.com/send?phone=" + number + "&text=" + name;
              window.location.href = weblink
            }}
            listItemStyle={{ borderBottom: "1px solid grey" }}
            style={{ marginTop: 66 }}
          />


        </Screen >
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchLocalizationLabel: (locale, moduleName, tenantId) => dispatch(fetchLocalizationLabel(locale, moduleName, tenantId)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(
  (WhatsAppLocality)
));