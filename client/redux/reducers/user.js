import update from 'immutability-helper'
import createReducer from 'utils/createReducer'
import { LOG_IN_SUCCESS } from 'actions/account'

export default createReducer(
  {
    sellerInfo: {},
    storeInfo: {}
  },
  { [LOG_IN_SUCCESS]: (userData, { payload }) => update(userData, { $merge: payload }) }
)
