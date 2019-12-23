import apistatus from './apistatus/apistatus';
import firstReducer from './firstReducer';
import globalfilter from './globalFilter/globalFilterReducer';
import DemandAndCollectionData from './demandAndCollection/dncReducer';
import GFilterData from './globalFilter/gDataReducer';
import chartsData from './ChartsR/chartsReduser';
import language from './language/languageReducer';
import s3File from './fileUpload/fileUpload'
import s3Image from './s3Image/s3Image'

export default {
    apistatus: apistatus,
    firstReducer: firstReducer,
    globalFilter: globalfilter,
    DemandAndCollectionData: DemandAndCollectionData,
    GFilterData: GFilterData,
    chartsData: chartsData,
    lang: language,
    s3File: s3File,
    s3Image: s3Image
}