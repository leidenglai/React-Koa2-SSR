import antdEs from './locale-provider/es_ES'
import appLocaleData from 'react-intl/locale-data/es'
import esMessages from './locales/es_ES.json'

const appLocale = {
  messages: { ...esMessages },
  antd: antdEs,
  locale: 'es-ES',
  data: appLocaleData
}

export default appLocale
