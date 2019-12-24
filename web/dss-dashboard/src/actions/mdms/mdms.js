import API from '../apis/api';
import C from '../constants';
import CONFIGS from '../../config/configs'

export default class MdmsAPI extends API {

    constructor(timeout = 2000, path, codeKey, reqBody, queryParams = null) {
        super('POST', timeout, false);
        this.type = C.MDMS;
        this.path = path;
        this.mdmsData = {};
        this.body = reqBody;
    }

    toString() { }

    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.mdmsData = res
            return true
        }
        return false
    }

    getPayload() {
        return this.mdmsData;
    }

    getBody() {
        return {
            "RequestInfo": {
                "apiId": "Rainmaker",
                "ver": ".01",
                "ts": "",
                "action": "_search",
                "did": "1",
                "key": "",
                "msgId": "20170310130900|en_IN",
                "authToken": `${localStorage.getItem('Employee.token')}`
            },
            "MdmsCriteria": {
                "tenantId": "pb.amritsar",
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
    }
    getChartKey() {
        return this.codeKey;
    }
    apiEndPoint() {
        return CONFIGS.MDMS + '?tenantId=pb.amritsar'
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('Employee.token')}`
            }
        }
    }


}