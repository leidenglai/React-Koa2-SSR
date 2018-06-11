import antdTr from 'antd/lib/locale-provider/en_US' // 暂用英文
import appLocaleData from 'react-intl/locale-data/tr'
import trMessages from './locales/tr_TR.json'

const appLocale = {
  messages: { ...trMessages },
  antd: antdTr,
  locale: 'tr',
  data: appLocaleData
}

export default appLocale
