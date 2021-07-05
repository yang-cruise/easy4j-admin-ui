'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.BasicLayoutProps = undefined

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props')

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps)

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

require('./BasicLayout.less')

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/layout/style')

var _layout = require('ant-design-vue/es/layout')

var _layout2 = _interopRequireDefault(_layout)

var _vueContainerQuery = require('vue-container-query')

var _components = require('./components')

var _util = require('./utils/util')

var _SiderMenu = require('./components/SiderMenu')

var _Header = require('./Header')

var _Header2 = _interopRequireDefault(_Header)

var _WrapContent = require('./WrapContent')

var _WrapContent2 = _interopRequireDefault(_WrapContent)

var _ConfigProvider = require('./components/ConfigProvider')

var _ConfigProvider2 = _interopRequireDefault(_ConfigProvider)

var _PageHeaderWrapper = require('./components/PageHeaderWrapper')

var _PageHeaderWrapper2 = _interopRequireDefault(_PageHeaderWrapper)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var BasicLayoutProps = exports.BasicLayoutProps = (0, _extends3['default'])({}, _SiderMenu.SiderMenuProps, _Header.HeaderViewProps, {
  // 替换兼容 PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid')
  contentWidth: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].bool]).def('Fluid'),
  locale: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].bool]).def('en-US'),
  breadcrumbRender: _vueTypes2['default'].func,
  disableMobile: _vueTypes2['default'].bool.def(false),
  mediaQuery: _vueTypes2['default'].object.def({}),
  handleMediaQuery: _vueTypes2['default'].func,
  footerRender: _vueTypes2['default'].func
})

var MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

var getPaddingLeft = function getPaddingLeft (hasLeftPadding) {
  var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined
  var siderWidth = arguments[2]

  if (hasLeftPadding) {
    return collapsed ? 80 : siderWidth
  }
  return 0
}

var headerRender = function headerRender (h, props) {
  if (props.headerRender === false) {
    return null
  }
  return h(_Header2['default'], { props: props })
}

var defaultI18nRender = function defaultI18nRender (key) {
  return key
}

var BasicLayout = {
  name: 'BasicLayout',
  functional: true,
  props: BasicLayoutProps,
  render: function render (h, content) {
    var props = content.props
        var children = content.children
    var layout = props.layout
        var isMobile = props.isMobile
        var collapsed = props.collapsed
        var mediaQuery = props.mediaQuery
        var handleMediaQuery = props.handleMediaQuery
        var handleCollapse = props.handleCollapse
        var siderWidth = props.siderWidth
        var fixSiderbar = props.fixSiderbar
        var _props$i18nRender = props.i18nRender
        var i18nRender = _props$i18nRender === undefined ? defaultI18nRender : _props$i18nRender

    var footerRender = (0, _util.getComponentFromProp)(content, 'footerRender')
    var rightContentRender = (0, _util.getComponentFromProp)(content, 'rightContentRender')
    var collapsedButtonRender = (0, _util.getComponentFromProp)(content, 'collapsedButtonRender')
    var menuHeaderRender = (0, _util.getComponentFromProp)(content, 'menuHeaderRender')
    var breadcrumbRender = (0, _util.getComponentFromProp)(content, 'breadcrumbRender')
    var headerContentRender = (0, _util.getComponentFromProp)(content, 'headerContentRender')
    var menuRender = (0, _util.getComponentFromProp)(content, 'menuRender')

    // 兼容 0.3.4~0.3.8
    var contentWidth = (0, _util.contentWidthCheck)(props.contentWidth)

    var isTopMenu = layout === 'topmenu'
    var hasSiderMenu = !isTopMenu
    // If it is a fix menu, calculate padding
    // don't need padding in phone mode
    var hasLeftPadding = fixSiderbar && !isTopMenu && !isMobile
    var cdProps = (0, _extends3['default'])({}, props, {
      contentWidth: contentWidth,
      hasSiderMenu: hasSiderMenu,
      footerRender: footerRender,
      menuHeaderRender: menuHeaderRender,
      rightContentRender: rightContentRender,
      collapsedButtonRender: collapsedButtonRender,
      breadcrumbRender: breadcrumbRender,
      headerContentRender: headerContentRender,
      menuRender: menuRender
    })

    return h(
      _ConfigProvider2['default'],
      {
        attrs: { i18nRender: i18nRender, contentWidth: contentWidth, breadcrumbRender: breadcrumbRender }
      },
      [h(
        _vueContainerQuery.ContainerQuery,
        {
          attrs: { query: MediaQueryEnum },
          on: {
            'change': handleMediaQuery
          }
        },
        [h(
          _layout2['default'],
          { 'class': (0, _extends3['default'])({
              'ant-pro-basicLayout': true,
              'ant-pro-topmenu': isTopMenu
            }, mediaQuery) },
          [h(_components.SiderMenuWrapper, (0, _babelHelperVueJsxMergeProps2['default'])([{ props: cdProps }, {
            attrs: {
              collapsed: collapsed
            },
            on: {
              'collapse': handleCollapse
            }
          }])), h(
            _layout2['default'],
            { 'class': [layout],
style: {
                paddingLeft: hasSiderMenu ? getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth) + 'px' : undefined,
                minHeight: '100vh'
              } },
            [headerRender(h, (0, _extends3['default'])({}, cdProps, {
              mode: 'horizontal'
            })), h(
              _WrapContent2['default'],
              { 'class': 'ant-pro-basicLayout-content', attrs: { contentWidth: contentWidth }
              },
              [children]
            ), h(_layout2['default'].Footer, [footerRender && ((0, _util.isFun)(footerRender) && footerRender(h) || footerRender) || h(_components.GlobalFooter, [h(
              'template',
              { slot: 'links' },
              [h(
                'a',
                {
                  attrs: { href: 'https://www.github.com/vueComponent/', target: '_self' }
                },
                ['Github']
              ), h(
                'a',
                {
                  attrs: { href: 'https://www.github.com/sendya/', target: '_self' }
                },
                ['@Sendya']
              )]
            ), h(
              'template',
              { slot: 'copyright' },
              [h(
                'a',
                {
                  attrs: { href: 'https://github.com/vueComponent' }
                },
                ['vueComponent']
              )]
            )])])]
          )]
        )]
      )]
    )
  }
}

BasicLayout.install = function (Vue) {
  Vue.component(_PageHeaderWrapper2['default'].name, _PageHeaderWrapper2['default'])
  Vue.component('page-container', _PageHeaderWrapper2['default'])
  Vue.component('pro-layout', BasicLayout)
}

exports['default'] = BasicLayout
