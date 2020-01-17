import API from '../apis/api';
import C from '../constants';
import CONFIGS from '../../config/configs';

export default class TenentAPI extends API {

    constructor(timeout = 2000, path, reducerType, reqBody, queryParams = null) {
        super('POST', timeout, false);
        this.type = reducerType;
        this.path = path;
        this.tenents = {};
        this.body = reqBody;
    }

    toString() { }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            console.log(res)
            this.s3File = res;
            return true
        }
        return false
    }

    getPayload() {
        return this.mdmsData;
    }

    getBody() {
        console.log('-------------------------------------------------',this.body)
        return this.body
        // return {
        //    "RequestInfo": {
        //        "authToken": ""
        //    },
        //    "MdmsCriteria": {
        //        "tenantId": "pb",
        //        "moduleDetails": [
        //         {
        //         "moduleName": "tenant",
        //         "masterDetails": [
        //         {
        //         "name": "tenants"
        //         }]
        //         }
        //        ]
        //    }
        // }
    }
    getChartKey() {
        return this.codeKey;
    }
    apiEndPoint() {
        return CONFIGS.MDMS 
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }


}