import { nprogressStart, nprogressDone } from 'actions/global'

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'ERROR']

export default function loadingBarMiddleware(config = {}) {
  const typeSuffixes = config.typeSuffixes || defaultTypeSuffixes

  return ({ dispatch }) => next => action => {
    next(action)

    if (action.type === undefined) {
      return
    }

    const [PENDING, FULFILLED, REJECTED] = typeSuffixes

    const isPending = `_${PENDING}`
    const isFulfilled = `_${FULFILLED}`
    const isRejected = `_${REJECTED}`

    if (action.type.indexOf(isPending) !== -1) {
      dispatch(nprogressStart())
    } else if (action.type.indexOf(isFulfilled) !== -1 || action.type.indexOf(isRejected) !== -1) {
      dispatch(nprogressDone())
    }
  }
}
