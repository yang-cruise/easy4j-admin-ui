'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

require('ant-design-vue/es/tooltip/style')

var _tooltip = require('ant-design-vue/es/tooltip')

var _tooltip2 = _interopRequireDefault(_tooltip)

require('ant-design-vue/es/icon/style')

var _icon = require('ant-design-vue/es/icon')

var _icon2 = _interopRequireDefault(_icon)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var BlockCheckboxProps = {
  value: _vueTypes2['default'].string,
  // Item: { key, url, title }
  list: _vueTypes2['default'].array,

  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false)
}

var baseClassName = 'ant-pro-setting-drawer-block-checbox'

var BlockCheckbox = {
  props: BlockCheckboxProps,
  inject: ['locale'],
  render: function render (h) {
    var _this = this

    var value = this.value
        var list = this.list

    var i18n = this.$props.i18nRender || this.locale

    var items = list || [{
      key: 'sidemenu',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
      title: i18n('app.setting.sidemenu')
    }, {
      key: 'topmenu',
      url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
      title: i18n('app.setting.topmenu')
    }]

    var handleChange = function handleChange (key) {
      _this.$emit('change', key)
    }

    var disableStyle = {
      cursor: 'not-allowed'
    }

    return h(
      'div',
      { 'class': baseClassName, key: value },
      [items.map(function (item) {
        return h(
          _tooltip2['default'],
          {
            attrs: { title: item.title },
            key: item.key },
          [h(
            'div',
            { 'class': baseClassName + '-item',
style: item.disable && disableStyle,
on: {
                'click': function click () {
                  return !item.disable && handleChange(item.key)
                }
              }
            },
            [h('img', {
              attrs: { src: item.url, alt: item.key }
            }), h(
              'div',
              {
                'class': baseClassName + '-selectIcon',
                style: {
                  display: value === item.key ? 'block' : 'none'
                }
              },
              [h(_icon2['default'], {
                attrs: { type: 'check' }
              })]
            )]
          )]
        )
      })]
    )
  }
}

exports['default'] = BlockCheckbox
