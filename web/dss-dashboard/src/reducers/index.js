import apistatus from './apistatus/apistatus';
import firstReducer from './firstReducer';
import globalfilter from './globalFilter/globalFilterReducer';
import DemandAndCollectionData from './demandAndCollection/dncReducer';
import GFilterData from './globalFilter/gDataReducer';

export default {
    apistatus: apistatus,
    firstReducer: firstReducer,
    globalFilter: globalfilter,
    DemandAndCollectionData: DemandAndCollectionData,
    GFilterData: GFilterData
}