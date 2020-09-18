import React from "react";

const HowItWorks = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      {/* <iframe
  
        //src="https://raw.githubusercontent.com/belegovgithub/egov-mdms-data/BEL-v2/data/pb/TLHelp/PGRUserManual.pdf#view=FitH&embedded=true"
        src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://raw.githubusercontent.com/belegovgithub/egov-mdms-data/BEL-v2/data/pb/TLHelp/PGRUserManual.pdf#toolbar=0&scrollbar=0&view=FitH&embedded=true"
        style={{ width: "100%", height: "90%" }}
        frameborder="0"
      /> */}
    <iframe
    src="https://belegovgithub.github.io/webaccess/pdf/PGRUserManual.pdf#view=FitH&embedded=true"
    style={{ width: "100%", height: "90%" }}
    frameborder="0"
></iframe>
      
      
      {/* <p>
        Your web browser doesn't have a PDF plugin. Instead you can{" "}
        <a href="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/TL_UserManual_Citizen.pdf">click here to download the PDF file.</a>
      </p> */}
    </div>
  );
};

export default HowItWorks;
