import _ from 'lodash';
import axios from 'axios';
import CONFIGS from '../config/configs';

export default function getMDMSData(){

    let options = {
            'headers': {
                    'Content-Type': 'application/json'
                    }
            }
    let dataoption = {
           "RequestInfo": {
               "authToken": ""
           },
           "MdmsCriteria": {
               "tenantId": "pb",
               "moduleDetails": [
                {
                "moduleName": "tenant",
                "masterDetails": [
                {
                "name": "tenants"
                }]
                }
               ]
           }
        }

    let url = CONFIGS.BASE_URL + CONFIGS.MDMS;
    axios.post(url, dataoption, options)
      .then(response => {            
            //this.setState({data:response.data})
            return response.data
        })
      .catch(error => {
        console.log(error.response)
    }); 


 /* return fetch(`${baseURL}/api/status`).then(res => {
    return res.json();
  });*/
};