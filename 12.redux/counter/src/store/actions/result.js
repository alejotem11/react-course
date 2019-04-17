import * as actionTypes from './actionTypes';

export const deleteResult = resultElId => ({ type: actionTypes.DELETE_RESULT, resultElId });

const storeResult = result => ({ type: actionTypes.STORE_RESULT, result });
export const storeResultAsync = result => {
  return dispatch => {
    setTimeout(() => {
      dispatch(storeResult(result));
    }, 2000);
  };
};