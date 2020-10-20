import React from "react";
import { UploadDrawer } from "egov-ui-kit/components";

const UploadDrawerLabelStyle = {
  fontFamily: "Roboto",
  fontSize: "14px",
  letterSpacing: "0.3px",
};

const UploadDrawerView = ({ setProfilePic, removeFile, onClickAddPic, openUploadSlide }) => {
  return (
    <UploadDrawer
      openUploadSlide={openUploadSlide}
      galleryIcon={true}
      removeIcon={true}
      removeFile={removeFile}
      labelStyle={UploadDrawerLabelStyle}
      uploadfile={setProfilePic}
      closeDrawer={onClickAddPic}
    />
  );
};

export default UploadDrawerView;
