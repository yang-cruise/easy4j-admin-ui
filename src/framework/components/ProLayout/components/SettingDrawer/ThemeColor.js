'use strict'
/* eslint-disable */
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.ThemeColorProps = exports.TagProps = undefined

var _babelHelperVueJsxMergeProps = require('babel-helper-vue-jsx-merge-props')

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps)

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties')

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2)

require('./ThemeColor.less')

var _vueTypes = require('ant-design-vue/es/_util/vue-types')

var _vueTypes2 = _interopRequireDefault(_vueTypes)

var _util = require('../../utils/util')

require('ant-design-vue/es/tooltip/style')

var _tooltip = require('ant-design-vue/es/tooltip')

var _tooltip2 = _interopRequireDefault(_tooltip)

require('ant-design-vue/es/icon/style')

var _icon = require('ant-design-vue/es/icon')

var _icon2 = _interopRequireDefault(_icon)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { 'default': obj } }

var baseClassName = 'theme-color'

var TagProps = exports.TagProps = {
  color: _vueTypes2['default'].string,
  check: _vueTypes2['default'].bool
}

var Tag = {
  props: TagProps,
  functional: true,
  render: function render (h, content) {
    var _content$props = content.props
        var color = _content$props.color
        var check = _content$props.check
        var data = content.data
        var rest = (0, _objectWithoutProperties3['default'])(content, ['props', 'data'])

    return h(
      'div',
      (0, _babelHelperVueJsxMergeProps2['default'])([data, { style: { backgroundColor: color } }]),
      [check ? h(_icon2['default'], {
        attrs: { type: 'check' }
      }) : null]
    )
  }
}

var ThemeColorProps = exports.ThemeColorProps = {
  colors: _vueTypes2['default'].array,
  title: _vueTypes2['default'].string,
  value: _vueTypes2['default'].string,

  i18nRender: _vueTypes2['default'].oneOfType([_vueTypes2['default'].func, _vueTypes2['default'].bool]).def(false)
}

var ThemeColor = {
  props: ThemeColorProps,
  inject: ['locale'],
  render: function render (h) {
    var _this = this

    var title = this.title
        var value = this.value
        var _colors = this.colors
        var colors = _colors === undefined ? [] : _colors

    var i18n = this.$props.i18nRender || this.locale
    var handleChange = function handleChange (key) {
      _this.$emit('change', key)
    }

    return h(
      'div',
      { 'class': baseClassName, ref: 'ref' },
      [h(
        'h3',
        { 'class': baseClassName + '-title' },
        [title]
      ), h(
        'div',
        { 'class': baseClassName + '-content' },
        [colors.map(function (item) {
          var themeKey = (0, _util.genThemeToString)(item.key)
          var check = value === item.key || (0, _util.genThemeToString)(value) === item.key
          return h(
            _tooltip2['default'],
            {
              key: item.color,
              attrs: { title: themeKey ? i18n('app.setting.themecolor.' + themeKey) : item.key
              }
            },
            [h(Tag, {
              'class': baseClassName + '-block',
              attrs: { color: item.color,
                check: check
              },
              on: {
                'click': function click () {
                  return handleChange(item.key)
                }
              }
            })]
          )
        })]
      )]
    )
  }
}

exports['default'] = ThemeColor
