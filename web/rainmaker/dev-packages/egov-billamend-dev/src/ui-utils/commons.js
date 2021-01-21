import commonConfig from "config/common.js";
import {
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { uploadFile } from "egov-ui-framework/ui-utils/api";
import { acceptedFiles } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "./api";

export const handleFileUpload = (event, handleDocument, props) => {
  const S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  let uploadDocument = true;
  const { maxFileSize, formatProps, moduleName } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(formatProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      if (uploadDocument) {
        if (file.type.match(/^image\//)) {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          handleDocument(file, fileStoreId);
        } else {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            moduleName,
            file,
            commonConfig.tenantId
          );
          handleDocument(file, fileStoreId);
        }
      }
    });
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};
export const isFileValid = (file, acceptedFiles) => {
  const mimeType = file["type"];
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};



export const getBillAmendSearchResult = async (queryObject, dispatch) => {
  try {
    let qo={
      "amendmentId": '3edf1f2d-761e-4e8b-a990-505b648cf5eb'
    }
    queryObject.map(query=>
qo[query.key]=query.value
    )
    let newQuery=[];
  Object.keys(qo).map(key=>{
    newQuery.push({
      key: key,
      value:qo[key]
    })
  })

    const response = await httpRequest(
      "post",
      "/billing-service/amendment/_search",
      "_search",
      newQuery
    );

    return response;
  } catch (error) {
    console.error(error);
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};


export const searchBill = async (queryObject, dispatch) => {
  try {
    let newQuery={};
    queryObject.map(query=>{
      newQuery[query.key]=query.value
    })  
    let newQueryObj=[
      {
        "key": 'tenantId',
        "value":newQuery['tenantId']
      },{
        "key": 'service',
        "value":newQuery['businessService']
      },{
        "key": 'consumerCode',
        "value":newQuery['consumerCode']
      }
    ];
    
    const response = await httpRequest(
      "post",
      "/billing-service/bill/v2/_search",
      "_search",
      newQueryObj
    );
    console.log('resa',response);
    return response;
  } catch (error) {
    console.error(error);
    dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};
