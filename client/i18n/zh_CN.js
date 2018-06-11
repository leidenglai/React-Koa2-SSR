import appLocaleData from 'react-intl/locale-data/zh'
import zhMessages from './locales/zh_CN.json'

const appLocale = {
  messages: { ...zhMessages },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData
}

export default appLocale
