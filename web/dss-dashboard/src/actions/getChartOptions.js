import CONFIGS from '../config/configs';

export default function getChartOptions(code, filters) {
    let url = code ? CONFIGS.BASE_URL + "/dashboard/getChartV2" : "";
    let newFilter = Object.assign({}, filters);
    let duration = newFilter.duration ? newFilter.duration : null;
    let moduleLevel = newFilter.modulelevel ? newFilter.modulelevel : "";
    delete newFilter.duration;
    delete newFilter.modulelevel;

    if (url) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': '7c77794f-1de0-43b4-b9ab-6f5e49391095'
            }
        };
        let dataoption = {
            "headers": {
                "tenantId": "pb.amritsar"
            },

            "aggregationRequestDto": {
                "visualizationType": "METRIC",
                "visualizationCode": code,
                "queryType": "",
                "filters": newFilter,
                "moduleLevel": moduleLevel,
                "aggregationFactors": null,
                "requestDate": duration
            }
        }
        return {
            url: url,
            options: options,
            dataoption: dataoption
        }
    }
}