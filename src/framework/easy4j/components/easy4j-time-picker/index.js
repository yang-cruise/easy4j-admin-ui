import T from 'ant-design-vue/es/time-picker/index.js'

export default {
  props: Object.assign({}, T.props, {
    type: {
      type: String,
      default: 'date'
    }
  }),
  data () {
    return {
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  created () {
    console.log(T.props)
  },
  render () {
    const props = {}
    const type = this.type

    Object.keys(T.props).forEach(k => {
      this[k] && (props[k] = this[k])
      return props[k]
    })
    type.indexOf('time') > 0 && (props['show-time'] = true)

    let timePicker = null
    if (type === 'date' || type === 'datetime') {
      timePicker = (
        <a-date-picker {...{ props }} onchange={this.handleChange} onopenChange={this.handleOpen}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-date-picker>
      )
    } else if (type === 'week') {
      timePicker = (
        <a-week-picker {...{ props }} onchange={this.handleChange} onopenChange={this.handleOpen}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-week-picker>
      )
    } else if (type === 'month') {
      timePicker = (
        <a-month-picker {...{ props }} onchange={this.handleChange} onopenChange={this.handleOpen}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-month-picker>
      )
    } else {
      timePicker = (
        <a-range-picker {...{ props }} onchange={this.handleChange} onopenChange={this.handleOpen}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-range-picker>
      )
    }

    return (
      <div class="easy4j-time">
        {timePicker}
      </div>
    )
  },
  methods: {
    handleChange (moment, date) {
      this.$emit('input', date)
      this.$emit('change', moment, date)
    },
    handleOpen (value, mode) {
      this.$emit('openChange', value, mode)
    }
  }
}
