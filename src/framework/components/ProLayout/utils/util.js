'use strict'
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.isFun = exports.getComponentFromProp = exports.inBrowser = exports.triggerEvent = exports.layoutContentWidth = exports.contentWidthCheck = undefined
exports.genThemeToString = genThemeToString
exports.genStringToTheme = genStringToTheme

var _triggerEvent = require('ant-design-vue/es/_util/triggerEvent')

var _triggerEvent2 = _interopRequireDefault(_triggerEvent)

var _env = require('ant-design-vue/es/_util/env')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var getComponentFromProp = function getComponentFromProp (instance, prop) {
  var slots = instance.slots && instance.slots()
  return slots[prop] || instance.props[prop]
}

var isFun = function isFun (func) {
  return typeof func === 'function'
}

// 兼容 0.3.4~0.3.8
var contentWidthCheck = exports.contentWidthCheck = function contentWidthCheck (contentWidth) {
  return Object.prototype.toString.call(contentWidth) === '[object Boolean]' ? contentWidth === true && 'Fixed' || 'Fluid' : contentWidth
}

var layoutContentWidth = exports.layoutContentWidth = function layoutContentWidth (contentType) {
  return contentType !== 'Fluid'
}

var themeConfig = {
  daybreak: 'daybreak',
  '#1890ff': 'daybreak',
  '#F5222D': 'dust',
  '#FA541C': 'volcano',
  '#FAAD14': 'sunset',
  '#13C2C2': 'cyan',
  '#52C41A': 'green',
  '#2F54EB': 'geekblue',
  '#722ED1': 'purple'
}

var invertKeyValues = function invertKeyValues (obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[obj[key]] = key
    return acc
  }, {})
}

/**
 * #1890ff -> daybreak
 * @param val
 */
function genThemeToString (val) {
  return val && themeConfig[val] ? themeConfig[val] : val
}

/**
 * daybreak-> #1890ff
 * @param val
 */
function genStringToTheme (val) {
  var stringConfig = invertKeyValues(themeConfig)
  return val && stringConfig[val] ? stringConfig[val] : val
}

exports.triggerEvent = _triggerEvent2['default']
exports.inBrowser = _env.inBrowser
exports.getComponentFromProp = getComponentFromProp
exports.isFun = isFun
