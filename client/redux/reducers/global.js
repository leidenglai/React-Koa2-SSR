import update from 'immutability-helper'
import { SHOW_LOADING, HIDE_LOADING } from 'actions/global'

import createReducer from 'utils/createReducer'

export default createReducer(
  {
    loading: { status: false },
    logisticsCompanyList: [],
    payMethodList: [],
    countryList: []
  },
  {
    // loading动画
    [SHOW_LOADING](globalData) {
      return update(globalData, { loading: { status: { $set: true } } })
    },
    [HIDE_LOADING](globalData) {
      return update(globalData, { loading: { status: { $set: false } } })
    }
  }
)
