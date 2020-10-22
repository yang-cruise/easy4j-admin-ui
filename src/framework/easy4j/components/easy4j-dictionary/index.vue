<template>
  <a-select
    v-if="multiple"
    v-model="selectDic.defaultValue"
    mode="multiple"
    style="width: 100%"
    :placeholder="selectDic.placeholder"
    @change="changeSelect"
    option-label-prop="label"
  >
    <template v-for="(item,index) in selectDic.arr">
      <a-select-option :key="index" :value="item.key" :label="item.value">
        {{ item.value }}
      </a-select-option>
    </template>
  </a-select>
  <a-select
    v-else
    v-model="selectDic.defaultValue"
    :allowClear="true"
    :placeholder="selectDic.placeholder"
    @change="changeSelect"
    style="min-width:120px">
    <template v-for="(item,index) in selectDic.arr">
      <a-select-option :key="index" :value="item.key">{{ item.value }}</a-select-option>
    </template>
  </a-select>
</template>

<script>

import { getSelectDiction } from '@/framework/api/dictionaries'

const selects = {
  placeholder: '',
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
      type: [String, Array],
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      selectDic: selects
    }
  },
  mounted () {
    if (this.codeKey) {
      this.getArrowDown()
      this.selectDic.defaultValue = this.selectValue ? this.selectValue : undefined
      this.selectDic.placeholder = this.placeholder ? this.placeholder : '请选择'
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
      this.selectDic.defaultValue = a
    },
    placeholder (a, b) {
      this.selectDic.placeholder = a ? toString(a) : '请选择'
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
      const resultArr = [...this.selectDic.arr]
      if (this.selectDic.multiple && value) {
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
      this.$emit('input-value', value)
    }
  }
}
</script>
