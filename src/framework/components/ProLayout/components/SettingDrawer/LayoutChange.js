'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LayoutSettingProps = exports.renderLayoutSettingItem = undefined

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/tooltip/style')

var _tooltip = require('ant-design-vue/es/tooltip')

var _tooltip2 = _interopRequireDefault(_tooltip)

require('ant-design-vue/es/list/style')

var _list = require('ant-design-vue/es/list')

var _list2 = _interopRequireDefault(_list)

require('ant-design-vue/es/select/style')

var _select = require('ant-design-vue/es/select')

var _select2 = _interopRequireDefault(_select)

require('ant-design-vue/es/switch/style')

var _switch = require('ant-design-vue/es/switch')

var _switch2 = _interopRequireDefault(_switch)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var renderLayoutSettingItem = exports.renderLayoutSettingItem = function renderLayoutSettingItem (h, item) {
  var action = (0, _extends3['default'])({}, item.action)
  return h(
    _tooltip2['default'],
    {
      attrs: { title: item.disabled ? item.disabledReason : '', placement: 'left' }
    },
    [h(
      _list2['default'].Item,
      {
        attrs: { actions: [action] }
      },
      [h(
        'span',
        { style: { opacity: item.disabled ? 0.5 : 1 } },
        [item.title]
      )]
    )]
  )
}

var LayoutSettingProps = exports.LayoutSettingProps = {
  contentWidth: _vueTypes2['default'].oneOf(['Fluid', 'Fixed']).def('Fluid'),
  fixedHeader: _vueTypes2['default'].bool,
  fixSiderbar: _vueTypes2['default'].bool,
  layout: _vueTypes2['default'].oneOf(['sidemenu', 'topmenu']),

  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false)
}

exports['default'] = {
  props: LayoutSettingProps,
  inject: ['locale'],
  render: function render (h) {
    var _this = this

    var i18n = this.$props.i18nRender || this.locale
    var contentWidth = this.contentWidth
        var fixedHeader = this.fixedHeader
        var layout = this.layout
        var fixSiderbar = this.fixSiderbar

    var handleChange = function handleChange (type, value) {
      _this.$emit('change', { type: type, value: value })
    }

    return h(_list2['default'], {
      attrs: {
        split: false,
        dataSource: [{
          title: i18n('app.setting.content-width'),
          action: h(
            _select2['default'],
            {
              attrs: {
                value: contentWidth,
                size: 'small'
              },
              on: {
                'select': function select (value) {
                  return handleChange('contentWidth', value)
                }
              },

              style: { width: '80px' }
            },
            [layout === 'sidemenu' ? null : h(
              _select2['default'].Option,
              {
                attrs: { value: 'Fixed' }
              },
              [i18n('app.setting.content-width.fixed')]
            ), h(
              _select2['default'].Option,
              {
                attrs: { value: 'Fluid' }
              },
              [i18n('app.setting.content-width.fluid')]
            )]
          )
        }, {
          title: i18n('app.setting.fixedheader'),
          action: h(_switch2['default'], {
            attrs: {
              size: 'small',
              checked: !!fixedHeader
            },
            on: {
              'change': function change (checked) {
                return handleChange('fixedHeader', checked)
              }
            }
          })
        }, {
          title: i18n('app.setting.fixedsidebar'),
          disabled: layout === 'topmenu',
          disabledReason: i18n('app.setting.fixedsidebar.hint'),
          action: h(_switch2['default'], {
            attrs: {
              size: 'small',
              disabled: layout === 'topmenu',
              checked: !!fixSiderbar
            },
            on: {
              'change': function change (checked) {
                return handleChange('fixSiderbar', checked)
              }
            }
          })
        }],
        renderItem: function renderItem (item, index) {
          return renderLayoutSettingItem(h, item)
        }
      }
    })
  }
}
