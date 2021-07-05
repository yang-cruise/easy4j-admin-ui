'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.GlobalHeaderProps = undefined

require('./index.less')

var _debounce = require('lodash/debounce')

var _debounce2 = _interopRequireDefault(_debounce)

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

var _util = require('../../utils/util')

require('ant-design-vue/es/icon/style')

var _icon = require('ant-design-vue/es/icon')

var _icon2 = _interopRequireDefault(_icon)

var _SiderMenu = require('../SiderMenu/SiderMenu')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var GlobalHeaderProps = exports.GlobalHeaderProps = {
  collapsed: _vueTypes2['default'].bool,
  handleCollapse: _vueTypes2['default'].func,
  isMobile: _vueTypes2['default'].bool.def(false),
  fixedHeader: _vueTypes2['default'].bool.def(false),
  logo: _vueTypes2['default'].any,
  menuRender: _vueTypes2['default'].any,
  collapsedButtonRender: _vueTypes2['default'].any,
  headerContentRender: _vueTypes2['default'].any,
  rightContentRender: _vueTypes2['default'].any
}

var defaultRenderCollapsedButton = function defaultRenderCollapsedButton (h, collapsed) {
  return h(_icon2['default'], {
    attrs: { type: collapsed ? 'menu-unfold' : 'menu-fold' }
  })
}

var GlobalHeader = {
  name: 'GlobalHeader',
  props: GlobalHeaderProps,
  render: function render (h) {
    var _this = this

    var _$props = this.$props
        var isMobile = _$props.isMobile
        var logo = _$props.logo
        var rightContentRender = _$props.rightContentRender
        var headerContentRender = _$props.headerContentRender

    var toggle = function toggle () {
      var _$props2 = _this.$props
          var collapsed = _$props2.collapsed
          var handleCollapse = _$props2.handleCollapse

      if (handleCollapse) handleCollapse(!collapsed)
      _this.triggerResizeEvent()
    }
    var renderCollapsedButton = function renderCollapsedButton () {
      var _$props3 = _this.$props
          var collapsed = _$props3.collapsed
          var _$props3$collapsedBut = _$props3.collapsedButtonRender
          var collapsedButtonRender = _$props3$collapsedBut === undefined ? defaultRenderCollapsedButton : _$props3$collapsedBut
          var menuRender = _$props3.menuRender

      if (collapsedButtonRender !== false && menuRender !== false) {
        return h(
          'span',
          { 'class': 'ant-pro-global-header-trigger',
on: {
              'click': toggle
            }
          },
          [(0, _util.isFun)(collapsedButtonRender) && collapsedButtonRender(h, collapsed) || collapsedButtonRender]
        )
      }
      return null
    }

    var headerCls = 'ant-pro-global-header'

    return h(
      'div',
      { 'class': headerCls },
      [isMobile && h(
        'a',
        { 'class': headerCls + '-logo', key: 'logo', attrs: { href: '/' }
        },
        [(0, _SiderMenu.defaultRenderLogo)(h, logo)]
      ), renderCollapsedButton(), headerContentRender && h(
        'div',
        { 'class': headerCls + '-content' },
        [(0, _util.isFun)(headerContentRender) && headerContentRender(h, this.$props) || headerContentRender]
      ), (0, _util.isFun)(rightContentRender) && rightContentRender(h, this.$props) || rightContentRender]
    )
  },

  methods: {
    triggerResizeEvent: (0, _debounce2['default'])(function () {
      _util.inBrowser && (0, _util.triggerEvent)(window, 'resize')
    })
  },
  beforeDestroy: function beforeDestroy () {
    this.triggerResizeEvent.cancel && this.triggerResizeEvent.cancel()
  }
}

exports['default'] = GlobalHeader
