import React from "react";
import { Icon } from "components";
import { Screen } from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import Label from "egov-ui-kit/utils/translationNode";
import { httpRequest } from "egov-ui-kit/utils/api";
import { List } from "egov-ui-kit/components";
import Input from '@material-ui/core/Input';
import get from "lodash/get";
import queryString from 'query-string';
import "./index.css";
import commonConfig from "config/common";
import { MDMS } from "egov-ui-kit/src/utils/endPoints"

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

class WhatsAppCity extends React.Component {
  state = {
    searchText: "",
    data: [],
    citylist: [],
    phone: undefined,
    stateId:undefined,
  };
  getListItems = items =>
    items.map((item) => ({
      primaryText: (
        <Label
          label={item.label}
          fontSize="16px"
          color="#484848"
          labelStyle={{ fontWeight: 500 }}
        />
      )
    }));
  getMDMSData = async (stateId) => {
    let mdmsBody = {

      MdmsCriteria: {
        tenantId:stateId || "pb.amritsar",
        moduleDetails: [
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "citymodule"
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

  componentDidMount = async () => {
    const values = queryString.parse(this.props.location.search)
    const phone = values.phone;
    const stateId = values.tenantId;
    this.setState({
      phone: phone,
    })
    this.setState({
      stateId: stateId,
    })


    const citydata = await this.getMDMSData(stateId);
    console.log("aa",citydata)
    const citylistCodeModule = get(citydata, "MdmsRes.tenant.citymodule", []);
    const citylistCode=citylistCodeModule.filter(item=>item.module==="PGR.WHATSAPP")[0].tenants
    const citylist = citylistCode.map((item) => {
      return {
        code: item.code,
        label: item.name 
      }
    })

    this.setState({
      citylist: citylist,
    })
  };



  onChangeText = (searchText, citylist) => {
    this.setState({ searchText });
    //logic to like search on items    
    const filterData = citylist.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));
    this.setState({
      data: filterData,
    })
    if (searchText === "") {
      this.setState({
        data: citylist,
      })
    }
  };

  render() {
    const { classes } = this.props;
    const { citylist } = this.state;
    const { onChangeText } = this;


    return (
      <div>
        <div className="search-background">
          <div className="header-iconText">
            {/* <Icon id="back-navigator" action="navigation" name="arrow-back" /> */}
            <Label
              label="CHOOSE CITY"
              color="white"
              fontSize={18}
              bold={true}
              containerStyle={{ marginLeft: 30, marginTop: -2 }}
            />

          </div>

          <div className={`${classes.root} dashboard-search-main-cont`}>
            <Icon action="action" name="search" style={{ marginLeft: 12 }} />
            <Input
              placeholder="Search City"
              disableUnderline={true}
              fullWidth={true}
              //className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={(e) => {
                onChangeText(e.target.value, citylist);

              }}
            />
          </div>
        </div>
        <Screen className="whatsappScreen">
          <List
            items={this.getListItems(this.state.data)}
            primaryTogglesNestedList={true}
            onItemClick={(item, index) => {
              const number = this.state.phone || commonConfig.whatsappNumber;
              const name=item.primaryText.props.label;
              const weblink = "https://api.whatsapp.com/send?phone=" + number + "&text=" + name;
              window.location.href = weblink
            }}
            listItemStyle={{ borderBottom: "1px solid grey" }}


          />
        </Screen>

      </div>
    );
  }
}


export default withStyles(styles)(
  (WhatsAppCity)
);
