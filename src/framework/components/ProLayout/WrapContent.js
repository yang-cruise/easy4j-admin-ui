'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/layout/style')

var _layout = require('ant-design-vue/es/layout')

var _layout2 = _interopRequireDefault(_layout)

var _configProvider = require('ant-design-vue/es/config-provider')

var _configProvider2 = _interopRequireDefault(_configProvider)

var _GridContent = require('./components/GridContent')

var _GridContent2 = _interopRequireDefault(_GridContent)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var Content = _layout2['default'].Content

var WrapContentProps = {
  isChildrenLayout: _vueTypes2['default'].bool,
  location: _vueTypes2['default'].any,
  contentHeight: _vueTypes2['default'].number,
  contentWidth: _vueTypes2['default'].oneOf(['Fluid', 'Fixed']).def('Fluid')
}

var WrapContent = {
  name: 'WrapContent',
  props: WrapContentProps,
  render: function render (h) {
    var _$props = this.$props
        var isChildrenLayout = _$props.isChildrenLayout
        var contentWidth = _$props.contentWidth

    return h(Content, [h(
      _configProvider2['default'],
      {
        attrs: {
          getPopupContainer: function getPopupContainer (el, dialogContext) {
            if (isChildrenLayout) {
              return el.parentNode()
            }
            return document.body
          }
        }
      },
      [h(
        'div',
        { 'class': 'ant-pro-basicLayout-children-content-wrap' },
        [h(
          _GridContent2['default'],
          {
            attrs: { contentWidth: contentWidth }
          },
          [this.$slots['default']]
        )]
      )]
    )])
  }
}

exports['default'] = WrapContent
