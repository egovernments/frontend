import React from "react";
import { Card, TextFieldIcon, TextField, AutoSuggestDropdown } from "components";
import { Link } from "react-router-dom";
import TrackIcon from "material-ui/svg-icons/maps/my-location";
import Label from "egov-ui-kit/utils/translationNode";


const LocationDetails = ({ formKey, locationDetails, landmark, city, mohalla, houseNo, panchayat, handleFieldChange }) => {
  return (
    <div className="location-details-main-cont">
      <Card
        className="location-details-card common-padding-for-new-complaint-card"
        textChildren={
          <div>
            <Link to={`/map?${formKey}`}>
              <TextFieldIcon
                id="addComplaint-location-details"
                iconStyle={{ marginTop: "9px" }}
                {...locationDetails}
                iconPosition="after"
                Icon={TrackIcon}
                name="location-details"
              />
            </Link>
            {/* <DropDown
              className="fix-for-layout-break"
              fullWidth={true}
              onChange={(e, value, selectedValue) => handleFieldChange("city", selectedValue)}
              {...city}
            /> */}
            <AutoSuggestDropdown
              className="fix-for-layout-break"
              fullWidth={true}
              dataSource={city && city.dropDownData}
              onChange={(chosenCity, index) => {
                handleFieldChange("city", chosenCity.value);
              }}
              //onChange={(e, value, selectedValue) => handleFieldChange("city", selectedValue)}
              {...city}
            />
            <AutoSuggestDropdown
              className="fix-for-layout-break"
              fullWidth={true}
              dataSource={mohalla && mohalla.dropDownData}
              onChange={(chosenRequest, index) => {
                handleFieldChange("mohalla", chosenRequest.value);
              }}
              floatingLabelText={mohalla && mohalla.floatingLabelText}
              {...mohalla}
            />
            <TextField id="addComplaint-house-no" {...houseNo} onChange={(e, value) => handleFieldChange("houseNo", value)} name="house-no" />
            { <TextField
              id="addComplaint-landmark-details"
              {...landmark}
              onChange={(e, value) => handleFieldChange("landmark", value)}
              name="landmark-details"
            /> }

            <TextField
              id="addComplaint-panchayat-details"
              {...panchayat}
              onChange={(e, value) => handleFieldChange("panchayat", value)}
              name="panchayat-details"
            />

            <Label
              id="addComplaint-disclaimer-message"
              label="CS_COMPLAINT_DISCLAIMER_LABEL"
              dynamicArray={['Priya']} 
            />


          </div>
        }
      />
    </div>
  );
};



export default LocationDetails;
