'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _defineProperty2 = require('babel-runtime/helpers/defineProperty')

var _defineProperty3 = _interopRequireDefault(_defineProperty2)

require('./index.less')

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

var _util = require('../../utils/util')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var GridContent = {
  name: 'GridContent',
  functional: true,
  props: {
    children: _vueTypes2['default'].any,
    contentWidth: _vueTypes2['default'].oneOf(['Fluid', 'Fixed']).def('Fluid')
  },
  render: function render (h, content) {
    var _classNames

    var contentWidth = content.props.contentWidth

    var children = content.children

    var propsContentWidth = (0, _util.layoutContentWidth)(contentWidth)
    var classNames = (_classNames = {}, (0, _defineProperty3['default'])(_classNames, 'ant-pro-grid-content', true), (0, _defineProperty3['default'])(_classNames, 'wide', propsContentWidth), _classNames)

    return h(
      'div',
      { 'class': classNames },
      [children]
    )
  }
}

exports['default'] = GridContent
