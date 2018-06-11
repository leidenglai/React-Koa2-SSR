import { connect } from 'react-redux'

/**
 * 将木偶组件变成智能组件
 * 将connect方法柯里化
 * @param  {Function} mapStateToProps
 * @param  {Object}   mapActionCreators
 * @param  {Component?}
 * @return {Connect : Container}
 */
export default function createContainer(mapStateToProps, mapActionCreators, component) {
  const connectComponent = connect(mapStateToProps, mapActionCreators)

  return component ? connectComponent(component) : connectComponent
}
