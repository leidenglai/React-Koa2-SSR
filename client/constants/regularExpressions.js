/**
 * 正则表达式 regularExpressions
 */

// 价格
export const PriceRule = /(^[1-9]\d{0,5}$)|[1-9]\d*\.\d{1,2}$|0\.\d?[1-9]$/

// 正整数
export const PositiveIntegerRule = /^[1-9]\d*$/

// 自然数
export const NaturalnumberRule = /^[0-9]+$/

// 简单的网址校验
export const UrlRule = /^https?:\/\//
