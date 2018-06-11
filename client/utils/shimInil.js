/**
 * 兼容不支持Intl的浏览器（IE10及以下和Safari）
 */
import scriptjs from 'scriptjs'

const shimInil = function(locale, ready) {
  const scripts = []
  const localePrefix = locale.substr(0, 2)
  const localeStr = locale.replace('_', '-')

  if (!window.Intl) {
    // should output by server by <script>
    scripts.push('https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js')
    scripts.push('https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en-US.js')
    // the following should be output by server template conditionally by <script>
    if (localeStr !== 'en-US') {
      scripts.push(
        `https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/${localeStr}.js`
      )
    }
    // end
  }
  // should output by server by <script>
  scripts.push('https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/en.js')
  // the following should be output by server template conditionally by <script>
  if (localePrefix !== 'en') {
    scripts.push(
      `https://as.alipayobjects.com/g/component/react-intl/2.0.0/locale-data/${localePrefix}.js`
    )
  }
  // end

  if (scripts.length) {
    scriptjs(scripts, ready)
  } else {
    ready()
  }
}

export default shimInil
