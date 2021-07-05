import S from 'ant-design-vue/es/select/index.js'
import { getSelectDiction } from '@/framework/api/dictionaries'
import storage from 'store'

export default {
  props: Object.assign({}, S.props, {
    type: {
      type: String,
      default: 'select'
    },
    dict: {
      type: String,
      default: ''
    },
    value: {
      default: undefined,
      type: [String, Number]
    }
  }),
  data () {
    return {
      optionsList: [],
      textValue: '',
      selectValue: undefined
    }
  },
  computed: {
    dictList () {
      return this.$store.state.dictStatus
    }
  },
  watch: {
    value: function (val, oldVal) {
      this.selectValue = val || undefined
      const temp = this.optionsList.find(ele => `${ele.key}` === `${val}`) || {}
      this.textValue = temp.value || ''
    }
  },
  created () {
    this.dict && this.initData()
  },
  methods: {
    initData () {
      const dictObj = storage.get('DICT') || {}
      if (dictObj[this.dict]) {
        this.optionsList = dictObj[this.dict]
        const temp = this.optionsList.find(ele => `${ele.key}` === `${this.value}`)
        if (temp) {
          this.textValue = temp.value
          this.selectValue = temp.key
        }
        return
      }
      // 请求获取字典
      if (this.dictList.includes(this.dict)) {
        setTimeout(() => {
          this.initData()
        }, 500)
        return
      }
      const params = {
        code: this.dict
      }
      getSelectDiction(params).then(res => {
        this.optionsList = res.data || []
        storage.set('DICT', { ...dictObj, [this.dict]: this.optionsList })
        const temp = this.optionsList.find(ele => `${ele.key}` === `${this.value}`)
        if (temp) {
          this.textValue = temp.value || ''
          this.selectValue = temp.key || ''
        }
      })
    },
    handleChange (value, option) {
      this.$emit('input', value)
      this.$emit('change', value, option)
    }
  },
  render () {
    const props = {}
    const type = this.type
    const optionsList = this.optionsList || []
    Object.keys(S.props).forEach(k => {
      this[k] && (props[k] = this[k])
      return props[k]
    })
    let dom = null
    if (type === 'text') {
      dom = this.textValue
    } else {
      dom = (
        <a-select v-model={this.selectValue} {...props} placeholder={props.placeholder} onchange={this.handleChange} style={{ width: '100%' }}>
          {
            optionsList.map(item => {
              return <a-select-option value={item.key}>{item.value}</a-select-option>
            })
          }
        </a-select>
      )
    }
    return (
      <div className="line-block">
        {dom}
      </div>
    )
  }
}
