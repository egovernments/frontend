export const FETCH_SERVICES_LOADING = 'FETCH_SERVICES_LOADING';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';

export const CREATE_DEMAND_PENDING = 'CREATE_DEMAND_PENDING';
export const CREATE_DEMAND_SUCCESS = 'CREATE_DEMAND_SUCCESS';
export const CREATE_DEMAND_ERROR = 'CREATE_DEMAND_ERROR';

export const FETCH_MOHALLA_LOADING = 'FETCH_MOHALLA_LOADING';
export const FETCH_MOHALLA_SUCCESS = 'FETCH_MOHALLA_SUCCESS';
export const FETCH_MOHALLA_ERROR = 'FETCH_MOHALLA_ERROR';

export const CLEAR_DEMAND = 'CLEAR_DEMAND';

export const CREATE_CHALLAN_PENDING = 'CREATE_CHALLAN_PENDING';
export const CREATE_CHALLAN_SUCCESS = 'CREATE_CHALLAN_SUCCESS';
export const CREATE_CHALLAN_ERROR = 'CREATE_CHALLAN_ERROR';
export const CLEAR_CHALLAN = 'CLEAR_CHALLAN';
import {ToastAndroid} from 'react-native';

const displayToast = (msg) => {

  ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT, //can be SHORT, LONG
    ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
  );
};

export const fetchServicesLoading = () => {
  return {
    type: FETCH_SERVICES_LOADING,
  };
};

export const fetchServicesSuccess = services => {
  return {
    type: FETCH_SERVICES_SUCCESS,
    services,
  };
};

export const fetchServicesError = error => {
  return {
    type: FETCH_SERVICES_ERROR,
    error,
  };
};


export const fetchMohallaLoading = () => {
  return {
    type: FETCH_MOHALLA_LOADING,
  };
};

export const fetchMohallaSuccess = mohallaData => {
  return {
    type: FETCH_MOHALLA_SUCCESS,
    mohallaData,
    
  };
};

export const fetchMohallaError = error => {
  return {
    type: FETCH_MOHALLA_ERROR,
    error,
  };
};
export const createDemandPending = () => {
  return {
    type: CREATE_DEMAND_PENDING,
  };
};

export const createDemandSuccess = demand => {
  return {
    type: CREATE_DEMAND_SUCCESS,
    demand,
  };
};

export const createDemandError = error => {
  return {
    type: CREATE_DEMAND_ERROR,
    error,
  };
};

export const clearDemand = () => {
  return {
    type: CLEAR_DEMAND,
  };
};

export const createChallanPending = () => {
  return {
    type: CREATE_CHALLAN_PENDING,
  };
};

export const createChallanSuccess = challans => {
  return {
    type: CREATE_CHALLAN_SUCCESS,
    challans,
  };
};

export const createChallanError = error => {
  displayToast("Challan creation failed.")
  return {
    type: CREATE_CHALLAN_ERROR,
    error,
  };
};

export const clearChallan = () => {
  return {
    type: CLEAR_CHALLAN,
  };
};

