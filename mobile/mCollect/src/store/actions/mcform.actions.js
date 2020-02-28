export const FETCH_SERVICES_LOADING = 'FETCH_SERVICES_LOADING';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';

export const CREATE_DEMAND_PENDING = 'CREATE_DEMAND_PENDING';
export const CREATE_DEMAND_SUCCESS = 'CREATE_DEMAND_SUCCESS';
export const CREATE_DEMAND_ERROR = 'CREATE_DEMAND_ERROR';

export const CLEAR_DEMAND = 'CLEAR_DEMAND';

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
