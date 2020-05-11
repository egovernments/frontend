import React from "react";

const FnHowItWorks = (props) => {
  return (
    <div style={{ height: "100vh" }}>

      <iframe
        src="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/Fire_NOC_Help_Doc.pdf"
        style={{ width: "100%", height: "90%" }}
        frameborder="0"
      />
      {/* <p>
        Your web browser doesn't have a PDF plugin. Instead you can{" "}
        <a href="https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb/TL_UserManual_Citizen.pdf">click here to download the PDF file.</a>
      </p> */}
    </div>
  );
};

export default FnHowItWorks;
