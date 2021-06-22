'use strict'
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {
  value: true
})

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties')

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2)

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props')

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps)

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

require('./index.less')

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

var _utils = require('ant-design-vue/lib/_util/vue-types/utils')

var _GridContent = require('../GridContent')

var _GridContent2 = _interopRequireDefault(_GridContent)

require('ant-design-vue/es/page-header/style')

var _pageHeader = require('ant-design-vue/es/page-header')

var _pageHeader2 = _interopRequireDefault(_pageHeader)

require('ant-design-vue/es/tabs/style')

var _tabs = require('ant-design-vue/es/tabs')

var _tabs2 = _interopRequireDefault(_tabs)

var _propsUtil = require('ant-design-vue/lib/_util/props-util')

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var prefixedClassName = 'ant-pro-page-header-wrap'

var PageHeaderTabConfig = {
  tabList: _vueTypes2['default'].array,
  tabActiveKey: _vueTypes2['default'].string,
  tabProps: _vueTypes2['default'].object,
  tabChange: _vueTypes2['default'].func
}

var PageHeaderWrapperProps = (0, _extends3['default'])({}, PageHeaderTabConfig, _pageHeader.PageHeaderProps, {
  title: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].bool]),
  content: _vueTypes2['default'].any,
  extraContent: _vueTypes2['default'].any,
  pageHeaderRender: _vueTypes2['default'].func,
  breadcrumb: _vueTypes2['default'].oneOfType([_vueTypes2['default'].object, _vueTypes2['default'].bool]).def(true),
  back: _vueTypes2['default'].func,

  // only use `pro-layout` in children
  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false)
})

var defaultI18nRender = function defaultI18nRender (t) {
  return t
}

var useContext = function useContext (route) {
  return route && (0, _extends3['default'])({}, route.meta) || null
}

var noop = function noop () {}

// TODO :: tabList tab 支持图标 优化
var renderFooter = function renderFooter (h, tabConfigProps, i18nRender) {
  var tabList = tabConfigProps.tabList
      var tabActiveKey = tabConfigProps.tabActiveKey
      var onTabChange = tabConfigProps.tabChange
      var tabBarExtraContent = tabConfigProps.tabBarExtraContent
      var tabProps = tabConfigProps.tabProps

  return tabList && tabList.length > 0 && h(
    _tabs2['default'],
    (0, _babelHelperVueJsxMergeProps2['default'])([{
      'class': prefixedClassName + '-tabs',
      attrs: { activeKey: tabActiveKey,

        tabBarExtraContent: tabBarExtraContent
      },
      on: {
        'change': function change (key) {
          if (onTabChange) {
            onTabChange(key)
          }
        }
      }
    }, tabProps]),
    [tabList.map(function (item) {
      return h(_tabs2['default'].TabPane, (0, _babelHelperVueJsxMergeProps2['default'])([item, {
        attrs: { tab: i18nRender(item.tab) },
        key: item.key }]))
    })]
  )
}

var renderPageHeader = function renderPageHeader (h, content, extraContent) {
  if (!content && !extraContent) {
    return null
  }
  return h(
    'div',
    { 'class': prefixedClassName + '-detail' },
    [h(
      'div',
      { 'class': prefixedClassName + '-main' },
      [h(
        'div',
        { 'class': prefixedClassName + '-row' },
        [content && h(
          'div',
          { 'class': prefixedClassName + '-content' },
          [content]
        ), extraContent && h(
          'div',
          { 'class': prefixedClassName + '-extraContent' },
          [extraContent]
        )]
      )]
    )]
  )
}

var defaultPageHeaderRender = function defaultPageHeaderRender (h, props, pageMeta, i18nRender) {
  var propTitle = props.title
      var tags = props.tags
      var content = props.content
      var pageHeaderRender = props.pageHeaderRender
      var extra = props.extra
      var extraContent = props.extraContent
      var breadcrumb = props.breadcrumb
      var handleBack = props.back
      var restProps = (0, _objectWithoutProperties3['default'])(props, ['title', 'tags', 'content', 'pageHeaderRender', 'extra', 'extraContent', 'breadcrumb', 'back'])

  if (pageHeaderRender) {
    return pageHeaderRender((0, _extends3['default'])({}, props))
  }
  var pageHeaderTitle = propTitle
  if (!propTitle && propTitle !== false) {
    pageHeaderTitle = pageMeta.title
  }
  // title props 不是 false 且不是 array 则直接渲染 title
  // 反之认为是 VNode, 作为 render 参数直接传入到 PageHeader
  var title = (0, _utils.isArray)(pageHeaderTitle) ? pageHeaderTitle : pageHeaderTitle && i18nRender(pageHeaderTitle)
  var tabProps = {
    breadcrumb: breadcrumb,
    extra: extra,
    tags: tags,
    title: title,
    footer: renderFooter(h, restProps, i18nRender)
  }
  if (!handleBack) {
    tabProps.backIcon = false
  }

  return h(
    _pageHeader2['default'],
    (0, _babelHelperVueJsxMergeProps2['default'])([{ props: tabProps }, {
      on: {
        'back': handleBack || noop
      }
    }]),
    [renderPageHeader(h, content, extraContent)]
  )
  // return
}

var PageHeaderWrapper = {
  name: 'PageHeaderWrapper',
  props: PageHeaderWrapperProps,
  inject: ['locale', 'contentWidth', 'breadcrumbRender'],
  render: function render (h) {
    var _this = this

    var $route = this.$route
        var $listeners = this.$listeners

    var children = this.$slots['default']
    var title = (0, _propsUtil.getComponentFromProp)(this, 'title')
    var tags = (0, _propsUtil.getComponentFromProp)(this, 'tags')
    var content = (0, _propsUtil.getComponentFromProp)(this, 'content')
    var extra = (0, _propsUtil.getComponentFromProp)(this, 'extra')
    var extraContent = (0, _propsUtil.getComponentFromProp)(this, 'extraContent')

    var pageMeta = useContext(this.$props.route || $route)
    var i18n = this.$props.i18nRender || this.locale || defaultI18nRender
    var contentWidth = this.$props.contentWidth || this.contentWidth || false
    // 当未设置 back props 或未监听 @back，不显示 back
    // props 的 back 事件优先级高于 @back，需要注意
    var onBack = this.$props.back || $listeners.back
    var back = onBack && function () {
      // this.$emit('back')
      // call props back func
      onBack && onBack()
    } || undefined

    var onTabChange = this.$props.tabChange
    var tabChange = function tabChange (key) {
      _this.$emit('tabChange', key)
      onTabChange && onTabChange(key)
    }

    var breadcrumb = {}
    var propsBreadcrumb = this.$props.breadcrumb
    if (propsBreadcrumb === true) {
      var routes = $route.matched.concat().map(function (route) {
        return {
          path: route.path,
          breadcrumbName: i18n(route.meta.title)
        }
      })

      var defaultItemRender = function defaultItemRender (_ref) {
        var route = _ref.route
            var params = _ref.params
            var routes = _ref.routes
            var paths = _ref.paths
            var h = _ref.h

        return routes.indexOf(route) === routes.length - 1 && h('span', [route.breadcrumbName]) || h(
          'router-link',
          {
            attrs: { to: { path: route.path || '/', params: params } }
          },
          [route.breadcrumbName]
        )
      }

      // If custom breadcrumb render undefined
      // use default breadcrumb..
      var itemRender = this.breadcrumbRender || defaultItemRender

      breadcrumb = { props: { routes: routes, itemRender: itemRender } }
    } else {
      breadcrumb = propsBreadcrumb || null
    }

    var props = (0, _extends3['default'])({}, this.$props, {
      title: title,
      tags: tags,
      content: content,
      extra: extra,
      extraContent: extraContent,
      breadcrumb: breadcrumb,
      tabChange: tabChange,
      back: back
    })

    return h(
      'div',
      { 'class': 'ant-pro-page-header-wrap' },
      [h(
        'div',
        { 'class': prefixedClassName + '-page-header-warp' },
        [h(_GridContent2['default'], [defaultPageHeaderRender(h, props, pageMeta, i18n)])]
      ), children ? h(
        _GridContent2['default'],
        {
          attrs: { contentWidth: contentWidth }
        },
        [h(
          'div',
          { 'class': prefixedClassName + '-children-content' },
          [children]
        )]
      ) : null]
    )
  }
}

PageHeaderWrapper.install = function (Vue) {
  Vue.component(PageHeaderWrapper.name, PageHeaderWrapper)
  Vue.component('page-container', PageHeaderWrapper)
}

exports['default'] = PageHeaderWrapper
