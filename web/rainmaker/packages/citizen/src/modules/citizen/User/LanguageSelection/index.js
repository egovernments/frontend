import React, { Component } from "react";
import { connect } from "react-redux";
import { Banner } from "modules/common";
import { LanguageSelectionForm } from "modules/common";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale,getIsMobileView } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import {DisclaimerInformation} from "modules/common";
import {LanguageSelectionHeader} from "modules/common";
import './index.css'
import  digit from './digit.png'
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

class LanguageSelection extends Component {
  state = {
    value: getLocale()
  };

  componentDidMount = async () => {
    let lang = getQueryArg(window.location.href, "lang");
    if(["en_IN","hi_IN"].indexOf(lang) > -1)
      this.onClick(lang);
  }

  onClick = (value) => {
    this.setState({ value });
    this.props.fetchLocalizationLabel(value);
  };

  onChange = (event)=>{
    this.setState({value:event.value})
    this.props.fetchLocalizationLabel(event.value);
  }


  onLanguageSelect = () => {
    
    let url = "/user/login?";
    if(getQueryArg(window.location.href, "cant"))
      url=url+"cant="+getQueryArg(window.location.href, "cant")+"&";
    if(getQueryArg(window.location.href, "lang"))
      url=url+"lang="+getQueryArg(window.location.href, "lang")+"&";
    this.props.history.push(url);  

  };

  render() {

    const { value,isMobile } = this.state;
    const { onLanguageSelect, onClick,isMobileView,onChange } = this;
    const { bannerUrl, logoUrl, languages,regionalLanguages,commonLanguages } = this.props;
    return (

      <div>
        {/* <div>
          <LanguageSelectionHeader/>
        </div> */}
        <Banner className="language-selection" bannerUrl={bannerUrl} logoUrl={logoUrl}>
          <div>
            <LanguageSelectionForm items={languages} value={value} onLanguageSelect={onLanguageSelect} onClick={onClick} regionalLanguages ={regionalLanguages} commonLanguages ={commonLanguages} onChange={onChange}/>
          </div>
        </Banner>
        {/* <div className="Wrapper">
         <div className="Left">
          <DisclaimerInformation/>
        </div>
        <div className="Right">
            <div>
                     <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> Powered by </label>&nbsp; &nbsp;
                     <img src={digit} alt="Logo" width="20px" height="20px" />
                     <label style={{ fontFamily:'Roboto',color:'whitesmoke' }}> DIGIT</label> 
            </div>
        </div>

        </div> */}
      <div>
        <DisclaimerInformation/>
      </div> 

      </div>     
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { stateInfoById } = common;
  let bannerUrl = get(stateInfoById, "0.bannerUrl");
  let logoUrl = get(stateInfoById, "0.logoUrl");
  let languages = get(stateInfoById, "0.languages", []);
  let regionalLanguages = get(stateInfoById, "0.languagesRegional", []);
  let commonLanguages = get(stateInfoById, "0.languagesCommon", []);
  return { bannerUrl, logoUrl, languages,regionalLanguages,commonLanguages};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelection);
