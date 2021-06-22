'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.defaultRenderLogoAntTitle = exports.defaultRenderLogo = exports.SiderMenuProps = undefined

require('./index.less')

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/layout/style')

var _layout = require('ant-design-vue/es/layout')

var _layout2 = _interopRequireDefault(_layout)

var _util = require('../../utils/util')

var _RouteMenu = require('../RouteMenu')

var _RouteMenu2 = _interopRequireDefault(_RouteMenu)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var Sider = _layout2['default'].Sider
var SiderMenuProps = exports.SiderMenuProps = {
  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false),
  mode: _vueTypes2['default'].string.def('inline'),
  theme: _vueTypes2['default'].string.def('dark'),
  contentWidth: _vueTypes2['default'].oneOf(['Fluid', 'Fixed']).def('Fluid'),
  collapsible: _vueTypes2['default'].bool,
  collapsed: _vueTypes2['default'].bool,
  handleCollapse: _vueTypes2['default'].func,
  menus: _vueTypes2['default'].array,
  siderWidth: _vueTypes2['default'].number.def(256),
  isMobile: _vueTypes2['default'].bool,
  layout: _vueTypes2['default'].string.def('inline'),
  fixSiderbar: _vueTypes2['default'].bool,
  logo: _vueTypes2['default'].any,
  title: _vueTypes2['default'].string.def(''),
  // render function or vnode
  menuHeaderRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].array, _vueTypes2['default'].object, _vueTypes2['default'].bool]),
  menuRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].array, _vueTypes2['default'].object, _vueTypes2['default'].bool])
}

var defaultRenderLogo = exports.defaultRenderLogo = function defaultRenderLogo (h, logo) {
  if (typeof logo === 'string') {
    return h('img', {
      attrs: { src: logo, alt: 'logo' }
    })
  }
  if (typeof logo === 'function') {
    return logo()
  }
  return h(logo)
}

var defaultRenderLogoAntTitle = exports.defaultRenderLogoAntTitle = function defaultRenderLogoAntTitle (h, props) {
  var _props$logo = props.logo
      var logo = _props$logo === undefined ? 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg' : _props$logo
      var title = props.title
      var menuHeaderRender = props.menuHeaderRender

  if (menuHeaderRender === false) {
    return null
  }
  var logoDom = defaultRenderLogo(h, logo)
  var titleDom = h('h1', [title])

  if (menuHeaderRender) {
    return (0, _util.isFun)(menuHeaderRender) && menuHeaderRender(h, logoDom, props.collapsed ? null : titleDom, props) || menuHeaderRender
  }
  return h('span', [logoDom, titleDom])
}

var SiderMenu = {
  name: 'SiderMenu',
  model: {
    prop: 'collapsed',
    event: 'collapse'
  },
  props: SiderMenuProps,
  render: function render (h) {
    var collapsible = this.collapsible
        var collapsed = this.collapsed
        var siderWidth = this.siderWidth
        var fixSiderbar = this.fixSiderbar
        var mode = this.mode
        var theme = this.theme
        var menus = this.menus
        var logo = this.logo
        var title = this.title
        var handleCollapse = this.handleCollapse
        var _onMenuHeaderClick = this.onMenuHeaderClick
        var onMenuHeaderClick = _onMenuHeaderClick === undefined ? function () {
      return null
    } : _onMenuHeaderClick
        var i18nRender = this.i18nRender
        var menuHeaderRender = this.menuHeaderRender
        var menuRender = this.menuRender

    var siderCls = ['ant-pro-sider-menu-sider']
    if (fixSiderbar) siderCls.push('fix-sider-bar')
    if (theme === 'light') siderCls.push('light')
    //
    // const handleCollapse = (collapsed, type) => {
    //   this.$emit('collapse', collapsed)
    // }

    var headerDom = defaultRenderLogoAntTitle(h, {
      logo: logo, title: title, menuHeaderRender: menuHeaderRender, collapsed: collapsed
    })

    return h(
      Sider,
      {
        'class': siderCls,
        attrs: { breakpoint: 'lg',
          trigger: null,
          width: siderWidth,
          theme: theme,
          collapsible: collapsible,
          collapsed: collapsed
        },
        on: {
          'collapse': handleCollapse
        }
      },
      [headerDom && h(
        'div',
        {
          'class': 'ant-pro-sider-menu-logo',
          on: {
            'click': onMenuHeaderClick
          },
          attrs: {
            id: 'logo'
          }
        },
        [h(
          'router-link',
          {
            attrs: { to: { path: '/' } }
          },
          [headerDom]
        )]
      ), menuRender && ((0, _util.isFun)(menuRender) && menuRender(h, this.$props) || menuRender) || h(_RouteMenu2['default'], {
        attrs: { collapsed: collapsed, menus: menus, mode: mode, theme: theme, i18nRender: i18nRender }
      })]
    )
  }
}

exports['default'] = SiderMenu
