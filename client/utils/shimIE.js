/**
 * 对不支持的IE浏览器进行跳转
 */

const shimIE = function() {
  if (document.all) {
    console.log('IE11-')

    return false
  } else if (/Trident\/7\./.test(navigator.userAgent)) {
    console.log('IE11')

    return false
  }
  console.log('IE11+ or not IE')

  return true // IE11以下浏览器
}

export default shimIE
