export const FETCH_BILL_LOADING = 'FETCH_BILL_LOADING';
export const FETCH_BILL_SUCCESS = 'FETCH_BILL_SUCCESS';
export const FETCH_BILL_ERROR = 'FETCH_BILL_ERROR';

export const CREATE_PAYMENT_PENDING = 'CREATE_PAYMENT_PENDING';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_ERROR = 'CREATE_PAYMENT_ERROR';

export const CLEAR_PAYMENT = 'CLEAR_PAYMENT';

export const fetchBillLoading = () => {
  return {
    type: FETCH_BILL_LOADING,
  };
};

export const fetchBillSuccess = bill => {
  return {
    type: FETCH_BILL_SUCCESS,
    bill,
  };
};

export const fetchBillError = error => {
  return {
    type: FETCH_BILL_ERROR,
    error,
  };
};

export const createPaymentPending = () => {
  return {
    type: CREATE_PAYMENT_PENDING,
  };
};

export const createPaymentSuccess = payment => {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payment,
  };
};

export const createPaymentError = error => {
  return {
    type: CREATE_PAYMENT_ERROR,
    error,
  };
};

export const clearPayment = () => {
  return {
    type: CLEAR_PAYMENT,
  };
};
