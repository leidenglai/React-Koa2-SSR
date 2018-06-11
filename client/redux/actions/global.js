// loading动画
export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'

export function nprogressStart() {
  return { type: SHOW_LOADING }
}

export function nprogressDone() {
  return { type: HIDE_LOADING }
}
