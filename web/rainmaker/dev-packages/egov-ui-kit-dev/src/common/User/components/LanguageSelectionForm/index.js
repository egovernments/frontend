import React from "react";
import { ButtonGroup, Card, Image , AutoSuggestDropdown} from "components";
import { Button} from "egov-ui-framework/ui-atoms";
import Label from "egov-ui-kit/utils/translationNode";
import logo from "egov-ui-kit/assets/images/logo_black.png";
import filter from "lodash/filter";
import "./index.css";




const selectedLabelStyle = {
  color: "#ffffff",
};

const selectedStyle = {
  backgroundColor: "#fe7a51",
  border: "1px solid #fe7a51",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",          
  lineHeight: "44px",
  width: "28.48%",
  padding: "0 16px",
  marginBottom : "10px"
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0,
};
const getDropdownLabel = (value, data) => {
  const object = filter(data, { value });
  let label = "";
  if (object.length > 0) {
    label = object[0].label;
  }
  return label;
};


const LanguageSelectionForm = ({ items, onLanguageSelect, value, onClick,regionalLanguages,commonLanguages,onChange }) => {

  return (
    <Card
      className="col-sm-offset-4 col-sm-4 user-screens-card language-selection-card"
      textChildren={
        <div>
           <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
            <div style={{ marginBottom: "24px" }}>
              <Image className="mseva-logo" source={`${logo}`} />
            </div >
          </div>
        <form>
           <div className="rainmaker-displayInline" style={{ justifyContent: "center" }}>
              {commonLanguages &&
                commonLanguages.map((item, index) => {
                  return (
                    <div>
                      <Label bold={true} label={`LANGUAGE_${item.value.toUpperCase()}`} className="language-label" />
                      {index !== items.length - 1 && <span>|</span>}
                    </div>
                  );
                })}
            </div>
             
            <div className="button-toggle-container">
              <ButtonGroup
                items={commonLanguages}
                onClick={onClick}
                selected={value}
                defaultStyle={defaultStyle}
                defaultLabelStyle={defaultLabelStyle}
                selectedStyle={selectedStyle}
                selectedLabelStyle={selectedLabelStyle}
                multiple={false}
              />
            </div>


            <div className="button-toggle-container">
            <AutoSuggestDropdown
            dataSource={regionalLanguages}
            fullWidth={false}
            value={getDropdownLabel(value,regionalLanguages)}
            hintText="Select" 
            hintStyle={{fontSize: "14px",color: "#767676"}}
            floatingLabelText={
              <div className="rainmaker-displayInline">
                <Label
                  className="show-field-label-list"
                  label= "SELECT_REGIONAL_LANGUAGE"
                  containerStyle={{ marginRight: "5px" }}
                  style={{ fontSize: "16px !important"}}
                />
              </div>
            }
             onChange={onChange} 
            
           
          />  
           </div>


            <div className="button-container">
            <Button
            id="continue-action"
            className="lang-continue-button"
            style={{
              height: "48px",     
              width:"100%"        
            }}
            variant={"contained"}
            color={"primary"}
            onClick={onLanguageSelect}
          >
            <Label buttonLabel={true}   labelStyle={{fontWeight:500 }}  label="CORE_COMMON_CONTINUE" />
          </Button>
              {/* <Button
                id="continue-action"
                className="lang-continue-button"
              
                label={}
                fullWidth={true}
              /> */}
            </div>
          </form>
        </div>
      }
    />
  );
};

export default LanguageSelectionForm;
