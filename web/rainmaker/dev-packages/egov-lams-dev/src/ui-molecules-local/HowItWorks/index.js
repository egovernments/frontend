import React from "react";


const gethelpURL=()=>{
  let hostname = window.location.hostname;
  
  if(hostname === 'localhost')
    hostname  = "https://13.71.65.215.nip.io";
  else  
    hostname  = window.location.origin;
  const url=new URL(hostname+"/filestore/v1/files/static?fileStoreId=LRMSUserManual_Citizen.pdf");
  return url;

}

const HowItWorks = (props) => {

const helpURL =gethelpURL();

  return (
    <div style={{ height: "100vh" }}>
          <iframe
    src = {helpURL}
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

