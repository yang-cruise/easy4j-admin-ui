<template>
  <div class="inline-block">
    <span v-if="label" class="margin-right-xs">{{ label }}</span>
    <template v-if="pickerType === 'date' || pickerType === 'datetime'">
      <a-date-picker
        :default-value="value||undefined"
        :ranges="$attrs.ranges || {}"
        :allowClear="$attrs.allowClear"
        :disabled="$attrs.disabled"
        :valueFormat="$attrs.valueFormat"
        :size="$attrs.size"
        :placeholder="$attrs.placeholder||'请选择时间'"
        :format="$attrs.format"
        :inputReadOnly="$attrs.inputReadOnly||false"
        :disabledDate="$attrs.disabledDate || (() => false)"
        :show-time="showTime"
        @openChange="openChange"
        @change="onChange">
        <slot></slot>
      </a-date-picker>
    </template>
    <template v-else-if="pickerType === 'week'">
      <a-week-picker
        :default-value="value||undefined"
        :ranges="$attrs.ranges || {}"
        :allowClear="$attrs.allowClear"
        :disabled="$attrs.disabled"
        :valueFormat="$attrs.valueFormat"
        :size="$attrs.size"
        :placeholder="$attrs.placeholder||'请选择时间'"
        :inputReadOnly="$attrs.inputReadOnly||false"
        :disabledDate="$attrs.disabledDate || (() => false)"
        @openChange="openChange"
        @change="onChange">
        <slot></slot>
      </a-week-picker>
    </template>
    <template v-else-if="pickerType === 'month'">
      <a-month-picker
        :default-value="value||undefined"
        :ranges="$attrs.ranges || {}"
        :allowClear="$attrs.allowClear"
        :disabled="$attrs.disabled"
        :valueFormat="$attrs.valueFormat"
        :size="$attrs.size"
        :placeholder="$attrs.placeholder||'请选择时间'"
        :inputReadOnly="$attrs.inputReadOnly||false"
        :disabledDate="$attrs.disabledDate || (() => false)"
        @openChange="openChange"
        @change="onChange">
        <slot></slot>
      </a-month-picker>
    </template>
    <template v-else>
      <a-range-picker
        :default-value="value||undefined"
        :ranges="$attrs.ranges || {}"
        :allowClear="$attrs.allowClear"
        :disabled="$attrs.disabled"
        :valueFormat="$attrs.valueFormat"
        :size="$attrs.size"
        :show-time="showTime"
        :format="$attrs.format"
        :placeholder="$attrs.placeholder||['请选择开始时间', '请选择结束时间']"
        :inputReadOnly="$attrs.inputReadOnly||false"
        :disabledDate="$attrs.disabledDate || (() => false)"
        @openChange="openChange"
        @change="onChange">
        <slot></slot>
      </a-range-picker>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object, Number, Array],
      default: undefined
    },
    type: { // date, week, month, datetime, datetimerang daterang
      type: String,
      default: 'date'
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      time: undefined
    }
  },
  computed: {
    pickerType () {
      return this.type
    },
    showTime () {
      if (this.$attrs.hasOwnProperty('showTime')) {
        return this.$attrs.showTime
      } else {
        const times = ['datetime', 'datetimerange']
        return times.includes(this.type)
      }
    },
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  created () {
    console.log(this.$attrs)
  },
  methods: {
    onChange (moment, date) {
      this.$emit('input', date)
      this.$emit('change', moment, date)
    },
    openChange (value, mode) {
      this.$emit('openChange', value, mode)
    }
  }
}
</script>
