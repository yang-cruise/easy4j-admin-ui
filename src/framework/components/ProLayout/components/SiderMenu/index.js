'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.SiderMenuProps = exports.SiderMenu = undefined

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props')

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps)

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

require('./index.less')

require('ant-design-vue/es/drawer/style')

var _drawer = require('ant-design-vue/es/drawer')

var _drawer2 = _interopRequireDefault(_drawer)

var _SiderMenu = require('./SiderMenu')

var _SiderMenu2 = _interopRequireDefault(_SiderMenu)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var SiderMenuWrapper = {
  name: 'SiderMenuWrapper',
  model: {
    prop: 'collapsed',
    event: 'collapse'
  },
  props: _SiderMenu.SiderMenuProps,
  render: function render (h) {
    var _this = this

    var layout = this.layout
        var isMobile = this.isMobile
        var collapsed = this.collapsed

    var isTopMenu = layout === 'topmenu'
    var handleCollapse = function handleCollapse (e) {
      _this.$emit('collapse', true)
    }
    return isMobile ? h(
      _drawer2['default'],
      {
        'class': 'ant-pro-sider-menu',
        attrs: { visible: !collapsed,
          placement: 'left',
          maskClosable: true,
          getContainer: null,

          bodyStyle: {
            padding: 0,
            height: '100vh'
          }
        },
        on: {
          'close': handleCollapse
        }
      },
      [h(_SiderMenu2['default'], { props: (0, _extends3['default'])({}, this.$props, { collapsed: isMobile ? false : collapsed }) })]
    ) : !isTopMenu && h(_SiderMenu2['default'], (0, _babelHelperVueJsxMergeProps2['default'])([{ 'class': 'ant-pro-sider-menu' }, { props: this.$props }]))
  }
}

SiderMenuWrapper.install = function (Vue) {
  Vue.component(SiderMenuWrapper.name, SiderMenuWrapper)
}

exports.SiderMenu = _SiderMenu2['default']
exports.SiderMenuProps = _SiderMenu.SiderMenuProps
exports['default'] = SiderMenuWrapper
