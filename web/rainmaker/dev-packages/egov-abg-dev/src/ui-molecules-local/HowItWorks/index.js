import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import { LabelContainer } from "egov-ui-framework/ui-containers";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import IconButton from "@material-ui/core/IconButton";
// import KeyboardRightIcon from "@material-ui/icons/KeyboardArrowRight";



const HowItWorks = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      {/* <iframe
        src="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/TL_UserManual_Citizen.pdf#view=FitH&embedded=true"
        style={{ width: "100%", height: "90%" }}
        frameborder="0"
      /> */}
          <iframe
    src="https://docs.google.com/gview?embedded=true&url=https://raw.githubusercontent.com/belegovgithub/webaccess/master/pdf/BillGenieUserManual_Citizen.pdf#toolbar=0&scrollbar=0"
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></iframe>
      {/* <p>
        Your web browser doesn't have a PDF plugin. Instead you can{" "}
        <a href="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/TL_UserManual_Citizen.pdf">click here to download the PDF file.</a>
      </p> */}
    </div>
  );
};

export default HowItWorks;


