import React from "react";
import { connect } from "react-redux";
// import AppBar from "@material-ui/core/AppBar";
import "./index.css";
import {
  getLocale,
  getTenantId,
  getUserInfo
} from "egov-ui-kit/utils/localStorageUtils";
import digitLogo from "egov-ui-kit/assets/images/Digit_logo.png";
import get from "lodash/get";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import Header from "egov-ui-kit/common/common/Header";

const getUlbGradeLabel = ulbGrade => {
  if (ulbGrade) {
    let ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

class HeaderContainer extends React.Component {
  state = {
    languageSelected: getLocale(),
    toggleMenu: false
  };
  style = {
	  headerStyle:{
		marginLeft: "-16px",
		paddingTop: "1px"
	  }
  };


  onLanguageChange = (event, index, value) => {
    //const {setRote} = this.props;
    this.setState({ languageSelected: value });
    let tenantId = getTenantId();

    // if (process.env.REACT_APP_NAME === "Citizen") {
    //   const tenantInfo = getQueryArg(window.location.href, "tenantId");
    //   const userInfo = JSON.parse(getUserInfo());
    //   tenantId = userInfo && userInfo.permanentCity;
    //   tenantId = tenantInfo ? tenantInfo : tenantId;
    // }
    this.props.fetchLocalizationLabel(value, tenantId, tenantId);
  };

  render() {
    const {
      ulbLogo,
      defaultTitle,
      ulbName,
      hasLocalisation,
      languages,
      fetchLocalizationLabel,
      ...rest
    } = this.props;
    const { languageSelected, toggleMenu } = this.state;
	const options = {isHomeScreen:true, hideBackButton:true};
    const { style, _handleItemClick, _onUpdateMenuStatus } = this;
	return (
		<Header
		hasLocalisation={true}
		className={"rainmaker-header"} 
		options={options}
		role={"employee"}
		isUserSetting={false}
		headerStyle={style.headerStyle} {...rest} />
	)
  }
}
const mapStateToProps = state => {
  let { stateInfoById } = state.common || [];
  let hasLocalisation = false;
  const cities = state.common.cities || [];
  const tenantId = getTenantId() || process.env.REACT_APP_DEFAULT_TENANT_ID;
  const userTenant = cities && cities.filter(item => item.code === tenantId);
  const ulbGrade = userTenant && get(userTenant[0], "city.ulbGrade");
  const ulbName = userTenant && get(userTenant[0], "code");
  const defaultTitle = ulbGrade && getUlbGradeLabel(ulbGrade);
  const ulbLogo =
    userTenant.length > 0
      ? get(userTenant[0], "logoId")
      : "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb.amritsar/logo.png";
  let languages = get(stateInfoById, "0.languages", []);
  if (stateInfoById && stateInfoById.length > 0) {
    hasLocalisation = stateInfoById[0].hasLocalisation;
    // defaultUrl = stateInfoById[0].defaultUrl;
  }
  return {
    hasLocalisation,
    ulbLogo,
    ulbName,
    defaultTitle,
    languages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLocalizationLabel: (locale, tenants, tenant) =>
      dispatch(fetchLocalizationLabel(locale, tenants, tenant))
  };
};

export default HeaderContainer;
