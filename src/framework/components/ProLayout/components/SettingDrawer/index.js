'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.SettingDrawerProps = exports.settings = undefined

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

require('./index.less')

var _omit = require('omit.js')

var _omit2 = _interopRequireDefault(_omit)

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/divider/style')

var _divider = require('ant-design-vue/es/divider')

var _divider2 = _interopRequireDefault(_divider)

require('ant-design-vue/es/drawer/style')

var _drawer = require('ant-design-vue/es/drawer')

var _drawer2 = _interopRequireDefault(_drawer)

require('ant-design-vue/es/list/style')

var _list = require('ant-design-vue/es/list')

var _list2 = _interopRequireDefault(_list)

require('ant-design-vue/es/switch/style')

var _switch = require('ant-design-vue/es/switch')

var _switch2 = _interopRequireDefault(_switch)

require('ant-design-vue/es/button/style')

var _button = require('ant-design-vue/es/button')

var _button2 = _interopRequireDefault(_button)

require('ant-design-vue/es/icon/style')

var _icon = require('ant-design-vue/es/icon')

var _icon2 = _interopRequireDefault(_icon)

require('ant-design-vue/es/alert/style')

var _alert = require('ant-design-vue/es/alert')

var _alert2 = _interopRequireDefault(_alert)

var _portalDirective = require('ant-design-vue/es/_util/portalDirective')

var _portalDirective2 = _interopRequireDefault(_portalDirective)

require('ant-design-vue/es/message/style')

var _message = require('ant-design-vue/es/message')

var _message2 = _interopRequireDefault(_message)

var _BlockCheckbox = require('./BlockCheckbox')

var _BlockCheckbox2 = _interopRequireDefault(_BlockCheckbox)

var _ThemeColor = require('./ThemeColor')

var _ThemeColor2 = _interopRequireDefault(_ThemeColor)

var _LayoutChange = require('./LayoutChange')

var _LayoutChange2 = _interopRequireDefault(_LayoutChange)

var _dynamicTheme = require('../../utils/dynamicTheme')

var _util = require('../../utils/util')

var _vueCopyToClipboard = require('vue-copy-to-clipboard')

var _vueCopyToClipboard2 = _interopRequireDefault(_vueCopyToClipboard)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var baseClassName = 'ant-pro-setting-drawer'

var BodyProps = {
  title: _vueTypes2['default'].string.def('')
}

var Body = {
  props: BodyProps,
  render: function render (h) {
    var title = this.title

    return h(
      'div',
      { style: { marginBottom: 24 } },
      [h(
        'h3',
        { 'class': baseClassName + '-title' },
        [title]
      ), this.$slots['default']]
    )
  }
}

var defaultI18nRender = function defaultI18nRender (t) {
  return t
}

var getThemeList = function getThemeList (i18nRender) {
  var list = window.umi_plugin_ant_themeVar || []

  var themeList = [{
    key: 'light',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
    title: i18nRender('app.setting.pagestyle.light')
  }, {
    key: 'dark',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
    title: i18nRender('app.setting.pagestyle.dark')
  }]

  var darkColorList = [{
    key: '#1890ff',
    color: '#1890ff',
    theme: 'dark'
  }]

  var lightColorList = [{
    key: '#1890ff',
    color: '#1890ff',
    theme: 'dark'
  }]

  if (list.find(function (item) {
    return item.theme === 'dark'
  })) {
    themeList.push({
      // disable click
      disable: true,
      key: 'realDark',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
      title: i18nRender('app.setting.pagestyle.realdark')
    })
  }
  // insert  theme color List
  list.forEach(function (item) {
    var color = (item.modifyVars || {})['@primary-color']
    if (item.theme === 'dark' && color) {
      darkColorList.push((0, _extends3['default'])({
        color: color
      }, item))
    }
    if (!item.theme || item.theme === 'light') {
      lightColorList.push((0, _extends3['default'])({
        color: color
      }, item))
    }
  })

  return {
    colorList: {
      dark: darkColorList,
      light: lightColorList
    },
    themeList: themeList
  }
}

var handleChangeSetting = function handleChangeSetting (key, value, hideMessageLoading) {
  if (key === 'primaryColor') {
    // 更新主色调
    (0, _dynamicTheme.updateTheme)(value)
  }
  if (key === 'colorWeak') {
    (0, _dynamicTheme.updateColorWeak)(value)
  }
}

var genCopySettingJson = function genCopySettingJson (settings) {
  return JSON.stringify((0, _omit2['default'])((0, _extends3['default'])({}, settings, {
    primaryColor: (0, _util.genStringToTheme)(settings.primaryColor)
  }), ['colorWeak']), null, 2)
}

var settings = exports.settings = {
  theme: _vueTypes2['default'].oneOf(['dark', 'light', 'realDark']),
  primaryColor: _vueTypes2['default'].string,
  layout: _vueTypes2['default'].oneOf(['sidemenu', 'topmenu']),
  colorWeak: _vueTypes2['default'].bool,
  // contentWidth: PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid'),
  // 替换兼容 PropTypes.oneOf(['Fluid', 'Fixed']).def('Fluid')
  contentWidth: _vueTypes2['default'].oneOfType([_vueTypes2['default'].string, _vueTypes2['default'].bool]).def('Fluid'),
  fixedHeader: _vueTypes2['default'].bool,
  fixSiderbar: _vueTypes2['default'].bool,
  hideHintAlert: _vueTypes2['default'].bool.def(false),
  hideCopyButton: _vueTypes2['default'].bool.def(false)
}

var SettingDrawerProps = exports.SettingDrawerProps = {
  getContainer: _vueTypes2['default'].func,
  settings: _vueTypes2['default'].objectOf(settings),

  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false)
}

var SettingDrawer = {
  name: 'SettingDrawer',
  props: SettingDrawerProps,
  inject: ['locale'],
  data: function data () {
    return {
      show: false
    }
  },
  render: function render (h) {
    var _this = this

    var setShow = this.setShow
        var getContainer = this.getContainer
        var settings = this.settings
    var _settings$theme = settings.theme
        var theme = _settings$theme === undefined ? 'dark' : _settings$theme
        var _settings$primaryColo = settings.primaryColor
        var primaryColor = _settings$primaryColo === undefined ? 'daybreak' : _settings$primaryColo
        var _settings$layout = settings.layout
        var layout = _settings$layout === undefined ? 'sidemenu' : _settings$layout
        var _settings$fixedHeader = settings.fixedHeader
        var fixedHeader = _settings$fixedHeader === undefined ? false : _settings$fixedHeader
        var _settings$fixSiderbar = settings.fixSiderbar
        var fixSiderbar = _settings$fixSiderbar === undefined ? false : _settings$fixSiderbar
        var hideHintAlert = settings.hideHintAlert
        var hideCopyButton = settings.hideCopyButton
        var colorWeak = settings.colorWeak

    var i18n = this.$props.i18nRender || this.locale || defaultI18nRender
    var themeList = getThemeList(i18n)
    var isTopMenu = layout === 'topmenu'

    // 兼容 0.3.4~0.3.8
    var contentWidth = (0, _util.contentWidthCheck)(settings.contentWidth)

    var iconStyle = {
      color: '#fff',
      fontSize: 20
    }

    var changeSetting = function changeSetting (type, value) {
      _this.$emit('change', { type: type, value: value })
      handleChangeSetting(type, value, false)
    }

    return h(
      _drawer2['default'],
      {
        attrs: {
          visible: this.show,
          width: 300,

          placement: 'right',
          getContainer: getContainer
          /* handle={
            <div class="ant-pro-setting-drawer-handle" onClick={() => setShow(!this.show)}>
              {this.show
                ? (<Icon type="close" style={iconStyle} />)
                : (<Icon type="setting" style={iconStyle} />)
              }
            </div>
          } */
        },
        on: {
          'close': function close () {
            return setShow(false)
          }
        },
        style: {
          zIndex: 999
        }
      },
      [h(
        'template',
        { slot: 'handle' },
        [h(
          'div',
          { 'class': baseClassName + '-handle',
on: {
              'click': function click () {
                return setShow(!_this.show)
              }
            }
          },
          [this.show ? h(_icon2['default'], {
            attrs: { type: 'close' },
            style: iconStyle }) : h(_icon2['default'], {
            attrs: { type: 'setting' },
            style: iconStyle })]
        )]
      ), h(
        'div',
        { 'class': baseClassName + '-content' },
        [h(
          Body,
          {
            attrs: { title: i18n('app.setting.pagestyle') }
          },
          [h(_BlockCheckbox2['default'], {
            attrs: { i18nRender: i18n, list: themeList.themeList, value: theme },
            on: {
              'change': function change (val) {
                changeSetting('theme', val)
              }
            }
          })]
        ), h(_ThemeColor2['default'], {
          attrs: {
            i18nRender: i18n,
            title: i18n('app.setting.themecolor'),
            value: primaryColor,
            colors: themeList.colorList[theme === 'realDark' ? 'dark' : 'light']
          },
          on: {
            'change': function change (color) {
              changeSetting('primaryColor', color, null)
            }
          }
        }), h(_divider2['default']), h(
          Body,
          {
            attrs: { title: i18n('app.setting.navigationmode') }
          },
          [h(_BlockCheckbox2['default'], {
            attrs: { i18nRender: i18n, value: layout },
            on: {
              'change': function change (value) {
                changeSetting('layout', value, null)
              }
            }
          })]
        ), h(_LayoutChange2['default'], {
          attrs: {
            i18nRender: i18n,
            contentWidth: contentWidth,
            fixedHeader: fixedHeader,
            fixSiderbar: isTopMenu ? false : fixSiderbar,
            layout: layout
          },
          on: {
            'change': function change (_ref) {
              var type = _ref.type
                  var value = _ref.value

              changeSetting(type, value)
            }
          }
        }), h(_divider2['default']), h(
          Body,
          {
            attrs: { title: i18n('app.setting.othersettings') }
          },
          [h(_list2['default'], {
            attrs: {
              split: false,
              renderItem: function renderItem (item) {
                return (0, _LayoutChange.renderLayoutSettingItem)(h, item)
              },
              dataSource: [{
                title: i18n('app.setting.weakmode'),
                action: h(_switch2['default'], {
                  attrs: {
                    size: 'small',
                    checked: !!colorWeak
                  },
                  on: {
                    'change': function change (checked) {
                      return changeSetting('colorWeak', checked)
                    }
                  }
                })
              }]
            }
          })]
        ), hideHintAlert && hideCopyButton ? null : h(_divider2['default']), hideHintAlert ? null : h(_alert2['default'], {
          attrs: {
            type: 'warning',
            message: i18n('app.setting.production.hint'),
            icon: h(_icon2['default'], {
              attrs: { type: 'notification' }
            }),
            showIcon: true
          },
          style: { marginBottom: '16px' }
        }), hideCopyButton ? null : h(
          _vueCopyToClipboard2['default'],
          {
            attrs: {
              text: genCopySettingJson(settings)
            },
            on: {
              'copy': function copy () {
                return _message2['default'].success(i18n('app.setting.copyinfo'))
              }
            }
          },
          [h(
            _button2['default'],
            {
              attrs: { block: true }
            },
            [h(_icon2['default'], {
              attrs: { type: 'copy' }
            }), i18n('app.setting.copy')]
          )]
        )]
      )]
    )
  },

  methods: {
    setShow: function setShow (flag) {
      this.show = flag
    }
  }
}

SettingDrawer.install = function (Vue) {
  Vue.use(_portalDirective2['default'])
  Vue.component(SettingDrawer.name, SettingDrawer)
}

exports['default'] = SettingDrawer
