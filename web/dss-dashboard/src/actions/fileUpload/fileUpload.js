/**
 * Dashboard API
 */
import API from '../apis/api';
import C from '../constants';

export default class FileUploadAPI extends API {
    constructor(timeout = 2000, path, reqBody, queryParams = null) {
        super('POST', timeout, false, 'MULTIPART');
        this.type = C.FILE_UPLOAD;
        this.path = path;
        this.s3File = {};
        this.body = reqBody;
    }

    toString() {}

    processResponse(res) {
        debugger
        super.processResponse(res);
        if (res) {
            console.log(res)
            this.s3File = res;
            return true
        }
        return false
    }

    getPayload() {
        return this.s3File;
    }

    getFormData() {
        var data = new FormData();
        data.append("file", this.body);
        return data;

    }
    getChartKey() {
        return this.codeKey;
    }
    apiEndPoint() {
        return `${super.apiEndPoint()}/${this.path}/files`
    }

    getHeaders() {
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json',
                "type": "formData",
                'auth-token': `${localStorage.getItem('Employee.token')}`
            }
        }
    }


}