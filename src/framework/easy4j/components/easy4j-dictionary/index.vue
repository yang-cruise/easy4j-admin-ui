<template>
  <a-select
    v-if="multiple"
    v-model="selects.defaultValue"
    mode="multiple"
    style="width: 100%"
    :placeholder="selects.placeholder"
    @change="changeSelect"
    option-label-prop="label"
  >
    <template v-for="(item,index) in selects.arr">
      <a-select-option :key="index" :value="item.key" :label="item.value">
        {{ item.value }}
      </a-select-option>
    </template>
  </a-select>
  <a-select
    v-else
    v-model="selects.defaultValue"
    :allowClear="true"
    :placeholder="selects.placeholder"
    @change="changeSelect"
    style="min-width:120px">
    <template v-for="(item,index) in selects.arr">
      <a-select-option :key="index" :value="item.key">{{ item.value }}</a-select-option>
    </template>
  </a-select>
</template>

<script>

import { getSelectDiction } from '@/framework/api/dictionaries'

const selects = {
  placeholder: '请选择',
  defaultValue: '',
  arr: []
}

export default {
  name: 'DicSelect',
  model: {
    prop: 'selectValue',
    event: 'input-value'
  },
  props: {
    codeKey: {
      type: String,
      default: ''
    },
    selectValue: {
      default: '' || []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selects: selects
    }
  },
  mounted () {
    if (this.codeKey) {
      this.getArrowDown()
      this.selects.defaultValue = this.selectValue
    }
  },
  watch: {
    codeKey (a, b) {
      if (a) {
        this.getArrowDown()
      } else {
        selects.arr = []
      }
    },
    selectValue (a, b) {
      this.selects.defaultValue = a
      this.changeSelect(a)
    }
  },
  methods: {
    getArrowDown () {
      getSelectDiction({ code: this.codeKey }).then(res => {
        selects.arr = res.data
      })
    },
    changeSelect (value) {
      let backArr = ''
      const resultArr = [...this.selects.arr]
      if (this.selects.multiple && value) {
        backArr = []
        value.forEach(el => {
          resultArr.find((valueId, index) => {
            return valueId.key === el ? backArr.push(valueId) : ''
          })
        })
      } else if (value) {
        backArr = {
          value: value,
          item: resultArr.find((valueId, index) => {
            return valueId.key === value ? valueId : ''
          })
        }
      }
      this.$emit('changeSelect', backArr)
      this.$emit('input-value', value || undefined)
    }
  }
}
</script>
