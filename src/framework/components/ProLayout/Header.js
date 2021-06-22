'use strict'
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.HeaderViewProps = undefined

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

require('./Header.less')

require('ant-design-vue/es/layout/style')

var _layout = require('ant-design-vue/es/layout')

var _layout2 = _interopRequireDefault(_layout)

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

var _BaseMenu = require('./components/RouteMenu/BaseMenu')

var _BaseMenu2 = _interopRequireDefault(_BaseMenu)

var _SiderMenu = require('./components/SiderMenu/SiderMenu')

var _GlobalHeader = require('./components/GlobalHeader')

var _GlobalHeader2 = _interopRequireDefault(_GlobalHeader)

var _components = require('./components')

var _util = require('./utils/util')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var Header = _layout2['default'].Header
var HeaderViewProps = exports.HeaderViewProps = (0, _extends3['default'])({}, _GlobalHeader.GlobalHeaderProps, _SiderMenu.SiderMenuProps, {
  isMobile: _vueTypes2['default'].bool.def(false),
  collapsed: _vueTypes2['default'].bool,
  logo: _vueTypes2['default'].any,
  hasSiderMenu: _vueTypes2['default'].bool,
  autoHideHeader: _vueTypes2['default'].bool,
  menuRender: _vueTypes2['default'].any,
  headerRender: _vueTypes2['default'].any,
  rightContentRender: _vueTypes2['default'].any,
  visible: _vueTypes2['default'].bool.def(true)
})

var renderContent = function renderContent (h, props) {
  var isTop = props.layout === 'topmenu'
  var maxWidth = 1200 - 280 - 120
  var contentWidth = props.contentWidth === 'Fixed'
  var baseCls = 'ant-pro-top-nav-header'
  var logo = props.logo
      var title = props.title
      var theme = props.theme
      var isMobile = props.isMobile
      var headerRender = props.headerRender
      var rightContentRender = props.rightContentRender

  var rightContentProps = { theme: theme, isTop: isTop, isMobile: isMobile }
  var defaultDom = h(_GlobalHeader2['default'], { props: props })
  if (isTop && !isMobile) {
    defaultDom = h(
      'div',
      { 'class': [baseCls, theme] },
      [h(
        'div',
        { 'class': [baseCls + '-main', contentWidth ? 'wide' : ''] },
        [h(
          'div',
          { 'class': baseCls + '-left' },
          [h(
            'div',
            { 'class': baseCls + '-logo', key: 'logo', attrs: { id: 'logo' }
            },
            [(0, _SiderMenu.defaultRenderLogoAntTitle)(h, { logo: logo, title: title, menuHeaderRender: null })]
          )]
        ), h(
          'div',
          { 'class': baseCls + '-menu', style: { maxWidth: maxWidth + 'px', flex: 1 } },
          [h(_BaseMenu2['default'], { props: props })]
        ), (0, _util.isFun)(rightContentRender) && rightContentRender(h, rightContentProps) || rightContentRender]
      )]
    )
  }
  if (headerRender) {
    return headerRender(h, props)
  }
  return defaultDom
}

var HeaderView = {
  name: 'HeaderView',
  props: HeaderViewProps,
  render: function render (h) {
    var _$props = this.$props
        var visible = _$props.visible
        var isMobile = _$props.isMobile
        var layout = _$props.layout
        var collapsed = _$props.collapsed
        var siderWidth = _$props.siderWidth
        var fixedHeader = _$props.fixedHeader
        var autoHideHeader = _$props.autoHideHeader
        var hasSiderMenu = _$props.hasSiderMenu

    var props = this.$props
    var isTop = layout === 'topmenu'

    var needSettingWidth = fixedHeader && hasSiderMenu && !isTop && !isMobile

    var className = {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop

      // 没有 <></> 暂时代替写法
    }; return visible ? h(_components.VueFragment, [fixedHeader && h(Header), h(
      Header,
      {
        style: {
          padding: 0,
          width: needSettingWidth ? 'calc(100% - ' + (collapsed ? 80 : siderWidth) + 'px)' : '100%',
          zIndex: 9,
          right: fixedHeader ? 0 : undefined
        },
        'class': className
      },
      [renderContent(h, props)]
    )]) : null
  }
}

exports['default'] = HeaderView
