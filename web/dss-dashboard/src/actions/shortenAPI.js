import axios from 'axios';
import CONFIGS from '../config/configs';
export default function shortenAPI( url,callback ) {
  const reqHeaders = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'                
            };
  const reqUrl = "https://egov-micro-dev.egovernments.org/egov-url-shortening/shortener";
  const reqBody = { url : url}  
  const request = axios.post(reqUrl,reqBody,reqHeaders)
    .then( response => {
      callback("",response);
    } ).catch( ( error ) => {
      console.log( error );
      callback(error,"");
    } );
}