import React from 'react'
import { Progress } from 'antd'
/**
 * 本组件为页面头部的loading条
 */

const TopProgress = ({ globalData }) => (
  <Progress style={{...styles.progress, display: globalData.loading.status ? "initial" : "none"}} percent={100} status="active" showInfo={false} strokeWidth={5} />
)

const styles = {
  progress: {
    lineHeight: "4px",
    position: "absolute",
    top: 0,
    zIndex: 999
  }
}

export default TopProgress
